/*! @license pzpr.js v0.11.1 (c) 2009-2025 sabo2, MIT license
 *   https://github.com/sabo2/pzprv3 */

!function(a,b){"object"==typeof module&&module.exports?module.exports=[a,b]:pzpr.classmgr.makeCustom(a,b)}(["hanare","putteria"],{MouseEvent:{inputModes:{edit:["border","number"],play:["objblank"]},mouseinput_number:function(){this.mousestart&&this.inputqnum_hanare()},mouseinput_auto:function(){this.puzzle.playmode?"left"===this.btn?this.mousestart?this.inputqnum_hanare():this.mousemove&&this.inputDot():"right"===this.btn&&(this.mousestart||this.mousemove)&&this.inputDot():this.puzzle.editmode&&(this.mousestart||this.mousemove?this.inputborder():this.mouseend&&this.notInputted()&&this.inputqnum_hanare())},inputqnum_hanare:function(){var a=this.getcell();if(!a.isnull&&a!==this.mouseCell){var b=a.setNum_hanare(a.room.clist.length);null!==b&&(this.inputData=-1===b?0:1,this.mouseCell=a,a.draw())}},inputDot:function(){var a=this.getcell();a.isnull||a===this.mouseCell||-1!==a.qnum||(null===this.inputData&&(this.inputData=1===a.qsub?0:1),a.setAnum(-1),a.setQsub(1===this.inputData?1:0),this.mouseCell=a,a.draw())}},"MouseEvent@putteria":{inputModes:{edit:["border","number","empty"],play:["objblank","line"]},mouseinput_other:function(){"empty"===this.inputMode&&this.inputempty()},mouseinput_auto:function(){this.puzzle.playmode?"left"===this.btn?this.mousestart||this.mousemove?this.inputLine():this.mouseend&&this.notInputted()&&this.inputqnum_hanare():"right"===this.btn&&(this.mousestart||this.mousemove)&&this.inputDot():this.puzzle.editmode&&(this.mousestart||this.mousemove?this.inputborder():this.mouseend&&this.notInputted()&&this.inputqnum_hanare())},inputempty:function(){var a=this.getcell();a.isnull||a===this.mouseCell||(null===this.inputData&&(this.inputData=a.isEmpty()?-1:-2),a.setQnum(this.inputData),a.setAnum(-1),a.setQsub(0),this.mouseCell=a,a.draw())}},Cell:{posthook:{qnum:function(a){this.room.checkAutoCmp()},anum:function(a){this.room.checkAutoCmp()}},setNum_hanare:function(a){if(a>=0){if(a>this.getmaxnum())return null;for(var b=this.puzzle,c=b.execConfig("singlenum"),d=this.room.clist,e=null,f=0;f<d.length;f++){if(d[f].qnum>0){e=d[f];break}if(-1!==d[f].anum&&c){e=d[f];break}}if(this===e)a=b.playmode?-2:-1;else if(null!==e){if(b.playmode&&e.qnum>0)return null;(b.editmode||c)&&(e.setNum(b.playmode?-2:-1),e.draw())}else 1===this.qsub?a=-1:-1===this.anum||c||(a=-2)}return this.setNum(a),a}},"Cell@putteria":{isNum:function(){return this.qnum>0||this.anum>0},isEmpty:function(){return-2===this.qnum},noLP:function(a){return this.isEmpty()||this.isNum()}},Border:{enableLineNG:!0,posthook:{line:function(){this.board.scanResult=null}}},CellList:{checkCmp:function(){return 1===this.filter(function(a){return a.isNum()}).length}},Board:{cols:8,rows:8,hasborder:1,scanResult:null,scanInside:function(){if(null!==this.scanResult)return this.scanResult;if(this.cell.some(function(a){return 0!==a.lcnt&&2!==a.lcnt}))return this.scanResult=!1,!1;for(var a=2;a<this.maxby;a+=2)for(var b=!1,c=1;c<this.maxbx;c+=2)this.getb(c,a).isLine()&&(b^=!0),this.getx(c+1,a).inside=b;return this.scanResult=!0,!0},rebuildInfo:function(){this.scanResult=null,this.common.rebuildInfo.call(this)}},AreaRoomGraph:{enabled:!0},"LineGraph@putteria":{enabled:!0,makeClist:!0},Graphic:{gridcolor_type:"DLIGHT",autocmp:"room",bgcellcolor_func:"qcmp",paint:function(){this.drawBGCells(),this.drawGrid(),this.drawDotCells(),"putteria"===this.pid&&(this.drawXCells(),this.drawLines()),this.drawAnsNumbers(),this.drawQuesNumbers(),this.drawBorders(),this.drawChassis()}},"Graphic@putteria":{getQuesNumberText:function(a){return-2===a.qnum?"":this.getNumberText(a,a.qnum)},drawXCells:function(){for(var a=this.vinc("cell_x","auto",!0),b=.2*this.cw,c=this.range.cells,d=0;d<c.length;d++){var e=c[d];a.vid="c_x_"+e.id;var f=e.bx*this.bw,g=e.by*this.bh;e.isEmpty()?(a.strokeStyle=this.quescolor,a.lineWidth=2,a.strokeCross(f,g,b)):a.vhide()}}},Encode:{decodePzpr:function(a){this.decodeBorder(),this.decodeNumber16()},encodePzpr:function(a){this.encodeBorder(),this.encodeNumber16()}},FileIO:{decodeData:function(){this.decodeBorderQues(),this.decodeBorderLine(),this.decodeCellQnum(),this.decodeCellAnumsub()},encodeData:function(){this.encodeBorderQues(),this.encodeBorderLine(),this.encodeCellQnum(),this.encodeCellAnumsub()}},AnsCheck:{checklist:["checkDoubleNumber","checkAnsNumberAndSize","checkDiffNumber@hanare","checkLineOnShadeCell@putteria","checkAdjacentNumber@putteria","checkNoNumber","checkLineExist+","checkBranchLine","checkCrossLine","checkDeadendLine+","checkOneLoop","checkDifferentNumberInLineAndSameSide@putteria"],checkDiffNumber:function(){function a(a){d++,a.isNum()&&(a.isValidNum(a)?(null!==b&&Math.abs(c-a.getNum())!==d&&(this.failcode.add("nmDiffDistNe"),e=!1,b.seterr(1),a.seterr(1)),b=a,c=a.getNum(),d=-1):b=null)}for(var b,c,d,e=!0,f=this.board,g=f.minbx+1;g<=f.maxbx-1;g+=2){b=null;for(var h=f.minby+1;h<=f.maxby-1;h+=2)if(a.call(this,f.getc(g,h)),!e&&this.checkOnly)return}for(var h=f.minby+1;h<=f.maxby-1;h+=2){b=null;for(var g=f.minbx+1;g<=f.maxbx-1;g+=2)if(a.call(this,f.getc(g,h)),!e&&this.checkOnly)return}},checkLineOnShadeCell:function(){this.checkAllCell(function(a){return(a.isEmpty()||a.isNum())&&a.lcnt>0},"lnOnNumber")},checkAnsNumberAndSize:function(){for(var a=this.board.roommgr.components,b=0;b<a.length;b++){for(var c=a[b].clist,d=-1,e=0;e<c.length;e++)if(c[e].isNum()){d=c[e].getNum();break}if(-1!==d&&d!==c.length){if(this.failcode.add("bkSizeNe"),this.checkOnly)break;c.seterr(1)}}},checkAdjacentNumber:function(){this.checkSideCell(function(a,b){return a.isNum()&&b.isNum()},"nmAdjacent")},checkDifferentNumberInLineAndSameSide:function(){var a=this.board;a.scanInside()&&this.checkRowsCols(function(b){for(var c=!0,d=0;d<b.length;d++)for(var e=0;e<d;e++)if(d!==e&&b[d].isNum()&&b[e].isNum()&&b[d].getNum()===b[e].getNum()){var f=!!a.getx(b[d].bx-1,b[d].by-1).inside,g=!!a.getx(b[e].bx-1,b[e].by-1).inside;if(f===g&&(b[d].seterr(1),b[e].seterr(1),c=!1,this.checkOnly))return c}return c},"nmInOut")}},FailCode:{bkNoNum:["数字の入っていない部屋があります。","A room has no numbers."],bkNumGe2:["1つの部屋に2つ以上の数字が入っています。","A room has plural numbers."],lnOnNumber:["数字マスまたは×マスの上に線が引かれています。","There is a line on the number or X."],bkSizeNe:["数字と部屋の大きさが違います。","The size of the room is not equal to the number."],nmDiffDistNe:["２つの数字の差とその間隔が正しくありません。","The distance of the paired numbers is not equal to the diff of them."],nmAdjacent:["数字がタテヨコに連続しています。",""],nmInOut:["ループの同じ側に、同じ列で同じ数字が2つ以上あります。",""]}});
//# sourceMappingURL=hanare.js.map