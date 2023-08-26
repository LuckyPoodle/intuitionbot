const { getQuote } = require('./getQuotes');
const constants = require('../utils/constants');
const {
    generateRandomAnimal,
    generateRandomColor
} = require('./generateRandom');

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
        return array;
    }


}

async function inspireMe(bot, msg) {
    let reply = await getQuote();

    bot.sendMessage(msg.chat.id, `<b>${reply}</b>`, { parse_mode: 'HTML' });
    bot.sendMessage(
        msg.chat.id,
        '<i>Inspirational quotes provided by <a href="https://zenquotes.io/" target="_blank">ZenQuotes API</a></i>',
        { parse_mode: 'HTML' }
    );
}


function guessColor(bot, msg) {
    let arrayColors = shuffleArray(constants.COLORS);
    const keyboardOptions = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [
                    { text: arrayColors[0], callback_data: 'gC+' + arrayColors[0] },
                    { text: arrayColors[1], callback_data: 'gC+' + arrayColors[1] },
                    { text: arrayColors[2], callback_data: 'gC+' + arrayColors[2] }
                ]

            ]
        })
    };
    bot.sendMessage(
        msg.chat.id,
        'Test your intuition. The bot will randomly select a color from the list presented below. Look through these colors, close your eyes for 3 seconds, what is the first color to come to your mind?',
        keyboardOptions
    );
}


function guessAnimal(bot, msg) {
    try {
        let array = shuffleArray(constants.ANIMALS);
        const keyboardOptions = {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [
                        { text: array[0], callback_data: 'gA+' + array[0] },
                        { text: array[1], callback_data: 'gA+' + array[1] },
                        { text: array[2], callback_data: 'gA+' + array[2] }
                    ],
                    [
                        { text: array[3], callback_data: 'gA+' + array[3] },
                        { text: array[11], callback_data: 'gA+' + array[11] },
                        { text: array[4], callback_data: 'gA+' + array[4] }
                    ],
                    [
                        { text: array[5], callback_data: 'gA+' + array[5] },
                        { text: array[6], callback_data: 'gA+' + array[6] },
                        { text: array[7], callback_data: 'gA+' + array[7] }
                    ],
                    [
                        { text: array[8], callback_data: 'gA+' + array[8] },
                        { text: array[9], callback_data: 'gA+' + array[9] },
                        { text: array[10], callback_data: 'gA+' + array[10] }
                    ]
                ]
            })
        };
        bot.sendMessage(
            msg.chat.id,
            'Test your intuition. The bot will randomly select one type of animal from the list presented below. Look through these animal species, close your eyes for 3 seconds, what is the first species to come to your mind?',
            keyboardOptions
        );
    } catch (e) {
        console.log(e);
        bot.sendMessage(
            msg.chat.id,
            'Sorry the bot is not feeling well'
        );
    }
}






function handleCallBack(bot, callbackQuery) {

    try {
        const message = callbackQuery.message;
        const data = callbackQuery.data;
        let response;
        if (data.startsWith('gA+')) {
            let chosenAnimal = generateRandomAnimal();
            if (data === 'gA+' + chosenAnimal) {
                response = 'Congratulations! Your intuition is correct! The bot has indeed chosen ' + chosenAnimal;
            } else {
                response = 'Nope that is not the animal the bot has chosen, the bot has chosen ' + chosenAnimal + ' this time';
            }
        }

        if (data.startsWith('gC+')) {
            let chosenColor = generateRandomColor();
            if (data === 'gC+' + chosenColor) {
                response = 'Congratulations! Your intuition is correct! The bot has indeed chosen ' + chosenColor;

            } else {
                response = 'Nope that is not the color the bot has chosen, the bot has chosen ' + chosenColor + ' this time';

            }
        }

        bot.sendMessage(message.chat.id, response);
    } catch (e) {
        const message = callbackQuery.message;
        console.log(e);
        let response = 'Sorry bot is asleep';
        bot.sendMessage(message.chat.id, response);

    }

}


module.exports = { inspireMe, guessColor, guessAnimal, handleCallBack };