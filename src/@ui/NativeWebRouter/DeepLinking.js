import { Component } from 'react';
import PropTypes from 'prop-types';
import { Linking } from 'react-native';

import linkingUri from '@utils/linkingUri';

class DeepLinking extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
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
    Linking.getInitialURL().then(url => this.push(url));
    Linking.addEventListener('url', this.handleChange);
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleChange);
  }

  handleChange = (e) => {
    this.push(e.url);
  };

  push = async (url = '') => {
    // Currently, on android, expo has this weird bug where the app will open with he `initialURL`
    // set to the linkingUrl without `/+`. So we handle that here by making sure we remove `/+`
    // from both the linkingUri, and the url given to this method so that the two are consistent.
    let baseUrl = linkingUri;
    if (baseUrl.endsWith('/+')) {
      baseUrl = baseUrl.slice(0, -2);
    }

    let pathname = url.replace(baseUrl, '');

    if (pathname.startsWith('/+')) {
      pathname = pathname.substr(2);
    }

    if (!url.startsWith(linkingUri) && this.props.handleUniversalLink) {
      this.props.handleUniversalLink({ url });
    } else if (pathname && pathname.length && pathname !== '/') {
      this.context.router.history.push(pathname);
    }
  };

  render() {
    return this.props.children;
  }
}

export default DeepLinking;
