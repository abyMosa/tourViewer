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

export const transport = createTransport({
    host: 'smtp.ionos.co.uk',
    port: 587,
    auth: {
        user: 'info@inspirepress.co.uk',
        pass: 'Abdelrhman0'
    }
});

export const sendEmail = (mailArgs: MailArgs): void => {
    const message: Mail.Options = {
        from: 'info@inspirepress.co.uk',
        ...mailArgs
    }

    transport.sendMail(message, (err, info) => mailArgs.cb(err, info));
}


export const sendResetLinkEmail = (user: IUser, link: string) => {

    sendEmail({
        to: user.email,
        subject: "Reset Password Request",
        html: `<p>Hi ${user.firstName},</p>
            <p>You have requested to reset your password</p>
            <p>Please, click the link below to reset your password</p>
            <p><a href='${link}'>Reset Passwork</a></p>
        `,
        cb: (err, info) => {
            if (err) {
                // console.log(err);
            } else {
                // console.log(info);
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
                // console.log(err);
            } else {
                // console.log(info);
            }
        }
    });
}