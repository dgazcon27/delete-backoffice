import React from 'react';
import List from './list';

const TestList = () => {
	const data = [{
		name: 'ADMIN',
		id: 1,
		description: 'ADMIN 1',
		test: {
			hola: {
				hala: 'Madrid 1',
			},
		},
	},
	{
		name: 'OWNER',
		id: 3,
		description: 'OWNER 2',
		test: {
			hola: {
				hala: 'Madrid 2',
			},
		},

	},
	{
		name: 'DJ',
		id: 7,
		description: 'DJ 3',
		test: {
			hola: {
				hala: 'Madrid 3',
			},
		},
	},
	{
		name: 'DJ',
		id: 5,
		description: 'DJ 4',
		test: {
			hola: {
				hala: 'Madrid 4',
			},
		},
	}];

	const titles = [{
		id: 1,
		columName: 'Nombre',
		jsonPath: 'name',
	},
	{
		id: 2,
		columName: 'Tipo de Usuario',
		jsonPath: 'test.hola.hala',
	}];

	return (
		<List
			dataToShow={data}
			titlesColumns={titles}
		/>
	);
};

export default TestList;
