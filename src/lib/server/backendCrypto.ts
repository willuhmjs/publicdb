import { webcrypto } from "crypto";

export async function encryptData(publicKey: string, plainText: string) {
    const publicKeyJwk = JSON.parse(Buffer.from(publicKey, 'base64').toString('utf8'));
    const key = await webcrypto.subtle.importKey(
        'jwk',
        publicKeyJwk,
        {
            name: 'RSA-OAEP',
            hash: { name: 'SHA-256' }
        },
        true,
        ['encrypt']
    );
    const encrypted = await webcrypto.subtle.encrypt(
        {
            name: 'RSA-OAEP'
        },
        key,
        Buffer.from(plainText)
    );
    const encryptedArray = new Uint8Array(encrypted);
    const encryptedBuffer = Buffer.from(encryptedArray);
    const encryptedString = encryptedBuffer.toString('base64');
    return encryptedString;
}