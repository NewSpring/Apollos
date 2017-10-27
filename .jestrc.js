/* mock Expo.Svg */
const Expo = require.requireActual('expo');
const React = require.requireActual('react');

function createSvgComponentMock(name, actualComponent) {
  class SvgComponentMock extends React.Component {
    render() {
      return React.createElement(name, this.props, this.props.children);
    }
  }
  SvgComponentMock.displayName = actualComponent.displayName;
  SvgComponentMock.propTypes = actualComponent.propTypes;
  return SvgComponentMock;
}

const Svg = createSvgComponentMock('Svg', Expo.Svg);
const excludedKeys = ['displayName', 'propTypes', 'defaultProps'];
const componentsToMock = Object.keys(Expo.Svg)
  .filter(key => !excludedKeys.includes(key));
for (let name of componentsToMock) {
  Svg[name] = createSvgComponentMock(name, Expo.Svg[name]);
}

Object.defineProperty(Expo, 'Svg', {
  enumerable: true,
  get: () => Svg,
});
