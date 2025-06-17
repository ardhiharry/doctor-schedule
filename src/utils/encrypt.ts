import * as bcrypt from 'bcrypt';

export async function encrypt(text: string) {
  return bcrypt.hash(text, 12);
}

export async function compare(text: string, hash: string) {
  return bcrypt.compare(text, hash);
}
