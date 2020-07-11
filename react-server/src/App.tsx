import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { NavBarComponent } from './components/NavBarComponent/NavBarComponent';
import { User } from './models/User';
import { TitleComponent } from './components/TitleComponent/TitleComponent';
import { LoginComponent } from './components/LoginComponent/LoginComponent';
import { ProfileComponent } from './components/ProfileComponent/ProfileComponent';
import { AllUsersComponent } from './components/AllUsersComponent/AllUsersComponent';

function App() {
  const [currentUser, changeCurrentUser] = useState<null | User>(null)
  return (
    <div className="App">
      <Router>
        <NavBarComponent user={currentUser}/>
        <Route path='title' render={(props) => (
          <TitleComponent title={'First Title'} size='large'/>
        )} />
        <Route path='/login' render={(props) => (<LoginComponent changeCurrentUser={changeCurrentUser} {...props} />)} />
        <Route path='/profile/:userId' component={ProfileComponent} />
        <Route path='/users' component={AllUsersComponent} /> 
      </Router>
    </div>
  );
}

export default App;
