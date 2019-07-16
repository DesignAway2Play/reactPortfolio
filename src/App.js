import React, { Component, Fragment } from 'react';
import {
  Route,
  Link,
  Switch,
  Redirect,
  BrowserRouter as Router
} from 'react-router-dom';

import {
  auth,
  database
} from './utils/FirebaseService';
import Nav from './components/Nav/Nav';
import Login from './components/Login/Login';

import './App.css';
import { fetchAPOD } from './services/nasa-api';
import { fetchNEOToday } from './services/nasa-api';
import APODPage from './pages/APOD/APOD';
import NEOPage from './pages/NEO/NEO';
import PostContainer from './components/PostContainer';

const linkStyle = {
  textDecoration: "underline",
  color: "rebeccapurple",
  cursor: "pointer"
}


function PrivateRoute({ authenticated, component: Component, ...rest }) {
  return (
      <Route render={props => (
          authenticated
          ? <Component {...rest} {...props} />
          : <Redirect to={{
              pathname: "/login",
              state: { from: props.location }
          }} />
      )}/>
  )
}

function home() {
  return (
    <div>
      <h1>Timothy's Portfolio</h1> 
    </div>
  )
}

function Dashboard(
  user, test, handleChangeWorkForm, handleChangeUserForm, handleSubmitUserForm, handleSubmitWorkForm, handleRemove, handleComplete
  ) {
  return (
    <div>
      <h2>How goes it, if ({user.displayName}) {user.displayName}</h2> 
      <img
            style={{
                height: 100,
                borderRadius: '50%',
                border: '2px solid black'
            }} 
            src={user.photoURL} 
            alt={user.displayName}
            />
            <hr />
    </div>
  )
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
      user: null,
      profile: {
        name: "",
        aboutMe: "",
        isAdmin: false,
        userId: 0,
        isProfile: false
      },
      apod: null,
      neo: null,
      newWork: {
        title: "",
        body: "",
        screenshoot: ""
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
  
    auth.onAuthStateChanged(user => {
      if(user) {
        this.setState({ authenticated: true,
          user });
      }
      else {
        this.setState({authenticated: false,
          user: null
        });
      }
    });
    let foundAPOD = await fetchAPOD();
    console.log(foundAPOD)
    this.setState({
      apod: foundAPOD
    });
    let foundNEOToday = await fetchNEOToday();
    console.log(foundNEOToday)
    this.setState({
      neo: foundNEOToday
    });
    console.log(this.state.neo.near_earth_objects)
    let works = fetch('/api/works').then(res => res.json());
    let profile = fetch('/api/profile').then(res => res.json());
  }

  handleChangeWorkForm = (e) => {
    let newWork = { ...this.state.newWork }
    newWork[e.target.name] = e.target.value;

    this.setState({
      newWork
    })
  }

  handleChangeUserForm = (e) => {
    let newProfile = { ...this.state.newProfile }
    newProfile[e.target.name] = e.target.value;

    this.setState({
      newProfile
    })
  }

  handlePopulateWorks = () => {
    database.ref(this.state.worksRef)
    .orderByChild('completed')
    .on('value', snapshot => {
        const newStateArray = [];
        snapshot.forEach(childSnapshot => {
            newStateArray.push({
                id: childSnapshot.key,
                ...childSnapshot.val()
            });
        });
        this.setState({ todos: newStateArray });
    });
};



  handleSubmitWorkForm = (e) => {
    e.preventDefault();
    fetch(
      '/api/works', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.newWork)
    })
  };

  handleSubmitUserForm = (e) => {
    e.preventDefault();
    fetch(
      '/api/profile', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.newProfile)
    })
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
          handleChangeUserForm={this.handleChangeUserForm}
          handleSubmitUserForm={this.handleSubmitUserForm}
          handleChangeWorkForm={this.handleChangeWorkForm}
          handleSubmitWorkForm={this.handleSubmitWorkForm}
          handleComplete={this.handleComplete}
          hanldeRemove={this.handleRemove}
          user={this.state.user}
          text={this.state.text}
          path="/dashboard" 
          component={Dashboard} 
          />
          <Route path="/" render={props => (
              <Login 
              {...props}
              authenticated={this.state.authenticated}
              />
          )} />
      </Switch>
    </Router>

   
     { this.state.authenticated ?
       this.state.profile.isProfile 
        ? 
        <h2>You have a profile!</h2>
          : 
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
                      value="lol" />
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
            : <h2>Not logged in</h2>
    }
        {/* { 
          this.state.works.length
          ? <PostContainer posts={this.state.works} />
          : <h3 style={{ textAlign: 'center' }}>Loading...</h3>
        } */}
      </div>
    );
    }
  }

export default App;
