import { get } from 'lodash';

const getLinkPath = (contentItem) => {
  if (!contentItem || typeof contentItem !== 'object') return '#';
  const id = contentItem.id || contentItem.id;
  const category = contentItem.channelName;
  const seriesId = contentItem.parent && (contentItem.parent.id || contentItem.parent.id);

  if (contentItem && contentItem.__typename === 'Group') { // eslint-disable-line
    return `/groups/${id}`;
  }

  switch (category) {
    case 'series_newspring':
      return `/series/${id}`;
    case 'sermons':
      return `/series/${seriesId}/sermon/${id}`;
    case 'studies':
      return `/studies/${id}`;
    case 'study_entries':
      return `/studies/${seriesId}/entry/${id}`;
    case 'devotionals':
      return `/devotions/${id}`;
    case 'newspring_albums':
      return `/music/${id}`;
    case 'articles':
      return `/articles/${id}`;
    case 'stories':
      return `/stories/${id}`;
    case 'news':
      return `/news/${id}`;
    case 'newspring_now':
      return `/events/${id}`;
    default:
      return get(contentItem, 'meta.urlTitle', '#');
  }
};

export default getLinkPath;
