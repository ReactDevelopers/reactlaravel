import React, { Component } from 'react';
import PanelA from './MapView.js';
import PanelB from './Weather.js';
import './forecast.css';

const h200 = {
  height: '200%'
};

class Forecast extends Component {
  render() {

    return (
        <div>
          <div className="row">
            <div className="leftcolumn">
              <div className="card">
                <h2>TITLE HEADING</h2>
                <h5>Title description, Dec 7, 2017</h5>
                <div className="fakeimg" style={h200}>Image</div>
                <p>Some text..</p>
                <p>Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
              </div>
            </div>
            <div className="rightcolumn">
              <div className="card">
                <h3>Weather</h3>
                <PanelB />
              </div>
              <div className="card">
                <h3>Map</h3>
              </div>
              <div className="map">
                  <PanelA />
              </div>
            </div>
          </div>
        </div>
      )
  }
}

export default Forecast
