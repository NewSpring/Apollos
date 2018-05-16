// This does one thing:
// map website urls to in-app paths
import { Platform } from 'react-native';
import UrlPolyfill from 'url-parse';
import gql from 'graphql-tag';
import client from '@data/Client';

const isQueryRoute = (path) => {
  const queryRoutes = [
    '/articles/',
    '/sermons/',
    '/studies/',
    '/devotionals/',
    '/stories/',
    '/news/',
  ];

  if (queryRoutes.find(url => path.includes(url))) return path;
  return false;
};


const URL_TITLE_QUERY = gql`
  query contentWithUrlTitle(
    $parentChannel: String!
    $parentUrl: String!
    $childChannel: String = ""
    $childUrl: String = ""
    $hasChild: Boolean = false
  ) {
    parent: contentWithUrlTitle(channel: $parentChannel, urlTitle: $parentUrl)
    child: contentWithUrlTitle(channel: $childChannel, urlTitle: $childUrl) @include(if: $hasChild)
  }
`;

const withQuery = async (path) => {
  const pathArray = path.split('/').filter(Boolean);

  const channel = pathArray[0];
  let urlTitle = pathArray[1];
  let parent = '';

  if (pathArray.length === 3) {
    parent = pathArray[1]; // eslint-disable-line
    urlTitle = pathArray[2]; // eslint-disable-line
  }

  let parentChannelToUse = channel;
  let childChannelToUse = channel;

  switch (channel) {
    case 'sermons':
      parentChannelToUse = 'series_newspring';
      break;
    case 'studies':
      childChannelToUse = 'study_entries';
      break;
    default:
      break;
  }

  const {
    data,
  } = await client
    .query({
      query: URL_TITLE_QUERY,
      variables: {
        parentChannel: parentChannelToUse,
        parentUrl: parent || urlTitle,
        childChannel: parent ? childChannelToUse : '',
        childUrl: parent ? urlTitle : '',
        hasChild: parent,
      },
    });

  if (!data.parent) return null;

  switch (channel) {
    case 'sermons':
      if (data.child) {
        return `/series/${data.parent}/sermon/${data.child}`;
      }
      return `/series/${data.parent}`;
    case 'studies':
      if (data.child) {
        return `/${channel}/${data.parent}/entry/${data.child}`;
      }
      return `/${channel}/${data.parent}`;
    default:
      return `/${channel}/${data.parent}`;
  }
};

export default async (url) => {
  if (Platform.OS === 'web') return null; // currently on web we _always_ redirect to the external site.
  const u = new UrlPolyfill(url);
  const {
    pathname = null,
  } = u || {};

  switch (pathname) {
    case isQueryRoute(pathname):
      return withQuery(pathname);
    case '/watchandread':
      return '/';
    case '/sermons':
      return '/series';
    case '/series':
    case '/studies':
    case '/devotionals':
    case '/devotions':
    case '/music':
    case '/articles':
    case '/stories':
    case '/news':
    case '/groups':
    case '/give':
    case '/locations':
    case '/live':
    case '/settings':
      return pathname;
    default:
      return null; // don't understand path, fallback to opening browser
  }
};
