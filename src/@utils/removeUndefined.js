// Removes keys with undefined values from an object
// module({ thing: undefined, data: 0 }) => { data: 0 }
export default function (obj) {
  return JSON.parse(JSON.stringify(obj));
}
