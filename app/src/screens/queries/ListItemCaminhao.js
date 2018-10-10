import React from "react";
import { View, Text, TouchableHighlight } from "react-native";
import PropTypes from "prop-types";
import { scale } from "react-native-size-matters";

import styles from "./styles";
import { Icon } from "../../components/Icon";

const ListItemCaminhao = ({ data, onPress }) => {
	const colorStyle =
		data.status === "DISPONÍVEL"
			? { color: "#008000", fontWeight: "700" }
			: { color: "#ff0000", fontWeight: "700" };
	return (
		<TouchableHighlight underlayColor={styles.$underlayColor} onPress={onPress}>
			<View style={styles.listContainer}>
				<View style={{ width: "70%", flexDirection: "column" }}>
					<Text style={[styles.text, styles.textTitle]}>Caminhão/Placa</Text>
					<Text style={styles.text}>{`${data.name}`}</Text>
					<Text style={[styles.text, { fontWeight: "100" }]}>{`${
						data.placa
					}`}</Text>
				</View>
				<View
					style={{
						width: "20%",
						flexDirection: "column",
						alignItems: "center"
					}}
				>
					<Text style={[styles.text, styles.textTitle]}>Status</Text>
					<Text style={[styles.text, colorStyle]}>{`${data.status}`}</Text>
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
};

ListItemCaminhao.propTypes = {
	data: PropTypes.object,
	onPress: PropTypes.func
};

export default ListItemCaminhao;
