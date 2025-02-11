/*! @license pzpr.js v0.11.1 (c) 2009-2019 sabo2, MIT license
 *   https://github.com/sabo2/pzprv3 */

!function(a,b){"object"==typeof module&&module.exports?module.exports=[a,b]:pzpr.classmgr.makeCustom(a,b)}(["hanare"],{MouseEvent:{inputModes:{edit:["border","number"],play:["objblank"]},mouseinput_number:function(){this.mousestart&&this.inputqnum_hanare()},mouseinput_auto:function(){this.puzzle.playmode?"left"===this.btn?this.mousestart?this.inputqnum_hanare():this.mousemove&&this.inputDot():"right"===this.btn&&(this.mousestart||this.mousemove)&&this.inputDot():this.puzzle.editmode&&(this.mousestart||this.mousemove?this.inputborder():this.mouseend&&this.notInputted()&&this.inputqnum_hanare())},inputqnum_hanare:function(){var a=this.getcell();if(!a.isnull&&a!==this.mouseCell){var b=a.setNum_hanare(a.room.clist.length);null!==b&&(this.inputData=-1===b?0:1,this.mouseCell=a,a.draw())}},inputDot:function(){var a=this.getcell();a.isnull||a===this.mouseCell||-1!==a.qnum||(null===this.inputData&&(this.inputData=1===a.qsub?0:1),a.setAnum(-1),a.setQsub(1===this.inputData?1:0),this.mouseCell=a,a.draw())}},Cell:{posthook:{qnum:function(a){this.room.checkAutoCmp()},anum:function(a){this.room.checkAutoCmp()}},setNum_hanare:function(a){if(a>=0){if(a>this.getmaxnum())return null;for(var b=this.puzzle,c=b.execConfig("singlenum"),d=this.room.clist,e=null,f=0;f<d.length;f++){if(-1!==d[f].qnum){e=d[f];break}if(-1!==d[f].anum&&c){e=d[f];break}}if(this===e)a=b.playmode?-2:-1;else if(null!==e){if(b.playmode&&-1!==e.qnum)return null;(b.editmode||c)&&(e.setNum(b.playmode?-2:-1),e.draw())}else 1===this.qsub?a=-1:-1===this.anum||c||(a=-2)}return this.setNum(a),a}},CellList:{checkCmp:function(){return 1===this.filter(function(a){return a.isNum()}).length}},Board:{cols:8,rows:8,hasborder:1},AreaRoomGraph:{enabled:!0},Graphic:{gridcolor_type:"DLIGHT",autocmp:"room",bgcellcolor_func:"qcmp",paint:function(){this.drawBGCells(),this.drawGrid(),this.drawDotCells(),this.drawAnsNumbers(),this.drawQuesNumbers(),this.drawBorders(),this.drawChassis()}},Encode:{decodePzpr:function(a){this.decodeBorder(),this.decodeNumber16()},encodePzpr:function(a){this.encodeBorder(),this.encodeNumber16()}},FileIO:{decodeData:function(){this.decodeBorderQues(),this.decodeCellQnum(),this.decodeCellAnumsub()},encodeData:function(){this.encodeBorderQues(),this.encodeCellQnum(),this.encodeCellAnumsub()}},AnsCheck:{checklist:["checkDoubleNumber","checkAnsNumberAndSize","checkDiffNumber","checkNoNumber"],checkDiffNumber:function(){function a(a){d++,a.isNum()&&(a.isValidNum(a)?(null!==b&&Math.abs(c-a.getNum())!==d&&(this.failcode.add("nmDiffDistNe"),e=!1,b.seterr(1),a.seterr(1)),b=a,c=a.getNum(),d=-1):b=null)}for(var b,c,d,e=!0,f=this.board,g=f.minbx+1;g<=f.maxbx-1;g+=2){b=null;for(var h=f.minby+1;h<=f.maxby-1;h+=2)if(a.call(this,f.getc(g,h)),!e&&this.checkOnly)return}for(var h=f.minby+1;h<=f.maxby-1;h+=2){b=null;for(var g=f.minbx+1;g<=f.maxbx-1;g+=2)if(a.call(this,f.getc(g,h)),!e&&this.checkOnly)return}},checkAnsNumberAndSize:function(){for(var a=this.board.roommgr.components,b=0;b<a.length;b++){for(var c=a[b].clist,d=-1,e=0;e<c.length;e++)if(c[e].isNum()){d=c[e].getNum();break}if(-1!==d&&d!==c.length){if(this.failcode.add("bkSizeNe"),this.checkOnly)break;c.seterr(1)}}}},FailCode:{bkNoNum:["数字の入っていない部屋があります。","A room has no numbers."],bkNumGe2:["1つの部屋に2つ以上の数字が入っています。","A room has plural numbers."],bkSizeNe:["数字と部屋の大きさが違います。","The size of the room is not equal to the number."],nmDiffDistNe:["２つの数字の差とその間隔が正しくありません。","The distance of the paired numbers is not equal to the diff of them."]}});