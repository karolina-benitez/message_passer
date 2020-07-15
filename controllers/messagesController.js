import { v4 as uuidv4 } from "uuid";

let messages = [
  {
    messageBody: "This is a test",
    id: 1
  },
  {
    messageBody: "This is a test",
    id: 2
  },
  {
    messageBody: "This is a test",
    id: 3
  }
]

export const getMessage = (req, res) => {
  const { id } = req.params;

  const foundMessage = messages.find((message) => message.id === id)
  res.send(foundMessage)
}

export const createMessage = (req, res) => {
  const message = req.body;
  const messageId = uuidv4()
  console.log(req)
  console.log("Message: ", message)
  messages.push({ ...message, id: messageId});
  res.send(`The message id: ${messages.messageBody} was added to the database. ID: ${messages.id}`)
}

export const editMessage = (req, res) => {
  const { id } = req.params;

  const { messageBody } = req.body;

  const foundMessage = messages.find((message) => message.id === id)

  if(messageBody) foundMessage.messageBody = messageBody

  res.send(`The message with id: ${id} was successfully edited to: ${messageBody}`)
}

export const deleteMessage = (req, res) => {
  const { id } = req.params;

  const getMessage = messages.find((message) => message.id === id)
  messages = messages.filter((message) => message.id !== id)

  res.send(`Message with the id ${id} was deleted: ${getMessage.messageBody}`)
}