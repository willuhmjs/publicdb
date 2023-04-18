<script lang="ts">
	let privateKeyString: string, encryptedDataString: string;
	// Function to decrypt data with a private key in JWK format
	import { generateKeyPair, decryptData } from '$lib/frontendCrypto';
	import { onMount } from 'svelte';

	let publicKey: string | null, privateKey: string | null;
	onMount(async () => {
		let keyPairObject = await generateKeyPair();
		publicKey = keyPairObject.publicKey;
		privateKey = keyPairObject.privateKey;
	});
</script>

<section>
	<h2>#1: Generate a 2048-bit JWK RSA-OAEP keypair.</h2>
	<div class="sectionArea">
		<div class="keyArea">
			<h3>Public key:</h3>
			<code>{publicKey || "Loading..."}</code>
		</div>
		<div class="keyArea">
			<h3>Private key:</h3>
			<code>{privateKey || "Loading..."}</code>
		</div>
	</div>
</section>

<section>
	<h2>#2: Send encrypted data to the database with the public key.</h2>
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