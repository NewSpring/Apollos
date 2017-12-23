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

class KeywordSelect extends PureComponent {
  static propTypes = {
    onChangeText: PropTypes.func.isRequired,
    keywords: PropTypes.arrayOf(PropTypes.string),
    value: PropTypes.string,
  };

  keywordIsInQuery(keyword) {
    const queryWords = words(this.props.value).map(word => word.toLocaleLowerCase());
    const matchWords = words(keyword).map(word => word.toLocaleLowerCase());
    return arrayIsSubsetOf(queryWords, matchWords);
  }

  toggleKeyword = (keyword) => {
    const selected = this.keywordIsInQuery(keyword);
    if (selected) return this.removeKeyword(keyword);
    return this.addKeyword(keyword);
  }

  removeKeyword = (keyword) => {
    const wordExp = words(keyword).join('(\\D|\\W)');

    let text = this.props.value.replace(
      new RegExp(`(\\W|\\D|(,(\\s|))|)${wordExp}`, 'gi'),
      '',
    );

    text = trim(text, ', ');
    this.props.onChangeText(text);
  }

  addKeyword = (keyword) => {
    let str = keyword;
    if (this.props.value && this.props.value.trim().length) str = `${this.props.value}, ${str}`;
    this.props.onChangeText(str);
  }

  renderKeyword = (keyword) => {
    const selected = this.keywordIsInQuery(keyword);
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
