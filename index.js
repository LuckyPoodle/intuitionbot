
const TelegramBot = require('node-telegram-bot-api');
const { generateRandomAnimal, generateRandomColor} = require('./generateRandom');
const { getQuote } = require('./getQuotes');
require('dotenv').config();


const token = process.env.API_KEY;


const bot = new TelegramBot(token, {polling: true});


bot.onText(/\/guess_animal/, (msg) => {
  let array=shuffleArray(  ['Lion', 'Tiger', 'Elephant', 'Giraffe', 'Monkey', 'Zebra', 'Leopard', 'Kangaroo', 'Panda', 'Penguin'])
  const keyboardOptions={
    reply_markup: JSON.stringify({
      keyboard:[
      array,
      ],
      one_time_keyboard: true
    })
  }

  bot.sendMessage(msg.chat.id,"Test your intuition. The bot will randomly select one type of animal from the list presented on the keyboard. Look through these animal species, close your eyes for 3 seconds, what is the first species to come to your mind?",keyboardOptions)

  // let anAnimal=generateRandomAnimal();
  // // send a message to the chat acknowledging receipt of their message
  // bot.sendMessage(msg.chat.id, anAnimal);
});



bot.onText(/\/inspire_me/, async (msg) => {

  console.log('inspire me called')
  let reply=await getQuote();

  bot.sendMessage(msg.chat.id,`<b>${reply}</b>`,{parse_mode : "HTML"})
  bot.sendMessage(msg.chat.id,'<i>Inspirational quotes provided by <a href="https://zenquotes.io/" target="_blank">ZenQuotes API</a></i>',{parse_mode : "HTML"})


});



function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}


