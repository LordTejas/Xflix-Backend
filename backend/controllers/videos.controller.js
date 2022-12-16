const catchAsync = require('../utils/catchAsync');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { getGenres, getContentRatings } = require("../utils/values");


// Import Video Services
const videoServices = require('../services').videoService;


const getVideos = catchAsync(async (req, res) => {

    const {title, genres, contentRating, sortBy} = req.query;

    const videos = await videoServices.searchVideos(title, genres, contentRating, sortBy);

    if (videos.length === 0) {
        throw new ApiError(httpStatus.NOT_FOUND, "No Video Found!");
    } else {
        res.status(httpStatus.OK).send({videos: videos});
    }

})

const getVideoById = catchAsync(async (req, res) => {
    const videoId = req.params.videoId;

    const video = await videoServices.getVideoById(videoId);

    if (!video) {
        throw new ApiError(httpStatus.NOT_FOUND, "Video Not Found!");
    } else {
        res.status(httpStatus.OK).send(video);
    }
})

const postVideo = catchAsync(async (req, res) => {
    
    const data = req.body;

    const savedVideo = await videoServices.addNewVideo(data);

    res.status(httpStatus.CREATED).send(savedVideo);
})

const patchVoteCount = catchAsync(async (req, res) => {
    const videoId = req.params.videoId;
    const { vote, change } = req.body;

    // Updaes video via service
    await videoServices.patchVoteCount(videoId, vote, change);

    res.status(httpStatus.NO_CONTENT).send();
})

const patchViewCount = catchAsync(async (req, res) => {
    const videoId = req.params.videoId;

    // Updates video via service
    await videoServices.patchViewCount(videoId);

    res.status(httpStatus.NO_CONTENT).send();
})

module.exports = {
    getVideos,
    getVideoById,
    postVideo,
    patchViewCount,
    patchVoteCount,
}