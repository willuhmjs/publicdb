import { error } from '@sveltejs/kit';
import crypto from 'crypto';

/** @type {import('./$types').RequestHandler} */
export const POST = async (RequestEvent) => {
	let { data, publicKey } = await RequestEvent.request.json();
	if (!data || !publicKey) throw error(400, 'Missing data or publicKey fields!');
	// Node.js function using Crypto and WebCrypto API

	const webcrypto = crypto.webcrypto;
	async function encryptWithPublicKey(publicKey, plainText) {
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

	const d = await encryptWithPublicKey(publicKey, data);
	console.log(d);
	return new Response(`${d}`);
};
