import React, { Fragment } from 'react';
import { Redirect } from 'react-router'

const CreateMessageForm = ({messageBody, setMessageBody, messageID, setMessageID, setData, data, messageURL, setMessageURL}) => {

  const onSubmitMessage = async (e) => {

    e.preventDefault();
    try {
      const body = { messageBody };
      const responseObject = await fetch("http://localhost:8000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      })
      .then(response => response.json())
      .then(data => {
        setMessageURL(data.messageurl)
        setMessageID(data.id)
        setMessageBody(data.messageBody)
        setData(data)
        console.log("data_id", data)
        console.log("responseobject", responseObject)
      });
    } catch (err) {
      console.error(err.message)
    }
  }

    return (
      <Fragment>
        <h1 className="text-center mt-5">Enter your message</h1>
        <form className='mt-5' onSubmit={onSubmitMessage}>
          <input
            type="text"
            className="form-control"
            value={messageBody}
            onChange={e => setMessageBody(e.target.value)}
          />
          <button className="btn btn-success text-center" >Generate URL</button>
        </form>
        {messageURL ? 
          <Redirect to={{
            pathname: '/url',
            state: { id: `${messageID}`,
                    messageURL: `${messageURL}`,
                     data: `${data}`}
          }} />
          : ""
        }
      </Fragment>
    );
  }

export default CreateMessageForm;