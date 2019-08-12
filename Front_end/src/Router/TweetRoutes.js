import React, { Component } from 'react';
import { Route, BrowserRouter as Router ,Switch} from 'react-router-dom'
import LoginForm from '../Loginform/Loginform';
export class TweetRoutes extends Component {
    render() {        
      return (
        <Router >
            <Switch>
                <Route exact path='/' render={<LoginForm/>} />
            </Switch>
        </Router>
      )
    }
}

export default TweetRoutes;