import EStyleSheet from "react-native-extended-stylesheet";
import { Dimensions } from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

const imageWidth = Dimensions.get("window").width;
const imageHeight = Dimensions.get("window").height;

const styles = EStyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
		flex: 1
	},
	fields: {
		width: "90%",
		marginTop: verticalScale(20)
	},
	loginButton: {
		width: "90%"
	},
	buttonStyle: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: moderateScale(10)
	},
	lineForm: {
		flex: 1,
		flexDirection: "row"
	},
	asideMain: {
		flex: 2,
		alignItems: "center",
		justifyContent: "flex-start",
		backgroundColor: "$asideColor", //TODO -> $asideColor
		paddingTop: moderateScale(40)
	},
	backgroundMain: {
		flex: 6,
		backgroundColor: "$white",
		padding: moderateScale(15)
	}
});

export default styles;
