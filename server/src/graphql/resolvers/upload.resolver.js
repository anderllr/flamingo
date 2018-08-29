import { GraphQLUpload } from "apollo-upload-server";

export default {
	Upload: GraphQLUpload,
	Mutation: {
		singleUpload: async (parent, { file }) => {
			const { stream, filename, mimetype, encoding } = await file;

			console.log("FileName: ", filename);
			return { filename, mimetype, encoding };
		}
	}
};
