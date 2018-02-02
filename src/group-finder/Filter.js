import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, ScrollView } from 'react-native';
import { compose, withProps } from 'recompose';
import { get, without, debounce } from 'lodash';
import pluralize from 'pluralize';

import withCampuses from '@data/withCampuses';
import withGroupAttributes from '@data/withGroupAttributes';
import { H4, H6, H7 } from '@ui/typography';
import Icon from '@ui/Icon';
import Chip, { ChipList } from '@ui/Chip';
import PaddedView from '@ui/PaddedView';
import styled from '@ui/styled';
import Touchable from '@ui/Touchable';
import { Text as TextInput } from '@ui/inputs';
import TableView, { FormFields } from '@ui/TableView';
import { enhancer as mediaQuery } from '@ui/MediaQuery';

const enhance = compose(
  withCampuses,
  withGroupAttributes,
);

const Filters = styled({ alignItems: 'center', paddingHorizontal: 0 })(PaddedView);
const List = styled({ alignItems: 'center', justifyContent: 'center' })(ChipList);

const NumResultsText = styled(({ theme }) => ({
  color: theme.colors.text.tertiary,
}))(H6);

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const Toolbar = compose(
  mediaQuery(({ md }) => ({ minWidth: md }), styled(({ theme }) => ({
    paddingHorizontal: theme.sizing.baseUnit,
    paddingTop: theme.sizing.baseUnit,
    paddingBottom: theme.sizing.baseUnit - (theme.sizing.baseUnit / 2),
  }))),
  styled(({ theme }) => ({
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.shadows.default,
    paddingHorizontal: theme.sizing.baseUnit / 2,
    paddingBottom: 0,
    paddingTop: theme.sizing.baseUnit / 2,
    backgroundColor: theme.colors.background.paper,
  })),
  withProps({
    showsHorizontalScrollIndicator: false,
    horizontal: true,
  }),
)(ScrollView);

const FilterLists = styled(({ theme }) => ({
  backgroundColor: theme.colors.background.paper,
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
    return this.props.campuses.filter(({ name = '' }) => {
      const campuses = get(this.props.query, 'campuses', []);
      return campuses.findIndex(campusId => campusId === name.toLowerCase()) >= 0;
    });
    // NOTE: Uncomment when Heighliner accepts id's
    // return this.props.campuses.filter(({ id }) => {
    //   const campuses = get(this.props.query, 'campuses', []);
    //   return campuses.findIndex(campusId => campusId === id) >= 0;
    // });
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
    value: campus.name.toLowerCase(), // NOTE: Change this when id's are supported in Heighliner
    // value: campus.id,
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
        </Toolbar>

        {this.state.showFilters ? (
          <FilterLists>
            <View>
              <Filters>
                <H4>Featured Tags</H4>
                <List>
                  {this.props.groupAttributes.map(this.renderTag)}
                </List>
              </Filters>
              <Filters>
                <H4>Day of Week</H4>
                <List>
                  {daysOfWeek.map(this.renderDay)}
                </List>
              </Filters>
              <Filters>
                <H4>Campuses</H4>
                <List>
                  {this.props.campuses.map(this.renderCampus)}
                </List>
              </Filters>
            </View>
          </FilterLists>
        ) : null}

        {(this.state.showSearch || this.props.query.q) ? (
          <TableView responsive={false}>
            <FormFields>
              <TextInput
                autoFocus
                placeholder="Search"
                value={this.state.searchText}
                onChangeText={this.handleTextSearch}
                prefix={<Icon name="search" />}
                suffix={
                  <H7 onPress={this.cancelSearch}>Cancel</H7>
                }
              />
            </FormFields>
          </TableView>
        ) : null}

        <SearchPrompt>
          <NumResultsText isLoading={this.props.isLoadingResults}>{pluralize('Result', this.props.numResults, true)}</NumResultsText>
          <Touchable onPress={this.toggleSearch}>
            <Icon isLoading={this.props.isLoadingResults} name="search" />
          </Touchable>
        </SearchPrompt>
      </View>
    );
  }
}

export default enhance(Filter);
