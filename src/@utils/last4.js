export default function (str = '') {
  // even though it's initialized, it can still be passed in as null
  const safeStr = str || '';
  return safeStr.slice(safeStr.length - 4, safeStr.length);
}
