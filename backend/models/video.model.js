const mongoose = require("mongoose");
const validator = require("validator");
const { genres, contentRatings } = require("../utils/values");

const VideoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    videoLink: {
      type: String,
      trim: true,
      unique: true,
      required: true,
      validation(value) {
        if (!/((http|https)\:\/\/)?(www\.youtube\.com|youtu\.?be)/.test(value)) {
          throw new Error("Not a valid Youtube Video Link!");
        }
      },
    },
    previewImage: {
      type: String,
      trim: true,
      required: true,
    },
    genre: {
      type: String,
      trim: true,
      required: true,
      validate(value) {
        if (!genres.includes(value)) {
          throw new Error("Plese select valid genre.");
        }
      },
    },
    contentRating: {
      type: String,
      trim: true,
      required: true,
      validate(value) {
        if (!contentRatings.includes(value)) {
          throw new Error("Plese select valid Content Rating.");
        }
      },
    },
    releaseDate: {
      type: String,
      Default: Date.now(),
    },
    votes: {
      upVotes: {
        type: Number,
        default: 0,
      },
      downVotes: {
        type: Number,
        default: 0,
      }
    },
    viewCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: false,
  }
);


VideoSchema.statics.isTitleTaken = async function(title) {
  const video = await this.findOne({ title });
  return !!video;
}

VideoSchema.statics.isVideoLinkTaken = async function(videoLink) {
  const video = await this.findOne({ videoLink });
  return !!video;
}


/**
 * @typedef Video
 */
const Video = mongoose.model("Video", VideoSchema);


module.exports.Video = Video;
module.exports.videoSchema = VideoSchema;
