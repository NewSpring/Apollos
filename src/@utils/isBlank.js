import _isFinite from 'lodash/isFinite';
import isString from 'lodash/isString';
import isEmpty from 'lodash/isEmpty';

export default value => !(_isFinite(value) || (!isEmpty(value) && isString(value)));
