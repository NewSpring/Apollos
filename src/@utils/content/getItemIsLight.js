import { get } from 'lodash';

const getItemIsLight = (item) => {
  let isLight = get(item, 'content.isLight');
  if (typeof isLight !== 'boolean' ||
    !get(item, 'content.colors[0].value') // we want to use parent's isLight value if relying on parent's colors
  ) {
    isLight = get(item, 'parent.content.isLight');
  }
  return isLight;
};

export default getItemIsLight;
