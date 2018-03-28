import { Component } from 'react';
import PropTypes from 'prop-types';
import { Linking } from 'react-native';
// Needed because ReactNative doens't currently support URL
import UrlPolyfill from 'url-parse';

import linkingUri from '@utils/linkingUri';

class DeepLinking extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
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
    Linking.getInitialURL().then(this.handleChange);
    Linking.addEventListener('url', this.handleChange);
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleChange);
  }

  baseUrl = linkingUri;

  handleChange = (e) => {
    this.push(e.url);
  };

  push = (url = '') => {
    // const u = new UrlPolyfill(url);
    // let { pathname = null } = u || {};
    // if (pathname) {
    //   if (pathname.indexOf('/+') > -1) pathname = pathname.substring(pathname.indexOf('/+') + 2);
    //   this.context.router.history.push(pathname);
    // }
    console.log({ url });
    const pathname = url.replace(this.baseUrl, '');
    if (pathname) {
      this.context.router.history.push(pathname);
    }
  };

  render() {
    return this.props.children;
  }
}

export default DeepLinking;
