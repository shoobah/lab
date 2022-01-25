<script context="module">
	export async function load({ fetch }) {
		const url = '/api/listfeeder';
		const res = await fetch(url);

		if (res.ok) {
			return {
				props: {
					feed: await res.json(),
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
	export let feed;

	let start = 0;
	const step = 100;
	let stop = step;
	let clicked;
	let chosen = [];

	$: portion = feed.list.slice(start, stop);

	function setSelected(event, item) {
		const s = event.target.checked;
		feed.list = feed.list.map((x) => {
			if (x.id === item.id) {
				if (s) {
					return { ...x, selected: true };
				}
				return { ...x, selected: false };
			}
			return x;
		});
	}

	$: chosen = feed.list.filter((x) => x.selected);

	function prev() {
		if (start === 0) return;
		start -= step;
	}

	function next() {
		if (stop >= feed.list.length) return;
		start += step;
	}

	$: stop = start + step;
</script>

<div>
	<button on:click={prev}>Prev</button>
	<button on:click={next}>Next</button>
	{start} - {stop}
</div>
<input
	type="range"
	min={0}
	max={feed.list.length - step}
	{step}
	bind:value={start}
	style="width:300px"
/>
<div class="container">
	<div>
		<table>
			<thead>
				<tr>
					<td />
					<td>Id</td>
					<td>Name</td>
					<td>Name2</td>
					<td>Name3</td>
					<td>Name4</td>
				</tr>
			</thead>
			<tbody>
				{#each portion as item}
					<tr>
						<td>
							<input
								type="checkbox"
								checked={item.selected}
								value={item.id}
								name={item.id}
								on:change={(x) => setSelected(x, item)}
							/>
						</td>
						<td>
							{item.id}
						</td>
						<td>
							{item.name}
						</td>
						<td>
							{item.name2}
						</td>
						<td>
							{item.name3}
						</td>
						<td>
							{item.name4}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<div>
		<ul>
			{#each chosen as c}
				<li>{c.name} [{c.id}]</li>
			{/each}
		</ul>
	</div>
</div>

<style>
	.container {
		display: grid;
		grid-auto-flow: column;
	}

	thead td {
		font-weight: 700;
		text-align: center;
	}
</style>
