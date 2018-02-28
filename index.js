const String = global.String;
const String_prototype_substring = global.String.prototype.substring;
const Reflect_apply = global.Reflect.apply;
const Reflect_ownKeys = global.Reflect.ownKeys;
const JSON_stringify = global.JSON.stringify;
const Array_isArray = global.Array.isArray;
const Math_min = global.Math.min;

const cut = (string, truncate) => {
  if (string.length <= truncate)
    return string;
  string = new String(string);
  string.substring = String_prototype_substring;
  return string.substring(0, truncate) + "...";
};

const loop = (value, width, depth, truncate) => {
  if (typeof value === "string")
    return JSON_stringify(cut(value, truncate));
  if (typeof value === "function")
    return "function("+cut(value.name||"")+")";
  if (Array_isArray(value)) {
    depth--;
    if (value.length === 0)
      return "[]";
    if (depth === 0)
      return "[...]";
    let string = "[" + loop(value[0], width, depth, truncate);
    for (let index = 1, length = Math_min(value.length, width); index < length; index++)
      string += ", " + loop(value[index], width, depth, truncate);
    if (value.length > width)
      string += ", ...";
    return string + "]";
  }
  if (typeof value === "object" && value !== null) {
    depth--;
    const keys = Reflect_ownKeys(value);
    if (keys.length === 0)
      return "{}";
    if (depth === 0)
      return "{...}";
    let string = "{" + JSON_stringify(cut(keys[0], truncate)) + ":" + loop(value[keys[0]], width, depth, truncate);
    for (let index = 1, length = Math_min(keys.length, width); index < length; index++)
      string += ", " + JSON_stringify(cut(keys[index], truncate)) + ":" + loop(value[keys[index]], width, depth, truncate);
    if (keys.length > width)
      string += ", ...";
    return string + "}";
  }
  return cut(String(value), truncate);
};

module.exports = (value, options) => loop(
  value,
  options && "width" in options ? options.width : 1,
  options && "depth" in options ? options.depth : 2,
  options && "truncate" in options ? options.truncate : 10);
