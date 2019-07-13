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
  database
} from './utils/FirebaseService';

import './App.css';
import PostContainer from './components/PostContainer';

const linkStyle = {
  textDecoration: "underline",
  color: "rebeccapurple",
  cursor: "pointer"
}

// const workPreload = {
//   "row" : [
//     {
//       "name": this.state.User.name,
//       "displayName": "https://reactjs.org",
//       "description": "A JavaScript library for building user interfaces",
//     },
//     {
//       "name": "Vuejs",
//       "url": "https://vuejs.org",
//       "description": "The Progressive JavaScript Framework",
//     },
//     {
//       "name": "Emberjs",
//       "url": "https://www.emberjs.com",
//       "description": "Ember.js is an open-source JavaScript web framework, based on the Model–view–viewmodel pattern"
//     }
//   ]
// }
// const workList = (props) => {
//   return (
//     <React.Fragment>
//       {props.items.data.map(item => (
//         // , idx
//         <React.Fragment key={item.id}>
//           <h2>{item.name}</h2>
//           <p>{item.url}</p>
//           <p>{item.description}</p>
//         </React.Fragment>
//       ))}
//     </React.Fragment>
//   )
// }

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

function Login({authenticated}) {
  if(authenticated) return <Redirect to="/dashboard"/>
  return (
    <div>
      <h2>You need to login to see this</h2> 
      <button onClick={login}>Login With Google</button>
    </div>
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
      profile: null,
      works: [],
      newWork: {
        title: "",
        body: "",
        screenshoot: ""
      },
      newProfile: {
        name: "",
        aboutMe: "",
        isAdmin: false,
        userId: null
      }
    }
  }

async componentDidMount() {
    await auth.onAuthStateChanged(user => {
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
                <Router>
      <ul>
          <li>
              <Link to="/">Home</Link>
          </li>
          <li>
              <Link to="/dashboard">Admin</Link>
          </li>
          {
              this.state.authenticated
              &&
              <li style={linkStyle}>
                  <span onClick={logout}>Logout</span>
              </li>
          }
      </ul>
      <Switch>
          <Route exact path="/" component={home} />
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
          <Route path="/login" render={props => (
              <Login 
              {...props}
              authenticated={this.state.authenticated}
              />
          )} />
      </Switch>
    </Router>
    <header className="App-header">
      <h1>Timothy Floro</h1>
      <h2>Product Manager | Full Stack Developer (React.js, Python) | MBA</h2>
      <h1>Portfolio</h1>
    </header>
   
      {
       this.state.profile 
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
                  
                  <input type="submit" value="Submit" />
                </form>
              </div>
            </Fragment>
      }
        { 
          this.state.works.length
          ? <PostContainer posts={this.state.works} />
          : <h3 style={{ textAlign: 'center' }}>Loading...</h3>
        }
      </div>
    );
    }
  }

export default App;
