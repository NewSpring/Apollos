import { Component } from 'react';
import {
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';

// LEFT OFF HERE
export default class MediaQuery extends Component {
  static propTypes = {
    children: PropTypes.node,
    minWidth: PropTypes.number,
    maxWidth: PropTypes.number,
    minHeight: PropTypes.number,
    maxHeight: PropTypes.number,
  };

  static defaultProps = {
    children: null,
  };

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.dimensionTracker);
  }

  dimensionTracker = Dimensions.addEventListener('change', ({ window: { width, height } }) => {
    if (this.shouldBeVisible({ width, height })) return this.show();
    return this.hide();
  })

  show = () => this.setState({
    isVisible: true,
  })

  hide = () => this.setState({
    isVisible: false,
  })

  shouldBeVisible = ({ height, width } = {}) => {
    const {
      minWidth,
      maxWidth,
      minHeight,
      maxHeight,
    } = this.props;

    return true;
  }

  // eslint-disable-next-line react/sort-comp
  state = {
    isVisible: this.shouldBeVisible({
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
    }),
  }

  render() {
    return this.state.isVisible ? this.props.children : null;
  }
}
