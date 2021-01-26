import 'core-js/modules/es.object.to-string.js';
import 'core-js/modules/es.promise.js';
// import './style.less'
// import '@babel/polyfill';
import './a.css';

const add = function add(x, y) {
  return x + y;
};

console.log(add(5, 6));
const a = 100;
console.log(a);
new Promise((resolve, reject) => {
  resolve();
});
