import React, { Component } from 'react';


export default class Modal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='Modal-wrapper'>
        <div className='Modal'>
            <button onClick={this.props.action} className="btn-close">×</button>
            <div className="Modal-content">
                <input type="text" placeholder="Add a new item" />
            </div>
            <div className="Modal-footer">
              <button onClick={this.props.action} className="btn btn-red">Cancel</button>
              <button onClick={this.props.action} className="btn btn-green">Create</button>
            </div>
        </div>
      </div>
      
    );
  }
}
