import { error } from '@sveltejs/kit';
import { encryptData } from '$lib/server/backendCrypto';

/** @type {import('./$types').RequestHandler} */
export const POST = async (RequestEvent) => {
	const { plainText, publicKey } = await RequestEvent.request.json();
	if (!plainText || !publicKey) throw error(400, 'Missing data or publicKey fields!');

	const encryptedDataString = await encryptData(publicKey, plainText);
	return new Response(JSON.stringify({ encryptedDataString }));
};
