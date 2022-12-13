const router = require('express').Router();
const videoController = require('../../controllers/videos.controller'); 

router.get('/', videoController.getVideos);
router.get('/:videoId', videoController.getVideoById);
router.post('/', videoController.getVideos);
router.patch('/:videoId/votes', videoController.getVideos);
router.patch('/:videoId/views', videoController.getVideos);

module.exports = router;
