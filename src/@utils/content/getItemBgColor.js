import { get } from 'lodash';
import Color from 'color';

export const getItemBgColor = (item) => {
  let color = get(item, 'content.colors[0].value');
  if (!color) color = get(item, 'parent.content.colors[0].value');
  if (!color) return null;
  try {
    return Color(`#${color}`).string();
  } catch (e) {
    return null;
  }
};

export default getItemBgColor;
