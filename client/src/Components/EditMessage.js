import React, { Fragment, useEffect, useState, useRef } from 'react';
// import {useLocation} from "react-router-dom";

const EditMessage = ({messageID,messageBody, setMessageBody, messageURL, setMessageURL}) => {
  // const location = useLocation();
  // console.log(`In EditMessage, location contains: ${location.state}`)
  // let messageID = location.state.id
  // console.log(messageID)
  // messageID = parseInt(messageID)
  console.log("EditMessage got messageID as: ", messageID)
  const [updatedMessageBody, setUpdatedMessageBody] = useState(messageBody);
  // const [messageURL, setMessageURL] = useState("");
  // const [data, setdata] = useState("");
  // console.log(`EditMessage data is: ${data}`)
  // TODO: FETCH again when message is updated to update URL
  useEffect( () => {
    try {
      const getMessage = async () => {
        const response = await fetch(`http://localhost:8000/${messageURL}`);
        const data = await response.json();
        // const item = data
        setMessageBody(data.messagebody)
        setMessageURL(data.messageURL)
        // setdata(data)
      }
      getMessage();
      console.log("fetch happened");
    } catch (error) {
      console.log(error);
    }
  }, [messageBody]);

  console.log("EditMessage has messageURL:", messageURL)
  // console.log("data: ", data)

  const onSubmitMessage = async (e) => {
  
    e.preventDefault();
    try {
      const body = updatedMessageBody;
      console.log(`onSubmitMessage body is: ${body}, and messageID is ${messageID}`)
      // const responseObject = 
      await fetch(`http://localhost:8000/${messageID}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      })
      .then(response => response.json())
      .then( data => {
        console.log(`EditMessage onSubmitMessage data.messagebody: ${data.messagebody}`)
        setMessageBody(data.messagebody);
        setMessageURL(data.messageURL);
      })
    } catch (err) {
      console.error(err.message)
    }
  }
  // function to copy url to clipboard
  const [copySuccess, setCopySuccess] = useState('');
  const textAreaRef = useRef(null);

  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand('copy');
    e.target.focus();
    setCopySuccess('Copied!');
  };
  // function to copy url to clipboard ----------END
  
  let copyMessageURL = `http://localhost:3000/${messageURL}`
  
  return (
    <Fragment>
      <h1 className="text-center">Secret Message URL</h1>
      <form className='mt-5' onSubmit={onSubmitMessage}>
      <label htmlFor="messagebox">Edit message (optional) </label>
        <input
          id="messagebox"
          type="text"
          className="form-control"
          value={updatedMessageBody}
          onChange={e => {
            console.log(`The input box is setting updatedMessageBody to ${updatedMessageBody}`)
            setUpdatedMessageBody(e.target.value)}}
        />
        <button className="btn btn-success text-center" >Edit Message</button>
      </form>
      <form className='mt-5'>
       <label htmlFor="urlbox">Message url: </label>
       <textarea
          id="urlbox"
          className="form-control"
          ref={textAreaRef}
          value={copyMessageURL}
          onChange={e => e.preventDefault()}
        />
      </form>
      {
       /* Logical shortcut for only displaying the
          button if the copy command exists */
       document.queryCommandSupported('copy') &&
        <div>
          <button className="btn btn-success text-center" onClick={copyToClipboard}>Copy</button>
          {copySuccess}
        </div>
      }
    </Fragment>
  )

}

export default EditMessage