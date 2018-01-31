import React, { PureComponent } from 'react';
import {
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { UIText } from '@ui/typography';
import withTaggedContent from '@data/withTaggedContent';

// TODO: Make this pretty
class RecentArticles extends PureComponent {
  static propTypes = {
    entries: PropTypes.arrayOf(PropTypes.shape({})),
    isLoading: PropTypes.bool,
  };

  static defaultProps = {
    entries: [],
    isLoading: false,
  };

  render() {
    if (this.props.isLoading) return null;
    return (
      <View>
        <UIText>{'Recent Articles about Giving'}</UIText>
        <UIText>{JSON.stringify(this.props.entries)}</UIText>
      </View>
    );
  }
}

const enhance = compose(
  withTaggedContent,
);

export default enhance(RecentArticles);
