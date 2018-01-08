import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { pure, branch, withProps, compose } from 'recompose';
import { times } from 'lodash';
import FlatList from '@ui/FlatList';
import PaddedView from '@ui/PaddedView';
import Touchable from '@ui/Touchable';
import { BodyCopy } from '@ui/typography';
import styled from '@ui/styled';

const TrackView = styled(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingVertical: theme.sizing.baseUnit / 2,
}))(PaddedView);

const Ellipsis = styled(({ theme }) => ({
  paddingVertical: theme.sizing.baseUnit / 4,
  opacity: theme.alpha.medium,
}))(props => <BodyCopy {...props}>•••</BodyCopy>);

const enhance = compose(
  pure,
  withProps({ isLoading: true }),
  branch(({ isLoading, tracks = [] }) => isLoading && !tracks.length, withProps({
    tracks: times(10, i => ({ id: i })),
  })),
);

class TracksList extends PureComponent {
  static defaultProps = {
    isLoading: false,
    onEndReachedThreshold: 0.7,
    keyExtractor: item => item.id,
    tracks: [],
    refetch: undefined,
    fetchMore: undefined,
  };

  static propTypes = {
    isLoading: PropTypes.bool,
    tracks: PropTypes.array, // eslint-disable-line
    onEndReachedThreshold: PropTypes.number,
    keyExtractor: PropTypes.func,
    refetch: PropTypes.func,
    fetchMore: PropTypes.func,
  };

  renderTrack = ({ item }) => (
    <Touchable>
      <TrackView>
        <BodyCopy isLoading={this.props.isLoading}>{item.title}</BodyCopy>
        <Touchable>
          <Ellipsis />
        </Touchable>
      </TrackView>
    </Touchable>
  );

  render() {
    const {
      fetchMore, isLoading, refetch, tracks, ...flatListProps
    } = this.props;
    return (
      <FlatList
        {...flatListProps}
        onEndReached={fetchMore}
        refreshing={isLoading}
        onRefresh={refetch}
        data={tracks}
        renderItem={this.renderTrack}
      />
    );
  }
}

export default enhance(TracksList);
