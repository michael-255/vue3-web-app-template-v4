import{u as F,Q as D,a as _,b as E,c as H}from"./useActions-805fa00e.js";import{d as M,u as U,A as j,a as P,r as p,E as G,D as A,G as K,b as J,S as W,H as z,J as X,o as Y,f as n,h as u,w as o,j as r,q as S,s as x,F as I,K as T,l as e,L as f,M as b,B as d,I as c,i as C,p as g,x as y,t as V,N as Z,y as ee,n as le,v as oe}from"./index-85cdcb14.js";import{Q as ae}from"./QSelect-67a98a6d.js";import{u as se}from"./useRoutables-c00f81b4.js";import"./QList-df3f4761.js";import"./useDialogs-bd0c25a5.js";import"./SimpleDialog.vue_vue_type_script_setup_true_lang-7796c2c3.js";import"./QItemSection-376d8637.js";import"./QItemLabel-210f03e5.js";import"./QMenu-91b59cc6.js";import"./selection-fec6dfc1.js";const te={class:"row justify-start full-width q-mb-md"},ne={class:"col-10 text-h6 ellipsis"},ie={class:"row justify-start full-width"},re={class:"col-12"},he=M({__name:"DataView",setup(ue){U({title:`${j} - Data`});const{log:k}=P(),{routeDatabaseType:a,goToCharts:q,goToInspect:N,goToEdit:Q,goToCreate:B,goBack:L}=se(),{onDeleteRecord:R}=F(),w=p(G(a)??[]),$=p(w.value.filter(i=>!i.required)),m=p([]),v=p([]),h=p(""),O=A.liveDataType(a).subscribe({next:i=>{v.value=i},error:i=>{k.error("Error during data retrieval",i)}});return K(async()=>{var i;try{((i=await A.getRecord(J.SETTING,W.SHOW_ALL_DATA_COLUMNS))==null?void 0:i.value)?m.value=z(a)??[]:m.value=X(a)??[]}catch(s){k.error("Error loading data view",s)}}),Y(()=>{O.unsubscribe()}),(i,s)=>(n(),u(H,{rows:v.value,columns:w.value,"visible-columns":m.value,"rows-per-page-options":[0],filter:h.value,"virtual-scroll":"",fullscreen:"","row-key":"id"},{header:o(l=>[r(_,{props:l},{default:o(()=>[(n(!0),S(I,null,x(l.cols,t=>le((n(),u(D,{key:t.name,props:l},{default:o(()=>[T(y(t.label),1)]),_:2},1032,["props"])),[[oe,t.name!=="hiddenType"&&t.name!=="hiddenId"]])),128)),r(D,{"auto-width":"",class:"text-left"},{default:o(()=>[T("Actions")]),_:1})]),_:2},1032,["props"])]),body:o(l=>[r(_,{props:l},{default:o(()=>[(n(!0),S(I,null,x(l.cols,t=>(n(),u(E,{key:t.name,props:l},{default:o(()=>[T(y(t.value),1)]),_:2},1032,["props"]))),128)),r(E,{"auto-width":""},{default:o(()=>[e(f)(e(a)).includes(e(b).CHARTS)?(n(),u(d,{key:0,flat:"",round:"",dense:"",class:"q-ml-xs",color:"accent",icon:e(c).CHARTS,onClick:t=>e(q)(l.cols[0].value,l.cols[1].value)},null,8,["icon","onClick"])):C("",!0),e(f)(e(a)).includes(e(b).INSPECT)?(n(),u(d,{key:1,flat:"",round:"",dense:"",class:"q-ml-xs",color:"primary",icon:e(c).INSPECT,onClick:t=>e(N)(l.cols[0].value,l.cols[1].value)},null,8,["icon","onClick"])):C("",!0),e(f)(e(a)).includes(e(b).EDIT)?(n(),u(d,{key:2,flat:"",round:"",dense:"",class:"q-ml-xs",color:"orange-9",icon:e(c).EDIT,onClick:t=>e(Q)(l.cols[0].value,l.cols[1].value)},null,8,["icon","onClick"])):C("",!0),e(f)(e(a)).includes(e(b).DELETE)?(n(),u(d,{key:3,flat:"",round:"",dense:"",class:"q-ml-xs",color:"negative",onClick:t=>e(R)(l.cols[0].value,l.cols[1].value),icon:e(c).DELETE},null,8,["onClick","icon"])):C("",!0)]),_:2},1024)]),_:2},1032,["props"])]),top:o(()=>[g("div",te,[g("div",ne,y(e(a)),1),r(d,{round:"",flat:"",class:"absolute-top-right q-mr-sm q-mt-sm",icon:e(c).BACK,onClick:s[0]||(s[0]=l=>e(L)())},null,8,["icon"])]),g("div",ie,[g("div",re,[r(Z,{disable:!v.value.length,outlined:"",dense:"",clearable:"",debounce:"300",modelValue:h.value,"onUpdate:modelValue":s[3]||(s[3]=l=>h.value=l),placeholder:"Search"},{before:o(()=>[e(f)(e(a)).includes(e(b).CREATE)?(n(),u(d,{key:0,color:"positive",class:"q-px-sm q-mr-xs",icon:e(c).ADD,onClick:s[1]||(s[1]=l=>e(B)(e(a)))},null,8,["icon"])):C("",!0),r(ae,{modelValue:m.value,"onUpdate:modelValue":s[2]||(s[2]=l=>m.value=l),options:$.value,disable:!v.value.length,"bg-color":"primary",standout:"",multiple:"",dense:"","options-dense":"","emit-value":"","map-options":"","option-value":"name","display-value":""},{prepend:o(()=>[r(V,{color:"white",name:e(c).OPTIONS},null,8,["name"])]),_:1},8,["modelValue","options","disable"])]),append:o(()=>[r(V,{name:"search"})]),_:1},8,["disable","modelValue"])])])]),bottom:o(()=>[T(y(e(ee)(v.value)),1)]),_:1},8,["rows","columns","visible-columns","filter"]))}});export{he as default};
