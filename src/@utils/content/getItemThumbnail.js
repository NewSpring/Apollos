import { get } from 'lodash';

const getItemThumbnail = (item) => {
  let thumbnail = get(item, 'content.thumbnailImage', []);
  if (!thumbnail.length) thumbnail = get(item, 'parent.content.thumbnailImage', []);
  return thumbnail;
};

export default getItemThumbnail;
