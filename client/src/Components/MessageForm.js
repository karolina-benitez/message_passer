import React from 'react';

class MessageForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: 'Please enter your secret message.'
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      this.setState({value: event.target.value});
    }

    handleSubmit(event) {
      alert('Your message was submitted: ' + this.state.value);
      event.preventDefault();
    }

    render() {
      return (
        <div>
          <h3>Enter your message</h3>
          <form onSubmit={this.handleSubmit}>
            <label>
              <textarea value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Generate URL" />
          </form>
        </div>
      );
    }
  }

export default MessageForm;