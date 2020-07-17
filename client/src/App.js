import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import './App.css';
import EditMessage from './Components/EditMessage'
// import Header from './Components/Header';
import CreateMessageForm from './Components/CreateMessageForm';
import URLDisplay from './Components/URLDisplay';

function App() {

  const [messageBody, setMessageBody] = useState("");
  const [messageID, setMessageID] = useState("");
  // const [messageURL, setMessageURL] = useState("");

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
            />
          </Route>
          <Route exact path ='/:messageID'>
            <EditMessage
            />
          </Route>
          <Route exact path ='/random'>
            <URLDisplay/>
          </Route>

        </Switch>
      </BrowserRouter>
    </div>

  )

}

export default App;
