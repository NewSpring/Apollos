import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { mapProps, compose } from 'recompose';
import ReactList from 'react-list';
import { ScrollView, View } from 'react-native';
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
  length: data.length,
}))(ReactList);


class FeedList extends PureComponent {
  static propTypes = {
    onEndReached: PropTypes.func,
    onRefresh: PropTypes.func,
    data: PropTypes.array, // eslint-disable-line
    renderItem: PropTypes.func,
    onEndReachedThreshold: PropTypes.number,
    refreshing: PropTypes.bool,
  };

  handleLayout = ({ nativeEvent: { layout: { height, width } } }) => {
    this.layoutHeight = height;
    this.layoutWidth = width;
  }

  handleScroll = ({ nativeEvent: { contentOffset, contentSize } }) => {
    if (!this.props.refreshing &&
        this.props.onEndReachedThreshold <
          ((contentOffset.y + this.layoutHeight) / contentSize.height)) {
      this.props.onEndReached();
    }
  }

  render() {
    return (
      <ScrollView
        onLayout={this.handleLayout}
        scrollEventThrottle={250}
        onScroll={this.handleScroll}
      >
        <MappedReactList {...this.props} />
      </ScrollView>
    );
  }
}

export default FeedList;
