import{z as d,bi as z,bj as St,q as ot,am as ht,B as yt,s as it,C as gt,az as _t,r as p,Y as Yt,bk as ct,bl as bt,bm as Ot,bn as et,E as re,bo as je,Z as ut,v as r,aF as xe,x as kt,ay as qt,n as $,a0 as pt,be as Tt,aw as jt,af as At,a6 as Ae,bp as It,bq as $t,br as Bt,bs as Ft,d as Pt,L as Et,bt as tt,c as Nt,e as Kt,w as ee,f as R,Q as Lt,l as ze,t as dt,a5 as Qt,h as at,I as nt,i as Rt}from"./index-2ed2ead9.js";import{u as zt,a as Ut,Q as Wt}from"./QMenu-d2947be1.js";import{T as Jt}from"./TouchPan-15f0f47d.js";import{u as Gt}from"./action-1f28cf79.js";import"./selection-feb8c58b.js";function Xt(){const t=new Map;return{getCache:function(g,b){return t[g]===void 0?t[g]=b:t[g]},getCacheWithFn:function(g,b){return t[g]===void 0?t[g]=b():t[g]}}}const Zt=["gregorian","persian"],wt={modelValue:{required:!0},mask:{type:String},locale:Object,calendar:{type:String,validator:t=>Zt.includes(t),default:"gregorian"},landscape:Boolean,color:String,textColor:String,square:Boolean,flat:Boolean,bordered:Boolean,readonly:Boolean,disable:Boolean},Ct=["update:modelValue"];function te(t){return t.year+"/"+z(t.month)+"/"+z(t.day)}function Mt(t,g){const b=d(()=>t.disable!==!0&&t.readonly!==!0),j=d(()=>b.value===!0?0:-1),x=d(()=>{const q=[];return t.color!==void 0&&q.push(`bg-${t.color}`),t.textColor!==void 0&&q.push(`text-${t.textColor}`),q.join(" ")});function E(){return t.locale!==void 0?{...g.lang.date,...t.locale}:g.lang.date}function k(q){const N=new Date,V=q===!0?null:0;if(t.calendar==="persian"){const D=St(N);return{year:D.jy,month:D.jm,day:D.jd}}return{year:N.getFullYear(),month:N.getMonth()+1,day:N.getDate(),hour:V,minute:V,second:V,millisecond:V}}return{editable:b,tabindex:j,headerClass:x,getLocale:E,getCurrentDate:k}}const me=20,ea=["Calendar","Years","Months"],vt=t=>ea.includes(t),lt=t=>/^-?[\d]+\/[0-1]\d$/.test(t),Me=" — ";function ie(t){return t.year+"/"+z(t.month)}const ta=ot({name:"QDate",props:{...wt,...ht,...yt,multiple:Boolean,range:Boolean,title:String,subtitle:String,mask:{default:"YYYY/MM/DD"},defaultYearMonth:{type:String,validator:lt},yearsInMonthView:Boolean,events:[Array,Function],eventColor:[String,Function],emitImmediately:Boolean,options:[Array,Function],navigationMinYearMonth:{type:String,validator:lt},navigationMaxYearMonth:{type:String,validator:lt},noUnset:Boolean,firstDayOfWeek:[String,Number],todayBtn:Boolean,minimal:Boolean,defaultView:{type:String,default:"Calendar",validator:vt}},emits:[...Ct,"rangeStart","rangeEnd","navigation"],setup(t,{slots:g,emit:b}){const{proxy:j}=it(),{$q:x}=j,E=gt(t,x),{getCache:k}=Xt(),{tabindex:q,headerClass:N,getLocale:V,getCurrentDate:D}=Mt(t,x);let O;const ae=_t(t),ne=qt(ae),le=p(null),C=p(Qe()),M=p(V()),Ie=d(()=>Qe()),he=d(()=>V()),f=d(()=>D()),u=p(l(C.value,M.value)),w=p(t.defaultView),$e=x.lang.rtl===!0?"right":"left",ue=p($e.value),B=p($e.value),De=u.value.year,se=p(De-De%me-(De<0?me:0)),F=p(null),ce=d(()=>{const e=t.landscape===!0?"landscape":"portrait";return`q-date q-date--${e} q-date--${e}-${t.minimal===!0?"minimal":"standard"}`+(E.value===!0?" q-date--dark q-dark":"")+(t.bordered===!0?" q-date--bordered":"")+(t.square===!0?" q-date--square no-border-radius":"")+(t.flat===!0?" q-date--flat no-shadow":"")+(t.disable===!0?" disabled":t.readonly===!0?" q-date--readonly":"")}),U=d(()=>t.color||"primary"),W=d(()=>t.textColor||"white"),P=d(()=>t.emitImmediately===!0&&t.multiple!==!0&&t.range!==!0),X=d(()=>Array.isArray(t.modelValue)===!0?t.modelValue:t.modelValue!==null&&t.modelValue!==void 0?[t.modelValue]:[]),I=d(()=>X.value.filter(e=>typeof e=="string").map(e=>pe(e,C.value,M.value)).filter(e=>e.dateHash!==null&&e.day!==null&&e.month!==null&&e.year!==null)),J=d(()=>{const e=a=>pe(a,C.value,M.value);return X.value.filter(a=>Yt(a)===!0&&a.from!==void 0&&a.to!==void 0).map(a=>({from:e(a.from),to:e(a.to)})).filter(a=>a.from.dateHash!==null&&a.to.dateHash!==null&&a.from.dateHash<a.to.dateHash)}),ye=d(()=>t.calendar!=="persian"?e=>new Date(e.year,e.month-1,e.day):e=>{const a=ct(e.year,e.month,e.day);return new Date(a.gy,a.gm-1,a.gd)}),He=d(()=>t.calendar==="persian"?te:(e,a,n)=>bt(new Date(e.year,e.month-1,e.day,e.hour,e.minute,e.second,e.millisecond),a===void 0?C.value:a,n===void 0?M.value:n,e.year,e.timezoneOffset)),oe=d(()=>I.value.length+J.value.reduce((e,a)=>e+1+Ot(ye.value(a.to),ye.value(a.from)),0)),de=d(()=>{if(t.title!==void 0&&t.title!==null&&t.title.length!==0)return t.title;if(F.value!==null){const n=F.value.init,s=ye.value(n);return M.value.daysShort[s.getDay()]+", "+M.value.monthsShort[n.month-1]+" "+n.day+Me+"?"}if(oe.value===0)return Me;if(oe.value>1)return`${oe.value} ${M.value.pluralDay}`;const e=I.value[0],a=ye.value(e);return isNaN(a.valueOf())===!0?Me:M.value.headerTitle!==void 0?M.value.headerTitle(a,e):M.value.daysShort[a.getDay()]+", "+M.value.monthsShort[e.month-1]+" "+e.day}),Be=d(()=>I.value.concat(J.value.map(a=>a.from)).sort((a,n)=>a.year-n.year||a.month-n.month)[0]),Ve=d(()=>I.value.concat(J.value.map(a=>a.to)).sort((a,n)=>n.year-a.year||n.month-a.month)[0]),Fe=d(()=>{if(t.subtitle!==void 0&&t.subtitle!==null&&t.subtitle.length!==0)return t.subtitle;if(oe.value===0)return Me;if(oe.value>1){const e=Be.value,a=Ve.value,n=M.value.monthsShort;return n[e.month-1]+(e.year!==a.year?" "+e.year+Me+n[a.month-1]+" ":e.month!==a.month?Me+n[a.month-1]:"")+" "+a.year}return I.value[0].year}),ge=d(()=>{const e=[x.iconSet.datetime.arrowLeft,x.iconSet.datetime.arrowRight];return x.lang.rtl===!0?e.reverse():e}),_e=d(()=>t.firstDayOfWeek!==void 0?Number(t.firstDayOfWeek):M.value.firstDayOfWeek),Se=d(()=>{const e=M.value.daysShort,a=_e.value;return a>0?e.slice(a,7).concat(e.slice(0,a)):e}),G=d(()=>{const e=u.value;return t.calendar!=="persian"?new Date(e.year,e.month,0).getDate():et(e.year,e.month)}),Pe=d(()=>typeof t.eventColor=="function"?t.eventColor:()=>t.eventColor),T=d(()=>{if(t.navigationMinYearMonth===void 0)return null;const e=t.navigationMinYearMonth.split("/");return{year:parseInt(e[0],10),month:parseInt(e[1],10)}}),A=d(()=>{if(t.navigationMaxYearMonth===void 0)return null;const e=t.navigationMaxYearMonth.split("/");return{year:parseInt(e[0],10),month:parseInt(e[1],10)}}),Ye=d(()=>{const e={month:{prev:!0,next:!0},year:{prev:!0,next:!0}};return T.value!==null&&T.value.year>=u.value.year&&(e.year.prev=!1,T.value.year===u.value.year&&T.value.month>=u.value.month&&(e.month.prev=!1)),A.value!==null&&A.value.year<=u.value.year&&(e.year.next=!1,A.value.year===u.value.year&&A.value.month<=u.value.month&&(e.month.next=!1)),e}),be=d(()=>{const e={};return I.value.forEach(a=>{const n=ie(a);e[n]===void 0&&(e[n]=[]),e[n].push(a.day)}),e}),Ee=d(()=>{const e={};return J.value.forEach(a=>{const n=ie(a.from),s=ie(a.to);if(e[n]===void 0&&(e[n]=[]),e[n].push({from:a.from.day,to:n===s?a.to.day:void 0,range:a}),n<s){let i;const{year:_,month:c}=a.from,m=c<12?{year:_,month:c+1}:{year:_+1,month:1};for(;(i=ie(m))<=s;)e[i]===void 0&&(e[i]=[]),e[i].push({from:void 0,to:i===s?a.to.day:void 0,range:a}),m.month++,m.month>12&&(m.year++,m.month=1)}}),e}),ve=d(()=>{if(F.value===null)return;const{init:e,initHash:a,final:n,finalHash:s}=F.value,[i,_]=a<=s?[e,n]:[n,e],c=ie(i),m=ie(_);if(c!==K.value&&m!==K.value)return;const H={};return c===K.value?(H.from=i.day,H.includeFrom=!0):H.from=1,m===K.value?(H.to=_.day,H.includeTo=!0):H.to=G.value,H}),K=d(()=>ie(u.value)),We=d(()=>{const e={};if(t.options===void 0){for(let n=1;n<=G.value;n++)e[n]=!0;return e}const a=typeof t.options=="function"?t.options:n=>t.options.includes(n);for(let n=1;n<=G.value;n++){const s=K.value+"/"+z(n);e[n]=a(s)}return e}),Je=d(()=>{const e={};if(t.events===void 0)for(let a=1;a<=G.value;a++)e[a]=!1;else{const a=typeof t.events=="function"?t.events:n=>t.events.includes(n);for(let n=1;n<=G.value;n++){const s=K.value+"/"+z(n);e[n]=a(s)===!0&&Pe.value(s)}}return e}),ke=d(()=>{let e,a;const{year:n,month:s}=u.value;if(t.calendar!=="persian")e=new Date(n,s-1,1),a=new Date(n,s-1,0).getDate();else{const i=ct(n,s,1);e=new Date(i.gy,i.gm-1,i.gd);let _=s-1,c=n;_===0&&(_=12,c--),a=et(c,_)}return{days:e.getDay()-_e.value-1,endDay:a}}),fe=d(()=>{const e=[],{days:a,endDay:n}=ke.value,s=a<0?a+7:a;if(s<6)for(let c=n-s;c<=n;c++)e.push({i:c,fill:!0});const i=e.length;for(let c=1;c<=G.value;c++){const m={i:c,event:Je.value[c],classes:[]};We.value[c]===!0&&(m.in=!0,m.flat=!0),e.push(m)}if(be.value[K.value]!==void 0&&be.value[K.value].forEach(c=>{const m=i+c-1;Object.assign(e[m],{selected:!0,unelevated:!0,flat:!1,color:U.value,textColor:W.value})}),Ee.value[K.value]!==void 0&&Ee.value[K.value].forEach(c=>{if(c.from!==void 0){const m=i+c.from-1,H=i+(c.to||G.value)-1;for(let Te=m;Te<=H;Te++)Object.assign(e[Te],{range:c.range,unelevated:!0,color:U.value,textColor:W.value});Object.assign(e[m],{rangeFrom:!0,flat:!1}),c.to!==void 0&&Object.assign(e[H],{rangeTo:!0,flat:!1})}else if(c.to!==void 0){const m=i+c.to-1;for(let H=i;H<=m;H++)Object.assign(e[H],{range:c.range,unelevated:!0,color:U.value,textColor:W.value});Object.assign(e[m],{flat:!1,rangeTo:!0})}else{const m=i+G.value-1;for(let H=i;H<=m;H++)Object.assign(e[H],{range:c.range,unelevated:!0,color:U.value,textColor:W.value})}}),ve.value!==void 0){const c=i+ve.value.from-1,m=i+ve.value.to-1;for(let H=c;H<=m;H++)e[H].color=U.value,e[H].editRange=!0;ve.value.includeFrom===!0&&(e[c].editRangeFrom=!0),ve.value.includeTo===!0&&(e[m].editRangeTo=!0)}u.value.year===f.value.year&&u.value.month===f.value.month&&(e[i+f.value.day-1].today=!0);const _=e.length%7;if(_>0){const c=7-_;for(let m=1;m<=c;m++)e.push({i:m,fill:!0})}return e.forEach(c=>{let m="q-date__calendar-item ";c.fill===!0?m+="q-date__calendar-item--fill":(m+=`q-date__calendar-item--${c.in===!0?"in":"out"}`,c.range!==void 0&&(m+=` q-date__range${c.rangeTo===!0?"-to":c.rangeFrom===!0?"-from":""}`),c.editRange===!0&&(m+=` q-date__edit-range${c.editRangeFrom===!0?"-from":""}${c.editRangeTo===!0?"-to":""}`),(c.range!==void 0||c.editRange===!0)&&(m+=` text-${c.color}`)),c.classes=m}),e}),qe=d(()=>t.disable===!0?{"aria-disabled":"true"}:t.readonly===!0?{"aria-readonly":"true"}:{});re(()=>t.modelValue,e=>{if(O===e)O=0;else{const a=l(C.value,M.value);L(a.year,a.month,a)}}),re(w,()=>{le.value!==null&&j.$el.contains(document.activeElement)===!0&&le.value.focus()}),re(()=>u.value.year+"|"+u.value.month,()=>{b("navigation",{year:u.value.year,month:u.value.month})}),re(Ie,e=>{st(e,M.value,"mask"),C.value=e}),re(he,e=>{st(C.value,e,"locale"),M.value=e});function Ne(){const e=f.value,a=be.value[ie(e)];(a===void 0||a.includes(e.day)===!1)&&Ge(e),Z(e.year,e.month)}function Ke(e){vt(e)===!0&&(w.value=e)}function Le(e,a){["month","year"].includes(e)&&(e==="month"?v:h)(a===!0?-1:1)}function Z(e,a){w.value="Calendar",L(e,a)}function Oe(e,a){if(t.range===!1||!e){F.value=null;return}const n=Object.assign({...u.value},e),s=a!==void 0?Object.assign({...u.value},a):n;F.value={init:n,initHash:te(n),final:s,finalHash:te(s)},Z(n.year,n.month)}function Qe(){return t.calendar==="persian"?"YYYY/MM/DD":t.mask}function pe(e,a,n){return je(e,a,n,t.calendar,{hour:0,minute:0,second:0,millisecond:0})}function l(e,a){const n=Array.isArray(t.modelValue)===!0?t.modelValue:t.modelValue?[t.modelValue]:[];if(n.length===0)return o();const s=n[n.length-1],i=pe(s.from!==void 0?s.from:s,e,a);return i.dateHash===null?o():i}function o(){let e,a;if(t.defaultYearMonth!==void 0){const n=t.defaultYearMonth.split("/");e=parseInt(n[0],10),a=parseInt(n[1],10)}else{const n=f.value!==void 0?f.value:D();e=n.year,a=n.month}return{year:e,month:a,day:1,hour:0,minute:0,second:0,millisecond:0,dateHash:e+"/"+z(a)+"/01"}}function v(e){let a=u.value.year,n=Number(u.value.month)+e;n===13?(n=1,a++):n===0&&(n=12,a--),L(a,n),P.value===!0&&we("month")}function h(e){const a=Number(u.value.year)+e;L(a,u.value.month),P.value===!0&&we("year")}function S(e){L(e,u.value.month),w.value=t.defaultView==="Years"?"Months":"Calendar",P.value===!0&&we("year")}function Q(e){L(u.value.year,e),w.value="Calendar",P.value===!0&&we("month")}function y(e,a){const n=be.value[a];(n!==void 0&&n.includes(e.day)===!0?Xe:Ge)(e)}function Y(e){return{year:e.year,month:e.month,day:e.day}}function L(e,a,n){if(T.value!==null&&e<=T.value.year&&(e=T.value.year,a<T.value.month&&(a=T.value.month)),A.value!==null&&e>=A.value.year&&(e=A.value.year,a>A.value.month&&(a=A.value.month)),n!==void 0){const{hour:i,minute:_,second:c,millisecond:m,timezoneOffset:H,timeHash:Te}=n;Object.assign(u.value,{hour:i,minute:_,second:c,millisecond:m,timezoneOffset:H,timeHash:Te})}const s=e+"/"+z(a)+"/01";s!==u.value.dateHash&&(ue.value=u.value.dateHash<s==(x.lang.rtl!==!0)?"left":"right",e!==u.value.year&&(B.value=ue.value),ut(()=>{se.value=e-e%me-(e<0?me:0),Object.assign(u.value,{year:e,month:a,day:1,dateHash:s})}))}function Re(e,a,n){const s=e!==null&&e.length===1&&t.multiple===!1?e[0]:e;O=s;const{reason:i,details:_}=rt(a,n);b("update:modelValue",s,i,_)}function we(e){const a=I.value[0]!==void 0&&I.value[0].dateHash!==null?{...I.value[0]}:{...u.value};ut(()=>{a.year=u.value.year,a.month=u.value.month;const n=t.calendar!=="persian"?new Date(a.year,a.month,0).getDate():et(a.year,a.month);a.day=Math.min(Math.max(1,a.day),n);const s=Ce(a);O=s;const{details:i}=rt("",a);b("update:modelValue",s,e,i)})}function rt(e,a){return a.from!==void 0?{reason:`${e}-range`,details:{...Y(a.target),from:Y(a.from),to:Y(a.to)}}:{reason:`${e}-day`,details:Y(a)}}function Ce(e,a,n){return e.from!==void 0?{from:He.value(e.from,a,n),to:He.value(e.to,a,n)}:He.value(e,a,n)}function Ge(e){let a;if(t.multiple===!0)if(e.from!==void 0){const n=te(e.from),s=te(e.to),i=I.value.filter(c=>c.dateHash<n||c.dateHash>s),_=J.value.filter(({from:c,to:m})=>m.dateHash<n||c.dateHash>s);a=i.concat(_).concat(e).map(c=>Ce(c))}else{const n=X.value.slice();n.push(Ce(e)),a=n}else a=Ce(e);Re(a,"add",e)}function Xe(e){if(t.noUnset===!0)return;let a=null;if(t.multiple===!0&&Array.isArray(t.modelValue)===!0){const n=Ce(e);e.from!==void 0?a=t.modelValue.filter(s=>s.from!==void 0?s.from!==n.from&&s.to!==n.to:!0):a=t.modelValue.filter(s=>s!==n),a.length===0&&(a=null)}Re(a,"remove",e)}function st(e,a,n){const s=I.value.concat(J.value).map(i=>Ce(i,e,a)).filter(i=>i.from!==void 0?i.from.dateHash!==null&&i.to.dateHash!==null:i.dateHash!==null);b("update:modelValue",(t.multiple===!0?s:s[0])||null,n)}function xt(){if(t.minimal!==!0)return r("div",{class:"q-date__header "+N.value},[r("div",{class:"relative-position"},[r(xe,{name:"q-transition--fade"},()=>r("div",{key:"h-yr-"+Fe.value,class:"q-date__header-subtitle q-date__header-link "+(w.value==="Years"?"q-date__header-link--active":"cursor-pointer"),tabindex:q.value,...k("vY",{onClick(){w.value="Years"},onKeyup(e){e.keyCode===13&&(w.value="Years")}})},[Fe.value]))]),r("div",{class:"q-date__header-title relative-position flex no-wrap"},[r("div",{class:"relative-position col"},[r(xe,{name:"q-transition--fade"},()=>r("div",{key:"h-sub"+de.value,class:"q-date__header-title-label q-date__header-link "+(w.value==="Calendar"?"q-date__header-link--active":"cursor-pointer"),tabindex:q.value,...k("vC",{onClick(){w.value="Calendar"},onKeyup(e){e.keyCode===13&&(w.value="Calendar")}})},[de.value]))]),t.todayBtn===!0?r($,{class:"q-date__header-today self-start",icon:x.iconSet.datetime.today,flat:!0,size:"sm",round:!0,tabindex:q.value,onClick:Ne}):null])])}function Ze({label:e,type:a,key:n,dir:s,goTo:i,boundaries:_,cls:c}){return[r("div",{class:"row items-center q-date__arrow"},[r($,{round:!0,dense:!0,size:"sm",flat:!0,icon:ge.value[0],tabindex:q.value,disable:_.prev===!1,...k("go-#"+a,{onClick(){i(-1)}})})]),r("div",{class:"relative-position overflow-hidden flex flex-center"+c},[r(xe,{name:"q-transition--jump-"+s},()=>r("div",{key:n},[r($,{flat:!0,dense:!0,noCaps:!0,label:e,tabindex:q.value,...k("view#"+a,{onClick:()=>{w.value=a}})})]))]),r("div",{class:"row items-center q-date__arrow"},[r($,{round:!0,dense:!0,size:"sm",flat:!0,icon:ge.value[1],tabindex:q.value,disable:_.next===!1,...k("go+#"+a,{onClick(){i(1)}})})])]}const Dt={Calendar:()=>[r("div",{key:"calendar-view",class:"q-date__view q-date__calendar"},[r("div",{class:"q-date__navigation row items-center no-wrap"},Ze({label:M.value.months[u.value.month-1],type:"Months",key:u.value.month,dir:ue.value,goTo:v,boundaries:Ye.value.month,cls:" col"}).concat(Ze({label:u.value.year,type:"Years",key:u.value.year,dir:B.value,goTo:h,boundaries:Ye.value.year,cls:""}))),r("div",{class:"q-date__calendar-weekdays row items-center no-wrap"},Se.value.map(e=>r("div",{class:"q-date__calendar-item"},[r("div",e)]))),r("div",{class:"q-date__calendar-days-container relative-position overflow-hidden"},[r(xe,{name:"q-transition--slide-"+ue.value},()=>r("div",{key:K.value,class:"q-date__calendar-days fit"},fe.value.map(e=>r("div",{class:e.classes},[e.in===!0?r($,{class:e.today===!0?"q-date__today":"",dense:!0,flat:e.flat,unelevated:e.unelevated,color:e.color,textColor:e.textColor,label:e.i,tabindex:q.value,...k("day#"+e.i,{onClick:()=>{Ht(e.i)},onMouseover:()=>{Vt(e.i)}})},e.event!==!1?()=>r("div",{class:"q-date__event bg-"+e.event}):null):r("div",""+e.i)]))))])])],Months(){const e=u.value.year===f.value.year,a=s=>T.value!==null&&u.value.year===T.value.year&&T.value.month>s||A.value!==null&&u.value.year===A.value.year&&A.value.month<s,n=M.value.monthsShort.map((s,i)=>{const _=u.value.month===i+1;return r("div",{class:"q-date__months-item flex flex-center"},[r($,{class:e===!0&&f.value.month===i+1?"q-date__today":null,flat:_!==!0,label:s,unelevated:_,color:_===!0?U.value:null,textColor:_===!0?W.value:null,tabindex:q.value,disable:a(i+1),...k("month#"+i,{onClick:()=>{Q(i+1)}})})])});return t.yearsInMonthView===!0&&n.unshift(r("div",{class:"row no-wrap full-width"},[Ze({label:u.value.year,type:"Years",key:u.value.year,dir:B.value,goTo:h,boundaries:Ye.value.year,cls:" col"})])),r("div",{key:"months-view",class:"q-date__view q-date__months flex flex-center"},n)},Years(){const e=se.value,a=e+me,n=[],s=i=>T.value!==null&&T.value.year>i||A.value!==null&&A.value.year<i;for(let i=e;i<=a;i++){const _=u.value.year===i;n.push(r("div",{class:"q-date__years-item flex flex-center"},[r($,{key:"yr"+i,class:f.value.year===i?"q-date__today":null,flat:!_,label:i,dense:!0,unelevated:_,color:_===!0?U.value:null,textColor:_===!0?W.value:null,tabindex:q.value,disable:s(i),...k("yr#"+i,{onClick:()=>{S(i)}})})]))}return r("div",{class:"q-date__view q-date__years flex flex-center"},[r("div",{class:"col-auto"},[r($,{round:!0,dense:!0,flat:!0,icon:ge.value[0],tabindex:q.value,disable:s(e),...k("y-",{onClick:()=>{se.value-=me}})})]),r("div",{class:"q-date__years-content col self-stretch row items-center"},n),r("div",{class:"col-auto"},[r($,{round:!0,dense:!0,flat:!0,icon:ge.value[1],tabindex:q.value,disable:s(a),...k("y+",{onClick:()=>{se.value+=me}})})])])}};function Ht(e){const a={...u.value,day:e};if(t.range===!1){y(a,K.value);return}if(F.value===null){const n=fe.value.find(i=>i.fill!==!0&&i.i===e);if(t.noUnset!==!0&&n.range!==void 0){Xe({target:a,from:n.range.from,to:n.range.to});return}if(n.selected===!0){Xe(a);return}const s=te(a);F.value={init:a,initHash:s,final:a,finalHash:s},b("rangeStart",Y(a))}else{const n=F.value.initHash,s=te(a),i=n<=s?{from:F.value.init,to:a}:{from:a,to:F.value.init};F.value=null,Ge(n===s?a:{target:a,...i}),b("rangeEnd",{from:Y(i.from),to:Y(i.to)})}}function Vt(e){if(F.value!==null){const a={...u.value,day:e};Object.assign(F.value,{final:a,finalHash:te(a)})}}return Object.assign(j,{setToday:Ne,setView:Ke,offsetCalendar:Le,setCalendarTo:Z,setEditingRange:Oe}),()=>{const e=[r("div",{class:"q-date__content col relative-position"},[r(xe,{name:"q-transition--fade"},Dt[w.value])])],a=kt(g.default);return a!==void 0&&e.push(r("div",{class:"q-date__actions"},a)),t.name!==void 0&&t.disable!==!0&&ne(e,"push"),r("div",{class:ce.value,...qe.value},[xt(),r("div",{ref:le,class:"q-date__main col column",tabindex:-1},e)])}}}),ft=ot({name:"QPopupProxy",props:{...zt,breakpoint:{type:[String,Number],default:450}},emits:["show","hide"],setup(t,{slots:g,emit:b,attrs:j}){const{proxy:x}=it(),{$q:E}=x,k=p(!1),q=p(null),N=d(()=>parseInt(t.breakpoint,10)),{canShow:V}=Ut({showing:k});function D(){return E.screen.width<N.value||E.screen.height<N.value?"dialog":"menu"}const O=p(D()),ae=d(()=>O.value==="menu"?{maxHeight:"99vh"}:{});re(()=>D(),C=>{k.value!==!0&&(O.value=C)});function ne(C){k.value=!0,b("show",C)}function le(C){k.value=!1,O.value=D(),b("hide",C)}return Object.assign(x,{show(C){V(C)===!0&&q.value.show(C)},hide(C){q.value.hide(C)},toggle(C){q.value.toggle(C)}}),pt(x,"currentComponent",()=>({type:O.value,ref:q.value})),()=>{const C={ref:q,...ae.value,...j,onShow:ne,onHide:le};let M;return O.value==="dialog"?M=Tt:(M=Wt,Object.assign(C,{target:t.target,contextMenu:t.contextMenu,noParentEvent:!0,separateClosePopup:!0})),r(M,C,g.default)}}});function aa(t,g){if(t.hour!==null){if(t.minute===null)return"minute";if(g===!0&&t.second===null)return"second"}return"hour"}function na(){const t=new Date;return{hour:t.getHours(),minute:t.getMinutes(),second:t.getSeconds(),millisecond:t.getMilliseconds()}}const la=ot({name:"QTime",props:{...yt,...ht,...wt,mask:{default:null},format24h:{type:Boolean,default:null},defaultDate:{type:String,validator:t=>/^-?[\d]+\/[0-1]\d\/[0-3]\d$/.test(t)},options:Function,hourOptions:Array,minuteOptions:Array,secondOptions:Array,withSeconds:Boolean,nowBtn:Boolean},emits:Ct,setup(t,{slots:g,emit:b}){const j=it(),{$q:x}=j.proxy,E=gt(t,x),{tabindex:k,headerClass:q,getLocale:N,getCurrentDate:V}=Mt(t,x),D=_t(t),O=qt(D);let ae,ne;const le=p(null),C=d(()=>Fe()),M=d(()=>N()),Ie=d(()=>ge()),he=je(t.modelValue,C.value,M.value,t.calendar,Ie.value),f=p(aa(he)),u=p(he),w=p(he.hour===null||he.hour<12),$e=d(()=>`q-time q-time--${t.landscape===!0?"landscape":"portrait"}`+(E.value===!0?" q-time--dark q-dark":"")+(t.disable===!0?" disabled":t.readonly===!0?" q-time--readonly":"")+(t.bordered===!0?" q-time--bordered":"")+(t.square===!0?" q-time--square no-border-radius":"")+(t.flat===!0?" q-time--flat no-shadow":"")),ue=d(()=>{const l=u.value;return{hour:l.hour===null?"--":B.value===!0?z(l.hour):String(w.value===!0?l.hour===0?12:l.hour:l.hour>12?l.hour-12:l.hour),minute:l.minute===null?"--":z(l.minute),second:l.second===null?"--":z(l.second)}}),B=d(()=>t.format24h!==null?t.format24h:x.lang.date.format24h),De=d(()=>{const l=f.value==="hour",o=l===!0?12:60,v=u.value[f.value];let S=`rotate(${Math.round(v*(360/o))-180}deg) translateX(-50%)`;return l===!0&&B.value===!0&&u.value.hour>=12&&(S+=" scale(.7)"),{transform:S}}),se=d(()=>u.value.hour!==null),F=d(()=>se.value===!0&&u.value.minute!==null),ce=d(()=>t.hourOptions!==void 0?l=>t.hourOptions.includes(l):t.options!==void 0?l=>t.options(l,null,null):null),U=d(()=>t.minuteOptions!==void 0?l=>t.minuteOptions.includes(l):t.options!==void 0?l=>t.options(u.value.hour,l,null):null),W=d(()=>t.secondOptions!==void 0?l=>t.secondOptions.includes(l):t.options!==void 0?l=>t.options(u.value.hour,u.value.minute,l):null),P=d(()=>{if(ce.value===null)return null;const l=de(0,11,ce.value),o=de(12,11,ce.value);return{am:l,pm:o,values:l.values.concat(o.values)}}),X=d(()=>U.value!==null?de(0,59,U.value):null),I=d(()=>W.value!==null?de(0,59,W.value):null),J=d(()=>{switch(f.value){case"hour":return P.value;case"minute":return X.value;case"second":return I.value}}),ye=d(()=>{let l,o,v=0,h=1;const S=J.value!==null?J.value.values:void 0;f.value==="hour"?B.value===!0?(l=0,o=23):(l=0,o=11,w.value===!1&&(v=12)):(l=0,o=55,h=5);const Q=[];for(let y=l,Y=l;y<=o;y+=h,Y++){const L=y+v,Re=S!==void 0&&S.includes(L)===!1,we=f.value==="hour"&&y===0?B.value===!0?"00":"12":y;Q.push({val:L,index:Y,disable:Re,label:we})}return Q}),He=d(()=>[[Jt,G,void 0,{stop:!0,prevent:!0,mouse:!0}]]);re(()=>t.modelValue,l=>{const o=je(l,C.value,M.value,t.calendar,Ie.value);(o.dateHash!==u.value.dateHash||o.timeHash!==u.value.timeHash)&&(u.value=o,o.hour===null?f.value="hour":w.value=o.hour<12)}),re([C,M],()=>{ut(()=>{Oe()})});function oe(){const l={...V(),...na()};Oe(l),Object.assign(u.value,l),f.value="hour"}function de(l,o,v){const h=Array.apply(null,{length:o+1}).map((S,Q)=>{const y=Q+l;return{index:y,val:v(y)===!0}}).filter(S=>S.val===!0).map(S=>S.index);return{min:h[0],max:h[h.length-1],values:h,threshold:o+1}}function Be(l,o,v){const h=Math.abs(l-o);return Math.min(h,v-h)}function Ve(l,{min:o,max:v,values:h,threshold:S}){if(l===o)return o;if(l<o||l>v)return Be(l,o,S)<=Be(l,v,S)?o:v;const Q=h.findIndex(L=>l<=L),y=h[Q-1],Y=h[Q];return l-y<=Y-l?y:Y}function Fe(){return t.calendar!=="persian"&&t.mask!==null?t.mask:`HH:mm${t.withSeconds===!0?":ss":""}`}function ge(){if(typeof t.defaultDate!="string"){const l=V(!0);return l.dateHash=te(l),l}return je(t.defaultDate,"YYYY/MM/DD",void 0,t.calendar)}function _e(){return At(j)===!0||J.value!==null&&(J.value.values.length===0||f.value==="hour"&&B.value!==!0&&P.value[w.value===!0?"am":"pm"].values.length===0)}function Se(){const l=le.value,{top:o,left:v,width:h}=l.getBoundingClientRect(),S=h/2;return{top:o+S,left:v+S,dist:S*.7}}function G(l){if(_e()!==!0){if(l.isFirst===!0){ae=Se(),ne=T(l.evt,ae);return}ne=T(l.evt,ae,ne),l.isFinal===!0&&(ae=!1,ne=null,Pe())}}function Pe(){f.value==="hour"?f.value="minute":t.withSeconds&&f.value==="minute"&&(f.value="second")}function T(l,o,v){const h=jt(l),S=Math.abs(h.top-o.top),Q=Math.sqrt(Math.pow(Math.abs(h.top-o.top),2)+Math.pow(Math.abs(h.left-o.left),2));let y,Y=Math.asin(S/Q)*(180/Math.PI);if(h.top<o.top?Y=o.left<h.left?90-Y:270+Y:Y=o.left<h.left?Y+90:270-Y,f.value==="hour"){if(y=Y/30,P.value!==null){const L=B.value!==!0?w.value===!0:P.value.am.values.length!==0&&P.value.pm.values.length!==0?Q>=o.dist:P.value.am.values.length!==0;y=Ve(y+(L===!0?0:12),P.value[L===!0?"am":"pm"])}else y=Math.round(y),B.value===!0?Q<o.dist?y<12&&(y+=12):y===12&&(y=0):w.value===!0&&y===12?y=0:w.value===!1&&y!==12&&(y+=12);B.value===!0&&(w.value=y<12)}else y=Math.round(Y/6)%60,f.value==="minute"&&X.value!==null?y=Ve(y,X.value):f.value==="second"&&I.value!==null&&(y=Ve(y,I.value));return v!==y&&Ne[f.value](y),y}const A={hour(){f.value="hour"},minute(){f.value="minute"},second(){f.value="second"}};function Ye(l){l.keyCode===13&&Ke()}function be(l){l.keyCode===13&&Le()}function Ee(l){_e()!==!0&&(x.platform.is.desktop!==!0&&T(l,Se()),Pe())}function ve(l){_e()!==!0&&T(l,Se())}function K(l){if(l.keyCode===13)f.value="hour";else if([37,39].includes(l.keyCode)){const o=l.keyCode===37?-1:1;if(P.value!==null){const v=B.value===!0?P.value.values:P.value[w.value===!0?"am":"pm"].values;if(v.length===0)return;if(u.value.hour===null)ke(v[0]);else{const h=(v.length+v.indexOf(u.value.hour)+o)%v.length;ke(v[h])}}else{const v=B.value===!0?24:12,h=B.value!==!0&&w.value===!1?12:0,S=u.value.hour===null?-o:u.value.hour;ke(h+(24+S+o)%v)}}}function We(l){if(l.keyCode===13)f.value="minute";else if([37,39].includes(l.keyCode)){const o=l.keyCode===37?-1:1;if(X.value!==null){const v=X.value.values;if(v.length===0)return;if(u.value.minute===null)fe(v[0]);else{const h=(v.length+v.indexOf(u.value.minute)+o)%v.length;fe(v[h])}}else{const v=u.value.minute===null?-o:u.value.minute;fe((60+v+o)%60)}}}function Je(l){if(l.keyCode===13)f.value="second";else if([37,39].includes(l.keyCode)){const o=l.keyCode===37?-1:1;if(I.value!==null){const v=I.value.values;if(v.length===0)return;if(u.value.seconds===null)qe(v[0]);else{const h=(v.length+v.indexOf(u.value.second)+o)%v.length;qe(v[h])}}else{const v=u.value.second===null?-o:u.value.second;qe((60+v+o)%60)}}}function ke(l){u.value.hour!==l&&(u.value.hour=l,Z())}function fe(l){u.value.minute!==l&&(u.value.minute=l,Z())}function qe(l){u.value.second!==l&&(u.value.second=l,Z())}const Ne={hour:ke,minute:fe,second:qe};function Ke(){w.value===!1&&(w.value=!0,u.value.hour!==null&&(u.value.hour-=12,Z()))}function Le(){w.value===!0&&(w.value=!1,u.value.hour!==null&&(u.value.hour+=12,Z()))}function Z(){if(ce.value!==null&&ce.value(u.value.hour)!==!0){u.value=je(),f.value="hour";return}if(U.value!==null&&U.value(u.value.minute)!==!0){u.value.minute=null,u.value.second=null,f.value="minute";return}if(t.withSeconds===!0&&W.value!==null&&W.value(u.value.second)!==!0){u.value.second=null,f.value="second";return}u.value.hour===null||u.value.minute===null||t.withSeconds===!0&&u.value.second===null||Oe()}function Oe(l){const o=Object.assign({...u.value},l),v=t.calendar==="persian"?z(o.hour)+":"+z(o.minute)+(t.withSeconds===!0?":"+z(o.second):""):bt(new Date(o.year,o.month===null?null:o.month-1,o.day,o.hour,o.minute,o.second,o.millisecond),C.value,M.value,o.year,o.timezoneOffset);o.changed=v!==t.modelValue,b("update:modelValue",v,o)}function Qe(){const l=[r("div",{class:"q-time__link "+(f.value==="hour"?"q-time__link--active":"cursor-pointer"),tabindex:k.value,onClick:A.hour,onKeyup:K},ue.value.hour),r("div",":"),r("div",se.value===!0?{class:"q-time__link "+(f.value==="minute"?"q-time__link--active":"cursor-pointer"),tabindex:k.value,onKeyup:We,onClick:A.minute}:{class:"q-time__link"},ue.value.minute)];t.withSeconds===!0&&l.push(r("div",":"),r("div",F.value===!0?{class:"q-time__link "+(f.value==="second"?"q-time__link--active":"cursor-pointer"),tabindex:k.value,onKeyup:Je,onClick:A.second}:{class:"q-time__link"},ue.value.second));const o=[r("div",{class:"q-time__header-label row items-center no-wrap",dir:"ltr"},l)];return B.value===!1&&o.push(r("div",{class:"q-time__header-ampm column items-between no-wrap"},[r("div",{class:"q-time__link "+(w.value===!0?"q-time__link--active":"cursor-pointer"),tabindex:k.value,onClick:Ke,onKeyup:Ye},"AM"),r("div",{class:"q-time__link "+(w.value!==!0?"q-time__link--active":"cursor-pointer"),tabindex:k.value,onClick:Le,onKeyup:be},"PM")])),r("div",{class:"q-time__header flex flex-center no-wrap "+q.value},o)}function pe(){const l=u.value[f.value];return r("div",{class:"q-time__content col relative-position"},[r(xe,{name:"q-transition--scale"},()=>r("div",{key:"clock"+f.value,class:"q-time__container-parent absolute-full"},[r("div",{ref:le,class:"q-time__container-child fit overflow-hidden"},[Ae(r("div",{class:"q-time__clock cursor-pointer non-selectable",onClick:Ee,onMousedown:ve},[r("div",{class:"q-time__clock-circle fit"},[r("div",{class:"q-time__clock-pointer"+(u.value[f.value]===null?" hidden":t.color!==void 0?` text-${t.color}`:""),style:De.value}),ye.value.map(o=>r("div",{class:`q-time__clock-position row flex-center q-time__clock-pos-${o.index}`+(o.val===l?" q-time__clock-position--active "+q.value:o.disable===!0?" q-time__clock-position--disable":"")},[r("span",o.label)]))])]),He.value)])])),t.nowBtn===!0?r($,{class:"q-time__now-button absolute",icon:x.iconSet.datetime.now,unelevated:!0,size:"sm",round:!0,color:t.color,textColor:t.textColor,tabindex:k.value,onClick:oe}):null])}return j.proxy.setNow=oe,()=>{const l=[pe()],o=kt(g.default);return o!==void 0&&l.push(r("div",{class:"q-time__actions"},o)),t.name!==void 0&&t.disable!==!0&&O(l,"push"),r("div",{class:$e.value,tabindex:-1},[Qe(),r("div",{class:"q-time__main col overflow-auto"},l)])}}});function mt(t){if(t===!1)return 0;if(t===!0||t===void 0)return 1;const g=parseInt(t,10);return isNaN(g)?0:g}const Ue=It({name:"close-popup",beforeMount(t,{value:g}){const b={depth:mt(g),handler(j){b.depth!==0&&setTimeout(()=>{const x=$t(t);x!==void 0&&Bt(x,j,b.depth)})},handlerKey(j){Ft(j,13)===!0&&b.handler(j)}};t.__qclosepopup=b,t.addEventListener("click",b.handler),t.addEventListener("keyup",b.handlerKey)},updated(t,{value:g,oldValue:b}){g!==b&&(t.__qclosepopup.depth=mt(g))},beforeUnmount(t){const g=t.__qclosepopup;t.removeEventListener("click",g.handler),t.removeEventListener("keyup",g.handlerKey),delete t.__qclosepopup}}),ua={class:"text-h6"},oa={class:"row items-center justify-end q-gutter-sm"},ia={class:"row items-center justify-end q-gutter-sm"},fa=Pt({__name:"TimestampInput",props:{field:{},label:{},desc:{},getDefault:{type:Function}},setup(t){const g=t,b=Gt(),j=p(null),x=p(""),E=p(""),k=p("");Et(()=>{const V=b.record[g.field]??g.getDefault();E.value=tt.formatDate(V,"ddd MMM DD YYYY"),k.value=tt.formatDate(V,"HH:mm:00"),q(V)});function q(V=g.getDefault()){b.record[g.field]=V,x.value=tt.formatDate(V,"ddd, YYYY MMM Do, h:mm A")}function N(){if(E.value&&k.value){const V=new Date(`${E.value} ${k.value}`).getTime();q(V)}}return(V,D)=>(Nt(),Kt(Rt,null,{default:ee(()=>[R(Lt,null,{default:ee(()=>[ze("p",ua,dt(V.label),1),ze("p",null,dt(V.desc),1),R(Qt,{modelValue:x.value,"onUpdate:modelValue":D[5]||(D[5]=O=>x.value=O),ref_key:"inputRef",ref:j,dense:"",outlined:"",disable:"",color:"primary",hint:"Auto formatted"},{after:ee(()=>[R($,{icon:at(nt).CALENDAR_DATE,color:"primary",class:"q-px-sm"},{default:ee(()=>[R(ft,null,{default:ee(()=>[R(ta,{modelValue:E.value,"onUpdate:modelValue":D[1]||(D[1]=O=>E.value=O),mask:"ddd MMM DD YYYY"},{default:ee(()=>[ze("div",oa,[Ae(R($,{label:"Cancel",flat:""},null,512),[[Ue]]),Ae(R($,{label:"OK",color:"primary",flat:"",onClick:D[0]||(D[0]=O=>N())},null,512),[[Ue]])])]),_:1},8,["modelValue"])]),_:1})]),_:1},8,["icon"]),R($,{icon:at(nt).CLOCK,color:"primary",class:"q-ml-sm q-px-sm"},{default:ee(()=>[R(ft,null,{default:ee(()=>[R(la,{modelValue:k.value,"onUpdate:modelValue":D[3]||(D[3]=O=>k.value=O),mask:"HH:mm:00","now-btn":""},{default:ee(()=>[ze("div",ia,[Ae(R($,{label:"Cancel",flat:""},null,512),[[Ue]]),Ae(R($,{label:"OK",color:"primary",flat:"",onClick:D[2]||(D[2]=O=>N())},null,512),[[Ue]])])]),_:1},8,["modelValue"])]),_:1})]),_:1},8,["icon"]),R($,{icon:at(nt).CALENDAR_CHECK,color:"positive",class:"q-ml-sm q-px-sm",onClick:D[4]||(D[4]=O=>q())},null,8,["icon"])]),_:1},8,["modelValue"])]),_:1})]),_:1}))}});export{fa as default};
