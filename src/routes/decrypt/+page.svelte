<script lang="ts">
	let privateKeyString: string, encryptedDataString: string;
	async function decryptWithPrivateKey(privateKeyString: string, encryptedDataString: string) {
		// Convert the private key string and encrypted data string to Uint8Arrays
		const privateKeyArray = new TextEncoder().encode(privateKeyString);
		const encryptedDataArray = new TextEncoder().encode(encryptedDataString);

		// Import the private key using Web Crypto
		const privateKey = await window.crypto.subtle.importKey(
			'pkcs8',
			privateKeyArray,
			{
				name: 'RSA-OAEP',
				hash: { name: 'SHA-256' }
			},
			true,
			['decrypt']
		);

		// Decrypt the encrypted data using the private key
		const decryptedDataArray = await window.crypto.subtle.decrypt(
			{
				name: 'RSA-OAEP'
			},
			privateKey,
			encryptedDataArray
		);

		// Convert the decrypted data to a string and return it
		const decryptedDataString = new TextDecoder().decode(decryptedDataArray);
		return decryptedDataString;
	}
</script>

<input type="text" bind:value={privateKeyString} placeholder="private key string" />
<input type="text" bind:value={encryptedDataString} placeholder="encrypted data string" />
{#if privateKeyString && encryptedDataString}
	{#await decryptWithPrivateKey(privateKeyString, encryptedDataString)}
		<p>loading</p>
	{:then stuff}
		{stuff}
    {:catch error}
        <p>{error}</p>
	{/await}
{/if}
