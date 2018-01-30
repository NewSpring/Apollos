import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import moment from 'moment';
import Yup from 'yup';
import { compose } from 'recompose';
import { DateInput } from '@ui/inputs';
import Button from '@ui/Button';
import { H7 } from '@ui/typography';
import styled from '@ui/styled';
import Touchable from '@ui/Touchable';
import TableView, { Cell, CellText, CellIcon } from '@ui/TableView';
import Chip, { ChipList } from '@ui/Chip';
import { withTheme } from '@ui/theme';
import PaddedView from '@ui/PaddedView';

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
    touched: PropTypes.shape({
      startDate: PropTypes.bool,
      endDate: PropTypes.bool,
    }),
    errors: PropTypes.shape({
      startDate: PropTypes.string,
      endDate: PropTypes.string,
    }),
    setFieldValue: PropTypes.func,
    setFieldTouched: PropTypes.func,
    handleSubmit: PropTypes.func,
    isSubmitting: PropTypes.bool,
    iconSize: PropTypes.number,
  };

  static defaultProps = {
    values: {},
    touched: {},
    errors: {},
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
      <PaddedView>
        <Label>Date Range</Label>
        <ChipList>
          {this.dateRanges.map(({ key, startDate, endDate }) => {
            const selected = this.props.values.startDate === startDate &&
              this.props.values.endDate === endDate;
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
            error={this.props.touched.startDate && this.props.errors.startDate}
          />
          <DateInput
            label="End Date"
            displayValue={
              this.props.values.endDate ? moment(this.props.values.endDate).format('MM/DD/YYYY') : null
            }
            value={this.props.values.endDate}
            onChange={t => this.props.setFieldValue('endDate', t)}
            onBlur={() => this.props.setFieldTouched('endDate', true)}
            error={this.props.touched.endDate && this.props.errors.endDate}
          />
          {(this.props.values.startDate || this.props.values.endDate) ? (
            <Chip onPress={this.clear} icon="close" />
          ) : null}
        </ChipList>
        <Button
          bordered
          pill
          onPress={this.props.handleSubmit}
          title="Filter Results"
          loading={this.props.isSubmitting}
        />
      </PaddedView>
    );
  };

  render() {
    return (
      <TableView>
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
        {this.renderFilters()}
      </TableView>
    );
  }
}

const enhance = compose(
  withTheme(({ theme, ...otherProps }) => ({
    iconSize: otherProps.iconSize || theme.helpers.rem(1),
  })),
  withFormik({
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
        console.log(e);
      }
    },
  }),
);

export default enhance(ContributionHistoryFilter);
