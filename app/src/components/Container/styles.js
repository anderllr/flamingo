import EStyleSheet from "react-native-extended-stylesheet";

import { isIPhoneX } from "../../utils/consts";

export default EStyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "$backgroundColor",
		flexDirection: "row",
		paddingBottom: isIPhoneX ? 10 : 5
	}
});
