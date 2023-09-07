'use strict';
const TelegramBot = require('node-telegram-bot-api');
import { inspireMe, guessColor, handleCallBack, guessAnimal, saveTimeZone, saveUser, saveMessage, deleteMessage } from './services/botFunctions';
import schedule from 'node-schedule';
import { sendReminderMsgToUser } from './services/sendReminder';

// const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
// const { inspireMe, guessColor, handleCallBack, guessAnimal } = require('./services/botFunctions');
const token = process.env.API_KEY;

const express = require('express');
const app = express();

app.get('/', (_, res) => {
  res.send('Bot is running');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});




const bot = new TelegramBot(token as string, { polling: true });
//schedule.scheduleJob('*/5 * * * *', () => sendReminderMsgToUser(bot)); to run every 5 min. * * * * * to run every 1 min
//schedule.scheduleJob('0 * * * *', () => sendReminderMsgToUser(bot));
schedule.scheduleJob('* * * * *', () => sendReminderMsgToUser(bot));

bot.onText(/\/guess_animal/, (msg: any) => {
  guessAnimal(bot, msg)
});

bot.onText(/\/guess_color/, (msg: any) => {
  guessColor(bot, msg)
});

bot.onText(/\/save_timezone/, (msg: any) => {
  saveTimeZone(bot, msg)
})


bot.onText(/\/save_message (.+)/, (msg: any, match: any) => {
  saveMessage(bot, msg, match)
})

bot.onText(/\/delete_message/, async (msg: any) => {
  deleteMessage(bot, msg);
});

bot.onText(/\/save_message$/, (msg: any) => {
  bot.sendMessage(msg.chat.id, 'You need to use a valid prompt after the /save_message command.\n Example: /save_message Meditate before breakfast')
})


bot.on('callback_query', (callbackQuery: any) => {
  handleCallBack(bot, callbackQuery)
});

bot.onText(/\/inspire_me/, async (msg: any) => {
  inspireMe(bot, msg);
});



bot.onText(/\/start/, async (msg: any) => {
  saveUser(msg)
  bot.sendMessage(msg.chat.id, `<b>Hi! ${msg.from.first_name}</b> , start honing your intuition now! \nRun /guess_animal to guess which animal out of 12 choices will be selected by the bot. \nRun /guess_color to guess which color out of 3 choices will be selected by the bot. \nRun /inspire_me to receive an inspiration quote.\nRun /save_message to save a message you want to send yourself at 8 AM. The message will be sent to you by the bot every 8 AM and can be overwritten. An example input could be "/save_message use the stairs today to lose calories", the bot will send you this message at 8 AM for your daily reminder. \nRun /save_timezone to update your timezone if it is not UTC 8.  `, { parse_mode: 'HTML' });

});

bot.onText(/\/about/, async (msg: any) => {
  bot.sendMessage(msg.chat.id, `<b>Hi! ${msg.from.first_name}</b> , start honing your intuition now! \nRun /guess_animal to guess which animal out of 12 choices will be selected by the bot. \nRun /guess_color to guess which color out of 3 choices will be selected by the bot. \nRun /inspire_me to receive an inspiration quote.\nRun /save_message to save a message you want to send yourself at 8 AM. The message will be sent to you by the bot every 8 AM and can be overwritten. An example input could be "/save_message use the stairs today to lose calories", the bot will send you this message at 8 AM for your daily reminder. \nRun /save_timezone to update your timezone if it is not UTC 8.  `, { parse_mode: 'HTML' });

});



// bot.on('message', (msg: any) => {
//   if (msg.text.toString().toLowerCase().includes('hi') || msg.text.toString().toLowerCase().includes('hello') || msg.text.toString().toLowerCase().includes('hey')) {
//     bot.sendMessage(msg.chat.id, 'Have a nice day ' + msg.from.first_name);
//   }

// });



bot.on('polling_error', (error: any) => {
  console.error('Polling error occurred:', error.code);
  console.error(error.message);
  if (error.code === 'EFATAL') {
    bot.stopPolling();
    setTimeout(() => bot.startPolling(), 10000); // 10 seconds delay
  }
});


