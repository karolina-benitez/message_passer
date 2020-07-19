import Pool from 'pg';
import qs from 'qs';
import base64 from 'base-64';
import sendSMS from '../messaging/sendSMS.js'

// was receiving:
// Error [ERR_MODULE_NOT_FOUND]: Cannot find module '/Users/karolinabenitez/Desktop/code/mlh/message_passer/db' imported from /Users/karolinabenitez/Desktop/code/mlh/message_passer/controllers/messagesController.js
// when importing pool from db.js file

let testing = {
  messageBody:"This is my test string"
}
// app.use(Base64())
var obj = qs.parse('a%5Bb%5D=c');
console.log()
var str = qs.stringify(obj);
// console.log("base64", window.btoa("testing"))
console.log("stringify: ", qs.stringify(testing))
console.log(base64.encode(testing))

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
  try {
    let  { messageURL } = req.params;
    messageURL = qs.parse(messageURL)
    console.log("messageurl", messageURL)
    const message = await pool.query(
      "SELECT * FROM messages WHERE messagebody = $1",
      [messageURL.messageBody]
    );
    // console.log("message", message.rows[0])
    res.json({"messagebody": base64.decode(message.rows[0].messagebody), "messageURL": message.rows[0].messageurl, "id": message.rows[0].id });
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
    res.json(newMessage.rows[0]);
  } catch (error) {
    console.log(error);
  }

}

export const editMessage = async(req, res) => {
  try {
    const { id } = req.params;
    let { messageBody } = req.body;
    messageBody = base64.encode(messageBody)
    const editMessage =  await pool.query(
      "UPDATE messages SET messageBody = $1 WHERE id = $2",
      [messageBody, id]
    );
    res.json("Message was updated");
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
  console.log(`Server sendMessage: ${req.body}`)
  // try {
  //   const {recipient, urlToSend} = req.body;
  //   await sendSMS(`+${recipient}`, urlToSend);
  //   res.json(`Sent to ${recipient}: ${urlToSend}`)
  // } catch (error) {
  //   console.log(error);
  // }
}