import React, { PureComponent } from 'react';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import { debounce } from 'lodash';
import { parse, stringify } from '@utils/queryString';
import { withRouter } from '@ui/NativeWebRouter';
import FlexedView from '@ui/FlexedView';
import PaddedView from '@ui/PaddedView';
import Header from '@ui/Header';
import { H3 } from '@ui/typography';
import styled from '@ui/styled';
import { Text as TextInput } from '@ui/inputs';
import Icon from '@ui/Icon';

import CampusFeed from './CampusFeed';

const Title = styled({ textAlign: 'center' })(H3);

const enhance = compose(
  withRouter,
  withProps(({ location: { search = '' } = {} }) => ({
    term: parse(search).q,
  })),
);

class Locations extends PureComponent {
  static propTypes = {
    term: PropTypes.string,
    history: PropTypes.shape({
      replace: PropTypes.func,
    }),
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }

  state = {
    searchText: this.props.term,
  };

  handleSearch = (searchText) => {
    this.setState({ searchText });
    this.debouncedUpdate(searchText);
  }

  debouncedUpdate = debounce((q) => {
    this.props.history.replace(`${this.props.location.pathname}?${stringify({ q })}`);
  }, 500);

  render() {
    return (
      <FlexedView>
        <Header backButton titleText="Locations" />
        <ScrollView>
          <PaddedView>
            <Title>Find Your Closest Campus</Title>
            <TextInput
              value={this.state.searchText}
              prefix={<Icon name="search" />}
              placeholder="Find a campus by city, state or zip"
              onChangeText={this.handleSearch}
            />
          </PaddedView>
          <PaddedView>
            <Title>Campus Directory</Title>
          </PaddedView>
          <CampusFeed origin={this.props.term} />
        </ScrollView>
      </FlexedView>
    );
  }
};

export default enhance(Locations);
