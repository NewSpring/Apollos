import React from 'react';

const Svg = props => <svg {...props} />;
Svg.ClipPath = props => <clipPath {...props} />;
Svg.Defs = props => <defs {...props} />;
Svg.Ellipse = props => <ellipse {...props} />;
Svg.G = props => <g {...props} />;
Svg.Image = props => <image {...props} />;
Svg.Line = props => <line {...props} />;
Svg.LinearGradient = props => <linearGradient {...props} />;
Svg.Path = props => <path {...props} />;
Svg.Polygon = props => <polygon {...props} />;
Svg.Polyline = props => <polyline {...props} />;
Svg.RadialGradient = props => <radialGradient {...props} />;
Svg.Rect = props => <rect {...props} />;
Svg.Stop = props => <stop {...props} />;
Svg.Symbol = props => <symbol {...props} />;
Svg.TSpan = props => <tspan {...props} />;
Svg.Text = props => <text {...props} />;
Svg.TextPath = props => <textPath {...props} />;
Svg.Use = props => <use {...props} />;

export { Svg };
