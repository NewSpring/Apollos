import React from 'react';
import { storiesOf } from '@storybook/react-native';

import { ContributionsChart } from './';

storiesOf('ContributionsChart', module)
  .add('default', () => {
    const props = {
      animate: {
        duration: 2000,
        onLoad: { duration: 5000 },
      },
      chartHeight: 300,
      data: [
        { month: 'January', amount: 100, tick: 'J' },
        { month: 'February', amount: 74, tick: 'F' },
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
      length: 12,
      dotSize: 3,
      fill: '#000000',
      lineWidth: 3,
      tickFontSize: 13.5,
      tickLabelFill: '#000000',
      total: 174,
      year: 2018,
    };

    return (
      <ContributionsChart {...props} />
    );
  });
