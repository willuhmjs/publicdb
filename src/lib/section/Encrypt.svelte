<script lang="ts">
    let publicKeyString: string, plainText: string, encryptedDataString: string, error: string | null;
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
        if (response.status !== 200) {
            error = data.message;
            return;
        } else error = null;
		encryptedDataString = data.message;
	}
</script>

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
        {#if error}
            <div class="subArea">
                <h3>Error:</h3>
                <code>{error}</code>
            </div>
        {/if}
		{#if encryptedDataString}
			<div class="subArea">
				<h3>Encrypted data:</h3>
				<code>{encryptedDataString}</code>
			</div>
		{/if}
	</div>
</section>