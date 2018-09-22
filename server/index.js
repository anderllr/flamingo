import express from "express";
import bodyParser from "body-parser";
import graphqlHTTP from "express-graphql";
import mongoose from "mongoose";
import cors from "cors";
import { apolloUploadExpress } from "apollo-upload-server";
const env = require("dotenv").config();

import schema from "./src/graphql/schema";
import { db } from "./src/models";
import { tokenMiddleware } from "./src/utils/tokenMiddleware";
import { verifyAdmin, verifyFrota } from "./src/utils/firstData";

import { MONGODB_URI, MONGO_PASSWORD, MONGO_USER } from "./src/utils/utils";

const APP_NAME = "flamingoapp";

const MONGO_LOCAL = `mongodb://localhost:27017/${APP_NAME}`;

const MONGO_URI = MONGODB_URI
	? MONGODB_URI
	: process.env.NODE_ENV !== "production"
		? MONGO_LOCAL
		: `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@localhost:27017/${APP_NAME}`;

console.log("Environment: ", process.env.NODE_ENV);

mongoose.connect(
	MONGO_URI,
	{
		useNewUrlParser: true
	}
);

const PORT = 3002;

const app = express();

//Middleware to put db in request and later in context
const dbRequest = (req, res, next) => {
	req["context"]["db"] = db;
	next();
};

verifyAdmin();
verifyFrota();

app.use(
	cors({
		origin: "*",
		methods: ["GET", "POST"],
		allowedHeaders: ["Content-Type", "Authorization", "Accept-Enconding"],
		preflightContinue: false,
		optionsSuccessStatus: 204
	})
);

app.use(
	"/flamingoql",
	apolloUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
	tokenMiddleware,
	dbRequest,
	bodyParser.json(),
	graphqlHTTP(req => ({
		schema: schema,
		graphiql: process.env.NODE_ENV !== "production",
		context: req["context"]
	}))
);

app.use(express.static("./imgs"));

app.listen(PORT, () => console.log(`Server connected at port: ${PORT}`));
