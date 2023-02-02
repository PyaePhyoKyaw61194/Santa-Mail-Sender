import { Status, Wish } from '../types/wish';
import sendMail from './sendMail';
const sendWishes = (wishes: Wish[], transporter: any) => {
    const currentDateTime = new Date();
    let report = {
        time: currentDateTime,
        attempt: 0
    }
    /* console.log("Wish Sending Process => " + currentDateTime) */

    // Optimizing the process to start only when first wish is received
    if (wishes && wishes.length > 0) {
        wishes.forEach((wishObj, index) => {
            // Optimizing the mail sending attempt with status       
            if (wishObj.status === Status.unfinished ||
                wishObj.status === Status.failed) {

                const { username, address, wish } = wishObj
                sendMail(
                    transporter,
                    {
                        username,
                        address,
                        wish
                    },
                    {
                        wishes,
                        currentIndex: index,
                        currentWish: wishObj
                    }
                )
                report.attempt++
            }
        });
    }
    console.log('Wish Sending Process =>')
    console.log(report)
    return report
}

export default sendWishes