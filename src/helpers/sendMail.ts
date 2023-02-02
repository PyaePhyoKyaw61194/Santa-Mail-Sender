import nodemailer from 'nodemailer';
import { MailData, Status, WishArrayInfo } from '../types/wish';
// Sending Mail with Nodemailer Config
const sendMail = (transporter: any, payload: MailData, wishArr: WishArrayInfo) => {

    // Mail Config
    let mailOptions = {
        from: '"Sender Name" do_not_reply@northpole.com',
        to: 'santa@northpole.com',
        subject: 'Wishes From Child < ' + payload.username + " >",
        text: `Dear santa,
         ${payload.username}'s wish is
         [ ${payload.wish} ] 
        The child's address is ${payload.address}.
        Please fufill the wish.`,
        /*   html: '<b>HTML body</b>' */
    };

    // Destructuring in-memory wish array to update status
    const { wishes, currentIndex, currentWish } = wishArr
    console.log("Sending Mail Id => " + currentWish.id)

    // Initializing as pending process 
    currentWish.status = Status.pending
    wishes[currentIndex] = wishArr.currentWish

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            currentWish.status = Status.failed
            wishes[currentIndex] = currentWish
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // After mail sending Success for a wish, update the status
        currentWish.status = Status.success
        wishes[currentIndex] = currentWish
    });

}

export default sendMail