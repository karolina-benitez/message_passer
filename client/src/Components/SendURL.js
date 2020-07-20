import React from 'react';
import {Redirect} from 'react-router';

const SendURL = ({messageURL}) => {
  const [recipient, setRecipient] = React.useState("");
  const [messageSent, setMessageSent] = React.useState(false);

  console.log(`before sending, recipient: ${recipient}, messageURL: ${messageURL}`)

  const sendtheURL = async e => {
    console.log("sendtheURL")

    // e.target.preventDefault();

    try {
      console.log(`Try to send recipient: ${recipient} and messageURL: ${messageURL}`);

      await fetch("http://localhost:8000/send", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(`{recipient: ${recipient},messageURL: ${messageURL}}`)
      })
      .then(response => response.json()) //response.text())//
      .then(text => console.log(text))
      // .then(data => console.log("data_id", data));
      setMessageSent(true);
      console.log(`setMessageSent(true), messageSent is: `)
    } catch (err) {
      console.error(`Caught sendtheURL error: ${err.message}`)
    }
  }

  return (
    <>
      <form className='mt-5 envelope' onSubmit={sendtheURL}>
      <fieldset>
        <legend>Send the link to someone</legend>
        <label htmlFor="send-msg">Please enter a phone number to send the message</label>
          <input
            type="text"
            className="form-control"
            value={recipient}
            onChange={e => setRecipient(e.target.value)}
            id="send-msg"
            placeholder="5106441234"
          />
          <button className="btn btn-primary text-center" >Send the message</button>
      </fieldset>
      </form>
      {messageSent && <Redirect to={{
        pathname: '/messagesent',
        state: { messageURL: `${messageURL}`}
      }} />
      }
    </>
  );
}

export default SendURL;