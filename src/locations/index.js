import React, { PureComponent } from 'react';
import KeyboardAwareScrollView from '@ui/KeyboardAwareScrollView';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import { debounce } from 'lodash';
import { parse, stringify } from '@utils/queryString';
import { withRouter } from '@ui/NativeWebRouter';
import BackgroundView from '@ui/BackgroundView';
import PaddedView from '@ui/PaddedView';
import Header from '@ui/Header';
import { H3 } from '@ui/typography';
import { Text as TextInput } from '@ui/inputs';
import Icon from '@ui/Icon';
import styled from '@ui/styled';
import withCampuses from '@data/withCampuses';
import withGeoLocation from '@data/withGeoLocation';
import ActivityIndicator from '@ui/ActivityIndicator';

import CampusFeed from './CampusFeed';

const Title = styled({ textAlign: 'center' })(H3);

const enhance = compose(
  withRouter,
  withProps(({ location: { search = '' } = {} }) => ({
    origin: parse(search).q,
  })),
  withCampuses,
  withProps(({ campuses = [] } = {}) => ({
    destinations: campuses.map(campus => (
      `${campus.location.street1} ${campus.location.zip}`
    )),
  })),
  withGeoLocation,
);

const Form = styled(({ theme }) => ({
  backgroundColor: theme.colors.background.paper,
  paddingVertical: theme.sizing.baseUnit * 2,
}))(PaddedView);

class Locations extends PureComponent {
  static propTypes = {
    origin: PropTypes.string,
    history: PropTypes.shape({
      replace: PropTypes.func,
    }),
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    isLoading: PropTypes.bool,

    // These come in from withCampuses and withGeoLocation, and get passed
    // blindly to CampusFeed
    campuses: PropTypes.array, // eslint-disable-line
    geoElements: PropTypes.array, // eslint-disable-line
  }

  state = {
    searchText: this.props.origin,
  };

  handleSearch = (searchText) => {
    if (searchText !== this.state.searchText) this.setState({ searchText });
  }

  update = () => {
    this.props.history.replace(`${this.props.location.pathname}?${stringify({ q: this.state.searchText })}`);
  }

  debouncedUpdate = debounce(this.update, 500);

  render() {
    return (
      <BackgroundView>
        <Header backButton titleText="Locations" />
        <KeyboardAwareScrollView>
          <Form>
            <Title>Find Your Closest Campus</Title>
            <TextInput
              value={this.state.searchText}
              prefix={<Icon name="search" />}
              suffix={
                (this.props.isLoading) ? <ActivityIndicator /> : null
              }
              placeholder="Find a campus by city, state or zip"
              onChangeText={this.handleSearch}
              onBlur={this.update}
              returnKeyType="go"
            />
          </Form>
          <PaddedView>
            <Title>Campus Directory</Title>
          </PaddedView>
          <CampusFeed
            campuses={this.props.campuses}
            geoElements={this.props.geoElements}
          />
        </KeyboardAwareScrollView>
      </BackgroundView>
    );
  }
}

export default enhance(Locations);
