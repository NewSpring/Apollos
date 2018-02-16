import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { withFormik } from 'formik';
import moment from 'moment';
import Yup from 'yup';
import { compose } from 'recompose';

import { DateInput } from '@ui/inputs';
import Button from '@ui/Button';
import { H7 } from '@ui/typography';
import styled from '@ui/styled';
import Touchable from '@ui/Touchable';
import TableView, { Cell, CellText, CellIcon, Divider } from '@ui/TableView';
import Chip, { ChipList } from '@ui/Chip';
import { withTheme } from '@ui/theme';
import PaddedView from '@ui/PaddedView';
import sentry from '@utils/sentry';

const StyledTableView = styled({ marginBottom: 0 })(TableView);

const StyledH7 = styled(({ theme }) => ({
  color: theme.colors.text.secondary,
}))(H7);

const Label = styled(({ theme }) => ({
  paddingVertical: theme.sizing.baseUnit / 4,
}))(StyledH7);

const StyledIcon = withTheme(({ theme }) => ({
  fill: theme.colors.text.secondary,
}))(CellIcon);

class ContributionHistoryFilter extends PureComponent {
  static propTypes = {
    values: PropTypes.shape({
      startDate: PropTypes.instanceOf(Date),
      endDate: PropTypes.instanceOf(Date),
    }),
    setFieldValue: PropTypes.func,
    setFieldTouched: PropTypes.func,
    handleSubmit: PropTypes.func,
    isSubmitting: PropTypes.bool,
    iconSize: PropTypes.number,
  };

  static defaultProps = {
    values: {},
    setFieldValue() {},
    setFieldTouched() {},
    handleSubmit() {},
    isSubmitting: false,
    iconSize: undefined,
  };

  state = {
    isVisible: false,
  };

  toggle = () => {
    this.setState({
      isVisible: !this.state.isVisible,
    });
  }

  dateRanges = ([
    {
      key: moment().subtract(1, 'year').get('year'),
      startDate: moment().subtract(1, 'year').startOf('year').toDate(),
      endDate: moment().subtract(1, 'year').endOf('year').toDate(),
    }, {
      key: 'Last Month',
      startDate: moment().subtract(1, 'month').startOf('month').toDate(),
      endDate: moment().subtract(1, 'month').endOf('month').toDate(),
    }, {
      key: 'Year to Date',
      startDate: moment().startOf('year').toDate(),
      endDate: moment().toDate(),
    }, {
      key: 'All Time',
      startDate: null,
      endDate: null,
    },
  ]);

  clear = () => {
    this.props.setFieldValue('startDate', undefined);
    this.props.setFieldValue('endDate', undefined);
  }

  renderFilters = () => {
    if (!this.state.isVisible) return null;
    return (
      <View>
        <PaddedView>
          <Label>Date Range</Label>
          <ChipList>
            {this.dateRanges.map(({ key, startDate, endDate }) => {
              const selected = moment(this.props.values.startDate).format('MM/DD/YYYY') === moment(startDate).format('MM/DD/YYYY') &&
              moment(this.props.values.endDate).format('MM/DD/YYYY') === moment(endDate).format('MM/DD/YYYY');
              return (
                <Chip
                  key={key}
                  title={key}
                  selected={selected}
                  icon={selected ? 'close' : null}
                  onPress={() => {
                    if (selected) {
                      this.clear();
                    } else {
                      this.props.setFieldValue('startDate', startDate);
                      this.props.setFieldValue('endDate', endDate);
                    }
                  }}
                />
              );
            })}
          </ChipList>
        </PaddedView>
        <PaddedView>
          <Label>Custom Dates</Label>
          <ChipList>
            <DateInput
              label="Start Date"
              displayValue={
                this.props.values.startDate ? moment(this.props.values.startDate).format('MM/DD/YYYY') : null
              }
              value={this.props.values.startDate}
              onChange={t => this.props.setFieldValue('startDate', t)}
              onBlur={() => this.props.setFieldTouched('startDate', true)}
            />
            <DateInput
              label="End Date"
              displayValue={
                this.props.values.endDate ? moment(this.props.values.endDate).format('MM/DD/YYYY') : null
              }
              value={this.props.values.endDate}
              onChange={t => this.props.setFieldValue('endDate', t)}
              onBlur={() => this.props.setFieldTouched('endDate', true)}
            />
            {(this.props.values.startDate || this.props.values.endDate) ? (
              <Chip onPress={this.clear} icon="close" />
            ) : null}
          </ChipList>
        </PaddedView>
        <PaddedView>
          <Button
            bordered
            pill
            onPress={this.props.handleSubmit}
            title="Filter Results"
            loading={this.props.isSubmitting}
          />
        </PaddedView>
      </View>
    );
  };

  render() {
    return (
      <StyledTableView responsive={false}>
        <Touchable
          onPress={this.toggle}
        >
          <Cell>
            <CellText><StyledH7>{'Filter Transactions'}</StyledH7></CellText>
            <StyledIcon
              name={this.state.isVisible ? 'close' : 'filter'}
              size={this.props.iconSize}
            />
          </Cell>
        </Touchable>
        {this.state.isVisible ? <Divider /> : null}
        {this.renderFilters()}
      </StyledTableView>
    );
  }
}

const enhance = compose(
  withTheme(({ theme, ...otherProps }) => ({
    iconSize: otherProps.iconSize || theme.helpers.rem(1),
  })),
  withFormik({
    mapPropsToValues: ({ startDate, endDate }) => ({
      startDate: startDate ? moment(startDate, 'MM/DD/YYYY').toDate() : null,
      endDate: endDate ? moment(endDate, 'MM/DD/YYYY').toDate() : null,
    }),
    validationSchema: Yup.object().shape({
      startDate: Yup.date(),
      endDate: Yup.date(),
    }),
    handleSubmit: async (formValues, { props, setSubmitting }) => {
      try {
        setSubmitting(true);
        props.onSubmit(formValues);
        setSubmitting(false);
      } catch (e) {
        // TODO: If there's an error, we want to stay on this page and display it.
        sentry.captureException(e);
      }
    },
  }),
);

export default enhance(ContributionHistoryFilter);
