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
Line.prototype.render=function(record){
  var r = new Line();
  r.left = this.left;
  r.top = this.top;
  r.width = this.width;
  r.height = this.height;
  var i ;
  for (i=0;i<this.cells.length;i++)
    r.cells.push(this.cells[i].clone(record));
  return r;
}
Line.prototype.addCell=function(cell){this.cells.push(cell);}
Line.prototype.isDetailLine=function(){
    var i;
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


