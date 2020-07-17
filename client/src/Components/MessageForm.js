import React from 'react';

const MessageForm = ({url, setURL}) => {

  const handleChange = event => {
      setURL(event.target.value)
    }

  const handleSubmit = event => {

      event.preventDefault();
    }

    // render() {
      return (
        <div>
          <h3>Enter your message</h3>
          <form onSubmit={handleSubmit}>
            <label>
              <textarea value={url} onChange={handleChange} />
            </label>
            <input type="submit" value="Generate URL" />
          </form>
        </div>
      );
    // }
  }

export default MessageForm;