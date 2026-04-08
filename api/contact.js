import { Resend } from 'resend';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function extractEmail(raw) {
  const str = (raw || '').replace(/[^\x20-\x7E]/g, '').trim();
  const nameEmail = str.match(/<([^>]+)>/);
  return nameEmail ? nameEmail[1].trim() : str;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' });
  }

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

  const resend = new Resend(process.env.RESEND_API_KEY);
  const TO   = process.env.CONTACT_TO_EMAIL   || 'enquiries@voiceoverguy.co.uk';
  const FROM = process.env.CONTACT_FROM_EMAIL || 'noreply@voiceoverguy.co.uk';

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
    return res.json({ ok: true });
  } catch (err) {
    console.error('Resend error name=%s statusCode=%s message=%s', err.name, err.statusCode, err.message);
    return res.status(500).json({ error: 'Failed to send message. Please try again.' });
  }
}
