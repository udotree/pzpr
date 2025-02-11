/*! @license pzpr.js v0.11.1 (c) 2009-2019 sabo2, MIT license
 *   https://github.com/sabo2/pzprv3 */

!function(a,b){"object"==typeof module&&module.exports?module.exports=[a,b]:pzpr.classmgr.makeCustom(a,b)}(["makaro"],{MouseEvent:{inputModes:{edit:["border","arrow","number","clear"],play:["number","clear"]},mouseinput_auto:function(){this.puzzle.playmode?this.mousestart&&this.inputqnum():this.puzzle.editmode&&(this.mousestart||this.mousemove?this.isBorderMode()?this.inputborder():this.inputarrow_cell():this.mouseend&&this.notInputted()&&this.inputqnum())},inputarrow_cell_main:function(a,b){a.setQnum(-1),a.setAnum(-1),a.qdir!==b?(a.setQdir(b),a.setQues(1)):(a.setQdir(a.NDIR),a.setQues(0))},inputqnum_main:function(a){this.puzzle.editmode&&this.inputshade_preqnum(a)||1!==a.ques&&this.common.inputqnum_main.call(this,a)},inputshade_preqnum:function(a){var b=null;return 1===a.ques&&a.qdir!==a.NDIR?b=-3:1===a.ques&&a.qdir===a.NDIR?"left"===this.btn?b=-2:"right"===this.btn&&(b=-1):0===a.ques&&-1===a.qnum?"left"===this.btn&&(b=-3):-2===a.qnum&&"right"===this.btn&&(b=-3),-3===b?(a.setQues(1),a.setQdir(a.NDIR),a.setQnum(-1),a.setAnum(-1),a.draw()):-1===b?(a.setQues(0),a.setQdir(a.NDIR),a.setQnum(-1),a.setAnum(-1),a.draw()):-2===b&&(a.setQues(0),a.setQdir(a.NDIR),a.setQnum(-2),a.setAnum(-1),a.draw()),null!==b}},KeyEvent:{enablemake:!0,enableplay:!0,moveTarget:function(a){return!a.match(/shift/)&&this.moveTCell(a)},keyinput:function(a){var b=this.cursor.getc();this.puzzle.editmode&&this.key_inputcell_makaro_edit(b,a)||1!==b.ques&&this.key_inputqnum(a)},key_inputcell_makaro_edit:function(a,b){var c=!1;return" "===b?(a.setQues(0),a.setQdir(a.NDIR),a.setQnum(-1),a.setAnum(-1),c=!0):"BS"===b&&1===a.ques?(a.qdir!==a.NDIR?a.setQdir(a.NDIR):(a.setQues(0),a.setQnum(-1),a.setAnum(-1)),c=!0):"-"===b?(a.setQues(0===a.ques?1:0),a.setQdir(a.NDIR),a.setQnum(-1),a.setAnum(-1),c=!0):this.key_inputarrow(b)&&(a.setQues(1),a.setQnum(-1),a.setAnum(-1),c=!0),c&&a.draw(),c}},Cell:{enableSubNumberArray:!0,maxnum:function(){return Math.min(99,this.room.clist.length)}},Border:{isBorder:function(){return this.isnull||this.ques>0||!(1!==this.sidecell[0].ques&&1!==this.sidecell[1].ques)}},Board:{hasborder:1},BoardExec:{adjustBoardData:function(a,b){this.adjustCellArrow(a,b)}},AreaRoomGraph:{enabled:!0,isnodevalid:function(a){return 0===a.ques}},Graphic:{gridcolor_type:"LIGHT",paint:function(){this.drawBGCells(),this.drawTargetSubNumber(),this.drawGrid(),this.drawQuesCells(),this.drawCellArrows(),this.drawSubNumbers(),this.drawAnsNumbers(),this.drawQuesNumbers(),this.drawBorders(),this.drawChassis(),this.drawCursor()},getCellArrowColor:function(a){return 0!==a.qdir?"white":null}},Encode:{decodePzpr:function(a){this.decodeBorder(),this.decodeMakaro()},encodePzpr:function(a){this.encodeBorder_makaro(),this.encodeMakaro()},decodeMakaro:function(){var a=0,b=0,c=this.outbstr,d=this.board;for(b=0;b<c.length;b++){var e=c.charAt(b),f=d.cell[a];if(this.include(e,"0","9")?f.qnum=parseInt(e,10)+1:"-"===e?(f.qnum=parseInt(c.substr(b+1,2),10)+1,b+=2):e>="a"&&e<="e"?(f.ques=1,f.qdir=parseInt(e,36)-10):e>="g"&&e<="z"&&(a+=parseInt(e,36)-16),a++,!d.cell[a])break}this.outbstr=c.substr(b+1)},encodeMakaro:function(){for(var a="",b=0,c=this.board,d=0;d<c.cell.length;d++){var e="",f=c.cell[d],g=f.qnum;g>=1&&g<11?e=(g-1).toString(10):g>=11&&g<100?e="-"+(g-1).toString(10):1===f.ques?e=(f.qdir+10).toString(36):b++,0===b?a+=e:(e||20===b)&&(a+=(b+15).toString(36)+e,b=0)}b>0&&(a+=(b+15).toString(36)),this.outbstr+=a},encodeBorder_makaro:function(){for(var a=this.board,b=[],c=0;c<a.border.length;c++)b[c]=a.border[c].ques,a.border[c].ques=a.border[c].isBorder()?1:0;this.encodeBorder();for(var c=0;c<a.border.length;c++)a.border[c].ques=b[c]}},FileIO:{decodeData:function(){this.decodeAreaRoom(),this.decodeCellQuesData_makaro(),this.decodeCellAnumsub()},encodeData:function(){this.encodeAreaRoom(),this.encodeCellQuesData_makaro(),this.encodeCellAnumsub()},decodeCellQuesData_makaro:function(){this.decodeCell(function(a,b){"t"===b?(a.ques=1,a.qdir=1):"b"===b?(a.ques=1,a.qdir=2):"l"===b?(a.ques=1,a.qdir=3):"r"===b?(a.ques=1,a.qdir=4):"#"===b?(a.ques=1,a.qdir=0):"-"===b?a.qnum=-2:"."!==b&&(a.qnum=+b)})},encodeCellQuesData_makaro:function(){this.encodeCell(function(a){return 1===a.ques?1===a.qdir?"t ":2===a.qdir?"b ":3===a.qdir?"l ":4===a.qdir?"r ":"# ":a.qnum>=0?a.qnum+" ":-2===a.qnum?"- ":". "})}},AnsCheck:{checklist:["checkDifferentNumberInRoom","checkAdjacentDiffNumber","checkPointAtBiggestNumber","checkNoNumCell+"],checkPointAtBiggestNumber:function(){for(var a=0;a<this.board.cell.length;a++){var b=this.board.cell[a];if(1===b.ques&&b.qdir!==b.NDIR){for(var c=b.getdir4clist(),d=-1,e=b.NDIR,f=!1,g=!1,h=!0,i=0;i<c.length;i++){var j=c[i][0].getNum();-1===j||(j>d?(d=j,e=c[i][1],f=!1):j===d&&(e=b.NDIR,f=!0)),c[i][1]===b.qdir&&(0===c[i][0].ques&&(h=!1),-1===j&&(g=!0))}if(h||!g&&(f||b.qdir!==e)){if(this.failcode.add("arNotMax"),this.checkOnly)break;b.seterr(1);for(var i=0;i<c.length;i++)-1!==c[i][0].getNum()&&c[i][0].seterr(1)}}}}},FailCode:{bkDupNum:["1つの部屋に同じ数字が複数入っています。","A room has two or more same numbers."],arNotMax:["矢印の先が最も大きい数字でありません。","An arrow doesn't point out biggest number."]}});