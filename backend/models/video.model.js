const mongoose = require("mongoose");
const validator = require("validator");

const VideoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    videoLink: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate(value) {

      },
    },
    previewImage: {
      type: String,
      trim: true,
      required: true,
      validate: value => validator.isUrl(value),
    },
    genre: {
      type: String,
      trim: true,
      required: true,
      validate(value) {
        if (!isValidGenre(value)) {
          throw new Error("Plese select valid genre.");
        }
      },
    },
    contentRating: {
      type: String,
      trim: true,
      required: true,
      validate(value) {
        if (!isValidContentRating(value)) {
          throw new Error("Plese select valid Content Rating.");
        }
      },
    },
    releaseDate: {
      type: Date,
      default: Date.now(),
      required: true,
    },
    votes: {
      upVotes: {
        type: Number,
        default: 0,
        required: true,
      },
      downVotes: {
        type: Number,
        default: 0,
        required: true,
      }
    },
    views: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: false,
  }
);


VideoSchema.static.isTitleTaken = async (title) => {
  const video = await this.findOne({ title });
  return !!video;
}

VideoSchema.static.isVideoLinkTaken = async (videoLink) => {
  const video = await this.findOne({ videoLink });
  return !!video;
}


/**
 * @typedef Video
 */
const Video = mongoose.model("Video", VideoSchema);


module.exports.Video = Video;
module.exports.videoSchema = VideoSchema;
