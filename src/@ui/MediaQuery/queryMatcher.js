const queryMatcher = ({ width, height }) => (selector, query) => {
  switch (query) {
    case 'maxWidth': return width < selector;
    case 'minWidth': return width > selector;
    case 'maxHeight': return height < selector;
    case 'minHeight': return height > selector;
    case 'minDeviceAspectRatio': return width / height > selector;
    case 'maxDeviceAspectRatio': return width / height < selector;
    default: return true;
  }
};

export default queryMatcher;
