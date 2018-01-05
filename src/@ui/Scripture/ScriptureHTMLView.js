import React from 'react';
import { withProps } from 'recompose';
import HTMLView, { defaultRenderer, wrapTextChildren } from '@ui/HTMLView';
import { H7, BodyCopy } from '@ui/typography';
import Paragraph from '@ui/Paragraph';

const renderer = (node, { children, ...other }) => { // eslint-disable-line
  // the defaultRenderer support several basic elements out of the box,
  // this function only needs to handle the cases that are unique to scripture.

  const className = (node && node.attribs && node.attribs.class) || '';

  if (className.includes('chapter-num') || className.includes('verse-num')) {
    return <H7>{children}</H7>;
  }

  if (className.includes('line-group')) {
    return <BodyCopy>{children}{'\n'}</BodyCopy>;
  }

  if (className.includes('block-indent')) { // todo
    return <BodyCopy style={{ paddingLeft: 10, paddingTop: 10 }}>{children}</BodyCopy>;
  }

  if (className.includes('indent')) { // todo
    return <BodyCopy>{'     '}{children}</BodyCopy>;
  }

  if (className.includes('small-caps')) {
    return <BodyCopy>{children[0].props.children.toUpperCase()}</BodyCopy>;
  }

  if (className.includes('woc')) {
    return <BodyCopy style={{ color: 'darkred' }}>{children}</BodyCopy>;
  }

  if (node.name === 'p') return <Paragraph><BodyCopy>{wrapTextChildren(children)}</BodyCopy></Paragraph>;

  return defaultRenderer(node, { children, ...other });
};

const ScriptureHTMLView = withProps({
  renderer,
})(HTMLView);

export default ScriptureHTMLView;
