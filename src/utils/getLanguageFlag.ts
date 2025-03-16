const getFlagEmoji = (countryCode: string) => {
	if (countryCode === 'en') countryCode = 'GB';
	const codePoints = countryCode
		.toUpperCase()
		.split('')
		.map((char) => 127397 + char.charCodeAt(0));
	return String.fromCodePoint(...codePoints);
};

export default getFlagEmoji;
