import { Status, TWish } from '../validation/wish.validator';
import sendMail from './sendMail';
const sendWishes = (wishes: TWish[], transporter: any) => {
    const currentDateTime = new Date();
    let report = {
        time: currentDateTime,
        attempt: 0
    }

    // Optimizing the process to start only when first wish is received
    if (!transporter || !wishes || wishes.length === 0) {
        console.log('Wish Sending Process =>')
        console.log(report)
        return report
    }

    wishes.forEach((wishObj, index) => {
        // Optimizing the mail sending attempt with status    
        console.log(wishObj)
        if (wishObj.info.status === Status.unfinished ||
            wishObj.info.status === Status.failed) {
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