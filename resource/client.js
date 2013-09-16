'use strict';var m,p=this;function aa(a,b){var c=a.split("."),d=p;c[0]in d||!d.execScript||d.execScript("var "+c[0]);for(var e;c.length&&(e=c.shift());)c.length||void 0===b?d=d[e]?d[e]:d[e]={}:d[e]=b}
function r(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b}function ba(a){var b=r(a);return"array"==b||"object"==b&&"number"==typeof a.length}function ca(a){return"string"==typeof a}var da="closure_uid_"+(1E9*Math.random()>>>0),ea=0;function fa(a,b,c){return a.call.apply(a.bind,arguments)}
function ha(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function u(a,b,c){u=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?fa:ha;return u.apply(null,arguments)}var v=Date.now||function(){return+new Date};
function w(a,b){function c(){}c.prototype=b.prototype;a.W=b.prototype;a.prototype=new c};var ia="closure_listenable_"+(1E6*Math.random()|0);function ja(a){try{return!(!a||!a[ia])}catch(b){return!1}}var ka=0;function la(a,b,c,d,e){this.p=a;this.b=null;this.src=b;this.type=c;this.capture=!!d;this.M=e;this.key=++ka;this.t=this.L=!1}function ma(a){a.t=!0;a.p=null;a.b=null;a.src=null;a.M=null};var na="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function oa(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<na.length;f++)c=na[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}};var y=Array.prototype,pa=y.indexOf?function(a,b,c){return y.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(ca(a))return ca(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},qa=y.forEach?function(a,b,c){y.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=ca(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)};function sa(a){var b=a.length;if(0<b){for(var c=Array(b),d=0;d<b;d++)c[d]=a[d];return c}return[]};function ta(a){this.src=a;this.b={};this.c=0}function ua(a,b,c,d,e){var f=a.b[b];f||(f=a.b[b]=[],a.c++);var g=va(f,c,d,e);-1<g?(a=f[g],a.L=!1):(a=new la(c,a.src,b,!!d,e),a.L=!1,f.push(a));return a}function wa(a,b){var c=b.type;if(c in a.b){var d=a.b[c],e=pa(d,b),f;(f=0<=e)&&y.splice.call(d,e,1);f&&(ma(b),0==a.b[c].length&&(delete a.b[c],a.c--))}}function va(a,b,c,d){for(var e=0;e<a.length;++e){var f=a[e];if(!f.t&&f.p==b&&f.capture==!!c&&f.M==d)return e}return-1};var z,xa,ya,za;function Aa(){return p.navigator?p.navigator.userAgent:null}za=ya=xa=z=!1;var Ba;if(Ba=Aa()){var Ca=p.navigator;z=0==Ba.lastIndexOf("Opera",0);xa=!z&&(-1!=Ba.indexOf("MSIE")||-1!=Ba.indexOf("Trident"));ya=!z&&-1!=Ba.indexOf("WebKit");za=!z&&!ya&&!xa&&"Gecko"==Ca.product}var Da=z,A=xa,Ea=za,Fa=ya;function Ga(){var a=p.document;return a?a.documentMode:void 0}var Ha;
a:{var Ia="",Ja;if(Da&&p.opera)var Ka=p.opera.version,Ia="function"==typeof Ka?Ka():Ka;else if(Ea?Ja=/rv\:([^\);]+)(\)|;)/:A?Ja=/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/:Fa&&(Ja=/WebKit\/(\S+)/),Ja)var La=Ja.exec(Aa()),Ia=La?La[1]:"";if(A){var Ma=Ga();if(Ma>parseFloat(Ia)){Ha=String(Ma);break a}}Ha=Ia}var Na={};
function B(a){var b;if(!(b=Na[a])){b=0;for(var c=String(Ha).replace(/^[\s\xa0]+|[\s\xa0]+$/g,"").split("."),d=String(a).replace(/^[\s\xa0]+|[\s\xa0]+$/g,"").split("."),e=Math.max(c.length,d.length),f=0;0==b&&f<e;f++){var g=c[f]||"",h=d[f]||"",k=/(\d*)(\D*)/g,l=/(\d*)(\D*)/g;do{var n=k.exec(g)||["","",""],q=l.exec(h)||["","",""];if(0==n[0].length&&0==q[0].length)break;b=((0==n[1].length?0:parseInt(n[1],10))<(0==q[1].length?0:parseInt(q[1],10))?-1:(0==n[1].length?0:parseInt(n[1],10))>(0==q[1].length?
0:parseInt(q[1],10))?1:0)||((0==n[2].length)<(0==q[2].length)?-1:(0==n[2].length)>(0==q[2].length)?1:0)||(n[2]<q[2]?-1:n[2]>q[2]?1:0)}while(0==b)}b=Na[a]=0<=b}return b}var Oa=p.document,Pa=Oa&&A?Ga()||("CSS1Compat"==Oa.compatMode?parseInt(Ha,10):5):void 0;var Qa=!A||A&&9<=Pa,Ra=A&&!B("9");!Fa||B("528");Ea&&B("1.9b")||A&&B("8")||Da&&B("9.5")||Fa&&B("528");Ea&&!B("8")||A&&B("9");function C(){0!=Sa&&(Ta[this[da]||(this[da]=++ea)]=this)}var Sa=0,Ta={};C.prototype.j=!1;C.prototype.aa=function(){if(!this.j&&(this.j=!0,this.n(),0!=Sa)){var a=this[da]||(this[da]=++ea);delete Ta[a]}};C.prototype.n=function(){if(this.r)for(;this.r.length;)this.r.shift()()};function D(a,b){this.type=a;this.b=this.u=b}D.prototype.aa=function(){};D.prototype.c=!1;D.prototype.e=!0;D.prototype.preventDefault=function(){this.e=!1};function Ua(a){Ua[" "](a);return a}Ua[" "]=function(){};function Va(a,b){if(a){var c=this.type=a.type;D.call(this,c);this.u=a.target||a.srcElement;this.b=b;var d=a.relatedTarget;if(d&&Ea)try{Ua(d.nodeName)}catch(e){}this.offsetX=Fa||void 0!==a.offsetX?a.offsetX:a.layerX;this.offsetY=Fa||void 0!==a.offsetY?a.offsetY:a.layerY;this.keyCode=a.keyCode||0;this.charCode=a.charCode||("keypress"==c?a.keyCode:0);this.ctrlKey=a.ctrlKey;this.altKey=a.altKey;this.ba=a;a.defaultPrevented&&this.preventDefault();delete this.c}}w(Va,D);m=Va.prototype;m.u=null;
m.offsetX=0;m.offsetY=0;m.keyCode=0;m.charCode=0;m.ctrlKey=!1;m.altKey=!1;m.ba=null;m.preventDefault=function(){Va.W.preventDefault.call(this);var a=this.ba;if(a.preventDefault)a.preventDefault();else if(a.returnValue=!1,Ra)try{if(a.ctrlKey||112<=a.keyCode&&123>=a.keyCode)a.keyCode=-1}catch(b){}};var Wa="closure_lm_"+(1E6*Math.random()|0),Xa={},Ya=0;function Za(a,b,c,d,e){if("array"==r(b))for(var f=0;f<b.length;f++)Za(a,b[f],c,d,e);else if(c=$a(c),ja(a))ua(a.m,b,c,d,e);else{if(!b)throw Error("Invalid event type");var f=!!d,g=cb(a);g||(a[Wa]=g=new ta(a));c=ua(g,b,c,d,e);c.b||(d=db(),c.b=d,d.src=a,d.p=c,a.addEventListener?a.addEventListener(b,d,f):a.attachEvent(b in Xa?Xa[b]:Xa[b]="on"+b,d),Ya++)}}
function db(){var a=eb,b=Qa?function(c){return a.call(b.src,b.p,c)}:function(c){c=a.call(b.src,b.p,c);if(!c)return c};return b}function fb(a,b,c,d,e){if("array"==r(b))for(var f=0;f<b.length;f++)fb(a,b[f],c,d,e);else(c=$a(c),ja(a))?(a=a.m,b in a.b&&(f=a.b[b],c=va(f,c,d,e),-1<c&&(ma(f[c]),y.splice.call(f,c,1),0==f.length&&(delete a.b[b],a.c--)))):a&&(a=cb(a))&&(b=a.b[b],a=-1,b&&(a=va(b,c,!!d,e)),(c=-1<a?b[a]:null)&&gb(c))}
function gb(a){if("number"!=typeof a&&a&&!a.t){var b=a.src;if(ja(b))wa(b.m,a);else{var c=a.type,d=a.b;b.removeEventListener?b.removeEventListener(c,d,a.capture):b.detachEvent&&b.detachEvent(c in Xa?Xa[c]:Xa[c]="on"+c,d);Ya--;(c=cb(b))?(wa(c,a),0==c.c&&(c.src=null,b[Wa]=null)):ma(a)}}}function hb(a,b,c,d){var e=1;if(a=cb(a))if(b=a.b[b])for(b=sa(b),a=0;a<b.length;a++){var f=b[a];f&&f.capture==c&&!f.t&&(e&=!1!==ib(f,d))}return Boolean(e)}
function ib(a,b){var c=a.p,d=a.M||a.src;a.L&&gb(a);return c.call(d,b)}
function eb(a,b){if(a.t)return!0;if(!Qa){var c;if(!(c=b))a:{c=["window","event"];for(var d=p,e;e=c.shift();)if(null!=d[e])d=d[e];else{c=null;break a}c=d}e=c;c=new Va(e,this);d=!0;if(!(0>e.keyCode||void 0!=e.returnValue)){a:{var f=!1;if(0==e.keyCode)try{e.keyCode=-1;break a}catch(g){f=!0}if(f||void 0==e.returnValue)e.returnValue=!0}e=[];for(f=c.b;f;f=f.parentNode)e.push(f);for(var f=a.type,h=e.length-1;!c.c&&0<=h;h--)c.b=e[h],d&=hb(e[h],f,!0,c);for(h=0;!c.c&&h<e.length;h++)c.b=e[h],d&=hb(e[h],f,!1,
c)}return d}return ib(a,new Va(b,this))}function cb(a){a=a[Wa];return a instanceof ta?a:null}var jb="__closure_events_fn_"+(1E9*Math.random()>>>0);function $a(a){return"function"==r(a)?a:a[jb]||(a[jb]=function(b){return a.handleEvent(b)})};var kb="StopIteration"in p?p.StopIteration:Error("StopIteration");function lb(){}lb.prototype.b=function(){throw kb;};lb.prototype.Z=function(){return this};function mb(a){if(a instanceof lb)return a;if("function"==typeof a.Z)return a.Z(!1);if(ba(a)){var b=0,c=new lb;c.b=function(){for(;;){if(b>=a.length)throw kb;if(b in a)return a[b++];b++}};return c}throw Error("Not implemented");}
function nb(a,b){if(ba(a))try{qa(a,b,void 0)}catch(c){if(c!==kb)throw c;}else{a=mb(a);try{for(;;)b.call(void 0,a.b(),void 0,a)}catch(d){if(d!==kb)throw d;}}};function ob(a,b){this.o={};this.g=[];this.c=this.b=0;var c=arguments.length;if(1<c){if(c%2)throw Error("Uneven number of arguments");for(var d=0;d<c;d+=2)pb(this,arguments[d],arguments[d+1])}else if(a){var e;if(a instanceof ob)for(d=qb(a),rb(a),e=[],c=0;c<a.g.length;c++)e.push(a.o[a.g[c]]);else{var c=[],f=0;for(d in a)c[f++]=d;d=c;c=[];f=0;for(e in a)c[f++]=a[e];e=c}for(c=0;c<d.length;c++)pb(this,d[c],e[c])}}function qb(a){rb(a);return a.g.concat()}
function rb(a){if(a.b!=a.g.length){for(var b=0,c=0;b<a.g.length;){var d=a.g[b];Object.prototype.hasOwnProperty.call(a.o,d)&&(a.g[c++]=d);b++}a.g.length=c}if(a.b!=a.g.length){for(var e={},c=b=0;b<a.g.length;)d=a.g[b],Object.prototype.hasOwnProperty.call(e,d)||(a.g[c++]=d,e[d]=1),b++;a.g.length=c}}function pb(a,b,c){Object.prototype.hasOwnProperty.call(a.o,b)||(a.b++,a.g.push(b),a.c++);a.o[b]=c}ob.prototype.f=function(){return new ob(this)};
ob.prototype.Z=function(a){rb(this);var b=0,c=this.g,d=this.o,e=this.c,f=this,g=new lb;g.b=function(){for(;;){if(e!=f.c)throw Error("The map has changed since the iterator was created");if(b>=c.length)throw kb;var g=c[b++];return a?g:d[g]}};return g};function E(a,b){C.call(this);this.f=b;this.c=[];if(a>this.f)throw Error("[goog.structs.SimplePool] Initial cannot be greater than max");for(var c=0;c<a;c++)this.c.push(this.b())}w(E,C);E.prototype.b=function(){return{}};E.prototype.e=function(a){var b=typeof a;if("object"==b&&null!=a||"function"==b)if("function"==r(a.aa))a.aa();else for(var c in a)delete a[c]};E.prototype.n=function(){E.W.n.call(this);for(var a=this.c;a.length;)this.e(a.pop());delete this.c};function sb(){this.c=[];this.f=new ob;this.b=new ob;this.r=1;this.j=new E(0,4E3);this.j.b=function(){return new tb};this.B=new E(0,50);this.B.b=function(){return new ub};var a=this;this.e=new E(0,2E3);this.e.b=function(){return String(a.r++)};this.e.e=function(){}}function ub(){this.time=this.count=0}ub.prototype.toString=function(){var a=[];a.push(this.type," ",this.count," (",Math.round(10*this.time)/10," ms)");return a.join("")};function tb(){}
function vb(a,b,c){var d=[];-1==b?d.push("    "):d.push(wb(a.c-b));d.push(" ",xb(a.c-0));0==a.b?d.push(" Start        "):1==a.b?(d.push(" Done "),d.push(wb(a.j-a.startTime)," ms ")):d.push(" Comment      ");d.push(c,a);0<a.f&&d.push("[VarAlloc ",a.f,"] ");return d.join("")}tb.prototype.toString=function(){return null==this.type?this.e:"["+this.type+"] "+this.e};
sb.prototype.toString=function(){for(var a=[],b=-1,c=[],d=0;d<this.c.length;d++){var e=this.c[d];1==e.b&&c.pop();a.push(" ",vb(e,b,c.join("")));b=e.c;a.push("\n");0==e.b&&c.push("|  ")}if(0!=this.f.b){var f=v();a.push(" Unstopped timers:\n");nb(this.f,function(b){a.push("  ",b," (",f-b.startTime," ms, started at ",xb(b.startTime),")\n")})}b=qb(this.b);for(d=0;d<b.length;d++)c=Object.prototype.hasOwnProperty.call(this.b.o,b[d])?this.b.o[b[d]]:void 0,1<c.count&&a.push(" TOTAL ",c,"\n");a.push("Total tracers created ",
0,"\n","Total comments created ",0,"\n","Overhead start: ",0," ms\n","Overhead end: ",0," ms\n","Overhead comment: ",0," ms\n");return a.join("")};function wb(a){a=Math.round(a);var b="";1E3>a&&(b=" ");100>a&&(b="  ");10>a&&(b="   ");return b+a}function xb(a){a=Math.round(a);return String(100+a/1E3%60).substring(1,3)+"."+String(1E3+a%1E3).substring(1,4)}new sb;function F(){C.call(this);this.m=new ta(this);this.B=this}w(F,C);F.prototype[ia]=!0;F.prototype.f=null;F.prototype.removeEventListener=function(a,b,c,d){fb(this,a,b,c,d)};
function yb(a,b){var c,d=a.f;if(d)for(c=[];d;d=d.f)c.push(d);var d=a.B,e=b,f=e.type||e;if(ca(e))e=new D(e,d);else if(e instanceof D)e.u=e.u||d;else{var g=e,e=new D(f,d);oa(e,g)}var g=!0,h;if(c)for(var k=c.length-1;!e.c&&0<=k;k--)h=e.b=c[k],g=zb(h,f,!0,e)&&g;e.c||(h=e.b=d,g=zb(h,f,!0,e)&&g,e.c||(g=zb(h,f,!1,e)&&g));if(c)for(k=0;!e.c&&k<c.length;k++)h=e.b=c[k],g=zb(h,f,!1,e)&&g}
F.prototype.n=function(){F.W.n.call(this);if(this.m){var a=this.m,b=0,c;for(c in a.b){for(var d=a.b[c],e=0;e<d.length;e++)++b,ma(d[e]);delete a.b[c];a.c--}}this.f=null};function zb(a,b,c,d){b=a.m.b[b];if(!b)return!0;b=sa(b);for(var e=!0,f=0;f<b.length;++f){var g=b[f];if(g&&!g.t&&g.capture==c){var h=g.p,k=g.M||g.src;g.L&&wa(a.m,g);e=!1!==h.call(k,d)&&e}}return e&&!1!=d.e};function Ab(a,b){F.call(this);this.da=void 0!==a?a:!0;this.c=b||Bb;this.e=this.c(this.J)}w(Ab,F);m=Ab.prototype;m.k=null;m.K=null;m.F=void 0;m.$=!1;m.J=0;function Bb(a){return Math.min(1E3*Math.pow(2,a),6E4)}m.ca=function(a,b){null!=this.b&&p.clearTimeout(this.b);this.b=null;this.K=a;this.k=(this.F=b)?new WebSocket(this.K,this.F):new WebSocket(this.K);this.k.onopen=u(this.ha,this);this.k.onclose=u(this.ea,this);this.k.onmessage=u(this.ga,this);this.k.onerror=u(this.fa,this)};
function Cb(a){null!=a.b&&p.clearTimeout(a.b);a.b=null;a.k&&(a.$=!0,a.k.close(),a.k=null)}m.ha=function(){yb(this,"d");this.J=0;this.e=this.c(this.J)};
m.ea=function(){yb(this,"a");this.k=null;if(this.$)this.K=null,this.F=void 0;else if(this.da){var a=u(this.ca,this,this.K,this.F),b=this.e;if("function"==r(a))this&&(a=u(a,this));else if(a&&"function"==typeof a.handleEvent)a=u(a.handleEvent,a);else throw Error("Invalid listener argument");this.b=2147483647<b?-1:p.setTimeout(a,b||0);this.J++;this.e=this.c(this.J)}this.$=!1};m.ga=function(a){yb(this,new Db(a.data))};m.fa=function(a){yb(this,new Eb(a.data))};m.n=function(){Ab.W.n.call(this);Cb(this)};
function Db(a){D.call(this,"c");this.message=a}w(Db,D);function Eb(a){D.call(this,"b");this.data=a}w(Eb,D);var Fb=new Ab,Gb=!1;function G(a){Gb&&(a=JSON.stringify(a),Fb.k.send(a))}Fb.ca("wss://"+location.host+"/ws");Za(Fb,"d",Hb);Za(Fb,"a",Ib);Za(Fb,"c",Jb);var Kb=[],Lb=[];function Hb(){Gb=!0;Kb.forEach(function(a){a()})}function Ib(){Gb=!1;Lb.forEach(function(a){a()})}var H={};function Jb(a){a=JSON.parse(a.message);var b,c;for(c in a)if(b=H[c])"Kick"==c&&Cb(Fb),b(a[c])};var I=document.createElement("canvas");aa("screenshot",function(){window.open(I.toDataURL())});var J=I.getContext("2d"),K=window.innerWidth,L=window.innerHeight;I.width=K;I.height=L;window.addEventListener("resize",function(){I.width=K=window.innerWidth;I.height=L=window.innerHeight;M()},!1);var Mb=Infinity,Nb=0;function M(a){a=!isNaN(a)&&0<a?a:0;var b=a+v();Mb>b&&(Nb&&clearTimeout(Nb),Nb=setTimeout(function(){window.requestAnimationFrame(Ob);Nb=0;Mb=Infinity},a),Mb=b)}var Pb=!1;
Kb.push(function(){Pb=!0;M()});Lb.push(function(){Pb=!1;M()});
function Ob(){J.clearRect(0,0,K,L);if(Pb){for(var a=K,b=L,c=Qb(),d=Rb(),c=a/2/32-c,d=b/2/32-d,e=0;256>e;e+=16)for(var f=0;256>f;f+=16)Sb.d(c+e+8-0.5,d+f+16-1);for(var g=0;2>g;g++)for(Tb=!g,f=Math.max(0,Math.floor(-b/2-d));f<Math.min(256,Math.floor(b/2-d));f++){for(e=Math.max(0,Math.floor((-a/2-c)/2));e<Math.min(128,Math.floor((a/2-c)/2));e++){var h=N[e<<1|f<<8];if(h)for(var k in h)h[k].d(c,d)}for(e=Math.max(0,Math.floor((-a/2-c)/2));e<Math.min(128,Math.floor((a/2-c)/2));e++)if(h=N[e<<1|f<<8|1])for(k in h)h[k].d(c,
d)}Ub(c,d);Vb()}else Xb.d(K/2/32,L/2/32)}I.onmousemove=function(a){var b=a.offsetX||a.layerX;a=a.offsetY||a.layerY;var c=K,d=L;Yb(b,a,c,d)&&(a=b=-Infinity);Zb(b,a,c,d)};I.onmouseout=function(){var a=K,b=L;Yb(-Infinity,-Infinity,a,b);Zb(-Infinity,-Infinity,a,b)};var $b=!0;window.addEventListener("blur",function(){$b=!1},!1);window.addEventListener("focus",function(){setTimeout(function(){$b=!0},100)},!1);
I.onclick=function(a){if($b){var b=a.offsetX||a.layerX,c=a.offsetY||a.layerY,d=K;a=L;var e;a:if(Yb(b,c,d,a),ac)bc("inv"),e=!0;else{for(e=O.length-1;0<=e;e--)if(O[e].e(b,c,d,a)){e=!0;break a}e=!1}if(!(e||(d=d/2/32-Qb(),a=a/2/32-Rb(),b=Math.floor(b/32-d),c=Math.ceil(c/32-a),0>b||256<=b||0>c||256<=c))){a=[];for(var f in N[b|c<<8])"_"!=f.charAt(0)&&(d=N[b|c<<8][f],d.b.length&&"_fl"!=d.b[0].c&&d.l.length&&a.unshift(d));a.length?G({Interact:{ID:a[0].id,X:a[0].x,Y:a[0].y,Action:a[0].l[0]}}):G({Walk:{X:b,
Y:c}})}}else $b=!0};I.oncontextmenu=function(a){a.preventDefault();$b=!0;var b=a.offsetX||a.layerX,c=a.offsetY||a.layerY,d=K;a=L;var e;a:{Yb(b,c,d,a);for(e=O.length-1;0<=e;e--)if(O[e].j(b,c,d,a)){e=!0;break a}e=!1}if(!(e||(d=d/2/32-Qb(),a=a/2/32-Rb(),b=Math.floor(b/32-d),c=Math.ceil(c/32-a),0>b||256<=b||0>c||256<=c))){a=[];for(var f in N[b|c<<8])"_"!=f.charAt(0)&&(d=N[b|c<<8][f],d.b.length&&"_fl"!=d.b[0].c&&d.l.length&&a.unshift(d));1==a.length?bc("menu",a[0]):a.length&&bc("menu2",a)}};function P(a,b,c,d,e,f,g,h){function k(){function c(a,b){return e?a:128<=a?255-(255-a)*(255-b)/127:a*b/127}if(q.width&&q.height){l.width=q.width;l.height=q.height;var d=l.getContext("2d");a in Q||(Q[a]={});b in Q[a]||(Q[a][b]=[]);if(n in Q[a][b])l.width*=n,l.height*=n,d.drawImage(Q[a][b][n],0,0);else{Q[a][b][n]=l;var e="no"==b;e&&(b="#000");d.fillStyle=b;d.fillRect(0,0,1,1);var f=d.getImageData(0,0,1,1),g=f.data[0],h=f.data[1],k=f.data[2],Dc=f.data[3];d.clearRect(0,0,1,1);d.drawImage(q,0,0);f=d.getImageData(0,
0,q.width,q.height);l.width*=n;l.height*=n;for(var ra=d.getImageData(0,0,l.width,l.height),Wb=0,R=0,ga=0,ab=0;ab<l.height;ab++){for(var bb=0;bb<l.width;bb++)ra.data[ga+0]=c(f.data[R+0],g),ra.data[ga+1]=c(f.data[R+1],h),ra.data[ga+2]=c(f.data[R+2],k),ra.data[ga+3]=f.data[R+3]*Dc/255,bb%n==n-1&&(R+=4),ga+=4;ab%n==n-1?Wb=R:R=Wb}d.putImageData(ra,0,0);M()}}}var l=document.createElement("canvas");this.j=l;this.c=c;this.r=d;this.B=e;this.f=f;this.e=g;var n=Math.floor(h)||1;this.b=n;var q;a+=".png";(q=cc[a])?
k():(q=new Image,q.onload=function(){cc[a]=q;k()},q.src=a)}var cc={},Q={};
P.prototype.d=function(a,b){function c(){J.drawImage(f.j,Math.floor(d*f.f*f.b),Math.floor(e*f.e*f.b),Math.floor(f.f*f.b),Math.floor(f.e*f.b),Math.floor(32*a-(f.f*f.b-32)/2),Math.floor(32*b-f.e*f.b),Math.floor(f.f*f.b),Math.floor(f.e*f.b))}var d=this.r,e=this.B,f=this;if(Tb)"_fl"==this.c&&(b+=0.5,c());else{switch(this.c){case "ccr":d+=[0,6,3,9][Math.floor(v()/1500)%4];M(1500-v()%1500);break;case "wa":d+=[0,1,0,2][Math.floor(v()/150)%4];M(150-v()%150);break;case "l2":d+=Math.floor(v()/150)%2;M(150-
v()%150);break;case "l3":d+=Math.floor(v()/150)%3;M(150-v()%150);break;case "_ac":if(2>e)break;var g=v()/1E4;switch(e){case 2:case 3:case 4:case 5:b+=Math.sin(5*g+7*Math.cos(3*g)+e)/8}M(100);break;case "wa_ac":d+=[0,1,0,2][Math.floor(v()/150)%4];M(50);if(2>e)break;g=v()/1E4;switch(e){case 2:case 3:case 4:case 5:b+=Math.sin(5*g+7*Math.cos(3*g)+e)/8}break;case "_fl":return}c()}};var Tb=!1;P.prototype.width=function(){return this.f*this.b};P.prototype.height=function(){return this.e*this.b};
function dc(a){return new P(a.S,a.C,a.E.a||"",a.E.x||0,a.E.y||0,a.E.w||32,a.E.h||32,a.E.s||1)};function ec(a,b,c,d){this.id=c;this.Q=this.x=a;this.V=this.y=b;this.e=0;this.name=d.N;var e=[];this.b=e;(d.S||[]).forEach(function(a){e.push(dc(a))});this.l=d.A||[];this.c=d.H}ec.prototype.f=function(){var a=new ec(this.x,this.y,this.id,{N:this.name,A:this.l,S:null,H:this.c});a.b=this.b;return a};function fc(a,b){a.name=b.N;a.l=b.A||[];var c=a.b;c.length=0;(b.S||[]).forEach(function(a){c.push(dc(a))});a.c=b.H}function gc(a,b,c){a.Q=S(a.x,a.Q,a.e);a.V=S(a.y,a.V,a.e);a.x=b;a.y=c;a.e=v()}
ec.prototype.d=function(a,b){var c=S(this.x,this.Q,this.e),d=S(this.y,this.V,this.e),e=0,f=0;this.b.forEach(function(n){e=Math.max(e,n.width());f=Math.max(f,n.height());n.d(c+a,d+b)});if(this.c&&this.b.length){var g=32*(c+a),h=32*(d+b)-f-5,k=this.c[0],l=this.c[1];J.fillStyle="#000";J.fillRect(g,h,e,3);J.fillStyle="rgb("+Math.floor(Math.min(Math.max(510-510*(k/l),0),255))+","+Math.floor(Math.min(Math.max(510*(k/l),0),255))+",0)";J.fillRect(g,h,e*k/l,3)}};
function S(a,b,c){c=v()-c;return 400>c?(M(),(c*a+(400-c)*b)/400):a};function T(a,b,c,d){this.b=a;this.j=b;this.e=c?1:0.5;this.c=32*this.e+"px "+(c?'"Jolly Lodger"':'"Open Sans Condensed"');this.f=!d}T.prototype.width=function(){J.font=this.c;return J.measureText(this.b).width/32};T.prototype.height=function(){return this.e};
T.prototype.d=function(a,b){J.font=this.c;var c=J.measureText(this.b).width;a=Math.floor(32*a-(this.f?c/2:0));b=Math.floor(32*b);J.fillStyle="rgba(0,0,0,.2)";for(c=-1;1>=c;c++)for(var d=-1;2>=d;d++)J.fillText(this.b,a+c,b+d);J.fillStyle=this.j;J.fillText(this.b,a,b)};var Xb=new T("connection lost","#aaa",!0);function hc(a,b,c,d,e){this.c=a;this.f=b;this.b=c;this.e=d;this.j=e}
var O=[],ic=new T("Character","#ccc",!0),jc=new T("change name","#aaa",!1),kc=new T("change name","#fff",!1),lc=new T("change skin color","#aaa",!1),mc=new T("change skin color","#fff",!1),nc=new T("change shirt color","#aaa",!1),oc=new T("change shirt color","#fff",!1),pc=new T("change pants color","#aaa",!1),qc=new T("change pants color","#fff",!1),rc=new T("Confirm","#aaa",!0),sc=new T("Confirm","#fff",!0),tc=new T("[push enter to chat]","#ccc",!1,!0),U={};
function bc(a,b){var c=U[a](b||{});c.b(uc[0],uc[1],uc[2],uc[3]);var d=!1;O.forEach(function(b,f){if(b.c==a)return d=!0,O[f]=c,!1});d||O.push(c);M()}function V(a){O.forEach(function(b,c){if(b.c==a)return O.splice(c,1),M(),!1})}H.HUD=function(a){O.length=0;M();a.N.length&&bc(a.N,a.D)};var ac=!1,vc=new P("ui_icons","no","",0,0,32,32),wc=new P("ui_icons","#bbb","",0,0,32,32);
function Vb(){var a=K,b=L;null==W?tc.d(0.1,b/32-0.1):(new T(W+"_","#fff",!1,!0)).d(0.1,b/32-0.1);xc.forEach(function(a,d){a.d(0.1,b/32-d/2-0.6)});ac?wc.d(a/32-1,b/32):vc.d(a/32-1,b/32);O.forEach(function(c){c.f(a,b)})}var uc=[-Infinity,-Infinity,1,1];function Yb(a,b,c,d){uc=[a,b,c,d];if(a>=c-32&&a<=c&&b>=d-32&&b<=d)return ac||(ac=!0,M()),!0;ac&&(ac=!1,M());for(var e=O.length-1;0<=e;e--)if(O[e].b(a,b,c,d))return!0;return!1}
window.addEventListener("keydown",function(a){if(I.parentNode&&!a.ctrlKey&&!a.altKey)switch(20>a.keyCode&&a.preventDefault(),a.keyCode){case 8:null!==W&&0<W.length&&(W=W.substring(0,W.length-1),M());break;case 13:null===W?W="":(G({Chat:W}),W=null);M();break;case 27:null!==W&&(W=null,M())}},!1);window.addEventListener("keypress",function(a){null!==W&&(W+=String.fromCharCode(a.charCode),M())},!1);Kb.push(function(){O.length=0;W=null});var W=null,xc=[];
H.Msg=function(a){a.forEach(function(a){xc.unshift(new T(a.T,a.C,!1,!0));window.console.log(a.T);window.setTimeout(function(){xc.pop()},6E4);M()})};var X=[];H.Inventory=function(a){var b={};X.forEach(function(a){b[a.id]=a});X.length=0;a.forEach(function(a,d){var e=b[a.I];e?(fc(e,a.O),gc(e,d%8,Math.floor(d/8))):e=new ec(d%8,Math.floor(d/8),a.I,a.O);X.push(e)});M()};var Y=window.sessionStorage.rnoadm_username||"",Z=window.sessionStorage.rnoadm_password||"",$=document.querySelector("form"),yc=$.querySelector("#username"),zc=$.querySelector("#password"),Ac=$.querySelector("#password2");Kb.push(function(){Y.length&&2<Z.length&&(yc.value=Y,zc.value=Z,Ac.value=Z,$.onsubmit())});aa("admin",function(a){G({Admin:[].slice.call(arguments).map(String)})});zc.onchange=function(){Ac.value=zc.value};
$.onsubmit=function(){Y=yc.value;Z=zc.value;if(Y.length)if(2>=Z.length)Y=Z="",zc.focus();else{window.sessionStorage.rnoadm_username=Y;window.sessionStorage.rnoadm_password=Z;G({Auth:{U:Y,P:Z}});var a=$.parentNode;a&&(a.removeChild($),a.style.overflow="hidden",a.style.fontSize="0",a.appendChild(I))}else Y=Z="",yc.focus()};H.Kick=function(a){window.sessionStorage.rnoadm_username=Y="";window.sessionStorage.rnoadm_password=Z="";alert(a)};function Bc(a,b,c,d){this.f=a;this.c=b;this.b=v();this.e=new T(c,d,!1)}Bc.prototype.d=function(a,b){var c=S(this.c-0.8,this.c-0.2,this.b)+b,d=Math.min(S(0,2,this.b),1);J.globalAlpha=d;this.e.d(this.f+0.5+a,c);J.globalAlpha=1;return 0<d};var Cc=[];H.Ftxt=function(a){Cc.push(new Bc(a.X,a.Y,a.T,a.C));M()};function Ub(a,b){Cc.length&&M(20);Cc=Cc.filter(function(c){return c.d(a,b)})};var N=Array(65536);H.Update=function(a){a.forEach(function(a){var c=a.I,d=a.X,e=a.Y,f=a.Fx,g=a.Fy,h=a.R,k=a.O;a=d|e<<8;N[a]||(N[a]={});h?(delete N[a][c],M()):void 0!==k?c in N[a]?fc(N[a][c],k):N[a][c]=new ec(d,e,c,k):(f|=g<<8,N[a][c]=N[f][c],delete N[f][c],gc(N[a][c],d,e))});M()};var Ec=0,Fc=127,Gc=127;H.PlayerX=function(a){Gc!=a&&(Fc=Qb(),Gc=a,Ec=v(),M())};function Qb(){return S(Gc,Fc,Ec)}var Hc=0,Ic=127,Jc=127;H.PlayerY=function(a){Jc!=a&&(Ic=Rb(),Jc=a,Hc=v(),M())};
function Rb(){return S(Jc,Ic,Hc)}Lb.push(function(){for(var a=0;a<N.length;a++)delete N[a]});var Sb=new P("grass","#268f1e","",0,0,512,512),Kc=-1,Lc=-1;
function Zb(a,b,c,d){c=c/2/32-Qb();d=d/2/32-Rb();a=Math.floor(a/32-c);b=Math.ceil(b/32-d);if(a!=Kc||b!=Lc)if(I.style.cursor="",!(0>a||255<a||0>b||255<b)){d="";for(var e in N[a|b<<8])"_"!=e.charAt(0)&&(c=N[a|b<<8][e],"_fl"!=c.b[0].c&&c.l.length&&(d=c.l[0]));d&&(I.style.cursor="url(cursor_"+d+".png),auto");-1==Kc&&(Kc=a,Lc=b);G({Mouse:{Fx:Kc,Fy:Lc,X:a,Y:b}});Kc=a;Lc=b}};new function(){v()};!Ea&&!A||A&&A&&9<=Pa||Ea&&B("1.9.1");A&&B("9");var Mc;
U.cc=function(a){var b=[];a.S.forEach(function(a){b.push(dc(a))});var c=new T(a.N,"#aaa",!0),d=new T(a.N,"#fff",!0),e=new T("change gender ("+a.G+")","#aaa",!1),f=new T("change gender ("+a.G+")","#fff",!1),g=!1,h=!1,k=!1,l=!1,n=!1,q=!1,t=!0;return new hc("cc",function(a,s){J.fillStyle="rgba(0,0,0,.7)";J.fillRect(0,0,a,s);a/=64;s/=64;b.forEach(function(b){b.d(a-3,s+1)});ic.d(a+2,s-4);g?(d.d(a,s+2),kc.d(a,s+2.5)):(c.d(a,s+2),jc.d(a,s+2.5));h?f.d(a+2,s-3):e.d(a+2,s-3);k?mc.d(a+2,s-2):lc.d(a+2,s-2);l?
oc.d(a+2,s-1):nc.d(a+2,s-1);n?qc.d(a+2,s):pc.d(a+2,s);q?sc.d(a,s+4):rc.d(a,s+4)},function(a,b,d,f){a/=32;b/=32;d/=64;f/=64;b>=f+2-c.height()&&b<=f+2.5&&Math.abs(d-a)<=Math.max(c.width(),jc.width())/2?(g||M(),g=!0,t=q=n=l=k=h=!1):b>=f-3-e.height()&&b<=f-3&&Math.abs(d+2-a)<=e.width()/2?(h||M(),g=!1,h=!0,t=q=n=l=k=!1):b>=f-2-lc.height()&&b<=f-2&&Math.abs(d+2-a)<=lc.width()/2?(k||M(),h=g=!1,k=!0,t=q=n=l=!1):b>=f-1-nc.height()&&b<=f-1&&Math.abs(d+2-a)<=nc.width()/2?(l||M(),k=h=g=!1,l=!0,t=q=n=!1):b>=f-
pc.height()&&b<=f&&Math.abs(d+2-a)<=pc.width()/2?(n||M(),l=k=h=g=!1,n=!0,t=q=!1):b>=f+4-rc.height()&&b<=f+4&&Math.abs(d-a)<=rc.width()/2?(q||M(),n=l=k=h=g=!1,q=!0,t=!1):(t||M(),q=n=l=k=h=g=!1,t=!0);return!0},function(){switch(!0){case g:G({HUD:{N:"cc",D:"name"}});break;case h:G({HUD:{N:"cc",D:"gender"}});break;case k:G({HUD:{N:"cc",D:"skin"}});break;case l:G({HUD:{N:"cc",D:"shirt"}});break;case n:G({HUD:{N:"cc",D:"pants"}});break;case q:G({HUD:{N:"cc",D:"accept"}})}return!0},function(){return!0})};
U.examine=function(a){var b=new T(a.N,"#ccc",!0,!0),c=new T(a.E,"#ccc",!1,!0),d=[];(a.I||[]).forEach(function(a){var b=[];d.push(b);a.forEach(function(a){b.push(new T(a[0],a[1],!1,!0))})});return new hc("examine",function(a,f){J.fillStyle="rgba(0,0,0,.7)";J.fillRect(0,0,a,f);var g=a/2/32-6,h=f/2/32-6;b.d(g,h);h+=0.5;c.d(g,h);h+=1;d.forEach(function(b){g=a/2/32-6;b.forEach(function(a){a.d(g,h);g+=a.width()});h+=0.5})},function(){return!0},function(){V("examine");return!0},function(){V("examine");return!0})};
U.forge=function(a){var b=[];a.O.forEach(function(a){X.forEach(function(c){c.id==a.i&&b.push(c.f())})});b.forEach(function(a,b){a.x=a.Q=b%8;a.y=a.V=Math.floor(b/8)});var c=[];a.C.forEach(function(a){c.push(a.map(dc))});var d=new Date(a.T),e=null,f=new P("forge","no","",0,0,64,32),g=new T("Forge","#ccc",!0,!0),h=new T("Inventory","#aaa",!1,!0),k=null,l=null;return new hc("forge",function(a,e){J.fillStyle="rgba(0,0,0,.7)";J.fillRect(a/2-240,e/2-160,512,352);J.fillStyle="#000";J.beginPath();J.moveTo(a/
2-240,e/2-160);J.lineTo(a/2+272,e/2-160);J.lineTo(a/2+224,e/2-192);J.lineTo(a/2-232,e/2-192);J.closePath();J.fill();var t=a/32/2,x=e/32/2;f.d(t-7,x-5);g.d(t-5.5,x-5.1);var s=d-new Date;0<s&&(M(s%1E3),(new T(Math.floor(s/1E3)+"s remaining","#fff",!1,!0)).d(t-7.5,x-4.6));c.forEach(function(a,b){a.forEach(function(a){a.d(t-7.5+b%8,x-3.5+Math.floor(b/8))})});h.d(t+0.5,x-4.6);b.forEach(function(a){a.d(t+0.5,x-3.5)});k&&k.d(t+0.5,x+5);l&&l.d(t+0.5,x+5.5)},function(c,d,f,g){c=c/32-f/32/2;d=d/32-g/32/2;if(8<
Math.abs(c-0.5)||6<Math.abs(d))return!1;c=Math.floor(c-0.5);f=Math.floor(d+4.5);0<=c&&8>c&&0<=f&&c+8*f<b.length?(d=b[c+8*f],d!=e&&(c=a.O[c+8*f],e=d,k=new T(d.name,"#ccc",!1,!0),l=new T("quality "+c.q+"  weight "+Math.round(c.w/100)/10+"kg  volume "+c.v+"cc","#aaa",!1,!0),M())):e&&(l=k=e=null,M());return!0},function(a,b,c,d){if(8<Math.abs(a/32-c/32/2-0.5)||6<Math.abs(b/32-d/32/2))return V("forge"),!1;e&&G({HUD:{N:"forge",D:{A:"a",I:e.id}}});return!0},function(a,b,c,d){return 8<Math.abs(a/32-c/32/2-
0.5)||6<Math.abs(b/32-d/32/2)?(V("forge"),!1):!0})};
U.inv=function(){var a=-1,b=-1,c=-Infinity,d=-Infinity;return new hc("inv",function(e,f){var g=Math.ceil(X.length/8),h=e/32-8.1,k=f/32-0.1-g;J.fillStyle="rgba(0,0,0,.7)";J.fillRect(e-262.4,f-32*(g+1.2),262.4,32*(g+0.2));X.forEach(function(a){a.d(h,k)});if(0<=a&&8>a&&0<=b&&b<g&&a+8*b<X.length){var g=new T(X[a+8*b].name,"#fff",!1,!0),l=32*(g.width()+0.2),n=32*(g.height()+0.2);J.fillStyle="rgba(0,0,0,.7)";J.fillRect(c-l,d,l,n);g.d(c/32-g.width()-0.1,d/32+g.height()+0.1)}},function(e,f,g,h){var k=Math.ceil(X.length/
8);c=e;d=f;a=Math.floor((e-g)/32+8.1);b=Math.floor((f-h)/32+k+1.1);M();if(b>k||-1>a)V("inv");else return!0},function(){return!0},function(){var c=Math.ceil(X.length/8);0<=a&&8>a&&0<=b&&b<c&&a+8*b<X.length&&bc("menu",X[a+8*b])})};
U.menu=function(a){var b=-1,c=null,d=null,e=!1,f=[],g=[],h=a.l;h.forEach(function(b){b=b+" "+a.name;f.push(new T(b,"#aaa",!1,!0));g.push(new T(b,"#fff",!1,!0))});var k=-2;f.forEach(function(a){k=Math.max(a.width(),k)});var k=32*(k+0.2),l=Math.floor(32*(h.length/2+0.2));return new hc("menu",function(a,q){e&&(e=!1,c+k>a&&(c=a-k),d+l>q&&(d=q-l));J.fillStyle="rgba(0,0,0,.7)";J.fillRect(c||0,d||0,k,l);-1!=b&&(J.fillStyle="#000",J.fillRect(c||0,(d||0)+32*(b/2+0.1),k,16));for(var t=c/32+0.1,x=d/32+0.5,s=
0;s<h.length;s++)s==b?g[s].d(t,x+s/2):f[s].d(t,x+s/2)},function(a,f){null===c&&(c=a,d=f,e=!0,M());a>=c&&a<c+k&&f>=Math.floor(d+3.2)&&f<Math.floor(d+32*(h.length/2+0.1))?(b=Math.floor(2*(f-d)/32-0.1),b>=h.length&&(b=-1)):(b=-1,(a<c-32||a>c+k+32||f<Math.floor(d-32)||f>d+l+32)&&V("menu"));M();return!0},function(){-1!=b&&G({Interact:{ID:a.id,X:a.x,Y:a.y,Action:h[b]}});V("menu");return!0},function(){V("menu");return!0})};
U.menu2=function(a){var b=-1,c=null,d=null,e=!1,f=[],g=[];a.forEach(function(a){a=a.name;f.push(new T(a,"#aaa",!1,!0));g.push(new T(a,"#fff",!1,!0))});var h=-2;f.forEach(function(a){h=Math.max(a.width(),h)});var h=32*(h+0.2),k=Math.floor(32*(a.length/2+0.2));return new hc("menu2",function(l,n){e&&(e=!1,c+h>l&&(c=l-h),d+k>n&&(d=n-k));J.fillStyle="rgba(0,0,0,.7)";J.fillRect(c||0,d||0,h,k);-1!=b&&(J.fillStyle="#000",J.fillRect(c||0,(d||0)+32*(b/2+0.1),h,16));for(var q=c/32+0.1,t=d/32+0.5,x=0;x<a.length;x++)x==
b?g[x].d(q,t+x/2):f[x].d(q,t+x/2)},function(f,g){null===c&&(c=f,d=g,e=!0,M());f>=c&&f<c+h&&g>=Math.floor(d+3.2)&&g<d+Math.floor(32*(a.length/2+0.1))?(b=Math.floor(2*(g-d)/32-0.1),b>=a.length&&(b=-1)):(b=-1,(f<c-32||f>c+h+32||g<d-32||g>d+k+32)&&V("menu2"));M();return!0},function(){-1!=b&&bc("menu",a[b]);V("menu2");return!0},function(){V("menu2");return!0})};H.ClientHash=function(a){void 0!==Mc?Mc!=a&&location.reload(!0):Mc=a};
