const { Video } = require("../models");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

/**
 * Get Video by id
 * - Fetch Video object from Mongo using the "_id" field and return user object
 * @param {String} id
 * @returns {Promise<Video>}
 */

const getVideoByTitle= async (title) => {
    const video = await Video.findOne({title});
    return video;
}

/**
 * Get Video by id
 * - Fetch Video object from Mongo using the "title" field and return user object
 * @param {String} title
 * @returns {Promise<Video>}
 */

 const getVideoById = async (videoId) => {
    const video = await Video.findById(videoId);
    return video;
}

/**
 * Add new Video
 * - Creates new video in mongo DB and returns saved doc
 * @param {Object} data
 * @returns {Promise<Video>}
 */

const addNewVideo = async (data) => {
    const _doc = new Video(...data);
    const savedDoc = await _doc.save();
    return savedDoc;
}


module.exports = {
    getVideoById,
    getVideoByTitle,
    addNewVideo,
}