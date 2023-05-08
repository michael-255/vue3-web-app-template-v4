import{s as ie,r as M,z as n,ai as et,af as be,aj as tt,v as D,q as Le,ak as at,al as Ee,am as lt,an as nt,ao as ot,ap as st,a0 as rt,aq as it,ar as _e,as as ut,at as ct,C as dt,W as vt,Y as pe,N as mt,B as ft,au as ee,av as pt,aw as bt,ax as gt,ay as ht,E as yt,d as St,u as Ct,A as oe,a as kt,az as xt,b as _t,D as A,K as G,aA as se,o as wt,c as we,e as De,w as j,f as h,Q as ae,l as d,n as H,aB as le,h as w,i as ne,aC as Dt,m as Tt,I as J,aD as $t,a4 as Ft,g as Lt,aE as Et}from"./index-bcd0c63a.js";import{b as Mt,Q as Te}from"./QSelect-54bfbdb9.js";import{T as Ot}from"./TouchPan-6126ce7f.js";import{u as Nt}from"./useDialogs-a5eb05fb.js";import{u as It}from"./useDefaults-58b649dc.js";import{u as qt}from"./useRoutables-8e2fcfd3.js";import{_ as Rt}from"./ResponsivePage.vue_vue_type_script_setup_true_lang-7d23b4d4.js";import"./QItem-b53cd3c9.js";import"./QItemLabel-82f922ab.js";import"./QMenu-eb68067c.js";import"./selection-e8e07d3b.js";import"./SimpleDialog.vue_vue_type_script_setup_true_lang-682ca1b0.js";function Z(a,r,O,u){const e=[];return a.forEach(C=>{u(C)===!0?e.push(C):r.push({failedPropValidation:O,file:C})}),e}function re(a){a&&a.dataTransfer&&(a.dataTransfer.dropEffect="copy"),be(a)}const Vt={multiple:Boolean,accept:String,capture:String,maxFileSize:[Number,String],maxTotalSize:[Number,String],maxFiles:[Number,String],filter:Function},At=["rejected"];function zt({editable:a,dnd:r,getFileInput:O,addFilesToQueue:u}){const{props:e,emit:C,proxy:T}=ie(),y=M(null),q=n(()=>e.accept!==void 0?e.accept.split(",").map(o=>(o=o.trim(),o==="*"?"*/":(o.endsWith("/*")&&(o=o.slice(0,o.length-1)),o.toUpperCase()))):null),b=n(()=>parseInt(e.maxFiles,10)),$=n(()=>parseInt(e.maxTotalSize,10));function U(o){if(a.value)if(o!==Object(o)&&(o={target:null}),o.target!==null&&o.target.matches('input[type="file"]')===!0)o.clientX===0&&o.clientY===0&&et(o);else{const m=O();m&&m!==o.target&&m.click(o)}}function N(o){a.value&&o&&u(null,o)}function R(o,m,I,B){let f=Array.from(m||o.target.files);const F=[],W=()=>{F.length>0&&C("rejected",F)};if(e.accept!==void 0&&q.value.indexOf("*/")===-1&&(f=Z(f,F,"accept",p=>q.value.some(S=>p.type.toUpperCase().startsWith(S)||p.name.toUpperCase().endsWith(S))),f.length===0))return W();if(e.maxFileSize!==void 0){const p=parseInt(e.maxFileSize,10);if(f=Z(f,F,"max-file-size",S=>S.size<=p),f.length===0)return W()}if(e.multiple!==!0&&f.length>0&&(f=[f[0]]),f.forEach(p=>{p.__key=p.webkitRelativePath+p.lastModified+p.name+p.size}),B===!0){const p=I.map(S=>S.__key);f=Z(f,F,"duplicate",S=>p.includes(S.__key)===!1)}if(f.length===0)return W();if(e.maxTotalSize!==void 0){let p=B===!0?I.reduce((S,i)=>S+i.size,0):0;if(f=Z(f,F,"max-total-size",S=>(p+=S.size,p<=$.value)),f.length===0)return W()}if(typeof e.filter=="function"){const p=e.filter(f);f=Z(f,F,"filter",S=>p.includes(S))}if(e.maxFiles!==void 0){let p=B===!0?I.length:0;if(f=Z(f,F,"max-files",()=>(p++,p<=b.value)),f.length===0)return W()}if(W(),f.length>0)return f}function L(o){re(o),r.value!==!0&&(r.value=!0)}function g(o){be(o),(o.relatedTarget!==null||tt.is.safari!==!0?o.relatedTarget!==y.value:document.elementsFromPoint(o.clientX,o.clientY).includes(y.value)===!1)===!0&&(r.value=!1)}function z(o){re(o);const m=o.dataTransfer.files;m.length>0&&u(null,m),r.value=!1}function P(o){if(r.value===!0)return D("div",{ref:y,class:`q-${o}__dnd absolute-full`,onDragenter:re,onDragover:re,onDragleave:g,onDrop:z})}return Object.assign(T,{pickFiles:U,addFiles:N}),{pickFiles:U,addFiles:N,onDragover:L,onDragleave:g,processFiles:R,getDndNode:P,maxFilesNumber:b,maxTotalSizeNumber:$}}const Bt=Le({name:"QFile",inheritAttrs:!1,props:{...at,...Ee,...Vt,modelValue:[File,FileList,Array],append:Boolean,useChips:Boolean,displayValue:[String,Number],tabindex:{type:[String,Number],default:0},counterLabel:Function,inputClass:[Array,String,Object],inputStyle:[Array,String,Object]},emits:[...lt,...At],setup(a,{slots:r,emit:O,attrs:u}){const{proxy:e}=ie(),C=nt(),T=M(null),y=M(!1),q=ot(a),{pickFiles:b,onDragover:$,onDragleave:U,processFiles:N,getDndNode:R}=zt({editable:C.editable,dnd:y,getFileInput:l,addFilesToQueue:s}),L=st(a),g=n(()=>Object(a.modelValue)===a.modelValue?"length"in a.modelValue?Array.from(a.modelValue):[a.modelValue]:[]),z=n(()=>_e(g.value)),P=n(()=>g.value.map(c=>c.name).join(", ")),o=n(()=>ut(g.value.reduce((c,E)=>c+E.size,0))),m=n(()=>({totalSize:o.value,filesNumber:g.value.length,maxFiles:a.maxFiles})),I=n(()=>({tabindex:-1,type:"file",title:"",accept:a.accept,capture:a.capture,name:q.value,...u,id:C.targetUid.value,disabled:C.editable.value!==!0})),B=n(()=>"q-file q-field--auto-height"+(y.value===!0?" q-file--dnd":"")),f=n(()=>a.multiple===!0&&a.append===!0);function F(c){const E=g.value.slice();E.splice(c,1),p(E)}function W(c){const E=g.value.findIndex(c);E>-1&&F(E)}function p(c){O("update:modelValue",a.multiple===!0?c:c[0])}function S(c){c.keyCode===13&&ct(c)}function i(c){(c.keyCode===13||c.keyCode===32)&&b(c)}function l(){return T.value}function s(c,E){const Q=N(c,E,g.value,f.value),te=l();te!=null&&(te.value=""),Q!==void 0&&((a.multiple===!0?a.modelValue&&Q.every(ue=>g.value.includes(ue)):a.modelValue===Q[0])||p(f.value===!0?g.value.concat(Q):Q))}function k(){return[D("input",{class:[a.inputClass,"q-file__filler"],style:a.inputStyle})]}function K(){if(r.file!==void 0)return g.value.length===0?k():g.value.map((E,Q)=>r.file({index:Q,file:E,ref:this}));if(r.selected!==void 0)return g.value.length===0?k():r.selected({files:g.value,ref:this});if(a.useChips===!0)return g.value.length===0?k():g.value.map((E,Q)=>D(Mt,{key:"file-"+Q,removable:C.editable.value,dense:!0,textColor:a.color,tabindex:a.tabindex,onRemove:()=>{F(Q)}},()=>D("span",{class:"ellipsis",textContent:E.name})));const c=a.displayValue!==void 0?a.displayValue:P.value;return c.length>0?[D("div",{class:a.inputClass,style:a.inputStyle,textContent:c})]:k()}function X(){const c={ref:T,...I.value,...L.value,class:"q-field__input fit absolute-full cursor-pointer",onChange:s};return a.multiple===!0&&(c.multiple=!0),D("input",c)}return Object.assign(C,{fieldClass:B,emitValue:p,hasValue:z,inputRef:T,innerValue:g,floatingLabel:n(()=>z.value===!0||_e(a.displayValue)),computedCounter:n(()=>{if(a.counterLabel!==void 0)return a.counterLabel(m.value);const c=a.maxFiles;return`${g.value.length}${c!==void 0?" / "+c:""} (${o.value})`}),getControlChild:()=>R("file"),getControl:()=>{const c={ref:C.targetRef,class:"q-field__native row items-center cursor-pointer",tabindex:a.tabindex};return C.editable.value===!0&&Object.assign(c,{onDragover:$,onDragleave:U,onKeydown:S,onKeyup:i}),D("div",c,[X()].concat(K()))}}),Object.assign(e,{removeAtIndex:F,removeFile:W,getNativeElement:()=>T.value}),rt(e,"nativeEl",()=>T.value),it(C)}}),$e="q-slider__marker-labels",jt=a=>({value:a}),Pt=({marker:a})=>D("div",{key:a.value,style:a.style,class:a.classes},a.label),Me=[34,37,40,33,39,38],Ut={...ft,...Ee,min:{type:Number,default:0},max:{type:Number,default:100},innerMin:Number,innerMax:Number,step:{type:Number,default:1,validator:a=>a>=0},snap:Boolean,vertical:Boolean,reverse:Boolean,hideSelection:Boolean,color:String,markerLabelsClass:String,label:Boolean,labelColor:String,labelTextColor:String,labelAlways:Boolean,switchLabelSide:Boolean,markers:[Boolean,Number],markerLabels:[Boolean,Array,Object,Function],switchMarkerLabelsSide:Boolean,trackImg:String,trackColor:String,innerTrackImg:String,innerTrackColor:String,selectionColor:String,selectionImg:String,thumbSize:{type:String,default:"20px"},trackSize:{type:String,default:"4px"},disable:Boolean,readonly:Boolean,dense:Boolean,tabindex:[String,Number],thumbColor:String,thumbPath:{type:String,default:"M 4, 10 a 6,6 0 1,0 12,0 a 6,6 0 1,0 -12,0"}},Wt=["pan","update:modelValue","change"];function Qt({updateValue:a,updatePosition:r,getDragging:O,formAttrs:u}){const{props:e,emit:C,slots:T,proxy:{$q:y}}=ie(),q=dt(e,y),b=gt(u),$=M(!1),U=M(!1),N=M(!1),R=M(!1),L=n(()=>e.vertical===!0?"--v":"--h"),g=n(()=>"-"+(e.switchLabelSide===!0?"switched":"standard")),z=n(()=>e.vertical===!0?e.reverse===!0:e.reverse!==(y.lang.rtl===!0)),P=n(()=>isNaN(e.innerMin)===!0||e.innerMin<e.min?e.min:e.innerMin),o=n(()=>isNaN(e.innerMax)===!0||e.innerMax>e.max?e.max:e.innerMax),m=n(()=>e.disable!==!0&&e.readonly!==!0&&P.value<o.value),I=n(()=>(String(e.step).trim().split(".")[1]||"").length),B=n(()=>e.step===0?1:e.step),f=n(()=>m.value===!0?e.tabindex||0:-1),F=n(()=>e.max-e.min),W=n(()=>o.value-P.value),p=n(()=>ce(P.value)),S=n(()=>ce(o.value)),i=n(()=>e.vertical===!0?z.value===!0?"bottom":"top":z.value===!0?"right":"left"),l=n(()=>e.vertical===!0?"height":"width"),s=n(()=>e.vertical===!0?"width":"height"),k=n(()=>e.vertical===!0?"vertical":"horizontal"),K=n(()=>{const t={role:"slider","aria-valuemin":P.value,"aria-valuemax":o.value,"aria-orientation":k.value,"data-step":e.step};return e.disable===!0?t["aria-disabled"]="true":e.readonly===!0&&(t["aria-readonly"]="true"),t}),X=n(()=>`q-slider q-slider${L.value} q-slider--${$.value===!0?"":"in"}active inline no-wrap `+(e.vertical===!0?"row":"column")+(e.disable===!0?" disabled":" q-slider--enabled"+(m.value===!0?" q-slider--editable":""))+(N.value==="both"?" q-slider--focus":"")+(e.label||e.labelAlways===!0?" q-slider--label":"")+(e.labelAlways===!0?" q-slider--label-always":"")+(q.value===!0?" q-slider--dark":"")+(e.dense===!0?" q-slider--dense q-slider--dense"+L.value:""));function c(t){const v="q-slider__"+t;return`${v} ${v}${L.value} ${v}${L.value}${g.value}`}function E(t){const v="q-slider__"+t;return`${v} ${v}${L.value}`}const Q=n(()=>{const t=e.selectionColor||e.color;return"q-slider__selection absolute"+(t!==void 0?` text-${t}`:"")}),te=n(()=>E("markers")+" absolute overflow-hidden"),ue=n(()=>E("track-container")),Oe=n(()=>c("pin")),Ne=n(()=>c("label")),Ie=n(()=>c("text-container")),qe=n(()=>c("marker-labels-container")+(e.markerLabelsClass!==void 0?` ${e.markerLabelsClass}`:"")),Re=n(()=>"q-slider__track relative-position no-outline"+(e.trackColor!==void 0?` bg-${e.trackColor}`:"")),Ve=n(()=>{const t={[s.value]:e.trackSize};return e.trackImg!==void 0&&(t.backgroundImage=`url(${e.trackImg}) !important`),t}),Ae=n(()=>"q-slider__inner absolute"+(e.innerTrackColor!==void 0?` bg-${e.innerTrackColor}`:"")),ge=n(()=>{const t={[i.value]:`${100*p.value}%`,[l.value]:`${100*(S.value-p.value)}%`};return e.innerTrackImg!==void 0&&(t.backgroundImage=`url(${e.innerTrackImg}) !important`),t});function ze(t){const{min:v,max:x,step:_}=e;let V=v+t*(x-v);if(_>0){const Y=(V-v)%_;V+=(Math.abs(Y)>=_/2?(Y<0?-1:1)*_:0)-Y}return I.value>0&&(V=parseFloat(V.toFixed(I.value))),ee(V,P.value,o.value)}function ce(t){return F.value===0?0:(t-e.min)/F.value}function Be(t,v){const x=pt(t),_=e.vertical===!0?ee((x.top-v.top)/v.height,0,1):ee((x.left-v.left)/v.width,0,1);return ee(z.value===!0?1-_:_,p.value,S.value)}const he=n(()=>vt(e.markers)===!0?e.markers:B.value),ye=n(()=>{const t=[],v=he.value,x=e.max;let _=e.min;do t.push(_),_+=v;while(_<x);return t.push(x),t}),Se=n(()=>{const t=` ${$e}${L.value}-`;return $e+`${t}${e.switchMarkerLabelsSide===!0?"switched":"standard"}${t}${z.value===!0?"rtl":"ltr"}`}),de=n(()=>e.markerLabels===!1?null:Pe(e.markerLabels).map((t,v)=>({index:v,value:t.value,label:t.label||t.value,classes:Se.value+(t.classes!==void 0?" "+t.classes:""),style:{...ke(t.value),...t.style||{}}}))),Ce=n(()=>({markerList:de.value,markerMap:Ue.value,classes:Se.value,getStyle:ke})),je=n(()=>{if(W.value!==0){const t=100*he.value/W.value;return{...ge.value,backgroundSize:e.vertical===!0?`2px ${t}%`:`${t}% 2px`}}return null});function Pe(t){if(t===!1)return null;if(t===!0)return ye.value.map(jt);if(typeof t=="function")return ye.value.map(x=>{const _=t(x);return pe(_)===!0?{..._,value:x}:{value:x,label:_}});const v=({value:x})=>x>=e.min&&x<=e.max;return Array.isArray(t)===!0?t.map(x=>pe(x)===!0?x:{value:x}).filter(v):Object.keys(t).map(x=>{const _=t[x],V=Number(x);return pe(_)===!0?{..._,value:V}:{value:V,label:_}}).filter(v)}function ke(t){return{[i.value]:`${100*(t-e.min)/F.value}%`}}const Ue=n(()=>{if(e.markerLabels===!1)return null;const t={};return de.value.forEach(v=>{t[v.value]=v}),t});function We(){if(T["marker-label-group"]!==void 0)return T["marker-label-group"](Ce.value);const t=T["marker-label"]||Pt;return de.value.map(v=>t({marker:v,...Ce.value}))}const Qe=n(()=>[[Ot,Ge,void 0,{[k.value]:!0,prevent:!0,stop:!0,mouse:!0,mouseAllDir:!0}]]);function Ge(t){t.isFinal===!0?(R.value!==void 0&&(r(t.evt),t.touch===!0&&a(!0),R.value=void 0,C("pan","end")),$.value=!1,N.value=!1):t.isFirst===!0?(R.value=O(t.evt),r(t.evt),a(),$.value=!0,C("pan","start")):(r(t.evt),a())}function xe(){N.value=!1}function Ke(t){r(t,O(t)),a(),U.value=!0,$.value=!0,document.addEventListener("mouseup",ve,!0)}function ve(){U.value=!1,$.value=!1,a(!0),xe(),document.removeEventListener("mouseup",ve,!0)}function He(t){r(t,O(t)),a(!0)}function Je(t){Me.includes(t.keyCode)&&a(!0)}function Xe(t){if(e.vertical===!0)return null;const v=y.lang.rtl!==e.reverse?1-t:t;return{transform:`translateX(calc(${2*v-1} * ${e.thumbSize} / 2 + ${50-100*v}%))`}}function Ye(t){const v=n(()=>U.value===!1&&(N.value===t.focusValue||N.value==="both")?" q-slider--focus":""),x=n(()=>`q-slider__thumb q-slider__thumb${L.value} q-slider__thumb${L.value}-${z.value===!0?"rtl":"ltr"} absolute non-selectable`+v.value+(t.thumbColor.value!==void 0?` text-${t.thumbColor.value}`:"")),_=n(()=>({width:e.thumbSize,height:e.thumbSize,[i.value]:`${100*t.ratio.value}%`,zIndex:N.value===t.focusValue?2:void 0})),V=n(()=>t.labelColor.value!==void 0?` text-${t.labelColor.value}`:""),Y=n(()=>Xe(t.ratio.value)),me=n(()=>"q-slider__text"+(t.labelTextColor.value!==void 0?` text-${t.labelTextColor.value}`:""));return()=>{const fe=[D("svg",{class:"q-slider__thumb-shape absolute-full",viewBox:"0 0 20 20","aria-hidden":"true"},[D("path",{d:e.thumbPath})]),D("div",{class:"q-slider__focus-ring fit"})];return(e.label===!0||e.labelAlways===!0)&&(fe.push(D("div",{class:Oe.value+" absolute fit no-pointer-events"+V.value},[D("div",{class:Ne.value,style:{minWidth:e.thumbSize}},[D("div",{class:Ie.value,style:Y.value},[D("span",{class:me.value},t.label.value)])])])),e.name!==void 0&&e.disable!==!0&&b(fe,"push")),D("div",{class:x.value,style:_.value,...t.getNodeData()},fe)}}function Ze(t,v,x,_){const V=[];e.innerTrackColor!=="transparent"&&V.push(D("div",{key:"inner",class:Ae.value,style:ge.value})),e.selectionColor!=="transparent"&&V.push(D("div",{key:"selection",class:Q.value,style:t.value})),e.markers!==!1&&V.push(D("div",{key:"marker",class:te.value,style:je.value})),_(V);const Y=[bt("div",{key:"trackC",class:ue.value,tabindex:v.value,...x.value},[D("div",{class:Re.value,style:Ve.value},V)],"slide",m.value,()=>Qe.value)];if(e.markerLabels!==!1){const me=e.switchMarkerLabelsSide===!0?"unshift":"push";Y[me](D("div",{key:"markerL",class:qe.value},We()))}return Y}return mt(()=>{document.removeEventListener("mouseup",ve,!0)}),{state:{active:$,focus:N,preventFocus:U,dragging:R,editable:m,classes:X,tabindex:f,attributes:K,step:B,decimals:I,trackLen:F,innerMin:P,innerMinRatio:p,innerMax:o,innerMaxRatio:S,positionProp:i,sizeProp:l,isReversed:z},methods:{onActivate:Ke,onMobileClick:He,onBlur:xe,onKeyup:Je,getContent:Ze,getThumbRenderFn:Ye,convertRatioToModel:ze,convertModelToRatio:ce,getDraggingRatio:Be}}}const Gt=()=>({}),Kt=Le({name:"QSlider",props:{...Ut,modelValue:{required:!0,default:null,validator:a=>typeof a=="number"||a===null},labelValue:[String,Number]},emits:Wt,setup(a,{emit:r}){const{proxy:{$q:O}}=ie(),{state:u,methods:e}=Qt({updateValue:L,updatePosition:z,getDragging:g,formAttrs:ht(a)}),C=M(null),T=M(0),y=M(0);function q(){y.value=a.modelValue===null?u.innerMin.value:ee(a.modelValue,u.innerMin.value,u.innerMax.value)}yt(()=>`${a.modelValue}|${u.innerMin.value}|${u.innerMax.value}`,q),q();const b=n(()=>e.convertModelToRatio(y.value)),$=n(()=>u.active.value===!0?T.value:b.value),U=n(()=>{const m={[u.positionProp.value]:`${100*u.innerMinRatio.value}%`,[u.sizeProp.value]:`${100*($.value-u.innerMinRatio.value)}%`};return a.selectionImg!==void 0&&(m.backgroundImage=`url(${a.selectionImg}) !important`),m}),N=e.getThumbRenderFn({focusValue:!0,getNodeData:Gt,ratio:$,label:n(()=>a.labelValue!==void 0?a.labelValue:y.value),thumbColor:n(()=>a.thumbColor||a.color),labelColor:n(()=>a.labelColor),labelTextColor:n(()=>a.labelTextColor)}),R=n(()=>u.editable.value!==!0?{}:O.platform.is.mobile===!0?{onClick:e.onMobileClick}:{onMousedown:e.onActivate,onFocus:P,onBlur:e.onBlur,onKeydown:o,onKeyup:e.onKeyup});function L(m){y.value!==a.modelValue&&r("update:modelValue",y.value),m===!0&&r("change",y.value)}function g(){return C.value.getBoundingClientRect()}function z(m,I=u.dragging.value){const B=e.getDraggingRatio(m,I);y.value=e.convertRatioToModel(B),T.value=a.snap!==!0||a.step===0?B:e.convertModelToRatio(y.value)}function P(){u.focus.value=!0}function o(m){if(!Me.includes(m.keyCode))return;be(m);const I=([34,33].includes(m.keyCode)?10:1)*u.step.value,B=([34,37,40].includes(m.keyCode)?-1:1)*(u.isReversed.value===!0?-1:1)*(a.vertical===!0?-1:1)*I;y.value=ee(parseFloat((y.value+B).toFixed(u.decimals.value)),u.innerMin.value,u.innerMax.value),L()}return()=>{const m=e.getContent(U,u.tabindex,R,I=>{I.push(N())});return D("div",{ref:C,class:u.classes.value+(a.modelValue===null?" q-slider--no-value":""),...u.attributes.value,"aria-valuenow":a.modelValue},m)}}});function Fe(a){setTimeout(()=>{window.URL.revokeObjectURL(a.href)},1e4),a.remove()}function Ht(a,r,O={}){const{mimeType:u,byteOrderMark:e,encoding:C}=typeof O=="string"?{mimeType:O}:O,T=C!==void 0?new TextEncoder(C).encode([r]):r,y=e!==void 0?[e,T]:[T],q=new Blob(y,{type:u||"application/octet-stream"}),b=document.createElement("a");b.href=window.URL.createObjectURL(q),b.setAttribute("download",a),typeof b.download>"u"&&b.setAttribute("target","_blank"),b.classList.add("hidden"),b.style.position="fixed",document.body.appendChild(b);try{return b.click(),Fe(b),!0}catch($){return Fe(b),$}}const Jt=d("p",{class:"text-h6"},"Options",-1),Xt={class:"q-mb-md"},Yt=d("p",null,"Reset your app Settings without changing any of your data.",-1),Zt={class:"q-mb-md"},ea=d("p",null," Welcome overlay provides helpful instructions on basic app usage on the Dashboard page. ",-1),ta={class:"q-mb-md"},aa=d("p",null,"Show descriptions for records displayed on the Dashboard page.",-1),la=d("p",null,"Dark mode allows you to switch between a light or dark theme for the app.",-1),na=d("p",{class:"text-h6"},"Defaults",-1),oa=d("p",null,"Load default demostration records into the database. This action can be repeated.",-1),sa=d("p",{class:"text-h6"},"Data Management",-1),ra={class:"q-mb-md"},ia=d("p",null," Import data into the database from a JSON file. The app expects the data in the file to be structured the same as the exported version. ",-1),ua={class:"q-mb-md"},ca=d("p",null," Export the selected data types as a JSON file. Do this on a regularly basis so you have a backup of your data. ",-1),da={class:"q-mb-md"},va=d("p",null,"Access any app data types to view the records or troubleshoot issues.",-1),ma=d("p",{class:"text-h6"},"Logging",-1),fa={class:"q-mb-md"},pa=d("p",null,"Show Console Logs will display all log messages in the browser console.",-1),ba={class:"q-mb-md"},ga=d("p",null,"Show Info Messages will display info level notifications.",-1),ha={class:"q-mb-md"},ya=d("p",null," Validate that your logging settings above are working as expected by using the test action below. ",-1),Sa={class:"q-mb-md"},Ca=d("p",null," Change log retention time below. Logs older than the selected time will be deleted. This functions retroactivley, so if you change the time to 3 months, all logs older than 3 months will be deleted. Expired log processing occurs every time the app is loaded. ",-1),ka=d("p",{class:"text-h6 text-negative"},"DANGER ZONE",-1),xa=d("p",null," The following operations cannot be undone. Consider exporting your data before proceeding. ",-1),_a={class:"q-mb-md"},wa=d("p",null,"Select a data type and permanently delete all of its records.",-1),Da={class:"q-mb-md"},Ta=d("p",null,"Permanently delete all data records from the database.",-1),$a={class:"q-mb-md"},Fa=d("p",null,"Delete the underlining database and all of its data (requires website reload).",-1),ja=St({__name:"SettingsView",setup(a){Ct({title:`${oe} - Settings`});const{log:r}=kt(),{notify:O}=xt(),{confirmDialog:u}=Nt(),{onDefaults:e}=It(),{goToData:C}=qt(),T=_t.map(i=>({label:i.labelPlural,value:{type:i.type,group:i.group}})),y=M([]),q=M(0),b=M(null),$=M([]),U=[...T],N=M([...T]),R=M(N.value[0]),L=M([...T]),g=M(L.value[0]),z=A.liveSettings().subscribe({next:i=>{var s;y.value=i;const l=(s=i.find(k=>k.key===G.LOG_RETENTION_TIME))==null?void 0:s.value;q.value=Object.values(se).findIndex(k=>k===l)},error:i=>{r.error("Error fetching live Settings",i)}});wt(()=>{z.unsubscribe()});function P(){r.debug("This is a Debug Log",{name:"Debug"}),r.info("This is an Info Log",{name:"Info"}),r.warn("This is a Warning Log",{name:"Warning"}),r.error("This is an Error Log",{name:"Error"})}function o(i){var s,k;const l=((k=(s=i[0])==null?void 0:s.importFile)==null?void 0:k.name)||void 0;r.warn(`Cannot import "${l}"`,i)}function m(){var i;u("Import",`Import data from ${(i=b==null?void 0:b.value)==null?void 0:i.name} and attempt to load records into the database from it?`,J.INFO,"info",async()=>{try{const l=JSON.parse(await b.value.text());r.silentDebug("parsedFileData:",l);const{appName:s,records:k}=l;if(s!==oe)throw new Error(`Cannot import data from this app: ${s} `);const K=Object.values(Et),X=k==null?void 0:k.filter(c=>K.includes(c.type));await A.bulkAdd(X),b.value=null,r.info("Successfully imported available data")}catch(l){r.error("Import failed",l)}})}function I(i){const l=oe.toLowerCase().split(" ").join("-"),s=new Date().toISOString().split("T")[0],k=`export-${l}-${s}.json`;u("Export",`Export all selected record types into the file ${k}?`,J.INFO,"info",async()=>{try{const K=await A.getAllRecords(),X={appName:oe,exportedTimestamp:Date.now(),settings:await A.getAllSettings(),records:K.filter(E=>i.includes(E.type))};if(r.silentDebug("exportData:",X),Ht(k,JSON.stringify(X),{encoding:"UTF-8",mimeType:"application/json"})===!0)r.info("File downloaded successfully",{filename:k});else throw new Error("Browser denied file download")}catch(K){r.error("Export failed",K)}})}async function B(i){try{const l=Object.values(se)[i];await A.setSetting(G.LOG_RETENTION_TIME,l),r.info("Updated log retention time",{time:l,index:i})}catch(l){r.error("Log retention update failed",l)}}async function f(){u("Reset Settings","Would you like to reset your app Settings? This does not change your records.",J.SETTINGS,"warning",async()=>{try{await A.resetSettings(),r.info("Successfully reset settings")}catch(i){r.error("Error reseting settings",i)}})}async function F(i,l){u(`Delete ${i}`,`Permanetly delete all ${i} from the database?`,J.CLEAR,"negative",async()=>{try{await A.clearByType(l),await A.initSettings(),r.info(`${l} successfully deleted`)}catch(s){r.error(`Error deleting ${l}`,s)}})}async function W(){u("Delete All","Permanetly delete all data from the database?",J.CLEAR,"negative",async()=>{try{await A.clearAllData(),await A.initSettings(),r.info("All data successfully deleted")}catch(i){r.error("Error deleting all data",i)}})}async function p(){u("Delete Database","Delete the underlining database? All data will be lost. You must reload the website after this action to reinitialize the database.",J.CLEAR,"negative",async()=>{try{await A.deleteDatabase(),O("Reload the website now",J.WARN,"warning")}catch(i){r.error("Database deletion failed",i)}})}function S(i){var l;return(l=y.value.find(s=>s.key===i))==null?void 0:l.value}return(i,l)=>(we(),De(Rt,{bannerIcon:w(J).SETTINGS,bannerTitle:"Settings"},{default:j(()=>[h(ne,{class:"q-mb-md"},{default:j(()=>[h(ae,null,{default:j(()=>[Jt,d("div",Xt,[Yt,h(H,{label:"Reset Settings",color:"warning",onClick:l[0]||(l[0]=s=>f())})]),d("div",Zt,[ea,h(le,{label:"Show Welcome Overlay","model-value":S(w(G).SHOW_WELCOME),"onUpdate:modelValue":l[1]||(l[1]=s=>w(A).setSetting(w(G).SHOW_WELCOME,s))},null,8,["model-value"])]),d("div",ta,[aa,h(le,{label:"Show Dashboard Descriptions","model-value":S(w(G).SHOW_DESCRIPTIONS),"onUpdate:modelValue":l[2]||(l[2]=s=>w(A).setSetting(w(G).SHOW_DESCRIPTIONS,s))},null,8,["model-value"])]),d("div",null,[la,h(le,{label:"Dark Mode","model-value":S(w(G).DARK_MODE),"onUpdate:modelValue":l[3]||(l[3]=s=>w(A).setSetting(w(G).DARK_MODE,s))},null,8,["model-value"])])]),_:1})]),_:1}),h(ne,{class:"q-mb-md"},{default:j(()=>[h(ae,null,{default:j(()=>[na,d("div",null,[oa,h(H,{label:"Load Examples",color:"primary",onClick:l[4]||(l[4]=s=>w(e)())})])]),_:1})]),_:1}),h(ne,{class:"q-mb-md"},{default:j(()=>[h(ae,null,{default:j(()=>[sa,d("div",ra,[ia,h(Bt,{modelValue:b.value,"onUpdate:modelValue":l[7]||(l[7]=s=>b.value=s),dense:"",outlined:"",counter:"","bottom-slots":"",label:"File Select","max-file-size":w(Dt).MAX_FILE_SIZE,accept:"application/json",onRejected:o},{before:j(()=>[h(H,{disable:!b.value,label:"Import",color:"primary",onClick:l[5]||(l[5]=s=>m())},null,8,["disable"])]),append:j(()=>[b.value?(we(),De(Tt,{key:0,name:w(J).CLOSE,class:"cursor-pointer",onClick:l[6]||(l[6]=$t(s=>b.value=null,["stop"]))},null,8,["name"])):Ft("",!0)]),_:1},8,["modelValue","max-file-size"])]),d("div",ua,[ca,h(Lt,{class:"q-mb-md",modelValue:$.value,"onUpdate:modelValue":l[8]||(l[8]=s=>$.value=s),options:U,type:"checkbox",inline:""},null,8,["modelValue"]),h(H,{disable:$.value.length===0,label:"Export",color:"primary",onClick:l[9]||(l[9]=s=>I($.value))},null,8,["disable"])]),d("div",da,[va,h(Te,{modelValue:R.value,"onUpdate:modelValue":l[11]||(l[11]=s=>R.value=s),outlined:"",dense:"",label:"Record Type",options:N.value},{before:j(()=>[h(H,{disable:!R.value,label:"Access Data",color:"primary",onClick:l[10]||(l[10]=s=>w(C)(R.value.value.type,R.value.value.group))},null,8,["disable"])]),_:1},8,["modelValue","options"])])]),_:1})]),_:1}),h(ne,{class:"q-mb-md"},{default:j(()=>[h(ae,null,{default:j(()=>[ma,d("div",fa,[pa,h(le,{label:"Show Console Logs","model-value":S(w(G).SHOW_CONSOLE_LOGS),"onUpdate:modelValue":l[12]||(l[12]=s=>w(A).setSetting(w(G).SHOW_CONSOLE_LOGS,s))},null,8,["model-value"])]),d("div",ba,[ga,h(le,{label:"Show Info Messages","model-value":S(w(G).SHOW_INFO_MESSAGES),"onUpdate:modelValue":l[13]||(l[13]=s=>w(A).setSetting(w(G).SHOW_INFO_MESSAGES,s))},null,8,["model-value"])]),d("div",ha,[ya,h(H,{label:"Test Logger",color:"primary",onClick:l[14]||(l[14]=s=>P())})]),d("div",Sa,[Ca,h(Kt,{modelValue:q.value,"onUpdate:modelValue":l[15]||(l[15]=s=>q.value=s),"label-value":Object.values(w(se))[q.value],color:"primary",markers:"","label-always":"","switch-label-side":"",min:0,max:Object.values(w(se)).length-1,step:1,onChange:l[16]||(l[16]=s=>B(s))},null,8,["modelValue","label-value","max"])])]),_:1})]),_:1}),h(ne,{class:"q-mb-md"},{default:j(()=>[h(ae,null,{default:j(()=>[ka,xa,d("div",_a,[wa,h(Te,{modelValue:g.value,"onUpdate:modelValue":l[18]||(l[18]=s=>g.value=s),outlined:"",dense:"",label:"Record Type",options:L.value},{before:j(()=>[h(H,{disable:!g.value,label:"Delete Data",color:"negative",onClick:l[17]||(l[17]=s=>{var k;return F(g.value.label,(k=g.value.value)==null?void 0:k.type)})},null,8,["disable"])]),_:1},8,["modelValue","options"])]),d("div",Da,[Ta,h(H,{label:"Delete All Data",color:"negative",onClick:l[19]||(l[19]=s=>W())})]),d("div",$a,[Fa,h(H,{label:"Delete Database",color:"negative",onClick:l[20]||(l[20]=s=>p())})])]),_:1})]),_:1})]),_:1},8,["bannerIcon"]))}});export{ja as default};
