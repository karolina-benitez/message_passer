import React, { Fragment, useEffect, useState } from 'react';
import {useLocation} from "react-router-dom";

const EditMessage = () => {
  const location = useLocation();
  let messageID = location.state.id
  messageID = parseInt(messageID)
  const [messageBody, setMessageBody] = useState("");
  const [messageURL, setMessageURL] = useState("");

  useEffect( async () => {
    const response = await fetch(`http://localhost:8000/${messageID}`);
    const data = await response.json();
    const item = data
    setMessageURL(item.messageURL)
    setMessageBody(item.messagebody)
  }, []);
  // console.log("data returned: ", data)
  // console.log("messageURL: ", messageURL)
  // console.log("messageBody: ", messageBody)

  const onSubmitMessage = async (e) => {
    // console.log("OnSubmitMessage clicked")
    // console.log(messageBody)
    e.preventDefault();
    try {
      const body = { messageBody };
      const responseObject = await fetch(`http://localhost:8000/${messageID}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      })
      .then(response => response.json())
    } catch (err) {
      console.error(err.message)
    }
  }

  return (
    <Fragment>
      <form className='mt-5' onSubmit={onSubmitMessage}>
        <input
          type="text"
          className="form-control"
          value={messageBody}
          onChange={e => setMessageBody(e.target.value)}
        />
        <p>Edit message (optional)</p>
        <button className="btn btn-success text-center" >Edit Message</button>
        <p>Message url: http://localhost8000/${messageURL}</p>
      </form>
    </Fragment>
  )

}

export default EditMessage