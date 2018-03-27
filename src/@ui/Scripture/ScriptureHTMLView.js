import React from 'react';
import { withProps } from 'recompose';

import HTMLView, { defaultRenderer, wrapTextChildren } from '@ui/HTMLView';
import { Platform, Text, View } from 'react-native';
import { H7, BodyText } from '@ui/typography';
import Paragraph from '@ui/Paragraph';
import styled from '@ui/styled';

const BlockIndent = styled(({ theme }) => ({
  paddingTop: theme.sizing.baseUnit / 2,
  paddingLeft: theme.sizing.baseUnit / 2,
}))(View);

const RedLetters = styled(({ theme }) => ({
  color: theme.colors.wordOfChrist,
}))(Text);

const NumText = styled(({ theme }) => ({
  color: theme.colors.text.tertiary,
  ...Platform.select({
    android: {
      // taken from BodyText so NumText shares the same baseline.
      lineHeight: theme.helpers.verticalRhythm(1.112, 1.625),
    },
  }),
}))(H7);

const renderer = (node, { children, ...other }) => {
  // eslint-disable-line
  // the defaultRenderer support several basic elements out of the box,
  // this function only needs to handle the cases that are unique to scripture.
  const className = (node && node.attribs && node.attribs.class) || '';

  if (className.includes('chapter-num') || className.includes('verse-num')) {
    /* TODO: a single space lives here to temporarily space verse numbers when they are not at the
     * beginning of a sentence or paragraph. It affects all instences (albeit less noticably in
     * somecases) so a more procise fix in the future is prefered.
     */
    return <NumText> {children}</NumText>;
  }

  if (className.includes('line-group')) {
    return (
      <BodyText>
        {children}
        {'\n'}
      </BodyText>
    );
  }

  if (className.includes('block-indent')) {
    // todo
    return <BlockIndent>{children}</BlockIndent>;
  }

  if (className.includes('indent')) {
    // todo
    return (
      <Text>
        {'     '}
        {children}
      </Text>
    );
  }

  if (className.includes('small-caps')) {
    return <Text>{children[0].props.children.toUpperCase()}</Text>;
  }

  if (className.includes('woc')) {
    return <RedLetters>{children}</RedLetters>;
  }

  if (node.name === 'p') {
    return (
      <Paragraph>
        <BodyText>{wrapTextChildren(children)}</BodyText>
      </Paragraph>
    );
  }

  return defaultRenderer(node, { children, ...other });
};

const ScriptureHTMLView = withProps({
  renderer,
})(HTMLView);

export default ScriptureHTMLView;
