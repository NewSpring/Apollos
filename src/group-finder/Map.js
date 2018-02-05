import React, { PureComponent } from 'react';
import { Platform } from 'react-native';
import PropTypes from 'prop-types';
import { uniq, max, min } from 'lodash';
import FlexedView from '@ui/FlexedView';
import MapView from '@ui/MapView';
import { withRouter } from '@ui/NativeWebRouter';

const getMarkers = (groups = []) => {
  const markers = [];
  return uniq(
    markers.concat(
      groups
        .filter(x => x.locations && x.locations.length && x.locations[0].location)
        .map(x => ({
          latitude: x.locations[0].location.latitude,
          longitude: x.locations[0].location.longitude,
          id: x.id,
        }))
        .filter(x => x.latitude && x.longitude),
    ),
    x => x.id,
  );
};

const getRegion = (markers = []) => {
  if (!markers || !markers.length) return null;

  const latitude = markers.map(m => m.latitude).reduce((a, b) => a + b) / markers.length;
  const longitude = markers.map(m => m.longitude).reduce((a, b) => a + b) / markers.length;

  return {
    latitude,
    longitude,
  };
};

class Map extends PureComponent {
  static propTypes = {
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    groups: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      locations: PropTypes.arrayOf(PropTypes.shape({
        location: PropTypes.shape({
          latitude: PropTypes.number,
          longitude: PropTypes.number,
        }),
      })),
    })),
    history: PropTypes.shape({
      push: PropTypes.func,
    }),
    linkToGroup: PropTypes.bool,
  };

  static defaultProps = {
    linkToGroup: true,
    latitude: 34.595413,
    longitude: -82.6241234,
  };

  componentDidUpdate(lastProps) {
    // currently MapView doesn't support an updating region,
    // so we do it manually by calling g-api's fitBounds directly
    if (Platform.OS === 'web') {
      if (lastProps.groups !== this.props.groups) {
        const { map } = this.mapView;
        if (map && map.panTo && this.bounds) {
          map.fitBounds(this.bounds);
        }
      }
    }
  }

  get bounds() {
    const { markers } = this;
    if (!markers.length) return null;
    const ew = markers.map(m => m.longitude);
    const ns = markers.map(m => m.latitude);
    const north = max(ns);
    const south = min(ns);
    const east = max(ew);
    const west = min(ew);
    return {
      north, south, east, west,
    };
  }

  get markers() {
    return getMarkers(this.props.groups);
  }

  get region() {
    return getRegion(this.markers) || {
      latitude: this.props.latitude, longitude: this.props.longitude,
    };
  }

  render() {
    return (
      <FlexedView>
        <MapView
          ref={(r) => { this.mapView = r; }}
          region={this.region}
        >
          {this.markers.map(({ id, latitude, longitude }) => (
            <MapView.Marker
              key={id}
              coordinate={{ latitude, longitude }}
              onPress={() => {
                if (this.props.linkToGroup) this.props.history.push(`/groups/${id}`);
              }}
            />
          ))}
        </MapView>
      </FlexedView>
    );
  }
}

export default withRouter(Map);
