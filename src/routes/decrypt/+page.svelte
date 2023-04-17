<script lang="ts">
	let privateKeyString: string, encryptedDataString: string;
	// Function to decrypt data with a private key in JWK format
	async function decryptDataWithPrivateKey(encryptedData, privateKey) {
		// takes a base64 string and base64 JWK string and decrypts the data
		const data = window.atob(encryptedData);
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
