import EStyleSheet from "react-native-extended-stylesheet";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

const BORDER_RADIUS = scale(5);

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
		marginLeft: scale(10),
		marginBottom: scale(3),
		borderRadius: BORDER_RADIUS
	},
	backgroundInner: {
		flex: 5,
		backgroundColor: "$white",
		padding: moderateScale(10),
		marginTop: verticalScale(10),
		marginLeft: scale(10),
		marginBottom: scale(3),
		marginRight: scale(10),
		borderRadius: BORDER_RADIUS
	},
	titleText: {
		fontSize: scale(9),
		fontWeight: "500",
		fontFamily: "lato-bold",
		marginBottom: verticalScale(10),
		color: "$primaryFont"
	},
	labelText: {
		color: "$titleText",
		fontSize: scale(6),
		fontWeight: "300",
		fontFamily: "lato-bold",
		letterSpacing: 0.35
	},
	slider: {
		marginTop: 0,
		width: scale(110)
	},
	fuelMarker: {
		flexDirection: "column",
		alignItems: "center"
	},
	groupContainer: {
		borderRadius: BORDER_RADIUS,
		borderColor: "$border",
		borderWidth: scale(1),
		flexGrow: 1,
		flexBasis: 0,
		aspectRatio: 1,
		margin: scale(4),
		padding: moderateScale(5)
	},
	groupItens: {
		width: "100%",
		height: "100%",
		alignItems: "center",
		justifyContent: "center"
	},
	groupIcon: {
		position: "absolute",
		right: "10%",
		top: 0
	},
	groupImage: {
		width: "50%",
		height: "50%"
	},
	groupText: {
		color: "$inputText",
		fontSize: scale(5),
		fontWeight: "300",
		fontFamily: "lato-bold",
		bottom: verticalScale(10),
		position: "absolute"
	},
	groupEmpty: {
		backgroundColor: "transparent",
		borderColor: "transparent"
	}
});

export default styles;
