import React from 'react';

const MessageForm = () => {
  const [value, setValue] = React.useState('Please enter your secret message.')

  const handleChange = event => {
      setValue(event.target.value)
    }

  const handleSubmit = event => {
      // alert('Your message was submitted: ' + value);
      // alert('')
      event.preventDefault();
    }

    // render() {
      return (
        <div>
          <h3>Enter your message</h3>
          <form onSubmit={handleSubmit}>
            <label>
              <textarea value={value} onChange={handleChange} />
            </label>
            <input type="submit" value="Generate URL" />
          </form>
        </div>
      );
    // }
  }

export default MessageForm;