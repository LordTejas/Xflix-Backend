const router = require('express').Router();
const videoController = require('../../controllers/videos.controller');
const { videoValidation } = require('../../validations');
const validate = require('../../middlewares/validate');

router.get(
    '/',
    validate(videoValidation.searchVideos),
    videoController.getVideos);

router.get(
    '/:videoId', 
    validate(videoValidation.getVideoById),
    videoController.getVideoById);

router.post(
    '/', 
    validate(videoValidation.addVideo),
    videoController.postVideo);

router.patch(
    '/:videoId/votes', 
    validate(videoValidation.patchVoteCount),
    videoController.patchVoteCount);

router.patch(
    '/:videoId/views', 
    validate(videoValidation.patchViewCount),
    videoController.patchViewCount);

module.exports = router;
