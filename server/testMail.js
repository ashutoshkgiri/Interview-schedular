require('dotenv').config();
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: 'ashu4945572@gmail.com',              // 👈 put your test recipient email
  from: process.env.SENDGRID_SENDER,        // 👈 must be verified in SendGrid
  subject: 'Test Email from Node.js',
  text: 'This is a plain text test email',
  html: '<strong>This is a test email via SendGrid</strong>',
};

sgMail
  .send(msg)
  .then(() => console.log('✅ Test email sent'))
  .catch(err => console.error('❌ Error:', err.response?.body || err));
