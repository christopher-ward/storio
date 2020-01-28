import React from 'react';
import { withRouter } from 'react-router-dom';

class ExploreMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      infoWindows: [],
      searchedResult: []
    };
    this.startGoogleMap = this.startGoogleMap.bind(this);
    this.getSearchResult = this.getSearchResult.bind(this);
  }

  componentDidMount() {
    this.startGoogleMap();
    this.getSearchResult();
  }

  startGoogleMap() {
    this.setState(() => {
      // eslint-disable-next-line no-undef
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: {
          lat: 40.015501,
          lng: -105.257719
        }
      });
      return { map: map };
    });
  }

  getSearchResult() {
    const searchParams = {
      city: 'Boulder',
      state: 'CO'
    };
    fetch(`/api/storages-map/city/${searchParams.city}/state/${searchParams.state}`)
      .then(response => response.json())
      .then(jsonData => {
        var map = this.state.map;
        var markers = jsonData.map(storage => {
          // eslint-disable-next-line no-undef
          var marker = new google.maps.Marker({
            position: {
              lat: storage.latitude,
              lng: storage.longitude
            },
            map: map
          });
          // eslint-disable-next-line no-undef
          var infowindow = new google.maps.InfoWindow({
            content: `$${storage.pricePerDay / 100}`
          });
          // map.event.addListener(marker, 'click', function () {
          //   infowindow.open(map, marker);
          // });
          marker.addListener('mouseover', function () {
            infowindow.open(map, marker);
          });
          marker.addListener('mouseout', function () {
            infowindow.close(map, marker);
            marker.setMap(map);
          });
          // marker.addListener('click', function () {
          //   infowindow.setContent('Hello');
          // });
          marker.setMap(map);
          return marker;
        });
        this.setState({
          searchedResult: jsonData,
          infoWindows: markers
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div id="map" className='google-map-container col-12'></div>
    );
  }
}

export default withRouter(ExploreMap);
