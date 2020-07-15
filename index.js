import express from 'express';
import cors from 'cors';
import { getAll, getMessage, createMessage, editMessage, deleteMessage } from './controllers/messagesController.js'

const app = express();

// middleware
app.use(cors())

app.use(express.json())

app.get('/', getAll);

app.get('/:id', getMessage);

app.post('/', createMessage);

app.patch('/:id', editMessage);

app.delete('/:id', deleteMessage);

app.listen(8000, () => {
  console.log('The Message Passer app is on port 8000!')
});
console

