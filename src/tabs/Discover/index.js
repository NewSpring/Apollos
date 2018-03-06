import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import { Platform } from 'react-native';
import { debounce } from 'lodash';
import { parse, stringify } from '@utils/queryString';
import { withRouter } from '@ui/NativeWebRouter';
import { withTheme } from '@ui/theme';
import { Text as TextInput } from '@ui/inputs';
import FlexedView from '@ui/FlexedView';
import { H1, H7 } from '@ui/typography';
import Header from '@ui/Header';
import Hero from '@ui/Hero';
import Icon from '@ui/Icon';
import LiveNowButton from '@ui/LiveNowButton';
import styled from '@ui/styled';
import PaddedView from '@ui/PaddedView';
import MediaQuery, { enhancer as mediaQuery } from '@ui/MediaQuery';
import Video from '@ui/VideoPlayer';
import { asModal } from '@ui/ModalView';
import { ResponsiveSideBySideView, Left, Right } from '@ui/SideBySideView';

import Feed from './Feed';
import Results from './Results';

const FixedWidthLeftSide = styled(({ theme }) => ({
  maxWidth: theme.breakpoints.sm,
  flex: 1,
  backgroundColor: theme.colors.background.default,
}));

const Flexed = styled({
  flex: 1,
});

const LeftSide = compose(mediaQuery(({ md }) => ({ minWidth: md }), FixedWidthLeftSide, Flexed))(
  Left,
);

const FlexedRight = Flexed(Right);

const FlexedResponsiveSideBySideView = styled({ flex: 1 })(ResponsiveSideBySideView);

const BackgroundVideo = ({ src }) => (
  <Video
    src={src}
    posterSource="https://dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/newspring/homepage/hero_poster_2x1_1700_850_90_c1.jpg"
    useNativeControls={false}
    shouldPlay
    isLooping
  />
);
BackgroundVideo.propTypes = {
  src: PropTypes.string,
};

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
  mediaQuery(({ md }) => ({ maxWidth: md }), asModal),
  withTheme(({ theme: { web: { backgroundVideo = {} } = {} } = {} }) => ({
    webBackgroundSource: backgroundVideo,
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
    isModal: PropTypes.boolean,
    isModal: PropTypes.bool,
    webBackgroundSource: PropTypes.string,
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

  handleSearch = (searchText) => {
    this.setState({ searchText });
    this.debouncedUpdate(searchText);
  };

  debouncedUpdate = debounce((q) => {
    this.props.history.replace(`${this.props.location.pathname}?${stringify({ q })}`);
  }, 500);

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
              <Hero background={<BackgroundVideo src={this.props.webBackgroundSource} />}>
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
