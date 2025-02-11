/*! @license pzpr.js v0.11.1 (c) 2009-2019 sabo2, MIT license
 *   https://github.com/sabo2/pzprv3 */

!function(){var a=[0,.235,.95,.38,.588,0,-.588,-.38,-.95,-.235],b=[-1,-.309,-.309,.124,.809,.4,.809,.124,-.309,-.309];!function(a,b){"object"==typeof module&&module.exports?module.exports=[a,b]:pzpr.classmgr.makeCustom(a,b)}(["starbattle"],{MouseEvent:{use:!0,inputModes:{play:["star","unshade"]},mouseinput_other:function(){"star"===this.inputMode&&this.mousestart&&this.inputcell_starbattle()},mouseinput_auto:function(){this.puzzle.playmode?(this.mousestart||this.mousemove)&&this.inputcell_starbattle():this.puzzle.editmode&&(this.mousestart||this.mousemove)&&this.inputEdit()},inputcell_starbattle:function(){var a=this.getcell();a.isnull||a===this.mouseCell||(null===this.inputData&&this.decIC(a),a.setQans(1===this.inputData?1:0),a.setQsub(2===this.inputData?1:0),a.draw(),this.mouseCell=a,1===this.inputData&&this.mousereset())},inputEdit:function(){null===this.inputData?this.inputEdit_first():this.inputborder()},inputEdit_first:function(){var a=this.board,b=this.inputPoint.bx,c=this.inputPoint.by,d=a.starCount.rect;if(b>=d.bx1&&b<=d.bx2&&c>=d.by1&&c<=d.by2){var e=this.getNewNumber(a.starCount,a.starCount.count);if(null===e)return;a.starCount.set(e),this.mousereset()}else this.inputborder()}},KeyEvent:{enablemake:!0,moveTarget:function(){return!1},keyinput:function(a){this.keydown&&this.puzzle.editmode&&this.key_inputqnum_starbattle(a)},key_inputqnum_starbattle:function(a){var b=this.puzzle.board,c=this.getNewNumber(b.starCount,a,b.starCount.count);null!==c&&(b.starCount.set(c),this.prev=b.starCount)}},Board:{hasborder:1,starCount:null,createExtraObject:function(){this.starCount=new this.klass.StarCount(1)},initExtraObject:function(a,b){this.starCount.init(1)}},StarCount:{count:1,rect:null,initialize:function(a){this.count=a,this.rect={bx1:-1,by1:-1,bx2:-1,by2:-1}},init:function(a){this.count=a;var b=this.puzzle.board;this.rect={bx1:b.maxbx-3.15,by1:-1.8,bx2:b.maxbx-.15,by2:-.2}},set:function(a){a<=0&&(a=1),this.count!==a&&(this.addOpe(this.count,a),this.count=a,this.draw())},getmaxnum:function(){var a=this.board;return Math.max(Math.floor(a.cols/4),1)},getminnum:function(){return 1},addOpe:function(a,b){this.puzzle.opemgr.add(new this.klass.StarCountOperation(a,b))},draw:function(){this.puzzle.painter.paintRange(this.board.minbx,-1,this.board.maxbx,-1)}},"StarCountOperation:Operation":{type:"starCount",setData:function(a,b){this.old=a,this.num=b},decode:function(a){return"AS"===a[0]&&(this.old=+a[1],this.num=+a[2],!0)},toString:function(){return["AS",this.old,this.num].join(",")},undo:function(){this.exec(this.old)},redo:function(){this.exec(this.num)},exec:function(a){this.board.starCount.set(a)}},OperationManager:{addExtraOperation:function(){this.operationlist.push(this.klass.StarCountOperation)}},AreaRoomGraph:{enabled:!0},Graphic:{paint:function(){this.drawBGCells(),this.drawDashedGrid(),this.drawBorders(),this.drawCrossMarks(),this.drawStars(),this.drawChassis(),this.drawStarCount(),this.drawCursor_starbattle()},getCanvasRows:function(){return this.getBoardRows()+2*this.margin+.8},getOffsetRows:function(){return.4},setRangeObject:function(a,b,c,d){this.common.setRangeObject.call(this,a,b,c,d),this.range.starCount=b<0},copyBufferData:function(a,b,c,d,e,f){if(this.common.copyBufferData.call(this,a,b,c,d,e,f),a.use.canvas&&this.range.starCount){var g=this.board,h=b.child.width,i=(g.minby-.1)*this.bh+this.y0;a.context.clearRect(0,0-this.y0,h,i),a.drawImage(b.child,0,0,h-0,i-0,0-this.x0,0-this.y0,h-0,i-0)}},drawCrossMarks:function(){var a=this.vinc("cell_cross","auto",!0);a.lineWidth=1;for(var b=.35*this.cw,c=this.range.cells,d=0;d<c.length;d++){var e,f,g=c[d];if(a.vid="c_cross_"+g.id,1===g.qsub){var e=g.bx*this.bw,f=g.by*this.bh;a.strokeStyle=g.trial?"rgb(192, 192, 192)":this.mbcolor,a.strokeCross(e,f,b)}else a.vhide()}},drawStars:function(){for(var a=this.vinc("cell_star","auto",!0),b=this.range.cells,c=0;c<b.length;c++){var d=b[c];a.vid="c_star_"+d.id,1===d.qans?(a.fillStyle=d.trial?this.trialcolor:this.qanscolor,this.dispStar(a,d.bx*this.bw,d.by*this.bh,.9*this.bw,.9*this.bh)):a.vhide()}},drawStarCount:function(){var a=this.vinc("starcount","auto",!0),b=this.board;this.range.starCount&&(a.use.canvas&&a.context.clearRect(0,-this.y0,a.child.width,(b.minby-.1)*this.bh+this.y0),a.fillStyle=this.quescolor,a.vid="bd_starCount",a.font=(.66*this.ch|0)+"px "+this.fontfamily,a.textAlign="right",a.textBaseline="middle",a.fillText(""+b.starCount.count,(b.maxbx-1.8)*this.bw,-this.bh),a.vid="bd_star",this.dispStar(a,(b.maxby-1)*this.bw,-this.bh,.7*this.bw,.7*this.bh))},drawCursor_starbattle:function(){var a=this.vinc("target_cursor","crispEdges",!0),b=this.board;if(this.range.starCount){var c=this.puzzle.editmode&&this.puzzle.getConfig("cursor")&&!this.outputImage;if(a.vid="ti",c){var d=b.starCount.rect;a.strokeStyle=this.targetColor1,a.lineWidth=0|Math.max(this.cw/16,2),a.strokeRect(d.bx1*this.bw,d.by1*this.bh,(d.bx2-d.bx1)*this.bw,(d.by2-d.by1)*this.bh)}else a.vhide()}},dispStar:function(c,d,e,f,g){c.beginPath(),c.moveTo(d,e-g);for(var h=1;h<10;h++)c.lineTo(d+f*a[h],e+g*b[h]);c.closePath(),c.fill()}},Encode:{decodePzpr:function(a){this.decodeStarCount(),this.decodeBorder()},encodePzpr:function(a){this.encodeStarCount(),this.encodeBorder()},decodeStarCount:function(){var a=this.outbstr.split("/");this.board.starCount.count=+a[0],this.outbstr=a[1]?a[1]:""},encodeStarCount:function(){this.outbstr=this.board.starCount.count+"/"}},FileIO:{decodeData:function(){this.board.starCount.count=+this.readLine(),this.decodeAreaRoom(),this.decodeCellAns()},encodeData:function(){this.writeLine(this.board.starCount.count),this.encodeAreaRoom(),this.encodeCellAns()}},AnsCheck:{checklist:["checkAroundStars","checkOverSaturatedStars","checkInsufficientStars","checkStarCountInLine"],checkAroundStars:function(){for(var a=this.board,b=0;b<a.cell.length;b++){var c=a.cell[b];if(1===c.qans){var d=null,e=new this.klass.CellList;if(e.add(c),d=c.relcell(2,0),1===d.qans&&e.add(d),d=c.relcell(0,2),1===d.qans&&e.add(d),d=c.relcell(-2,2),1===d.qans&&e.add(d),d=c.relcell(2,2),1===d.qans&&e.add(d),!(e.length<=1)){if(this.failcode.add("starAround"),this.checkOnly)break;e.seterr(1)}}}},checkInsufficientStars:function(){var a=this.board;this.checkAllBlock(a.roommgr,function(a){return 1===a.qans},function(b,c,d,e){return d>=a.starCount.count},"bkStarLt")},checkOverSaturatedStars:function(){var a=this.board;this.checkAllBlock(a.roommgr,function(a){return 1===a.qans},function(b,c,d,e){return d<=a.starCount.count},"bkStarGt")},checkStarCountInLine:function(){this.checkRowsCols(this.isStarCountInClist,"lnStarNe")},isStarCountInClist:function(a){var b=a.filter(function(a){return 1===a.qans}).length===this.board.starCount.count;return b||a.seterr(1),b}},FailCode:{starAround:["星がタテヨコナナメに隣接しています。","Stars are adjacent."],bkStarGt:["ブロックに入る星の数が多すぎます。","The number of stars in a block is more than the problem."],bkStarLt:["ブロックに入る星の数が少ないです。","The number of stars in a block is less than the problem."],lnStarNe:["1つの行に入る星の数が間違っています。","The number of stars in a line is other than the problem."]}})}();