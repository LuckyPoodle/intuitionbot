const TelegramBot = require('node-telegram-bot-api');
jest.mock('node-telegram-bot-api');
jest.mock('../src/services/getQuotes');
jest.mock('../src/services/generateRandom');
const { getQuote } = require('../src/services/getQuotes');
const { generateRandomColor } = require('../src/services/generateRandom');

const { inspireMe , guessColor, handleCallBack } = require('../src/services/botFunctions');
import { sendReminderMsgToUser } from './../src/services/sendReminder'; // replace with your actual file name
import schedule from 'node-schedule';
import { advanceTo, clear } from 'jest-date-mock';
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';

const botMock = {
  sendMessage: jest.fn(),
};

jest.mock('node-schedule');

describe('scheduleJob', () => {
  let scheduleMock: DeepMockProxy<typeof schedule>;

  beforeEach(() => {
    scheduleMock = mockDeep<typeof schedule>();

    mockReset(scheduleMock.scheduleJob);
    botMock.sendMessage.mockReset();

    (schedule as unknown as DeepMockProxy<typeof schedule>) = scheduleMock;
  });

  afterEach(() => {
    clear();
  });

  it('should schedule a job to send a reminder message to user', () => {
    const date = new Date(2022, 1, 1, 0, 0, 0);
    advanceTo(date);
    schedule.scheduleJob('0 * * * *', () => sendReminderMsgToUser(botMock));
    expect(scheduleMock.scheduleJob).toHaveBeenCalledWith('0 * * * *', expect.any(Function));
  });
});

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