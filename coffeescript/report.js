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
    clone:function(record){
      var r = new Line();
      r.left = this.left;
      r.top = this.top;
      r.width = this.width;
      r.height = this.height;
      var i ;
      for (i=0;i<this.cells.length;i++)
        r.cells.push(this.cells[i].clone(record));
      return r;
    },
    addCell:function(cell){this.cells.push(cell);},
    isDetailLine:function(){
        var i;
        for (i=0;i<this.cells.length;i++){
            if (this.cells[i].isDetailCell()){
                return true;
            }
        }
        return false;
    }
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
    isDetailCell:function(){
        return this.text.indexOf("#")===0 ;
    },
    clone:function(record){
        var r = new Cell();
        r.left = this.left;
        r.top = this.top;
        r.width = this.width;
        r.height = this.height;   
        r.text = this.text;
        if (r.text.indexOf("#") ===0){
            var fieldname = r.text.substring(1,r.text.length);
            if (fieldname in record){
                // r.text = record.fieldname;
                r.text = record[fieldname];
            }
        }
          
        return r;
    }
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
           if (i!=1 && i!= 2 )
            line =  new SampleLine();
           else
            line = new DetailLine();
           line.top = i*line.height;
           r.addLine(line);
       }
   },
})
var SampleData = Class.extend({
    init:function(){
        this.content = [
            {field1:"line1"},
            {field1:2},
            {field1:3}
        ]
    }
})
var SampleRender = Class.extend({
    init:function(report ,detaildata){
        this.detaildata = detaildata;
        this.lines = [];
        this.detailRange = {start:0,len:0}
        this.report = report ;
        this.baseline = 0 ;
    },
    getDetailRange:function(){
        var r = {start:0,len:0};var i;
        // from start to end 
        for(i=0;i<this.report.lines.length;i++){
            var line = this.report.lines[i];
            if (line.isDetailLine()){
               r.start = i;
               break;
            }
        }
        // from end to start
        for(i=this.report.lines.length-1;i>=0;i--){
            var line = this.report.lines[i];
            if (line.isDetailLine()){
               r.end = i;
               break;
            }
        }
        return r;
    },
    run:function(){
        this.detailRange = this.getDetailRange();
        this.lines = this.fillLines();
    },
    fillLines:function(){
        return this.fillHeadLines()
            .concat(this.fillDetailLines())
            .concat(this.fillTailLines());
    },
    fillHeadLines:function(){
        return this.cloneRange(0,this.detailRange.start-1);
    },
    fillDetailLines:function(){
        var answer = [];
        var i,j;
        // outer clone
        for (j=0;j<this.detaildata.content.length;j++){
            // inner clone
            for (i= this.detailRange.start;i<=this.detailRange.end;i++){
                var line = this.report.lines[i];
                var nl =  line.clone(this.detaildata.content[j]);
                answer.push(nl);
            }    
        }
        return answer ;
    },
    fillTailLines:function(){
       return this.cloneRange(
                    this.detailRange.end+1,
                    this.report.lines.length-1);
    },
    cloneRange:function(start,end){
        var answer = [];
        var i;
        for (i=start;i<=end;i++){
            var line = this.report.lines[i];
            var nl =  line.clone();
            answer.push(nl);
        }
        return answer ;
    },
});



//

// footer