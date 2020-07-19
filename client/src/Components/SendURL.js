import React from 'react';

const SendURL = ({recipient, setRecipient, url}) => {
  console.log(`before sending, recipient: ${recipient}, url: ${url}`)
  const sendtheURL = async e => {
    console.log("sendtheURL")

    e.target.preventDefault();

    try {
      console.log(`recipient: ${recipient}\nurl: ${url}`);

      await fetch("http://localhost:8000/send", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: "Text from SendURL" //JSON.stringify(`{recipient: ${recipient},urlToSend: ${url}}`)
      })
      .then(response => response.text())//response.json())
      .then(text => console.log(text))
      // .then(data => console.log("data_id", data));

    } catch (err) {
      console.error(err.message)
    }
  }

  return (
    <>
      <form className='mt-5' onSubmit={sendtheURL}>
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
    </>
  );
}

export default SendURL;