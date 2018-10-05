import React, { Component } from "react";
import PropTypes from "prop-types";

import { FlatList } from "react-native";
import { graphql } from "react-apollo";

import { GET_VISTORIA_DEVOLUCAO } from "../../config/resources/queries/vistoriaQuery";
import ListItemDevolucao from "./ListItemDevolucao";

//TODO: make search with parameters passed by Main Screen
//TODO: Change query to search date of the last location

class ListFrotaDevolucao extends Component {
	static propTypes = {
		nrFrota: PropTypes.number,
		name: PropTypes.string,
		onPress: PropTypes.func,
		updateRefetch: PropTypes.func,
		refetch: PropTypes.bool
	};

	constructor(props) {
		super(props);
	}

	componentWillReceiveProps(nextProps) {
		//	console.log("Recebeu informação: ", this.props.refetch);
		if (nextProps.refetch) {
			this.refetchData();
		}
	}

	refetchData = () => {
		this.props.data.refetch();
		this.props.updateRefetch();
	};

	render() {
		return (
			<FlatList
				data={this.props.data.vistoriaDevolucao}
				keyExtractor={item => item.id.toString()}
				renderItem={({ item, index }) => (
					<ListItemDevolucao
						data={item}
						onPress={() => this.props.onHandlePress(item)}
					/>
				)}
			/>
		);
	}
}

export default graphql(GET_VISTORIA_DEVOLUCAO, {
	options: props => ({
		variables: {
			frotaId: props.frotaId,
			clienteId: props.clienteId
		}
	})
})(ListFrotaDevolucao);
