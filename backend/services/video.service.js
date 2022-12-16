const { Video } = require('../models');
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const { getContentRatings, isValidGenre, isValidSortOption } = require("../utils/values");


/**
 * Get Video by id
 * - Fetch Video object from Mongo using the "_id" field and return user object
 * @param {String} videoId
 * @returns {Promise<Video>}
 */

const getVideoById = async (videoId) => {
    const video = await Video.findById(videoId);
    return video;
}


/**
 * Get Video by id
 * - Fetch Video object from Mongo using the "title" field and return user object
 * @param {String} title
 * @returns {Promise<Video>}
 */


const searchVideos = async (title, videoGenres, contentRating, sortBy) => {

    // Empty Search object
    let searchQuery = { };

    if (!!title) {
        searchQuery = {
            ...searchQuery, 
            title: {
                $regex: title,
                $options: "i",
            },
        };
    } 

    if (!!videoGenres) {

        // Parse String
        videoGenres = videoGenres.split(',');

        if (!isValidGenre(videoGenres)) {
            throw new ApiError(httpStatus.BAD_REQUEST, "\"[0]\" must be one of [Education, Sports, Movies, Comedy, Lifestyle, All]");
        }
 
        searchQuery = {
            ...searchQuery, 
            genre: {
                $in: videoGenres,
            },
        };
    }

    if (!!contentRating) {

        // Handles Ratings
        const ratings = getContentRatings(contentRating);
        if (ratings === null) throw new ApiError(httpStatus.BAD_REQUEST, "\"contentRating\" must be one of [Anyone, 7+, 12+, 16+, 18+, All]");

        searchQuery = {
            ...searchQuery, 
            contentRating: {
                $in: ratings,
            },
        };
    }

    if (!!sortBy) {

        if (!isValidSortOption(sortBy)) {
            throw new ApiError(httpStatus.BAD_REQUEST, "\"sortBy\" must be one of [viewCount, releaseDate]");
        }

        const sortViewCount = { viewCount: -1 };
        const sortReleaseDate = { releaseDate: -1 };
        const sortOption = (sortBy === "releaseDate") ? sortReleaseDate : sortViewCount;

        // searchQuery = {
        //     ...searchQuery, 
        //     sort: {
        //         ...sortOption,
        //     },
        // };

        console.log(searchQuery);

        const videos = await Video.find(searchQuery).sort(sortOption);

        return videos;
    }

    console.log(searchQuery);

    const videos = await Video.find(searchQuery);

    return videos;
}


/**
 * Add new Video
 * - Creates new video in mongo DB and returns saved doc
 * @param {Object} data
 * @returns {Promise<Video>}
 */

const addNewVideo = async (data) => {
    let { videoLink, title, genre, contentRating, releaseDate, previewImage } = data;

    // // Handle Title
    // if (await Video.isTitleTaken(title)) {
    //     throw new ApiError(httpStatus.BAD_REQUEST, "Video Title is already taken!");
    // }

    // // Check Video Link
    // if (await Video.isVideoLinkTaken(videoLink)) {
    //     throw new ApiError(httpStatus.BAD_REQUEST, "Video Link is already taken!");
    // }

    // Handle Date
    releaseDate = new Date(releaseDate).getTime();

    // Catch if invalid date passed
    if (!releaseDate) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Please pass a valid release Date. i.e. \"28 May 2002\"");
    }
    
    const _doc = new Video({
        videoLink,
        title,
        genre,
        contentRating,
        releaseDate,
        previewImage,
    });

    const savedDoc = await _doc.save();
    return savedDoc;
}


/**
 * Patch The vote count
 * Updates Vote count based on voteType and changeType
 * VoteType -> upVotes / downVotes
 * change Type -> increase / decrease (can't be less than 0)
 * @param {String} videoId
 * @param {String} voteType
 * @param {String} changeType
 */

const patchVoteCount = async (videoId, voteType, changeType) => {

    const video = await Video.findById(videoId);

    if (!video) {
        throw new ApiError(httpStatus.NOT_FOUND, "No video found with matching id");
    }


    // If voteType === "upVote" --> upVotes; so its valid key in our document
    const voteKey = `${voteType}s`;

    let currVotes = video.votes[voteKey];

    if (changeType === "increase") {
        currVotes++;
    } else {
        // Prevent value brecome less that Zero
        currVotes = Math.max(0, currVotes - 1);
    }

    video.votes[voteKey] = currVotes;

    
    await video.save();
    
    // console.log(video);
}


/**
 * Patch The vote count
 * Updates viewCount by 1
 * @param {String} videoId
 */

const patchViewCount = async (videoId) => {

    const video = await Video.findById(videoId);

    if (!video) {
        throw new ApiError(httpStatus.NOT_FOUND, "No video found with matching id");
    }

    const newViewCount = video.viewCount + 1;

    video.viewCount = newViewCount;
    
    await video.save();
    
    // console.log(video);
}


module.exports = {
    getVideoById,
    searchVideos,
    addNewVideo,
    patchVoteCount,
    patchViewCount,
}