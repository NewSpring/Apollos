import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import { Platform } from 'react-native';
import { debounce } from 'lodash';
import { parse, stringify } from '@utils/queryString';
import { withRouter } from '@ui/NativeWebRouter';
import { Text as TextInput } from '@ui/inputs';
import FlexedView from '@ui/FlexedView';
import { H7 } from '@ui/typography';
import BackgroundView from '@ui/BackgroundView';
import Header from '@ui/Header';
import Icon from '@ui/Icon';
import LiveNowButton from '@ui/LiveNowButton';
import styled from '@ui/styled';
import PaddedView from '@ui/PaddedView';

import Feed from './Feed';
import Results from './Results';

const CancelText = styled(({ theme }) => ({ paddingHorizontal: theme.sizing.baseUnit / 2 }))(H7);

const WebHeader = styled(({ theme }) => ({
  backgroundColor: theme.colors.background.paper,
  borderBottomColor: theme.colors.background.overlay,
  borderBottomWidth: 1,
}))(PaddedView);

const enhance = compose(
  withRouter,
  withProps(({ location: { search = '' } = {} }) => ({
    term: parse(search).q,
  })),
);

class Discover extends PureComponent {
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

  get searchForm() {
    return (
      <FlexedView>
        <TextInput
          value={this.state.searchText}
          onChangeText={this.handleSearch}
          wrapperStyle={{ marginVertical: 0 }}
          prefix={<Icon name="search" size={24} />}
          suffix={(this.state.searchText && this.state.searchText.length) ? (
            <CancelText onPress={() => this.handleSearch('')}>Cancel</CancelText>
          ) : null}
          placeholder="Type your search here"
        />
      </FlexedView>
    );
  }

  handleSearch = (searchText) => {
    this.setState({ searchText });
    this.debouncedUpdate(searchText);
  }

  debouncedUpdate = debounce((q) => {
    this.props.history.replace(`${this.props.location.pathname}?${stringify({ q })}`);
  }, 500);

  render() {
    return (
      <BackgroundView>
        {Platform.OS === 'web' ? <WebHeader>{this.searchForm}</WebHeader> : <Header>{this.searchForm}</Header>}
        <LiveNowButton />
        {(this.props.term && this.props.term.length) ? (
          <Results term={this.props.term} />
        ) : <Feed />}
      </BackgroundView>
    );
  }
}

export default enhance(Discover);
