import React, { Fragment } from "react";
import { Platform } from "react-native";
import PropTypes from "prop-types";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";

const ICON_PREFIX = Platform.OS === "ios" ? "ios" : "md";

const Icon = props => {
	return (
		<Fragment>
			{props.type === "ion" ? (
				<Ionicons
					name={`${ICON_PREFIX}-${props.name}`}
					color={props.color ? props.color : "#fff"}
					size={props.size}
				/>
			) : props.type === "fa" ? (
				<FontAwesome
					name={`${props.name}`}
					color={props.color ? props.color : "#fff"}
					size={props.size}
				/>
			) : (
				<MaterialIcons
					name={`${props.name}`}
					color={props.color ? props.color : "#fff"}
					size={props.size}
				/>
			)}
		</Fragment>
	);
};
Icon.propTypes = {
	name: PropTypes.string,
	color: PropTypes.string,
	size: PropTypes.number,
	type: PropTypes.string
};

export default Icon;
