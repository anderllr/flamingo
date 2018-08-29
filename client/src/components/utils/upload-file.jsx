import React from "react";
import { graphql } from "react-apollo";
import uploadsQuery from "../resources/queries/uploadQuery";
import uploadsMutation from "../resources/mutations/uploadMutation";

const UploadFile = ({ mutate }) => {
	const handleChange = ({
		target: {
			validity,
			files: [file]
		}
	}) =>
		validity.valid &&
		mutate({
			variables: { file },
			update(
				proxy,
				{
					data: { singleUpload }
				}
			) {
				console.log("Entrou no após mutate");
				const data = proxy.readQuery({ query: uploadsQuery });
				console.log("Data: ", data);
				data.uploads.push(singleUpload);
				proxy.writeQuery({ query: uploadsQuery, data });
			}
		});

	return <input type="file" required onChange={handleChange} />;
};

export default graphql(uploadsMutation)(UploadFile);
