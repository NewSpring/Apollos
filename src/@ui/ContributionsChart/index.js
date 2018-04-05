import React, { PureComponent } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import {
  VictoryLine,
  VictoryScatter,
  VictoryArea,
  VictoryChart,
  VictoryAxis,
} from '@ui/Chart';
import withContributionsChartData from '@data/withContributionsChartData';
import { withTheme } from '@ui/theme';

export class ContributionsChart extends PureComponent {
  static propTypes = {
    animate: PropTypes.shape({}),
    data: PropTypes.arrayOf(PropTypes.shape({})),
    fill: PropTypes.string,
    lineWidth: PropTypes.number,
    dotSize: PropTypes.number,
    tickLabelFill: PropTypes.string,
    chartHeight: PropTypes.number,
    tickFontSize: PropTypes.number,
    style: PropTypes.any, // eslint-disable-line
  };

  static defaultProps = {
    animate: {
      duration: 2000,
      onLoad: { duration: 1000 },
    },
    data: [
      { month: 'January', amount: 0, tick: 'J' },
      { month: 'February', amount: 0, tick: 'F' },
      { month: 'March', amount: 0, tick: 'M' },
      { month: 'April', amount: 0, tick: 'A' },
      { month: 'May', amount: 0, tick: 'M' },
      { month: 'June', amount: 0, tick: 'J' },
      { month: 'July', amount: 0, tick: 'J' },
      { month: 'August', amount: 0, tick: 'A' },
      { month: 'September', amount: 0, tick: 'S' },
      { month: 'October', amount: 0, tick: 'O' },
      { month: 'November', amount: 0, tick: 'N' },
      { month: 'December', amount: 0, tick: 'D' },
    ],
    fill: '#6bac43',
    lineWidth: 3,
    dotSize: 3,
    tickLabelFill: '#858585',
    chartHeight: 160,
    tickFontSize: 10,
    style: {},
  };

  state = {
    width: undefined,
  };

  get areaStyles() {
    return {
      data: {
        fill: this.props.fill,
        stroke: 'none',
        opacity: 0.5,
      },
    };
  }

  get lineStyles() {
    return {
      data: {
        stroke: this.props.fill,
        strokeWidth: this.props.lineWidth,
      },
    };
  }

  get scatterStyles() {
    return {
      data: {
        fill: this.props.fill,
      },
    };
  }

  get tickFormat() {
    return this.props.data.map(x => (x.tick));
  }

  get axisStyles() {
    return {
      axis: {
        stroke: 'transparent',
        strokeWidth: 0,
      },
      tickLabels: {
        fontSize: this.props.tickFontSize,
        fill: this.props.tickLabelFill,
      },
    };
  }

  setWidth = ({ nativeEvent: { layout: { width } } }) => {
    this.setState({ width });
  }

  render() {
    return (
      <View
        style={this.props.style}
        onLayout={this.setWidth}
      >
        {this.state.width && (
          <VictoryChart
            height={this.props.chartHeight}
            width={this.state.width}
          >
            <VictoryArea
              data={this.props.data}
              x="month"
              y="amount"
              style={this.areaStyles}
            />
            <VictoryLine
              animate={this.props.animate}
              data={this.props.data}
              x="month"
              y="amount"
              style={this.lineStyles}
            />
            <VictoryScatter
              data={this.props.data}
              x="month"
              y="amount"
              size={this.props.dotSize}
              style={this.scatterStyles}
            />
            <VictoryAxis
              tickFormat={this.tickFormat}
              style={this.axisStyles}
            />
          </VictoryChart>
        )}
      </View>
    );
  }
}

const enhance = compose(
  withContributionsChartData,
  withTheme(({ theme, ...otherProps }) => ({
    tickFontSize: otherProps.fontSize || theme.helpers.rem(0.75),
    fill: otherProps.fill || theme.colors.primary,
    tickLabelFill: otherProps.tickLabelFill || theme.colors.darkTertiary,
  })),
);

export default enhance(ContributionsChart);
