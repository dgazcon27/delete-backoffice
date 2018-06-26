const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing.unit * 2,
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
	button: {
		margin: theme.spacing.unit,
	},
	login: {
		'border-radius': '0.3em',
		'-webkit-box-shadow': '1px 3px 8px 3px #8e8e8e73',
		'box-shadow': '1px 3px 8px 3px #8e8e8e73',
		border: '3px solid #455A64',
		padding: '54px',
		'text-align': 'left',
		'background-color': '#ffffff',
	},
	centerLogin: {
		display: 'flex',
		'justify-content': 'center',
		'align-items': 'center',
		height: '60vh',
	},
	enterButton: {
		float: 'right',
		'background-color': '#455A64 !important',
	},
	recoverPassword: {
		float: 'left',
		'margin-top': '0.7vh',
		color: '#90A4AE',
	},
	marginButtons: {
		'margin-top': '8vh',
	},
	centerLogo: {
		display: 'flex',
		'justify-content': 'center',
		'align-items': 'center',
		'margin-top': '15vh',
	},
	label: {
		'font-size': '14px',
	},
	inputs: {
		'border-bottom': '2px solid #455A64 !important',
		'font-size': '16px !important',
	},
	error: {
		'background-color': '#455A64',
		color: 'white',
		height: '9%',
		'margin-top': '22.5vh',
		padding: '31px',
		position: 'absolute',
		width: 'auto',
		'-webkit-box-shadow': '1px 3px 8px 3px #8e8e8e73',
		'box-shadow': '1px 3px 8px 3px #8e8e8e73',
		'font-size': '16px',
	},
});

export default styles;
