import { Status, Wish } from '../types/wish';
import sendMail from './sendMail';
const sendWishes = (wishes: Wish[], transporter: any) => {
    const currentDateTime = new Date();
    let report = {
        time: currentDateTime,
        attempt: 0
    }

    if (!transporter || !wishes || wishes.length === 0) {
        console.log('Wish Sending Process =>')
        console.log(report)
        return report
    }

    // Optimizing the process to start only when first wish is received

    wishes.forEach((wishObj, index) => {
        // Optimizing the mail sending attempt with status       
        if (wishObj.status === Status.unfinished ||
            wishObj.status === Status.failed) {
            sendMail(
                transporter,
                {
                    wishes,
                    currentIndex: index,
                    currentWish: wishObj
                }
            )
            report.attempt++
        }
    });

    console.log('Wish Sending Process =>')
    console.log(report)
    return report
}

export default sendWishes