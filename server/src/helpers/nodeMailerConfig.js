const { createTransport } = require('nodemailer');
const Mail = require('nodemailer/lib/mailer');


const transport = createTransport({
    host: 'smtp.ionos.co.uk',
    port: 587,
    auth: {
        user: 'info@inspirepress.co.uk',
        pass: 'Abdelrhman0'
    }
});

const sendEmail = async (mailArgs) => {
    const message = {
        from: 'info@inspirepress.co.uk',
        ...mailArgs
    }

    // transport.sendMail(message, (err, info) => new Promise (resolve => resolve(mailArgs.cb(err, info))));
    try {
        const info = await transport.sendMail(message);
        return new Promise(resolve => resolve(info));
    } catch (error) {
        return new Promise((resolve, reject) => reject(error));
    }
}


const sendResetLinkEmail = async (user, link) => {

    return sendEmail({
        to: user.email,
        subject: "Reset Password Request",
        html: `<p>Hi ${user.firstName},</p>
            <p>You have requested to reset your password</p>
            <p>Please, click the link below to reset your password</p>
            <p><a href='${link}'>Reset Passwork</a></p>
        `
        // cb: (err, info) => {
        //     if (err) {
        //         console.log(err);
        //         return new Promise(resolve => resolve(err));
        //     } else {
        //         // console.log(info);
        //         return new Promise(resolve => resolve(info));
        //     }
        // }
    });
}

const sendPasswordResetSuccessfulEmail = (user) => {
    return sendEmail({
        to: user.email,
        subject: "Reset Password Successfull",
        html: `<p>Hi ${user.firstName},</p> <p>Your password has been reset successfully.</p> `,
        // cb: (err, info) => {
        //     if (err) {
        //         console.log(err);
        //         return new Promise(resolve => resolve(err));
        //     } else {
        //         return new Promise(resolve => resolve(info));
        //         // console.log(info);
        //     }
        // }
    });
}


module.exports.transport = transport;
module.exports.sendEmail = sendEmail;
module.exports.sendResetLinkEmail = sendResetLinkEmail;
module.exports.sendPasswordResetSuccessfulEmail = sendPasswordResetSuccessfulEmail;