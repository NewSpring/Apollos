// Removes keys with undefined values from an object
// module({ thing: undefined, data: 0 }) => { data: 0 }
import sentry from '@utils/sentry';

export default function (obj) {
  let returnValue;
  try {
    returnValue = JSON.parse(JSON.stringify(obj));
  } catch (e) {
    sentry.captureException(e);
  }
  return returnValue;
}
