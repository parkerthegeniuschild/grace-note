require("dotenv").config();

export const NODE = {
    ENV: process.env.NODE_ENV,
    PORT: Number(process.env.PORT) || 5000,
};

export const { MONGODB_CONNECTION_URI } = process.env;

export const MESSAGES = {
    WELCOME: "Home is where your heart is!",
    REQUEST_OVERLOAD: "Too many requests. Please try again after some time.",
    SERVER_ERROR: "An error has occurred. Please try again later.",
    UNPROCESSABLE_REQUEST: "Request could not be processed. Please try again.",
    UPDATE_SUCCESSFUL: "Update successful.",
    NOTHING_WAS_UPDATED: "Nothing was updated.",
    AIRINGS_ADDITION_IN_PROGRESS:
        "Airings without preferred images are being processed. Check with RedirectURL for data after a while.",
    RESOURCE_CREATED: (resource) => `${resource} created successfully.`,
    RESOURCE_NOT_FOUND: (resource) => `${resource} not found.`,
};

export const ROUTES = {
    BASE_PATH: "/api/v1",
    HOME: "/",
    SEARCH_LINEUPS: "/lineups/search",
    GET_AIRINGS: "/airings/missingpreferredimage",
    UPDATE_AIRING: "/airings/missingpreferredimage/:airingId",
};

export const TMS_API = {
    BASE_URL: process.env.TMS_API_BASE_URL,
    API_KEY: process.env.TMS_API_KEY,
    PATHS: {
        LINEUPS: "/lineups",
        AIRINGS: "/lineups/:lineupId/grid",
    },
};

export const PREFERRED_IMAGE_TIERS = {
    movie: "Vod Art",
    show: "Banner-L1",
    episode: "Banner-L1",
    sport: "Banner-L1",
};
