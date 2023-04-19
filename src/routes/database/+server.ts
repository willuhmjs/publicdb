import { encryptData } from '$lib/server/backendCrypto';
import 'dotenv/config';
import Keyv from "keyv";
const keyv = new Keyv(process.env.MONGO_STRING);


keyv.on('error', err => console.error('Keyv connection error:', err));

const serverResponse = (status: number, message: string) => {
	return new Response(JSON.stringify({
		message
	}), { status });
};

/** @type {import('./$types').RequestHandler} */
export const POST = async (RequestEvent) => {
	const { plainText, publicKey } = await RequestEvent.request.json();
	if (!plainText || !publicKey) return serverResponse(400, 'Missing data or publicKey fields!');
	if (plainText.length > 300) return serverResponse(400, 'Data is too long! (max 300 characters)');
	const encryptedData = await encryptData(publicKey, plainText);
	await keyv.set(publicKey, encryptedData, 24 * 60 * 60 * 1000);
	return new Response(JSON.stringify({ encryptedData }));
};

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ url }) => {
    const publicKey = url.searchParams.get('publicKey');
	if (!publicKey) return serverResponse(400, 'Missing publicKey parameter');
	const encryptedData = await keyv.get(publicKey);
	if (!encryptedData) return serverResponse(404, 'No data found for this publicKey!');
	return serverResponse(200, encryptedData);
}