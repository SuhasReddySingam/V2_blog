import dotenv from 'dotenv';
dotenv.config();
import {
	PASSWORD_RESET_REQUEST_TEMPLATE,
	PASSWORD_RESET_SUCCESS_TEMPLATE,
	VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplates.js";
import nodemailer from 'nodemailer';
const transporter=nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:465,
    secure:true,
    auth:{
        user: process.env.USERNAME,
        pass: process.env.PASS
    },
});

export const sendVerificationEmail = async (email, verificationToken) => {
	const recipient = email;

	try {
		console.log(recipient);
		transporter.sendMail({
			to: recipient,
			subject:'Welcome',
			html:VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationToken)
		});
		console.log("Email sent successfully");
	} catch (error) {
		console.error(`Error sending verification`, error);

		throw new Error(`Error sending verification email: ${error}`);
	}
};

export const sendPasswordResetEmail = async (email, resetURL) => {
	const recipient = email;

	try {
		const response=transporter.sendMail({
			to: recipient,
			subject:'Reset your password',
			html:PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",resetURL)
		});
	} catch (error) {
		console.error(`Error sending password reset email`, error);

		throw new Error(`Error sending password reset email: ${error}`);
	}
};

export const sendResetSuccessEmail = async (email) => {
	const recipient = email;

	try {
		const response=transporter.sendMail({
			to: recipient,
			subject:'Reset your password',
			html:PASSWORD_RESET_SUCCESS_TEMPLATE
		});
		console.log("Password reset email sent successfully", response);
	} catch (error) {
		console.error(`Error sending password reset success email`, error);

		throw new Error(`Error sending password reset success email: ${error}`);
	}
};
