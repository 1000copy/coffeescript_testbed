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
    this.right = 578-10;
    this.bottom = 200-100;
}
Line.prototype ={
    constructor:Line,
}

