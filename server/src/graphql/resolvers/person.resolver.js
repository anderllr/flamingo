import { authenticated } from './auth.resolver';

export default {
	Person: {
		qualifications: async (person, args, { db }) => {
			return person.qualifications;
		},
	},
	Query: {
		//Remember that for this case we will have only one person ever
		person: async (parent, args, { db }) => {
			const { Person } = db;
			const person = await Person.findById(args.id);
			return person;
		},
	},
	Mutation: {
		createPerson: authenticated(async (parent, { input }, { db }) => {
			const { Person } = db;
			//First check if have register in our Person collection
			//Because I don't want to register more than once
			const person = await Person.findOne();
			if (person) {
				await person.set(input).save();
				return person;
			}
			const personNew = new Person(input);
			await personNew.save();
			return personNew;
		}),
		updatePerson: authenticated(async (parent, { id, input }, { db }) => {
			const { Person } = db;
			const person = await Person.findById(id);
			await person.set(input).save();
			return person;
		}),
		deletePerson: authenticated(async (parent, { id }, { db }) => {
			const { Person } = db;
			const personRemoved = await Person.findByIdAndRemove(id);

			if (!personRemoved) {
				throw new Error('Error removing person');
			}

			return personRemoved;
		}),
	},
};
