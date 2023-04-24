import { encryptData } from '$lib/server/backendCrypto';
import Keyv from "keyv";
const keyv = new Keyv();

const serverResponse = (status: number, message: string) => {
	return new Response(JSON.stringify({
		message
	}), { status });
};

/** @type {import('./$types').RequestHandler} */
export const POST = async (RequestEvent) => {
	try {
		const { plainText, publicKey } = await RequestEvent.request.json();
		if (!plainText || !publicKey) return serverResponse(400, 'Missing plainText or publicKey fields!');
		if (plainText.length > 300) return serverResponse(400, 'Data is too long! (max 300 characters)');
		const encryptedData = await encryptData(publicKey, plainText);
		await keyv.set(publicKey, encryptedData, 24 * 60 * 60 * 1000);
		return serverResponse(200, encryptedData)
	} catch (error) {
		return serverResponse(500, 'Unable to encrypt and store data!');
	}
};

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ url }) => {
    const publicKey = url.searchParams.get('publicKey');
	if (!publicKey) return serverResponse(400, 'Missing publicKey parameter');
	const encryptedData = await keyv.get(publicKey);
	if (!encryptedData) return serverResponse(404, 'No plainText found for this publicKey!');
	return serverResponse(200, encryptedData);
}
