import React, { PureComponent } from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';

const styles = StyleSheet.create({
  container: { width: '100%' },
});

class NavItemImage extends PureComponent {
  get imageStyle() {
    return {
      width: this.width,
      height: this.width,
    };
  }

  width = new Animated.Value(Dimensions.get('window').width || 0);

  handleLayout = ({ nativeEvent: { layout: { width } } }) => {
    this.width.setValue(width);
  }

  render() {
    return (
      <View style={styles.container} onLayout={this.handleLayout}>
        <Animated.Image
          {...this.props}
          style={this.imageStyle}
        />
      </View>
    );
  }
}

export default NavItemImage;
