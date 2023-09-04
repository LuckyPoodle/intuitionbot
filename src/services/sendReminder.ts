
import prisma from "./../utils/db";

async function sendReminderMsgToUser(bot: any) {

    console.log("Running User Reminder Hourly Check");

    try {
        const intuitUsers = await prisma.intuitionBotUser.findMany();
        for (let user of intuitUsers) {

            let date = new Date();
            date.setHours(date.getHours() + user.timezone);
            if (date.getUTCHours() === 8) {

                const message = await prisma.intuitionBotMsgForTmr.findFirst({
                    where: {
                        userId: user.id
                    }
                })

                bot.sendMessage(user.id, message.msg)

            }

        }
    }catch(e) {
        console.log(e);
        
    }

}



export { sendReminderMsgToUser }

