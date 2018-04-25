import React, { PureComponent, cloneElement, Children } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Parser, DomHandler } from 'htmlparser2';
import { decodeHTML } from 'entities';
import { BodyText, H1, H2, H3, H4, H5, H6, H7 } from '@ui/typography';
import { ButtonLink } from '@ui/Button';
import ConnectedImage from '@ui/ConnectedImage';
import Paragraph from '@ui/Paragraph';
import BlockQuote from '@ui/BlockQuote';
import BulletListItem from '@ui/BulletListItem';
import WebBrowser from '@ui/WebBrowser';

const LINE_BREAK = '\n';

const TEXT_TYPES_THAT_SHOULD_WRAP = [Text, BodyText, ButtonLink];
export const wrapTextChildren = (children, Component = BodyText) => {
  const newChildren = [];
  let currentTextChildren = [];
  Children.toArray(children).forEach((child, i) => {
    if (TEXT_TYPES_THAT_SHOULD_WRAP.includes(child.type)) {
      currentTextChildren.push(child);
    } else {
      if (currentTextChildren.length) {
        newChildren.push( // eslint-disable-next-line
          <Component key={`composed-children-${i}`}>{currentTextChildren}</Component>,
        );
        currentTextChildren = [];
      }
      newChildren.push(child);
    }
  });
  if (currentTextChildren.length) {
    newChildren.push(
      <Component key="composed-children">{currentTextChildren}</Component>,
    );
  }
  return newChildren;
};

export const defaultRenderer = (node, { children }) => {
  if (node.type === 'text' && node.data && node.data.trim()) {
    return <Text>{decodeHTML(node.data)}</Text>;
  }

  switch (node.name) {
    case 'p': return <Paragraph>{wrapTextChildren(children)}</Paragraph>;
    case 'strong': return <BodyText bold>{children}</BodyText>;
    case 'em': return <BodyText italic>{children}</BodyText>;
    case 'blockquote': return <BlockQuote>{wrapTextChildren(children, Text)}</BlockQuote>;
    case 'h1': return <H1>{wrapTextChildren(children, Text)}</H1>;
    case 'h2': return <H2>{wrapTextChildren(children, Text)}</H2>;
    case 'h3': return <H3>{wrapTextChildren(children, Text)}</H3>;
    case 'h4': return <H4>{wrapTextChildren(children, Text)}</H4>;
    case 'h5': return <H5>{wrapTextChildren(children, Text)}</H5>;
    case 'h6': return <H6>{wrapTextChildren(children, Text)}</H6>;
    case 'h7': return <H7>{wrapTextChildren(children, Text)}</H7>;
    case 'ul': return children; // todo
    case 'li': return <BulletListItem>{wrapTextChildren(children)}</BulletListItem>;
    case 'a': {
      let url = node.attribs && node.attribs.href;
      url = decodeHTML(url);

      if (url && url.startsWith('//')) {
        url = `http:${url}`;
      }
      if (!url.startsWith('http')) {
        // we can't currently handle non web-links, so just return regular text instead:
        return children;
      }
      const onPress = () => WebBrowser.openBrowserAsync(url);
      if (url) {
        return (<ButtonLink onPress={onPress}>{children}</ButtonLink>);
      }
    }
    // ignoring fallthrough on the next line because of the conditional return above,
    // so we handle the edge-case of an <a> tag used w/o a href
    case 'img': { // eslint-disable-line no-fallthrough
      const source = {
        url: node.attribs.src,
      };

      const imgStyles = {
        resizeMode: 'contain',
        width: '100%',
      };

      return <ConnectedImage maintainAspectRatio source={source} style={imgStyles} />;
    }
    case 'br':
      return <Text>{LINE_BREAK}</Text>;
    default:
      return children;
  }
};

export default class HTMLView extends PureComponent {
  static propTypes = {
    children: PropTypes.string,
    renderer: PropTypes.func.isRequired,
  }

  static defaultProps = {
    renderer: defaultRenderer,
  }

  constructor(...args) {
    super(...args);
    this.parser = new Parser(
      new DomHandler((err, dom) => {
        this.parsed = this.renderDom(dom);
      }, { normalizeWhitespace: true }),
    );
    if (this.props.children) this.parse(this.props.children);
  }

  componentWillUpdate(props) {
    this.parse(props.children);
  }

  parse(html = '') {
    this.parser.write(html);
    this.parser.done();
  }

  renderDom(dom) {
    return dom
      .map((node, index) => {
        let children = [];
        if (node.children) children = this.renderDom(node.children);

        let renderedNode = this.props.renderer(node, { children });
        if (!renderedNode && renderedNode !== null && this.props.renderer !== defaultRenderer) {
          renderedNode = defaultRenderer(node, { children });
        }

        if (renderedNode && !Array.isArray(renderedNode)) {
          renderedNode = cloneElement(renderedNode, { key: index });
        }
        return renderedNode;
      })
      .filter(e => e !== undefined);
  }

  render() {
    return (
      <View>{this.parsed}</View>
    );
  }
}
