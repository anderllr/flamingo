import EStyleSheet from "react-native-extended-stylesheet";
import { verticalScale, moderateScale } from "react-native-size-matters";

const BORDER_RADIUS = moderateScale(5);

const styles = EStyleSheet.create({
	$underlayColor: "$darkGreen",
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
	},
	asideInner: {
		flex: 2,
		alignItems: "flex-start",
		justifyContent: "flex-start",
		backgroundColor: "$white",
		padding: moderateScale(10),
		marginTop: verticalScale(10),
		marginLeft: moderateScale(10),
		marginBottom: moderateScale(3),
		borderRadius: BORDER_RADIUS
	},
	backgroundInner: {
		flex: 5,
		backgroundColor: "$white",
		padding: moderateScale(10),
		marginTop: verticalScale(10),
		marginLeft: moderateScale(10),
		marginBottom: moderateScale(3),
		marginRight: moderateScale(10),
		borderRadius: BORDER_RADIUS
	},
	titleText: {
		fontSize: moderateScale(9),
		fontWeight: "500",
		fontFamily: "lato-bold",
		marginBottom: verticalScale(10),
		color: "$primaryFont"
	},
	labelText: {
		color: "$titleText",
		fontSize: moderateScale(6),
		fontWeight: "300",
		fontFamily: "lato-bold",
		letterSpacing: 0.35
	},
	slider: {
		marginTop: 0,
		width: moderateScale(110)
	},
	fuelMarker: {
		flexDirection: "column",
		alignItems: "center"
	},
	groupContainer: {
		flexGrow: 1,
		flexBasis: 0,
		aspectRatio: 1,
		margin: moderateScale(4),
		padding: moderateScale(5),
		alignItems: "center"
	},
	pictureContainer: {
		borderRadius: BORDER_RADIUS,
		borderColor: "$border",
		borderWidth: moderateScale(1),
		flexGrow: 1,
		flexBasis: 0,
		aspectRatio: 1.2,
		margin: moderateScale(5),
		padding: moderateScale(5)
	},
	groupItens: {
		width: "100%",
		height: "100%",
		alignItems: "center",
		justifyContent: "center"
	},
	groupIcon: {},
	groupImage: {
		width: "50%",
		height: "50%"
	},
	groupText: {
		color: "$inputText",
		fontSize: moderateScale(5),
		fontWeight: "300",
		fontFamily: "lato-bold",
		bottom: verticalScale(1),
		position: "absolute"
	},
	groupEmpty: {
		backgroundColor: "transparent",
		borderColor: "transparent"
	},
	separatorLine: {
		width: "100%",
		margin: moderateScale(4),
		height: verticalScale(2),
		backgroundColor: "$backgroundColor"
	},
	radioText: {
		color: "$titleText",
		fontSize: moderateScale(9),
		fontWeight: "200",
		fontFamily: "lato-bold",
		letterSpacing: 0.35
	}
});

export default styles;
