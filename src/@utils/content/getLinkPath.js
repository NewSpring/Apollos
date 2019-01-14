import { get } from 'lodash';

const getLinkPath = (contentItem) => {
  if (!contentItem || typeof contentItem !== 'object') return '#';
  const id = contentItem.id || contentItem.id;
  const title = contentItem.title || '';
  const category = contentItem.channelName;
  const seriesId = contentItem.parent && (contentItem.parent.id || contentItem.parent.id);

  if (contentItem && contentItem.__typename === 'Group') { // eslint-disable-line
    return `/groups/${id}`;
  }

  switch (category) {
    case 'series_newspring':
      return `/series/${title || id}`;
    case 'sermons':
      return `/series/${seriesId}/sermon/${title || id}`;
    case 'studies':
      return `/studies/${title || id}`;
    case 'study_entries':
      return `/studies/${seriesId}/entry/${title || id}`;
    case 'devotionals':
      return `/devotions/${title || id || id}`;
    case 'newspring_albums':
      return `/music/${title || id}`;
    case 'articles':
      return `/articles/${title || id}`;
    case 'stories':
      return `/stories/${title || id}`;
    case 'news':
      return `/news/${title || id}`;
    case 'newspring_now':
      return `/events/${title || id}`;
    default:
      return get(contentItem, 'meta.urlTitle', '#');
  }
};

export default getLinkPath;
