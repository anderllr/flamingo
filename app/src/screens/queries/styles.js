import EStyleSheet from "react-native-extended-stylesheet";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

const BORDER_RADIUS = scale(5);

export default EStyleSheet.create({
	$underlayColor: "$darkGreen",
	listContainer: {
		backgroundColor: "$white",
		borderRadius: 6,
		padding: 10,
		borderBottomWidth: 0,
		shadowColor: "$shadow",
		shadowOffset: { width: 0, height: 2 },
		margin: scale(2),
		elevation: 1,
		shadowRadius: 5,
		shadowOpacity: 0.5,
		flexDirection: "row"
	},
	text: {
		fontSize: scale(7),
		color: "$listText",
		marginTop: verticalScale(3),
		fontFamily: "lato-bold",
		letterSpacing: 0.35
	},
	textTitle: {
		fontWeight: "bold"
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
