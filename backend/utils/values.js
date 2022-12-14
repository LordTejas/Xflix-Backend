// Contains the valid values

const genres = ["Education", "Sports", "Movies", "Comedy", "Lifestyle"];
const contentRatings = ["Anyone", "7+", "12+", "16+", "18+"];
const sortBy = ["viewCount", "releaseDate"];
const updateVoteType = ["upVotes", "downVotes"];
const changeVoteTypes = ["increase", "decrease"];


const getContentRatings = rating => {
    const index = contentRatings.indexOf(rating);
    if (index === -1) return null;

    const validRatings = contentRatings.slice(index);

    return validRatings;
}


const isValidGenre = arr => {
    return arr.every(ele => genres.includes(ele));
}

const isValidSortOption = option => {
    return sortBy.includes(option);
}


module.exports = {
    genres,
    contentRatings,
    sortBy,
    updateVoteType,
    changeVoteTypes,
    getContentRatings,
    isValidGenre,
    isValidSortOption,
};