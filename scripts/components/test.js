"use strict";

class Test1 {
  x = 1;
}

class Test2 extends Test1 {}

let o = new Test2();
console.log(Test2.prototype);
