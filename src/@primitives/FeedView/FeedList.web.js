import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { mapProps } from 'recompose';
import ReactList from 'react-list';
import { ScrollView, View } from 'react-native';

const itemRenderer = ({ data, renderItem }) => (index, key) => (
  <View key={key}>
    {renderItem({ index, item: data[index] })}
  </View>
);

const MappedReactList = mapProps(({
  data,
  renderItem,
}) => ({
  itemRenderer: itemRenderer({ data, renderItem }),
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

  handleLayout = ({ nativeEvent: { layout: { height } } }) => {
    this.layoutHeight = height;
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
