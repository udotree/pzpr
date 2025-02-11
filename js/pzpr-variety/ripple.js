/*! @license pzpr.js v0.11.1 (c) 2009-2019 sabo2, MIT license
 *   https://github.com/sabo2/pzprv3 */

!function(a,b){"object"==typeof module&&module.exports?module.exports=[a,b]:pzpr.classmgr.makeCustom(a,b)}(["ripple","cojun"],{MouseEvent:{inputModes:{edit:["border","number","clear"],play:["number","clear"]},mouseinput_auto:function(){this.puzzle.playmode?this.mousestart&&this.inputqnum():this.puzzle.editmode&&(this.mousestart||this.mousemove&&"left"===this.btn?this.inputborder():this.mouseend&&this.notInputted()&&this.inputqnum())}},KeyEvent:{enablemake:!0,enableplay:!0},Cell:{enableSubNumberArray:!0,maxnum:function(){return this.room.clist.length}},Board:{hasborder:1},"Board@cojun":{cols:8,rows:8},AreaRoomGraph:{enabled:!0},Graphic:{gridcolor_type:"DLIGHT",paint:function(){this.drawBGCells(),this.drawTargetSubNumber(),this.drawGrid(),this.drawSubNumbers(),this.drawAnsNumbers(),this.drawQuesNumbers(),this.drawBorders(),this.drawChassis(),this.drawCursor()}},Encode:{decodePzpr:function(a){this.decodeBorder(),this.decodeNumber16()},encodePzpr:function(a){this.encodeBorder(),this.encodeNumber16()},decodeKanpen:function(){this.fio.decodeAreaRoom(),this.fio.decodeCellQnum_kanpen()},encodeKanpen:function(){this.fio.encodeAreaRoom(),this.fio.encodeCellQnum_kanpen()}},FileIO:{decodeData:function(){this.decodeBorderQues(),this.decodeCellQnum(),this.decodeCellAnumsub()},encodeData:function(){this.encodeBorderQues(),this.encodeCellQnum(),this.encodeCellAnumsub()},kanpenOpen:function(){this.decodeAreaRoom(),this.decodeCellQnum_kanpen(),this.decodeCellAnum_kanpen()},kanpenSave:function(){this.encodeAreaRoom(),this.encodeCellQnum_kanpen(),this.encodeCellAnum_kanpen()},kanpenOpenXML:function(){this.decodeAreaRoom_XMLBoard(),this.decodeCellQnum_XMLBoard(),this.decodeCellAnum_XMLAnswer()},kanpenSaveXML:function(){this.encodeAreaRoom_XMLBoard(),this.encodeCellQnum_XMLBoard(),this.encodeCellAnum_XMLAnswer()},UNDECIDED_NUM_XML:0},AnsCheck:{checklist:["checkDifferentNumberInRoom","checkRippleNumber@ripple","checkAdjacentDiffNumber@cojun","checkUpperNumber@cojun","checkNoNumCell+"],checkRippleNumber:function(){var a=!0,b=this.board;a:for(var c=0;c<b.cell.length;c++){var d=b.cell[c],e=d.getNum(),f=d.bx,g=d.by;if(!(e<=0)){for(var h=2;h<=2*e;h+=2){var i=b.getc(f+h,g);if(!i.isnull&&i.getNum()===e){if(a=!1,this.checkOnly)break a;d.seterr(1),i.seterr(1)}}for(var h=2;h<=2*e;h+=2){var i=b.getc(f,g+h);if(!i.isnull&&i.getNum()===e){if(a=!1,this.checkOnly)break a;d.seterr(1),i.seterr(1)}}}}a||this.failcode.add("nmSmallGap")},checkUpperNumber:function(){for(var a=this.board,b=0;b<a.cell.length-a.cols;b++){var c=a.cell[b],d=c.adjacent.bottom;if(c.room===d.room&&c.isNum()&&d.isNum()&&!(c.getNum()>=d.getNum())){if(this.failcode.add("bkSmallOnBig"),this.checkOnly)break;c.seterr(1),d.seterr(1)}}}},FailCode:{bkDupNum:["1つの部屋に同じ数字が複数入っています。","A room has two or more same numbers."],bkSmallOnBig:["同じ部屋で上に小さい数字が乗っています。","There is an small number on big number in a room."],nmSmallGap:["数字よりもその間隔が短いところがあります。","The gap of the same kind of number is smaller than the number."]}});