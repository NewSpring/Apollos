import { createHttpLink } from 'apollo-link-http';
import Settings from '@utils/Settings';

export default createHttpLink({ uri: Settings.APP_HEIGHLINER_URL });
