const nameparts = [
	['Jo', 'Ja', 'Po', 'Pi', 'An', 'Do', 'Re', 'Mi', 'Fa', 'So', 'La', 'Ti'],
	['an', 's', 'lij', 'kl', 'd', '', 'x', 'rep', 'ap', 'er', 'wi'],
	['on', 'ess', 'ap', 'ers', 'ol', 'al', 'il', 's', 'as'],
];

function r(max) {
	return Math.floor(Math.random() * max);
}

export const getRandomName = () => nameparts.map((part) => part[r(part.length)]).join('');
