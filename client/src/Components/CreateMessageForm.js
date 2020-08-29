import React, { Fragment } from 'react';
import { Redirect } from 'react-router'

const CreateMessageForm = ({messageBody, setMessageBody, messageID, setMessageID, messageURL, setMessageURL}) => {

  const onSubmitMessage = async (e) => {

    e.preventDefault();
    try {
      const body = { messageBody };
      await fetch("http://localhost:8000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      })
      .then(response => response.json())
      .then(data => {
        setMessageURL(data.messageurl)
        setMessageID(data.id)
        setMessageBody(data.messagebody)
      });
    } catch (err) {
      console.error(err.message)
    }
  }

    return (
      <Fragment>
        <h1 className="text-center mt-5" id="message-box">Enter your COOL 02 message</h1>
        <form className='mt-5' onSubmit={onSubmitMessage}>
          <input
            type="text"
            id="message-field"
            className="form-control"
            value={messageBody}
            onChange={e => setMessageBody(e.target.value)}
          />
          <button className="btn btn-primary text-center"
              id="generate-button">Generate URL
          </button>
        </form>
        {messageURL ? 
          <Redirect to={{
            pathname: '/url'}} />
          : ""
        }
      </Fragment>
    );
  }

export default CreateMessageForm;