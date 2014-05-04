
(function r(){
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
})()