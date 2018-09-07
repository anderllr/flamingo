import EStyleSheet from "react-native-extended-stylesheet";
import { StyleSheet, Dimensions } from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

const INPUT_HEIGHT = verticalScale(32);
const BORDER_RADIUS = scale(10);

const styles = EStyleSheet.create({
	sizeContainer: {
		width: "100%",
		marginRight: scale(4),
		marginBottom: verticalScale(4)
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
		fontSize: scale(10),
		paddingHorizontal: moderateScale(8),
		color: "$inputText"
	},
	input: {
		height: INPUT_HEIGHT,
		flex: 1,
		fontSize: scale(9),
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
		borderRadius: scale(4),
		justifyContent: "center",
		alignItems: "flex-start",
		marginTop: verticalScale(4),
		borderColor: "$border",
		borderWidth: scale(1),
		width: "100%",
		padding: scale(3)
	},
	inputText: {
		fontSize: scale(8),
		paddingHorizontal: moderateScale(2),
		justifyContent: "center",
		fontWeight: "400",
		color: "$darkText",
		backgroundColor: "transparent",
		width: "100%",
		fontFamily: "lato-bold",
		letterSpacing: 0.35,
		fontSize: scale(6)
	},
	titleText: {
		color: "$titleText",
		fontSize: scale(6),
		fontWeight: "300",
		fontFamily: "lato-bold",
		letterSpacing: 0.35
	}
});

export default styles;
