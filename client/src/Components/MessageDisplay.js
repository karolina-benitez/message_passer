import React, { Fragment, useEffect, useState } from 'react';
import {useLocation} from "react-router-dom";

const MessageDisplay = () => {
  const location = useLocation();
  let messageURL = `${location.pathname}`
  console.log(location)
  // messageID = parseInt(messageID)
  messageURL = messageURL.replace(/\//, '')
  console.log("messageURL", messageURL)
  const [messageBody, setMessageBody] = useState("");
  const [messageID, setID] = useState("");
  const [data, setdata] = useState("");

  useEffect( () => {
    const getMessageURL = async () => {

      const response = await fetch(`http://localhost:8000/${messageURL}`);
      const data = await response.json();

      setMessageBody(data.messagebody)
      setID(data.id)
      setdata(data)
    }
    getMessageURL();
    console.log("fetch happened")
  }/* , [messageURL] */);
  console.log("messageBody", messageBody)
  console.log("data: ", data)
  console.log("messageID: ", messageID)
  console.log("messageID: ", typeof messageID)

  const onDeleteMessage = async (e) => {
    console.log("delete button clicked")
    console.log("messageID", messageID)
    e.preventDefault();
    try {
      // const responseObject = 
      await fetch(`http://localhost:8000/${messageID}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      })
      .then(response => console.log("response: ", response))
      // .then(response => response.json())
    } catch (err) {
      console.error(err.message)
    }
    setMessageBody("Your message was deleted")
  }

  return (
    <Fragment>
      <h1 className="text-center">Secret Message</h1>
      <p className="messageDisplay">{messageBody}</p>
      {messageBody !== "Your message was deleted" ? 
      <div className="buttonContainer">
        <button  className="buttonStyle btn btn-success text-center" onClick={onDeleteMessage}>Delete</button>
        </div> : ''}
    </Fragment>

  )
}

export default MessageDisplay