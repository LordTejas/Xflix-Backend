const {contentRatings, genres} = require('../utils/values');

const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

const isValidContentRating = (rating, helpers) => {
  if (!contentRatings.includes(rating)) {
    return helpers.message('"{{#label}}" must be a valid content rating');
  }
  return value;
}

const isValidGenre = (genre, helpers) => {
  if (!genres.includes(genre)) {
    return helpers.message('"{{#label}}" must be a valid video genre');
  }
  return value;
}


module.exports = {
  objectId,
  isValidContentRating,
  isValidGenre
};
