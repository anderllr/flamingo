import React, { Component } from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import { FlatList, View, Text, TouchableHighlight } from "react-native";
import { scale } from "react-native-size-matters";
import { Query } from "react-apollo";

import { Icon } from "../../components/Icon";
import { CachedImage } from "../../components/CachedImage";
import { createRows } from "../../utils/utils";

import { GET_FROTA_GRUPOS } from "../../config/resources/queries/frotaQuery";
import styles from "./styles";

const retIcon = (gruposCompletos, id) => {
	if (gruposCompletos.includes(id)) {
		return (
			<View style={styles.groupIcon}>
				<Icon
					name="checkmark"
					size={scale(15)}
					color={EStyleSheet.value("$internalButton")}
					type="ion"
				/>
			</View>
		);
	}
};

const ListItemGrupo = ({ data, onPress, gruposCompletos }) => {
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
				{retIcon(gruposCompletos, data.id)}
				<CachedImage imageName={data.imagem} style={styles.groupImage} />
				<Text style={styles.groupText}>{data.grupoItem}</Text>
			</View>
		</TouchableHighlight>
	);
};

class ListFrotaGrupos extends Component {
	constructor(props) {
		super(props);
		this.state = {
			count: 0
		};
	}

	render() {
		const { id, columns, onHandlePress, gruposCompletos, onCount } = this.props;
		return (
			<Query query={GET_FROTA_GRUPOS} variables={{ id }}>
				{({ loading, error, data, refetch }) => {
					if (loading) return <Text>Buscando os grupos</Text>;
					if (error) {
						return <Text>Error</Text>;
					}
					return (
						<FlatList
							data={createRows([...data.frotaGrupoItem], columns)}
							keyExtractor={item => item.id.toString()}
							numColumns={columns}
							renderItem={({ item }) => (
								<ListItemGrupo
									data={item}
									gruposCompletos={gruposCompletos}
									onPress={() =>
										onHandlePress(item, data.frotaGrupoItem.length)
									}
								/>
							)}
						/>
					);
				}}
			</Query>
		);
	}
}
export default ListFrotaGrupos;
