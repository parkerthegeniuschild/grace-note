import appRoot from "app-root-path";
import { createLogger, format, transports } from "winston";
import { NODE } from "../constants";

require("winston-daily-rotate-file");

const logger = createLogger();

// Create timestamp format
const tsFormat = () => new Date().toLocaleTimeString();

// Attach transports based on environment
if (NODE.ENV === "production") {
    // Log to file
    logger.add(
        new transports.DailyRotateFile({
            filename: `${appRoot}/logs/%DATE%.log`,
            datePattern: "MMMM-Do-YYYY",
            zippedArchive: true,
            format: format.combine(
                format.errors({ stack: true }),
                format.simple()
            ),
            handleExceptions: true,
            timestamp: tsFormat,
        })
    );
} else {
    // Log to the console
    logger.add(
        new transports.Console({
            timestamp: tsFormat,
            colorize: true,
            maxsize: 20971520, // 20MB
            handleExceptions: true,
            format: format.combine(
                format.errors({ stack: true }),
                format.simple()
            ),
        })
    );
}

export default logger;
