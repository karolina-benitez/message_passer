import express from 'express';
import cors from 'cors';
import { getAll, getMessage, createMessage, editMessage, deleteMessage } from './controllers/messagesController.js';
// ------------testing qs-------------
import qs from 'qs';
import assert from 'assert';

let testing = {
  messageBody:"This is my test string"
}

var obj = qs.parse('a%5Bb%5D=c');
assert.deepEqual(obj, { a: 'c' });
console.log()
var str = qs.stringify(obj);
assert.equal(str, 'a=c');

console.log(qs.stringify(testing))
// ------------testing qs-------------

// Should we use gravatar https://www.npmjs.com/package/gravatar to encrypt the message, store the encripted message in db.
// turn encrypted messageBody into a query string

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
