import React from 'react';
import { withProps } from 'recompose';
import HTMLView, { defaultRenderer, wrapTextChildren } from '@ui/HTMLView';
import { Text } from 'react-native';
import { H7 } from '@ui/typography';
import Paragraph from '@ui/Paragraph';

const renderer = (node, { children, ...other }) => { // eslint-disable-line
  // the defaultRenderer support several basic elements out of the box,
  // this function only needs to handle the cases that are unique to scripture.

  const className = (node && node.attribs && node.attribs.class) || '';

  if (node.name === 'p') return <Paragraph><Text>{wrapTextChildren(children)}</Text></Paragraph>;

  if (className.includes('chapter-num') || className.includes('verse-num')) {
    return <H7>{children}</H7>;
  }

  if (className.includes('line-group')) {
    return <Text>{children}{'\n'}</Text>;
  }

  if (className.includes('block-indent')) { // todo
    return <Text style={{ paddingLeft: 10 }}>{children}</Text>;
  }

  if (className.includes('indent')) { // todo
    return <Text>{'     '}{children}</Text>;
  }

  return defaultRenderer(node, { children, ...other });
};

const ScriptureHTMLView = withProps({
  renderer,
})(HTMLView);

export default ScriptureHTMLView;
