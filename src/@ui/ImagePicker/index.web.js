import React, { PureComponent } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Touchable from '@ui/Touchable';

const hiddenInputStyles = {
  width: 0, height: 0, opacity: 0, overflow: 'hidden',
};

class ImagePicker extends PureComponent {
  static propTypes = {
    onSelectFile: PropTypes.func,
    children: PropTypes.node,
    webWrapperStyle: PropTypes.any, //eslint-disable-line
  };

  handlePress = () => {
    this.input.click();
  }

  handleOnChange = (e) => {
    const file = get(e.currentTarget, 'files.0');
    this.props.onSelectFile(file);
  }

  render() {
    const {
      children, onSelectFile, webWrapperStyle, ...otherProps
    } = this.props;
    return (
      <View style={webWrapperStyle}>
        <Touchable {...otherProps} onPress={this.handlePress}>
          {children}
        </Touchable>
        <input
          style={hiddenInputStyles}
          ref={(t) => { this.input = t; }}
          accept=".jpg,.jpeg,.tiff,.png,.gif"
          onChange={e => this.handleOnChange(e)}
          type="file"
        />
      </View>
    );
  }
}

export default ImagePicker;
