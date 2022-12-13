const catchAsync = require('../utils/catchAsync');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const getVideos = catchAsync((req, res) => {
    res.status(httpStatus.OK).send({message: "TEST"});
})

const getVideoById = catchAsync((req, res) => {
    const videoId = req.params.videoId;
    res.status(httpStatus.OK).send({_id: videoId});
})

const postVideo = catchAsync((req, res) => {
    const videoId = req.params.videoId;
    res.status(httpStatus.OK).send({_id: videoId});
})

const patchVoteCount = catchAsync((req, res) => {
    const videoId = req.params.videoId;
    res.status(httpStatus.OK).send({_id: videoId});
})

const patchViews = catchAsync((req, res) => {
    const videoId = req.params.videoId;
    res.status(httpStatus.OK).send({_id: videoId});
})

module.exports = {
    getVideos,
    getVideoById,
    postVideo,
    patchViews,
    patchVoteCount,
}