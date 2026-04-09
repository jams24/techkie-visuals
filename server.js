const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Contact form API endpoint
app.post('/api/contact', async (req, res) => {
    const { name, email, phone, service, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ success: false, error: 'Name, email, and message are required.' });
    }

    // Send email via Gmail SMTP
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER || 'techkievisuals@gmail.com',
            pass: process.env.GMAIL_APP_PASSWORD
        }
    });

    const mailOptions = {
        from: `"TECHKIE VISUALS Website" <${process.env.GMAIL_USER || 'techkievisuals@gmail.com'}>`,
        to: process.env.GMAIL_USER || 'techkievisuals@gmail.com',
        replyTo: email,
        subject: `New enquiry from ${name} — TECHKIE VISUALS`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #1a1a1a; border-bottom: 2px solid #c8a97e; padding-bottom: 10px;">New Website Enquiry</h2>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Name:</td><td style="padding: 8px 0;">${name}</td></tr>
                    <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
                    ${phone ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Phone:</td><td style="padding: 8px 0;">${phone}</td></tr>` : ''}
                    ${service ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Service:</td><td style="padding: 8px 0;">${service}</td></tr>` : ''}
                </table>
                <h3 style="color: #555; margin-top: 20px;">Message:</h3>
                <p style="background: #f5f5f5; padding: 15px; border-radius: 8px; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
                <hr style="border: none; border-top: 1px solid #eee; margin-top: 30px;">
                <p style="font-size: 12px; color: #999;">Sent from techkievisuals.co.uk contact form</p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: 'Message sent successfully.' });
    } catch (error) {
        console.error('Email error:', error);
        res.status(500).json({ success: false, error: 'Failed to send message. Please try again.' });
    }
});

// Serve static files
app.use(express.static(path.join(__dirname), {
    extensions: ['html'],
    maxAge: '1h'
}));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
