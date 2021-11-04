import StatusCodes from "http-status-codes";
import Response from "../helpers/response.helper";
import { MESSAGES } from "../constants";

/**
 * This class creates the welcome response
 */
export default class HomeController {
    /**
     * Hello World to test the functions
     * @param {Object} req - http request object
     * @param {Object} res - http response object
     * @returns {Object}  returns success/200 object
     */
    static index(_, res) {
        return Response.send(res, "success", StatusCodes.OK, {
            message: MESSAGES.WELCOME,
        });
    }
}
