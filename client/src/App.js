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
  const [recipient, setRecipient] = React.useState("");
  const [url, setURL] = React.useState('hardcodedurl');

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
            setURL={setURL}
            />
          </Route>
          <Route exact path ='/url'>
            <EditMessage
            />
            <SendURL 
              recipient={recipient} 
              setRecipient={setRecipient} 
              url={url}
            />
          </Route>
          <Route exact path ='/:messageURL'>
            <MessageDisplay/>
          </Route>

        </Switch>
      </BrowserRouter>
    </div>

  )

}

export default App;
