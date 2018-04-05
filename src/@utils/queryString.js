import queryString from 'query-string';

const defaultOptions = {
  arrayFormat: 'bracket',
};

const parse = (object, opts = {}) => (
  queryString.parse(object, { ...defaultOptions, ...opts })
);

const stringify = (object, opts = {}) => (
  queryString.stringify(object, { ...defaultOptions, ...opts })
);

export { parse, stringify };
