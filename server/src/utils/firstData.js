import { db } from "../models";
import { ADMIN_PASSWORD, ADMIN_EMAIL } from "./utils";

const { User, Frota } = db;
import dbFrota from "./dbFrota";

const adminUser = {
	name: "Administrador do Sistema",
	userName: "admin",
	app: true,
	web: true,
	email: ADMIN_EMAIL,
	password: ADMIN_PASSWORD
};

const existUser = async () => {
	const user = await User.find({ userName: "admin" });
	return user.length > 0;
};

export const verifyAdmin = async () => {
	const exist = await existUser();
	if (!exist) {
		User(adminUser).save();
	}
};

const existFrota = async () => {
	const frota = await Frota.find();
	return frota.length > 0;
};

export const verifyFrota = async () => {
	const exist = await existFrota();
	if (!exist) {
		dbFrota.map(async frota => {
			await Frota(frota).save();
		});
	}
};
