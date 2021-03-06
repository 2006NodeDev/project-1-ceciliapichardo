import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { NavBarComponent } from './components/NavBarComponent/NavBarComponent';
import { User } from './models/User';
import { TitleComponent } from './components/TitleComponent/TitleComponent';
import { LoginComponent } from './components/LoginComponent/LoginComponent';
import { ProfileComponent } from './components/ProfileComponent/ProfileComponent';
import { AllUsersComponent } from './components/AllUsersComponent/AllUsersComponent';
import { NewUserComponent } from './components/NewUserComponent/NewUserComponent';
import {ToastContainer} from 'react-toastify';
import { makeStyles } from '@material-ui/core';
import { EditProfile } from './components/EditProfileComponent/EditProfile';
//import { LocationComponent } from './components/LocationComponent/LocationComponent';
//import { AllUsersInLocationComponent } from './components/AllUsersInLocationComponent/AllUsersInLocationComponent';

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "column",
    minHeight: '100vh',
    textAlign: 'center',
  }
}))

function App() {
  const [currentUser, changeCurrentUser] = useState<null | User>(null)
  const classes = useStyles()
  return (
    <div className={classes.root} style={ {border: '3px solid #ff5722' } }>
      <Router>
        <header><NavBarComponent user={currentUser}/></header>
        {/* <Route path='title' render={(props) => ( <TitleComponent title={'Welcome!'} size='large'/> )} /> */}
        <Redirect to='/login'/>
        <Route path='/login' render={(props) => ( <LoginComponent changeCurrentUser={changeCurrentUser} {...props} /> )} />
        <Route path='/profile/:userId' component={ProfileComponent} />
        <Route path='/edit/:userId' component={EditProfile} />
        <Route path='/users' component={AllUsersComponent} /> 
        <Route path='/new-user' component={NewUserComponent} />
        {/* <Route path='/location' component={AllUsersInLocationComponent} /> */}
        {/* <Route path='/location' render={(props) => ( <LocationComponent city={city, state} {...props} /> )} /> */}
        <ToastContainer position='bottom-right'/>
      </Router>
    </div>
  );
}

export default App;
