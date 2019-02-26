import React, { Component } from 'react';
import { Map, GoogleApiWrapper,Marker,InfoWindow } from 'google-maps-react';

const mapStyles = {
  width: '50%',
  height: '50%'
};

export class MapView extends Component {
  state = { userLocation: { lat: 32, lng: 32 }, loading: true ,
            showingInfoWindow: false,  //Hides or the shows the infoWindow
            activeMarker: {},          //Shows the active marker upon click
            selectedPlace: {} 
          };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  onMouseoverMarker = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMouseoutMarker = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  componentDidMount(props) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        console.log(position);
        this.setState({
          userLocation: { lat: latitude, lng: longitude },
          loading: false
        });
      },
      () => {
        this.setState({ loading: false });
      }
    );
    // console.log('sxcdvf');
    // console.log(userLocation);
  }
  render() {
    const { loading, userLocation } = this.state;
    const { google } = this.props;

    if (loading) {
      return null;
    }

    return <Map style={mapStyles} google={google} initialCenter={userLocation} zoom={10} >
            <Marker
                onMouseout={this.onMouseoutMarker}
                onMouseover={this.onMouseoverMarker}
                onClick={this.onMarkerClick}
                name={'Current Location'}
              />
              <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}
                onClose={this.onClose}
              >
                <div>
                  <h4>{this.state.selectedPlace.name}</h4>
                </div>
              </InfoWindow>
          </Map>;
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAgwjkXJVe2r-XejERu9qW9dqd-U6YQnkg'
})(MapView);