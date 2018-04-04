import { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert, Linking } from 'react-native';
import UrlPolyfill from 'url-parse';

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

  componentDidMount() {
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
    let pathname = url.replace(this.baseUrl, '');

    if (pathname.startsWith('/+')) {
      pathname = pathname.substr(2);
    }

    console.log({ pathname, url, baseUrl: this.baseUrl });

    Alert.alert('push', JSON.stringify({ pathname, url }));

    if (!url.startsWith(this.baseUrl) && this.props.handleUniversalLink) {
      console.log('handleUniversalLink.start');
      this.props.handleUniversalLink({ url });
    } else if (pathname && pathname.length && pathname !== '/') {
      console.log('history.push');
      this.context.router.history.push(pathname);
    }
  };

  render() {
    return this.props.children;
  }
}

export default DeepLinking;
