import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../../utils/utils';
import { authenticated } from './auth.resolver';

export default {
	Query: {
		users: async (parent, args, { db: { User } }) => {
			const users = await User.find(args);
			return users.map(user => {
				user._id = user._id.toString();
				return user;
			});
		},
		user: async (parent, args, { db: { User } }) => {
			const user = await User.findById(args.id);
			return user;
		},
		authUser: async (parent, args, { authUser, db }) => {
			return authUser;
			//const user = await db.User.findById("5b4e470dd8bc6e302cb1f6cf");
			//return user;
		},
		login: async (parent, { email, password }, { db: { User } }) => {
			const user = await User.findOne({ email });

			let errorMsg = 'Unauthorized, wrong email or password!';
			if (!user || !bcrypt.compareSync(password, user.password)) {
				throw new Error(errorMsg);
			}

			const payload = { sub: user._id };

			return {
				token: jwt.sign(payload, JWT_SECRET),
			};
		}

	},
	Mutation: {
		createUser: async (parent, { input }, { db }) => {
			const { User } = db;
			const user = await new User(input).save();
			return user;
		},
		updateUserPassword: async (parent, { id, input }, { db: { User } }) => {
			const user = await User.findById(id);
			user.set(input);
			await user.save();
			if (!user) {
				return false;
			}
			return true;
		},
		deleteUser: async (parent, { id }, { db: { User } }) => {
			const userRemoved = await User.findByIdAndRemove(id);

			if (!userRemoved) {
				throw new Error('Error removing user');
			}

			return userRemoved;
		},
	},
};
