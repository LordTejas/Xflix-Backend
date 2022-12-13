const Joi = require("joi");
const { objectId, videoLink } = require("./custom.validation");
const {contentRatings, genres} = require('../utils/values');


const addVideo = {
  body: Joi.object().keys({
    videoLink: Joi.string().required(),
    title: Joi.string().required(),
    genre: Joi.string().required().valid(...genres),
    contentRating: Joi.string().required().valid(...contentRatings),
    releaseDate: Joi.string().required(),
    previewImage: Joi.string().required().uri(),
  }),
};


const getVideoById = {
    params: Joi.object().keys({
      videoId: Joi.custom(objectId).required(),
    }),
}


const getVideos = {

}


module.exports = {
  addVideo,
  getVideos,
  getVideoById,
};
