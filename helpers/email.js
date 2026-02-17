import nodemailer from 'nodemailer';

const emailRegister = async (data) => {
    const transport = nodemailer.createTransport({

        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });


    const { email, name, token } = data

    // Send email

    await transport.sendMail({
        from: 'RealEstateProject.com',
        to: email,
        subject: 'Confirm your account',
        text: 'Confirm your account in RealEstateProject.com',
        html: `<p>Hi ${name}, confirm your account in RealEstateProject.com</p>
         <p>Your account is almost ready, you just need to confirm it by clicking the link below:</p>
         <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/confirm/${token}">Confirm Account</a>
            <p>If you did not create this account, you can ignore this email</p>
         `})
}

const emailforget = async (data) => {
    const transport = nodemailer.createTransport({

        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });


    const { email, name, token } = data

    // Send email

    await transport.sendMail({
        from: 'RealEstateProject.com',
        to: email,
        subject: 'Reset your account password',
        text: 'Reset your account password in RealEstateProject.com',
        html: `<p>Hi ${name}, reset your account password in RealEstateProject.com</p>
         <p>Your account is almost ready, you just need to confirm it by clicking the link below:</p>
         <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/reset-password/${token}">Reset Password</a>
            <p>If you did not request this password reset, you can ignore this email</p>
         `})
}

export {
    emailRegister,
    emailforget
}