import{f as de,r as B,c as n,aw as ot,s as ye,ax as st,l as R,b as Me,ay as rt,e as qe,az as it,aA as ut,aB as ct,aC as dt,an as mt,aD as vt,aE as $e,aF as ft,aG as pt,a7 as bt,ah as gt,aj as he,ae as ht,a6 as yt,p as ae,aH as kt,aI as St,n as Ct,j as xt,w as wt,t as Ee,I as X,ap as ee,P as ie,aJ as O,D,W as le,q as _t,N as Dt,G as ue,aK as $t,O as Lt,v as G,x as Ft,y as Le,z as Fe,A as W,B as h,C as oe,E as u,J,aL as se,u as V,L as re,aM as Tt,Q as Vt,aN as Rt,X as Mt}from"./index-408197b4.js";import{b as qt,Q as Te}from"./QSelect-436eab52.js";import{T as Et}from"./TouchPan-4732a73a.js";import{u as Ne}from"./useDialogs-fad27234.js";import{u as Nt}from"./useRoutables-132fa327.js";import{_ as It}from"./ResponsivePage.vue_vue_type_script_setup_true_lang-729e840e.js";import"./QItem-404b2f94.js";import"./QItemLabel-3e7d15e3.js";import"./QMenu-c4003d51.js";import"./selection-cd46e154.js";import"./action-4701911f.js";import"./ui-65b145aa.js";function te(t,s,q,i){const e=[];return t.forEach(y=>{i(y)===!0?e.push(y):s.push({failedPropValidation:q,file:y})}),e}function ce(t){t&&t.dataTransfer&&(t.dataTransfer.dropEffect="copy"),ye(t)}const At={multiple:Boolean,accept:String,capture:String,maxFileSize:[Number,String],maxTotalSize:[Number,String],maxFiles:[Number,String],filter:Function},Ot=["rejected"];function Bt({editable:t,dnd:s,getFileInput:q,addFilesToQueue:i}){const{props:e,emit:y,proxy:$}=de(),k=B(null),z=n(()=>e.accept!==void 0?e.accept.split(",").map(r=>(r=r.trim(),r==="*"?"*/":(r.endsWith("/*")&&(r=r.slice(0,r.length-1)),r.toUpperCase()))):null),m=n(()=>parseInt(e.maxFiles,10)),S=n(()=>parseInt(e.maxTotalSize,10));function x(r){if(t.value)if(r!==Object(r)&&(r={target:null}),r.target!==null&&r.target.matches('input[type="file"]')===!0)r.clientX===0&&r.clientY===0&&ot(r);else{const p=q();p&&p!==r.target&&p.click(r)}}function M(r){t.value&&r&&i(null,r)}function L(r,p,A,j){let b=Array.from(p||r.target.files);const E=[],K=()=>{E.length!==0&&y("rejected",E)};if(e.accept!==void 0&&z.value.indexOf("*/")===-1&&(b=te(b,E,"accept",g=>z.value.some(F=>g.type.toUpperCase().startsWith(F)||g.name.toUpperCase().endsWith(F))),b.length===0))return K();if(e.maxFileSize!==void 0){const g=parseInt(e.maxFileSize,10);if(b=te(b,E,"max-file-size",F=>F.size<=g),b.length===0)return K()}if(e.multiple!==!0&&b.length!==0&&(b=[b[0]]),b.forEach(g=>{g.__key=g.webkitRelativePath+g.lastModified+g.name+g.size}),j===!0){const g=A.map(F=>F.__key);b=te(b,E,"duplicate",F=>g.includes(F.__key)===!1)}if(b.length===0)return K();if(e.maxTotalSize!==void 0){let g=j===!0?A.reduce((F,Z)=>F+Z.size,0):0;if(b=te(b,E,"max-total-size",F=>(g+=F.size,g<=S.value)),b.length===0)return K()}if(typeof e.filter=="function"){const g=e.filter(b);b=te(b,E,"filter",F=>g.includes(F))}if(e.maxFiles!==void 0){let g=j===!0?A.length:0;if(b=te(b,E,"max-files",()=>(g++,g<=m.value)),b.length===0)return K()}if(K(),b.length!==0)return b}function w(r){ce(r),s.value!==!0&&(s.value=!0)}function c(r){ye(r),(r.relatedTarget!==null||st.is.safari!==!0?r.relatedTarget!==k.value:document.elementsFromPoint(r.clientX,r.clientY).includes(k.value)===!1)===!0&&(s.value=!1)}function N(r){ce(r);const p=r.dataTransfer.files;p.length!==0&&i(null,p),s.value=!1}function Q(r){if(s.value===!0)return R("div",{ref:k,class:`q-${r}__dnd absolute-full`,onDragenter:ce,onDragover:ce,onDragleave:c,onDrop:N})}return Object.assign($,{pickFiles:x,addFiles:M}),{pickFiles:x,addFiles:M,onDragover:w,onDragleave:c,processFiles:L,getDndNode:Q,maxFilesNumber:m,maxTotalSizeNumber:S}}const zt=Me({name:"QFile",inheritAttrs:!1,props:{...rt,...qe,...At,modelValue:[File,FileList,Array],append:Boolean,useChips:Boolean,displayValue:[String,Number],tabindex:{type:[String,Number],default:0},counterLabel:Function,inputClass:[Array,String,Object],inputStyle:[Array,String,Object]},emits:[...it,...Ot],setup(t,{slots:s,emit:q,attrs:i}){const{proxy:e}=de(),y=ut(),$=B(null),k=B(!1),z=ct(t),{pickFiles:m,onDragover:S,onDragleave:x,processFiles:M,getDndNode:L}=Bt({editable:y.editable,dnd:k,getFileInput:Y,addFilesToQueue:v}),w=dt(t),c=n(()=>Object(t.modelValue)===t.modelValue?"length"in t.modelValue?Array.from(t.modelValue):[t.modelValue]:[]),N=n(()=>$e(c.value)),Q=n(()=>c.value.map(d=>d.name).join(", ")),r=n(()=>ft(c.value.reduce((d,T)=>d+T.size,0))),p=n(()=>({totalSize:r.value,filesNumber:c.value.length,maxFiles:t.maxFiles})),A=n(()=>({tabindex:-1,type:"file",title:"",accept:t.accept,capture:t.capture,name:z.value,...i,id:y.targetUid.value,disabled:y.editable.value!==!0})),j=n(()=>"q-file q-field--auto-height"+(k.value===!0?" q-file--dnd":"")),b=n(()=>t.multiple===!0&&t.append===!0);function E(d){const T=c.value.slice();T.splice(d,1),g(T)}function K(d){const T=c.value.indexOf(d);T>-1&&E(T)}function g(d){q("update:modelValue",t.multiple===!0?d:d[0])}function F(d){d.keyCode===13&&pt(d)}function Z(d){(d.keyCode===13||d.keyCode===32)&&m(d)}function Y(){return $.value}function v(d,T){const U=M(d,T,c.value,b.value),ne=Y();ne!=null&&(ne.value=""),U!==void 0&&((t.multiple===!0?t.modelValue&&U.every(me=>c.value.includes(me)):t.modelValue===U[0])||g(b.value===!0?c.value.concat(U):U))}function l(){return[R("input",{class:[t.inputClass,"q-file__filler"],style:t.inputStyle})]}function o(){if(s.file!==void 0)return c.value.length===0?l():c.value.map((T,U)=>s.file({index:U,file:T,ref:this}));if(s.selected!==void 0)return c.value.length===0?l():s.selected({files:c.value,ref:this});if(t.useChips===!0)return c.value.length===0?l():c.value.map((T,U)=>R(qt,{key:"file-"+U,removable:y.editable.value,dense:!0,textColor:t.color,tabindex:t.tabindex,onRemove:()=>{E(U)}},()=>R("span",{class:"ellipsis",textContent:T.name})));const d=t.displayValue!==void 0?t.displayValue:Q.value;return d.length!==0?[R("div",{class:t.inputClass,style:t.inputStyle,textContent:d})]:l()}function I(){const d={ref:$,...A.value,...w.value,class:"q-field__input fit absolute-full cursor-pointer",onChange:v};return t.multiple===!0&&(d.multiple=!0),R("input",d)}return Object.assign(y,{fieldClass:j,emitValue:g,hasValue:N,inputRef:$,innerValue:c,floatingLabel:n(()=>N.value===!0||$e(t.displayValue)),computedCounter:n(()=>{if(t.counterLabel!==void 0)return t.counterLabel(p.value);const d=t.maxFiles;return`${c.value.length}${d!==void 0?" / "+d:""} (${r.value})`}),getControlChild:()=>L("file"),getControl:()=>{const d={ref:y.targetRef,class:"q-field__native row items-center cursor-pointer",tabindex:t.tabindex};return y.editable.value===!0&&Object.assign(d,{onDragover:S,onDragleave:x,onKeydown:F,onKeyup:Z}),R("div",d,[I()].concat(o()))}}),Object.assign(e,{removeAtIndex:E,removeFile:K,getNativeElement:()=>$.value}),mt(e,"nativeEl",()=>$.value),vt(y)}}),Ve="q-slider__marker-labels",Pt=t=>({value:t}),jt=({marker:t})=>R("div",{key:t.value,style:t.style,class:t.classes},t.label),Ie=[34,37,40,33,39,38],Ut={...yt,...qe,min:{type:Number,default:0},max:{type:Number,default:100},innerMin:Number,innerMax:Number,step:{type:Number,default:1,validator:t=>t>=0},snap:Boolean,vertical:Boolean,reverse:Boolean,hideSelection:Boolean,color:String,markerLabelsClass:String,label:Boolean,labelColor:String,labelTextColor:String,labelAlways:Boolean,switchLabelSide:Boolean,markers:[Boolean,Number],markerLabels:[Boolean,Array,Object,Function],switchMarkerLabelsSide:Boolean,trackImg:String,trackColor:String,innerTrackImg:String,innerTrackColor:String,selectionColor:String,selectionImg:String,thumbSize:{type:String,default:"20px"},trackSize:{type:String,default:"4px"},disable:Boolean,readonly:Boolean,dense:Boolean,tabindex:[String,Number],thumbColor:String,thumbPath:{type:String,default:"M 4, 10 a 6,6 0 1,0 12,0 a 6,6 0 1,0 -12,0"}},Wt=["pan","update:modelValue","change"];function Qt({updateValue:t,updatePosition:s,getDragging:q,formAttrs:i}){const{props:e,emit:y,slots:$,proxy:{$q:k}}=de(),z=bt(e,k),m=Ct(i),S=B(!1),x=B(!1),M=B(!1),L=B(!1),w=n(()=>e.vertical===!0?"--v":"--h"),c=n(()=>"-"+(e.switchLabelSide===!0?"switched":"standard")),N=n(()=>e.vertical===!0?e.reverse===!0:e.reverse!==(k.lang.rtl===!0)),Q=n(()=>isNaN(e.innerMin)===!0||e.innerMin<e.min?e.min:e.innerMin),r=n(()=>isNaN(e.innerMax)===!0||e.innerMax>e.max?e.max:e.innerMax),p=n(()=>e.disable!==!0&&e.readonly!==!0&&Q.value<r.value),A=n(()=>(String(e.step).trim().split(".")[1]||"").length),j=n(()=>e.step===0?1:e.step),b=n(()=>p.value===!0?e.tabindex||0:-1),E=n(()=>e.max-e.min),K=n(()=>r.value-Q.value),g=n(()=>ve(Q.value)),F=n(()=>ve(r.value)),Z=n(()=>e.vertical===!0?N.value===!0?"bottom":"top":N.value===!0?"right":"left"),Y=n(()=>e.vertical===!0?"height":"width"),v=n(()=>e.vertical===!0?"width":"height"),l=n(()=>e.vertical===!0?"vertical":"horizontal"),o=n(()=>{const a={role:"slider","aria-valuemin":Q.value,"aria-valuemax":r.value,"aria-orientation":l.value,"data-step":e.step};return e.disable===!0?a["aria-disabled"]="true":e.readonly===!0&&(a["aria-readonly"]="true"),a}),I=n(()=>`q-slider q-slider${w.value} q-slider--${S.value===!0?"":"in"}active inline no-wrap `+(e.vertical===!0?"row":"column")+(e.disable===!0?" disabled":" q-slider--enabled"+(p.value===!0?" q-slider--editable":""))+(M.value==="both"?" q-slider--focus":"")+(e.label||e.labelAlways===!0?" q-slider--label":"")+(e.labelAlways===!0?" q-slider--label-always":"")+(z.value===!0?" q-slider--dark":"")+(e.dense===!0?" q-slider--dense q-slider--dense"+w.value:""));function d(a){const f="q-slider__"+a;return`${f} ${f}${w.value} ${f}${w.value}${c.value}`}function T(a){const f="q-slider__"+a;return`${f} ${f}${w.value}`}const U=n(()=>{const a=e.selectionColor||e.color;return"q-slider__selection absolute"+(a!==void 0?` text-${a}`:"")}),ne=n(()=>T("markers")+" absolute overflow-hidden"),me=n(()=>T("track-container")),Ae=n(()=>d("pin")),Oe=n(()=>d("label")),Be=n(()=>d("text-container")),ze=n(()=>d("marker-labels-container")+(e.markerLabelsClass!==void 0?` ${e.markerLabelsClass}`:"")),Pe=n(()=>"q-slider__track relative-position no-outline"+(e.trackColor!==void 0?` bg-${e.trackColor}`:"")),je=n(()=>{const a={[v.value]:e.trackSize};return e.trackImg!==void 0&&(a.backgroundImage=`url(${e.trackImg}) !important`),a}),Ue=n(()=>"q-slider__inner absolute"+(e.innerTrackColor!==void 0?` bg-${e.innerTrackColor}`:"")),ke=n(()=>{const a={[Z.value]:`${100*g.value}%`,[Y.value]:`${100*(F.value-g.value)}%`};return e.innerTrackImg!==void 0&&(a.backgroundImage=`url(${e.innerTrackImg}) !important`),a});function We(a){const{min:f,max:C,step:_}=e;let P=f+a*(C-f);if(_>0){const H=(P-f)%_;P+=(Math.abs(H)>=_/2?(H<0?-1:1)*_:0)-H}return A.value>0&&(P=parseFloat(P.toFixed(A.value))),ae(P,Q.value,r.value)}function ve(a){return E.value===0?0:(a-e.min)/E.value}function Qe(a,f){const C=kt(a),_=e.vertical===!0?ae((C.top-f.top)/f.height,0,1):ae((C.left-f.left)/f.width,0,1);return ae(N.value===!0?1-_:_,g.value,F.value)}const Se=n(()=>gt(e.markers)===!0?e.markers:j.value),Ce=n(()=>{const a=[],f=Se.value,C=e.max;let _=e.min;do a.push(_),_+=f;while(_<C);return a.push(C),a}),xe=n(()=>{const a=` ${Ve}${w.value}-`;return Ve+`${a}${e.switchMarkerLabelsSide===!0?"switched":"standard"}${a}${N.value===!0?"rtl":"ltr"}`}),fe=n(()=>e.markerLabels===!1?null:Ge(e.markerLabels).map((a,f)=>({index:f,value:a.value,label:a.label||a.value,classes:xe.value+(a.classes!==void 0?" "+a.classes:""),style:{..._e(a.value),...a.style||{}}}))),we=n(()=>({markerList:fe.value,markerMap:Je.value,classes:xe.value,getStyle:_e})),Ke=n(()=>{if(K.value!==0){const a=100*Se.value/K.value;return{...ke.value,backgroundSize:e.vertical===!0?`2px ${a}%`:`${a}% 2px`}}return null});function Ge(a){if(a===!1)return null;if(a===!0)return Ce.value.map(Pt);if(typeof a=="function")return Ce.value.map(C=>{const _=a(C);return he(_)===!0?{..._,value:C}:{value:C,label:_}});const f=({value:C})=>C>=e.min&&C<=e.max;return Array.isArray(a)===!0?a.map(C=>he(C)===!0?C:{value:C}).filter(f):Object.keys(a).map(C=>{const _=a[C],P=Number(C);return he(_)===!0?{..._,value:P}:{value:P,label:_}}).filter(f)}function _e(a){return{[Z.value]:`${100*(a-e.min)/E.value}%`}}const Je=n(()=>{if(e.markerLabels===!1)return null;const a={};return fe.value.forEach(f=>{a[f.value]=f}),a});function Xe(){if($["marker-label-group"]!==void 0)return $["marker-label-group"](we.value);const a=$["marker-label"]||jt;return fe.value.map(f=>a({marker:f,...we.value}))}const Ye=n(()=>[[Et,Ze,void 0,{[l.value]:!0,prevent:!0,stop:!0,mouse:!0,mouseAllDir:!0}]]);function Ze(a){a.isFinal===!0?(L.value!==void 0&&(s(a.evt),a.touch===!0&&t(!0),L.value=void 0,y("pan","end")),S.value=!1,M.value=!1):a.isFirst===!0?(L.value=q(a.evt),s(a.evt),t(),S.value=!0,y("pan","start")):(s(a.evt),t())}function De(){M.value=!1}function He(a){s(a,q(a)),t(),x.value=!0,S.value=!0,document.addEventListener("mouseup",pe,!0)}function pe(){x.value=!1,S.value=!1,t(!0),De(),document.removeEventListener("mouseup",pe,!0)}function et(a){s(a,q(a)),t(!0)}function tt(a){Ie.includes(a.keyCode)&&t(!0)}function at(a){if(e.vertical===!0)return null;const f=k.lang.rtl!==e.reverse?1-a:a;return{transform:`translateX(calc(${2*f-1} * ${e.thumbSize} / 2 + ${50-100*f}%))`}}function lt(a){const f=n(()=>x.value===!1&&(M.value===a.focusValue||M.value==="both")?" q-slider--focus":""),C=n(()=>`q-slider__thumb q-slider__thumb${w.value} q-slider__thumb${w.value}-${N.value===!0?"rtl":"ltr"} absolute non-selectable`+f.value+(a.thumbColor.value!==void 0?` text-${a.thumbColor.value}`:"")),_=n(()=>({width:e.thumbSize,height:e.thumbSize,[Z.value]:`${100*a.ratio.value}%`,zIndex:M.value===a.focusValue?2:void 0})),P=n(()=>a.labelColor.value!==void 0?` text-${a.labelColor.value}`:""),H=n(()=>at(a.ratio.value)),be=n(()=>"q-slider__text"+(a.labelTextColor.value!==void 0?` text-${a.labelTextColor.value}`:""));return()=>{const ge=[R("svg",{class:"q-slider__thumb-shape absolute-full",viewBox:"0 0 20 20","aria-hidden":"true"},[R("path",{d:e.thumbPath})]),R("div",{class:"q-slider__focus-ring fit"})];return(e.label===!0||e.labelAlways===!0)&&(ge.push(R("div",{class:Ae.value+" absolute fit no-pointer-events"+P.value},[R("div",{class:Oe.value,style:{minWidth:e.thumbSize}},[R("div",{class:Be.value,style:H.value},[R("span",{class:be.value},a.label.value)])])])),e.name!==void 0&&e.disable!==!0&&m(ge,"push")),R("div",{class:C.value,style:_.value,...a.getNodeData()},ge)}}function nt(a,f,C,_){const P=[];e.innerTrackColor!=="transparent"&&P.push(R("div",{key:"inner",class:Ue.value,style:ke.value})),e.selectionColor!=="transparent"&&P.push(R("div",{key:"selection",class:U.value,style:a.value})),e.markers!==!1&&P.push(R("div",{key:"marker",class:ne.value,style:Ke.value})),_(P);const H=[St("div",{key:"trackC",class:me.value,tabindex:f.value,...C.value},[R("div",{class:Pe.value,style:je.value},P)],"slide",p.value,()=>Ye.value)];if(e.markerLabels!==!1){const be=e.switchMarkerLabelsSide===!0?"unshift":"push";H[be](R("div",{key:"markerL",class:ze.value},Xe()))}return H}return ht(()=>{document.removeEventListener("mouseup",pe,!0)}),{state:{active:S,focus:M,preventFocus:x,dragging:L,editable:p,classes:I,tabindex:b,attributes:o,step:j,decimals:A,trackLen:E,innerMin:Q,innerMinRatio:g,innerMax:r,innerMaxRatio:F,positionProp:Z,sizeProp:Y,isReversed:N},methods:{onActivate:He,onMobileClick:et,onBlur:De,onKeyup:tt,getContent:nt,getThumbRenderFn:lt,convertRatioToModel:We,convertModelToRatio:ve,getDraggingRatio:Qe}}}const Kt=()=>({}),Gt=Me({name:"QSlider",props:{...Ut,modelValue:{required:!0,default:null,validator:t=>typeof t=="number"||t===null},labelValue:[String,Number]},emits:Wt,setup(t,{emit:s}){const{proxy:{$q:q}}=de(),{state:i,methods:e}=Qt({updateValue:w,updatePosition:N,getDragging:c,formAttrs:xt(t)}),y=B(null),$=B(0),k=B(0);function z(){k.value=t.modelValue===null?i.innerMin.value:ae(t.modelValue,i.innerMin.value,i.innerMax.value)}wt(()=>`${t.modelValue}|${i.innerMin.value}|${i.innerMax.value}`,z),z();const m=n(()=>e.convertModelToRatio(k.value)),S=n(()=>i.active.value===!0?$.value:m.value),x=n(()=>{const p={[i.positionProp.value]:`${100*i.innerMinRatio.value}%`,[i.sizeProp.value]:`${100*(S.value-i.innerMinRatio.value)}%`};return t.selectionImg!==void 0&&(p.backgroundImage=`url(${t.selectionImg}) !important`),p}),M=e.getThumbRenderFn({focusValue:!0,getNodeData:Kt,ratio:S,label:n(()=>t.labelValue!==void 0?t.labelValue:k.value),thumbColor:n(()=>t.thumbColor||t.color),labelColor:n(()=>t.labelColor),labelTextColor:n(()=>t.labelTextColor)}),L=n(()=>i.editable.value!==!0?{}:q.platform.is.mobile===!0?{onClick:e.onMobileClick}:{onMousedown:e.onActivate,onFocus:Q,onBlur:e.onBlur,onKeydown:r,onKeyup:e.onKeyup});function w(p){k.value!==t.modelValue&&s("update:modelValue",k.value),p===!0&&s("change",k.value)}function c(){return y.value.getBoundingClientRect()}function N(p,A=i.dragging.value){const j=e.getDraggingRatio(p,A);k.value=e.convertRatioToModel(j),$.value=t.snap!==!0||t.step===0?j:e.convertModelToRatio(k.value)}function Q(){i.focus.value=!0}function r(p){if(!Ie.includes(p.keyCode))return;ye(p);const A=([34,33].includes(p.keyCode)?10:1)*i.step.value,j=([34,37,40].includes(p.keyCode)?-1:1)*(i.isReversed.value===!0?-1:1)*(t.vertical===!0?-1:1)*A;k.value=ae(parseFloat((k.value+j).toFixed(i.decimals.value)),i.innerMin.value,i.innerMax.value),w()}return()=>{const p=e.getContent(x,i.tabindex,L,A=>{A.push(M())});return R("div",{ref:y,class:i.classes.value+(t.modelValue===null?" q-slider--no-value":""),...i.attributes.value,"aria-valuenow":t.modelValue},p)}}});function Re(t){setTimeout(()=>{window.URL.revokeObjectURL(t.href)},1e4),t.remove()}function Jt(t,s,q={}){const{mimeType:i,byteOrderMark:e,encoding:y}=typeof q=="string"?{mimeType:q}:q,$=y!==void 0?new TextEncoder(y).encode([s]):s,k=e!==void 0?[e,$]:[$],z=new Blob(k,{type:i||"application/octet-stream"}),m=document.createElement("a");m.href=window.URL.createObjectURL(z),m.setAttribute("download",t),typeof m.download>"u"&&m.setAttribute("target","_blank"),m.classList.add("hidden"),m.style.position="fixed",document.body.appendChild(m);try{return m.click(),Re(m),!0}catch(S){return Re(m),S}}function Xt(){const{log:t}=Ee(),{confirmDialog:s}=Ne();function q(){const m=["Alpha","Beta","Gamma","Delta","Epsilon","Zeta","Eta","Theta","Iota","Kappa","Lambda","Mu","Nu","Xi","Omicron","Pi","Rho","Sigma","Tau","Upsilon","Phi","Chi","Psi","Omega"];return m[Math.floor(Math.random()*m.length)]}function i(){const m="ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");return m[Math.floor(Math.random()*m.length)]}function e(){return Math.random()>=.5}function y(){return Math.floor(Math.random()*100)}function $(){return Date.now()-O["One Year"]}async function k(){s("Load Default Examples","Would you like the load default Examples into the database?",X.INFO,"info",async()=>{try{const m=[],S=[];(M=>{const L=ee(),w=`Example - ${q()} ${i()}`;m.push({type:ie.Values.example,id:L,timestamp:Date.now(),name:w,desc:`${w} description.`,enabled:!0,favorited:e(),lastSub:void 0,testIds:[ee(),ee(),ee()]});for(let c=0;c<M;c++)S.push({type:ie.Values.example,id:ee(),coreId:L,timestamp:$()+O["One Day"]*c,note:`Example sub-record note ${c}`,percent:y()})})(360),await Promise.all([D.importRecords(le.Values.core,m),D.importRecords(le.Values.sub,S)]),t.info("Default examples loaded")}catch(m){t.error("Failed to load defaults",m)}})}async function z(){s("Load Default Tests","Would you like the load default Tests into the database?",X.INFO,"info",async()=>{try{const m=[],S=[];(M=>{const L=ee(),w=`Test - ${q()} ${i()}`;m.push({type:ie.Values.test,id:L,timestamp:Date.now(),name:w,desc:`${w} description.`,enabled:!0,favorited:e(),lastSub:void 0});for(let c=0;c<M;c++)S.push({type:ie.Values.test,id:ee(),coreId:L,timestamp:$()+O["One Day"]*c,note:`Test sub-record note ${c}`})})(0),await Promise.all([D.importRecords(le.Values.core,m),D.importRecords(le.Values.sub,S)]),t.info("Default tests loaded")}catch(m){t.error("Failed to load defaults",m)}})}return{onDefaultExamples:k,onDefaultTests:z}}const Yt=u("p",{class:"text-h6"},"Options",-1),Zt={class:"q-mb-md"},Ht=u("p",null,"Reset your app Settings to the defaults without impacting any of your data.",-1),ea={class:"q-mb-md"},ta=u("p",null," Welcome overlay provides helpful instructions on basic app usage on the Dashboard page. ",-1),aa={class:"q-mb-md"},la=u("p",null,"Show descriptions for records displayed on the Dashboard page.",-1),na=u("p",null,"Dark mode allows you to switch between a light or dark theme for the app.",-1),oa=u("p",{class:"text-h6"},"Defaults",-1),sa=u("p",null,"Load default demostration records into the database. This action can be repeated.",-1),ra={class:"q-mb-md"},ia=u("p",{class:"text-h6"},"Data Management",-1),ua={class:"q-mb-md"},ca=u("p",null," Import data into the database from a JSON file. The app expects the data in the file to be structured the same as the exported version. ",-1),da={class:"q-mb-md"},ma=u("p",null," Export your data as a JSON file. Do this on a regularly basis so you have a backup of your data. ",-1),va={class:"q-mb-md"},fa=u("p",null,"View the app logs to troubleshoot issues.",-1),pa={class:"q-mb-md"},ba=u("p",null,"Access any app data tables to view your records.",-1),ga=u("p",{class:"text-h6"},"Logging",-1),ha={class:"q-mb-md"},ya=u("p",null,"Show Console Logs will display all log messages in the browser console.",-1),ka={class:"q-mb-md"},Sa=u("p",null,"Show Info Messages will display info level notifications.",-1),Ca={class:"q-mb-md"},xa=u("p",null," Validate that your logging settings above are working as expected by using the test action below. ",-1),wa={class:"q-mb-md"},_a=u("p",null," Change log retention duration below. Logs older than the selected time will be deleted. This functions retroactivley. Change the time to three months will cause all logs older than three months to be deleted. Expired log processing occurs every time the app is loaded. ",-1),Da={class:"q-mx-lg"},$a=u("p",{class:"text-h6 text-negative"},"DANGER ZONE",-1),La=u("p",null," The following operations cannot be undone. Consider exporting your data before proceeding. ",-1),Fa={class:"q-mb-md"},Ta=u("p",null,"Delete the app logs from the database.",-1),Va={class:"q-mb-md"},Ra=u("p",null,"Select a data type and permanently delete all of its records.",-1),Ma={class:"q-mb-md"},qa=u("p",null,"Permanently delete all data records from the database.",-1),Ea={class:"q-mb-md"},Na=u("p",null,"Delete the underlining database and all of its data (requires website reload).",-1),Ja=_t({__name:"SettingsView",setup(t){Dt({title:`${ue} - Settings`});const{log:s}=Ee(),{notify:q}=$t(),{confirmDialog:i}=Ne(),{onDefaultExamples:e,onDefaultTests:y}=Xt(),{goToRecordsData:$,goToLogsData:k}=Nt(),z=Lt.getAllOptions(),m=B([]),S=B(0),x=B(null),M=B(z),L=B(M.value[0]),w=B(z),c=B(w.value[0]),N=[O[O["One Week"]],O[O["One Month"]],O[O["Three Months"]],O[O["Six Months"]],O[O["One Year"]],O[O.Forever]],Q=D.liveSettings().subscribe({next:v=>{var o;m.value=v;const l=(o=v.find(I=>I.key===G.Values["log-retention-duration"]))==null?void 0:o.value;S.value=N.findIndex(I=>I===O[l])},error:v=>{s.error("Error fetching live Settings",v)}});Ft(()=>{Q.unsubscribe()});function r(){s.debug("This is a Debug Log",{name:"Debug"}),s.info("This is an Info Log",{name:"Info"}),s.warn("This is a Warning Log",{name:"Warning"}),s.error("This is an Error Log",{name:"Error"})}function p(v){var o,I;const l=((I=(o=v[0])==null?void 0:o.importFile)==null?void 0:I.name)||void 0;s.warn(`Cannot import"${l}`,v)}function A(){var v;i("Import",`Import backup data from ${(v=x==null?void 0:x.value)==null?void 0:v.name} and attempt to load records into the database from it? Please note that Logs are NOT imported.`,X.INFO,"info",async()=>{try{const l=JSON.parse(await x.value.text());if(s.silentDebug("backupData:",l),l.appName!==ue)throw new Error(`Cannot import data from the app ${l.appName}`);l.settings.length>0&&await Promise.all(l.settings.filter(o=>G.options.includes(o.key)).map(async o=>await D.setSetting(o.key,o.value))),await Promise.all([D.importRecords(le.Values.core,l.coreRecords),D.importRecords(le.Values.sub,l.subRecords)]),x.value=null,s.info("Successfully imported available data")}catch(l){s.error("Error during import",l)}})}function j(){const v=ue.toLowerCase().split(" ").join("-"),l=new Date().toISOString().split("T")[0],o=`export-${v}-${l}.json`;i("Export",`Export all data into the file "${o}" as a backup?`,X.INFO,"info",async()=>{try{const I={appName:ue,backupTimestamp:Date.now(),logs:await D.getLogs(),settings:await D.getSettings(),coreRecords:(await D.getAllCoreRecords()).map(T=>(delete T.lastSub,T)),subRecords:await D.getAllSubRecords()};if(s.silentDebug("backupData:",I),Jt(o,JSON.stringify(I),{encoding:"UTF-8",mimeType:"application/json"})===!0)s.info("File downloaded successfully",{filename:o});else throw new Error("Browser denied file download")}catch(I){s.error("Export failed",I)}})}async function b(v){try{const l=N[v],o=O[l];await D.setSetting(G.Values["log-retention-duration"],o),s.info("Updated log retention duration",{logDurationKey:l,logDuration:o,index:v})}catch(l){s.error("Log retention duration update failed",l)}}async function E(){i("Reset Settings","Would you like to reset your app Settings to the defaults? This does not impact your data.",X.REFRESH,"primary",async()=>{try{await D.clearSettings(),s.info("Successfully reset settings")}catch(v){s.error("Error reseting settings",v)}})}async function K(){i("Delete Logs","Permanetly delete all Logs from the database?",X.CLEAR,"negative",async()=>{try{await D.clearLogs(),s.info("Successfully deleted logs data")}catch(v){s.error("Error deleting Logs",v)}})}async function g(v,l){i(`Delete ${v}`,`Permanetly delete all ${v} from the database?`,X.CLEAR,"negative",async()=>{try{await D.clearRecordsByType(l.group,l.type),s.info("Successfully deleted selected data")}catch(o){s.error(`Error deleting ${v}`,o)}})}async function F(){i("Delete All","Permanetly delete all data from the database?",X.CLEAR,"negative",async()=>{try{await D.clearAll(),s.info("All data successfully deleted")}catch(v){s.error("Error deleting all data",v)}})}async function Z(){i("Delete Database","Delete the underlining database? All data will be lost. You must reload the website after this action to reinitialize the database.",X.CLEAR,"negative",async()=>{try{await D.deleteDatabase(),q("Reload the website now",X.WARN,"warning")}catch(v){s.error("Database deletion failed",v)}})}function Y(v){var l;return(l=m.value.find(o=>o.key===v))==null?void 0:l.value}return(v,l)=>(Le(),Fe(It,{bannerIcon:V(X).SETTINGS,bannerTitle:"Settings"},{default:W(()=>[h(re,{class:"q-mb-md"},{default:W(()=>[h(oe,null,{default:W(()=>[Yt,u("div",Zt,[Ht,h(J,{label:"Reset Settings",color:"primary",onClick:l[0]||(l[0]=o=>E())})]),u("div",ea,[ta,h(se,{label:"Show Welcome Overlay","model-value":Y(V(G).Values["welcome-overlay"]),"onUpdate:modelValue":l[1]||(l[1]=o=>V(D).setSetting(V(G).Values["welcome-overlay"],o))},null,8,["model-value"])]),u("div",aa,[la,h(se,{label:"Show Dashboard Descriptions","model-value":Y(V(G).Values["dashboard-descriptions"]),"onUpdate:modelValue":l[2]||(l[2]=o=>V(D).setSetting(V(G).Values["dashboard-descriptions"],o))},null,8,["model-value"])]),u("div",null,[na,h(se,{label:"Dark Mode","model-value":Y(V(G).Values["dark-mode"]),"onUpdate:modelValue":l[3]||(l[3]=o=>V(D).setSetting(V(G).Values["dark-mode"],o))},null,8,["model-value"])])]),_:1})]),_:1}),h(re,{class:"q-mb-md"},{default:W(()=>[h(oe,null,{default:W(()=>[oa,u("div",null,[sa,u("div",ra,[h(J,{label:"Load Examples",color:"primary",onClick:l[4]||(l[4]=o=>V(e)())})]),u("div",null,[h(J,{label:"Load Tests",color:"primary",onClick:l[5]||(l[5]=o=>V(y)())})])])]),_:1})]),_:1}),h(re,{class:"q-mb-md"},{default:W(()=>[h(oe,null,{default:W(()=>[ia,u("div",ua,[ca,h(zt,{modelValue:x.value,"onUpdate:modelValue":l[8]||(l[8]=o=>x.value=o),dense:"",outlined:"",counter:"","bottom-slots":"",label:"File Select","max-file-size":V(Tt).MAX_FILE_SIZE,accept:"application/json",onRejected:p},{before:W(()=>[h(J,{disable:!x.value,label:"Import",color:"primary",onClick:l[6]||(l[6]=o=>A())},null,8,["disable"])]),append:W(()=>[x.value?(Le(),Fe(Vt,{key:0,name:V(X).CLOSE,class:"cursor-pointer",onClick:l[7]||(l[7]=Rt(o=>x.value=null,["stop"]))},null,8,["name"])):Mt("",!0)]),_:1},8,["modelValue","max-file-size"])]),u("div",da,[ma,h(J,{label:"Export",color:"primary",onClick:l[9]||(l[9]=o=>j())})]),u("div",va,[fa,h(J,{label:"Access Logs",color:"primary",onClick:l[10]||(l[10]=o=>V(k)())})]),u("div",pa,[ba,h(Te,{modelValue:L.value,"onUpdate:modelValue":l[12]||(l[12]=o=>L.value=o),outlined:"",dense:"",label:"Record Type",options:M.value},{before:W(()=>[h(J,{disable:!L.value,label:"Access Data",color:"primary",onClick:l[11]||(l[11]=o=>{var I,d,T,U;return V($)((d=(I=L.value)==null?void 0:I.value)==null?void 0:d.group,(U=(T=L.value)==null?void 0:T.value)==null?void 0:U.type)})},null,8,["disable"])]),_:1},8,["modelValue","options"])])]),_:1})]),_:1}),h(re,{class:"q-mb-md"},{default:W(()=>[h(oe,null,{default:W(()=>[ga,u("div",ha,[ya,h(se,{label:"Show Console Logs","model-value":Y(V(G).Values["console-logs"]),"onUpdate:modelValue":l[13]||(l[13]=o=>V(D).setSetting(V(G).Values["console-logs"],o))},null,8,["model-value"])]),u("div",ka,[Sa,h(se,{label:"Show Info Messages","model-value":Y(V(G).Values["info-messages"]),"onUpdate:modelValue":l[14]||(l[14]=o=>V(D).setSetting(V(G).Values["info-messages"],o))},null,8,["model-value"])]),u("div",Ca,[xa,h(J,{label:"Test Logger",color:"primary",onClick:l[15]||(l[15]=o=>r())})]),u("div",wa,[_a,u("div",Da,[h(Gt,{modelValue:S.value,"onUpdate:modelValue":l[16]||(l[16]=o=>S.value=o),"label-value":N[S.value],color:"primary",markers:"","label-always":"","switch-label-side":"",min:0,max:N.length-1,onChange:l[17]||(l[17]=o=>b(o))},null,8,["modelValue","label-value","max"])])])]),_:1})]),_:1}),h(re,{class:"q-mb-md"},{default:W(()=>[h(oe,null,{default:W(()=>[$a,La,u("div",Fa,[Ta,h(J,{label:"Delete Logs",color:"negative",onClick:l[18]||(l[18]=o=>K())})]),u("div",Va,[Ra,h(Te,{modelValue:c.value,"onUpdate:modelValue":l[20]||(l[20]=o=>c.value=o),outlined:"",dense:"",label:"Record Type",options:w.value},{before:W(()=>[h(J,{disable:!c.value,label:"Delete Data",color:"negative",onClick:l[19]||(l[19]=o=>g(c.value.label,c.value.value))},null,8,["disable"])]),_:1},8,["modelValue","options"])]),u("div",Ma,[qa,h(J,{label:"Delete All Data",color:"negative",onClick:l[21]||(l[21]=o=>F())})]),u("div",Ea,[Na,h(J,{label:"Delete Database",color:"negative",onClick:l[22]||(l[22]=o=>Z())})])]),_:1})]),_:1})]),_:1},8,["bannerIcon"]))}});export{Ja as default};