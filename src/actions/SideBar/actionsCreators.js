const collapseItem = (open, type) => ({
	type,
	payload: {
		open,
	},
});

export default collapseItem;
