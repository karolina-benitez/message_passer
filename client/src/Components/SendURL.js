import React from 'react';

const SendURL = ({recipient, setRecipient, url, setURL}) => {
  const sendtheURL = async e => {
    console.log("sendtheURL")

    e.preventDefault();

    try {
      console.log(recipient)
      await fetch("http://localhost:8000/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recipient)
      })
      .then(response => response.json())
      .then(data => console.log("data_id", data.id));

    } catch (err) {
      console.error(err.message)
    }
  }

  return (
    <>
      <form className='mt-5' onSubmit={sendtheURL}>
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
      </form>
    </>
  );
}

export default SendURL;