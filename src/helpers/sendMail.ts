import nodemailer from 'nodemailer';
import { Status, TWishArrayInfo } from '../validation/wish.validator';
// Sending Mail with Nodemailer Config
const sendMail = (transporter: any, wishArrInfo: TWishArrayInfo) => {
    // Destructuring in-memory wish array to update status
    const { wishes, currentIndex, currentWish } = wishArrInfo
    if (transporter === null) {
        return false
    }
    if (wishes === null ||
        wishes.length === 0 ||
        currentIndex === null ||
        currentIndex < 0 ||
        currentWish === null) {
        return false
    }

    if (!currentWish.wish || currentWish.wish.length === 0 ||
        !currentWish.username || currentWish.username.length === 0 ||
        !currentWish.address || currentWish.address.length === 0) {

        return false
    }
    if (currentWish.status === Status.success ||
        currentWish.status === Status.pending) {
        return false
    }

    console.log("Sending Mail Id => " + currentWish.id)

    // Mail Options
    let mailOptions = {
        from: '"Sender Name" do_not_reply@northpole.com',
        to: 'santa@northpole.com',
        subject: 'Wishes From Child < ' + currentWish.username + " >",
        text: `Dear santa,
         ${currentWish.username}'s wish is
         [ ${currentWish.wish} ] 
        The child's address is ${currentWish.address}.
        Please fufill the wish.`,
        /*   html: '<b>HTML body</b>' */
    };
    // Initializing as pending process 
    currentWish.status = Status.pending
    wishes[currentIndex] = wishArrInfo.currentWish

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            currentWish.status = Status.failed
            wishes[currentIndex] = currentWish
            console.log(error)
            return false;
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // After mail sending Success for a wish, update the status
        currentWish.status = Status.success
        wishes[currentIndex] = currentWish
        return true
    });
    return true
}

export default sendMail