import './testDotenv.js';
import twilio from 'twilio'
const sendSMS = ({recipient, urlToSend}) => {
  const accountSid = process.env.TWILIO_ACCOUNT;
  const authToken = process.env.TWILIO_AUTH;
  const phone = process.env.TWILIO_PHONE;

  const client = twilio(accountSid, authToken);

  client.messages
    .create({
      body: urlToSend,
      from: phone,
      to: recipient
    })
    .then(message => console.log(`If a message sent, the id is: ${message.sid}\n${recipient}: ${urlToSend}`));
}

export default sendSMS;