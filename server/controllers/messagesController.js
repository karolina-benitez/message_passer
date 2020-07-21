import Pool from 'pg';
import qs from 'qs';
import base64 from 'base-64';
import sendSMS from '../messaging/sendSMS.js'

console.log("\nTesting qs and base-64:\n")
let testing = {
  messageBody:"This is my test string"
}
// app.use(Base64())
var obj = qs.parse('a%5Bb%5D=c');
console.log("obj = qs.parse('a%5Bb%5D=c'):",obj)
var str = qs.stringify(obj);
console.log(`qs.stringify(obj): ${str}`)
// console.log("base64", window.btoa("testing"))
console.log("\nqs.stringify(testing): ", qs.stringify(testing))
console.log("base64.encode(testing):",base64.encode(testing))


export const pool =  new Pool.Pool({
  user: "postgres",
  password: "",
  host: "localhost",
  port: 5432,
  database: "messagepasserdb"
});

export const getAll = async(req,res) => {
  try {
    const allMessages = await pool.query(
      "SELECT * FROM messages"
    );
    res.json(allMessages.rows);
  } catch (error) {
    console.log(error);
  }
}

export const getMessage = async(req, res) => {
  console.log("In getMessage endpoint")
  try {
    let  { messageURL } = req.params;
    console.log(`getMessage req.params: ${req.params}`)
    // console.log("messageurl before parse", messageURL)

    messageURL = qs.parse(messageURL)
    console.log("getMessages messageurl after parse", messageURL)
    const message = await pool.query(
      "SELECT * FROM messages WHERE messagebody = $1 LIMIT 1",
      [messageURL.messageBody]
    );
    console.log("getMessage ran query and message.rows is: ", message.rows)
    res.json({"messagebody": base64.decode(message.rows.messagebody), "messageURL": message.rows.messageurl, "id": message.rows.id });
  
    console.log("getMessage endpoint was hit!!! Response = ", {"messagebody": base64.decode(message.rows[0].messagebody), "messageURL": message.rows[0].messageurl })
  } catch (error) {
    console.log(error);
  }
}

export const createMessage = async(req, res) => {
  try {
    let {messageBody} = req.body;
    // messageBody w/ BASE64
    messageBody = base64.encode(messageBody)
    let messageURL = qs.stringify({"messageBody": messageBody})
    console.log("messageBody ", messageBody)
    console.log("messageURL", messageURL)
    const newMessage = await pool.query(
      "INSERT INTO messages (messageBody, messageURL) VALUES($1, $2) RETURNING *",
      [messageBody, messageURL]
    );
    console.log(`\ncreateMesssage:\n newMessage.rows[0].id: ${newMessage.rows[0].id}\n`)
    res.json(newMessage.rows[0]);
  } catch (error) {
    console.log(error);
  }
}

export const editMessage = async(req, res) => {
  console.log(`editMessage req.params: ${req.params}`)
  try {
    const { id } = req.params;
    let { messageBody } = req.body;
    messageBody = base64.encode(messageBody)
    const editMessage =  await pool.query(
      "UPDATE messages SET messageBody = $1 WHERE id = $2 RETURNING *",
      [messageBody, id]
    );
    console.log(`editMessage.rows[0].id: ${editMessage.rows[0].id}`);
    res.json(editMessage.rows[0]);
  } catch (error) {
    console.log(error);
  }
}

export const deleteMessage = async(req, res) => {
  try {
    console.log("delete endpoint was hit!!!!!")
    const { id } = req.params;
    console.log("id is: ", id)
    const deleteMessage = await pool.query(
      "DELETE FROM messages where id = $1",
      [id]
    );
    res.json("Message was deleted")
  } catch (error) {
    console.log(error);
  }
}

export const sendMessage = async(req, res) => {
  console.log(`\n  sendMessage gets the following request: ${req.body}`)
  try {
    const {recipient, messageURL} = req.body;
    const formattedRecipient = '+1'+recipient;
    
    console.log(`\n  sendMessage recipient: ${formattedRecipient}, messageURL: ${messageURL}`)

    sendSMS(formattedRecipient, messageURL);

    res.json({recipient, messageURL})
  } catch (error) {
    console.log(error);
  }
}