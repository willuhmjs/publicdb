<script lang="ts">
	import { onMount } from "svelte";
    import { generateKeyPair} from "$lib/frontendCrypto";
    let publicKey: string | null, privateKey: string | null;
	onMount(async () => {
		let keyPairObject = await generateKeyPair();
		publicKey = keyPairObject.publicKey;
		privateKey = keyPairObject.privateKey;
	});
</script>

<section>
	<h2>Generate a 2048-bit JWK RSA-OAEP key pair.</h2>
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