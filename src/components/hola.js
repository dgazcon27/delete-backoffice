import React from 'react';

const Hola1 = () => (
	<form>
		Email <input type='email' />
		Password <input type='password' />
		<button onSubmit={}> Enviar </button>	 
	</form>
);

const Dashboard = () => (
	<h1>Dashboard</h1>
);

const Presale = () => (
	<h1>Pre-venta</h1>
);

const BoxOffice = () => (
	<h1>Taquilla</h1>
);


export { Hola1, Dashboard, Presale, BoxOffice };
