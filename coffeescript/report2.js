function extend(Child, Parent) {

　　var F = function(){};
　　F.prototype = Parent.prototype;
　　Child.prototype = new F();
　　Child.prototype.constructor = Child;
　　Child.uber = Parent.prototype;
}
function Report(){
       this.width = 578;
       this.height = 200;
       this.lines =[];
       this.margin = {left:10,top:10,right:10,bottom:10};
}
function Line(){
    this.left = 0;    
    this.top = 0 ;
    this.width = 500;
    this.height = 20;
    this.cells = [];
}
function Cell(){
       this.width=50;
       this.height = 20;    
       this.text = "#"
}
Report.prototype.addLine= function(line){
       this.lines.push(line)
}
Report.prototype.getLines=function(){
       return this.lines;
}
Report.prototype.fromModel=function(model){
  if (model.hasOwnProperty("lines")){var i;
    for(i= 0;i<model.lines.length;i++){
      var line = new Line();
      line.fromModel(model.lines[i]);
      this.lines.push(line);
    }
  }
}
Line.prototype.fromModel=function(model){
 if (model.hasOwnProperty("cells")){var i;
    for(i= 0;i<model.cells.length;i++){
      var cell = new Cell();
      cell.fromModel(model.cells[i]);
      this.cells.push(cell);
    }
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
function Cell(){
       this.width=50;
       this.text = "-"
       this.cells = [];// sub cells
}
Cell.prototype.fromModel=function(model){
 if (model.hasOwnProperty("text")){        
    this.text = model.text;   
  } 
  if (model.hasOwnProperty("width")){        
    this.width = model.width;   
  } 
}
Cell.prototype.isDetailCell=function(){
    return this.text.indexOf("#")===0 ;
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


function Render(report ,detaildata){
        this.detaildata = detaildata;
        this.lines = [];
        this.detailRange = {start:0,len:0}
        this.report = report ;
        this.baseline = 0 ;
}
Render.prototype.getDetailRange=function(){
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
Render.prototype.run=function(){
        this.detailRange = this.getDetailRange();
        this.lines = this.fillLines();
}
Render.prototype.fillLines=function(){
        return this.fillHeadLines()
            .concat(this.fillDetailLines())
            .concat(this.fillTailLines());
}
Render.prototype.fillHeadLines=function(){
        return this.cloneRange(0,this.detailRange.start-1);
}
Render.prototype.fillDetailLines=function(){
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
Render.prototype.fillTailLines=function(){
       return this.cloneRange(
                    this.detailRange.end+1,
                    this.report.lines.length-1);
}
Render.prototype.cloneRange=function(start,end){
       var answer = [];
       var i;
       for (i=start;i<=end;i++){
       var line = this.report.lines[i];
       var nl =  line.render();
       answer.push(nl);
       }
       return answer ;
}
// extend(SimpleReport,Report);
// extend(SimpleCell,Cell);
// extend(SimpleLine,Line);
// extend(DetailLine,Line);
// extend(DetailCell,Cell);

var report_model = {    
      lines:[
      {      
        cells:
          [
            {},{},{},{},          
          ]
      },
      {      
        cells:
          [
            {text:"#field1",width:40},{},{},{},          
          ]
      },
      {      
        cells:
          [
            {},{},{},{},          
          ]
      },
      {      
        cells:
          [
            {},{},{},{},          
          ]
      }
    ]
};

exports.fromModelTest=function(t){
  var report = new Report ();
  report.fromModel(report_model);
  t.equal(4,report.lines.length,"");
  t.equal(4,report.lines[0].cells.length,"");
  t.equal(4,report.lines[1].cells.length,"");
  t.equal(4,report.lines[2].cells.length,"");
  t.equal(4,report.lines[3].cells.length,"");
  t.equal("#field1",report.lines[1].cells[0].text,"");
  t.equal(40,report.lines[1].cells[0].width,"");
  t.done();
}

