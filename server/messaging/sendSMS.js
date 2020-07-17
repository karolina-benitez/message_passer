import './testDotenv.js';
import twilio from 'twilio'

const accountSid = process.env.TWILIO_ACCOUNT;
const authToken = process.env.TWILIO_AUTH;
const phone = process.env.TWILIO_PHONE;

const client = twilio(accountSid, authToken);


client.messages
  .create({
     body: 'Here is another message: ',
     from: phone,
     to: '+13102547608'
   })
  .then(message => console.log(`If a message sent, the id is: ${message.sid}`));
