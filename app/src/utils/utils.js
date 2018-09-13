//function to create new empty elements in a flat list to make objects with the same size
export const createRows = (data, columns) => {
	const rows = Math.floor(data.length / columns); // [A]
	let lastRowElements = data.length - rows * columns; // [B]
	while (lastRowElements !== columns) {
		// [C]
		data.push({
			// [D]
			id: `empty-${lastRowElements}`,
			name: `empty-${lastRowElements}`,
			empty: true
		});
		lastRowElements += 1; // [E]
	}
	return data; // [F]
};
