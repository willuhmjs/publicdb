export async function generateKeyPair() {
	const keyPair = await window.crypto.subtle.generateKey(
		{
			name: 'RSA-OAEP',
			modulusLength: 2048,
			publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
			hash: { name: 'SHA-256' }
		},
		true,
		['encrypt', 'decrypt']
	);
	const publicKey = await window.crypto.subtle.exportKey('jwk', keyPair.publicKey);
	const privateKey = await window.crypto.subtle.exportKey('jwk', keyPair.privateKey);
	return {
		publicKey: window.btoa(JSON.stringify(publicKey)),
		privateKey: window.btoa(JSON.stringify(privateKey))
	};
}

export async function decryptData(encryptedData: string, privateKey: string) {
	// takes a base64 string and base64 JWK string and decrypts the data
	const data = window.atob(encryptedData);
	console.log(window.atob(privateKey));
	const key = JSON.parse(window.atob(privateKey));
	const keyCrypto = await window.crypto.subtle.importKey(
		'jwk',
		key,
		{
			name: 'RSA-OAEP',
			hash: { name: 'SHA-256' }
		},
		true,
		['decrypt']
	);

	const decryptedData = await window.crypto.subtle.decrypt(
		{
			name: 'RSA-OAEP'
		},
		keyCrypto,
		// data as a BufferSource
		new Uint8Array(data.split('').map((char) => char.charCodeAt(0)))
	);

	return new TextDecoder().decode(decryptedData);
}
