const nodemailer = require('nodemailer');

async function mail(name, email, message) {

    // create reusable transporter object using the default SMTP transport
    let smtpTransport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL, // generated ethereal user
            pass: process.env.PASSWORD // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    const mailOptions = {
        from: process.env.EMAIL, // sender address
        to: process.env.CONTACTEMAIL,
        subject: 'Contact Message', // Subject line
        text: 'contact message...', // plain text body
        html: `
      <p><b>Name: </b> <span>${name}</span></p>
      <p><b>Email: </b> <span>${email}</span></p>
      <p><b>Message: </b> <span>${message}</span></p>
    ` // html body
    };

    // send mail with defined transport object
    await smtpTransport.sendMail(mailOptions, (error, info) => {
        if (error) {
            return(error);
        } else {
            return (info);
        }
    });
}

module.exports = {
    mail
};