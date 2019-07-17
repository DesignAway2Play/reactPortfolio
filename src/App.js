import React, { Component, Fragment } from 'react';
import {
  Route,
  Link,
  Switch,
  Redirect,
  BrowserRouter as Router
} from 'react-router-dom';

import {
  login,
  logout,
  auth,
  database,
  createWork,
  removeWork,
  updateWork
} from './utils/FirebaseService';
import Nav from './components/Nav/Nav';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import './App.css';
import { fetchAPOD } from './services/nasa-api';
import { fetchNEOToday } from './services/nasa-api';
import { fetchProfile } from './services/profile-api';
import APODPage from './pages/APOD/APOD';
import NEOPage from './pages/NEO/NEO';
import AdminPage from './pages/Admin/Admin';
import WorkContainer from './components/WorkContainer';

const linkStyle = {
  textDecoration: "underline",
  color: "rebeccapurple",
  cursor: "pointer"
}

const d = new Date().toISOString().split('T')[0];

function home() {
  return (
    <div>
      <h1>Timothy's Portfolio</h1> 
    </div>
  )
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
      user: null,
      worksRef: "works",
      profile: {
        name: "",
        aboutMe: "",
        isAdmin: false,
        userId: 0,
        isProfile: false
      },
      apod: null,
      neo: null,
      works: [{
        title: "",
        body: "",
        screenshot: ""
      }],
      newWork: {
        title: "",
        body: "",
        screenshot: ""
      },
      newProfile: {
        name: "",
        aboutMe: "",
        isAdmin: false,
        userId: null,
        isProfile: true
      }
    }
  }

async componentDidMount() {
  this.handlePopulateWorks();
    await auth.onAuthStateChanged(user => {
      if(user) {
        this.setState({ authenticated: true,
          user });
          var profileId = {...this.state.profile};
          profileId.userId = user.uid;
          (async () => {
          let foundProfile = await fetchProfile(profileId.userId);
          let profile = foundProfile[0]
            this.setState({ profile: profile });
            })();
      }
      else {
        this.setState({authenticated: false,
          user: null,
          worksRef: null,
          profile: {
            name: "",
            aboutMe: "",
            isAdmin: false,
            userId: 0,
            isProfile: false
          }
        });
      }
    });
    let foundAPOD = await fetchAPOD();
    this.setState({
      apod: foundAPOD
    });
    let foundNEOToday = await fetchNEOToday();
    this.setState({
      neo: foundNEOToday
    });
    // let profile = fetch(`/api/profile/${profileId}`).then(res => res.json());
    // this.setState({
    //    profile 
    // });
  }

  handleChangeWorkForm = (e) => {
    let newWork = { ...this.state.newWork }
    newWork[e.target.name] = e.target.value;
    this.setState({
      newWork
    }) 
  };

  handleChangeUserForm = (e) => {
    let newProfile = { ...this.state.newProfile }
    newProfile[e.target.name] = e.target.value;

    this.setState({
      newProfile
    })
  }

  handlePopulateWorks = () => {
    database.ref(this.state.worksRef)
    .orderByChild('timestamp')
    .on('value', snapshot => {
        const newWorks = [];
        snapshot.forEach(childSnapshot => {
            newWorks.push({
                id: childSnapshot.key,
                ...childSnapshot.val()
            });
        });
        this.setState({ works: newWorks });
    });
};

handleUpdate = worksId => {
  updateWork(this.state.worksRef, worksId);
};

handleRemove = worksId => {
  removeWork(this.state.worksRef, worksId);
};


  handleSubmitWorkForm = (e) => {
    const { worksRef, newWork } = this.state;
    e.preventDefault();
    createWork(worksRef, {
      title: newWork.title,
      body: newWork.body,
      screenshot: newWork.screenshot
    }).then(() => this.setState({ newWork: {
      title: "",
      body: "",
      screenshot: ""
    } }));
  };

  handleSubmitUserForm = (e) => {
    let newProfile = this.state.newProfile;
    newProfile.userId = this.state.user.uid
    e.preventDefault();
    fetch(
      '/api/profile', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newProfile)
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Timothy Floro</h1>
          <h2>Product Manager | Full Stack Developer (React.js, Python) | MBA</h2>
        </header>
        <Router>
        <Nav
            Route exact path="/"
            isAdmin={this.state.profile.isAdmin}    
            authenticated={this.state.authenticated}
            component={Nav} />
        <Switch>
          <Route exact path="/" component={home} />
          <Route path='/apod' render={ props => 
            <APODPage {...props} apod={this.state.apod} /> 
            } 
          />
          <Route path='/neo' render={ props => 
            <NEOPage {...props} neo={this.state.neo} /> 
            } 
          />
          <PrivateRoute 
          authenticated={this.state.authenticated}
          isAdmin={this.state.profile.isAdmin}
          works={this.state.works}
          newWork={this.state.newWork}
          handleChangeUserForm={this.handleChangeUserForm}
          handleSubmitUserForm={this.handleSubmitUserForm}
          handleChangeWorkForm={this.handleChangeWorkForm}
          handleSubmitWorkForm={this.handleSubmitWorkForm}
          handleRemove={this.handleRemove}
          handleUpdate={this.handleUpdate}
          user={this.state.user}
          text={this.state.text}
          path="/admin" 
          component={AdminPage} 
          />
          <Route path="/" render={props => (
              <Login 
              {...props}
              authenticated={this.state.authenticated}
              />
          )} />
          </Switch>
        </Router>

   
        { 
            auth.currentUser && this.state.profile.isProfile === true
              ? 
              <br />
                :
                auth.currentUser ?
                <Fragment>
                <div className="setupStyles">
                  <h2>Setup your profile</h2> 
                    <form onSubmit={this.handleSubmitUserForm}>
                      <div className="field-wrapper">
                        <label>Display Name</label>
                        <input 
                          name="name" 
                          type="text" 
                          onChange={ this.handleChangeUserForm }
                          value={ this.state.newProfile.name } />
                      </div>
                      <div className="field-wrapper">
                        <label>About Me</label>
                        <input 
                          name="aboutMe" 
                          type="paragraph" 
                          onChange={ this.handleChangeUserForm }
                          value={ this.state.newProfile.aboutMe } />
                      </div>
                      <div>
                        <input 
                          name="isAdmin" 
                          type="hidden" 
                          onChange={ this.handleChangeUserForm }
                          value={ this.state.newProfile.isAdmin } />
                      </div>
                      <div>
                        <input 
                          name="userId" 
                          type="hidden" 
                          onChange={ this.handleChangeUserForm }
                          value="lol"/>
                      </div>
                      <div>
                        <input 
                          name="isProfile" 
                          type="hidden" 
                          onChange={ this.handleChangeUserForm }
                          value="true" />
                      </div>
                      
                      <input type="submit" value="Submit" />
                    </form>
                  </div>
                </Fragment>
                  : 
                  <br />
               
        }
        { 
          this.state.works.length
          ? <WorkContainer works={this.state.works} />
          : <h3 style={{ textAlign: 'center' }}>Loading...</h3>
        }
      </div>
    );
    }
  }

export default App;
