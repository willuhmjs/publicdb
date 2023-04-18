import { error } from '@sveltejs/kit';
import { encryptData } from '$lib/server/backendCrypto';

/** @type {import('./$types').RequestHandler} */
export const POST = async (RequestEvent) => {
	const { data, publicKey } = await RequestEvent.request.json();
	if (!data || !publicKey) throw error(400, 'Missing data or publicKey fields!');

	const encryptedData = await encryptData(publicKey, data);	
	return new Response(encryptedData);
};
