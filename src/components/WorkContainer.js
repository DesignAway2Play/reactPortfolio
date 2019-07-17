
import React, { Component } from 'react';
import Work from './Work';

const workContainerStyles = {
  maxWidth: 500,
  margin: '0 auto',
  padding: 20
}

class WorkContainer extends Component {
  render() {
    let workList = this.props.works.map((work, {...props}) => (
      <Work {...work} {...props} />
    ));

    return (
      <div 
        className="Work-container"
        style={ workContainerStyles }
      >
        { workList }  
      </div>
    );
  }
}

export default WorkContainer;