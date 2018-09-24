import React from 'react';
import List from './list';
import Search from '../../components/Search/search';

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
		id: 2,
		description: 'OWNER 2',
		test: {
			hola: {
				hala: 'Madrid 2',
			},
		},

	},
	{
		name: 'DJ',
		id: 3,
		description: 'DJ 3',
		test: {
			hola: {
				hala: 'Madrid 3',
			},
		},
	},
	{
		name: 'DJ',
		id: 4,
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
		description: 'DJ 3',
		test: {
			hola: {
				hala: 'Madrid 3',
			},
		},
	},
	{
		name: 'DJ',
		id: 6,
		description: 'DJ 3',
		test: {
			hola: {
				hala: 'Madrid 3',
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
		id: 8,
		description: 'DJ 3',
		test: {
			hola: {
				hala: 'Madrid 3',
			},
		},
	},
	{
		name: 'DJ',
		id: 9,
		description: 'DJ 3',
		test: {
			hola: {
				hala: 'Madrid 3',
			},
		},
	},
	{
		name: 'DJ',
		id: 10,
		description: 'DJ 3',
		test: {
			hola: {
				hala: 'Madrid 3',
			},
		},
	},
	{
		name: 'DJ',
		id: 11,
		description: 'DJ 3',
		test: {
			hola: {
				hala: 'Madrid 3',
			},
		},
	},
	{
		name: 'DJ',
		id: 12,
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

	const arrayActive = [true, true, true, true];

	return (
		<div>
			<Search
				showButton
				showSearch
				titleButton='Crear Zona'
				url='/user-type'
			/>

			<List
				dataToShow={data}
				titlesColumns={titles}
				activeOptions={arrayActive}
			/>
		</div>
	);
};

export default TestList;
