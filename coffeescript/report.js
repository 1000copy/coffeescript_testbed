
var Report = Class.extend({
      init: function(){
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
       var nl;
       for(i=0;i < 4;i++){
           var cell = new Cell();
           cell.left = i*cell.width;
           cell.top += this.top;
        //   log("cell.top"+this.top);
        //   log("cell.top"+cell.top);
           this.addCell(cell);
       }
    },
})
var SampleReport = Report.extend({
  init:function (){
       this._super();
       var r = this;
       var line;var i;
       for (i=0;i<4;i++){
           line =  new SampleLine();
        //   log("line.h"+line.height);
           line.top = i*line.height;
        //   log("line.t"+line.top);
           r.addLine(line);
       }
   },
});