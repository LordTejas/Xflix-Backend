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
    validate(videoValidation.getVideoById),
    videoController.getVideos);

router.patch(
    '/:videoId/views', 
    validate(videoValidation.getVideoById),
    videoController.getVideos);

module.exports = router;
