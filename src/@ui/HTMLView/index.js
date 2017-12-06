import React, { PureComponent, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Linking, TouchableOpacity, Image } from 'react-native';
import { Parser, DomHandler } from 'htmlparser2';
import { decodeHTML } from 'entities';
import { BodyCopy, H1, H2, H3, H4, H5, H6, H7 } from '@ui/typography';

const LINE_BREAK = '\n';

export const defaultRenderer = (node, { children }) => {
  if (node.type === 'text' && node.data && node.data.trim()) return <Text>{decodeHTML(node.data)}</Text>;
  switch (node.name) {
    case 'p': return <BodyCopy>{children}</BodyCopy>;
    case 'span': return <Text>{children}</Text>;
    case 'h1': return <H1>{children}</H1>;
    case 'h2': return <H2>{children}</H2>;
    case 'h3': return <H3>{children}</H3>;
    case 'h4': return <H4>{children}</H4>;
    case 'h5': return <H5>{children}</H5>;
    case 'h6': return <H6>{children}</H6>;
    case 'h7': return <H7>{children}</H7>;
    case 'a': {
      const url = node.attribs && node.attribs.href;
      const onPress = () => Linking.openURL(decodeHTML(url));
      if (url) {
        return <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>;
      }
    }
    // ignoring fallthrough above (the conditional return) to
    // handle the edge-case of an <a> tag used w/o href
    case 'img': { // eslint-disable-line no-fallthrough
      const imgWidth = node.attribs.width || +node.attribs['data-width'] || 0;
      const imgHeight = node.attribs.height || +node.attribs['data-height'] || 0;

      const imgStyle = {
        width: imgWidth,
        height: imgHeight,
      };

      const source = {
        uri: node.attribs.src,
        width: imgWidth,
        height: imgHeight,
      };

      return <Image source={source} style={imgStyle} />;
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
