import successCriteria from '../_data/successcriteria.js';

export default async function scUri(sc, targetWcagVersion) {
	const baseUri = `https://www.w3.org/WAI/WCAG22/quickref/?versions=${targetWcagVersion}`;

	let criteria;
	let slug;

	try {
		criteria = await successCriteria();
	} catch (error) {
		console.error(`Fetch failed in sc-uri.js. ${error}`);
	}

	if (criteria[sc]) {
		slug = criteria[sc].id || '';
	} else {
		console.error(
			`Cannot generate URL for ${sc}, as it cannot be found in the data."`,
		);
		return;
	}

	return `${baseUri}#${slug}`;
}
