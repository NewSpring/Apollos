import { createElement } from 'react-native-web';

const Svg = props => createElement('svg', props);
Svg.ClipPath = props => createElement('clipPath', props);
Svg.Defs = props => createElement('defs', props);
Svg.Ellipse = props => createElement('ellipse', props);
Svg.G = props => createElement('g', props);
Svg.Image = props => createElement('image', props);
Svg.Line = props => createElement('line', props);
Svg.LinearGradient = props => createElement('linearGradient', props);
Svg.Path = props => createElement('path', props);
Svg.Polygon = props => createElement('polygon', props);
Svg.Polyline = props => createElement('polyline', props);
Svg.RadialGradient = props => createElement('radialGradient', props);
Svg.Rect = props => createElement('rect', props);
Svg.Stop = props => createElement('stop', props);
Svg.Symbol = props => createElement('symbol', props);
Svg.TSpan = props => createElement('tspan', props);
Svg.Text = props => createElement('text', props);
Svg.TextPath = props => createElement('textPath', props);
Svg.Use = props => createElement('use', props);

export { Svg };
