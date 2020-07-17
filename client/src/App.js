import React, { Fragment, useState } from 'react';
import './App.css';
// import Header from './Components/Header';
import CreateMessageForm from './Components/CreateMessageForm';
// import URLDisplay from './Components/URLDisplay';

function App() {

  const [messageBody, setMessageBody] = useState("");
  const [messageID, setMessageID] = useState("");

  return(
    <Fragment>
      <div className="container">
        <CreateMessageForm
        messageBody={messageBody}
        setMessageBody={setMessageBody}
        messageID={messageID}
        setMessageID={setMessageID}
        />
      </div>
    </Fragment>
  )

}

export default App;
