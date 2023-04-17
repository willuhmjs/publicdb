<script lang="ts">
	let privateKeyString: string, encryptedDataString: string;
	// Function to decrypt data with a private key in JWK format
	import { decryptData } from '$lib/frontendCrypto';
</script>

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
