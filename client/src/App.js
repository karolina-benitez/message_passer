import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import './App.css';
import EditMessage from './Components/EditMessage'
import CreateMessageForm from './Components/CreateMessageForm';
import MessageDisplay from './Components/MessageDisplay';
import SendURL from './Components/SendURL';

function App() {

  const [messageBody, setMessageBody] = useState("");
  const [messageID, setMessageID] = useState("");
  const [messageURL, setMessageURL] = React.useState('');
  const [data, setData] = React.useState({})

  console.log(`App has messageBody: ${messageBody}, messageID: ${messageID}, messageURL: ${messageURL}`)

  return(
    <div className="container">
      <BrowserRouter>
        <Switch>
          <Route exact path ='/'>
            <CreateMessageForm
            messageBody={messageBody}
            setMessageBody={setMessageBody}
            messageID={messageID}
            setMessageID={setMessageID}
            messageURL={messageURL}
            setMessageURL={setMessageURL}
            data={data}
            setData={setData}
            />
          </Route>
          <Route exact path ='/url'>
            <EditMessage
              messageID={messageID}
              messageBody={messageBody}
              setMessageBody={setMessageBody}
              messageURL={messageURL}
              setMessageURL={setMessageURL}
          />
            <SendURL 
              messageURL={messageURL}
            />
          </Route>
          <Route exact path ='/:messageURL'>
            <MessageDisplay/>
          </Route>
          <Route exact path='/messagesent'>
            <p>You sent your message</p>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>

  )

}

export default App;
