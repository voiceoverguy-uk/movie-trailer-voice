import { Resend } from 'resend';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function extractEmail(raw) {
  const str = (raw || '').replace(/[^\x20-\x7E]/g, '').trim();
  const nameEmail = str.match(/<([^>]+)>/);
  return nameEmail ? nameEmail[1].trim() : str;
}

function escHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildHtml({ name, email, message, timestamp }) {
  const eName    = escHtml(name);
  const eEmail   = escHtml(email);
  const eMessage = escHtml(message).replace(/\n/g, '<br>');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>New enquiry from Movie Trailer Voice</title>
</head>
<body style="margin:0;padding:0;background-color:#f0f0f0;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation" style="background-color:#f0f0f0;">
<tr><td align="center" style="padding:32px 16px;">

<table width="600" cellpadding="0" cellspacing="0" border="0" role="presentation" style="max-width:600px;width:100%;">

<!-- HEADER -->
<tr>
  <td style="background-color:#0d0d0d;border-radius:10px 10px 0 0;padding:30px 24px 26px;text-align:center;">
    <img src="https://www.movietrailervoice.co.uk/mtv-logo-transparent.png"
         width="200" height="auto" alt="Movie Trailer Voice"
         style="display:block;margin:0 auto;max-width:200px;height:auto;border:0;">
    <p style="margin:14px 0 0;color:#888888;font-size:11px;letter-spacing:3px;text-transform:uppercase;">New Website Enquiry</p>
  </td>
</tr>

<!-- Red accent bar -->
<tr>
  <td style="background-color:#cc0000;height:3px;font-size:1px;line-height:1px;mso-line-height-rule:exactly;">&nbsp;</td>
</tr>

<!-- CONTENT CARD -->
<tr>
  <td style="background-color:#ffffff;padding:36px 36px 28px;">

    <h2 style="margin:0 0 6px;color:#111111;font-size:20px;font-weight:700;line-height:1.3;font-family:Arial,Helvetica,sans-serif;">
      New enquiry from Movie Trailer Voice
    </h2>
    <p style="margin:0 0 28px;color:#aaaaaa;font-size:12px;font-family:Arial,Helvetica,sans-serif;">${timestamp}</p>

    <table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation">
      <!-- Divider -->
      <tr><td style="border-top:1px solid #eeeeee;padding:0;font-size:1px;line-height:1px;">&nbsp;</td></tr>
    </table>

    <!-- Name -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation" style="margin-top:24px;">
      <tr>
        <td width="90" valign="top" style="color:#aaaaaa;font-size:11px;text-transform:uppercase;letter-spacing:1.5px;font-weight:700;padding-top:2px;font-family:Arial,Helvetica,sans-serif;">Name</td>
        <td valign="top" style="color:#111111;font-size:15px;font-weight:600;font-family:Arial,Helvetica,sans-serif;">${eName}</td>
      </tr>
    </table>

    <!-- Email -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation" style="margin-top:14px;">
      <tr>
        <td width="90" valign="top" style="color:#aaaaaa;font-size:11px;text-transform:uppercase;letter-spacing:1.5px;font-weight:700;padding-top:2px;font-family:Arial,Helvetica,sans-serif;">Email</td>
        <td valign="top" style="font-size:15px;font-family:Arial,Helvetica,sans-serif;">
          <a href="mailto:${eEmail}" style="color:#cc0000;text-decoration:none;font-weight:600;">${eEmail}</a>
        </td>
      </tr>
    </table>

    <!-- Message label -->
    <p style="margin:28px 0 10px;color:#aaaaaa;font-size:11px;text-transform:uppercase;letter-spacing:1.5px;font-weight:700;font-family:Arial,Helvetica,sans-serif;">Message</p>

    <!-- Message box -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation">
      <tr>
        <td style="background-color:#f8f8f8;border-left:3px solid #cc0000;padding:18px 20px;border-radius:0 4px 4px 0;">
          <p style="margin:0;color:#222222;font-size:15px;line-height:1.7;font-family:Arial,Helvetica,sans-serif;">${eMessage}</p>
        </td>
      </tr>
    </table>

    <!-- CTA button -->
    <table cellpadding="0" cellspacing="0" border="0" role="presentation" style="margin:28px 0 0;">
      <tr>
        <td align="center" style="background-color:#0d0d0d;border-radius:4px;">
          <a href="mailto:${eEmail}?subject=Re%3A%20Your%20enquiry%20to%20Movie%20Trailer%20Voice"
             style="display:inline-block;padding:13px 28px;color:#ffffff;font-size:12px;font-weight:700;text-decoration:none;letter-spacing:1.5px;text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;">
            Reply to ${eName}
          </a>
        </td>
      </tr>
    </table>

  </td>
</tr>

<!-- FOOTER -->
<tr>
  <td style="background-color:#f6f6f6;border-top:1px solid #eeeeee;border-radius:0 0 10px 10px;padding:20px 36px;text-align:center;">
    <p style="margin:0;color:#bbbbbb;font-size:11px;line-height:1.6;font-family:Arial,Helvetica,sans-serif;">
      This enquiry was sent from
      <a href="https://www.movietrailervoice.co.uk" style="color:#bbbbbb;text-decoration:underline;">movietrailervoice.co.uk</a>
    </p>
  </td>
</tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

function buildText({ name, email, message, timestamp }) {
  return [
    'NEW ENQUIRY — MOVIE TRAILER VOICE',
    '==================================',
    '',
    `Received: ${timestamp}`,
    '',
    `Name:   ${name}`,
    `Email:  ${email}`,
    '',
    'Message:',
    '--------',
    message,
    '',
    '==================================',
    'Sent from movietrailervoice.co.uk',
  ].join('\n');
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

  const resend    = new Resend(process.env.RESEND_API_KEY);
  const TO        = process.env.CONTACT_TO_EMAIL   || 'enquiries@voiceoverguy.co.uk';
  const FROM      = process.env.CONTACT_FROM_EMAIL || 'noreply@voiceoverguy.co.uk';
  const timestamp = new Date().toLocaleString('en-GB', { dateStyle: 'long', timeStyle: 'short', timeZone: 'Europe/London' });

  const emailData = { name, email: cleanEmail, message, timestamp };

  try {
    const { error: sendError } = await resend.emails.send({
      from:    `Movie Trailer Voice <${FROM}>`,
      to:      TO,
      replyTo: cleanEmail,
      subject: `New enquiry from ${name}`,
      html:    buildHtml(emailData),
      text:    buildText(emailData),
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
