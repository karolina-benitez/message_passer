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

export const getAll = (req,res) => {
  res.send(messages)
}
export const getMessage = (req, res) => {
  const { id } = req.params;
  console.log(req)

  const foundMessage = messages.find( (message) => message.id === id )
  res.send(`getMessage: ${id}, ${foundMessage.messageBody}`)
}

export const createMessage = (req, res) => {
  const {messageBody} = req.body;
  
  const messageId = uuidv4()
  
  messages.push({ messageBody, id: messageId});
  console.log(messages)
  res.send(`The message id: ${messageId} was added to the database. Message: ${messageBody}`)
}

export const editMessage = (req, res) => {
  const { id } = req.params;

  const { messageBody } = req.body;

  const foundMessage = messages.find((message) => message.id === id)

  if(messageBody) foundMessage.messageBody = messageBody

  console.log(messages)
  res.send(`The message with id: ${id} was successfully edited to: ${messageBody}`)

}

export const deleteMessage = (req, res) => {
  const { id } = req.params;

  const getMessage = messages.find((message) => message.id === id)
  messages = messages.filter((message) => message.id !== id)

  console.log(getMessage)
  res.send(`Message with the id ${id} was deleted: ${getMessage.messageBody}`)
  
  console.log(messages)
}

