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
      let contentCategory = category;
      // XXX this handles the case of `articless` but not `articles`
      // i think this is wrong
      if (category.charAt(category.length - 2) === 's') {
        // capitlize first letter and remove "s" from end
        contentCategory += category.substr(1, category.length - 2);
      } else {
        contentCategory += category.substr(1, category.length - 1);
      }
      return {
        ...item,
        category: contentCategory,
      };
    }
  }
}
