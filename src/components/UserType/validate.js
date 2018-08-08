export default function (values) {
	const errors = {};
	const requiredFields = [
		'name',
		'description',
	];
	requiredFields.forEach((field) => {
		if (!values[field]) {
			errors[field] = 'Required';
		}
	});

	return errors;
}
