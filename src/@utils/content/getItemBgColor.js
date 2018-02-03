import { get } from 'lodash';

export const getItemBgColor = (item) => {
  let color = get(item, 'content.colors[0].value');
  if (!color) color = get(item, 'parent.content.colors[0].value');
  if (!color) return null;
  return `#${color}`;
};

export default getItemBgColor;
