import React, {Fragment} from 'react';
import WorkContainer from '../../components/WorkContainer';

class AdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmitUserForm = this.props.handleSubmitUserForm.bind(this);
    this.handleChangeUserForm = this.props.handleChangeUserForm.bind(this);
    this.handleChangeWorkForm = this.props.handleChangeWorkForm.bind(this);
    this.handleSubmitWorkForm = this.props.handleSubmitWorkForm.bind(this);
    this.handleUpdate = this.props.handleUpdate.bind(this);
    this.hanldeRemove = this.props.hanldeRemove.bind(this);
  }
  render() {
        // const { title, body, screenshot }  = this.props.newWork
        return (
            <div className="newWork">
                  <h2>Add a work</h2> 
                    <form onSubmit={ this.props.handleSubmitWorkForm }>
                      <div className="field-wrapper">
                        <label>Title</label>
                        <input 
                          name="title" 
                          type="text" 
                          onChange={ this.handleChangeWorkForm }
                          value={ this.props.newWork.title } />
                      </div>
                      <div className="field-wrapper">
                        <label>Description</label>
                        <input 
                          name="body" 
                          type="text" 
                          onChange={ this.props.handleChangeWorkForm }
                          value={ this.props.newWork.body } />
                      </div>
                      <div className="field-wrapper">
                        <label>Screenshot</label>
                        <input 
                          name="screenshot" 
                          type="text" 
                          onChange={ this.props.handleChangeWorkForm }
                          value={ this.props.newWork.screenshot } />
                      </div>
                      <input type="submit" value="Submit" />
                    </form>
            </div>
        )

    }
}

export default AdminPage; 