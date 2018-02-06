import { get } from 'lodash';

const getItemImages = (item) => {
  let images = item.photo || get(item, 'content.images', []);
  if (!images.length) images = get(item, 'parent.content.images', [{}]);
  if (typeof images === 'string') return images;
  return images[0].url; // TODO short circuit. Highliner should handle image selection in the array
};

export default getItemImages;
