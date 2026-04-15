// One-time OAuth authorization for Google Search Console.
// Usage:
//   node scripts/gsc-auth.mjs
//
// Opens your browser, you authorize the app, and this script catches the
// redirect on http://localhost:53682 automatically. The refresh_token is
// saved to google-oauth-token.json.

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
const SCOPES = ['https://www.googleapis.com/auth/webmasters'];
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

console.log('\n=== GOOGLE SEARCH CONSOLE — AUTORIZACIÓN ===\n');
console.log('Abriendo tu navegador para autorizar la app...\n');
console.log('Si no se abre automáticamente, visita esta URL manualmente:\n');
console.log(authUrl);
console.log('\nEsperando autorización en ' + REDIRECT_URI + ' ...\n');

// Open URL in the default browser (Windows / macOS / Linux)
const opener =
  process.platform === 'win32'
    ? `start "" "${authUrl}"`
    : process.platform === 'darwin'
    ? `open "${authUrl}"`
    : `xdg-open "${authUrl}"`;
exec(opener);

// Local server that receives the OAuth code
const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, REDIRECT_URI);
    const code = url.searchParams.get('code');
    const error = url.searchParams.get('error');

    if (error) {
      res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`<h1>Error de autorización</h1><p>${error}</p>`);
      console.error('✗ Error:', error);
      server.close();
      process.exit(1);
    }

    if (!code) {
      res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<h1>No se recibió código</h1>');
      return;
    }

    const { tokens } = await oAuth2Client.getToken(code);
    fs.writeFileSync(TOKEN_FILE, JSON.stringify(tokens, null, 2));

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>Autorización completada</title></head>
<body style="font-family:system-ui;background:#FDF8F4;color:#3D2C2E;padding:60px;text-align:center;">
  <h1 style="color:#C4745A;">¡Autorización completada!</h1>
  <p>Ya puedes cerrar esta ventana y volver al terminal.</p>
</body></html>`);

    console.log('\n✓ Token guardado en google-oauth-token.json');
    console.log('  Ahora ya puedes ejecutar:');
    console.log('    node scripts/gsc-submit-sitemap.mjs');
    console.log('    node scripts/gsc-keywords.mjs');
    console.log('    node scripts/gsc-pages.mjs');
    console.log('    node scripts/gsc-inspect.mjs /blog/mi-hijo-no-habla-cuando-preocuparse\n');

    setTimeout(() => {
      server.close();
      process.exit(0);
    }, 500);
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`<h1>Error</h1><pre>${err.message}</pre>`);
    console.error('✗ Error:', err.message);
    server.close();
    process.exit(1);
  }
});

server.listen(PORT, () => {
  // ready
});
