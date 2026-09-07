const nodemailer = require('nodemailer');

module.exports = async function handler(req, res) {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).send('Please submit the contact form.');
    }
    const body = typeof req.body === 'string'
        ? Object.fromEntries(new URLSearchParams(req.body)) : (req.body || {});
    const field = key => typeof body[key] === 'string' ? body[key].trim() : '';
    const name = field('name');
    const email = field('email');
    const service = field('service');
    const message = field('message');
    if (!name || name.length > 120 || /[\r\n]/.test(name) ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 ||
        service.length > 120 || /[\r\n]/.test(service) ||
        !message || message.length > 10000) {
        return res.status(400).send('Please enter a valid name, email address, and message (up to 10,000 characters).');
    }
    const password = process.env.GMAIL_APP_PASSWORD;
    if (!password) {
        return res.status(503).send('The contact form is temporarily unavailable. Please email stano6823@gmail.com directly.');
    }
    const mailbox = 'stano6823@gmail.com';
    const transport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: { user: mailbox, pass: password.replace(/\s/g, '') },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 15000
    });
    try {
        await transport.sendMail({
            from: { name: 'Stanpixels Contact Form', address: mailbox },
            to: mailbox,
            replyTo: { name, address: email },
            subject: 'New Stanpixels enquiry' + (service ? ': ' + service : ''),
            text: `Name: ${name}\nEmail: ${email}\nService: ${service || 'Not specified'}\n\nMessage:\n${message}`
        });
        return res.status(200).send('Thank you! Your message has been sent. We will get back to you soon.');
    } catch {
        return res.status(502).send('Your message could not be sent. Please try again or email stano6823@gmail.com directly.');
    } finally {
        transport.close();
    }
};
