import successCriteria from './successcriteria.js';

export default async function totalsByLevel() {
	const totals = {
		2.2: {
			A: {
				all: 0,
				perceivable: 0,
				operable: 0,
				understandable: 0,
				robust: 0,
			},
			AA: {
				all: 0,
				perceivable: 0,
				operable: 0,
				understandable: 0,
				robust: 0,
			},
			AAA: {
				all: 0,
				perceivable: 0,
				operable: 0,
				understandable: 0,
				robust: 0,
			},
		},
		2.1: {
			A: {
				all: 0,
				perceivable: 0,
				operable: 0,
				understandable: 0,
				robust: 0,
			},
			AA: {
				all: 0,
				perceivable: 0,
				operable: 0,
				understandable: 0,
				robust: 0,
			},
			AAA: {
				all: 0,
				perceivable: 0,
				operable: 0,
				understandable: 0,
				robust: 0,
			},
		},
		'2.0': {
			A: {
				all: 0,
				perceivable: 0,
				operable: 0,
				understandable: 0,
				robust: 0,
			},
			AA: {
				all: 0,
				perceivable: 0,
				operable: 0,
				understandable: 0,
				robust: 0,
			},
			AAA: {
				all: 0,
				perceivable: 0,
				operable: 0,
				understandable: 0,
				robust: 0,
			},
		},
	};
	let criteria;

	try {
		criteria = await successCriteria();
	} catch (error) {
		console.error(`Fetch failed in totalsPerLevel.js. ${error}`);
	}

	for (const sc of Object.values(criteria)) {
		for (const version of sc.versions) {
			if (sc.level !== '') {
				totals[version][sc.level].all++;
				totals[version][sc.level][sc.principle.toLowerCase()]++;

				if (sc.level === 'A') {
					totals[version].AA.all++;
					totals[version].AA[sc.principle.toLowerCase()]++;
					totals[version].AAA.all++;
					totals[version].AAA[sc.principle.toLowerCase()]++;
				}

				if (sc.level === 'AA') {
					totals[version].AAA.all++;
					totals[version].AAA[sc.principle.toLowerCase()]++;
				}
			}
		}
	}

	return totals;
}
