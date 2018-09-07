import React from "react";
import PropTypes from "prop-types";
import { View, Image } from "react-native";
import styles from "./styles";

const FuelMarker = ({ fuel }) => (
	<View style={styles.container}>
		<Image source={require("./image/fuelmarker.png")} style={styles.image} />
		<View
			style={[
				styles.marker,
				{
					transform: [{ rotate: `${fuel}deg` }]
				}
			]}
		>
			<View style={styles.markerLine} />
			<View style={styles.thumb} />
			<View
				style={[
					styles.markerLine,
					{
						backgroundColor: "transparent"
					}
				]}
			/>
		</View>
	</View>
);

FuelMarker.propTypes = {
	fuel: PropTypes.number
};

export default FuelMarker;
