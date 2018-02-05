import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { pure, branch, withProps, compose } from 'recompose';
import { times } from 'lodash';
import FlatList from '@ui/WebCompatibleFlatList';
import PaddedView from '@ui/PaddedView';
import Touchable from '@ui/Touchable';
import { H5, BodyText } from '@ui/typography';
import { Link } from '@ui/NativeWebRouter';
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
}))(props => <H5 {...props}>•••</H5>);

const enhance = compose(
  pure,
  withProps({ isLoading: true }),
  branch(({ isLoading, tracks = [] }) => isLoading && !tracks.length, withProps({
    tracks: times(10, i => ({ id: i, file: i })),
  })),
);

class TracksList extends PureComponent {
  static defaultProps = {
    isLoading: false,
    onEndReachedThreshold: 0.7,
    keyExtractor: item => item.file,
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
    onTrackPress: PropTypes.func,
    trackEllipsisLink: PropTypes.func,
  };

  handleTrackPress = (item) => {
    if (this.props.onTrackPress) this.props.onTrackPress(item);
  }

  renderTrack = ({ item }) => (
    <Touchable onPress={() => this.handleTrackPress(item)}>
      <TrackView>
        <BodyText isLoading={!item.title && this.props.isLoading}>{item.title}</BodyText>
        {(this.props.trackEllipsisLink) ? (
          <Link to={this.props.trackEllipsisLink(item)}>
            <Ellipsis />
          </Link>
        ) : null}
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
