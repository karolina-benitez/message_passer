import React from 'react';
import './App.css';
import Header from './Components/Header';
import MessageForm from './Components/MessageForm';
// import URLDisplay from './Components/URLDisplay';
import SendURL from './Components/SendURL';

function App() {

  const [recipient, setRecipient] = React.useState("");
  const [url, setURL] = React.useState('hardcodedurl');

  return (
    <div className="App">
      <Header/>
      <MessageForm url={url} setURL={setURL}/>
      <SendURL 
          recipient={recipient} 
          setRecipient={setRecipient} 
          url={url}
        />
    </div>
  );
}

export default App;
