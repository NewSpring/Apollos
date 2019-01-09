export default function (str) {
  // needs to be initialized the old way for compatibility
  let safeStr = str;
  if (safeStr === null) safeStr = '';
  return safeStr.slice(safeStr.length - 4, safeStr.length);
}
