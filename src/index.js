import childProcess from "child_process";
import cors from "cors";
import express from "express";
import RateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import helmet from "helmet";
import StatusCodes from "http-status-codes";
import compression from "compression";
import http from "http";
import Logger from "./logger";
import v1Router from "./routes";
import Response from "./helpers/response.helper";
import { NODE, MESSAGES, ROUTES } from "./constants";
import { redis } from "./configs";

const { REQUEST_OVERLOAD, SERVER_ERROR, RESOURCE_NOT_FOUND } = MESSAGES;
const { INTERNAL_SERVER_ERROR, NOT_FOUND } = StatusCodes;

const old_spawn = childProcess.exec;

childProcess.exec = () => {
    Logger.info("spawn called");
    Logger.info(arguments);

    return old_spawn.apply(this, arguments);
};

export const app = express();

const apiLimiter = new RateLimit({
    store: new RedisStore({
        client: redis,
    }),
    windowMs: 5 * 60 * 1000, // 5 minutes
    delayMs: 0,
    max: 500,
    message: REQUEST_OVERLOAD,
});

app.use(helmet());
app.set("trust proxy", true);
app.use(cors());
app.use(compression());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(apiLimiter);

app.use(ROUTES.BASE_PATH, v1Router);

// Error handling
app.use((_, __, next) => {
    const err = {
        message: RESOURCE_NOT_FOUND("Route"),
        status: "error",
        code: NOT_FOUND,
    };

    next(err);
});

app.use((e, req, res, next) => {
    Logger.error(
        `${e.status || INTERNAL_SERVER_ERROR} - ${e.message} - ${
            req.originalUrl
        } - ${req.method} - ${req.ip}`
    );

    Response.send(res, e.status || "error", e.code || 500, {
        message: e.message || SERVER_ERROR,
    });

    next();
});

process.send = process.send || (() => {});

const server = http.createServer(app);

server.listen(NODE.PORT, () => {
    Logger.info(
        `Server is running on http://localhost:${NODE.PORT}${ROUTES.BASE_PATH}`
    );
    process.send("ready");
});
