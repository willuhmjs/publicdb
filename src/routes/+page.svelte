<script lang="ts">
	let privateKeyString: string, encryptedDataString: string;
	let publicKeyString: string, plainText: string;
	// Function to decrypt data with a private key in JWK format
	import { generateKeyPair, decryptData } from '$lib/frontendCrypto';
	import { onMount } from 'svelte';

	let publicKey: string | null, privateKey: string | null;
	onMount(async () => {
		let keyPairObject = await generateKeyPair();
		publicKey = keyPairObject.publicKey;
		privateKey = keyPairObject.privateKey;
	});

	async function encryptionSubmit(event) {
		const response = await fetch("/database", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				publicKey: publicKeyString,
				plainText: plainText
			})
		});
		const data = await response.json();
		encryptedDataString = data.encryptedDataString;
	}
</script>

<section>
	<h2>#1: Generate a 2048-bit JWK RSA-OAEP keypair.</h2>
	<div class="sectionArea">
		<div class="subArea">
			<h3>Public key:</h3>
			<code>{publicKey || "Loading..."}</code>
		</div>
		<div class="subArea">
			<h3>Private key:</h3>
			<code>{privateKey || "Loading..."}</code>
		</div>
	</div>
</section>

<section>
	<h2>#2: Send encrypted data to the database with the public key.</h2>
	<div class="sectionArea">
		<div class="subArea">
			<h3>Encryption information:</h3>
			<form on:submit|preventDefault={encryptionSubmit}>
				<input required type="text" bind:value={publicKeyString} placeholder="public key string" />
				<input required type="text" bind:value={plainText} placeholder="plainText string" />
				<input type="submit" value="Submit" />
			</form>
		</div>
		<div class="subArea">
			<h3>Encrypted data:</h3>
			<code>{encryptedDataString || "Loading..."}</code>
		</div>
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