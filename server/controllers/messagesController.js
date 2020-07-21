import Pool from 'pg';
import qs from 'qs';
import base64 from 'base-64';
import sendSMS from '../messaging/sendSMS.js'

export const pool =  new Pool.Pool({
  user: "postgres",
  password: "",
  host: "localhost",
  port: 5432,
  database: "messagepasserdb"
});

export const getAll = async(req,res) => {
  console.log("🍏🍏🍏🍏🍏🍏🍏🍏🍏🍏🍏🍏🍏🍏🍏🍏🍏🍏🍏🍏🍏 get all endpoint")

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
  console.log("🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌 \ngetMessage endpoint")

  try {
    // retrieving the messageBody from the params
    // code was breaking when renaming it to messageParams
    let  { messageURL } = req.params;
    messageURL = qs.parse(messageURL)
    // the current code is querying the database using the messagebody passed in through the params
    // TODO: search db using messageURL
    const message = await pool.query(
      "SELECT * FROM messages WHERE messagebody = $1 LIMIT 1",
      [messageURL.messageBody]
    );

    res.json({"messagebody": base64.decode(message.rows[0].messagebody), "messageURL": message.rows[0].messageurl, "id": message.rows[0].id });

    //response
    console.log("res.json: ", {"messagebody": base64.decode(message.rows[0].messagebody), "messageURL": message.rows[0].messageurl, "id": message.rows[0].id })
  } catch (error) {
    console.log(error);
  }
}

export const createMessage = async(req, res) => {
  console.log("🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓 \ncreateMessage endpoint")
  try {
    let {messageBody} = req.body;
    // we are encrypting the messageBody passed in during the request using base64
    messageBody = base64.encode(messageBody)
    // we are creating a url by passing in the encrypted message through the qs.stringify method
    let messageURL = qs.stringify({"messageBody": messageBody})

    const newMessage = await pool.query(
      "INSERT INTO messages (messageBody, messageURL) VALUES($1, $2) RETURNING *",
      [messageBody, messageURL]
    );

    res.json({"messagebody": newMessage.rows[0].messagebody,
    "id": newMessage.rows[0].id,
    "messageurl": newMessage.rows[0].messageurl,
    });

    //response
    console.log(`res.json: id: ${newMessage.rows[0].id} \n messagebody: ${newMessage.rows[0].messagebody} \n messageurl: ${newMessage.rows[0].messageurl}`)
  } catch (error) {
    console.log(error);
  }
}

export const editMessage = async(req, res) => {
  console.log(`🍑🍑🍑🍑🍑🍑🍑🍑🍑🍑🍑🍑🍑🍑🍑🍑🍑🍑🍑🍑🍑 \n editMessage endpoint`)
  try {
    const { id } = req.params;
    let { messageBody } = req.body;
    messageBody = base64.encode(messageBody)
    console.log(`id: ${id} \n messageBody: ${messageBody}`)
    const editMessage =  await pool.query(
      "UPDATE messages SET messageBody = $1 WHERE id = $2 RETURNING *",
      [messageBody, id]
    );

    res.json(editMessage.rows[0]);
    //response
    console.log("res.json", editMessage.rows[0])
  } catch (error) {
    console.log(error);
  }
}

export const deleteMessage = async(req, res) => {
  try {
    console.log("🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒 \n delete endpoint was hit!!!!! ")
    const { id } = req.params;
    console.log("id is: ", id)
    const deleteMessage = await pool.query(
      "DELETE FROM messages where id = $1",
      [id]
    );
    res.json(`Your message (ID ${id}) was successfully deleted`)

    //response
    console.log(`Your message (ID ${id}) was successfully deleted`)
  } catch (error) {
    console.log(error);
  }
}

export const sendMessage = async(req, res) => {
  console.log(`🥑🥑🥑🥑🥑🥑🥑🥑🥑🥑🥑🥑🥑🥑🥑🥑🥑🥑🥑🥑🥑🥑🥑🥑\n  sendMessage gets the following request: ${req.body}`)
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