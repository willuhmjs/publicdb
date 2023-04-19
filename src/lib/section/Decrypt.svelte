<script lang="ts">
	import { decryptData } from '$lib/frontendCrypto';
    let publicKeyString: string, privateKeyString: string, decryptedDataString: string;;
    const decryptionSubmit = async () => {
        const response = await fetch(`/database?publicKey=${encodeURIComponent(publicKeyString)}`);
        if (response.status !== 200) throw new Error(response.statusText);
        const { message: encryptedDataString } = await response.json();
        decryptedDataString = await decryptData(encryptedDataString, privateKeyString)
    };
</script>

<section>
	<h2>#3. Retrieve (public) and decrypt (private) encrypted data from the database.</h2>
	<div class="sectionArea">
		<div class="subArea">
			<h3>Decryption information:</h3>
			<form on:submit|preventDefault={decryptionSubmit}>
				<input required type="text" bind:value={publicKeyString} placeholder="Public Key" />
				<input required type="text" bind:value={privateKeyString} placeholder="Private Key" />
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