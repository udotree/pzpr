/*! @license pzpr.js v0.11.1 (c) 2009-2019 sabo2, MIT license
 *   https://github.com/sabo2/pzprv3 */

!function(a,b){"object"==typeof module&&module.exports?module.exports=[a,b]:pzpr.classmgr.makeCustom(a,b)}(["building"],{MouseEvent:{inputModes:{edit:["number"],play:["number","clear"]},mouseinput_number:function(){this.mousestart&&(this.puzzle.editmode?this.inputqnum_excell():this.inputqnum())},mouseinput_auto:function(){if(this.puzzle.playmode)if(this.mousestart){var a=this.getcell_excell();a.isnull||("cell"===a.group?this.inputqnum():this.inputflash())}else this.inputflash();else this.puzzle.editmode&&this.mousestart&&this.inputqnum_excell()},mouseevent:function(a){if(this.isclearflash=!1,0===a){var b=this.getpos(0).getex();b.isnull||1!==b.qinfo||(this.isclearflash=!0)}this.common.mouseevent.call(this,a)},inputflash:function(){var a=this.getpos(0).getex(),b=this.puzzle,c=b.board;a.isnull||this.mouseCell===a||(this.isclearflash?(c.lightclear(),this.mousereset()):(c.flashlight(a),this.mouseCell=a))},inputqnum_excell:function(){var a=this.getpos(0).getex();a.isnull||(a!==this.cursor.getex()?this.setcursor(a):this.inputqnum_main(a))}},KeyEvent:{enablemake:!0,enableplay:!0,moveTarget:function(a){return this.puzzle.playmode?this.moveTCell(a):this.moveEXCell(a)},keyinput:function(a){if(this.puzzle.playmode)this.key_inputqnum(a);else{var b=this.cursor.getex();b.isnull||this.key_inputqnum_main(b,a)}}},TargetCursor:{initCursor:function(){this.init(-1,-1),this.adjust_init()},setminmax_customize:function(){this.puzzle.editmode||(this.minx+=2,this.miny+=2,this.maxx-=2,this.maxy-=2)},adjust_init:function(){this.puzzle.playmode?this.common.adjust_init.call(this):this.puzzle.editmode&&this.adjust_cell_to_excell()}},Cell:{enableSubNumberArray:!0,maxnum:function(){return Math.max(this.board.cols,this.board.rows)}},EXCell:{disInputHatena:!0,maxnum:function(){var a=this.board;return this.by<0||this.by>2*a.rows?a.rows:a.cols}},Board:{cols:5,rows:5,hasborder:1,hasexcell:2,flashlight:function(a){this.lightclear(),this.searchSight(a,!0),this.puzzle.redraw()},lightclear:function(){if(this.hasinfo){for(var a=0;a<this.cell.length;a++)this.cell[a].qinfo=0;for(var a=0;a<this.excell.length;a++)this.excell[a].qinfo=0;this.haslight=!1,this.puzzle.redraw()}},searchSight:function(a,b){for(var c=0,d=[],e=0;e<this.cell.length;e++)d[e]=0;var f=a.getaddr(),g=0,h=0;for(f.by===this.minby+1?g=2:f.by===this.maxby-1?g=1:f.bx===this.minbx+1?g=4:f.bx===this.maxbx-1&&(g=3);0!==g;){f.movedir(g,2);var i=f.getc();if(i.isnull)break;i.anum<=h||(h=i.anum,d[i.id]=1,c++)}if(b){a.qinfo=1;for(var e=0;e<this.cell.length;e++)d[e]&&(this.cell[e].qinfo=d[e]);this.hasinfo=!0}return{cnt:c}}},Graphic:{gridcolor_type:"LIGHT",lightcolor:"rgb(255, 255, 127)",paint:function(){this.drawBGCells(),this.drawBGEXcells(),this.drawTargetSubNumber(),this.drawGrid(),this.drawBorders(),this.drawSubNumbers(),this.drawAnsNumbers(),this.drawArrowNumbersEXCell_skyscrapers(),this.drawChassis(),this.drawCursor()},getBGCellColor:function(a){return 1===a.error?this.errbcolor1:1===a.qinfo?this.lightcolor:null},getBGEXcellColor:function(a){return 1===a.error?this.errbcolor1:1===a.qinfo?this.lightcolor:null},drawArrowNumbersEXCell_skyscrapers:function(){for(var a=this.vinc("excell_number","auto"),b=this.board,c=.5*this.bw,d=.5*this.bh,e=.3*this.bw,f=.3*this.bh,g=.25*this.bh,h=.25*this.bw,i={ratio:.7},j=this.range.excells,k=0;k<j.length;k++){var l=j[k],m=l.qnum,n=l.bx*this.bw,o=l.by*this.bh,p=m>=0?""+m:"";p&&(a.fillStyle=this.getQuesNumberColor(l)),a.vid="excell_arrow_"+l.id,p?(a.beginPath(),l.by===b.minby+1?a.setOffsetLinePath(n,o+d,0,f,h,0,-h,0):l.by===b.maxby-1?a.setOffsetLinePath(n,o-d,0,-f,h,0,-h,0):l.bx===b.minbx+1?a.setOffsetLinePath(n+c,o,e,0,0,g,0,-g):l.bx===b.maxbx-1&&a.setOffsetLinePath(n-c,o,-e,0,0,g,0,-g),a.fill()):a.vhide(),a.vid="excell_text_"+l.id,p?(l.by===b.minby+1?o-=.1*this.ch:l.by===b.maxby-1?o+=.1*this.ch:l.bx===b.minbx+1?n-=.1*this.cw:l.bx===b.maxbx-1&&(n+=.1*this.cw),this.disptext(p,n,o,i)):a.vhide()}}},Encode:{decodePzpr:function(a){this.decodeNumber16EXCell()},encodePzpr:function(a){this.encodeNumber16EXCell()},decodeNumber16EXCell:function(){var a=0,b=0,c=this.outbstr,d=this.board;for(b=0;b<c.length;b++){var e=c.charAt(b),f=d.excell[a];if(this.include(e,"0","9")||this.include(e,"a","f")?f.qnum=parseInt(c.substr(b,1),16):"-"===e?(f.qnum=parseInt(c.substr(b+1,2),16),b+=2):"."===e?f.qnum=-2:e>="g"&&e<="z"&&(a+=parseInt(e,36)-16),++a>=d.excell.length)break}this.outbstr=c.substr(b+1)},encodeNumber16EXCell:function(){for(var a=0,b="",c=this.board,d=0;d<c.excell.length;d++){var e="",f=c.excell[d].qnum;-2===f?e=".":f>=0&&f<16?e=f.toString(16):f>=16&&f<256?e="-"+f.toString(16):a++,0===a?b+=e:(e||20===a)&&(b+=(15+a).toString(36)+e,a=0)}a>0&&(b+=(15+a).toString(36)),this.outbstr+=b}},FileIO:{decodeData:function(){this.decodeCellEXCellQnumAnumsub()},encodeData:function(){this.encodeCellEXCellQnumAnumsub()},decodeCellEXCellQnumAnumsub:function(){this.decodeCellExcell(function(a,b){"."!==b&&("excell"===a.group?a.qnum=+b:"cell"===a.group&&(b.indexOf("[")>=0&&(b=this.setCellSnum(a,b)),"."!==b&&(a.anum=+b)))})},encodeCellEXCellQnumAnumsub:function(){this.encodeCellExcell(function(a){if("excell"===a.group){if(-1!==a.qnum)return a.qnum+" "}else if("cell"===a.group){var b=".",c=a.anum;return-1!==c?b=""+c:b+=this.getCellSnum(a),b+" "}return". "})}},AnsCheck:{checklist:["checkDifferentNumberInLine","checkSight","checkNoNumCell+"],checkSight:function(a){for(var b=this.board,c=!0,d=new this.klass.EXCellList,e=0;e<b.excell.length;e++){var f=b.excell[e];if(-1!==f.qnum){var g=b.searchSight(f,!1).cnt;if(f.qnum!==g){if(c=!1,this.checkOnly)break;f.seterr(1),d.add(f)}}}c||(this.failcode.add("nmSightNe"),d.each(function(a){b.searchSight(a,!0)}))}},FailCode:{nmSightNe:["見えるビルの数が正しくありません。","The count of seeable buildings is wrong."]}});