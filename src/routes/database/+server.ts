import { error } from '@sveltejs/kit';
 
/** @type {import('./$types').RequestHandler} */
export const POST = async (RequestEvent) => {
    const { data, publicKey } = await RequestEvent.request.json()
    if (!data || !publicKey) throw error(400, "Missing data or publicKey fields!");

    const dataBuffer = new TextEncoder().encode(data);
    const encryptedDataBuffer = await window.crypto.subtle.encrypt(
        { name: "RSA-OAEP" },
        publicKey,
        dataBuffer
    );

    const encryptedData = window.btoa(String.fromCharCode(...new Uint8Array(encryptedDataBuffer)));

    return new Response(`${encryptedData}`);
};