// model report
var Report = Class.extend({
      init: function(){
        this.width = 578;
        this.height = 200;
        this.lines =[];
        this.margin = {left:10,top:10,right:10,bottom:10};
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
        this.text = "-"
    },
})

// sample report 
var SampleCell= Cell.extend({
    init:function(){
        this._super();
        this.text = "sample";
    }
})
var DetailCell= Cell.extend({
    init:function(){
        this._super();
        this.text = "#field1";
    }
})
var SampleLine = Line.extend({
    init:function(){
       this._super();
       var i;
       var nl;
       for(i=0;i < 4;i++){
           var cell;
           cell = new SampleCell();
           cell.left = i*cell.width;
           cell.top += this.top;
           this.addCell(cell);
       }
    },
})
var DetailLine = Line.extend({
    init:function(){
       this._super();
       var i;
       var nl;
       for(i=0;i < 4;i++){
           var cell;
           cell = new DetailCell();
           cell.left = i*cell.width;
           cell.top += this.top;
           this.addCell(cell);
       }
    },
})
var SampleModel = Report.extend({
  init:function (){
       this._super();
       var r = this;
       var line;var i;
       for (i=0;i<4;i++){
           if (i!=1)
            line =  new SampleLine();
           else
            line = new DetailLine();
           line.top = i*line.height;
           r.addLine(line);
       }
   },
})

var SampleRender = Class.extend({
    
})



//

// footer