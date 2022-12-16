const Joi = require("joi");
const { objectId, isValidVideoLink, isValidReleaseDate} = require("./custom.validation");
const {contentRatings, genres, sortBy, updateVoteType, changeVoteTypes} = require('../utils/values');


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
    genres: Joi.string(),
    contentRating: Joi.string(),
    sortBy: Joi.string().valid(...sortBy),
  }),
}

const patchVoteCount = {
  params: Joi.object().keys({
    videoId: Joi.custom(objectId).required(),
  }),
  body: Joi.object().keys({
    vote: Joi.string().required().valid(...updateVoteType),
    change: Joi.string().required().valid(...changeVoteTypes),
  }),
};

const patchViewCount = {
  params: Joi.object().keys({
    videoId: Joi.custom(objectId).required(),
  }),
};


module.exports = {
  addVideo,
  searchVideos,
  getVideoById,
  patchVoteCount,
  patchViewCount,
};
