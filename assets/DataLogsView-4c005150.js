import{Q as w,a as V,b as y,c as q}from"./QTable-b60791de.js";import{q as E,N as F,G as O,t as U,r as i,a0 as f,D as L,x as A,y as u,z as g,A as s,B as a,S as C,T as Q,U as k,_ as c,J as x,u as n,I as b,E as d,Q as D,a1 as $,F as h,V as j,a2 as P,O as R,Y as z,Z as G,a3 as J}from"./index-408197b4.js";import{Q as M}from"./QSelect-436eab52.js";import{u as Y}from"./useRoutables-132fa327.js";import{u as Z}from"./useDialogs-fad27234.js";import"./QList-089c069d.js";import"./QItem-404b2f94.js";import"./QItemLabel-3e7d15e3.js";import"./QMenu-c4003d51.js";import"./selection-cd46e154.js";import"./action-4701911f.js";import"./ui-65b145aa.js";const H={class:"row justify-start full-width q-mb-md"},K=d("div",{class:"col-10 text-h6 text-bold ellipsis"},"Logs",-1),W={class:"row justify-start full-width"},X={class:"col-12"},pe=E({__name:"DataLogsView",setup(ee){F({title:`${O} - Logs Data`});const{log:N}=U(),{goBack:S}=Y(),{inspectDialog:B}=Z(),m=i(""),r=i([]),p=i([f.Values.timestamp,f.Values.logLevel,f.Values.logLabel]),_=i(P),T=i(_.value.filter(o=>!o.required)),v=L.liveLogs().subscribe({next:o=>{r.value=o},error:o=>{N.error("Error fetching live Logs",o)}});A(()=>{v==null||v.unsubscribe()});async function I(o){const l=await L.getLog(Number(o)),e=R.getLogFields();B("Log",l,e)}return(o,l)=>(u(),g(q,{rows:r.value,columns:_.value,"visible-columns":p.value,"rows-per-page-options":[0],filter:m.value,"virtual-scroll":"",fullscreen:"","row-key":"id"},{header:s(e=>[a(V,{props:e},{default:s(()=>[(u(!0),C(k,null,Q(e.cols,t=>z((u(),g(w,{key:t.name,props:e},{default:s(()=>[c(h(t.label),1)]),_:2},1032,["props"])),[[G,!n(J).includes(t.name)]])),128)),a(w,{"auto-width":"",class:"text-left"},{default:s(()=>[c("Actions")]),_:1})]),_:2},1032,["props"])]),body:s(e=>[a(V,{props:e},{default:s(()=>[(u(!0),C(k,null,Q(e.cols,t=>(u(),g(y,{key:t.name,props:e},{default:s(()=>[c(h(t.value),1)]),_:2},1032,["props"]))),128)),a(y,{"auto-width":""},{default:s(()=>[a(x,{flat:"",round:"",dense:"",class:"q-ml-xs",color:"primary",icon:n(b).INSPECT,onClick:t=>I(e.cols[0].value)},null,8,["icon","onClick"])]),_:2},1024)]),_:2},1032,["props"])]),top:s(()=>[d("div",H,[K,a(x,{round:"",flat:"",class:"absolute-top-right q-mr-sm q-mt-sm",icon:n(b).CLOSE,onClick:l[0]||(l[0]=e=>n(S)())},null,8,["icon"])]),d("div",W,[d("div",X,[a($,{disable:!r.value.length,outlined:"",dense:"",clearable:"",debounce:"300",modelValue:m.value,"onUpdate:modelValue":l[2]||(l[2]=e=>m.value=e),placeholder:"Search"},{before:s(()=>[a(M,{modelValue:p.value,"onUpdate:modelValue":l[1]||(l[1]=e=>p.value=e),options:T.value,disable:!r.value.length,"bg-color":"primary",standout:"",multiple:"",dense:"","options-dense":"","emit-value":"","map-options":"","option-value":"name","display-value":""},{prepend:s(()=>[a(D,{color:"white",name:n(b).OPTIONS},null,8,["name"])]),_:1},8,["modelValue","options","disable"])]),append:s(()=>[a(D,{name:"search"})]),_:1},8,["disable","modelValue"])])])]),bottom:s(()=>[c(h(n(j)(r.value)),1)]),_:1},8,["rows","columns","visible-columns","filter"]))}});export{pe as default};
