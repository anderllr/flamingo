import React from "react";
import { Platform } from "react-native";
import PropTypes from "prop-types";
import { Ionicons } from "@expo/vector-icons";

const ICON_PREFIX = Platform.OS === "ios" ? "ios" : "md";

const Icon = props => (
	<Ionicons
		name={`${ICON_PREFIX}-${props.name}`}
		color={props.color ? props.color : "#fff"}
		size={props.size}
	/>
);

Icon.propTypes = {
	name: PropTypes.string,
	color: PropTypes.string,
	size: PropTypes.number
};

export default Icon;
