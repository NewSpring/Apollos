/**
 * this is a temporary polyfill for _some_ selected FlatList
 * functionality. We should port over to react-native-web's FlatList implementation
 * when available. See https://github.com/necolas/react-native-web/pull/659
 */
import React, { PureComponent } from 'react';
import { ScrollView, View } from 'react-native';
import PropTypes from 'prop-types';
import { mapProps, compose } from 'recompose';
import ReactList from 'react-list';
import get from 'lodash/get';
import styled from '@ui/styled';

const Item = compose(
  styled(({ numColumns }) => ({ flex: 1, display: 'inline-block', width: `${(1 / numColumns) * 100}%` })),
)(View);

const itemRenderer = ({ data, renderItem, numColumns }) => (index, key) => (
  <Item key={key} numColumns={numColumns}>
    {renderItem({ index, item: data[index] })}
  </Item>
);

const MappedReactList = mapProps(({
  data,
  renderItem,
  numColumns,
}) => ({
  itemRenderer: itemRenderer({ data, renderItem, numColumns }),
  length: (data && data.length) || 0,
}))(ReactList);

class FlatList extends PureComponent {
  static propTypes = {
    onEndReached: PropTypes.func,
    onRefresh: PropTypes.func,
    data: PropTypes.array, // eslint-disable-line
    renderItem: PropTypes.func,
    onEndReachedThreshold: PropTypes.number,
    refreshing: PropTypes.bool,
    ListHeaderComponent: PropTypes.any, // eslint-disable-line
    ListFooterComponent: PropTypes.any, // eslint-disable-line
    ListEmptyComponent: PropTypes.any, // eslint-disable-line
  };

  get listHeader() {
    if (!this.props.ListHeaderComponent) return null;
    return React.isValidElement(this.props.ListHeaderComponent) ? (
      this.props.ListHeaderComponent
    ) : (
      <this.props.ListHeaderComponent />
    );
  }

  get listFooter() {
    if (!this.props.ListFooterComponent) return null;
    return React.isValidElement(this.props.ListFooterComponent) ? (
      this.props.ListFooterComponent
    ) : (
      <this.props.ListFooterComponent />
    );
  }

  get listEmpty() {
    if (!this.props.ListEmptyComponent) return null;
    return React.isValidElement(this.props.ListEmptyComponent) ? (
      this.props.ListEmptyComponent
    ) : (
      <this.props.ListEmptyComponent />
    );
  }

  handleLayout = ({ nativeEvent: { layout: { height, width } } }) => {
    this.layoutHeight = height;
    this.layoutWidth = width;
  }

  handleScroll = ({ nativeEvent: { contentOffset, contentSize } }) => {
    if (!this.props.refreshing &&
        this.props.onEndReachedThreshold <
          ((contentOffset.y + this.layoutHeight) / contentSize.height)) {
      if (this.props.onEndReached) this.props.onEndReached();
    }
  }
  render() {
    return (
      <ScrollView
        onLayout={this.handleLayout}
        scrollEventThrottle={250}
        onScroll={this.handleScroll}
      >
        {this.listHeader}
        {!(get(this.props, 'data.length')) ? this.listEmpty : null}
        <MappedReactList {...this.props} />
        {this.listFooter}
      </ScrollView>
    );
  }
}

export default FlatList;
