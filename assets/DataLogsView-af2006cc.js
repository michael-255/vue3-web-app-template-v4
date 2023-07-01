import{Q as w,a as V,b as y,c as q}from"./QTable-d9aa79bb.js";import{q as E,N as F,G as O,t as U,r as i,a0 as f,D as C,x as A,y as u,z as g,A as s,B as a,S as L,T as Q,U as k,_ as c,J as x,u as n,I as b,E as d,Q as D,a1 as P,F as _,V as $,a2 as j,a3 as R,Y as z,Z as G,a4 as J}from"./index-ef11a4d2.js";import{Q as M}from"./QSelect-f9ed5694.js";import{u as Y}from"./useRoutables-81d4533e.js";import{u as Z}from"./useDialogs-c3fdb6eb.js";import"./QList-5ee84f12.js";import"./QItem-bdaee51e.js";import"./QItemLabel-6937233e.js";import"./QMenu-17d8d43f.js";import"./selection-0dee77d8.js";import"./ui-29eb266c.js";const H={class:"row justify-start full-width q-mb-md"},K=d("div",{class:"col-10 text-h6 text-bold ellipsis"},"Logs",-1),W={class:"row justify-start full-width"},X={class:"col-12"},me=E({__name:"DataLogsView",setup(ee){F({title:`${O} - Logs Data`});const{log:N}=U(),{goBack:B}=Y(),{inspectDialog:S}=Z(),m=i(""),r=i([]),p=i([f.Values.timestamp,f.Values.logLevel,f.Values.label]),h=i(j),T=i(h.value.filter(o=>!o.required)),v=C.liveLogs().subscribe({next:o=>{r.value=o},error:o=>{N.error("Error fetching live Logs",o)}});A(()=>{v==null||v.unsubscribe()});async function I(o){const l=await C.getLog(Number(o));S("Log",R,l)}return(o,l)=>(u(),g(q,{rows:r.value,columns:h.value,"visible-columns":p.value,"rows-per-page-options":[0],filter:m.value,"virtual-scroll":"",fullscreen:"","row-key":"id"},{header:s(e=>[a(V,{props:e},{default:s(()=>[(u(!0),L(k,null,Q(e.cols,t=>z((u(),g(w,{key:t.name,props:e},{default:s(()=>[c(_(t.label),1)]),_:2},1032,["props"])),[[G,!n(J).includes(t.name)]])),128)),a(w,{"auto-width":"",class:"text-left"},{default:s(()=>[c("Actions")]),_:1})]),_:2},1032,["props"])]),body:s(e=>[a(V,{props:e},{default:s(()=>[(u(!0),L(k,null,Q(e.cols,t=>(u(),g(y,{key:t.name,props:e},{default:s(()=>[c(_(t.value),1)]),_:2},1032,["props"]))),128)),a(y,{"auto-width":""},{default:s(()=>[a(x,{flat:"",round:"",dense:"",class:"q-ml-xs",color:"primary",icon:n(b).INSPECT,onClick:t=>I(e.cols[0].value)},null,8,["icon","onClick"])]),_:2},1024)]),_:2},1032,["props"])]),top:s(()=>[d("div",H,[K,a(x,{round:"",flat:"",class:"absolute-top-right q-mr-sm q-mt-sm",icon:n(b).CLOSE,onClick:l[0]||(l[0]=e=>n(B)())},null,8,["icon"])]),d("div",W,[d("div",X,[a(P,{disable:!r.value.length,outlined:"",dense:"",clearable:"",debounce:"300",modelValue:m.value,"onUpdate:modelValue":l[2]||(l[2]=e=>m.value=e),placeholder:"Search"},{before:s(()=>[a(M,{modelValue:p.value,"onUpdate:modelValue":l[1]||(l[1]=e=>p.value=e),options:T.value,disable:!r.value.length,"bg-color":"primary",standout:"",multiple:"",dense:"","options-dense":"","emit-value":"","map-options":"","option-value":"name","display-value":""},{prepend:s(()=>[a(D,{color:"white",name:n(b).OPTIONS},null,8,["name"])]),_:1},8,["modelValue","options","disable"])]),append:s(()=>[a(D,{name:"search"})]),_:1},8,["disable","modelValue"])])])]),bottom:s(()=>[c(_(n($)(r.value)),1)]),_:1},8,["rows","columns","visible-columns","filter"]))}});export{me as default};
