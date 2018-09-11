import EStyleSheet from "react-native-extended-stylesheet";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

const INPUT_HEIGHT = verticalScale(32);

const styles = EStyleSheet.create({
	sizeContainer: {
		width: "100%",
		marginRight: scale(4),
		marginBottom: verticalScale(4)
	},
	inputContainer: {
		backgroundColor: "$white",
		height: INPUT_HEIGHT,
		borderRadius: scale(4),
		justifyContent: "center",
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
		fontSize: scale(6),
		width: "100%"
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
