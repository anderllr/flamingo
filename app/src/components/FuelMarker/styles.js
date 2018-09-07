import EStyleSheet from "react-native-extended-stylesheet";
import { scale, verticalScale } from "react-native-size-matters";

export default EStyleSheet.create({
	$thumbSize: scale(8),
	$thumbRadius: scale(8) / 2,
	$imageWidth: scale(86),
	$imageHeight: verticalScale(65),
	$markerWidth: scale(23),
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
		marginBottom: verticalScale(7)
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
