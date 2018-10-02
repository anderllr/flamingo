import React from "react";
import PropTypes from "prop-types";

import { FlatList, View, Text, TouchableHighlight } from "react-native";
import { graphql } from "react-apollo";

import { GET_VISTORIA_DEVOLUCAO } from "../../config/resources/queries/vistoriaQuery";
import ListItemDevolucao from "./ListItemDevolucao";

//TODO: make search with parameters passed by Main Screen
//TODO: Change query to search date of the last location

const ListFrotaDevolucao = props => {
	return (
		<FlatList
			data={props.data.vistoriaDevolucao}
			keyExtractor={item => item.id.toString()}
			renderItem={({ item, index }) => (
				<ListItemDevolucao
					data={item}
					onPress={() => props.onHandlePress(item)}
				/>
			)}
		/>
	);
};

ListFrotaDevolucao.propTypes = {
	nrFrota: PropTypes.number,
	name: PropTypes.string,
	onPress: PropTypes.func
};

export default graphql(GET_VISTORIA_DEVOLUCAO, {
	options: props => ({
		variables: {
			frotaId: props.frotaId,
			clienteId: props.clienteId
		}
	})
})(ListFrotaDevolucao);
