import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LoginForm from './Loginform/Loginform';
import { Route, BrowserRouter as Router ,Switch} from 'react-router-dom'
const routing = (
    <Router>
      <div>
        <Switch>
            <Route exact path="/" component={LoginForm} />
        </Switch>
      </div>
    </Router>
  )
  ReactDOM.render(routing, document.getElementById('root'))

