<script context="module">
	export async function load({ fetch }) {
		const url = '/api/sql';
		const res = await fetch(url);

		if (res.ok) {
			return {
				props: {
					persons: await res.json(),
				},
			};
		}
		return {
			status: 404,
			error: new Error('Crap'),
		};
	}
</script>

<script>
	export let persons;
</script>

{#each persons as person}
	<div>{person.firstName} {person.lastName}</div>
{/each}
