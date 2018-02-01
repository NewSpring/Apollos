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
    // this.push('/give/now');
    Linking.addEventListener('url', this.handleChange);
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleChange);
  }

  baseUrl = linkingUri;

  handleChange = (e) => {
    this.push(e.url);
  };

  push = (url) => {
    const pathname = url.replace(this.baseUrl, '');
    // console.log({ url, pathname }, 'pushed');
    this.context.router.history.push(pathname);
  };

  render() {
    return this.props.children;
  }
}

export default DeepLinking;
