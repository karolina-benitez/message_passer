import React, { Fragment, useEffect, useState } from 'react';
import {useLocation} from "react-router-dom";

const MessageDisplay = () => {
  const [messageBody, setMessageBody] = useState("");
  const [messageID, setID] = useState("");
  const location = useLocation();
  let messageURL = `${location.pathname}`

  // currently querying the db by using the mssagebody instead of messageurl
  // this line removes the path slash to prepare the body for the query
  messageURL = messageURL.replace(/\//, '')

  useEffect( () => {
    const getMessageURL = async () => {
      const response = await fetch(`http://localhost:8000/${messageURL}`);
      const data = await response.json();
      setMessageBody(data.messagebody)
      setID(data.id)
      console.log(`data.messagebody: ${data.messagebody}`)
      console.log(`data.id: ${data.id}`)
    }
    getMessageURL();
    console.log("fetch happened")
  },[]);
console.log(`messageID: ${messageID}`)
  const onDeleteMessage = async (e) => {
    console.log("delete button clicked")
    console.log("messageID", messageID)
    e.preventDefault();
    try {
      await fetch(`http://localhost:8000/${messageID}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      })
      .then(response => console.log("response: ", response))
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