import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { compose } from 'recompose';
import { get, without, debounce } from 'lodash';
import pluralize from 'pluralize';
import Placeholder from 'rn-placeholder';

import withCampuses from '@data/withCampuses';
import withGroupAttributes from '@data/withGroupAttributes';
import { H4, H6, UIText } from '@ui/typography';
import Icon from '@ui/Icon';
import Chip, { ChipList } from '@ui/Chip';
import PaddedView from '@ui/PaddedView';
import styled from '@ui/styled';
import Touchable from '@ui/Touchable';
import { withTheme } from '@ui/theme';
import { Text as TextInput } from '@ui/inputs';

const enhance = compose(
  withTheme(),
  withCampuses,
  withGroupAttributes,
);

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const Toolbar = styled(({ theme }) => ({
  borderBottomWidth: StyleSheet.hairlineWidth,
  borderBottomColor: theme.colors.shadows.default,
  paddingHorizontal: theme.sizing.baseUnit / 2,
  paddingBottom: 0,
  paddingTop: theme.sizing.baseUnit / 4,
}))(PaddedView);

const SearchPrompt = styled({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
})(PaddedView);

class Filter extends PureComponent {
  static propTypes = {
    groupAttributes: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      value: PropTypes.string,
    })),
    campuses: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.string,
    })),
    query: PropTypes.shape({
      tags: PropTypes.arrayOf(PropTypes.string),
      q: PropTypes.string,
    }),
    onUpdateFilter: PropTypes.func,
    numResults: PropTypes.number,
    isLoadingResults: PropTypes.bool,
    theme: PropTypes.shape({ helpers: PropTypes.shape({ rem: PropTypes.func }) }),
  }

  static defaultProps = {
    groupAttributes: [],
    campuses: [],
  }

  state = {
    showFilters: false,
    showSearch: get(this.props, 'query.q', '').length,
    searchText: get(this.props, 'query.q', ''),
  }

  get selectedTags() {
    return this.props.groupAttributes.filter(({ value }) => {
      const sanitizedValue = value.toLowerCase();
      const tags = get(this.props.query, 'tags', []);
      return tags.indexOf(sanitizedValue) >= 0;
    });
  }

  get selectedDays() {
    return daysOfWeek.filter((value) => {
      const sanitizedValue = value.toLowerCase();
      const days = get(this.props.query, 'schedules', []);
      return days.indexOf(sanitizedValue) >= 0;
    });
  }

  get selectedCampuses() {
    return this.props.campuses.filter(({ id }) => {
      const campuses = get(this.props.query, 'campuses', []);
      return campuses.findIndex(campusId => campusId === id) >= 0;
    });
  }

  toggleFilterView = () => {
    this.setState({ showFilters: !this.state.showFilters });
  }

  handleToggle = (filter, value) => {
    const filterObject = get(this.props.query, filter, []);
    const selected = filterObject.indexOf(value) >= 0;

    if (selected) {
      this.props.onUpdateFilter({ [filter]: without(filterObject, value) });
    } else {
      this.props.onUpdateFilter({ [filter]: [...filterObject, value] });
    }
  }

  queueUpdate = (update) => {
    if (!this.queuedUpdate) this.queuedUpdate = {};
    this.queuedUpdate = { ...this.queuedUpdate, ...update };
    this.debouncedUpdate();
  }

  debouncedUpdate = debounce(() => {
    this.props.onUpdateFilter(this.queuedUpdate);
    this.queuedUpdate = {};
  }, 500);

  handleTextSearch = (text) => {
    this.setState({ searchText: text });
    this.queueUpdate({ q: text });
  }

  cancelSearch = () => {
    this.queueUpdate({ q: '' });
    this.setState({ showSearch: false, searchText: '' });
  }

  toggleSearch = () => {
    this.setState({ showSearch: !this.state.showSearch });
  }

  renderFilter = ({
    filter, value, key, displayValue,
  }) => {
    if (!key) key = value; // eslint-disable-line
    if (!displayValue) displayValue = value; // eslint-disable-line
    const selected = get(this.props.query, filter, []).indexOf(value.toLowerCase()) >= 0;
    return (
      <Chip
        key={key}
        title={displayValue}
        selected={selected}
        icon={selected ? 'close' : undefined}
        onPress={() => this.handleToggle(filter, value)}
      />
    );
  };

  renderTag = tag => this.renderFilter({
    filter: 'tags',
    displayValue: tag.value,
    value: tag.value.toLowerCase(),
    key: tag.id,
  });

  renderDay = day => this.renderFilter({
    filter: 'schedules',
    displayValue: day,
    value: day.toLowerCase(),
  });

  renderCampus = campus => this.renderFilter({
    filter: 'campuses',
    displayValue: campus.name,
    value: campus.id,
    key: campus.id,
    toggle: this.handleCampusToggle,
  });

  render() {
    return (
      <View>
        <Toolbar>
          <ChipList>
            {this.selectedTags.map(this.renderTag)}
            {this.selectedDays.map(this.renderDay)}
            {this.selectedCampuses.map(this.renderCampus)}
            <Chip
              title="filter"
              onPress={this.toggleFilterView}
              icon={this.state.showFilters ? 'arrow-up' : 'arrow-down'}
            />
          </ChipList>

          {this.state.showFilters ? (
            <View>
              <H4>Featured Tags</H4>
              <ChipList>
                {this.props.groupAttributes.map(this.renderTag)}
              </ChipList>

              <H4>Day of Week</H4>
              <ChipList>
                {daysOfWeek.map(this.renderDay)}
              </ChipList>

              <H4>Campuses</H4>
              <ChipList>
                {this.props.campuses.map(this.renderCampus)}
              </ChipList>
            </View>
          ) : null}

        </Toolbar>

        {(this.state.showSearch || this.props.query.q) ? (
          <Toolbar>
            <TextInput
              placeholder="Find a group by name, campus, zipcode, or description"
              value={this.state.searchText}
              onChangeText={this.handleTextSearch}
              prefix={<Icon name="search" />}
              suffix={
                <UIText onPress={this.cancelSearch}>Cancel</UIText>
              }
            />
          </Toolbar>
        ) : null}

        <SearchPrompt>
          <Placeholder.Line
            width={'40%'}
            textSize={this.props.theme.helpers.rem(1.4)}
            onReady={!this.props.isLoadingResults}
          >
            <H6>{pluralize('Result', this.props.numResults, true)}</H6>
          </Placeholder.Line>
          <Touchable onPress={this.toggleSearch}>
            <Icon name="search" />
          </Touchable>
        </SearchPrompt>
      </View>
    );
  }
}

export default enhance(Filter);
