import SB_COLLAPSE from './actionsTypes';

const collapseItem = item => ({
	type: SB_COLLAPSE,
	payload: {
		open: item,
		description: SB_COLLAPSE,
	},
});

export default collapseItem;
