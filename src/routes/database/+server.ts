import { error } from '@sveltejs/kit';
import { encryptData } from '$lib/server/backendCrypto';
import 'dotenv/config';
import Keyv from "keyv";
const keyv = new Keyv(process.env.MONGO_STRING);

const serverResponse = (status: number, message: string) => {
	return new Response(JSON.stringify({
		message
	}), { status });
};

/** @type {import('./$types').RequestHandler} */
export const POST = async (RequestEvent) => {
	const { plainText, publicKey } = await RequestEvent.request.json();
	if (!plainText || !publicKey) throw error(400, 'Missing data or publicKey fields!');

	const encryptedData = await encryptData(publicKey, plainText);
	await keyv.set(publicKey, encryptedData, 24 * 60 * 60 * 1000);
	return new Response(JSON.stringify({ encryptedData }));
};

keyv.on('error', err => console.error('Keyv connection error:', err));
/** @type {import('./$types').RequestHandler} */
export const GET = async ({ url }) => {
    const publicKey = url.searchParams.get('publicKey');
	if (!publicKey) return serverResponse(400, 'Missing publicKey parameter');
	const encryptedData = await keyv.get(publicKey);
	if (!encryptedData) return serverResponse(404, 'No data found for this publicKey!');
	return serverResponse(200, encryptedData);
}