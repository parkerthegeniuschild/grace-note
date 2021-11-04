import mongoose from "mongoose";
import Logger from "../logger";
import { MESSAGES, MONGODB_CONNECTION_URI } from "../constants";

const mongodb = async () => {
    const db = await mongoose.connect(MONGODB_CONNECTION_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const message = `${MESSAGES.RESOURCE_CREATED("Database connection")}`;

    Logger.info(message);

    return db.connection;
};

export default mongodb();
