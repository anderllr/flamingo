import EStyleSheet from "react-native-extended-stylesheet";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { screenWidth, factorHeigth } from "../../utils/consts";

const buttonWidth = screenWidth / 2;
const squareButtonDimension = screenWidth / 4;
const iconDimension = squareButtonDimension * 0.6;
const fontIcon = squareButtonDimension * 0.13;
const BORDER_RADIUS = scale(2);

const styles = EStyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "$internalButton",
		width: "100%",
		borderRadius: BORDER_RADIUS,
		margin: verticalScale(9) * factorHeigth,
		height: verticalScale(32) * factorHeigth,
		width: buttonWidth
	},
	containerSquare: {
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "$primaryGreen",
		width: squareButtonDimension,
		height: squareButtonDimension * factorHeigth,
		borderRadius: BORDER_RADIUS,
		margin: 10 * factorHeigth
	},
	wrapper: {
		flex: 1,
		width: "100%",
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "center",
		paddingLeft: moderateScale(15)
	},
	text: {
		color: "$white",
		fontSize: moderateScale(10) * factorHeigth,
		fontWeight: "500",
		fontFamily: "lato-bold",
		letterSpacing: 0.35
	},
	icon: {
		backgroundColor: "transparent",
		width: iconDimension * factorHeigth,
		height: iconDimension * factorHeigth,
		alignItems: "center",
		justifyContent: "center"
	},
	inactiveButton: {
		backgroundColor: "transparent",
		borderColor: "$inactiveButton",
		borderWidth: moderateScale(1)
	},
	inactiveText: {
		color: "$inactiveButton",
		fontWeight: "400"
	}
});

export default styles;
