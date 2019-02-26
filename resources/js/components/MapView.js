import React, { Component } from 'react';
import { Map, GoogleApiWrapper,Marker,InfoWindow } from 'google-maps-react';

const mapStyles = {
  width: '50%',
  height: '55%'
};

export class MapView extends Component {
  state = { userLocation: { lat: 32, lng: 32 }, loading: true ,
            showingInfoWindow: false,  //Hides or the shows the infoWindow
            activeMarker: {},          //Shows the active marker upon click
            selectedPlace: {} ,
            naming: {} ,
            markers: [
              {
                name: "Current position",
                position: {
                  lat: 37.77,
                  lng: -122.42
                }
              }
            ]
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

  onMouseoverMarker = (props, marker, e) => {
    // console.log(props);
    // console.log(props.mapCenter.lat);
    // console.log('propsssssssss');
    var geocoder = new google.maps.Geocoder();
          var myLatlng = new google.maps.LatLng(this.state.userLocation.lat,this.state.userLocation.lng);
          var dragEndPositions;
          geocoder.geocode({'latLng': myLatlng }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
            if (results[0]) {
              // console.log("iam geocoder: "+results[0].formatted_address);
              dragEndPositions = results[0].formatted_address;
              // this.setState({
              //   selectedPlace: dragEndPositions
              // });
              this.setState({
                naming: dragEndPositions
              });
            }
            }
          }.bind(this));
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

    const lat = props.mapCenter.lat;
    const lng = props.mapCenter.lng;

    this.setState(prevState => {
      markers: { position: { lat, lng } };
      // return { markers };
    });
  }

  onMouseoutMarker = props => {
    // console.log(props);
    // console.log('props');
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

   onMarkerDragEnd = (coord, index) => {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();
    // console.log(this .state.userLocation);
    // console.log('userLocationbegin');
    this.setState({
        userLocation: { lat,lng }
    });
    // console.log(this .state.userLocation);
    // console.log('userLocationend');

    this.setState(prevState => {
      const markers = [...this.state.markers];
      markers[index] = { ...markers[index], position: { lat, lng } };
      return { markers };
    });
    var geocoder = new google.maps.Geocoder();
    var myLatlng = new google.maps.LatLng(lat,lng);
    // console.log(lat,lng);
    // console.log('lat,lng');
    var dragEndPositions;
    geocoder.geocode({'latLng': myLatlng }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
      if (results[0]) {
        // console.log("well iam geocoder: "+results[0].formatted_address);
        dragEndPositions = results[0].formatted_address;
        // this.setState({
        //   selectedPlace: dragEndPositions
        // });
        this.setState({
          naming: dragEndPositions
        });
        // console.log('desi');
        // console.log(this.state);
      }
      }
    }.bind(this));
    // console.log(this.state);
    // console.log('this.statethis.state');
  };

  componentDidMount(props) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        console.log(position);
          var geocoder = new google.maps.Geocoder();
          var myLatlng = new google.maps.LatLng(latitude,longitude);
          var dragEndPositions;
          geocoder.geocode({'latLng': myLatlng }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
            if (results[0]) {
              // console.log("iam geocoder: "+results[0].formatted_address);
              dragEndPositions = results[0].formatted_address;
              // this.setState({
              //   selectedPlace: dragEndPositions
              // });
              this.setState({
                naming: dragEndPositions
              });
            }
            }
          }.bind(this));
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
            {this.state.markers.map((marker, index) => (
            <Marker
                //position={{ lat: marker.postion.lat?marker.postion.lat:-34.397, lng: marker.postion.lng?marker.postion.lng:150.644 }}
                onMouseout={this.onMouseoutMarker}
                lat={marker.position.lat}
                lng={marker.position.lng}
                onMouseover={this.onMouseoverMarker}
                onClick={this.onMarkerClick}
                name={this.state.naming?this.state.naming:'helleo'}
                draggable={true}
                key={index}
                onDragend={(t, map, coord) => this.onMarkerDragEnd(coord, index)}
              />
            ))}
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