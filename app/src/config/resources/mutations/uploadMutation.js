import gql from "graphql-tag";

export const UPLOAD_FILE = gql`
	mutation uploadFile($file: Upload!, $screen: String!, $id: String!) {
		uploadFile(file: $file, screen: $screen, id: $id) {
			filename
			path
		}
	}
`;
