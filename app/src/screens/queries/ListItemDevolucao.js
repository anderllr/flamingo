import React from "react";
import { View, Text, TouchableHighlight } from "react-native";
import PropTypes from "prop-types";
import { scale } from "react-native-size-matters";

import styles from "./styles";
import { Icon } from "../../components/Icon";

const ListItemDevolucao = ({ data, onPress }) => (
	<TouchableHighlight underlayColor={styles.$underlayColor} onPress={onPress}>
		<View style={styles.listContainer}>
			<View style={{ width: "55%", flexDirection: "column" }}>
				<Text style={[styles.text, styles.textTitle]}>Frota/Cliente</Text>
				<Text style={styles.text}>{`${data.nrFrota}-${data.name}`}</Text>
				<Text style={styles.text}>JOÃO DA NEVES - FAZ. ESPERANÇA</Text>
			</View>
			<View style={{ width: "15%", flexDirection: "column" }}>
				<Text style={[styles.text, styles.textTitle]}>Locação</Text>
				<Text style={styles.text}>15/08/2018</Text>
			</View>
			<View style={{ width: "20%", flexDirection: "column" }}>
				<Text style={[styles.text, styles.textTitle]}>Devolução Prevista</Text>
				<Text style={styles.text}>31/10/2018</Text>
			</View>
			<View
				style={{
					width: "10%",
					alignItems: "flex-end",
					justifyContent: "center"
				}}
			>
				<Icon
					name="keyboard-arrow-right"
					size={scale(15)}
					color="#60614b"
					type="material"
				/>
			</View>
		</View>
	</TouchableHighlight>
);

ListItemDevolucao.propTypes = {
	data: PropTypes.object,
	onPress: PropTypes.func
};

export default ListItemDevolucao;
