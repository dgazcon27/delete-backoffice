import CREATE_PROD from './actionType';

const actionCreateProduct: (myValues) => {
	console.log(myValues);
	return {
		type: CREATE_PROD,
		myValues
	}
}
