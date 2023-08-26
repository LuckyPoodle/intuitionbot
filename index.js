'use strict';
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const { inspireMe, guessColor, handleCallBack, guessAnimal } = require('./services/botFunctions');
const token = process.env.API_KEY;

const bot = new TelegramBot(token, { polling: true });



bot.onText(/\/guess_animal/, (msg) => {
  guessAnimal(bot, msg)
});

bot.onText(/\/guess_color/, (msg) => {
  guessColor(bot, msg)
});



bot.on('callback_query', (callbackQuery) => {
  handleCallBack(bot, callbackQuery)
});

bot.onText(/\/inspire_me/, async (msg) => {
  inspireMe(bot, msg);
});






bot.onText(/\/start/, async (msg) => {
  bot.sendMessage(msg.chat.id, `<b>Hi! ${msg.from.first_name}</b> , start honing your intuition now! \nRun /guess_animal to guess which animal out of 12 choices will be selected by the bot. \nRun /guess_color to guess which color out of 3 choices will be selected by the bot. \nRun /inspire_me to receive an inspiration quote. \nVisit <a href="https://sealiondev.com/" target="_blank"> my website </a> if you are free! `, { parse_mode: 'HTML' });

});

bot.onText(/\/about/, async (msg) => {
  bot.sendMessage(msg.chat.id, 'This is a telegram bot project created by Dylan, whose portfolio website is at <a href="https://sealiondev.com/" target="_blank">sealiondev.com</a>', { parse_mode: 'HTML' });

});



bot.on('message', (msg) => {

  if (msg.text.toString().toLowerCase().includes('hi') || msg.text.toString().toLowerCase().includes('hello') || msg.text.toString().toLowerCase().includes('hey')) {
    bot.sendMessage(msg.chat.id, 'Have a nice day ' + msg.from.first_name);
  }

});



bot.on('polling_error', (error) => {
  console.error('Polling error occurred:', error.code);
  console.error(error.message);

  if (error.code === 'EFATAL') {
    bot.stopPolling();
    setTimeout(() => bot.startPolling(), 10000); // 10 seconds delay
  }
});

