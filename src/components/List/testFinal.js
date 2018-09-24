import React from 'react';
import ContainerList from './containerList';

import { GET_ROLES } from '../../queries/userType';
import { SEARCH_ROLES } from '../../queries/search';

const TestFinal = () => {
	const objectQuery = {
		queryComponent: GET_ROLES,
		querySearch: SEARCH_ROLES,
	};

	const objectSearch = {
		showButton: true,
		showSearch: true,
		titleButton: 'Add Algo',
		url: '/',
	};

	const objectList = {
		titlesColumns: [{
			id: 1,
			columName: 'Nombre',
			jsonPath: 'name',
		}],
		arrayActive: [true, true, true, true],
	};

	const objectPath = {
		currentComponent: {
			dataPath: 'data.roles.data',
			totalPath: 'data.roles.total',
		},
		searchComponent: {
			dataPath: 'data.search.roles.data',
			totalPath: 'data.search.roles.total',
		},
	};

	return (
		<ContainerList
			queries={objectQuery}
			propsSearchComponent={objectSearch}
			propsListComponent={objectList}
			objectPath={objectPath}
		/>
	);
};

export default TestFinal;
