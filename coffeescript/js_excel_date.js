function getJsDateFromExcel(excelDate) {
 
  // JavaScript dates can be constructed by passing milliseconds
  // since the Unix epoch (January 1, 1970) example: new Date(12312512312);
 
  // 1. Subtract number of days between Jan 1, 1900 and Jan 1, 1970, plus 1 (Google "excel leap year bug")             
  // 2. Convert to milliseconds.
 
	return new Date((excelDate - (25567 + 1))*86400*1000);
 
}
// console.log(getJsDateFromExcel(0.34375));

function valueToTimeStr(value){
	var second = value*24*60*60;
	var h = Math.floor(value*24) ;
	var m  = (value*24 - h)*60;
	var s = second - h*60*60 - m*60;
	return h+":"+m+":"+s;
}
console.log(valueToTimeStr(0.343750));//8:15:0
console.log(valueToTimeStr(0));//0:0:0
console.log(valueToTimeStr(1));//24:0:0

// console.log(valueToTimeStr(0.343750)=='8:15');//true