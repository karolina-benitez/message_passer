import express from 'express';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from "uuid";

import { getAll, getMessage, createMessage, editMessage, deleteMessage } from './controllers/messagesController.js'

const app = express();

app.use(bodyParser.json());

app.get('/', getAll);

app.get('/:id', getMessage);

app.post('/', createMessage);

app.patch('/:id', editMessage);

app.delete('/:id', deleteMessage);

app.listen(8000, () => {
  console.log('The Message Passer app is on port 8000!')
});
