import { db } from '../models';
import { ADMIN_PASSWORD, ADMIN_EMAIL } from '../utils/utils';

const { User } = db;

const adminUser = {
    'name': 'Administrador do Sistema',
	'userName': 'admin',
	'app': true,
	'web': true,
	'email': ADMIN_EMAIL,
	'password': ADMIN_PASSWORD
}

const existUser = async () => {
    const user = await User.find({ userName: 'admin'});
    return user.length > 0;
}

export const verifyAdmin = async () => {
    const exist = await existUser();
    if (!exist) {
        User(adminUser).save();
    }
}