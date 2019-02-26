import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './layouts/Header'
import Home from './Home'
import NewProject from './NewProject'
import Register from './Register'
import Weather from './Weather'
import MapView from './MapView'
import Forecast from './Forecast'
import './layouts/header.css';


class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/create' component={NewProject} />
            <Route path='/register' component={Register} />
            <Route path='/weather' component={Weather} />
            <Route path='/MapView' component={MapView} />
            <Route path='/Forecast' component={Forecast} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))