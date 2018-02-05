import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import {
  AsyncStorage,
} from 'react-native';
import get from 'lodash/get';
import withGive from '@data/withGive';
import { withRouter } from '@ui/NativeWebRouter';
import { parse } from '@utils/queryString';

const enhance = compose(
  withRouter,
  withGive,
);

// TODO: Create a fetcher decorator instead using this logic
export default Component => enhance(class withRestoredGive extends PureComponent {
  static propTypes = {
    restoreContributions: PropTypes.func,
    location: PropTypes.shape({
      search: PropTypes.string,
    }),
  };

  static defaultProps = {
    restoreContributions() {},
    location: {},
  };

  state = {
    isRestored: false,
  };

  async componentWillMount() {
    try {
      const { state, userToken } = this.queryParams;
      await this.props.restoreContributions(state);
      await AsyncStorage.setItem('authToken', userToken);

      this.setState({
        isRestored: true,
      });
    } catch (err) {
      throw err;
    }
  }

  get queryParams() {
    return parse(get(this.props, 'location.search', {}));
  }

  render() {
    return (
      <Component
        isRestored={this.state.isRestored}
        {...this.props}
      />
    );
  }
});
