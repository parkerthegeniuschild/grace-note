import Redis from "redis";
import { REDIS_CONNECTION_URI, MESSAGES } from "../constants";
import Logger from "../logger";

const connection = () => Redis.createClient(REDIS_CONNECTION_URI);
const client = connection(REDIS_CONNECTION_URI);

const message = `${MESSAGES.RESOURCE_CREATED("Redis connection")}`;

client.on("connect", () => Logger.info(message));
client.on("error", () => Logger.error.bind(console, "connection error:"));

export default client;
