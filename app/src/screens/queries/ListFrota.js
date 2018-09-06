import React from "react";
import PropTypes from "prop-types";

import { FlatList, View, Text, TouchableHighlight } from "react-native";
import { graphql } from "react-apollo";

import { GET_FROTA } from "../../config/resources/queries/frotaQuery";
import ListItemSaida from "./ListItemSaida";
import ListItemDevolucao from "./ListItemDevolucao";

//TODO: make search with parameters passed by Main Screen
//TODO: Change query to search date of the last location

const ListFrota = props => {
	return (
		<FlatList
			data={props.data.frota}
			keyExtractor={item => item.id.toString()}
			renderItem={({ item, index }) =>
				props.active === "saida" ? (
					<ListItemSaida
						data={item}
						onPress={() => props.onHandlePress(item)}
					/>
				) : (
					(props.active = "devolucao" ? (
						<ListItemDevolucao
							data={item}
							onPress={() => props.onHandlePress(item)}
						/>
					) : null)
				)
			}
		/>
	);
};

ListFrota.propTypes = {
	nrFrota: PropTypes.string,
	name: PropTypes.string,
	onPress: PropTypes.func
};

export default graphql(GET_FROTA)(ListFrota);
