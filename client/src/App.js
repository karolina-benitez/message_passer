import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import './App.css';
import EditMessage from './Components/EditMessage'
import CreateMessageForm from './Components/CreateMessageForm';
import MessageDisplay from './Components/MessageDisplay';
import SentConfirmation from './Components/SentConfirmation';


function App() {

  const [messageBody, setMessageBody] = useState("");
  const [messageID, setMessageID] = useState("");
  const [messageURL, setMessageURL] = useState("");

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
          </Route>
          <Route exact path ='/:messageURL'>
            <MessageDisplay/>
          </Route>
          <Route exact path='/sent'>
            <SentConfirmation
              messageURL={messageURL}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>

  )

}

export default App;
