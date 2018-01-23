import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import { Platform, View } from 'react-native';
import { debounce } from 'lodash';
import { parse, stringify } from '@utils/queryString';
import { withRouter } from '@ui/NativeWebRouter';
import { Text as TextInput } from '@ui/inputs';
import { H7 } from '@ui/typography';
import FlexedView from '@ui/FlexedView';
import Header from '@ui/Header';
import Icon from '@ui/Icon';
import styled from '@ui/styled';

import Feed from './Feed';
import Results from './Results';

const CancelText = styled(({ theme }) => ({ paddingHorizontal: theme.sizing.baseUnit / 2 }))(H7);

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
      <FlexedView>
        {Platform.OS === 'web' ? <View>{this.searchForm}</View> : <Header>{this.searchForm}</Header>}
        {(this.props.term && this.props.term.length) ? (
          <Results term={this.props.term} />
        ) : <Feed />}
      </FlexedView>
    );
  }
}

export default enhance(Discover);
