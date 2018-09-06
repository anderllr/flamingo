import { Platform } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { scale, verticalScale } from "react-native-size-matters";

export default EStyleSheet.create({
	$underlayColor: "$border",
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
	}
});
