/*! @license pzpr.js v0.11.1 (c) 2009-2019 sabo2, MIT license
 *   https://github.com/sabo2/pzprv3 */

!function(a,b){"object"==typeof module&&module.exports?module.exports=[a,b]:pzpr.classmgr.makeCustom(a,b)}(["tawa"],{MouseEvent:{use:!0,inputModes:{edit:["number","clear"],play:["shade","unshade"]},mouseinput_auto:function(){this.puzzle.playmode?(this.mousestart||this.mousemove)&&this.inputcell():this.puzzle.editmode&&this.mousestart&&this.inputqnum()},getcell:function(){var a=this.getpos(0),b=a.getc();return b.isnull?a.move(1,0).getc():b},getpos:function(a){return new this.klass.Address(0|this.inputPoint.bx,1+(-2&this.inputPoint.by))}},KeyEvent:{enablemake:!0},TargetCursor:{adjust_init:function(){this.getc().isnull&&this.bx++},movedir:function(a,b){this.common.movedir.call(this,a,b),a===this.UP?this.bx===this.maxx||this.bx>this.minx&&0==(2&this.by)?this.bx--:this.bx++:a===this.DN&&(this.bx===this.minx||this.bx<this.maxx&&2==(2&this.by)?this.bx++:this.bx--)}},Cell:{numberRemainsUnshaded:!0,maxnum:6,minnum:0},Board:{cols:6,rows:7,shape:3,hascross:0,setShape:function(a){this.shape=a,this.setminmax()},estimateSize:function(a,b,c){var d=0;return"cell"===a&&(d=0===this.shape?(c>>1)*(2*b-1)+(c%2==1?b:0):3===this.shape||void 0===this.shape?(c>>1)*(2*b+1)+(c%2==1?b:0):b*c),d},setposCells:function(){for(var a=0;a<this.cell.length;a++){var b=this.cell[a];if(b.id=a,b.isnull=!1,0===this.shape){var c=2*a/(2*this.cols-1)|0;b.bx=1+(2*a%(2*this.cols-1)|0),b.by=2*c+1}else if(1===this.shape){var c=a/this.cols|0;b.bx=2*(a%this.cols|0)+(1&c?1:0)+1,b.by=2*c+1}else if(2===this.shape){var c=a/this.cols|0;b.bx=2*(a%this.cols|0)+(1&c?0:1)+1,b.by=2*c+1}else if(3===this.shape){var c=(2*a+1)/(2*this.cols+1)|0;b.bx=1+((2*a+1)%(2*this.cols+1)|0),b.by=2*c+1}}},setminmax:function(){this.minbx=0,this.minby=0,this.maxbx=2*this.cols+[0,1,1,2][this.shape],this.maxby=2*this.rows,this.puzzle.cursor.setminmax()},getc:function(a,b){var c=null,d=this.cols;if(a>=this.minbx+1&&a<=this.maxbx-1&&b>=this.minby+1&&b<=this.maxby-1){var e=b>>1;0===this.shape?a+e&1&&(c=a-1+e*(2*d-1)>>1):1===this.shape?a+e&1&&(c=a-1+e*(2*d)>>1):2===this.shape?a+e&1||(c=a-1+e*(2*d)>>1):3===this.shape&&(a+e&1||(c=a-1+e*(2*d+1)>>1))}return null!==c?this.cell[c]:this.emptycell},getobj:function(a,b){return this.getc(a,b)},cellinside:function(a,b,c,d){for(var e=new this.klass.CellList,f=1|b;f<=d;f+=2)for(var g=a;g<=c;g++){var h=this.getc(g,f);h.isnull||e.add(h)}return e}},BoardExec:{execadjust:function(a){var b=this.board;if(0===a.indexOf("reduce"))if("reduceup"===a||"reducedn"===a){if(b.rows<=1)return}else if(("reducelt"===a||"reducert"===a)&&b.cols<=1&&3!==b.shape)return;this.common.execadjust.call(this,a)},execadjust_main:function(a,b){var c=this.board;if(a&this.TURNFLIP)if(b={x1:c.minbx,y1:c.minby,x2:c.maxbx,y2:c.maxby},a===this.FLIPY)1&c.rows||(c.cols-=[1,0,0,-1][c.shape],c.shape={0:3,1:2,2:1,3:0}[c.shape]);else{if(a!==this.FLIPX)throw"Tawamurenga can't accept turning operation!";c.shape={0:0,1:2,2:1,3:3}[c.shape]}else if(a&this.EXPAND){switch(15&a){case this.LT:c.cols+=[0,0,1,1][c.shape],c.shape=[2,3,0,1][c.shape];break;case this.RT:c.cols+=[0,1,0,1][c.shape],c.shape=[1,0,3,2][c.shape];break;case this.UP:c.cols+=[-1,0,0,1][c.shape],c.shape=[3,2,1,0][c.shape],c.rows++;break;case this.DN:c.rows++}c.setminmax()}if(a&this.EXPAND?this.expandGroup("cell",a):a&this.REDUCE?this.reduceGroup("cell",a):this.turnflipGroup("cell",a,b),a&this.REDUCE)switch(15&a){case this.LT:c.cols-=[1,1,0,0][c.shape],c.shape=[2,3,0,1][c.shape];break;case this.RT:c.cols-=[1,0,1,0][c.shape],c.shape=[1,0,3,2][c.shape];break;case this.UP:c.cols-=[1,0,0,-1][c.shape],c.shape=[3,2,1,0][c.shape],c.rows--;break;case this.DN:c.rows--}c.setposAll()},distObj:function(a,b){var c=this.board;return a&=15,a===this.UP?b.by:a===this.DN?c.maxby-b.by:a===this.LT?b.bx:a===this.RT?c.maxbx-b.bx:-1}},Graphic:{qanscolor:"black",numbercolor_func:"qnum",paint:function(){this.drawBGCells(),this.drawShadedCells(),this.drawDotCells(!1),this.drawGrid_tawa(),this.drawQuesNumbers(),this.drawTarget()},flushCanvas:function(){var a,b,c,d,e=this.vinc("background","crispEdges",!0),f=this.bw,g=this.bh;if(e.use.canvas){var h=this.range;a=h.x1,b=h.y1,c=h.x2-a,d=h.y2-b}else{var i=this.board;a=i.minbx,b=i.minby,c=i.maxbx-a,d=i.maxby-b}e.vid="BG",e.fillStyle=this.bgcolor,e.fillRect(a*f-.5,b*g-.5,c*f+1,d*g+1)},drawGrid_tawa:function(){var a=this.vinc("grid","crispEdges",!0),b=this.board,c=this.range.x1,d=this.range.y1,e=this.range.x2,f=this.range.y2;c<b.minbx&&(c=b.minbx),e>b.maxbx&&(e=b.maxbx),d<b.minby&&(d=b.minby),f>b.maxby&&(f=b.maxby);var g=Math.max(this.cw/36,1),h=(g-1)/2;a.fillStyle=this.gridcolor;var i=Math.max(c,b.minbx),j=Math.min(e,b.maxbx),k=Math.max(d,b.minby),l=Math.min(f,b.maxby);k-=1&k;for(var m=k;m<=l;m+=2){var n=m>>1,o=0,p=0;if(3===b.shape&&(m===b.minby||m===b.maxby&&1&n)||0===b.shape&&m===b.maxby&&!(1&n)?(o=1,p=2):2===b.shape&&(m===b.minby||m===b.maxby&&1&n)||1===b.shape&&m===b.maxby&&!(1&n)?(o=1,p=1):(1===b.shape&&(m===b.minby||m===b.maxby&&1&n)||2===b.shape&&m===b.maxby&&!(1&n))&&(o=0,p=1),a.vid="bdx_"+m,a.fillRect((c+o)*this.bw-h-.5,m*this.bh-h-.5,(e-c-p)*this.bw+1,g),m<b.maxby){var q=i;(2===b.shape||3===b.shape)!=((1&n)!=(1&q))&&q++;for(var r=q;r<=j;r+=2)a.vid=["bdy_",r,m].join("_"),a.fillRect(r*this.bw-h-.5,m*this.bh-h-.5,g,this.ch+1)}}}},Encode:{decodePzpr:function(a){this.decodeTawamurenga()},encodePzpr:function(a){this.encodeTawamurenga()},decodeTawamurenga:function(){var a=this.outbstr.split("/"),b=this.board;b.setShape(+a[0]),b.initBoardSize(b.cols,b.rows),a[1]&&(this.outbstr=a[1],this.decodeNumber10())},encodeTawamurenga:function(){this.outbstr=this.board.shape+"/",this.encodeNumber10()}},FileIO:{decodeData:function(){var a=this.board;a.setShape(+this.readLine()),a.initBoardSize(a.cols,a.rows),this.decodeCellQnumAns()},encodeData:function(){var a=this.board;this.writeLine(a.shape),this.encodeCellQnumAns()},decodeCell:function(a){for(var b=this.board,c=0,d=this.getItemList(b.rows),e=b.minby+1;e<b.maxby;e+=2)for(var f=0;f<=b.maxbx;f++){var g=b.getc(f,e);g.isnull||a(g,d[c++])}},encodeCell:function(a){for(var b=this.board,c=b.minby+1;c<b.maxby;c+=2){for(var d="",e=0;e<=b.maxbx;e++){var f=b.getc(e,c);f.isnull||(d+=a(f))}this.writeLine(d)}}},AnsCheck:{checklist:["checkShadeCellExist","checkThreeShadeCells","checkUnderCells","checkNumbers"],checkThreeShadeCells:function(){for(var a=this.board,b=this.klass.CellList,c=a.minby+1;c<a.maxby;c+=2){for(var d=new b,e=0;e<=a.maxbx;e++){var f=a.getc(e,c);if(!f.isnull)if(f.isUnshade()||f.isNum()){if(d.length>=3)break;d=new b}else d.add(f)}if(!(d.length<3)){if(this.failcode.add("csConsecGt3"),this.checkOnly)break;d.seterr(1)}}},checkNumbers:function(){for(var a=this.board,b=0;b<a.cell.length;b++){var c=a.cell[b];if(c.isValidNum()){var d=new this.klass.CellList;if(d.add(c.relcell(-1,-2)),d.add(c.relcell(1,-2)),d.add(c.relcell(-2,0)),d.add(c.relcell(2,0)),d.add(c.relcell(-1,2)),d.add(c.relcell(1,2)),c.qnum!==d.filter(function(a){return a.isShade()}).length){if(this.failcode.add("nmShadeNe"),this.checkOnly)break;c.seterr(1),d.seterr(1)}}}},checkUnderCells:function(){for(var a=this.board,b=0;b<a.cell.length;b++){var c=a.cell[b];if(!c.isUnshade()&&c.by!==a.maxby-1&&(!c.relcell(-1,2).isShade()&&!c.relcell(1,2).isShade())){if(this.failcode.add("csNotOnShade"),this.checkOnly)break;c.seterr(1)}}}},FailCode:{nmShadeNe:["数字の周りに入っている黒マスの数が違います。","The number of shaded cells around a number is not correct."],csConsecGt3:["黒マスが横に3マス以上続いています。","There or more shaded cells continue horizonally."],csNotOnShade:["黒マスの下に黒マスがありません。","There are no shaded cells under a shaded cell."]}});