import { get, filter } from 'lodash';

const getItemImages = (item) => {
  let images = item.photo || get(item, 'content.images', []);
  if (!images.length) images = get(item, 'parent.content.images', [{}]);
  if (typeof images === 'string') return images;
  // Sort 1:1 images to the front of array.
  // FWIW, `ConnectedImage` will sort out which image is best to use from a resolution
  // perspective, which is why we just kind of blindly push 1:1 images to the front,
  // as it doesn't consider aspect ratio, just resolution.
  images = [].concat(images).sort((a, b) => { // make sort pure
    if (a && b && a.fileLabel === b.fileLabel) return 0;
    if (a && a.fileLabel === '1:1') return -1;
    if (b && b.fileLabel === '1:1') return 1;
    return 0;
  });
  // TODO: this is some stop-gap logic to make sure we prioritize showing square images.
  // Even though we sort 1:1 images to the front above, sometimes React-Native likes to show
  // other formats based on screen resolution.
  if (images.find(({ fileLabel }) => fileLabel === '1:1')) {
    images = filter(images, ({ fileLabel }) => fileLabel === '1:1');
  }
  return images;
};

export default getItemImages;
