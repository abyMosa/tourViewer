import { createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { IUser } from '../models/User';

export interface MailArgs {
    to: string;
    subject: string;
    text?: string;
    html?: string;
    cb: (error: (Error | null), success: any) => void
}
// dre7am@hotmail.com

export const transport = createTransport({
    host: 'smtp.ionos.co.uk',
    port: 587,
    auth: {
        user: 'info@inspirepress.co.uk',
        pass: 'Abdelrhman0'
    }
});

export const sendEmail = async (mailArgs: MailArgs): Promise<any> => {
    const message: Mail.Options = {
        from: 'info@inspirepress.co.uk',
        ...mailArgs
    }

    // transport.sendMail(message, (err, info) => new Promise (resolve => resolve(mailArgs.cb(err, info))));
    try {
        const info = await transport.sendMail(message);
        return info;
    } catch (error) {
        return error;
    }
}


export const sendResetLinkEmail = async (user: IUser, link: string): Promise<any> => {

    return sendEmail({
        to: user.email,
        subject: "Reset Password Request",
        html: `<p>Hi ${user.firstName},</p>
            <p>You have requested to reset your password</p>
            <p>Please, click the link below to reset your password</p>
            <p><a href='${link}'>Reset Passwork</a></p>
        `,
        cb: (err, info) => {
            if (err) {
                console.log(err);
                return new Promise(resolve => resolve(err));
            } else {
                // console.log(info);
                return new Promise(resolve => resolve(info));
            }
        }
    });
}

export const sendPasswordResetSuccessfulEmail = (user: IUser) => {
    sendEmail({
        to: user.email,
        subject: "Reset Password Successfull",
        html: `<p>Hi ${user.firstName},</p> <p>Your password has been reset successfully.</p> `,
        cb: (err, info) => {
            if (err) {
                console.log(err);
            } else {
                // console.log(info);
            }
        }
    });
}