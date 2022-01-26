import { getRandomName } from '$lib/utilities/randomNameGenerator';

export async function get() {
	let list = [];
	for (let index = 0; index < 100000; index++) {
		list.push({
			id: index,
			selected: false,
			name: getRandomName() + ' ' + getRandomName(),
			name2: getRandomName() + ' ' + getRandomName(),
			name3: getRandomName() + ' ' + getRandomName(),
			name4: getRandomName() + ' ' + getRandomName(),
		});
	}
	return {
		body: {
			list,
		},
	};
}
