import express from 'express';
import cors from 'cors';
import { getAll, getMessage, createMessage, editMessage, deleteMessage, sendMessage } from './controllers/messagesController.js'

const app = express();

// middleware

app.use(cors())

app.use(express.json())

app.get('/', getAll);

app.get('/:messageURL', getMessage);

app.post('/', createMessage);

app.patch('/:id', editMessage);

app.delete('/:id', deleteMessage);

app.post('/send', sendMessage);

app.listen(8000, () => {
  console.log('The Message Passer app is on port 8000!')
});
