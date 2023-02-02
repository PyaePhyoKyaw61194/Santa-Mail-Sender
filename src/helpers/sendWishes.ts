import { Status, Wish } from '../types/wish';
import sendMail from './sendMail';
const sendWishes = (wishes: Wish[]) => {
    if (wishes && wishes.length > 0) {
        wishes.forEach((wishObj, index) => {
            // mail sending
            /*    console.log(wishObj) */
            if (wishObj.status === Status.unfinished || wishObj.status === Status.failed) {
                console.log("Sending Mail Id => "+ wishObj.id)
                const { username, address, wish } = wishObj
                sendMail(
                    { username, address, wish },
                    { wishes, currentIndex: index, currentWish: wishObj }
                )

            }
        });
    }
    console.log("Wish Sending Process => " + new Date())
}

export default sendWishes