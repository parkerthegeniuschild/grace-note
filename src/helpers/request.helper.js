import axios from "axios";
import { TMS_API } from "../constants";

const {
    BASE_URL,
    PATHS: { AIRINGS, LINEUPS },
} = TMS_API;

const request = axios.create({
    baseURL: BASE_URL,
    timeout: 120000,
    headers: {
        "Accept-enconding": "gzip",
    },
});

export default class Request {
    /**
     * Get lineups for a particular zip code and country
     * @returns {Promise<Array>}
     */
    static async fetchLineUps(params) {
        try {
            const { data } = await request.get(LINEUPS, { params });

            return data;
        } catch (e) {
            return e.response.data;
        }
    }

    /**
     * Get airings for a particular lineup
     * @returns {Promise<Array>}
     */
    static async fetchAirings(lineupId, params) {
        const endpoint = AIRINGS.replace(":lineupId", lineupId);

        try {
            const { data } = await request.get(endpoint, { params });

            return data;
        } catch (e) {
            return e.response.data;
        }
    }
}
