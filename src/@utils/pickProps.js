import pick from 'lodash/pick';
import { mapProps } from 'recompose';

export default function pickProps(keys) {
  return mapProps(props => pick(props, keys));
}
