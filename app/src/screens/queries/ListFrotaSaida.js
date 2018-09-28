import React from "react";
import PropTypes from "prop-types";

import { FlatList, View, Text, TouchableHighlight } from "react-native";
import { graphql } from "react-apollo";

import { GET_FROTA_DISPONIVEL } from "../../config/resources/queries/frotaQuery";
import ListItemSaida from "./ListItemSaida";

//TODO: make search with parameters passed by Main Screen
//TODO: Change query to search date of the last location

const ListFrotaSaida = props => {
	return (
		<FlatList
			data={props.data.frotaDisponivel}
			keyExtractor={item => item.id.toString()}
			renderItem={({ item, index }) => (
				<ListItemSaida data={item} onPress={() => props.onHandlePress(item)} />
			)}
		/>
	);
};

ListFrotaSaida.propTypes = {
	nrFrota: PropTypes.number,
	name: PropTypes.string,
	onPress: PropTypes.func
};

export default graphql(GET_FROTA_DISPONIVEL, {
	options: props => ({
		variables: {
			nrFrota: props.nrFrota,
			name: props.name
		}
	})
})(ListFrotaSaida);
