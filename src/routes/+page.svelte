<script lang="ts">
	let privateKeyString: string,
		encryptedDataString: string,
		decryptedDataString: string,
		publicKeyString: string,
		plainText: string;
	// Function to decrypt data with a private key in JWK format
	import { generateKeyPair, decryptData } from '$lib/frontendCrypto';
	import { onMount } from 'svelte';

	let publicKey: string | null, privateKey: string | null;
	onMount(async () => {
		let keyPairObject = await generateKeyPair();
		publicKey = keyPairObject.publicKey;
		privateKey = keyPairObject.privateKey;
	});

	async function encryptionSubmit() {
		const response = await fetch('/database', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				publicKey: publicKeyString,
				plainText: plainText
			})
		});
		const data = await response.json();
		encryptedDataString = data.encryptedDataString;
	}

	async function decryptionSubmit() {
		decryptedDataString = await decryptData(encryptedDataString, privateKeyString);
	}
</script>

<section>
	<h2>What is this?</h2>
	<div class="sectionArea">
		<div class="subArea">
			<h3>Description:</h3>
			<p>
			</p>
		</div>
	</div>
</section>

<section>
	<h2>#1: Generate a 2048-bit JWK RSA-OAEP keypair.</h2>
	<div class="sectionArea">
		<div class="subArea">
			<h3>Public key:</h3>
			<code>{publicKey || 'Loading...'}</code>
		</div>
		<div class="subArea">
			<h3>Private key:</h3>
			<code>{privateKey || 'Loading...'}</code>
		</div>
	</div>
</section>

<section>
	<h2>#2: Send encrypted data to the database with the public key.</h2>
	<div class="sectionArea">
		<div class="subArea">
			<h3>Encryption information:</h3>
			<form on:submit|preventDefault={encryptionSubmit}>
				<input required type="text" bind:value={publicKeyString} placeholder="Public Key" />
				<input required type="text" bind:value={plainText} placeholder="Plain Text" />
				<input type="submit" value="Submit" />
			</form>
		</div>
		{#if encryptedDataString}
			<div class="subArea">
				<h3>Encrypted data:</h3>
				<code>{encryptedDataString}</code>
			</div>
		{/if}
	</div>
</section>

<section>
	<h2>#3. Retrieve (public) and decrypt (private) encrypted data from the database.</h2>
	<div class="sectionArea">
		<div class="subArea">
			<h3>Decryption information:</h3>
			<form on:submit|preventDefault={decryptionSubmit}>
				<input required type="text" bind:value={privateKeyString} placeholder="Private Key" />
				<input required type="text" bind:value={publicKeyString} placeholder="Public Key" />
				<input type="submit" value="Submit" />
			</form>
		</div>
		{#if decryptedDataString}
			<div class="subArea">
				<h3>Decrypted data:</h3>
				<code>{decryptedDataString}</code>
			</div>
		{/if}
	</div>
</section>
<!--
<input type="text" bind:value={privateKeyString} placeholder="private key string" />
<input type="text" bind:value={encryptedDataString} placeholder="encrypted data string" />
{#if privateKeyString && encryptedDataString}
	{#await decryptData(encryptedDataString, privateKeyString)}
		<p>loading</p>
	{:then stuff}
		{stuff}
	{:catch error}
		<p>{error}</p>
	{/await}
{/if}
-->
