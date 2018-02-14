import { createHttpLink } from 'apollo-link-http';
// import Settings from '@utils/Settings';

// export default createHttpLink({ uri: Settings.APP_HEIGHLINER_URL });
export default createHttpLink({ uri: 'http://192.168.1.40:8888/graphql' });
