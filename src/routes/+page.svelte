<script lang="ts">
	import { onMount } from 'svelte';
	let publicKeyBase64, privateKeyBase64;
	async function generateKeyPair() {
		// Generate a key pair using Web Crypto
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

		// Export the public key in a readable format
		const exportedPublicKey = await window.crypto.subtle.exportKey('spki', keyPair.publicKey);
		const exportedPublicKeyString = window.btoa(
			String.fromCharCode.apply(null, new Uint8Array(exportedPublicKey))
		);

		// Export the private key in a readable format
		const exportedPrivateKey = await window.crypto.subtle.exportKey('pkcs8', keyPair.privateKey);
		const exportedPrivateKeyString = window.btoa(
			String.fromCharCode.apply(null, new Uint8Array(exportedPrivateKey))
		);

		// Return the public and private keys
		return {
			publicKey: exportedPublicKeyString,
			privateKey: exportedPrivateKeyString
		};
	}

	onMount(async () => {
		publicKeyBase64 = (await generateKeyPair()).publicKey;
		privateKeyBase64 = (await generateKeyPair()).privateKey;
	});
</script>

{#if publicKeyBase64 && privateKeyBase64}
	<p>{publicKeyBase64}</p>
	<p>{privateKeyBase64}</p>
{/if}
