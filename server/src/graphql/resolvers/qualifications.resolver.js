import { authenticated } from './auth.resolver';

export default {
	Query: {
		//Remember that for this case we will have only one person ever
		qualificationsByPerson: async (parent, { personId }, { db }) => {
			const { Person } = db;

			const person = await Person.findById(personId);

			return person.qualifications;
		},
	},
	Mutation: {
		createQualification: authenticated(async (parent, { personId, input }, { db }) => {
			const { Person } = db;

			const person = await Person.findById(personId);

			//Push returns number of array members
			const res = person.qualifications.push(input);

			await person.save();

			return person.qualifications[res - 1];
		}),
		updateQualification: authenticated(async (parent, { personId, id, input }, { db }) => {
			const { Person } = db;
			const person = await Person.findById(personId);
			const qualification = person.qualifications.id(id);
			qualification.set(input);
			await person.save();
			return person.qualifications.id(id);
		}),
		deleteQualification: authenticated(async (parent, { personId, id }, { db }) => {
			const { Person } = db;
			const person = await Person.findById(personId);
			const qualificationRemoved = await person.qualifications.id(id).remove();
			await person.save();

			if (!qualificationRemoved) {
				throw new Error('Error removing qualification');
			}

			return qualificationRemoved;
		}),
	},
};
