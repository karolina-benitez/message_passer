import React from 'react';
import './App.css';
import Header from './Components/Header';
import MessageForm from './Components/MessageForm';
// import URLDisplay from './Components/URLDisplay';
import SendURL from './Components/SendURL';

function App() {

  const [recipient, setRecipient] = React.useState("");
  const [url, setURL] = React.useState('');

  return (
    <div className="App">
      <Header/>
      <MessageForm/>
      <SendURL 
          recipient={recipient} 
          setRecipient={setRecipient} 
          url={url}
          setURL={setURL}
        />
    </div>
  );
}

export default App;
