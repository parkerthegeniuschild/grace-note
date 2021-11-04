import StatusCodes from "http-status-codes";
import { MESSAGES } from "../constants";
import Response from "../helpers/response.helper";
import { AiringsService } from "../services";

export default {
    /**
     * Validate that search request has a valid shape
     * @param {*} schema is a yup schema
     */
    validateSearchLineups: (schema) => async (req, res, next) => {
        try {
            await schema.validate(req.query, { abortEarly: false });

            next();
        } catch (e) {
            return Response.send(res, "error", StatusCodes.BAD_REQUEST, {
                errors: e.errors,
            });
        }
    },

    /**
     * Validate that query params to fetch resource has a valid shape
     * @param {*} schema is a yup schema
     */
    validategetAirings: (schema) => async (req, res, next) => {
        try {
            await schema.validate(req.query, { abortEarly: false });

            next();
        } catch (e) {
            return Response.send(res, "error", StatusCodes.BAD_REQUEST, {
                errors: e.errors,
            });
        }
    },

    /**
     * Validate that update has a valid shape
     * @param {*} schema is a yup schema
     */
    validateUpdateAiring: (schema) => async (req, res, next) => {
        try {
            await schema.validate(req.body, { abortEarly: false });

            next();
        } catch (e) {
            return Response.send(res, "error", StatusCodes.BAD_REQUEST, {
                errors: e.errors,
            });
        }
    },

    /**
     * Validate an airing by _id property
     */
    validateAiringById: async (req, res, next) => {
        const { airingId: _id } = req.params;

        try {
            req.body.airing = await AiringsService.findOne({ _id });

            return !req.body.airing
                ? Response.send(res, "error", StatusCodes.NOT_FOUND, {
                      message: MESSAGES.RESOURCE_NOT_FOUND("Airing"),
                  })
                : next();
        } catch (e) {
            return Response.send(res, "error", StatusCodes.BAD_REQUEST, {
                message: MESSAGES.SERVER_ERROR,
            });
        }
    },
};
