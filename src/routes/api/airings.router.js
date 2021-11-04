import { Router } from "express";
import AiringsController from "../../controllers/airings.controller";
import { AiringsMiddleware } from "../../middleware";
import {
    searchLineUpsSchema,
    getAiringsSchema,
    updateAiringSchema,
} from "../../validator";
import { ROUTES } from "../../constants";

const router = Router();

const { SEARCH_LINEUPS, GET_AIRINGS, UPDATE_AIRING } = ROUTES;

const {
    validateSearchLineups,
    validategetAirings,
    validateUpdateAiring,
    validateAiringById,
} = AiringsMiddleware;

router.get(
    SEARCH_LINEUPS,
    validateSearchLineups(searchLineUpsSchema),
    AiringsController.searchLineups
);

router.get(
    GET_AIRINGS,
    validategetAirings(getAiringsSchema),
    AiringsController.getAirings
);

router.patch(
    UPDATE_AIRING,
    validateUpdateAiring(updateAiringSchema),
    validateAiringById,
    AiringsController.updateAiring
);

export default router;
