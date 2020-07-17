import React, { Fragment, useEffect} from 'react';

const CreateMessageForm = ({messageBody, setMessageBody, messageID, setMessageID}) => {

  const onSubmitMessage = async (e) => {
    console.log("OnSubmitMessage clicked")
    console.log(messageBody)
    e.preventDefault();
    try {
      const body = { messageBody };
      const responseObject = await fetch("http://localhost:8000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      })
      .then(response => response.json())
      .then(data => console.log("data_id", data[0].id));

      console.log("responseobject", responseObject)
    } catch (err) {
      console.error(err.message)
    }
  }

  // NEED TO FIND WAY TO RETURN MESSAGE_ID ONCE MESSAGE IS STORED IN THE DB
      return (
        <Fragment>
          <h3 className="text-center mt-5">Enter your message</h3>
          <form className='mt-5' onSubmit={onSubmitMessage}>
            <input
              type="text"
              className="form-control"
              value={messageBody}
              onChange={e => setMessageBody(e.target.value)}
            />
            <button className="btn btn-success text-center" >Generate URL</button>
          </form>
        </Fragment>
      );
  }

export default CreateMessageForm;