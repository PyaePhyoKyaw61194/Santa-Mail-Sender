import { Status, Wish } from '../types/wish';
import sendMail from './sendMail';
const sendWishes = (wishes: Wish[]) => {
    console.log("Wish Sending Process => " + new Date())

    // Optimizing the process to start only when first wish is received
    if (wishes && wishes.length > 0) {
        wishes.forEach((wishObj, index) => {
            // Optimizing the mail sending attempt with status       
            if (wishObj.status === Status.unfinished ||
                wishObj.status === Status.failed) {

                const { username, address, wish } = wishObj
                sendMail(
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
            }
        });
    }
}

export default sendWishes