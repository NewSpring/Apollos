import React, { PureComponent } from 'react';
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

export class ContributionsChart extends PureComponent {
  static propTypes = {
    animate: PropTypes.shape({}),
    data: PropTypes.arrayOf(PropTypes.shape({})),
    fill: PropTypes.string,
    lineWidth: PropTypes.string,
    dotSize: PropTypes.string,
    tickLabelFill: PropTypes.string,
    chartHeight: PropTypes.number,
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
    lineWidth: '3',
    dotSize: '3',
    tickLabelFill: '#858585',
    chartHeight: 160,
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
        strokeWidth: '0',
      },
      tickLabels: {
        // NOTE: Not too sure about this
        // fontFamily: 'colfax-web, sans-serif',
        fontSize: '10',
        fill: this.props.tickLabelFill,
      },
    };
  }

  render() {
    return (
      <VictoryChart
        height={this.props.chartHeight}
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
    );
  }
}

const enhance = compose(
  withContributionsChartData,
);

export default enhance(ContributionsChart);
