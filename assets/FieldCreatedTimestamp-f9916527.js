import{e as d,bh as L,bi as Yt,c as it,a as yt,a2 as gt,g as rt,a3 as _t,d as bt,r as j,af as pt,bj as dt,bk as kt,bl as Ot,bm as tt,a4 as ie,bn as Ae,ag as ut,h as r,aQ as Me,a0 as wt,i as qt,z as B,aj as Tt,C as jt,aD as At,ap as It,H as Ie,bo as Bt,bp as Ft,bq as $t,br as Pt,k as Et,l as Nt,bs as je,m as at,G as vt,v as Kt,x as Ue,n as Lt,w as fe,p as J,I as nt,t as ot,_ as Qt,L as Rt,P as zt}from"./index-b485ae0b.js";import{u as Ut,a as Wt,Q as Jt}from"./QMenu-06baf04f.js";import{T as Gt}from"./TouchPan-36a887dc.js";import{u as Xt}from"./action-35b72a8d.js";import"./selection-1d7d8417.js";function Zt(){const t=new Map;return{getCache:function(g,_){return t[g]===void 0?t[g]=_:t[g]},getCacheWithFn:function(g,_){return t[g]===void 0?t[g]=_():t[g]}}}const ea=["gregorian","persian"],Dt={modelValue:{required:!0},mask:{type:String},locale:Object,calendar:{type:String,validator:t=>ea.includes(t),default:"gregorian"},landscape:Boolean,color:String,textColor:String,square:Boolean,flat:Boolean,bordered:Boolean,readonly:Boolean,disable:Boolean},Ct=["update:modelValue"];function ee(t){return t.year+"/"+L(t.month)+"/"+L(t.day)}function Mt(t,g){const _=d(()=>t.disable!==!0&&t.readonly!==!0),V=d(()=>_.value===!0?0:-1),b=d(()=>{const q=[];return t.color!==void 0&&q.push(`bg-${t.color}`),t.textColor!==void 0&&q.push(`text-${t.textColor}`),q.join(" ")});function Q(){return t.locale!==void 0?{...g.lang.date,...t.locale}:g.lang.date}function M(q){const S=new Date,x=q===!0?null:0;if(t.calendar==="persian"){const O=Yt(S);return{year:O.jy,month:O.jm,day:O.jd}}return{year:S.getFullYear(),month:S.getMonth()+1,day:S.getDate(),hour:x,minute:x,second:x,millisecond:x}}return{editable:_,tabindex:V,headerClass:b,getLocale:Q,getCurrentDate:M}}const me=20,ta=["Calendar","Years","Months"],ft=t=>ta.includes(t),lt=t=>/^-?[\d]+\/[0-1]\d$/.test(t),Ce=" — ";function oe(t){return t.year+"/"+L(t.month)}const aa=it({name:"QDate",props:{...Dt,...yt,...gt,multiple:Boolean,range:Boolean,title:String,subtitle:String,mask:{default:"YYYY/MM/DD"},defaultYearMonth:{type:String,validator:lt},yearsInMonthView:Boolean,events:[Array,Function],eventColor:[String,Function],emitImmediately:Boolean,options:[Array,Function],navigationMinYearMonth:{type:String,validator:lt},navigationMaxYearMonth:{type:String,validator:lt},noUnset:Boolean,firstDayOfWeek:[String,Number],todayBtn:Boolean,minimal:Boolean,defaultView:{type:String,default:"Calendar",validator:ft}},emits:[...Ct,"rangeStart","rangeEnd","navigation"],setup(t,{slots:g,emit:_}){const{proxy:V}=rt(),{$q:b}=V,Q=_t(t,b),{getCache:M}=Zt(),{tabindex:q,headerClass:S,getLocale:x,getCurrentDate:O}=Mt(t,b);let R;const te=bt(t),ae=qt(te),ne=j(null),D=j(Re()),C=j(x()),Be=d(()=>Re()),he=d(()=>x()),f=d(()=>O()),u=j(l(D.value,C.value)),w=j(t.defaultView),Fe=b.lang.rtl===!0?"right":"left",le=j(Fe.value),F=j(Fe.value),xe=u.value.year,re=j(xe-xe%me-(xe<0?me:0)),$=j(null),se=d(()=>{const e=t.landscape===!0?"landscape":"portrait";return`q-date q-date--${e} q-date--${e}-${t.minimal===!0?"minimal":"standard"}`+(Q.value===!0?" q-date--dark q-dark":"")+(t.bordered===!0?" q-date--bordered":"")+(t.square===!0?" q-date--square no-border-radius":"")+(t.flat===!0?" q-date--flat no-shadow":"")+(t.disable===!0?" disabled":t.readonly===!0?" q-date--readonly":"")}),z=d(()=>t.color||"primary"),U=d(()=>t.textColor||"white"),P=d(()=>t.emitImmediately===!0&&t.multiple!==!0&&t.range!==!0),X=d(()=>Array.isArray(t.modelValue)===!0?t.modelValue:t.modelValue!==null&&t.modelValue!==void 0?[t.modelValue]:[]),I=d(()=>X.value.filter(e=>typeof e=="string").map(e=>Oe(e,D.value,C.value)).filter(e=>e.dateHash!==null&&e.day!==null&&e.month!==null&&e.year!==null)),W=d(()=>{const e=a=>Oe(a,D.value,C.value);return X.value.filter(a=>pt(a)===!0&&a.from!==void 0&&a.to!==void 0).map(a=>({from:e(a.from),to:e(a.to)})).filter(a=>a.from.dateHash!==null&&a.to.dateHash!==null&&a.from.dateHash<a.to.dateHash)}),ye=d(()=>t.calendar!=="persian"?e=>new Date(e.year,e.month-1,e.day):e=>{const a=dt(e.year,e.month,e.day);return new Date(a.gy,a.gm-1,a.gd)}),He=d(()=>t.calendar==="persian"?ee:(e,a,n)=>kt(new Date(e.year,e.month-1,e.day,e.hour,e.minute,e.second,e.millisecond),a===void 0?D.value:a,n===void 0?C.value:n,e.year,e.timezoneOffset)),ue=d(()=>I.value.length+W.value.reduce((e,a)=>e+1+Ot(ye.value(a.to),ye.value(a.from)),0)),ce=d(()=>{if(t.title!==void 0&&t.title!==null&&t.title.length!==0)return t.title;if($.value!==null){const n=$.value.init,s=ye.value(n);return C.value.daysShort[s.getDay()]+", "+C.value.monthsShort[n.month-1]+" "+n.day+Ce+"?"}if(ue.value===0)return Ce;if(ue.value>1)return`${ue.value} ${C.value.pluralDay}`;const e=I.value[0],a=ye.value(e);return isNaN(a.valueOf())===!0?Ce:C.value.headerTitle!==void 0?C.value.headerTitle(a,e):C.value.daysShort[a.getDay()]+", "+C.value.monthsShort[e.month-1]+" "+e.day}),$e=d(()=>I.value.concat(W.value.map(a=>a.from)).sort((a,n)=>a.year-n.year||a.month-n.month)[0]),Ve=d(()=>I.value.concat(W.value.map(a=>a.to)).sort((a,n)=>n.year-a.year||n.month-a.month)[0]),Pe=d(()=>{if(t.subtitle!==void 0&&t.subtitle!==null&&t.subtitle.length!==0)return t.subtitle;if(ue.value===0)return Ce;if(ue.value>1){const e=$e.value,a=Ve.value,n=C.value.monthsShort;return n[e.month-1]+(e.year!==a.year?" "+e.year+Ce+n[a.month-1]+" ":e.month!==a.month?Ce+n[a.month-1]:"")+" "+a.year}return I.value[0].year}),ge=d(()=>{const e=[b.iconSet.datetime.arrowLeft,b.iconSet.datetime.arrowRight];return b.lang.rtl===!0?e.reverse():e}),_e=d(()=>t.firstDayOfWeek!==void 0?Number(t.firstDayOfWeek):C.value.firstDayOfWeek),Se=d(()=>{const e=C.value.daysShort,a=_e.value;return a>0?e.slice(a,7).concat(e.slice(0,a)):e}),G=d(()=>{const e=u.value;return t.calendar!=="persian"?new Date(e.year,e.month,0).getDate():tt(e.year,e.month)}),Ee=d(()=>typeof t.eventColor=="function"?t.eventColor:()=>t.eventColor),T=d(()=>{if(t.navigationMinYearMonth===void 0)return null;const e=t.navigationMinYearMonth.split("/");return{year:parseInt(e[0],10),month:parseInt(e[1],10)}}),A=d(()=>{if(t.navigationMaxYearMonth===void 0)return null;const e=t.navigationMaxYearMonth.split("/");return{year:parseInt(e[0],10),month:parseInt(e[1],10)}}),Ye=d(()=>{const e={month:{prev:!0,next:!0},year:{prev:!0,next:!0}};return T.value!==null&&T.value.year>=u.value.year&&(e.year.prev=!1,T.value.year===u.value.year&&T.value.month>=u.value.month&&(e.month.prev=!1)),A.value!==null&&A.value.year<=u.value.year&&(e.year.next=!1,A.value.year===u.value.year&&A.value.month<=u.value.month&&(e.month.next=!1)),e}),be=d(()=>{const e={};return I.value.forEach(a=>{const n=oe(a);e[n]===void 0&&(e[n]=[]),e[n].push(a.day)}),e}),Ne=d(()=>{const e={};return W.value.forEach(a=>{const n=oe(a.from),s=oe(a.to);if(e[n]===void 0&&(e[n]=[]),e[n].push({from:a.from.day,to:n===s?a.to.day:void 0,range:a}),n<s){let i;const{year:k,month:c}=a.from,m=c<12?{year:k,month:c+1}:{year:k+1,month:1};for(;(i=oe(m))<=s;)e[i]===void 0&&(e[i]=[]),e[i].push({from:void 0,to:i===s?a.to.day:void 0,range:a}),m.month++,m.month>12&&(m.year++,m.month=1)}}),e}),de=d(()=>{if($.value===null)return;const{init:e,initHash:a,final:n,finalHash:s}=$.value,[i,k]=a<=s?[e,n]:[n,e],c=oe(i),m=oe(k);if(c!==E.value&&m!==E.value)return;const H={};return c===E.value?(H.from=i.day,H.includeFrom=!0):H.from=1,m===E.value?(H.to=k.day,H.includeTo=!0):H.to=G.value,H}),E=d(()=>oe(u.value)),Je=d(()=>{const e={};if(t.options===void 0){for(let n=1;n<=G.value;n++)e[n]=!0;return e}const a=typeof t.options=="function"?t.options:n=>t.options.includes(n);for(let n=1;n<=G.value;n++){const s=E.value+"/"+L(n);e[n]=a(s)}return e}),Ge=d(()=>{const e={};if(t.events===void 0)for(let a=1;a<=G.value;a++)e[a]=!1;else{const a=typeof t.events=="function"?t.events:n=>t.events.includes(n);for(let n=1;n<=G.value;n++){const s=E.value+"/"+L(n);e[n]=a(s)===!0&&Ee.value(s)}}return e}),ke=d(()=>{let e,a;const{year:n,month:s}=u.value;if(t.calendar!=="persian")e=new Date(n,s-1,1),a=new Date(n,s-1,0).getDate();else{const i=dt(n,s,1);e=new Date(i.gy,i.gm-1,i.gd);let k=s-1,c=n;k===0&&(k=12,c--),a=tt(c,k)}return{days:e.getDay()-_e.value-1,endDay:a}}),ve=d(()=>{const e=[],{days:a,endDay:n}=ke.value,s=a<0?a+7:a;if(s<6)for(let c=n-s;c<=n;c++)e.push({i:c,fill:!0});const i=e.length;for(let c=1;c<=G.value;c++){const m={i:c,event:Ge.value[c],classes:[]};Je.value[c]===!0&&(m.in=!0,m.flat=!0),e.push(m)}if(be.value[E.value]!==void 0&&be.value[E.value].forEach(c=>{const m=i+c-1;Object.assign(e[m],{selected:!0,unelevated:!0,flat:!1,color:z.value,textColor:U.value})}),Ne.value[E.value]!==void 0&&Ne.value[E.value].forEach(c=>{if(c.from!==void 0){const m=i+c.from-1,H=i+(c.to||G.value)-1;for(let Te=m;Te<=H;Te++)Object.assign(e[Te],{range:c.range,unelevated:!0,color:z.value,textColor:U.value});Object.assign(e[m],{rangeFrom:!0,flat:!1}),c.to!==void 0&&Object.assign(e[H],{rangeTo:!0,flat:!1})}else if(c.to!==void 0){const m=i+c.to-1;for(let H=i;H<=m;H++)Object.assign(e[H],{range:c.range,unelevated:!0,color:z.value,textColor:U.value});Object.assign(e[m],{flat:!1,rangeTo:!0})}else{const m=i+G.value-1;for(let H=i;H<=m;H++)Object.assign(e[H],{range:c.range,unelevated:!0,color:z.value,textColor:U.value})}}),de.value!==void 0){const c=i+de.value.from-1,m=i+de.value.to-1;for(let H=c;H<=m;H++)e[H].color=z.value,e[H].editRange=!0;de.value.includeFrom===!0&&(e[c].editRangeFrom=!0),de.value.includeTo===!0&&(e[m].editRangeTo=!0)}u.value.year===f.value.year&&u.value.month===f.value.month&&(e[i+f.value.day-1].today=!0);const k=e.length%7;if(k>0){const c=7-k;for(let m=1;m<=c;m++)e.push({i:m,fill:!0})}return e.forEach(c=>{let m="q-date__calendar-item ";c.fill===!0?m+="q-date__calendar-item--fill":(m+=`q-date__calendar-item--${c.in===!0?"in":"out"}`,c.range!==void 0&&(m+=` q-date__range${c.rangeTo===!0?"-to":c.rangeFrom===!0?"-from":""}`),c.editRange===!0&&(m+=` q-date__edit-range${c.editRangeFrom===!0?"-from":""}${c.editRangeTo===!0?"-to":""}`),(c.range!==void 0||c.editRange===!0)&&(m+=` text-${c.color}`)),c.classes=m}),e}),we=d(()=>t.disable===!0?{"aria-disabled":"true"}:t.readonly===!0?{"aria-readonly":"true"}:{});ie(()=>t.modelValue,e=>{if(R===e)R=0;else{const a=l(D.value,C.value);N(a.year,a.month,a)}}),ie(w,()=>{ne.value!==null&&V.$el.contains(document.activeElement)===!0&&ne.value.focus()}),ie(()=>u.value.year+"|"+u.value.month,()=>{_("navigation",{year:u.value.year,month:u.value.month})}),ie(Be,e=>{ct(e,C.value,"mask"),D.value=e}),ie(he,e=>{ct(D.value,e,"locale"),C.value=e});function Ke(){const e=f.value,a=be.value[oe(e)];(a===void 0||a.includes(e.day)===!1)&&Xe(e),Z(e.year,e.month)}function Le(e){ft(e)===!0&&(w.value=e)}function Qe(e,a){["month","year"].includes(e)&&(e==="month"?v:h)(a===!0?-1:1)}function Z(e,a){w.value="Calendar",N(e,a)}function pe(e,a){if(t.range===!1||!e){$.value=null;return}const n=Object.assign({...u.value},e),s=a!==void 0?Object.assign({...u.value},a):n;$.value={init:n,initHash:ee(n),final:s,finalHash:ee(s)},Z(n.year,n.month)}function Re(){return t.calendar==="persian"?"YYYY/MM/DD":t.mask}function Oe(e,a,n){return Ae(e,a,n,t.calendar,{hour:0,minute:0,second:0,millisecond:0})}function l(e,a){const n=Array.isArray(t.modelValue)===!0?t.modelValue:t.modelValue?[t.modelValue]:[];if(n.length===0)return o();const s=n[n.length-1],i=Oe(s.from!==void 0?s.from:s,e,a);return i.dateHash===null?o():i}function o(){let e,a;if(t.defaultYearMonth!==void 0){const n=t.defaultYearMonth.split("/");e=parseInt(n[0],10),a=parseInt(n[1],10)}else{const n=f.value!==void 0?f.value:O();e=n.year,a=n.month}return{year:e,month:a,day:1,hour:0,minute:0,second:0,millisecond:0,dateHash:e+"/"+L(a)+"/01"}}function v(e){let a=u.value.year,n=Number(u.value.month)+e;n===13?(n=1,a++):n===0&&(n=12,a--),N(a,n),P.value===!0&&qe("month")}function h(e){const a=Number(u.value.year)+e;N(a,u.value.month),P.value===!0&&qe("year")}function Y(e){N(e,u.value.month),w.value=t.defaultView==="Years"?"Months":"Calendar",P.value===!0&&qe("year")}function K(e){N(u.value.year,e),w.value="Calendar",P.value===!0&&qe("month")}function y(e,a){const n=be.value[a];(n!==void 0&&n.includes(e.day)===!0?Ze:Xe)(e)}function p(e){return{year:e.year,month:e.month,day:e.day}}function N(e,a,n){if(T.value!==null&&e<=T.value.year&&(e=T.value.year,a<T.value.month&&(a=T.value.month)),A.value!==null&&e>=A.value.year&&(e=A.value.year,a>A.value.month&&(a=A.value.month)),n!==void 0){const{hour:i,minute:k,second:c,millisecond:m,timezoneOffset:H,timeHash:Te}=n;Object.assign(u.value,{hour:i,minute:k,second:c,millisecond:m,timezoneOffset:H,timeHash:Te})}const s=e+"/"+L(a)+"/01";s!==u.value.dateHash&&(le.value=u.value.dateHash<s==(b.lang.rtl!==!0)?"left":"right",e!==u.value.year&&(F.value=le.value),ut(()=>{re.value=e-e%me-(e<0?me:0),Object.assign(u.value,{year:e,month:a,day:1,dateHash:s})}))}function ze(e,a,n){const s=e!==null&&e.length===1&&t.multiple===!1?e[0]:e;R=s;const{reason:i,details:k}=st(a,n);_("update:modelValue",s,i,k)}function qe(e){const a=I.value[0]!==void 0&&I.value[0].dateHash!==null?{...I.value[0]}:{...u.value};ut(()=>{a.year=u.value.year,a.month=u.value.month;const n=t.calendar!=="persian"?new Date(a.year,a.month,0).getDate():tt(a.year,a.month);a.day=Math.min(Math.max(1,a.day),n);const s=De(a);R=s;const{details:i}=st("",a);_("update:modelValue",s,e,i)})}function st(e,a){return a.from!==void 0?{reason:`${e}-range`,details:{...p(a.target),from:p(a.from),to:p(a.to)}}:{reason:`${e}-day`,details:p(a)}}function De(e,a,n){return e.from!==void 0?{from:He.value(e.from,a,n),to:He.value(e.to,a,n)}:He.value(e,a,n)}function Xe(e){let a;if(t.multiple===!0)if(e.from!==void 0){const n=ee(e.from),s=ee(e.to),i=I.value.filter(c=>c.dateHash<n||c.dateHash>s),k=W.value.filter(({from:c,to:m})=>m.dateHash<n||c.dateHash>s);a=i.concat(k).concat(e).map(c=>De(c))}else{const n=X.value.slice();n.push(De(e)),a=n}else a=De(e);ze(a,"add",e)}function Ze(e){if(t.noUnset===!0)return;let a=null;if(t.multiple===!0&&Array.isArray(t.modelValue)===!0){const n=De(e);e.from!==void 0?a=t.modelValue.filter(s=>s.from!==void 0?s.from!==n.from&&s.to!==n.to:!0):a=t.modelValue.filter(s=>s!==n),a.length===0&&(a=null)}ze(a,"remove",e)}function ct(e,a,n){const s=I.value.concat(W.value).map(i=>De(i,e,a)).filter(i=>i.from!==void 0?i.from.dateHash!==null&&i.to.dateHash!==null:i.dateHash!==null);_("update:modelValue",(t.multiple===!0?s:s[0])||null,n)}function xt(){if(t.minimal!==!0)return r("div",{class:"q-date__header "+S.value},[r("div",{class:"relative-position"},[r(Me,{name:"q-transition--fade"},()=>r("div",{key:"h-yr-"+Pe.value,class:"q-date__header-subtitle q-date__header-link "+(w.value==="Years"?"q-date__header-link--active":"cursor-pointer"),tabindex:q.value,...M("vY",{onClick(){w.value="Years"},onKeyup(e){e.keyCode===13&&(w.value="Years")}})},[Pe.value]))]),r("div",{class:"q-date__header-title relative-position flex no-wrap"},[r("div",{class:"relative-position col"},[r(Me,{name:"q-transition--fade"},()=>r("div",{key:"h-sub"+ce.value,class:"q-date__header-title-label q-date__header-link "+(w.value==="Calendar"?"q-date__header-link--active":"cursor-pointer"),tabindex:q.value,...M("vC",{onClick(){w.value="Calendar"},onKeyup(e){e.keyCode===13&&(w.value="Calendar")}})},[ce.value]))]),t.todayBtn===!0?r(B,{class:"q-date__header-today self-start",icon:b.iconSet.datetime.today,flat:!0,size:"sm",round:!0,tabindex:q.value,onClick:Ke}):null])])}function et({label:e,type:a,key:n,dir:s,goTo:i,boundaries:k,cls:c}){return[r("div",{class:"row items-center q-date__arrow"},[r(B,{round:!0,dense:!0,size:"sm",flat:!0,icon:ge.value[0],tabindex:q.value,disable:k.prev===!1,...M("go-#"+a,{onClick(){i(-1)}})})]),r("div",{class:"relative-position overflow-hidden flex flex-center"+c},[r(Me,{name:"q-transition--jump-"+s},()=>r("div",{key:n},[r(B,{flat:!0,dense:!0,noCaps:!0,label:e,tabindex:q.value,...M("view#"+a,{onClick:()=>{w.value=a}})})]))]),r("div",{class:"row items-center q-date__arrow"},[r(B,{round:!0,dense:!0,size:"sm",flat:!0,icon:ge.value[1],tabindex:q.value,disable:k.next===!1,...M("go+#"+a,{onClick(){i(1)}})})])]}const Ht={Calendar:()=>[r("div",{key:"calendar-view",class:"q-date__view q-date__calendar"},[r("div",{class:"q-date__navigation row items-center no-wrap"},et({label:C.value.months[u.value.month-1],type:"Months",key:u.value.month,dir:le.value,goTo:v,boundaries:Ye.value.month,cls:" col"}).concat(et({label:u.value.year,type:"Years",key:u.value.year,dir:F.value,goTo:h,boundaries:Ye.value.year,cls:""}))),r("div",{class:"q-date__calendar-weekdays row items-center no-wrap"},Se.value.map(e=>r("div",{class:"q-date__calendar-item"},[r("div",e)]))),r("div",{class:"q-date__calendar-days-container relative-position overflow-hidden"},[r(Me,{name:"q-transition--slide-"+le.value},()=>r("div",{key:E.value,class:"q-date__calendar-days fit"},ve.value.map(e=>r("div",{class:e.classes},[e.in===!0?r(B,{class:e.today===!0?"q-date__today":"",dense:!0,flat:e.flat,unelevated:e.unelevated,color:e.color,textColor:e.textColor,label:e.i,tabindex:q.value,...M("day#"+e.i,{onClick:()=>{Vt(e.i)},onMouseover:()=>{St(e.i)}})},e.event!==!1?()=>r("div",{class:"q-date__event bg-"+e.event}):null):r("div",""+e.i)]))))])])],Months(){const e=u.value.year===f.value.year,a=s=>T.value!==null&&u.value.year===T.value.year&&T.value.month>s||A.value!==null&&u.value.year===A.value.year&&A.value.month<s,n=C.value.monthsShort.map((s,i)=>{const k=u.value.month===i+1;return r("div",{class:"q-date__months-item flex flex-center"},[r(B,{class:e===!0&&f.value.month===i+1?"q-date__today":null,flat:k!==!0,label:s,unelevated:k,color:k===!0?z.value:null,textColor:k===!0?U.value:null,tabindex:q.value,disable:a(i+1),...M("month#"+i,{onClick:()=>{K(i+1)}})})])});return t.yearsInMonthView===!0&&n.unshift(r("div",{class:"row no-wrap full-width"},[et({label:u.value.year,type:"Years",key:u.value.year,dir:F.value,goTo:h,boundaries:Ye.value.year,cls:" col"})])),r("div",{key:"months-view",class:"q-date__view q-date__months flex flex-center"},n)},Years(){const e=re.value,a=e+me,n=[],s=i=>T.value!==null&&T.value.year>i||A.value!==null&&A.value.year<i;for(let i=e;i<=a;i++){const k=u.value.year===i;n.push(r("div",{class:"q-date__years-item flex flex-center"},[r(B,{key:"yr"+i,class:f.value.year===i?"q-date__today":null,flat:!k,label:i,dense:!0,unelevated:k,color:k===!0?z.value:null,textColor:k===!0?U.value:null,tabindex:q.value,disable:s(i),...M("yr#"+i,{onClick:()=>{Y(i)}})})]))}return r("div",{class:"q-date__view q-date__years flex flex-center"},[r("div",{class:"col-auto"},[r(B,{round:!0,dense:!0,flat:!0,icon:ge.value[0],tabindex:q.value,disable:s(e),...M("y-",{onClick:()=>{re.value-=me}})})]),r("div",{class:"q-date__years-content col self-stretch row items-center"},n),r("div",{class:"col-auto"},[r(B,{round:!0,dense:!0,flat:!0,icon:ge.value[1],tabindex:q.value,disable:s(a),...M("y+",{onClick:()=>{re.value+=me}})})])])}};function Vt(e){const a={...u.value,day:e};if(t.range===!1){y(a,E.value);return}if($.value===null){const n=ve.value.find(i=>i.fill!==!0&&i.i===e);if(t.noUnset!==!0&&n.range!==void 0){Ze({target:a,from:n.range.from,to:n.range.to});return}if(n.selected===!0){Ze(a);return}const s=ee(a);$.value={init:a,initHash:s,final:a,finalHash:s},_("rangeStart",p(a))}else{const n=$.value.initHash,s=ee(a),i=n<=s?{from:$.value.init,to:a}:{from:a,to:$.value.init};$.value=null,Xe(n===s?a:{target:a,...i}),_("rangeEnd",{from:p(i.from),to:p(i.to)})}}function St(e){if($.value!==null){const a={...u.value,day:e};Object.assign($.value,{final:a,finalHash:ee(a)})}}return Object.assign(V,{setToday:Ke,setView:Le,offsetCalendar:Qe,setCalendarTo:Z,setEditingRange:pe}),()=>{const e=[r("div",{class:"q-date__content col relative-position"},[r(Me,{name:"q-transition--fade"},Ht[w.value])])],a=wt(g.default);return a!==void 0&&e.push(r("div",{class:"q-date__actions"},a)),t.name!==void 0&&t.disable!==!0&&ae(e,"push"),r("div",{class:se.value,...we.value},[xt(),r("div",{ref:ne,class:"q-date__main col column",tabindex:-1},e)])}}}),mt=it({name:"QPopupProxy",props:{...Ut,breakpoint:{type:[String,Number],default:450}},emits:["show","hide"],setup(t,{slots:g,emit:_,attrs:V}){const{proxy:b}=rt(),{$q:Q}=b,M=j(!1),q=j(null),S=d(()=>parseInt(t.breakpoint,10)),{canShow:x}=Wt({showing:M});function O(){return Q.screen.width<S.value||Q.screen.height<S.value?"dialog":"menu"}const R=j(O()),te=d(()=>R.value==="menu"?{maxHeight:"99vh"}:{});ie(()=>O(),D=>{M.value!==!0&&(R.value=D)});function ae(D){M.value=!0,_("show",D)}function ne(D){M.value=!1,R.value=O(),_("hide",D)}return Object.assign(b,{show(D){x(D)===!0&&q.value.show(D)},hide(D){q.value.hide(D)},toggle(D){q.value.toggle(D)}}),Tt(b,"currentComponent",()=>({type:R.value,ref:q.value})),()=>{const D={ref:q,...te.value,...V,onShow:ae,onHide:ne};let C;return R.value==="dialog"?C=jt:(C=Jt,Object.assign(D,{target:t.target,contextMenu:t.contextMenu,noParentEvent:!0,separateClosePopup:!0})),r(C,D,g.default)}}});function na(t,g){if(t.hour!==null){if(t.minute===null)return"minute";if(g===!0&&t.second===null)return"second"}return"hour"}function la(){const t=new Date;return{hour:t.getHours(),minute:t.getMinutes(),second:t.getSeconds(),millisecond:t.getMilliseconds()}}const ua=it({name:"QTime",props:{...gt,...yt,...Dt,mask:{default:null},format24h:{type:Boolean,default:null},defaultDate:{type:String,validator:t=>/^-?[\d]+\/[0-1]\d\/[0-3]\d$/.test(t)},options:Function,hourOptions:Array,minuteOptions:Array,secondOptions:Array,withSeconds:Boolean,nowBtn:Boolean},emits:Ct,setup(t,{slots:g,emit:_}){const V=rt(),{$q:b}=V.proxy,Q=_t(t,b),{tabindex:M,headerClass:q,getLocale:S,getCurrentDate:x}=Mt(t,b),O=bt(t),R=qt(O);let te,ae;const ne=j(null),D=d(()=>Pe()),C=d(()=>S()),Be=d(()=>ge()),he=Ae(t.modelValue,D.value,C.value,t.calendar,Be.value),f=j(na(he)),u=j(he),w=j(he.hour===null||he.hour<12),Fe=d(()=>`q-time q-time--${t.landscape===!0?"landscape":"portrait"}`+(Q.value===!0?" q-time--dark q-dark":"")+(t.disable===!0?" disabled":t.readonly===!0?" q-time--readonly":"")+(t.bordered===!0?" q-time--bordered":"")+(t.square===!0?" q-time--square no-border-radius":"")+(t.flat===!0?" q-time--flat no-shadow":"")),le=d(()=>{const l=u.value;return{hour:l.hour===null?"--":F.value===!0?L(l.hour):String(w.value===!0?l.hour===0?12:l.hour:l.hour>12?l.hour-12:l.hour),minute:l.minute===null?"--":L(l.minute),second:l.second===null?"--":L(l.second)}}),F=d(()=>t.format24h!==null?t.format24h:b.lang.date.format24h),xe=d(()=>{const l=f.value==="hour",o=l===!0?12:60,v=u.value[f.value];let Y=`rotate(${Math.round(v*(360/o))-180}deg) translateX(-50%)`;return l===!0&&F.value===!0&&u.value.hour>=12&&(Y+=" scale(.7)"),{transform:Y}}),re=d(()=>u.value.hour!==null),$=d(()=>re.value===!0&&u.value.minute!==null),se=d(()=>t.hourOptions!==void 0?l=>t.hourOptions.includes(l):t.options!==void 0?l=>t.options(l,null,null):null),z=d(()=>t.minuteOptions!==void 0?l=>t.minuteOptions.includes(l):t.options!==void 0?l=>t.options(u.value.hour,l,null):null),U=d(()=>t.secondOptions!==void 0?l=>t.secondOptions.includes(l):t.options!==void 0?l=>t.options(u.value.hour,u.value.minute,l):null),P=d(()=>{if(se.value===null)return null;const l=ce(0,11,se.value),o=ce(12,11,se.value);return{am:l,pm:o,values:l.values.concat(o.values)}}),X=d(()=>z.value!==null?ce(0,59,z.value):null),I=d(()=>U.value!==null?ce(0,59,U.value):null),W=d(()=>{switch(f.value){case"hour":return P.value;case"minute":return X.value;case"second":return I.value}}),ye=d(()=>{let l,o,v=0,h=1;const Y=W.value!==null?W.value.values:void 0;f.value==="hour"?F.value===!0?(l=0,o=23):(l=0,o=11,w.value===!1&&(v=12)):(l=0,o=55,h=5);const K=[];for(let y=l,p=l;y<=o;y+=h,p++){const N=y+v,ze=Y!==void 0&&Y.includes(N)===!1,qe=f.value==="hour"&&y===0?F.value===!0?"00":"12":y;K.push({val:N,index:p,disable:ze,label:qe})}return K}),He=d(()=>[[Gt,G,void 0,{stop:!0,prevent:!0,mouse:!0}]]);ie(()=>t.modelValue,l=>{const o=Ae(l,D.value,C.value,t.calendar,Be.value);(o.dateHash!==u.value.dateHash||o.timeHash!==u.value.timeHash)&&(u.value=o,o.hour===null?f.value="hour":w.value=o.hour<12)}),ie([D,C],()=>{ut(()=>{pe()})});function ue(){const l={...x(),...la()};pe(l),Object.assign(u.value,l),f.value="hour"}function ce(l,o,v){const h=Array.apply(null,{length:o+1}).map((Y,K)=>{const y=K+l;return{index:y,val:v(y)===!0}}).filter(Y=>Y.val===!0).map(Y=>Y.index);return{min:h[0],max:h[h.length-1],values:h,threshold:o+1}}function $e(l,o,v){const h=Math.abs(l-o);return Math.min(h,v-h)}function Ve(l,{min:o,max:v,values:h,threshold:Y}){if(l===o)return o;if(l<o||l>v)return $e(l,o,Y)<=$e(l,v,Y)?o:v;const K=h.findIndex(N=>l<=N),y=h[K-1],p=h[K];return l-y<=p-l?y:p}function Pe(){return t.calendar!=="persian"&&t.mask!==null?t.mask:`HH:mm${t.withSeconds===!0?":ss":""}`}function ge(){if(typeof t.defaultDate!="string"){const l=x(!0);return l.dateHash=ee(l),l}return Ae(t.defaultDate,"YYYY/MM/DD",void 0,t.calendar)}function _e(){return It(V)===!0||W.value!==null&&(W.value.values.length===0||f.value==="hour"&&F.value!==!0&&P.value[w.value===!0?"am":"pm"].values.length===0)}function Se(){const l=ne.value,{top:o,left:v,width:h}=l.getBoundingClientRect(),Y=h/2;return{top:o+Y,left:v+Y,dist:Y*.7}}function G(l){if(_e()!==!0){if(l.isFirst===!0){te=Se(),ae=T(l.evt,te);return}ae=T(l.evt,te,ae),l.isFinal===!0&&(te=!1,ae=null,Ee())}}function Ee(){f.value==="hour"?f.value="minute":t.withSeconds&&f.value==="minute"&&(f.value="second")}function T(l,o,v){const h=At(l),Y=Math.abs(h.top-o.top),K=Math.sqrt(Math.pow(Math.abs(h.top-o.top),2)+Math.pow(Math.abs(h.left-o.left),2));let y,p=Math.asin(Y/K)*(180/Math.PI);if(h.top<o.top?p=o.left<h.left?90-p:270+p:p=o.left<h.left?p+90:270-p,f.value==="hour"){if(y=p/30,P.value!==null){const N=F.value!==!0?w.value===!0:P.value.am.values.length!==0&&P.value.pm.values.length!==0?K>=o.dist:P.value.am.values.length!==0;y=Ve(y+(N===!0?0:12),P.value[N===!0?"am":"pm"])}else y=Math.round(y),F.value===!0?K<o.dist?y<12&&(y+=12):y===12&&(y=0):w.value===!0&&y===12?y=0:w.value===!1&&y!==12&&(y+=12);F.value===!0&&(w.value=y<12)}else y=Math.round(p/6)%60,f.value==="minute"&&X.value!==null?y=Ve(y,X.value):f.value==="second"&&I.value!==null&&(y=Ve(y,I.value));return v!==y&&Ke[f.value](y),y}const A={hour(){f.value="hour"},minute(){f.value="minute"},second(){f.value="second"}};function Ye(l){l.keyCode===13&&Le()}function be(l){l.keyCode===13&&Qe()}function Ne(l){_e()!==!0&&(b.platform.is.desktop!==!0&&T(l,Se()),Ee())}function de(l){_e()!==!0&&T(l,Se())}function E(l){if(l.keyCode===13)f.value="hour";else if([37,39].includes(l.keyCode)){const o=l.keyCode===37?-1:1;if(P.value!==null){const v=F.value===!0?P.value.values:P.value[w.value===!0?"am":"pm"].values;if(v.length===0)return;if(u.value.hour===null)ke(v[0]);else{const h=(v.length+v.indexOf(u.value.hour)+o)%v.length;ke(v[h])}}else{const v=F.value===!0?24:12,h=F.value!==!0&&w.value===!1?12:0,Y=u.value.hour===null?-o:u.value.hour;ke(h+(24+Y+o)%v)}}}function Je(l){if(l.keyCode===13)f.value="minute";else if([37,39].includes(l.keyCode)){const o=l.keyCode===37?-1:1;if(X.value!==null){const v=X.value.values;if(v.length===0)return;if(u.value.minute===null)ve(v[0]);else{const h=(v.length+v.indexOf(u.value.minute)+o)%v.length;ve(v[h])}}else{const v=u.value.minute===null?-o:u.value.minute;ve((60+v+o)%60)}}}function Ge(l){if(l.keyCode===13)f.value="second";else if([37,39].includes(l.keyCode)){const o=l.keyCode===37?-1:1;if(I.value!==null){const v=I.value.values;if(v.length===0)return;if(u.value.seconds===null)we(v[0]);else{const h=(v.length+v.indexOf(u.value.second)+o)%v.length;we(v[h])}}else{const v=u.value.second===null?-o:u.value.second;we((60+v+o)%60)}}}function ke(l){u.value.hour!==l&&(u.value.hour=l,Z())}function ve(l){u.value.minute!==l&&(u.value.minute=l,Z())}function we(l){u.value.second!==l&&(u.value.second=l,Z())}const Ke={hour:ke,minute:ve,second:we};function Le(){w.value===!1&&(w.value=!0,u.value.hour!==null&&(u.value.hour-=12,Z()))}function Qe(){w.value===!0&&(w.value=!1,u.value.hour!==null&&(u.value.hour+=12,Z()))}function Z(){if(se.value!==null&&se.value(u.value.hour)!==!0){u.value=Ae(),f.value="hour";return}if(z.value!==null&&z.value(u.value.minute)!==!0){u.value.minute=null,u.value.second=null,f.value="minute";return}if(t.withSeconds===!0&&U.value!==null&&U.value(u.value.second)!==!0){u.value.second=null,f.value="second";return}u.value.hour===null||u.value.minute===null||t.withSeconds===!0&&u.value.second===null||pe()}function pe(l){const o=Object.assign({...u.value},l),v=t.calendar==="persian"?L(o.hour)+":"+L(o.minute)+(t.withSeconds===!0?":"+L(o.second):""):kt(new Date(o.year,o.month===null?null:o.month-1,o.day,o.hour,o.minute,o.second,o.millisecond),D.value,C.value,o.year,o.timezoneOffset);o.changed=v!==t.modelValue,_("update:modelValue",v,o)}function Re(){const l=[r("div",{class:"q-time__link "+(f.value==="hour"?"q-time__link--active":"cursor-pointer"),tabindex:M.value,onClick:A.hour,onKeyup:E},le.value.hour),r("div",":"),r("div",re.value===!0?{class:"q-time__link "+(f.value==="minute"?"q-time__link--active":"cursor-pointer"),tabindex:M.value,onKeyup:Je,onClick:A.minute}:{class:"q-time__link"},le.value.minute)];t.withSeconds===!0&&l.push(r("div",":"),r("div",$.value===!0?{class:"q-time__link "+(f.value==="second"?"q-time__link--active":"cursor-pointer"),tabindex:M.value,onKeyup:Ge,onClick:A.second}:{class:"q-time__link"},le.value.second));const o=[r("div",{class:"q-time__header-label row items-center no-wrap",dir:"ltr"},l)];return F.value===!1&&o.push(r("div",{class:"q-time__header-ampm column items-between no-wrap"},[r("div",{class:"q-time__link "+(w.value===!0?"q-time__link--active":"cursor-pointer"),tabindex:M.value,onClick:Le,onKeyup:Ye},"AM"),r("div",{class:"q-time__link "+(w.value!==!0?"q-time__link--active":"cursor-pointer"),tabindex:M.value,onClick:Qe,onKeyup:be},"PM")])),r("div",{class:"q-time__header flex flex-center no-wrap "+q.value},o)}function Oe(){const l=u.value[f.value];return r("div",{class:"q-time__content col relative-position"},[r(Me,{name:"q-transition--scale"},()=>r("div",{key:"clock"+f.value,class:"q-time__container-parent absolute-full"},[r("div",{ref:ne,class:"q-time__container-child fit overflow-hidden"},[Ie(r("div",{class:"q-time__clock cursor-pointer non-selectable",onClick:Ne,onMousedown:de},[r("div",{class:"q-time__clock-circle fit"},[r("div",{class:"q-time__clock-pointer"+(u.value[f.value]===null?" hidden":t.color!==void 0?` text-${t.color}`:""),style:xe.value}),ye.value.map(o=>r("div",{class:`q-time__clock-position row flex-center q-time__clock-pos-${o.index}`+(o.val===l?" q-time__clock-position--active "+q.value:o.disable===!0?" q-time__clock-position--disable":"")},[r("span",o.label)]))])]),He.value)])])),t.nowBtn===!0?r(B,{class:"q-time__now-button absolute",icon:b.iconSet.datetime.now,unelevated:!0,size:"sm",round:!0,color:t.color,textColor:t.textColor,tabindex:M.value,onClick:ue}):null])}return V.proxy.setNow=ue,()=>{const l=[Oe()],o=wt(g.default);return o!==void 0&&l.push(r("div",{class:"q-time__actions"},o)),t.name!==void 0&&t.disable!==!0&&R(l,"push"),r("div",{class:Fe.value,tabindex:-1},[Re(),r("div",{class:"q-time__main col overflow-auto"},l)])}}});function ht(t){if(t===!1)return 0;if(t===!0||t===void 0)return 1;const g=parseInt(t,10);return isNaN(g)?0:g}const We=Bt({name:"close-popup",beforeMount(t,{value:g}){const _={depth:ht(g),handler(V){_.depth!==0&&setTimeout(()=>{const b=Ft(t);b!==void 0&&$t(b,V,_.depth)})},handlerKey(V){Pt(V,13)===!0&&_.handler(V)}};t.__qclosepopup=_,t.addEventListener("click",_.handler),t.addEventListener("keyup",_.handlerKey)},updated(t,{value:g,oldValue:_}){g!==_&&(t.__qclosepopup.depth=ht(g))},beforeUnmount(t){const g=t.__qclosepopup;t.removeEventListener("click",g.handler),t.removeEventListener("keyup",g.handlerKey),delete t.__qclosepopup}}),oa=ot("div",{class:"text-weight-bold text-body1"},"Created Date",-1),ia={key:0},ra={class:"row items-center justify-end q-gutter-sm"},sa={class:"row items-center justify-end q-gutter-sm"},ha=Et({__name:"FieldCreatedTimestamp",props:{inspecting:{type:Boolean}},setup(t){const g=Xt(),_=j(""),V=j(""),b=j("");Nt(()=>{const S=g.record.createdTimestamp??Date.now();V.value=je.formatDate(S,"ddd MMM DD YYYY"),b.value=je.formatDate(S,"HH:mm:00"),Q(S)});function Q(S=Date.now()){g.record.createdTimestamp=S,_.value=je.formatDate(S,"ddd, YYYY MMM Do, h:mm A")}function M(){V.value=V.value?V.value:je.formatDate(Date.now(),"ddd MMM DD YYYY"),b.value=b.value?b.value:je.formatDate(Date.now(),"HH:mm:00");const S=new Date(`${V.value} ${b.value}`).getTime();Q(S)}function q(S){return zt(S)||"-"}return(S,x)=>(at(),vt(Rt,null,[oa,S.inspecting?(at(),vt("div",ia,Kt(q(Ue(g).record.createdTimestamp)),1)):(at(),Lt(Qt,{key:1,modelValue:_.value,"onUpdate:modelValue":x[5]||(x[5]=O=>_.value=O),dense:"",outlined:"",disable:"",color:"primary",hint:"Auto formatted"},{after:fe(()=>[J(B,{icon:Ue(nt).CALENDAR_DATE,color:"primary",class:"q-px-sm"},{default:fe(()=>[J(mt,null,{default:fe(()=>[J(aa,{modelValue:V.value,"onUpdate:modelValue":x[1]||(x[1]=O=>V.value=O),mask:"ddd MMM DD YYYY"},{default:fe(()=>[ot("div",ra,[Ie(J(B,{label:"Cancel",flat:""},null,512),[[We]]),Ie(J(B,{label:"OK",color:"primary",flat:"",onClick:x[0]||(x[0]=O=>M())},null,512),[[We]])])]),_:1},8,["modelValue"])]),_:1})]),_:1},8,["icon"]),J(B,{icon:Ue(nt).CLOCK,color:"primary",class:"q-ml-sm q-px-sm"},{default:fe(()=>[J(mt,null,{default:fe(()=>[J(ua,{modelValue:b.value,"onUpdate:modelValue":x[3]||(x[3]=O=>b.value=O),mask:"HH:mm:00","now-btn":""},{default:fe(()=>[ot("div",sa,[Ie(J(B,{label:"Cancel",flat:""},null,512),[[We]]),Ie(J(B,{label:"OK",color:"primary",flat:"",onClick:x[2]||(x[2]=O=>M())},null,512),[[We]])])]),_:1},8,["modelValue"])]),_:1})]),_:1},8,["icon"]),J(B,{icon:Ue(nt).CALENDAR_CHECK,color:"positive",class:"q-ml-sm q-px-sm",onClick:x[4]||(x[4]=O=>Q())},null,8,["icon"])]),_:1},8,["modelValue"]))],64))}});export{ha as default};
