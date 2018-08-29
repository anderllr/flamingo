const uploadTypes = `
    scalar Upload

    type File {
        filename: String!
        path: String!
    }
`;

const uploadQueries = `
    uploads: [File]
`;

const uploadMutations = `
    uploadFile(file: Upload!, screen: String!, id: String!): File
    multipleUpload(files: [Upload!]!): [File!]!
`;

export { uploadTypes, uploadQueries, uploadMutations };
