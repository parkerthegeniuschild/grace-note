import Request from "../helpers/request.helper";
import { Airings } from "../models";

/**
 * Handles anything related to airings
 */
export default class AiringsService {
    /**
     * Search for lineups for a particular zip code and country
     * @param {Object} queries
     * @returns {Promise<Array>}
     */
    static async searchLineups(queries = {}) {
        try {
            return await Request.fetchLineUps(queries);
        } catch (e) {
            throw new Error(e);
        }
    }

    /**
     * Get airings for a specific lineup
     * @param {String} tmsId
     * @param {Object} queries
     * @returns {Promise<Array>}
     */
    static async fetchAirings(lineupId, queries) {
        try {
            return await Request.fetchAirings(lineupId, queries);
        } catch (e) {
            throw new Error(e);
        }
    }

    /**
     * Create a new list of airing(s)
     * @param {Array} data
     * @param {Boolean} isBulk
     * @returns {Object}
     */
    static async create(data, isBulk = false) {
        try {
            return !isBulk
                ? await Airings.create(data)
                : await Airings.insertMany(data);
        } catch (e) {
            throw new Error(e);
        }
    }

    /**
     * Fetch an airing from DB
     * @params {Object} filter
     * @returns {Promise<Array>}
     */
    static async findOne(filter = {}) {
        try {
            return await Airings.findOne(filter).lean();
        } catch (e) {
            throw new Error(e);
        }
    }

    /**
     * Fetch airings from DB
     * @returns {Promise<Array>}
     */
    static async findAll(skip = 0, limit = 0, sort = -1) {
        try {
            return await Airings.find()
                .skip(skip)
                .limit(limit)
                .sort({ _id: sort })
                .lean();
        } catch (e) {
            throw new Error(e);
        }
    }

    /**
     * Return number of airings found
     * @returns {Promise<Number>}
     */
    static async count() {
        try {
            return await Airings.countDocuments();
        } catch (e) {
            throw new Error(e);
        }
    }

    /**
     * Updates an airing
     * @param {Object} filter - query filter
     * @param {Object} new_data - update data
     * @returns {Promise<Object>} Fulfillment
     */
    static async updateOne(filter, new_data) {
        try {
            return await Airings.updateOne(filter, new_data);
        } catch (e) {
            throw new Error(e);
        }
    }
}
