import { createTransport, getTestMessageUrl } from 'nodemailer';
import { MailData, Status, WishArrayInfo } from '../types/wish';

const transporter = createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.ETHEREAL_EMAIL,
        pass: process.env.ETHEREAL_PASS
    },
    tls: { rejectUnauthorized: false }
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
        console.log('Preview URL: %s', getTestMessageUrl(info));
        currentWish.status = Status.success
        wishes[currentIndex] = currentWish
    });

}

export default sendMail