function generateRandomAnimal() {
    const animals = ['Lion', 'Tiger', 'Elephant', 'Giraffe', 'Monkey', 'Zebra', 'Leopard', 'Kangaroo', 'Panda', 'Penguin'];
    const randomIndex = Math.floor(Math.random() * animals.length);
    return animals[randomIndex];
}

function generateRandomColor() {
    const colors = ['Orange', 'Blue', 'Pink', 'Purple', 'Green', 'Silver', 'Red', 'Black', 'Yellow', 'White'];
    const randomIndex = Math.floor(Math.random() * animals.length);
    return colors[randomIndex];
}


module.exports = { generateRandomAnimal , generateRandomColor };