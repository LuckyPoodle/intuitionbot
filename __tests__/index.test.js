const TelegramBot = require('node-telegram-bot-api');
jest.mock('node-telegram-bot-api');
jest.mock('../services/getQuotes');
jest.mock('../services/generateRandom');
const { getQuote } = require('../services/getQuotes');
const { generateRandomColor } = require('../services/generateRandom');

const { inspireMe , guessColor, handleCallBack } = require('../services/botFunctions')


test('inspireMe returns value from getQuote and sends 2 messages', async () => {
    const bot = new TelegramBot();
    const msg = { chat: { id: 12345 }, text: '/inspire_me' };
    getQuote.mockResolvedValue("mockquote")
    await inspireMe(bot, msg)
    expect(bot.sendMessage).toHaveBeenCalledTimes(2);
    expect(bot.sendMessage).toHaveBeenNthCalledWith(1, msg.chat.id, `<b>mockquote</b>`, { parse_mode: 'HTML' });
});


test('guessColor sends a message', () => {
    const bot = new TelegramBot();
    const msg = { chat: { id: 12345 }, text: '/guess_color' };
    guessColor(bot, msg);

    expect(bot.sendMessage).toHaveBeenCalled();
});


test('handleCallBack responds correctly to color guess', () => {
    const bot = new TelegramBot();
    const callbackQuery = { message: { chat: { id: 123456 } }, data: 'gC+red' };
    const color = 'red';

    generateRandomColor.mockReturnValue(color);

    handleCallBack(bot, callbackQuery);

    expect(bot.sendMessage).toHaveBeenCalledWith(callbackQuery.message.chat.id, 'Congratulations! Your intuition is correct! The bot has indeed chosen red');
});