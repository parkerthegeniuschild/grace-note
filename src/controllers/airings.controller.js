import StatusCodes from "http-status-codes";
import Response from "../helpers/response.helper";
import Logger from "../logger";
import { pick } from "lodash";
import { PREFERRED_IMAGE_TIERS, MESSAGES } from "../constants";
import {
    dropCollections,
    hasTopTieredPreferredImage,
    paginationHelper,
} from "../helpers/utils.helper";
import { AiringsService } from "../services";
import dayjs from "dayjs";

/**
 * This class deals with airings
 */
export default class AiringsController {
    /**
     * Search for lineups for movies and show airing without a preferred image
     * @param {Object} req - http request object
     * @param {Object} res - http response object
     * @returns {Object}  returns success/200 object
     */
    static async searchLineups(req, res) {
        const queries = pick(req.query, ["api_key", "postalCode", "country"]);
        const lineupsAmount = Number(req.query.lineupsAmount);

        let result = [];
        let response_sent = false;

        try {
            // 0. drop collections if not empty
            await dropCollections("airings");

            // 1. get lineups
            const lineups = await AiringsService.searchLineups(queries);

            // return early response and continue to work in the background
            Response.send(
                res,
                "success",
                StatusCodes.OK,
                !lineups.length
                    ? { data: [] }
                    : {
                          message: MESSAGES.AIRINGS_ADDITION_IN_PROGRESS,
                          redirectUrl: "airings/missingpreferredimage",
                      }
            );

            // prevent headers already sent
            response_sent = true;

            // 2. loop over to get airings
            const startDateTime = dayjs().format("YYYY-MM-DDTHH:mm[Z]");

            for (let i = 0; i < (lineupsAmount || lineups.length); i++) {
                const grids = await AiringsService.fetchAirings(
                    lineups[i].lineupId,
                    {
                        api_key: queries.api_key,
                        startDateTime,
                        excludeChannels: "music,adult",
                    }
                );

                if (!grids.length) continue;

                // 3. retrieve only specific program types
                grids.forEach((grid) => {
                    grid.airings.forEach((airing) => {
                        const entityType =
                            airing?.program?.entityType?.toLowerCase();
                        const preferredImageCategory =
                            airing?.program?.preferredImage?.category;

                        const has_preferred_image = hasTopTieredPreferredImage(
                            entityType,
                            preferredImageCategory
                        );

                        if (
                            Object.keys(PREFERRED_IMAGE_TIERS).includes(
                                entityType
                            ) &&
                            !has_preferred_image
                        ) {
                            result = result.concat(airing);
                        }
                    });
                });
            }

            // 4. ingest into database
            AiringsService.create(result, result.length > 1);
        } catch (e) {
            Logger.error(e.stack);

            if (!response_sent) {
                return Response.send(
                    res,
                    "error",
                    StatusCodes.INTERNAL_SERVER_ERROR,
                    { message: MESSAGES.SERVER_ERROR }
                );
            }
        }
    }

    /**
     * Get all airings that was ingested into DB via search
     * @param {*} req
     * @param {*} res
     * @returns {Array}
     */
    static async getAirings(req, res) {
        const limit = Number(req.query.limit) || 10;
        const currentPage = Number(req.query.currentPage) || 1;
        const skip = (currentPage - 1) * limit;
        const sort = req.query.sort === "asc" ? 1 : -1;

        try {
            const total = await AiringsService.count();

            const airings = await AiringsService.findAll(skip, limit, sort);

            const pagination = paginationHelper(
                airings.length,
                total,
                currentPage,
                limit
            );

            return Response.send(res, "success", StatusCodes.OK, {
                pagination,
                data: airings,
            });
        } catch (e) {
            Logger.error(e.stack);

            return Response.send(
                res,
                "error",
                StatusCodes.INTERNAL_SERVER_ERROR,
                { message: MESSAGES.SERVER_ERROR }
            );
        }
    }

    static async updateAiring(req, res) {
        const { uri } = req.body;
        const {
            _id,
            program: { entityType },
        } = req.body.airing;

        try {
            // get correct preferred image category based on entityType
            const category = PREFERRED_IMAGE_TIERS[entityType.toLowerCase()];

            const { modifiedCount } = await AiringsService.updateOne(
                { _id },
                {
                    "program.preferredImage.uri": uri,
                    "program.preferredImage.category": category,
                    updated_at: new Date(),
                }
            );

            return Response.send(res, "success", StatusCodes.OK, {
                message: modifiedCount
                    ? MESSAGES.UPDATE_SUCCESSFUL
                    : MESSAGES.NOTHING_WAS_UPDATED,
            });
        } catch (e) {
            Logger.error(e.stack);

            return Response.send(
                res,
                "error",
                StatusCodes.INTERNAL_SERVER_ERROR,
                { message: MESSAGES.SERVER_ERROR }
            );
        }
    }
}
