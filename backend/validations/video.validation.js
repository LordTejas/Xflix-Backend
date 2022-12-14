const Joi = require("joi");
const { objectId, isValidVideoLink, isValidContentRating, isValidReleaseDate, isValidGenre } = require("./custom.validation");
const {contentRatings, genres, sortBy} = require('../utils/values');


const addVideo = {
  body: Joi.object().keys({
    videoLink: Joi.string().required().custom(isValidVideoLink),
    title: Joi.string().required(),
    genre: Joi.string().required().valid(...genres),
    contentRating: Joi.string().required().valid(...contentRatings),
    releaseDate: Joi.string().required().custom(isValidReleaseDate),
    previewImage: Joi.string().required().uri(),
  }),
};


const getVideoById = {
    params: Joi.object().keys({
      videoId: Joi.custom(objectId).required(),
    }),
}


const searchVideos = {
  query: Joi.object().keys({
    title: Joi.string(),
    genre: Joi.string().valid(...genres),
    contentRating: Joi.string().valid(...contentRatings),
    sortBy: Joi.string().valid(...sortBy),
  }),
}


module.exports = {
  addVideo,
  searchVideos,
  getVideoById,
};
