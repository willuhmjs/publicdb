<script lang="ts">
	import { onMount } from 'svelte';
	let publicKeyBase64, privateKeyBase64;
	// Front-end function using WebCrypto API
	async function generateKeyPair() {
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

	onMount(async () => {
		publicKeyBase64 = (await generateKeyPair()).publicKey;
		privateKeyBase64 = (await generateKeyPair()).privateKey;
	});
</script>

{#if publicKeyBase64 && privateKeyBase64}
	<pre>{JSON.stringify(publicKeyBase64)}</pre>
	<pre>{JSON.stringify(privateKeyBase64)}</pre>
{/if}
