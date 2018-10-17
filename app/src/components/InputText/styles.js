import EStyleSheet from "react-native-extended-stylesheet";
import { StyleSheet, Dimensions } from "react-native";
import { moderateScale } from "react-native-size-matters";

import { factorHeigth } from "../../utils/consts";

const INPUT_HEIGHT = moderateScale(42) * factorHeigth;
const BORDER_RADIUS = moderateScale(10);

const styles = EStyleSheet.create({
	sizeContainer: {
		width: "100%",
		marginRight: moderateScale(4),
		marginBottom: moderateScale(4) * factorHeigth
	},
	container: {
		backgroundColor: "$white",
		width: "100%",
		height: INPUT_HEIGHT,
		borderRadius: BORDER_RADIUS,
		flexDirection: "row",
		alignItems: "center"
	},
	containerDisabled: {
		backgroundColor: "$lightGray"
	},
	labelContainer: {
		height: INPUT_HEIGHT,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "$white",
		borderTopLeftRadius: BORDER_RADIUS,
		borderBottomLeftRadius: BORDER_RADIUS
	},
	labelText: {
		fontWeight: "600",
		fontSize: moderateScale(10),
		paddingHorizontal: moderateScale(8),
		color: "$inputText"
	},
	input: {
		height: INPUT_HEIGHT,
		flex: 1,
		fontSize: moderateScale(9),
		paddingHorizontal: moderateScale(2),
		color: "$inputText"
	},
	border: {
		height: INPUT_HEIGHT,
		width: StyleSheet.hairlineWidth,
		backgroundColor: "$border"
	},
	inputContainer: {
		backgroundColor: "$white",
		height: INPUT_HEIGHT,
		borderRadius: moderateScale(4),
		justifyContent: "center",
		alignItems: "flex-start",
		marginTop: moderateScale(4) * factorHeigth,
		borderColor: "$border",
		borderWidth: moderateScale(1),
		width: "100%",
		padding: moderateScale(3)
	},
	inputText: {
		paddingHorizontal: moderateScale(2),
		justifyContent: "center",
		fontWeight: "400",
		color: "$darkText",
		backgroundColor: "transparent",
		width: "100%",
		fontFamily: "lato-bold",
		letterSpacing: 0.35,
		fontSize: moderateScale(6)
	},
	titleText: {
		color: "$titleText",
		fontSize: moderateScale(9),
		fontWeight: "300",
		fontFamily: "lato-bold",
		letterSpacing: 0.35
	}
});

export default styles;
