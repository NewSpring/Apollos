import React from 'react';
import PropTypes from 'prop-types';
import { BackHandler } from 'react-native';

export default class AndroidBackButton extends React.Component {
  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.shape({
        goBack: PropTypes.func.isRequired,
        index: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
  };

  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: null,
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBack);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
  }

  handleBack = () => {
    const { history } = this.context.router;

    if (history.index === 0) {
      return false; // home screen
    }
    history.goBack();
    return true;
  }

  render() {
    return this.props.children || null;
  }
}
