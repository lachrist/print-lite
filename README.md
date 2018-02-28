# print-lite

Print JavaScript values, truncated and on a single line.
This module is resilient to change of the global object.

```js
const PrintLite = require("./index.js");
const value = {
  foo1: 123456789,
  foo2: {
    "123456789": NaN,
    bar: {a:"a"},
  },
  foo3: "foo3" 
};
const options = {
  width: 2,   // default 1
  depth: 3,   // default 2
  truncate: 5 // default 10 
};
console.log(PrintLite(value, options));
```
```
{"foo1":12345..., "foo2":{"12345...":NaN, "bar":{...}}, ...}
```