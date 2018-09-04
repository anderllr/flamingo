import EStyleSheet from "react-native-extended-stylesheet";
import { Dimensions } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

const buttonWidth = Dimensions.get("window").width / 2;
const squareButtonDimension = Dimensions.get("window").width / 4;
const iconDimension = squareButtonDimension * 0.6;
const fontIcon = squareButtonDimension * 0.13;
const BORDER_RADIUS = scale(2);

const styles = EStyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "$primaryButton",
		width: "100%",
		borderRadius: BORDER_RADIUS,
		marginTop: verticalScale(9),
		height: verticalScale(32),
		width: buttonWidth
	},
	containerSquare: {
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "$primaryButton",
		width: squareButtonDimension,
		height: squareButtonDimension,
		borderRadius: BORDER_RADIUS,
		margin: 10
	},
	wrapper: {
		alignItems: "center"
	},
	text: {
		color: "$white",
		fontSize: scale(10),
		fontWeight: "100"
	},
	icon: {
		backgroundColor: "transparent",
		width: iconDimension,
		height: iconDimension,
		alignItems: "center",
		justifyContent: "center"
	}
});

export default styles;
