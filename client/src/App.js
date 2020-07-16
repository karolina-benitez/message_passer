import React from 'react';
import './App.css';
import Header from './Components/Header';
import MessageForm from './Components/MessageForm';
// import URLDisplay from './Components/URLDisplay';

function App() {
  return (
    <div className="App">
      <Header/>
      <MessageForm/>
      {/* <URLDisplay /> */}
    </div>
  );
}

export default App;
