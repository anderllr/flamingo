import EStyleSheet from "react-native-extended-stylesheet";
import { Dimensions } from "react-native";

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
		marginTop: 20
	},
	loginButton: {
		width: "90%"
	},
	buttonStyle: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 10
	},
	lineForm: {
		flex: 1,
		flexDirection: "row"
	}
});

export default styles;
