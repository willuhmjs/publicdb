<script>

	import Callout from "$lib/Callout.svelte";

</script>
<section>
	<h2>What is this?</h2>
	<div class="sectionArea">
		<div class="subArea">
			<h3>Description:</h3>
			<p>This website is an open-source demonstration and implementation of a public RSA encrypted key-value database. Data is identified by its public key and decrypted on the client side using its private key. Try it out by using the generated (or pre-existing) key pair to encrypt and decrypt data on the database.</p>
			<Callout type="warning">All data, while encrypted, is available to anyone with the public key. All uploaded data is automatically deleted after 24 hours.</Callout>
		</div>
	</div>
</section>