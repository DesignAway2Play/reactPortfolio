import React from 'react';

const workStyles = {
  backgroundColor: 'coral',
  border: '1px solid salmon',
  borderRadius: 3,
  margin: '0 0 20px',
  padding: '0 20px 20px'
}

export default function Work(props) {
  // this.handleUpdate = this.props.handleUpdate.bind(this);
  // this.handleRemove = this.props.handleRemove.bind(this);
  return (
    <div className="Work-wrapper" style={workStyles}>
      <h3>{ props.title }</h3>
      <p><img src={ props.screenshot } alt={ props.title } /></p>

      <div className="Work-body">
        { props.body }
      </div>
      {/* <button onClick={() => this.handleRemove(props.id)}>Delete</button> */}
    </div>
  );
}