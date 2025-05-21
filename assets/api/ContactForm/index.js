const nodemailer = require('nodemailer');

module.exports = async function (context, req) {
    context.log('Contact form function processed a request.');
    
    // Debug environment variables
    context.log('Environment variables:');
    context.log('EMAIL_USER:', process.env.EMAIL_USER);
    context.log('EMAIL_PASS exists:', !!process.env.EMAIL_PASS);
    
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        context.log('Email credentials are missing');
        context.res = {
            status: 500,
            body: "Server configuration error: Email credentials are missing"
        };
        return;
    }

    const name = req.body && req.body.name;
    const email = req.body && req.body.email;
    const message = req.body && req.body.message;
    
    if (!name || !email || !message) {
        context.res = {
            status: 400,
            body: "Please provide name, email, and message"
        };
        return;
    }

    try {
        // Email setup
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: `Portfolio Contact: ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        });

        context.res = {
            body: "Message sent successfully!"
        };
    } catch (error) {
        context.log.error('Error sending email:', error);
        context.res = {
            status: 500,
            body: "Failed to send message. Please try again later."
        };
    }
};