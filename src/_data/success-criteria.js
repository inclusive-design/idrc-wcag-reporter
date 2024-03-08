import fetch from '@11ty/eleventy-fetch';

export default async function successCriteria() {
	const url
    = 'https://raw.githubusercontent.com/w3c/wcag/main/guidelines/wcag.json';

	try {
		const json = await fetch(url, {
			duration: '1d',
			type: 'json',
		});

		const results = {};

		for (const principle of json.principles) {
			for (const guideline of principle.guidelines) {
				for (const sc of guideline.successcriteria) {
					results[sc.num] = {
						principle: principle.handle,
						guideline: guideline.handle,
						name: sc.handle,
						level: sc.level,
						versions: sc.versions,
						id: sc.id.replace('WCAG2:', ''),
					};
				}
			}
		}

		return results;
	} catch (error) {
		console.error(`Fetch failed in successCriteria.js. ${error}`);
	}
}
