/* eslint prefer-destructuring: 'off' */

const getValue = (obj, jsonPath) => {
	let value = obj;
	const arrayJsonPath = jsonPath.split('.');

	if (arrayJsonPath.length > 1) {
		for (let i = 0; i < arrayJsonPath.length; i += 1) {
			value = Object.getOwnPropertyDescriptor(value, arrayJsonPath[i]).value;
		}
		return value;
	}
	return obj[arrayJsonPath[0]];
};

const getIdElement = (idRow, idColumn) => (
	String(idRow) + String(idColumn)
);

export { getValue, getIdElement };
