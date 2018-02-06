import React, { PureComponent } from 'react';
import {
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { withProps, compose, withState } from 'recompose';
import get from 'lodash/get';
import { H6 } from '@ui/typography';
import FileSaver from '@utils/FileSaver';
import Icon from '@ui/Icon';
import styled from '@ui/styled';
import ActivityIndicator from '@ui/ActivityIndicator';
import base64ToBlob from '@utils/base64ToBlob';
import withGivingStatementDownloadLink from '@data/withGivingStatementDownloadLink';
import { withTheme } from '@ui/theme';

const CircularView = styled(({ theme }) => ({
  borderRadius: theme.sizing.baseUnit * 2,
  height: theme.sizing.baseUnit * 2,
  width: theme.sizing.baseUnit * 2,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.colors.primary,
}))(View);

const Row = styled({
  flexDirection: 'row',
  alignItems: 'center',
})(View);

const StyledIcon = withTheme(({ theme }) => ({
  size: theme.sizing.baseUnit * 1.25,
  fill: theme.colors.white,
}))(Icon);

class ContributionHistoryPrintButton extends PureComponent {
  static propTypes = {
    onPress: PropTypes.func,
    isDownloading: PropTypes.bool,
    hasError: PropTypes.string,
  };

  static defaultProps = {
    onPress() {},
    isDownloading: false,
    hasError: '',
  };

  render() {
    return (
      <Row>
        <H6>{this.props.hasError}</H6>
        <TouchableWithoutFeedback
          onPress={!this.props.isDownloading && this.props.onPress}
        >
          <CircularView>
            {this.props.isDownloading ? (
              <ActivityIndicator />
            ) : (
              <StyledIcon name="print" />
            )}
          </CircularView>
        </TouchableWithoutFeedback>
      </Row>
    );
  }
}

const enhance = compose(
  withGivingStatementDownloadLink,
  withState('isDownloading', 'setDownloading'),
  withState('hasError', 'setDownloadError'),
  withProps(props => ({
    async onPress() {
      props.setDownloadError('');
      props.setDownloading(true);
      const { data } = await props.getPDF(props.year);

      props.setDownloading(false);
      const file = get(data, 'transactionStatement.file');

      if (!file) {
        return props.setDownloadError('Unable to download');
      }

      // NOTE: This is failing in Holtzman/Heighliner
      // need to review Heighliner
      const blob = base64ToBlob(file);
      return FileSaver.saveAs(blob, 'NewSpring Church Giving Summary.pdf');
    },
  })),
);

export default enhance(ContributionHistoryPrintButton);
