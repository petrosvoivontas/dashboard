import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import * as routes from '../constants/routes';

import {Home} from './Home';
import {Signup} from './Signup';
import {Login} from './Login';
import {Verification} from './Verification';
import {CompleteProfile} from './CompleteProfile';
import {Profile} from './Profile';

export class App extends Component {
   render () {
     return (
       <div>
         <Router>
           <div>
             <Route exact path={routes.HOME} component={Home}/>
             <Route exact path={routes.SIGNUP} component={Signup}/>
             <Route exact path={routes.LOGIN} component={Login}/>
             <Route exact path={routes.VERIFY} component={Verification}/>
             <Route exact path={routes.COMPLETE_PROFILE} component={CompleteProfile}/>
             <Route exact path={routes.PROFILE} component={Profile}/>
           </div>
         </Router>
       </div>
     )
   }
}