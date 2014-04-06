function User (theName, theEmail) {
    this.name = theName;
    this.email = theEmail;
    this.quizScores = [];
    this.currentScore = 0;
}

User.prototype = {
    constructor: User,
    saveScore:function (theScoreToAdd)  {
        this.quizScores.push(theScoreToAdd)
    },
    showNameAndScores:function ()  {
        var scores = this.quizScores.length > 0 
            ? this.quizScores.join(",") : "No Scores Yet";
        return this.name + " Scores: " + scores;
    },
    changeEmail:function (newEmail)  {
        this.email = newEmail;
        return "New Email Saved: " + this.email;
    }
}
function Person(){
    this.name ="";
    this.age = 0;
}
Person.prototype ={
  constructor:Person,
  _string:function(){
      return this.name + this.age;
  }
}
function Report(){
    this.width = 578;
    this.height = 200;
    this.lines =[];
}
Report.prototype={
 constructor:Report,
 a:function(){},
 setWidth:function(w){this.width =w ;},
 addLine:function(line){
     this.lines.push(line)
 }
}
function Line(){
    this.left = 0;    
    this.top = 0 ;
    this.width = 500;
    this.height = 20;
    this.cells = [];
}
Line.prototype ={
    constructor:Line,
    addCell:function(cell){this.cells.push(cell);}
}
function Cell(){
    this.width=50;
    this.height = 20;
}
Cell.prototype={
    constructor:Cell,
    
}
function SampleReport(){
    this.report = new Report();
    var r = this.report ;
    var line;
    line = new Line();
    r.lines.push(new Cell());
    r.lines.push(new Cell());
    r.lines.push(new Cell());
    r.lines.push(new Cell());
    r.addLine(line);
    line = new Line();
    r.lines.push(new Cell());
    r.lines.push(new Cell());
    r.lines.push(new Cell());
    r.lines.push(new Cell());
    r.addLine(line);
    line.top += 20;
}
SampleReport.prototype={
    constructor:SampleReport,
}
function test_oop_inhr(){
      var Person = Class.extend({
            init: function(isDancing){
              this.dancing = isDancing;
            },
            dance: function(){
              return this.dancing;
            }
          });
           
      var Ninja = Person.extend({
        init: function(){
          this._super( false );
        },
        dance: function(){
          // Call the inherited version of dance()
          return this._super();
        },
        swingSword: function(){
          return true;
        }
      });
       
      var p = new Person(true);
      p.dance(); // => true
       
      var n = new Ninja();
      n.dance(); // => false
      n.swingSword(); // => true
       
      // Should all be true
      var r = p instanceof Person && p instanceof Class &&
         n instanceof Ninja && n instanceof Person && n instanceof Class;
      return r ;
}