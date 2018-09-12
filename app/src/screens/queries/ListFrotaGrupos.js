import React from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import { FlatList, View, Text, TouchableHighlight } from "react-native";
import { scale } from "react-native-size-matters";
import { Query } from "react-apollo";

import { Icon } from "../../components/Icon";
import { CachedImage } from "../../components/CachedImage";

import { GET_FROTA_GRUPOS } from "../../config/resources/queries/frotaQuery";
import styles from "./styles";

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

/*
<Icon
	name="checkmark"
	size={scale(15)}
	color={EStyleSheet.value("$internalButton")}
	type="material"
/>
*/

const ListItemGrupo = ({ data, onPress }) => {
	if (data.empty) {
		return <View style={[styles.groupContainer, styles.groupEmpty]} />;
	}
	return (
		<TouchableHighlight
			underlayColor={styles.$underlayColor}
			onPress={onPress}
			style={styles.groupContainer}
		>
			<View style={styles.groupItens}>
				<View style={styles.groupIcon}>
					<Icon
						name="checkmark"
						size={scale(15)}
						color={EStyleSheet.value("$internalButton")}
						type="ion"
					/>
				</View>
				<CachedImage imageUrl={data.imagem} style={styles.groupImage} />
				<Text style={styles.groupText}>{data.grupoItem}</Text>
			</View>
		</TouchableHighlight>
	);
};

const ListFrotaGrupos = ({ id, columns, onHandlePress }) => (
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
					renderItem={({ item }) => (
						<ListItemGrupo data={item} onPress={() => onHandlePress(item)} />
					)}
				/>
			);
		}}
	</Query>
);
/*
	<ListItemSaida
		data={item}
		onPress={() => props.onHandlePress(item)}
	/>
*/

export default ListFrotaGrupos;
