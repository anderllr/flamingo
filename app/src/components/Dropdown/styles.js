import EStyleSheet from "react-native-extended-stylesheet";
import { verticalScale, moderateScale } from "react-native-size-matters";
import { factorHeigth } from "../../utils/consts";

const INPUT_HEIGHT = verticalScale(42) * factorHeigth;

const styles = EStyleSheet.create({
	sizeContainer: {
		width: "100%",
		marginRight: moderateScale(4),
		marginBottom: verticalScale(4) * factorHeigth
	},
	inputContainer: {
		backgroundColor: "$white",
		height: INPUT_HEIGHT,
		borderRadius: moderateScale(4),
		justifyContent: "center",
		marginTop: verticalScale(4) * factorHeigth,
		borderColor: "$border",
		borderWidth: moderateScale(1),
		width: "100%",
		paddingLeft: moderateScale(3)
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
		fontSize: moderateScale(6)
	},
	titleText: {
		color: "$titleText",
		fontSize: moderateScale(9),
		fontWeight: "300",
		fontFamily: "lato-bold",
		letterSpacing: 0.35
	},
	button: {
		backgroundColor: "$titleText",
		height: "100%",
		aspectRatio: 1,
		borderRadius: moderateScale(4),
		alignItems: "center",
		justifyContent: "center"
	}
});

export default styles;
