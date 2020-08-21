
app.post('api/sendMail', (req, res) =>{
    const {email} = req.body;
    // create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "newell5@ethereal.email", // generated ethereal user
        pass: "5pezR8b6Sar6tP7tNE", // generated ethereal password
    },
});

const msg = {
    from: '"keeplogging" <keeplogging@example.com>', // sender address
    to: `${email}`, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
}

// send mail with defined transport object
const info = await transporter.sendMail(msg);

console.log("Message sent: %s", info.messageId);
// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

// Preview only available when sending through an Ethereal account
console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
})

export default SMTP