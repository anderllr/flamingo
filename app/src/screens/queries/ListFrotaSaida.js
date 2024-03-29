import React, { Component } from "react";
import PropTypes from "prop-types";

import { FlatList } from "react-native";
import { graphql } from "react-apollo";

import { GET_FROTA_DISPONIVEL } from "../../config/resources/queries/frotaQuery";
import ListItemSaida from "./ListItemSaida";

class ListFrotaSaida extends Component {
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
				data={this.props.data.frotaDisponivel}
				keyExtractor={item => item.id.toString()}
				renderItem={({ item, index }) => (
					<ListItemSaida
						data={item}
						onPress={() => this.props.onHandlePress(item)}
					/>
				)}
			/>
		);
	}
}

export default graphql(GET_FROTA_DISPONIVEL, {
	options: props => ({
		variables: {
			nrFrota: props.nrFrota,
			name: props.name
		}
	})
})(ListFrotaSaida);
