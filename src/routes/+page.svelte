<script lang="ts">
	import { onMount } from 'svelte';
	let publicKey: string | null, privateKey: string | null;
	// Front-end function using WebCrypto API
	import { generateKeyPair } from '$lib/frontendCrypto';

	onMount(async () => {
		let keyPairObject = await generateKeyPair();
		publicKey = keyPairObject.publicKey;
		privateKey = keyPairObject.privateKey;
	});
</script>

{#if publicKey && privateKey}
	<pre>{JSON.stringify(publicKey)}</pre>
	<pre>{JSON.stringify(privateKey)}</pre>
{/if}
