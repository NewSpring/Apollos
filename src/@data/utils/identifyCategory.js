export default function identifyCategory(item) {
  if (!item) return item;
  const category = item.channelName;

  if (item && item.__typename === 'Group') { // eslint-disable-line
    return {
      ...item,
      category: 'groups',
    };
  }

  switch (category) {
    case 'study_entries':
      return {
        ...item,
        category: 'devotionals',
      };
    case 'series_newspring':
      return {
        ...item,
        category: 'series',
      };
    case 'newspring_albums':
      return {
        ...item,
        category: 'albums',
      };
    case 'newspring_now':
      return {
        ...item,
        category: 'events',
      };
    case 'promotions_newspring':
      return {
        ...item,
        category: 'need to know', // NOTE: this is very odd
      };
    default: {
      return {
        ...item,
        // Prevents duplicate letters at end of string
        // this logic exists for articles for some reason
        category: category && category.replace && category.replace(/(.)(?=\1)/g, ''),
      };
    }
  }
}
