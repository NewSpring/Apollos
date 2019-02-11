import React from 'react';
import { compose, withState } from 'recompose';
import moment from 'moment';
import { times } from 'lodash';
import { ScrollView, View } from 'react-native';

import ContributionsChart from '@ui/ContributionsChart';
import withContributionsChartData from '@data/withContributionsChartData';
import { withTheme, withThemeMixin } from '@ui/theme';
import { H4, H6, H7 } from '@ui/typography';
import { Picker, PickerItem } from '@ui/inputs';
import CashAmountIndicator from '@ui/CashAmountIndicator';
import Hero from '@ui/Hero';
import styled from '@ui/styled';
import Touchable from '@ui/Touchable';
import Icon from '@ui/Icon';

const currentYear = moment().year();

const Heroed = styled(({ theme }) => ({
  alignItems: 'stretch',
  justifyContent: 'stretch',
  paddingTop: theme.sizing.baseUnit * 3,
  paddingHorizontal: theme.sizing.baseUnit,
}))(Hero);

const ButtonWrapper = styled({
  alignItems: 'center',
  justifyContent: 'flex-start',
  flexDirection: 'row',
})(Touchable);

const Title = styled(({ theme }) => ({
  borderBottomColor: theme.colors.text.primary,
  borderBottomWidth: 1,
  borderBottomStyle: 'solid',
  marginTop: theme.sizing.baseUnit * 2,
  paddingBottom: theme.sizing.baseUnit / 2,
}))(H4);

const StyledContributionsChart = styled(({ theme }) => ({
  marginLeft: -(theme.sizing.baseUnit * 2),
}))(ContributionsChart);

const StyledPicker = withThemeMixin(({ theme }) => ({
  type: 'dark',
  overrides: {
    'InputUnderline.blurred': {
      backgroundColor: theme.colors.white,
    },
  },
}))(Picker);

const Row = styled(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingVertical: theme.sizing.baseUnit / 2,
  borderBottomColor: theme.colors.white,
  borderBottomWidth: 1,
  borderBottomStyle: 'solid',
}))(View);

const enhance = compose(
  withState('year', 'setYear', moment().year()),
  withContributionsChartData,
  withTheme(({ theme, ...otherProps }) => ({
    iconSize: otherProps.iconSize || theme.helpers.rem(1.33),
    backgroundColor: theme.colors.primary,
    chartColor: theme.colors.white,
  })),
);

const contentContainerStyle = {
  alignItems: 'stretch',
  justifyContent: 'flex-start',
};

const ContributionsChartHero = enhance(
  ({
    backgroundColor,
    chartColor,
    total,
    setYear,
    year,
    onViewHistory,
    accounts,
    iconSize,
  }) => (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
    >
      <Heroed
        backgroundColor={backgroundColor}
        contentContainerStyle={contentContainerStyle}
      >
        <Title>Year in Review</Title>
        <StyledPicker
          label="See your summary from"
          displayValue={year}
          onValueChange={v => setYear(v)}
        >
          {times(10, i => (
            <PickerItem
              key={currentYear - i}
              value={currentYear - i}
              label={currentYear - i}
              color="black"
            />
          ))}
        </StyledPicker>
        <StyledContributionsChart
          year={year}
          fill={chartColor}
          tickLabelFill={chartColor}
          chartHeight={300}
        />
        <CashAmountIndicator amount={total} size={2} />
        <ButtonWrapper onPress={onViewHistory}>
          <H7>View your giving history</H7>
          <Icon name="arrow-next" size={iconSize} />
        </ButtonWrapper>
        <Title>Fund Breakdown</Title>
        {Object.keys(accounts).map((accountName) => {
          const amount = accounts[accountName];
          return (
            <Row key={accountName}>
              <H6>{accountName}</H6>
              <CashAmountIndicator amount={amount} size={3} />
            </Row>
          );
        })}
      </Heroed>
    </ScrollView>
  ),
);

export default enhance(ContributionsChartHero);
