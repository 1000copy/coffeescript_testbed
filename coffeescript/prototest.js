exports.t1=function(t){
  function foo(){
    this.p1 =1;
  } 
  var a = new foo();
  foo.__proto__ = {};
  var b = new foo();
  console.log(a.__proto__);
  console.log(b.__proto__);
  t.equal({},b.__proto__,"");
  t.equal({},a.__proto__,"");
  t.done();
}