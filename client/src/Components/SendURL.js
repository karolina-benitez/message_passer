import React from 'react';

const SendURL = ({messageURL, messageSent, setMessageSent}) => {
  const [recipient, setRecipient] = React.useState("");

  console.log(`before sending, recipient: ${recipient}, messageURL: ${messageURL}`)

  const sendPost = {
    recipient: recipient,
    messageURL: `http://localhost:3000/${messageURL}`
  };
  const postOptions = {
    method: 'POST',
    body: JSON.stringify(sendPost),
    headers: {
      'Content-Type': 'application/json',
    }
  };
  const sendtheURL = async e => {
    e.preventDefault();
    try {
      console.log(`Try to send recipient: ${recipient} and messageURL: ${messageURL}`);

      await fetch("http://localhost:8000/send", postOptions)
      .then(response => response.json()) //response.text())//
      // .then(text => console.log(text))
      .then(data => console.log("SendtheURL response data", data));
      setMessageSent(true);
      console.log(`setMessageSent(true) messageSent===true?:${messageSent} `)
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
        pathname: '/sent'//,
        // state: { 
        //   messageURL: `${messageURL}`,
        //   recipient: `${recipient}`

        // }
      }} />
      }
    </>
  );
}

export default SendURL;