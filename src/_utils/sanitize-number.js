export default function sanitizeNumber(numberWithDots) {
	const numberString = numberWithDots
		.split('.')
		.map(number => (Number(number) < 10 ? '0' + number : number))
		.join('');
	return Number(numberString);
}
