import { get } from 'lodash';

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
  return images;
};

export default getItemImages;
