import { error } from '@sveltejs/kit';
import crypto from 'crypto';

/** @type {import('./$types').RequestHandler} */
export const POST = async (RequestEvent) => {
	let { data, publicKey } = await RequestEvent.request.json();
	if (!data || !publicKey) throw error(400, 'Missing data or publicKey fields!');
	function encryptWithPublicKey(publicKeyString, plaintext) {
		// Convert the public key string to a Uint8Array
		const publicKeyBuffer = Buffer.from(publicKeyString, 'base64');
		const publicKeyArray = new Uint8Array(publicKeyBuffer);

		// Import the public key using Web Crypto
		const publicKeyPromise = crypto.webcrypto.subtle.importKey(
			'spki',
			publicKeyArray,
			{
				name: 'RSA-OAEP',
				hash: { name: 'SHA-256' }
			},
			true,
			['encrypt']
		);

		// Encrypt the plaintext using the public key
		const encryptedPromise = publicKeyPromise.then((publicKey) => {
			const plaintextBuffer = Buffer.from(plaintext);
			const encryptedDataPromise = crypto.webcrypto.subtle.encrypt(
				{
					name: 'RSA-OAEP'
				},
				publicKey,
				plaintextBuffer
			);
			return encryptedDataPromise;
		});

		// Return the encrypted data as a base64-encoded string
		return encryptedPromise.then((encryptedData) => {
			const encryptedArray = new Uint8Array(encryptedData);
			const encryptedBuffer = Buffer.from(encryptedArray);
			const encryptedString = encryptedBuffer.toString('base64');
			return encryptedString;
		}).catch((err) => {
			console.error(err);
		});
	}
	const d = await encryptWithPublicKey(publicKey, data);
	console.log(d);
	return new Response(`${d}`);
};
