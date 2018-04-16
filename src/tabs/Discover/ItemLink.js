import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { withRouter } from '@ui/NativeWebRouter';
import ActivityIndicator from '@ui/ActivityIndicator';
import Touchable from '@ui/Touchable';
import getAppPathForUrl from '@utils/getAppPathForUrl';
import WebBrowser from '@ui/WebBrowser';
import styled from '@ui/styled';

const Overlay = styled(({ theme }) => ({
  ...StyleSheet.absoluteFillObject,
  backgroundColor: theme.colors.background.overlay,
}))(View);

class ItemLink extends Component {
  static propTypes = {
    to: PropTypes.string,
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
    const inAppPath = await getAppPathForUrl(this.props.to);
    this.setState({ isLoading: false });
    if (inAppPath) {
      this.props.history.push(inAppPath);
    } else {
      WebBrowser.openBrowserAsync(this.props.to);
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
export default ItemLinkWithRouter;
