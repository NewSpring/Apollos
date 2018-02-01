import { Constants } from 'expo';

export default Constants.linkingUri.endsWith('+') ? Constants.linkingUri : `${Constants.linkingUri}+`;
