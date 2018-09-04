import EStyleSheet from "react-native-extended-stylesheet";
import { StyleSheet, Dimensions } from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

const INPUT_HEIGHT = scale(25);
const BORDER_RADIUS = scale(10);

const styles = EStyleSheet.create({
	sizeContainer: {
		width: "100%"
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
		paddingHorizontal: moderateScale(4),
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
		alignItems: "center",
		marginRight: moderateScale(5),
		marginTop: verticalScale(5),
		borderColor: "$border",
		borderWidth: moderateScale(2),
		width: "100%"
	},
	inputText: {
		fontSize: scale(8),
		paddingLeft: moderateScale(5),
		justifyContent: "center",
		fontWeight: "400",
		color: "$darkText",
		backgroundColor: "$white",
		width: "100%"
	},
	titleText: {
		color: "$titleText",
		fontSize: scale(8),
		fontWeight: "300"
	}
});

export default styles;
