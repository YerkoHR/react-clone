import React from 'react';

class Save extends React.Component {
    constructor() {
      super();
      this.state = {toggle: true};
      this.eventHandler = this.eventHandler.bind(this);
    }
    eventHandler(event) {
      this.setState((prevState) => ({
          toggle: !prevState.toggle
        })
      );
    }
    render() {
      return(
        <div>
          <button onClick={this.eventHandler}>{this.state.toggle ? 'Save' : 'Not save'}</button>
        </div>
      );
    }
  }
  
export default Save;