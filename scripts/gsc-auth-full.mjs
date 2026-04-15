// Re-authorize with BOTH scopes: Search Console + Indexing API.
// Usage: node scripts/gsc-auth-full.mjs

import { google } from 'googleapis';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { exec } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CLIENT_FILE = path.join(ROOT, 'google-oauth-client.json');
const TOKEN_FILE = path.join(ROOT, 'google-oauth-token.json');
const SCOPES = [
  'https://www.googleapis.com/auth/webmasters',
  'https://www.googleapis.com/auth/indexing',
];
const PORT = 53682;
const REDIRECT_URI = `http://localhost:${PORT}`;

const credentials = JSON.parse(fs.readFileSync(CLIENT_FILE, 'utf8'));
const { client_id, client_secret } = credentials.installed;

const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, REDIRECT_URI);

const authUrl = oAuth2Client.generateAuthUrl({
  access_type: 'offline',
  prompt: 'consent',
  scope: SCOPES,
});

console.log('\n=== RE-AUTORIZACIÓN CON INDEXING API ===\n');
console.log('Abriendo navegador...\n');
console.log('Si no se abre, visita:\n' + authUrl + '\n');

const opener =
  process.platform === 'win32' ? `start "" "${authUrl}"` :
  process.platform === 'darwin' ? `open "${authUrl}"` :
  `xdg-open "${authUrl}"`;
exec(opener);

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, REDIRECT_URI);
    const code = url.searchParams.get('code');
    if (!code) {
      res.writeHead(400);
      res.end('No code');
      return;
    }
    const { tokens } = await oAuth2Client.getToken(code);
    fs.writeFileSync(TOKEN_FILE, JSON.stringify(tokens, null, 2));
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`<!DOCTYPE html><html><body style="font-family:system-ui;background:#FDF8F4;color:#3D2C2E;padding:60px;text-align:center;">
<h1 style="color:#C4745A;">¡Listo! Indexing API autorizada.</h1>
<p>Ya puedes cerrar esta ventana.</p></body></html>`);
    console.log('\n✓ Token con ambos scopes guardado');
    console.log('  Ya puedes ejecutar: node scripts/gsc-index-now.mjs\n');
    setTimeout(() => process.exit(0), 500);
  } catch (err) {
    res.writeHead(500);
    res.end(err.message);
    console.error('✗', err.message);
    process.exit(1);
  }
});

server.listen(PORT);
