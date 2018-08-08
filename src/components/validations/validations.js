export const required = value => (value ? undefined : true);
export const email = value =>
	(value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
		'Invalid email address' : true);
export const issue = value => ((value.trim() === ''));
