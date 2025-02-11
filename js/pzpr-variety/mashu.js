/*! @license pzpr.js v0.11.1 (c) 2009-2019 sabo2, MIT license
 *   https://github.com/sabo2/pzprv3 */

!function(a,b){"object"==typeof module&&module.exports?module.exports=[a,b]:pzpr.classmgr.makeCustom(a,b)}(["mashu"],{MouseEvent:{inputModes:{edit:["circle-shade","circle-unshade","undef","clear","info-line"],play:["line","peke","info-line"]},mouseinput_auto:function(){this.puzzle.playmode?"left"===this.btn?this.mousestart||this.mousemove?this.inputLine():this.mouseend&&this.notInputted()&&this.inputpeke():"right"===this.btn&&(this.mousestart||this.mousemove)&&this.inputpeke():this.puzzle.editmode&&this.mousestart&&this.inputqnum()}},KeyEvent:{enablemake:!0},Cell:{numberAsObject:!0,maxnum:2,setErrorPearl:function(){this.setCellLineError(1);var a=this.adjacent,b=this.adjborder;b.top.isLine()&&a.top.setCellLineError(0),b.bottom.isLine()&&a.bottom.setCellLineError(0),b.left.isLine()&&a.left.setCellLineError(0),b.right.isLine()&&a.right.setCellLineError(0)},setCellLineError:function(a){var b=this.bx,c=this.by;a&&this.seterr(1),this.board.borderinside(b-1,c-1,b+1,c+1).seterr(1)}},Board:{hasborder:1,uramashu:!1,revCircle:function(){this.uramashu&&this.revCircleMain()},revCircleConfig:function(a){this.uramashu!==a&&(this.uramashu=a,this.revCircleMain())},revCircleMain:function(){for(var a=0;a<this.cell.length;a++){var b=this.cell[a];1===b.qnum?b.setQnum(2):2===b.qnum&&b.setQnum(1)}}},LineGraph:{enabled:!0},Graphic:{irowake:!0,gridcolor_type:"LIGHT",circlefillcolor_func:"qnum2",circlestrokecolor_func:"qnum2",paint:function(){this.drawBGCells(),this.drawDashedGrid(),this.drawCircles(),this.drawHatenas(),this.drawPekes(),this.drawLines(),this.drawChassis(),this.drawTarget()}},Encode:{decodePzpr:function(a){this.decodeCircle(),this.board.revCircle()},encodePzpr:function(a){this.board.revCircle(),this.encodeCircle(),this.board.revCircle()},decodeKanpen:function(){this.fio.decodeCellQnum_kanpen(),this.board.revCircle()},encodeKanpen:function(){this.board.revCircle(),this.fio.encodeCellQnum_kanpen(),this.board.revCircle()}},FileIO:{decodeData:function(){this.decodeCellQnum(),this.decodeBorderLine(),this.board.revCircle()},encodeData:function(){this.board.revCircle(),this.encodeCellQnum(),this.encodeBorderLine(),this.board.revCircle()},kanpenOpen:function(){this.decodeCellQnum_kanpen(),this.decodeBorderLine(),this.board.revCircle()},kanpenSave:function(){this.board.revCircle(),this.encodeCellQnum_kanpen(),this.encodeBorderLine(),this.board.revCircle()},kanpenOpenXML:function(){this.decodeCellQnum_XMLBoard(),this.decodeBorderLine_XMLAnswer(),this.board.revCircle()},kanpenSaveXML:function(){this.board.revCircle(),this.encodeCellQnum_XMLBoard(),this.encodeBorderLine_XMLAnswer(),this.board.revCircle()},UNDECIDED_NUM_XML:3},AnsCheck:{checklist:["checkLineExist+","checkBranchLine","checkCrossLine","checkWhitePearl1","checkBlackPearl1","checkBlackPearl2","checkWhitePearl2","checkNoLinePearl","checkDeadendLine+","checkOneLoop"],checkNoLinePearl:function(){this.checkAllCell(function(a){return a.isNum()&&0===a.lcnt},"mashuOnLine")},checkWhitePearl1:function(){for(var a=!0,b=this.board,c=0;c<b.cell.length;c++){var d=b.cell[c];if(1===d.qnum&&d.isLineCurve()){if(a=!1,this.checkOnly)break;d.setCellLineError(1)}}a||(this.failcode.add("mashuWCurve"),b.border.setnoerr())},checkBlackPearl1:function(){for(var a=!0,b=this.board,c=0;c<b.cell.length;c++){var d=b.cell[c];if(2===d.qnum&&d.isLineStraight()){if(a=!1,this.checkOnly)break;d.setCellLineError(1)}}a||(this.failcode.add("mashuBStrig"),b.border.setnoerr())},checkWhitePearl2:function(){for(var a=!0,b=this.board,c=0;c<b.cell.length;c++){var d=b.cell[c];if(1===d.qnum&&2===d.lcnt){var e=d.adjacent,f=d.adjborder,g=0;if(f.top.isLine()&&e.top.isLineStraight()&&g++,f.bottom.isLine()&&e.bottom.isLineStraight()&&g++,f.left.isLine()&&e.left.isLineStraight()&&g++,f.right.isLine()&&e.right.isLineStraight()&&g++,!(g<2)){if(a=!1,this.checkOnly)break;d.setErrorPearl()}}}a||(this.failcode.add("mashuWStNbr"),b.border.setnoerr())},checkBlackPearl2:function(){for(var a=!0,b=this.board,c=0;c<b.cell.length;c++){var d=b.cell[c],e=d.adjacent,f=d.adjborder;if(2===d.qnum&&2===d.lcnt&&(f.top.isLine()&&e.top.isLineCurve()||f.bottom.isLine()&&e.bottom.isLineCurve()||f.left.isLine()&&e.left.isLineCurve()||f.right.isLine()&&e.right.isLineCurve())){if(a=!1,this.checkOnly)break;d.setErrorPearl()}}a||(this.failcode.add("mashuBCvNbr"),b.border.setnoerr())}},FailCode:{mashuOnLine:["線が上を通っていない丸があります。","Lines don't pass some pearls."],mashuWCurve:["白丸の上で線が曲がっています。","Lines curve on white pearl."],mashuWStNbr:["白丸の隣で線が曲がっていません。","Lines go straight next to white pearl on each side."],mashuBStrig:["黒丸の上で線が直進しています。","Lines go straight on black pearl."],mashuBCvNbr:["黒丸の隣で線が曲がっています。","Lines curve next to black pearl."]}});