import { filter } from 'lodash';

// TODO: we should modify Heighliner to separate these resources into props
export const getAlbumImageSource = images => filter(images, image => (
  image.fileName.indexOf('blur') === -1
));

export const getBlurredImageSource = images => filter(images, image => (
  image.fileName.indexOf('blur') > -1
));
