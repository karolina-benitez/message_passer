import React, { Fragment, useEffect, useState, useRef } from 'react';
import {useLocation} from "react-router-dom";

const EditMessage = () => {
  const location = useLocation();
  let messageID = location.state.id
  console.log(messageID)
  // messageID = parseInt(messageID)
  console.log("messageID", messageID)
  const [messageBody, setMessageBody] = useState("");
  const [messageURL, setMessageURL] = useState("");
  const [data, setdata] = useState("");

  // TODO: FETCH again when message is updated to update URL
  useEffect(async () => {
    const response = await fetch(`http://localhost:8000/${messageID}`);
    const data = await response.json();
    const item = data
    setMessageURL(item.messageURL)
    setMessageBody(item.messagebody)
    setdata(item)
    console.log("fetch happened")
  }, []);
  console.log("messageURL", messageURL)
  console.log("data: ", data)
  const onSubmitMessage = async (e) => {
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
      <form className='mt-5' onSubmit={onSubmitMessage}>
        <input
          type="text"
          className="form-control"
          value={messageBody}
          onChange={e => setMessageBody(e.target.value)}
        />
        <p>Edit message (optional)</p>
        <button className="btn btn-success text-center" >Edit Message</button>
      </form>
      <p>Message url: </p>
      <form>
        <textarea
          ref={textAreaRef}
          value={copyMessageURL}
        />
      </form>
      {
       /* Logical shortcut for only displaying the
          button if the copy command exists */
       document.queryCommandSupported('copy') &&
        <div>
          <button onClick={copyToClipboard}>Copy</button>
          {copySuccess}
        </div>
      }
    </Fragment>
  )

}

export default EditMessage