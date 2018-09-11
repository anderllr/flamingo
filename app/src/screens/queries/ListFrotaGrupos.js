import React from "react";
import { FlatList, View, StyleSheet, Text } from "react-native";
import { Query } from "react-apollo";

import { GET_FROTA_GRUPOS } from "../../config/resources/queries/frotaQuery";

const createRows = (data, columns) => {
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

const ListFrotaGrupos = ({ id, columns }) => (
	<Query query={GET_FROTA_GRUPOS} variables={{ id }}>
		{({ loading, error, data, refetch }) => {
			if (loading) return <Text>Buscando os grupos</Text>;
			if (error) {
				return <Text>Error</Text>;
			}
			/*
			console.log("Data: ", data);
			return <Text>Renderizou</Text>;
*/
			return (
				<FlatList
					data={createRows([...data.frotaGrupoItem], columns)}
					keyExtractor={item => item.id.toString()}
					numColumns={columns}
					renderItem={({ item }) => {
						if (item.empty) {
							return <View style={[styles.item, styles.itemEmpty]} />;
						}
						return (
							<View style={styles.item}>
								<Text style={styles.text}>{item.grupoItem}</Text>
							</View>
						);
					}}
				/>
			);
		}}
	</Query>
);

const styles = StyleSheet.create({
	item: {
		alignItems: "center",
		backgroundColor: "#dcda48",
		flexGrow: 1,
		flexBasis: 0,
		margin: 4,
		padding: 20
	},
	text: {
		color: "#333333"
	},
	itemEmpty: {
		backgroundColor: "transparent"
	}
});

export default ListFrotaGrupos;
