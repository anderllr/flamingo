import mongoose from 'mongoose';

/*
  This Schema represents data from a person who is showed personal profile
  There is no ID because Mongoose will assign an ID by default.

  All informations are required
*/

//QualificationsSchema to inform some expertise that person have
const QualificationsSchema = new mongoose.Schema({
	qualification: { type: String, required: true },
	description: { type: String, required: true },
});

//Area to inform technical skills with percentage of each one... like Javascript 80%
const TechnicalSchema = new mongoose.Schema({
	name: { type: String, required: true },
	percent: { type: Number, min: 1, max: 100, required: true },
});

const PersonSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		title: { type: String, required: true },
		address: { type: String, required: true },
		city: { type: String, required: true },
		phone_number: { type: String, required: true },
		email: { type: String, required: true },
		description: { type: String, required: true },
		picture_url: String,
		qualifications: [QualificationsSchema],
	},
	{ collection: 'person' }
);

export const Person = mongoose.model('Person', PersonSchema);
