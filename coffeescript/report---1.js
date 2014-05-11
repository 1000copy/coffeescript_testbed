function extend(Child, Parent) {

　　var F = function(){};
　　F.prototype = Parent.prototype;
　　Child.prototype = new F();
　　Child.prototype.constructor = Child;
　　Child.uber = Parent.prototype;
}
function Report(){
       this.width = this.DEFAULT_PAGE_WIDTH;
       this.height = this.DEFAULT_PAGE_HEIGHT;
       this.lines =[];
       this.margin = {left:10,top:10,right:10,bottom:10};
}
function Line(report){
    this.report = report ;
    this.left = 0;    
    this.top = 0 ;
    this.width = report.DEFAULT_LINE_WIDTH;
    this.height = report.DEFAULT_LINE_HEIGHT;
    this.cells = [];
}
function Cell(){
       this.width=50;
       this.height = 20;    
       this.text = "#"
}
Report.prototype.DEFAULT_LINE_HEIGHT = 20;
Report.prototype.DEFAULT_LINE_WIDTH = 300;
Report.prototype.DEFAULT_CELL_WIDTH = 50;
Report.prototype.DEFAULT_PAGE_WIDTH = 578;
Report.prototype.DEFAULT_PAGE_HEIGHT = 200;

Report.prototype.addLine= function(line){
       this.lines.push(line)
}
Report.prototype.relocateLineTop=function(){
  var i = 0;
  var pre_line = null;
  for(i= 0;i<this.lines.length;i++){
    var line = this.lines[i];
    if (pre_line !=null){
      line.top = pre_line.top + pre_line.height;
      line.relocateCellTop();
      // console.log(pre_line.top ,pre_line.height);
      pre_line = line;
    }
    else{
      pre_line = line;
    }

  }
}
Report.prototype.detailRange= function(){
  var lines = this.lines;var i;
  var start =0;
  for (i= 0;i<lines.length;i++){
    var line = lines[i];
    if (line.isDetailLine()){
      start = i;
      break;
    }
  }
  var end = lines.length - 1;
  for (i= lines.length-1;i>=0;i--){
    var line = lines[i];
    if (line.isDetailLine()){
      end = i;
      break;
    }
  }
  if (end >= start)return [start ,end];
  else return [];
}
Report.prototype.getLines=function(){
       return this.lines;
}
Line.prototype.relocateCellTop=function(){
  var i;
  for (i=0;i<this.cells.length;i++){
    var cell = this.cells[i];
    cell.top = this.top ;
  }
}
Line.prototype.render=function(record){
  var r = new Line();
  r.left = this.left;
  r.top = this.top;
  r.width = this.width;
  r.height = this.height;
  var i ;
  for (i=0;i<this.cells.length;i++)
    r.cells.push(this.cells[i].render(record));
  return r;
}
Line.prototype.addCell=function(cell){this.cells.push(cell);}
Line.prototype.isDetailLine=function(){
    var i;
//     console.log(this.cells.length);
    for (i=0;i<this.cells.length;i++){
        if (this.cells[i].isDetailCell()){
            return true;
        }
    }
    return false;
}
Line.prototype.default=function(){
  this.cells = [
    new Cell(this),
    new Cell(this),
    new Cell(this),
    new Cell(this)
  ];
  return this;
}
Line.prototype.defaultDetail=function(text){
  this.cells = [
    new Cell(this).defaultDetail(text),
    new Cell(this).defaultDetail(text),
    new Cell(this).defaultDetail(text),
    new Cell(this).defaultDetail(text)
  ];
  return this;
}
function Cell(line){
  this.line = line ;
  this.width=50;
  this.text = "-"
  this.cells = [];// sub cells
}
Cell.prototype.isDetailCell=function(){
    return this.text.indexOf("#")===0 ;
}
Cell.prototype.defaultDetail=function(text){
  this.text = text;
  return this;
}
Cell.prototype.render=function(record){
    var r = new Cell();
    r.width = this.width;
    r.text = this.text;
    if (r.text.indexOf("#") ===0){
        var fieldname = r.text.substring(1,r.text.length);
        if (fieldname in record){
            r.text = record[fieldname];
        }
    }
    return r;
}

function SimpleReport(){
       Report.apply(this, arguments);
       var r = this;
       var line;var i;
       for (i=0;i<4;i++){
           if (i!=1 && i!= 2 )
            line =  new SimpleLine();
           else
            line = new DetailLine();
           line.top = i*line.height;
           r.addLine(line);
       }
}
function  SimpleLine (){
       Line.apply(this, arguments);// Like super
       // this.addCell(null);
       var i;
       var nl;
       for(i=0;i < 4;i++){
           var cell;
           cell = new SimpleCell();
           cell.left = i*cell.width;
           cell.top += this.top;
           this.addCell(cell);
       }
}
function  DetailLine (){
       Line.apply(this, arguments);
       var i;
       var nl;
       for(i=0;i < 4;i++){
           var cell;
           cell = new DetailCell();
           cell.left = i*cell.width;
           cell.top += this.top;
           this.addCell(cell);
       }
}
function SimpleCell(){
       Cell.apply(this, arguments);
       this.text = "simple"
}
function DetailCell(){
       Cell.apply(this, arguments);
       this.text = "#field1"
}
function SimpleData(){
       this.content = [
           {field1:"line1"},
           {field1:2},
           {field1:3}
       ]
}

