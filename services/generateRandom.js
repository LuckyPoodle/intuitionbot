
const constants = require('../utils/constants');

function generateRandomAnimal() {
    const randomIndex = Math.floor(Math.random() * constants.ANIMALS.length);
    return constants.ANIMALS[randomIndex];
}

function generateRandomColor() {
    const randomIndex = Math.floor(Math.random() * constants.COLORS.length);
    return constants.COLORS[randomIndex];
}


module.exports = { generateRandomAnimal , generateRandomColor };