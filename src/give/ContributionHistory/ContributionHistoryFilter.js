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
import { ChipList } from '@ui/Chip';
import { withTheme } from '@ui/theme';
import PaddedView from '@ui/PaddedView';

const StyledH7 = styled(({ theme }) => ({
  color: theme.colors.text.secondary,
}))(H7);

const StyledIcon = withTheme(({ theme }) => ({
  fill: theme.colors.text.secondary,
}))(CellIcon);

class ContributionHistoryFilter extends PureComponent {
  static propTypes = {
    values: PropTypes.shape({
      startDate: PropTypes.string,
      endDate: PropTypes.string,
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

  renderFilters = () => {
    if (!this.state.isVisible) return null;
    return (
      <PaddedView>
        <H7>Custom Dates</H7>
        <ChipList>
          <DateInput
            label="Start Date"
            displayValue={
              this.props.values.startDate ? moment(this.props.values.startDate).format('MM/DD/YYYY') : null
            }
            value={this.props.values.startDate}
            onChangeText={t => this.props.setFieldValue('startDate', t)}
            onBlur={() => this.props.setFieldTouched('startDate', true)}
            error={this.props.touched.startDate && this.props.errors.startDate}
          />
          <DateInput
            label="End Date"
            displayValue={
              this.props.values.endDate ? moment(this.props.values.endDate).format('MM/DD/YYYY') : null
            }
            value={this.props.values.endDate}
            onChangeText={t => this.props.setFieldValue('endDate', t)}
            onBlur={() => this.props.setFieldTouched('endDate', true)}
            error={this.props.touched.endDate && this.props.errors.endDate}
          />
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
      startDate: Yup.string(),
      endDate: Yup.string(),
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
