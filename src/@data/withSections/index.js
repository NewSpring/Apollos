import { graphql } from 'react-apollo';
import { Platform } from 'react-native';
import { find, map } from 'lodash';
import sectionsQuery from './sectionsQuery';

// All of this logic likely belongs in Heighliner
const extractImage = (item, sections) => {
  if (item.image) return item.image;

  // this is a weird way to do this, but was taken from Holtzman
  let key = item.text.toLowerCase();

  // this was also in holtzman, not sure if still needed:
  if (key.includes('studies')) key = 'studies';
  if (key.includes('devotionals')) key = 'studies';

  if (sections[key] && sections[key][0].content) {
    const { images } = sections[key][0].content;
    if (!images.length) return null;

    // prefer 1x1 image
    const oneByOne = find(images, image => image.label === '1:1');
    if (oneByOne) return oneByOne.url;

    // fall back to 2x1
    const twoByOne = find(images, image => image.label === '2:1');
    if (twoByOne) return twoByOne.url;

    const defaultImage = find(images, image => image.label === 'default');
    if (defaultImage) return defaultImage.url;

    return images[0].url;
  }

  return null;
};

const filterNavigation = (data) => {
  const { navigation, ...sections } = data;
  return map(navigation, item => ({
    ...item,
    image: (extractImage(item, sections) || '').replace(/^http:\/\/|^\/\/|^https:\/\//i, 'https://'), // require secure urls
  }));
};

export default graphql(sectionsQuery, {
  options: (ownProps = {}) => ({
    variables: {
      site: Platform.OS === 'web' ? 'newspring-main' : 'newspring-app', // todo
      skip: ownProps.skip || 0,
    },
  }),
  props: ({ data, ownProps } = {}) => ({
    navigation: filterNavigation(data),
    isLoading: ownProps.isLoading || data.loading,
  }),
});
