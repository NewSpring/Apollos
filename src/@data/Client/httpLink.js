import { createHttpLink } from 'apollo-link-http';

export default createHttpLink({ uri: process.ENV.HEIGHLINER_URL });
