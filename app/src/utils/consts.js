import { Dimensions, Platform } from "react-native";

const screenHeigth = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const isIPhoneX =
	Platform.OS === "ios" && screenHeigth === 375 && screenWidth === 812;

const idealHeigth = isIPhoneX ? 450 : 400;
const idealWidth = 640;

const factorHeigth =
	!isIPhoneX && idealHeigth < screenHeigth ? 1 : screenHeigth / idealHeigth;
const factorWidth =
	!isIPhoneX && idealWidth < screenWidth ? 1 : screenWidth / idealWidth;

//const BASE_URL = "http://142.93.90.171";
//const PORT = 0;
const BASE_URL = "http://192.168.1.109";
const PORT = 3002;

export {
	factorHeigth,
	factorWidth,
	BASE_URL,
	PORT,
	isIPhoneX,
	screenHeigth,
	screenWidth
};
