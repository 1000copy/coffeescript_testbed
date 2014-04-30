function extend(Child, Parent) {

　　var F = function(){};
　　F.prototype = Parent.prototype;
　　Child.prototype = new F();
　　Child.prototype.constructor = Child;
　　Child.uber = Parent.prototype;
}
function Animal(cat){
　　this.species = "动物";
　　if (aa !==undefined)
　　   this.species = cat;
}

// function Cat(name,color){
//     Animal.apply(this, arguments);
// 　　this.name = name;
// 　　this.color = color;
// }
function Cat(name,color,cat){
    Animal.apply(this, [cat]);
　　this.name = name;
　　this.color = color;
}
extend(Cat,Animal);
var cat1 = new Cat("大毛","黄色");
console.log(cat1.species);
var cat1 = new Cat("大毛","黄色","wangwang");
console.log(cat1.species);

// You can assign a different this object when calling an existing function.
//this refers to the current object, the calling object. With apply, you can 
//write a method once and then inherit it in another object, without having 
//to rewrite the method for the new object.
// 
