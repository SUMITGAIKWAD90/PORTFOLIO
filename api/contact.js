// Serverless Function for Contact Form Handling (Mock)
// Deploy this to Vercel/Netlify Functions

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, message } = req.body;

        // Validation
        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Honeypot check (frontend should have a hidden field named 'bot-field')
        if (req.body['bot-field']) {
            return res.status(200).json({ message: 'Message sent successfully' }); // Silently fail for bots
        }

        try {
            // Example: Send email using SendGrid or similar
            // await sendEmail({ to: process.env.CONTACT_EMAIL, subject: `New Message from ${name}`, text: message });

            console.log(`Received message from ${name} (${email}): ${message}`);

            return res.status(200).json({ message: 'Message sent successfully!' });
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
}
