import express from 'express';
import { Resend } from 'resend';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || (process.env.NODE_ENV === 'production' ? 5000 : 3001);
const isProd = process.env.NODE_ENV === 'production';

const resend = new Resend(process.env.RESEND_API_KEY);
const TO   = process.env.CONTACT_TO_EMAIL   || 'enquiries@voiceoverguy.co.uk';
const FROM = process.env.CONTACT_FROM_EMAIL || 'noreply@voiceoverguy.co.uk';

app.use(express.json());

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function extractEmail(raw) {
  const str = (raw || '').replace(/[^\x20-\x7E]/g, '').trim();
  const nameEmail = str.match(/<([^>]+)>/);
  return nameEmail ? nameEmail[1].trim() : str;
}

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const cleanEmail = extractEmail(email);
  if (!EMAIL_RE.test(cleanEmail)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  const wordCount = message.trim().split(/\s+/).filter(Boolean).length;
  if (wordCount < 6) {
    return res.status(400).json({ error: 'Message must be at least 6 words.' });
  }

  try {
    const { error: sendError } = await resend.emails.send({
      from: `Movie Trailer Voice <${FROM}>`,
      to: TO,
      replyTo: cleanEmail,
      subject: `New enquiry from ${name}`,
      html: `
        <h2>New enquiry from Movie Trailer Voice site</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });
    if (sendError) {
      console.error('Resend sendError name=%s statusCode=%s message=%s', sendError.name, sendError.statusCode, sendError.message);
      return res.status(500).json({ error: 'Failed to send message. Please try again.' });
    }
    res.json({ ok: true });
  } catch (err) {
    console.error('Resend error:', err);
    res.status(500).json({ error: 'Failed to send message. Please try again.' });
  }
});

if (isProd) {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (_req, res) => res.sendFile(path.join(__dirname, 'dist/index.html')));
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`API server running on port ${PORT}`);
});
