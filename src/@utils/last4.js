export default function (str = '') {
  // even though it's initialized, it can still be passed in as null
  let safeStr = str;
  if (safeStr === null) safeStr = '';
  return safeStr.slice(safeStr.length - 4, safeStr.length);
}
