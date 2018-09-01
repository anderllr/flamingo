import EStyleSheet from "react-native-extended-stylesheet";
import { Dimensions } from "react-native";

const buttonWidth = Dimensions.get("window").width / 2;
const squareButtonDimension = Dimensions.get("window").width / 4;
const iconDimension = squareButtonDimension * 0.6;
const fontIcon = squareButtonDimension * 0.13;
const BORDER_RADIUS = 4;

const styles = EStyleSheet.create({
	container: {
		alignItems: "center",
		backgroundColor: "$primaryButton",
		width: "100%",
		borderRadius: BORDER_RADIUS,
		marginTop: 15,
		height: 50,
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
		fontSize: 10,
		fontWeight: "100",
		paddingVertical: 5
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
