import mongoose from "mongoose";
import Logger from "../logger";
import { PREFERRED_IMAGE_TIERS } from "../constants";

/**
 * Check to see if airing has preferred image
 * @param {String} entityType
 * @param {String} category
 * @returns {Boolean}
 */
export const hasTopTieredPreferredImage = (entityType, category) =>
    PREFERRED_IMAGE_TIERS[entityType] === category;

/**
 * Pagination
 * @param {Number} count number of returned documents
 * @param {Number} total number of total documents in database
 * @param {Number} currentPage current page
 * @param {Number} limit maximum number of results returned
 * @returns
 */
export const paginationHelper = (count, total, currentPage, limit) => ({
    count,
    total,
    previousPage: currentPage > 1 ? currentPage - 1 : null,
    currentPage,
    nextPage: currentPage * limit < total ? currentPage + 1 : null,
    totalPages: total % limit === 0 ? total / limit : Math.ceil(total / limit),
});

/**
 * Drop collection
 * @param {String} collectName
 */
export const dropCollections = async (collectName) =>
    new Promise((resolve, reject) => {
        mongoose.connection.db.dropCollection(collectName, (err, res) => {
            if (err?.codeName === "NamespaceNotFound" || res) {
                Logger.info(
                    `"${collectName}" collection dropped successfully"`
                );

                resolve(true);
            } else {
                reject(err);
            }
        });
    });
