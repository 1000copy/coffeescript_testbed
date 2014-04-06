
var Report = Class.extend({
      init: function(isDancing){
        this.width = 578;
        this.height = 200;
        this.lines =[];
      },
      addLine: function(line){
        this.lines.push(line)
      },
      getLines:function(){
          return this.lines;
      }
    });
var Line = Class.extend({
    init:function(){
        this.left = 0;    
        this.top = 0 ;
        this.width = 500;
        this.height = 20;
        this.cells = [];
    },
    addCell:function(cell){this.cells.push(cell);}
})     
var Cell = Line.extend({
    init:function(){
        this._super();
        this.left = 10;    
        this.top = 10 ;
        this.width=50;
        this.height = 20;    
    },
})
var SampleLine = Line.extend({
    init:function(){
       this._super();
       var i;
       for(i=0;i<=3;i++)
        this.addCell(new Cell());    
    },
})
var SampleReport = Report.extend({
  init:function (){
       this._super();
       var r = this;
       var line;
       r.addLine(new SampleLine());
       line = new SampleLine();
       r.addLine(line);
       line.top += 20;
   },
});