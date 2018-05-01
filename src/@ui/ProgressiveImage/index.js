
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Platform, View, StyleSheet } from 'react-native';
import styled from '@ui/styled';
import ConnectedImage from '@ui/ConnectedImage';

const Wrapper = styled(({ theme }) => ({
  width: '100%',
  aspectRatio: 1,
  backgroundColor: theme.colors.background.inactive,
  ...Platform.select({
    web: {
      height: 0,
      paddingTop: '100%',
    },
  }),
}))(View);

const WebWrapperImageSizeFix = styled(StyleSheet.absoluteFill)(View);

const styles = StyleSheet.create({
  imageStyles: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

class ProgressiveImage extends PureComponent {
  static propTypes = {
    source: ConnectedImage.propTypes.source,
    thumbnail: ConnectedImage.propTypes.source,
    thumbnailBlurRadius: PropTypes.number,
    imageStyle: PropTypes.any, // eslint-disable-line
    ...ConnectedImage.propTypes,
  }

  static defaultProps = {
    thumbnailBlurRadius: 2,
  }

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
          <WebWrapperImageSizeFix>
            <ConnectedImage
              {...imageProps}
              blurRadius={thumbnailBlurRadius}
              style={[styles.imageStyles, imageStyle]}
              source={thumbnail}
            />
          </WebWrapperImageSizeFix>
        ) : null}
        <WebWrapperImageSizeFix>
          <ConnectedImage
            {...imageProps}
            style={[styles.imageStyles, imageStyle]}
            source={source}
          />
        </WebWrapperImageSizeFix>
      </Wrapper>
    );
  }
}

export default ProgressiveImage;
