import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { every, words, trim } from 'lodash';
import { Text as TextInput } from '@ui/inputs';
import Chip from '@ui/Chip';
import styled from '@ui/styled';

const KeywordList = styled({
  flexDirection: 'row',
  flexWrap: 'wrap',
}, 'GroupSearchForm.KeywordSelect.List')(View);

// Checks if the second array given is contained, in order, inside the first array
// [0,1,2,3], [1,2,3] === true
// [0,1,2,3], [3,2,1] === false
// [0,1,3], [1,2,3] === false
const arrayIsSubsetOf = (array, check) => array.find((word, index) => (
  every(check, (checkWord, checkIndex) => checkWord === array[index + checkIndex])
));

export const keywordIsInQuery = (query, keyword) => {
  const queryWords = words(query).map(word => word.toLocaleLowerCase());
  const matchWords = words(keyword).map(word => word.toLocaleLowerCase());
  return arrayIsSubsetOf(queryWords, matchWords);
};

export const stripKeywordFromQuery = (query, keyword) => {
  const wordExp = words(keyword).join('(\\D|\\W)');

  const strippedText = query.replace(
    new RegExp(`(\\W|\\D|(,(\\s|))|)${wordExp}`, 'gi'),
    '',
  );

  return trim(strippedText, ', ');
};

class KeywordSelect extends PureComponent {
  static propTypes = {
    onChangeText: PropTypes.func.isRequired,
    keywords: PropTypes.arrayOf(PropTypes.string),
    value: PropTypes.string,
  };

  toggleKeyword = (keyword) => {
    const selected = keywordIsInQuery(this.props.value, keyword);
    if (selected) return this.removeKeyword(keyword);
    return this.addKeyword(keyword);
  }

  removeKeyword = (keyword) => {
    this.props.onChangeText(stripKeywordFromQuery(this.props.value, keyword));
  }

  addKeyword = (keyword) => {
    let str = keyword;
    if (this.props.value && this.props.value.trim().length) str = `${this.props.value}, ${str}`;
    this.props.onChangeText(str);
  }

  renderKeyword = (keyword) => {
    const selected = keywordIsInQuery(this.props.value, keyword);
    return (
      <Chip
        title={keyword}
        key={keyword}
        selected={selected}
        onPress={() => this.toggleKeyword(keyword)}
        icon={selected ? 'close' : undefined}
      />
    );
  }

  render() {
    const {
      keywords,
      ...textInputProps
    } = this.props;
    return (
      <View>
        <TextInput {...textInputProps} />
        <KeywordList>
          {keywords.map(this.renderKeyword)}
        </KeywordList>
      </View>
    );
  }
}

export default KeywordSelect;
