const favorites = {};

const addCategoryToFavorites = (username, category) => {
    if (!Object.keys(favorites).includes(username)) {
        favorites[username] = [];
    }

    if (!favorites[username].includes(category)) {
        favorites[username].push(category);
    }
    console.log({username, category, favorites})
};

const getFavoriteCategoriesForUser = (username) => {
    console.log({username, favorites})
    if (Object.keys(favorites).includes(username)) {
        return favorites[username];
    }
    return [];
}

const removeCategoryFromFavorites = (username, category) => {
    if (Object.keys(favorites).includes(username) && favorites[username].includes(category)) {
        favorites[username].splice(favorites[username].indexOf(category), 1);
    }
};

module.exports = {
    addCategoryToFavorites,
    getFavoriteCategoriesForUser,
    removeCategoryFromFavorites
};