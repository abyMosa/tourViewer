const { createTransport } = require('nodemailer');
const Mail = require('nodemailer/lib/mailer');
const { google } = require('googleapis');




const CLIENT_ID = '202071851685-lv1se82i6tjhll78emotbk5ln58l58sp.apps.googleusercontent.com';
const CLIENT_SECRET = 'o34r_tWTFVMd8ghUCOfMR9NH';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//047Hh6mvHQ8MMCgYIARAAGAQSNwF-L9Ir9fTHApsnplPMTEIUVX2JZ8fpFWyq-Up9T4dzsQ1wkVidPHzwCvaKlchcBarGf9iWD_Q';

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });


const sendEmail = async (mailArgs) => {
    try {
        const accessToken = await oAuth2Client.getAccessToken();
        const transport = createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'abymosa.badr@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken,

            }
        });

        const message = {
            from: 'RowiLab Viewer <abymosa.badr@gmail.com>',
            ...mailArgs
        }

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


module.exports.sendEmail = sendEmail;
module.exports.sendResetLinkEmail = sendResetLinkEmail;
module.exports.sendPasswordResetSuccessfulEmail = sendPasswordResetSuccessfulEmail;