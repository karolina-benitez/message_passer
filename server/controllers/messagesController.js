import Pool from 'pg';
import qs from 'qs';
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
    const { id } = req.params;
    const message = await pool.query(
      "SELECT * FROM messages WHERE id = $1",
      [id]
    );
    res.json(message.rows[0]);
  } catch (error) {
    console.log(error);
  }
}

export const createMessage = async(req, res) => {
  try {
    const {messageBody} = req.body;
    // messageBody w/ BASE64
    // messageBody = qs.stringify(testing)
    const newMessage = await pool.query(
      "INSERT INTO messages (messageBody) VALUES($1) RETURNING *",
      [messageBody]
    );
    res.json(newMessage.rows[0]);
  } catch (error) {
    console.log(error);
  }

}

export const editMessage = async(req, res) => {
  try {
    const { id } = req.params;
    const { messageBody } = req.body;
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
    const { id } = req.params;
    const deleteMessage = await pool.query(
      "DELETE FROM messages where id = $1",
      [id]
    );
    res.json("Message was deleted")
  } catch (error) {
    console.log(error);
  }
}
