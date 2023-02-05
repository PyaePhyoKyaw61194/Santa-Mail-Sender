import nodemailer from 'nodemailer';
import { Status, TWishArrayInfo, wishArrayInfoSchema } from '../validation/wish.validator';
import zodErrorFormatter from './zodErrorFormatter';

// Sending Mail with Nodemailer Config
const sendMail = (transporter: any, wishArrInfo: TWishArrayInfo) => {
    // Destructuring in-memory wish array to update status
    const { wishes, currentIndex, currentWish } = wishArrInfo
    if (transporter === null) {
        return false
    }

    const validation = wishArrayInfoSchema.safeParse(wishArrInfo)
    if (validation.success === false) {
        const errRes = zodErrorFormatter(validation.error)
        console.log(errRes)
        return false;
    }

    if (currentWish.info.status === Status.success ||
        currentWish.info.status === Status.pending) {
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
         [ ${currentWish.content} ] 
        The child's address is ${currentWish.address}.
        Please fufill the wish.`,
        /*   html: '<b>HTML body</b>' */
    };
    // Initializing as pending process 
    currentWish.info.status = Status.pending
    wishes[currentIndex] = wishArrInfo.currentWish

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            currentWish.info.status = Status.failed

            wishes[currentIndex] = currentWish

            console.log(error)
            return false;
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // After mail sending Success for a wish, update the status
        currentWish.info.status = Status.success
        wishes[currentIndex] = currentWish
        return true
    });
    return true
}

export default sendMail