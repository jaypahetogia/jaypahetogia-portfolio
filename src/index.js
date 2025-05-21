const nodemailer = require('nodemailer');

module.exports = async function (context, req) {
    context.log('Contact form function processed a request.');

    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;
    
    if (!name || !email || !message) {
        context.res = {
            status: 400,
            body: "Please provide name, email, and message"
        };
        return;
    }

    try {
        // Email setup (you'd need to configure this with your email provider)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Send to yourself
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