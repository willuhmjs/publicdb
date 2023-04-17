import { error } from '@sveltejs/kit';
import crypto from 'crypto';

/** @type {import('./$types').RequestHandler} */
export const POST = async (RequestEvent) => {
	const { data, publicKey } = await RequestEvent.request.json();
	if (!data || !publicKey) throw error(400, 'Missing data or publicKey fields!');

	function encryptData(data: string, publicKey: string) {
		const publicKeyBuffer = Buffer.from(publicKey, 'base64');
		const encryptedData = crypto.publicEncrypt(
			{
				key: publicKeyBuffer,
				padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
				oaepHash: 'sha256'
			},
			Buffer.from(data)
		);
		return encryptedData.toString('base64');
	}

	const encryptedData = encryptData(data, publicKey);

	return new Response(`${encryptedData}`);
};
