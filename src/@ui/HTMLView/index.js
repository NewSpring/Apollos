import React, { PureComponent, cloneElement, Children } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Linking } from 'react-native';
import { Parser, DomHandler } from 'htmlparser2';
import { decodeHTML } from 'entities';
import { BodyCopy, H1, H2, H3, H4, H5, H6, H7 } from '@ui/typography';
import ConnectedImage from '@ui/ConnectedImage';
import Paragraph from '@ui/Paragraph';
import { Link } from './styles';

const LINE_BREAK = '\n';

const TEXT_TYPES_THAT_SHOULD_WRAP = [Text, BodyCopy, Link];
const wrapTextChildren = (children) => {
  const newChildren = [];
  let currentTextChildren = [];
  Children.forEach(children, (child) => {
    if (TEXT_TYPES_THAT_SHOULD_WRAP.includes(child.type)) {
      currentTextChildren.push(child);
    } else {
      if (currentTextChildren.length) {
        newChildren.push(<Text>{currentTextChildren}</Text>);
        currentTextChildren = [];
      }
      newChildren.push(child);
    }
  });
  if (currentTextChildren.length) newChildren.push(<BodyCopy>{currentTextChildren}</BodyCopy>);
  return newChildren;
};

export const defaultRenderer = (node, { children }) => {
  if (node.type === 'text' && node.data && node.data.trim()) {
    // todo: the color style is needed here to keep color inherited from the parent element
    // example: <a>text</a> gets rendered like <Link><BodyCopy>text</BodyCopy></Link>
    return <BodyCopy style={{ color: undefined }}>{decodeHTML(node.data)}</BodyCopy>;
  }

  switch (node.name) {
    case 'p': return <Paragraph>{wrapTextChildren(children)}</Paragraph>;
    case 'blockquote': return <Paragraph style={{ paddingHorizontal: 20 }}>{children}</Paragraph>; // todo
    case 'h1': return <H1>{children}</H1>;
    case 'h2': return <H2>{children}</H2>;
    case 'h3': return <H3>{children}</H3>;
    case 'h4': return <H4>{children}</H4>;
    case 'h5': return <H5>{children}</H5>;
    case 'h6': return <H6>{children}</H6>;
    case 'h7': return <H7>{children}</H7>;
    case 'ul': return children; // todo
    case 'li': return <BodyCopy>• {children}{LINE_BREAK}</BodyCopy>; // todo
    case 'a': {
      const url = node.attribs && node.attribs.href;
      const onPress = () => Linking.openURL(decodeHTML(url));
      if (url) {
        return (<Link onPress={onPress}>{children}</Link>);
      }
    }
    // ignoring fallthrough on the next line because of the conditional return above,
    // so we handle the edge-case of an <a> tag used w/o a href
    case 'img': { // eslint-disable-line no-fallthrough
      const imgWidth = node.attribs.width || +node.attribs['data-width'];
      const imgHeight = node.attribs.height || +node.attribs['data-height'];

      const source = {
        url: node.attribs.src,
      };

      if (imgWidth) source.width = imgWidth;
      if (imgHeight) source.height = imgHeight;

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
