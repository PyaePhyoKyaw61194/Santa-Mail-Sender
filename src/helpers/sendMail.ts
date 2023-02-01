import { createTransport, getTestMessageUrl } from 'nodemailer';
const transporter = createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.ETHEREAL_EMAIL,
        pass: process.env.ETHEREAL_PASS
    },
    tls: { rejectUnauthorized: false }
});



function sendMail(payload, wishes, index, wishObj) {
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

    wishObj.status = "pending"
    wishes[index] = wishObj
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            wishObj.status = "failed"
            wishes[index] = wishObj
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', getTestMessageUrl(info));
        wishObj.status = "success"
        wishes[index] = wishObj
    });

}

export default sendMail