import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { uniqBy } from 'lodash';
import { compose, withProps } from 'recompose';
import { View, StyleSheet } from 'react-native';
import { withRouter } from '@ui/NativeWebRouter';
import withSearch from '@data/withSearch';
import FeedView from '@ui/FeedView';
import ThumbnailCard from '@ui/ThumbnailCard';
import ActivityIndicator from '@ui/ActivityIndicator';
import Touchable from '@ui/Touchable';
import styled from '@ui/styled';
import getAppPathForUrl from '@utils/getAppPathForUrl';
import WebBrowser from '@ui/WebBrowser';

const Overlay = styled(({ theme }) => ({
  ...StyleSheet.absoluteFillObject,
  backgroundColor: theme.colors.background.overlay,
}))(View);

class ItemLink extends Component {
  static propTypes = {
    link: PropTypes.string,
    children: PropTypes.node,
    history: PropTypes.shape({
      push: PropTypes.func,
    }),
  }

  state = {
    isLoading: false,
  };

  handlePress = async () => {
    this.setState({ isLoading: true });
    const inAppPath = await getAppPathForUrl(this.props.link);
    this.setState({ isLoading: false });
    if (inAppPath) {
      this.props.history.push(inAppPath);
    } else {
      WebBrowser.openBrowserAsync(this.props.link);
    }
  }

  render() {
    return (
      <Touchable onPress={this.handlePress}>
        <View>
          {this.props.children}
          {(this.state.isLoading) ? (
            <Overlay><ActivityIndicator /></Overlay>
          ) : null}
        </View>
      </Touchable>
    );
  }
}

const ItemLinkWithRouter = withRouter(ItemLink);

const ResultItem = ({ item }) => (
  <ItemLinkWithRouter link={item.link}>
    <ThumbnailCard
      title={item.title || ' '}
      images={item.image || []}
      isLoading={item.isLoading}
    />
  </ItemLinkWithRouter>
);

ResultItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    images: PropTypes.any, // eslint-disable-line
  }),
};

const Results = compose(
  withSearch,
  withProps(({ content = [] } = {}) => ({
    numColumns: 1,
    renderItem: ResultItem,
    content: uniqBy(content, ({ link }) => link),
    keyExtractor: item => item.link || item.id,
  })),
)(FeedView);

export default Results;
