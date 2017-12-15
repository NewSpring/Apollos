import React from 'react';
import renderer from 'react-test-renderer';

import ConnectedImage, {
  getCachedSources,
  updateCache,
} from './';

describe('the ConnectedImage component', () => {
  it('should render immediately with a network image with a known width and height', () => {
    const tree = renderer.create(
      <ConnectedImage
        source={{
          uri: 'https://placeholdit.co/i/150x150?bg=eeeeee&fc=577084',
          width: 150,
          height: 150,
        }}
      />,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should maintain aspect ratio', () => {
    const tree = renderer.create(
      <ConnectedImage
        source={{
          uri: 'https://placeholdit.co/i/150x150?bg=eeeeee&fc=577084',
          width: 150,
          height: 150,
        }}
        maintainAspectRatio
      />,
    );
    expect(tree).toMatchSnapshot();
  });
  describe('updateCache', () => {
    it('updates cache with image uri and sizes', async () => {
      const source = {
        url: '//via.placeholder.com/320x240',
      };
      await updateCache(source);

      expect(getCachedSources(source)).toContainEqual(expect.objectContaining({
        uri: 'https://via.placeholder.com/320x240',
        url: '//via.placeholder.com/320x240',
        width: 320,
        height: 240,
      }));
    });
  });
});
