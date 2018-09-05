import React from "react";
import { FlatList, View, Text } from "react-native";
import { Query } from "react-apollo";

import { GET_FROTA } from "../../config/resources/queries/frotaQuery";

const ListFrotaSaida = props => {
	_renderItem = ({ item }) => (
		<MyListItem
			id={item.id}
			onPressItem={this._onPressItem}
			selected={!!this.state.selected.get(item.id)}
			title={item.title}
		/>
	);
	return (
		<Query query={GET_FROTA} displayName="getFrota">
			{({ loading, error, data, refetch, networkStatus }) => {
				if (loading) return <Text>Buscando os itens</Text>;
				if (error) {
					return <Text>{error}</Text>;
				}

				return (
					<FlatList
						data={data.frota}
						keyExtractor={item => item.id.toString()}
						renderItem={frota => {
							//		console.log("Frota: ", frota);
							return (
								<View key={frota.id}>
									<Text>{frota.nrFrota}</Text>
									<Text>{frota.name}</Text>
								</View>
							);
						}}
					/>
				);
			}}
		</Query>
	);
};

export default ListFrotaSaida;
