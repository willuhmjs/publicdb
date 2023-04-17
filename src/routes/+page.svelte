<script lang="ts">
	import { onMount } from "svelte";
    let publicKeyBase64, privateKeyBase64;
   onMount(async () => {
     // Generate key pair
const { publicKey, privateKey } = await window.crypto.subtle.generateKey(
  {
    name: "RSA-OAEP",
    modulusLength: 2048,
    publicExponent: new Uint8Array([1, 0, 1]),
    hash: "SHA-256",
  },
  true,
  ["encrypt", "decrypt"]
);

// Encode key pair in base64
publicKeyBase64 = window.btoa(String.fromCharCode.apply(null, new Uint8Array(await window.crypto.subtle.exportKey("spki", publicKey))));
privateKeyBase64 = window.btoa(String.fromCharCode.apply(null, new Uint8Array(await window.crypto.subtle.exportKey("pkcs8", privateKey))));
})
</script>
{#if publicKeyBase64 && privateKeyBase64}
    <p>Public key: {publicKeyBase64}</p>
    <p>Private key: {privateKeyBase64}</p>
{/if}