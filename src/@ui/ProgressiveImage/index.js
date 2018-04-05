import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Animated, View, StyleSheet } from 'react-native';
import styled from '@ui/styled';
import ConnectedImage from '@ui/ConnectedImage';

const Wrapper = styled(({ theme }) => ({
  width: '100%',
  aspectRatio: 1,
  backgroundColor: theme.colors.background.inactive,
}))(View);

const styles = StyleSheet.create({
  imageStyles: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

class ProgressiveImage extends PureComponent {
  static propTypes = {
    source: ConnectedImage.propTypes.source,
    thumbnail: ConnectedImage.propTypes.source,
    thumbnailFadeDuration: PropTypes.number,
    imageFadeDuration: PropTypes.number,
    thumbnailBlurRadius: PropTypes.number,
    onLoadThumbnail: PropTypes.func,
    onLoadImage: PropTypes.func,
    imageStyle: PropTypes.any, // eslint-disable-line
    ...ConnectedImage.propTypes,
  }

  static defaultProps = {
    thumbnailFadeDuration: 250,
    imageFadeDuration: 250,
    thumbnailBlurRadius: 5,
    onLoadThumbnail: () => {},
    onLoadImage: () => {},
  }

  onLoadThumbnail = (...args) => {
    Animated.timing(this.thumbnailOpacity, {
      toValue: 1,
      duration: this.props.thumbnailFadeDuration,
    }).start();
    this.props.onLoadThumbnail(...args);
  }

  onLoadImage = (...args) => {
    Animated.timing(this.imageOpacity, {
      toValue: 1,
      duration: this.props.imageFadeDuration,
    }).start();
    this.props.onLoadImage(...args);
  }

  thumbnailOpacity = new Animated.Value(0);
  imageOpacity = new Animated.Value(0);

  render() {
    const {
      source,
      thumbnail,
      thumbnailFadeDuration,
      imageFadeDuration,
      thumbnailBlurRadius,
      onLoadThumbnail,
      onLoadImage,
      imageStyle,
      style,
      ...imageProps
    } = this.props;
    return (
      <Wrapper style={style}>
        {(thumbnail) ? (
          <ConnectedImage
            ImageComponent={Animated.Image}
            {...imageProps}
            onLoad={this.onLoadThumbnail}
            style={[styles.imageStyles, { opacity: this.thumbnailOpacity }, imageStyle]}
            source={thumbnail}
          />
        ) : null}
        <ConnectedImage
          ImageComponent={Animated.Image}
          {...imageProps}
          style={[styles.imageStyles, { opacity: this.imageOpacity }, imageStyle]}
          onLoad={this.onLoadImage}
          source={source}
        />
      </Wrapper>
    );
  }
}

export default ProgressiveImage;
