console.log('index');
console.log('版本号');
let foo = require('../../utils/foo.js')
console.log(foo);  // Object
console.log(foo.variable); // 8
console.log(foo.sum(1)); // 7