import crypto from 'crypto';
import { ENV, getEnv } from 'format-env';

const ALGORITHM = 'aes-256-cbc';
const CIPHER_KEY = getEnv(ENV.REACT_APP_FUNCTIONS_BASE_URL); // Same key used in Golang server
const BLOCK_SIZE = 16;

// Decrypts cipher text into plain text
export function decrypt(cipherText: string) {
    const contents = Buffer.from(cipherText, 'hex');
    const iv = contents.slice(0, BLOCK_SIZE);
    const textBytes = contents.slice(BLOCK_SIZE);

    const decipher = crypto.createDecipheriv(ALGORITHM, CIPHER_KEY, iv);
    let decrypted = decipher.update(textBytes, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}
