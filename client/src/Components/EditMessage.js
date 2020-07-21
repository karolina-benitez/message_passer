import React, { Fragment, useEffect, useState, useRef } from 'react';
// import {useLocation} from "react-router-dom";

const EditMessage = ({messageID,messageBody, setMessageBody, messageURL, setMessageURL}) => {

  const [updatedMessageBody, setUpdatedMessageBody] = useState(messageBody);

  // TODO: FETCH again when message is updated to update URL
  // RESULT: We do not need to fetch again because the url will remain the same and the textbox value is updated during the PATCH request
  useEffect( () => {
    try {
      const getMessage = async () => {
        const response = await fetch(`http://localhost:8000/${messageURL}`);
        const data = await response.json();
        setMessageBody(data.messagebody)
        setMessageURL(data.messageURL)
      }
      getMessage();
      console.log("🍿🍿🍿🍿🍿🍿fetch happened🍿🍿🍿🍿🍿🍿🍿");
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onSubmitMessage = async (e) => {
    e.preventDefault();
    try {
      const body = { updatedMessageBody };

      await fetch(`http://localhost:8000/${messageID}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        Accept : 'application/json',
        body: JSON.stringify(body)
      })
      .then(response => response.json())
      .then( data => {
        console.log(`onSubmitMessage data.messagebody: ${data.messagebody}`)
        setMessageBody(data.messagebody);
        setMessageURL(data.messageurl);
        setEditSuccess('Message successfully edited!')
      })
    } catch (err) {
      console.error(err.message)
    }
  }

  //copy url to clipboard
  const [copySuccess, setCopySuccess] = useState('');
  const textAreaRef = useRef(null);

  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand('copy');
    e.target.focus();
    setCopySuccess('Copied!');
  };
  let copyMessageURL = `http://localhost:3000/${messageURL}`

  // success message popup
  const [editSuccess, setEditSuccess] = useState('');
  const [textSuccess, setTextSuccess] = useState('');

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
          onChange={e => {setUpdatedMessageBody(e.target.value)}}
        />
        <button className="btn btn-success text-center" >Edit Message</button>
        {editSuccess}
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