function SampleRender(report ,detaildata){
        this.detaildata = detaildata;
        this.lines = [];
        this.detailRange = {start:0,len:0}
        this.report = report ;
        this.baseline = 0 ;
}
SampleRender.prototype.getDetailRange=function(){
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
}
SampleRender.prototype.run=function(){
        this.detailRange = this.getDetailRange();
        this.lines = this.fillLines();
}
SampleRender.prototype.fillLines=function(){
        return this.fillHeadLines()
            .concat(this.fillDetailLines())
            .concat(this.fillTailLines());
}
SampleRender.prototype.fillHeadLines=function(){
        return this.cloneRange(0,this.detailRange.start-1);
}
SampleRender.prototype.fillDetailLines=function(){
        var answer = [];
        var i,j;
        // outer clone
        for (j=0;j<this.detaildata.content.length;j++){
            // inner clone
            for (i= this.detailRange.start;i<=this.detailRange.end;i++){
                var line = this.report.lines[i];
                var nl =  line.render(this.detaildata.content[j]);
                answer.push(nl);
            }    
        }
        return answer ;
}
SampleRender.prototype.fillTailLines=function(){
       return this.cloneRange(
                    this.detailRange.end+1,
                    this.report.lines.length-1);
}
SampleRender.prototype.cloneRange=function(start,end){
       var answer = [];
       var i;
       for (i=start;i<=end;i++){
       var line = this.report.lines[i];
       var nl =  line.render();
       answer.push(nl);
       }
       return answer ;
}
extend(SimpleReport,Report);
extend(SimpleCell,Cell);
extend(SimpleLine,Line);
extend(DetailLine,Line);
extend(DetailCell,Cell);

(function r(){
<<<<<<< HEAD
  var report_model = {
    lines:[
      {
        cells:[{},{},{},{}],
      },
      {
        cells:[{},{},{},{}],
      },
      {
        cells:[{},{},{},{}],
      },
      {
        cells:[{},{},{},{}],
      }
    ]
  };
  var rr = new SimpleReport();
  var d = new SimpleData();
  var s = new SampleRender(rr,d);
  s.run();
  var cc = console;
  cc.log("detail start :",s.detailRange.start," end:",s.detailRange.end);
  // render lines 
  cc.log(s.lines.length);
  var i;
  for(i=0;i<s.lines.length;i++){
   cc.log(s.lines[i].cells[0].text);
  }
});
=======
       var rr = new SimpleReport();
       var d = new SimpleData();
       var s = new SampleRender(rr,d);
       s.run();
       var cc = console;
       cc.log("detail start :",s.detailRange.start," end:",s.detailRange.end);
       // render lines 
       cc.log(s.lines.length);
       var i;
       for(i=0;i<s.lines.length;i++){
         cc.log(s.lines[i].cells[0].text);
       }
})();

>>>>>>> FETCH_HEAD

exports.test1=function(t){
  var r = new Report();
  r.lines = ([
    new Line(r).default(),
    new Line(r).defaultDetail("#field1"),
    new Line(r).defaultDetail("#field1"),
    new Line(r).default()
    ]);
  t.ok(r.lines.length ==4);
  t.ok(r.lines[0].cells.length ==4);
  t.ok(r.detailRange().toString()==[1,2].toString());
  r.relocateLineTop();
  t.ok(r.lines[0].top ==0*r.DEFAULT_LINE_HEIGHT);
  t.ok(r.lines[1].top ==1*r.DEFAULT_LINE_HEIGHT);
  t.ok(r.lines[2].top ==2*r.DEFAULT_LINE_HEIGHT);
  t.ok(r.lines[3].top ==3*r.DEFAULT_LINE_HEIGHT);
  t.ok(r.lines[1].cells[0].top ==1*r.DEFAULT_LINE_HEIGHT);
  t.ok(r.lines[2].cells[0].top ==2*r.DEFAULT_LINE_HEIGHT);
  t.ok(r.lines[3].cells[0].top ==3*r.DEFAULT_LINE_HEIGHT);
  t.ok(r.lines[1].cells[1].top ==1*r.DEFAULT_LINE_HEIGHT);
  t.ok(r.lines[1].cells[2].top ==1*r.DEFAULT_LINE_HEIGHT);
  t.ok(r.lines[1].cells[3].top ==1*r.DEFAULT_LINE_HEIGHT);
  t.done();
}



