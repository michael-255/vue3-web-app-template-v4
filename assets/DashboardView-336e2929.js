import{u as i,r as E,i as te,w as ae,g as ne,o as oe,c as se,a as ie,d as re,b as le,A as ue,e as ce,D as W,T as fe,f as k,S as me,h as de,j as D,k as pe,l as m,m as s,n as w,Q as g,t as O,p as ve,q as F,s as _e,F as he,v as ye,I as _,x as N,y as we,z as be,B as G,C as R,E as V,G as q,H as ge}from"./index-5d245f77.js";import{Q,a as x}from"./QItem-6c91178d.js";import{Q as Ce}from"./QList-3c4dfd94.js";import{Q as $e}from"./QMenu-36ba3952.js";import{Q as Se}from"./QBadge-5d252316.js";import{_ as Oe}from"./ResponsivePage.vue_vue_type_script_setup_true_lang-723488f3.js";import{_ as xe}from"./WelcomeOverlay.vue_vue_type_script_setup_true_lang-3c1c7a6c.js";import{u as De}from"./useRoutables-128af855.js";import{u as Ee}from"./ui-20891d7f.js";import{u as Ie}from"./useDialogs-7677fd0b.js";import"./selection-280b5155.js";import"./useDefaults-86dabf4c.js";import"./SimpleDialog.vue_vue_type_script_setup_true_lang-9013e5dc.js";function U(e){return ne()?(oe(e),!0):!1}function j(e){return typeof e=="function"?e():i(e)}const L=typeof window<"u";function Te(e,t=1e3,n={}){const{immediate:o=!0,immediateCallback:u=!1}=n;let c=null;const f=E(!1);function p(){c&&(clearInterval(c),c=null)}function b(){f.value=!1,p()}function y(){const h=j(t);h<=0||(f.value=!0,u&&e(),p(),c=setInterval(e,h))}if(o&&L&&y(),te(t)||typeof t=="function"){const h=ae(t,()=>{f.value&&L&&y()});U(h)}return U(b),{isActive:f,pause:b,resume:y}}const Ae=L?window:void 0;function ke(e,t={}){const{immediate:n=!0,window:o=Ae}=t,u=E(!1);let c=0,f=null;function p(h){if(!u.value||!o)return;const $=h-c;e({delta:$,timestamp:h}),c=h,f=o.requestAnimationFrame(p)}function b(){!u.value&&o&&(u.value=!0,f=o.requestAnimationFrame(p))}function y(){u.value=!1,f!=null&&o&&(o.cancelAnimationFrame(f),f=null)}return n&&b(),U(y),{isActive:ie(u),pause:y,resume:b}}var Fe=Object.defineProperty,K=Object.getOwnPropertySymbols,Pe=Object.prototype.hasOwnProperty,Ne=Object.prototype.propertyIsEnumerable,J=(e,t,n)=>t in e?Fe(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,Re=(e,t)=>{for(var n in t||(t={}))Pe.call(t,n)&&J(e,n,t[n]);if(K)for(var n of K(t))Ne.call(t,n)&&J(e,n,t[n]);return e};function Ve(e={}){const{controls:t=!1,interval:n="requestAnimationFrame"}=e,o=E(new Date),u=()=>o.value=new Date,c=n==="requestAnimationFrame"?ke(u,{immediate:!0}):Te(u,n,{immediate:!0});return t?Re({now:o},c):o}var qe=Object.defineProperty,P=Object.getOwnPropertySymbols,Y=Object.prototype.hasOwnProperty,Z=Object.prototype.propertyIsEnumerable,X=(e,t,n)=>t in e?qe(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,Qe=(e,t)=>{for(var n in t||(t={}))Y.call(t,n)&&X(e,n,t[n]);if(P)for(var n of P(t))Z.call(t,n)&&X(e,n,t[n]);return e},Ue=(e,t)=>{var n={};for(var o in e)Y.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(e!=null&&P)for(var o of P(e))t.indexOf(o)<0&&Z.call(e,o)&&(n[o]=e[o]);return n};const je=[{max:6e4,value:1e3,name:"second"},{max:276e4,value:6e4,name:"minute"},{max:72e6,value:36e5,name:"hour"},{max:5184e5,value:864e5,name:"day"},{max:24192e5,value:6048e5,name:"week"},{max:28512e6,value:2592e6,name:"month"},{max:1/0,value:31536e6,name:"year"}],Le={justNow:"just now",past:e=>e.match(/\d/)?`${e} ago`:e,future:e=>e.match(/\d/)?`in ${e}`:e,month:(e,t)=>e===1?t?"last month":"next month":`${e} month${e>1?"s":""}`,year:(e,t)=>e===1?t?"last year":"next year":`${e} year${e>1?"s":""}`,day:(e,t)=>e===1?t?"yesterday":"tomorrow":`${e} day${e>1?"s":""}`,week:(e,t)=>e===1?t?"last week":"next week":`${e} week${e>1?"s":""}`,hour:e=>`${e} hour${e>1?"s":""}`,minute:e=>`${e} minute${e>1?"s":""}`,second:e=>`${e} second${e>1?"s":""}`,invalid:""};function Be(e){return e.toISOString().slice(0,10)}function Me(e,t={}){const{controls:n=!1,updateInterval:o=3e4}=t,u=Ve({interval:o,controls:!0}),{now:c}=u,f=Ue(u,["now"]),p=se(()=>ze(new Date(j(e)),t,j(c.value)));return n?Qe({timeAgo:p},f):p}function ze(e,t={},n=Date.now()){var o;const{max:u,messages:c=Le,fullDateFormatter:f=Be,units:p=je,showSecond:b=!1,rounding:y="round"}=t,h=typeof y=="number"?d=>+d.toFixed(y):Math[y],$=+n-+e,S=Math.abs($);function I(d,v){return h(Math.abs(d)/v.value)}function T(d,v){const l=I(d,v),r=d>0,a=A(v.name,l,r);return A(r?"past":"future",a,r)}function A(d,v,l){const r=c[d];return typeof r=="function"?r(v,l):r.replace("{0}",v.toString())}if(S<6e4&&!b)return c.justNow;if(typeof u=="number"&&S>u)return f(new Date(e));if(typeof u=="string"){const d=(o=p.find(v=>v.name===u))==null?void 0:o.max;if(d&&S>d)return f(new Date(e))}for(const[d,v]of p.entries()){if(I($,v)<=0&&p[d-1])return T($,p[d-1]);if(S<v.max)return T($,v)}return c.invalid}const He={class:"q-mb-lg"},We=w("p",{class:"text-h6 q-mb-sm"},"What would you like to work on?",-1),Ge={class:"row items-center"},Ke={class:"text-h6"},Je={key:0},Xe={class:"absolute-top-right q-ma-xs"},Ye={class:"q-mb-md"},Ze={class:"text-caption q-ml-xs"},et={key:0},tt={class:"text-caption q-ml-xs"},at={class:"row justify-center q-my-md"},nt={class:"col-12 text-center"},ot={class:"col-12 text-grey text-center"},yt=re({__name:"DashboardView",setup(e){le({title:`${ue} - Dashboard`});const t=Ee(),{log:n}=ce(),{goToParentCreate:o,goToChildCreate:u,goToParentEdit:c,goToParentInspect:f,goToCharts:p}=De(),{confirmDialog:b,dismissDialog:y}=Ie(),h=E(!1),$=W.getParentTypeOptions(),S=E(Object.values(fe).reduce((l,r)=>(l[r]=[],l),{})),I=k.liveSettings().subscribe({next:l=>{var r;h.value=!!((r=l.find(a=>a.key===me.SHOW_DESCRIPTIONS))!=null&&r.value)},error:l=>{n.error("Error fetching live Settings",l)}}),T=k.liveDashboard().subscribe({next:l=>{S.value=l},error:l=>{n.error("Error fetching live Dashboard",l)}});de(()=>{I.unsubscribe(),T.unsubscribe()});async function A(l){y("Last Note",l,_.NOTE,"info")}async function d(l,r){b("Favorite",`Do you want to favorite ${r}?`,_.FAVORITE_ON,"info",async()=>{try{await k.Parents.update(l,{favorited:!0}),n.info(`${r} favorited`,{id:l,name:r})}catch(a){n.error("Favorite update failed",a)}})}async function v(l,r){b("Unfavorite",`Do you want to unfavorite ${r}?`,_.FAVORITE_OFF,"info",async()=>{try{await k.Parents.update(l,{favorited:!1}),n.info(`${r} unfavorited`,{id:l,name:r})}catch(a){n.error("Unfavorite update failed",a)}})}return(l,r)=>(D(),pe(Oe,{bannerIcon:i(_).DASHBOARD,bannerTitle:"Dashboard"},{default:m(()=>[s(xe),w("section",He,[We,s(ve,{color:"primary",options:i($),"model-value":i(t).dashboardSelection,"onUpdate:modelValue":r[0]||(r[0]=a=>i(t).dashboardSelection=a)},{label:m(a=>[w("div",Ge,[s(g,{name:a.icon,size:"xs",class:"q-mr-sm"},null,8,["name"]),w("span",null,O(a.label),1)])]),_:1},8,["options","model-value"])]),(D(!0),F(he,null,_e(S.value[i(t).dashboardSelection],(a,ee)=>(D(),F("div",{key:ee},[s(we,{class:"q-mb-md"},{default:m(()=>[s(be,null,{default:m(()=>{var B,M,z;return[w("p",Ke,O(a.name),1),h.value?(D(),F("p",Je,O(a.desc),1)):G("",!0),w("div",Xe,[R(s(g,{name:i(_).NOTE,color:"primary",size:"md",class:"cursor-pointer q-mr-xs",onClick:C=>{var H;return A(((H=a==null?void 0:a.lastChild)==null?void 0:H.note)||"")}},null,8,["name","onClick"]),[[V,(B=a==null?void 0:a.lastChild)==null?void 0:B.note]]),R(s(g,{name:i(_).FAVORITE_ON,color:"warning",size:"md",class:"cursor-pointer",onClick:C=>v(a.id,a.name)},null,8,["name","onClick"]),[[V,a.favorited]]),R(s(g,{name:i(_).FAVORITE_OFF,color:"grey",size:"md",class:"cursor-pointer",onClick:C=>d(a.id,a.name)},null,8,["name","onClick"]),[[V,!a.favorited]]),s(N,{round:"",flat:"",icon:i(_).MENU_VERTICAL},{default:m(()=>[s($e,{"auto-close":"",anchor:"top right","transition-show":"flip-right","transition-hide":"flip-left"},{default:m(()=>[s(Ce,null,{default:m(()=>[s(Q,{clickable:"",onClick:C=>i(p)(a.type,a.id)},{default:m(()=>[s(x,{avatar:""},{default:m(()=>[s(g,{color:"accent",name:i(_).CHARTS},null,8,["name"])]),_:1}),s(x,null,{default:m(()=>[q("Charts")]),_:1})]),_:2},1032,["onClick"]),s(Q,{clickable:"",onClick:C=>i(f)(a.type,a.id)},{default:m(()=>[s(x,{avatar:""},{default:m(()=>[s(g,{color:"primary",name:i(_).INSPECT},null,8,["name"])]),_:1}),s(x,null,{default:m(()=>[q("Inspect")]),_:1})]),_:2},1032,["onClick"]),s(Q,{clickable:"",onClick:C=>i(c)(a.type,a.id)},{default:m(()=>[s(x,{avatar:""},{default:m(()=>[s(g,{color:"warning",name:i(_).EDIT},null,8,["name"])]),_:1}),s(x,null,{default:m(()=>[q("Edit")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1024)]),_:2},1032,["icon"])]),w("div",Ye,[s(Se,{rounded:"",color:"secondary",class:"q-py-none"},{default:m(()=>{var C;return[s(g,{name:i(_).PREVIOUS},null,8,["name"]),w("span",Ze,O(i(Me)(((C=a==null?void 0:a.lastChild)==null?void 0:C.timestamp)||"").value||"No previous records"),1)]}),_:2},1024),(M=a==null?void 0:a.lastChild)!=null&&M.timestamp?(D(),F("div",et,[s(g,{name:i(_).CALENDAR_CHECK},null,8,["name"]),w("span",tt,O(i(ge)((z=a==null?void 0:a.lastChild)==null?void 0:z.timestamp)),1)])):G("",!0)]),s(N,{label:"Attach Record",color:"primary",icon:i(_).ADD_NOTE,onClick:C=>i(u)(a.type,a.id)},null,8,["icon","onClick"])]}),_:2},1024)]),_:2},1024)]))),128)),w("div",at,[w("div",nt,[s(g,{name:"menu_open",size:"80px",color:"grey"})]),w("p",ot,O(i(ye)(S.value[i(t).dashboardSelection])),1),s(N,{color:"positive",icon:i(_).CREATE,label:`Create ${i(W).getParentLabelSingular(i(t).dashboardSelection)}`,onClick:r[1]||(r[1]=a=>i(o)(i(t).dashboardSelection))},null,8,["icon","label"])])]),_:1},8,["bannerIcon"]))}});export{yt as default};
