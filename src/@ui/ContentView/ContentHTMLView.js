import { withProps } from 'recompose';
import HTMLView, { defaultRenderer } from '@ui/HTMLView';

const renderer = (node, { children, ...other }) => { // eslint-disable-line
  // the defaultRenderer support several basic elements out of the box,
  // this function only needs to handle the cases that are unique to content.
  return defaultRenderer(node, { children, ...other });
};

const ContentHTMLView = withProps({
  renderer,
})(HTMLView);

export default ContentHTMLView;
