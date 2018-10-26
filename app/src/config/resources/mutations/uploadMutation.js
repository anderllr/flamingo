import gql from "graphql-tag";

export const UPLOAD_FILE = gql`
	mutation uploadFile(
		$file: Upload!
		$fileName: String
		$screen: String
		$id: String
	) {
		uploadFile(file: $file, fileName: $fileName, screen: $screen, id: $id) {
			filename
			path
		}
	}
`;

export const MULTIPLE_UPLOAD = gql`
	mutation multipleUpload($files: [Upload!]!) {
		multipleUpload(files: $files) {
			filename
			path
		}
	}
`;
