import React, { PureComponent } from 'react';
import { compose, withProps } from 'recompose';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import { Platform } from 'react-native';

import { withRouter } from '@ui/NativeWebRouter';
import { parse, stringify } from '@utils/queryString';
import MediaQuery, { enhancer as mediaQuery } from '@ui/MediaQuery';
import { withTheme } from '@ui/theme';
import styled from '@ui/styled';
import { ResponsiveSideBySideView, Left, Right } from '@ui/SideBySideView';
import { H1, H7 } from '@ui/typography';
import PaddedView from '@ui/PaddedView';
import FlexedView from '@ui/FlexedView';
import { Text as TextInput } from '@ui/inputs';
import Icon from '@ui/Icon';
import Header from '@ui/Header';
import LiveNowButton from '@ui/LiveNowButton';
import Hero from '@ui/Hero';
import Video from '@ui/VideoPlayer';

import Results from './Results';
import Feed from './Feed';

const enhance = compose(
  withRouter,
  withProps(({ location: { search = '' } = {} }) => ({
    term: parse(search).q,
  })),
  withTheme(({ theme: { web: { backgroundVideo, backgroundVideoThumbnail = {} } = {} } = {} }) => ({
    webBackgroundSource: backgroundVideo,
    webBackgroundThumbnail: backgroundVideoThumbnail,
  })),
);

const flexed = styled({
  flex: 1,
});
const FlexedRight = flexed(Right);
const FlexedResponsiveSideBySideView = flexed(ResponsiveSideBySideView);

const fixedWidthLeftSide = styled(({ theme }) => ({
  maxWidth: theme.breakpoints.sm,
  flex: 1,
  backgroundColor: theme.colors.background.default,
}));
const LeftSide = compose(mediaQuery(({ md }) => ({ minWidth: md }), fixedWidthLeftSide, flexed))(
  Left,
);

const CancelText = styled(({ theme }) => ({ paddingHorizontal: theme.sizing.baseUnit / 2 }))(H7);

const WebHeader = styled(({ theme }) => ({
  backgroundColor: theme.colors.background.paper,
  borderBottomColor: theme.colors.background.overlay,
  borderBottomWidth: 1,
}))(PaddedView);

class Discover extends PureComponent {
  static propTypes = {
    term: PropTypes.string,
    history: PropTypes.shape({
      replace: PropTypes.func,
    }),
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    isModal: PropTypes.bool,
    webBackgroundSource: PropTypes.string,
    webBackgroundThumbnail: PropTypes.string,
  };

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
          suffix={
            this.state.searchText && this.state.searchText.length ? (
              <CancelText onPress={() => this.handleSearch('')}>Cancel</CancelText>
            ) : null
          }
          placeholder="Type your search here"
        />
      </FlexedView>
    );
  }

  debouncedUpdate = debounce((q) => {
    this.props.history.replace(`${this.props.location.pathname}?${stringify({ q })}`);
  }, 500);

  handleSearch = (searchText) => {
    this.setState({ searchText });
    this.debouncedUpdate(searchText);
  };

  render() {
    return (
      <FlexedResponsiveSideBySideView>
        <LeftSide>
          {Platform.OS === 'web' ? (
            <WebHeader>{this.searchForm}</WebHeader>
          ) : (
            <Header>{this.searchForm}</Header>
          )}
          <LiveNowButton />
          {this.props.term && this.props.term.length ? (
            <Results term={this.props.term} />
          ) : (
            <Feed />
          )}
        </LeftSide>
        {this.props.isModal ? null : (
          <MediaQuery minWidth={'md'}>
            <FlexedRight>
              <Hero
                background={
                  <Video
                    src={this.props.webBackgroundSource}
                    posterSrc={this.props.webBackgroundThumbnail}
                    useNativeControls={false}
                    shouldPlay
                    isLooping
                  />
                }
              >
                <H1>Welcome to NewSpring</H1>
              </Hero>
            </FlexedRight>
          </MediaQuery>
        )}
      </FlexedResponsiveSideBySideView>
    );
  }
}

export default enhance(Discover);
