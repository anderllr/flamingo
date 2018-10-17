import EStyleSheet from "react-native-extended-stylesheet";
import { moderateScale, verticalScale } from "react-native-size-matters";

import { factorHeigth } from "../../utils/consts";

export default EStyleSheet.create({
	$thumbSize: moderateScale(8) * factorHeigth,
	$thumbRadius: moderateScale(8) / 2,
	$imageWidth: moderateScale(110),
	$imageHeight: verticalScale(65) * factorHeigth,
	$markerWidth: moderateScale(35),
	container: {
		justifyContent: "flex-end",
		alignItems: "center",
		marginTop: 0,
		width: "$imageWidth",
		height: "$imageHeight"
	},
	marker: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: verticalScale(9) * factorHeigth
	},
	markerLine: {
		height: verticalScale(2),
		width: "$markerWidth",
		backgroundColor: "red"
	},
	thumb: {
		height: "$thumbSize",
		width: "$thumbSize",
		borderRadius: "$thumbRadius",
		backgroundColor: "black"
	},
	image: {
		backgroundColor: "transparent",
		position: "absolute",
		aspectRatio: 1,
		resizeMode: "stretch",
		width: "100%",
		height: "100%"
	}
});
