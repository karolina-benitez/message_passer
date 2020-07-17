import React, { Fragment, useEffect, useState } from 'react';
import {useLocation} from "react-router-dom";

const MessageDisplay = () => {
  const location = useLocation();
  let messageURL = `${location.pathname}`
  // messageID = parseInt(messageID)
  messageURL = messageURL.replace(/\//, '')
  console.log("messageURL", messageURL)
  const [messageBody, setMessageBody] = useState("");
  const [data, setdata] = useState("");

  useEffect(async () => {
    const response = await fetch(`http://localhost:8000/${messageURL}`);
    const data = await response.json();
    const item = data
    setMessageBody(item.messagebody)
    setdata(item)
    console.log("fetch happened")
  }, []);
  console.log("messageBody", messageBody)
  console.log("data: ", data)






  // let messageID = location.state.id
  // messageID = parseInt(messageID)
  // const [messageBody, setMessageBody] = useState("");
  // const [messageURL, setMessageURL] = useState("");
  // const [data, setdata] = useState("");

  // TODO: FETCH again when message is updated to update URL
  // useEffect( async () => {
  //   const response = await fetch(`http://localhost:8000/${messageID}`);
  //   const data = await response.json();
  //   const item = data
  //   setMessageURL(item.messageURL)
  //   setMessageBody(item.messagebody)
  //   setdata(item)
  // }, []);

  // const onSubmitMessage = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const body = { messageBody };
  //     const responseObject = await fetch(`http://localhost:8000/${messageID}`, {
  //       method: "PATCH",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(body)
  //     })
  //     .then(response => response.json())
  //   } catch (err) {
  //     console.error(err.message)
  //   }
  // }

  return (
    <h1>Message DISPLAY</h1>
  )
}

export default MessageDisplay