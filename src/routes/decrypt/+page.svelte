<script lang="ts">
	let privateKeyString: string, encryptedDataString: string;
	// Function to decrypt data with a private key in JWK format
	async function decryptDataWithPrivateKey(encryptedData: string, privateKeyJwkBase64: string) {
		// Decode the private key JWK from base64
		const privateKeyJwk = JSON.parse(window.atob(privateKeyJwkBase64));

		// Import the private key using the WebCrypto API
		const privateKey = await window.crypto.subtle.importKey(
			'jwk',
			privateKeyJwk,
			{ name: 'RSA-OAEP', hash: { name: 'SHA-256' } },
			true,
			['decrypt']
		);

		// Decode the encrypted data from base64
		const encryptedDataUint8Array = new Uint8Array(
			window.atob(encryptedData)
				.split('')
				.map((c) => c.charCodeAt(0))
		);

		// Decrypt the data using the private key
		const decryptedData = await window.crypto.subtle.decrypt(
			{ name: 'RSA-OAEP' },
			privateKey,
			encryptedDataUint8Array
		);

		// Convert the decrypted data to a string and return it
		return new TextDecoder().decode(decryptedData);
	}
</script>

<input type="text" bind:value={privateKeyString} placeholder="private key string" />
<input type="text" bind:value={encryptedDataString} placeholder="encrypted data string" />
{#if privateKeyString && encryptedDataString}
	{#await decryptDataWithPrivateKey(encryptedDataString, privateKeyString)}
		<p>loading</p>
	{:then stuff}
		{stuff}
	{:catch error}
		<p>{error}</p>
	{/await}
{/if}
