import { Platform } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { scale, verticalScale } from "react-native-size-matters";

export default EStyleSheet.create({
	$smallContainerSize: scale(60),
	$smallImageSize: scale(60),
	$largeContainerSize: scale(90),
	$largeImageSize: scale(90),
	$largeFontSizeT: scale(12),
	$largeFontSizeA: scale(9),
	$smallFontSizeT: scale(8),
	$smallFontSizeA: scale(5),
	containerText: {
		alignItems: "center"
	},
	containerImage: {
		alignItems: "center",
		justifyContent: "center",
		width: "$largeContainerSize",
		height: "$largeContainerSize",
		marginTop: 0,
		marginBottom: scale(10)
	},
	logo: {
		width: "$largeImageSize",
		marginBottom: 0
	},
	text: {
		marginTop: 0,
		color: "$darkGreen",
		letterSpacing: -0.5,
		fontFamily: Platform.OS === "ios" ? "Bangla Sangam MN" : "Roboto"
	},
	textTitle: {
		fontSize: "$largeFontSizeT",
		marginTop: verticalScale(1),
		fontWeight: "600"
	},
	textApp: {
		top: 0,
		fontSize: "$largeFontSizeT",
		fontWeight: "300"
	}
});
