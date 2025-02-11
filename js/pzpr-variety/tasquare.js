/*! @license pzpr.js v0.11.1 (c) 2009-2019 sabo2, MIT license
 *   https://github.com/sabo2/pzprv3 */

!function(a,b){"object"==typeof module&&module.exports?module.exports=[a,b]:pzpr.classmgr.makeCustom(a,b)}(["tasquare"],{MouseEvent:{use:!0,inputModes:{edit:["number","clear"],play:["shade","unshade"]},mouseinput_auto:function(){this.puzzle.playmode?(this.mousestart||this.mousemove)&&this.inputcell():this.puzzle.editmode&&this.mousestart&&this.inputqnum()}},KeyEvent:{enablemake:!0},Cell:{numberRemainsUnshaded:!0},AreaShadeGraph:{enabled:!0},AreaUnshadeGraph:{enabled:!0},Graphic:{hideHatena:!0,fontsizeratio:.65,qanscolor:"black",numbercolor_func:"qnum",paint:function(){this.drawBGCells(),this.drawShadedCells(),this.drawDotCells(!1),this.drawGrid(),this.drawCellSquare(),this.drawQuesNumbers(),this.drawChassis(),this.drawTarget()},drawCellSquare:function(){var a=this.vinc("cell_square","crispEdges",!0),b=.8*this.bw-1,c=.8*this.bh-1;a.lineWidth=1,a.strokeStyle="black";for(var d=this.range.cells,e=0;e<d.length;e++){var f=d[e];a.vid="c_sq_"+f.id,-1!==f.qnum?(a.fillStyle=1===f.error?this.errbcolor1:"white",a.shapeRectCenter(f.bx*this.bw,f.by*this.bh,b,c)):a.vhide()}}},Encode:{decodePzpr:function(a){this.decodeNumber16()},encodePzpr:function(a){this.encodeNumber16()}},FileIO:{decodeData:function(){this.decodeCellQnumAns()},encodeData:function(){this.encodeCellQnumAns()}},AnsCheck:{checklist:["checkShadeCellExist","checkSquareShade","checkConnectUnshade","checkSumOfSize","checkAtLeastOne"],checkSquareShade:function(){this.checkAllArea(this.board.sblkmgr,function(a,b,c,d){return a*b===c&&a===b},"csNotSquare")},checkSumOfSize:function(){this.checkNumberSquare(!0,"nmSumSizeNe")},checkAtLeastOne:function(){this.checkNumberSquare(!1,"nmNoSideShade")},checkNumberSquare:function(a,b){for(var c=this.board,d=0;d<c.cell.length;d++){var e=c.cell[d];if(!(a?e.qnum<0:-1===e.qnum)){var f=new this.klass.CellList,g=e.adjacent;if(g.top.isShade()&&f.extend(g.top.sblk.clist),g.bottom.isShade()&&f.extend(g.bottom.sblk.clist),g.left.isShade()&&f.extend(g.left.sblk.clist),g.right.isShade()&&f.extend(g.right.sblk.clist),!(a?f.length===e.qnum:f.length>0)){if(this.failcode.add(b),this.checkOnly)break;f.seterr(1),e.seterr(1)}}}}},FailCode:{nmSumSizeNe:["数字とそれに接する黒マスの大きさの合計が一致しません。","Sum of the adjacent masses of shaded cells is not equal to the number."],nmNoSideShade:["□に黒マスが接していません。","No shaded cells are adjacent to square marks."]}});