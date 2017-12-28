import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Animated, StyleSheet, View } from 'react-native';
import { compose } from 'recompose';
import { get, without } from 'lodash';

import withCampuses from '@data/withCampuses';
import withGroupAttributes from '@data/withGroupAttributes';
import { H4 } from '@ui/typography';
import Chip, { ChipList } from '@ui/Chip';
import PaddedView from '@ui/PaddedView';
import styled from '@ui/styled';

const enhance = compose(
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
    }),
    onUpdateFilter: PropTypes.func,
  }

  state = {
    showFilters: false,
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
      return campuses.findIndex(campus => campus.id === id) >= 0;
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
        </Toolbar>

        {this.state.showFilters ? (
          <PaddedView>
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
          </PaddedView>
        ) : null}
      </View>
    );
  }
}

export default enhance(Filter);
