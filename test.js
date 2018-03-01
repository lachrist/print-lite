const PrintLite = require("./index.js");
const options = {depth:3, width:4, truncate:5};
console.log(PrintLite(Symbol("123456789"), options));
console.log(PrintLite("123456789", options));
console.log(PrintLite(NaN, options));
console.log(PrintLite(123456789, options));
console.log(PrintLite(["foo", ["bar", ["qux", [1,2,3]], "bar"], "foo"], options));
console.log(PrintLite({foo1:"foo", foo2:{bar1:"bar", bar2:{qux2:"qux", qux2:{a:"a"}}}}, options));
console.log(PrintLite(function $123456789 () {}, options));