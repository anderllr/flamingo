import EStyleSheet from "react-native-extended-stylesheet";
import { verticalScale, moderateScale } from "react-native-size-matters";

const INPUT_HEIGHT = verticalScale(42);

const styles = EStyleSheet.create({
	sizeContainer: {
		width: "100%",
		marginRight: moderateScale(4),
		marginBottom: verticalScale(4)
	},
	inputContainer: {
		backgroundColor: "$white",
		height: INPUT_HEIGHT,
		borderRadius: moderateScale(4),
		justifyContent: "center",
		marginTop: verticalScale(4),
		borderColor: "$border",
		borderWidth: moderateScale(1),
		width: "100%",
		padding: moderateScale(3)
	},
	inputText: {
		fontSize: moderateScale(8),
		paddingHorizontal: moderateScale(2),
		justifyContent: "center",
		fontWeight: "400",
		color: "$darkText",
		backgroundColor: "transparent",
		width: "100%",
		fontFamily: "lato-bold",
		letterSpacing: 0.35,
		fontSize: moderateScale(6),
		width: "100%"
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
