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
  return rating;
}

const isValidGenre = (genre, helpers) => {
  if (!genres.includes(genre)) {
    return helpers.message('"{{#label}}" must be a valid video genre');
  }
  return genre;
}

const isValidReleaseDate = (date, helpers) => {
  if (!/^\d{1,2} \w{3,4} \d{4}$/.test(date)) {
    return helpers.message('"{{#label}}" release Date must be dd MMM YYYY i.e. \"28 May 2002\"');
  }
  return date;
}


const isValidVideoLink = (value, helpers) => {
  if (!/((http|https)\:\/\/)?(www\.youtube\.com|youtu\.?be)/.test(value)) {
    return helpers.message('"{{#label}}" Must be a valid youtube video link!');
  }
  return value;
}



module.exports = {
  objectId,
  isValidContentRating,
  isValidGenre,
  isValidReleaseDate,
  isValidVideoLink,
};
