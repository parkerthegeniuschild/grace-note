import StatusCodes from "http-status-codes";

/**
 * Customised responses
 * @export
 * @class Response
 */
export default class Response {
    /**
     * @static
     * @param {Object} res - response object
     * @param {String<"success"|"error">} status
     * @param {Number} [code=STATUS.OK] http-status-code
     * @param {Object} data
     * @returns {Object} response returned to user
     */
    static send(res, status, code = StatusCodes.OK, data = undefined) {
        res.status(code).json({
            status,
            code,
            ...data,
        });
    }
}
