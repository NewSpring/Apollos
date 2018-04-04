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
    let pathname = url.replace(linkingUri, '');

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
