import { google } from 'googleapis';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

export const SITE_URL = 'https://www.espaciolenguaje.com/';
export const SITEMAP_URL = 'https://www.espaciolenguaje.com/sitemap.xml';

export function getSearchConsoleClient() {
  const credentials = JSON.parse(
    fs.readFileSync(path.join(ROOT, 'google-oauth-client.json'), 'utf8')
  );
  const tokens = JSON.parse(
    fs.readFileSync(path.join(ROOT, 'google-oauth-token.json'), 'utf8')
  );
  const { client_id, client_secret } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, 'http://localhost:53682');
  oAuth2Client.setCredentials(tokens);
  return google.searchconsole({ version: 'v1', auth: oAuth2Client });
}
