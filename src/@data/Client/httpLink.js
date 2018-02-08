import { createHttpLink } from 'apollo-link-http';

export default createHttpLink({ uri: process.env.HEIGHLINER_URL });
