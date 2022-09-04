const fs = require('fs');

const mapPointsToCategory = (points) => {
    const file = fs.readFileSync('./data/results.json').toString();
    const parsedCategories = JSON.parse(file);
    const categoryName = mapPointsToCategoryName(points);
    const mappedCategory = parsedCategories.filter(category => category.categoryName === categoryName);
    if (mappedCategory.length < 1) {
        throw new Error("No matching category found");
    }
    return mappedCategory[0];
};

const getCategoriesByName = (categoryNames) => {
    const file = fs.readFileSync('./data/results.json').toString();
    const parsedCategories = JSON.parse(file);
    return parsedCategories.filter(category => categoryNames.includes(category.categoryName));
};

const mapPointsToCategoryName = (points) => {
    if (points <= 24) {
        return "Austrian";
    } else if (points >= 25 && points <= 29) {
        return "French";
    } else if (points>=30 && points<=34) {
        return "Mediterranean";
    } else if (points>=35 && points<=39) {
        return "Italian";
    } else if(points>=40 && points<=44) {
        return "USA/American";
    } else if(points>=45 && points<=49) {
        return "Hawaiian";
    } else if(points>=50 && points<=54) {
        return "Greek";
    } else if (points>=55 && points<=59) {
        return "Turkish/Oriental";
    } else if (points>=60 && points<=64) {
        return "Persian";
    } else if (points>=65 && points<=69) {
        return "Chinese";
    } else if (points>=70 && points<=74) {
        return "Mexican";
    } else if (points>=75 && points<=80) {
        return "Indian";
    }
};

module.exports = {
    mapPointsToCategory,
    getCategoriesByName
};