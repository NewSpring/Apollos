import { Component } from 'react';
import PropTypes from 'prop-types';
import { Linking } from 'react-native';

import linkingUri from '@utils/linkingUri';

class DeepLinking extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    handleUniversalLink: PropTypes.func,
  };

  static defaultProps = {
    children: null,
  };

  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.shape({
        push: PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired,
  };

  async componentDidMount() {
    Linking.getInitialURL().then(this.push);
    Linking.addEventListener('url', this.handleChange);
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleChange);
  }

  baseUrl = linkingUri;

  handleChange = (e) => {
    this.push(e.url);
  };

  push = async (url = '') => {
    const pathname = url.replace(this.baseUrl, '');

    if (pathname.startsWith('http') && this.props.handleUniversalLink) {
      this.props.handleUniversalLink({ url: pathname });
    } else if (pathname && pathname.length && pathname !== '/') {
      this.context.router.history.push(pathname);
    }
  };

  render() {
    return this.props.children;
  }
}

export default DeepLinking;
