import successCriteria from '../_data/successcriteria.js';

export default async function scSupport(partiallySupported, unsupported) {
	partiallySupported ||= [];
	unsupported ||= [];

	let criteria;

	try {
		criteria = await successCriteria();
	} catch (error) {
		console.error(`Fetch failed in sc-support.js. ${error}`);
	}

	let output = `
    <table class="sc-table">
    <thead>
      <tr>
        <th>Success criteria</th>
        <th>Level</th>
        <th>Support</th>
      </tr>
    </thead>
    <tbody>`;

	for (const key in criteria) {
		if (Object.hasOwn(criteria, key)) {
			let support = 'Supported';

			if (unsupported.includes(key)) {
				support = 'Unsupported';
			}

			if (partiallySupported.includes(key)) {
				support = 'Partially Supported';
			}

			output += `<tr><td>${key}: ${criteria[key].name}</td><td>${criteria[key].level}</td><td>${support}</td></tr>`;
		}
	}

	output += `<tbody>
    </table>`;

	return output;
}
