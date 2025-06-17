import crypto from 'crypto';
import fs from 'fs';
import { rootPath } from '@utils/root-path';

const SECRET = crypto
  .randomBytes(64)
  .toString('base64')
  .replace(/\+/g, '-')
  .replace(/\//g, '_')
  .replace(/=+$/, '');
const envPath = rootPath('.env');

function generateSecretKey(secret: string) {
  let envContent = '';

  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf-8');

    if (envContent.includes('SECRET_KEY')) {
      envContent = envContent.replace(/SECRET_KEY=.*/g, `SECRET_KEY=${secret}`);
    } else {
      envContent += `\n\nSECRET_KEY=${secret}`;
    }
  } else {
    envContent = `SECRET_KEY=${secret}`;
  }

  fs.writeFileSync(envPath, envContent);
  console.log('Secret key generated successfully');
}

generateSecretKey(SECRET);
