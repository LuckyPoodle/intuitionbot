import { sendReminderMsgToUser } from './../src/services/sendReminder';

jest.mock('./../src/utils/db', () => ({
  intuitionBotUser: {
    findMany: jest.fn().mockResolvedValue([]),
  },
  intuitionBotMsgForTmr: {
    findFirst: jest.fn().mockResolvedValue(null),
  },
}));

const botMock = {
  sendMessage: jest.fn(),
};

describe('sendReminderMsgToUser', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should send a reminder message to user', async () => {
    // Arrange
    const user = { id: 1, timezone: 0 };
    const message = { msg: 'Hello!' };
  
    require('./../src/utils/db').intuitionBotUser.findMany.mockResolvedValueOnce([user]);
    require('./../src/utils/db').intuitionBotMsgForTmr.findFirst.mockResolvedValueOnce(message);
  
    // Mock the Date object to control the current time
    jest.spyOn(Date.prototype, 'getUTCHours').mockReturnValue(8);
  
    // Act
    await sendReminderMsgToUser(botMock);
  
    // Log the number of calls to sendMessage
    console.log('sendMessage calls:', botMock.sendMessage.mock.calls);
  
    // Assert
    expect(botMock.sendMessage).toHaveBeenCalledWith(user.id, message.msg);
  });
  

  afterEach(() => {
    jest.restoreAllMocks();
  });
  
});
