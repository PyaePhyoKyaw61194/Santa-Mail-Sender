import nodemailer from 'nodemailer';
import { MailData, Status, WishArrayInfo } from '../types/wish';

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'eldridge39@ethereal.email',
        pass: 'DHfF4vXyweVghzbKFA'
    }
});




const sendMail = (payload: MailData, wishArr: WishArrayInfo) => {

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

    const { wishes, currentIndex, currentWish } = wishArr

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
        currentWish.status = Status.success
        wishes[currentIndex] = currentWish
    });

}

export default sendMail