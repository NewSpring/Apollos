export default function identifyCategory(item) {
  const category = item.channelName;

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
        category: category.replace(/(.)(?=.*\1)/g, ''),
      };
    }
  }
}
