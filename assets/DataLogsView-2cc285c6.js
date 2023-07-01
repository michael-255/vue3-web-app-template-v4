import{Q as w,a as V,b as y,c as q}from"./QTable-b3965f2a.js";import{q as E,N as F,G as O,t as U,r as i,a0 as f,D as C,x as A,y as u,z as b,A as s,B as a,S as L,T as Q,U as k,_ as c,J as x,u as n,I as g,E as d,Q as D,a1 as $,F as _,V as j,a2 as P,Y as R,Z as z,a3 as G}from"./index-5cff7ac3.js";import{Q as J}from"./QSelect-b0d74de1.js";import{u as M}from"./useRoutables-30265fa0.js";import{u as Y}from"./useDialogs-b7894612.js";import"./QList-30b88ef1.js";import"./QItem-7dd31eaa.js";import"./QItemLabel-6b954a86.js";import"./QMenu-e96979e1.js";import"./selection-2bdc6de2.js";const Z={class:"row justify-start full-width q-mb-md"},H=d("div",{class:"col-10 text-h6 text-bold ellipsis"},"Logs",-1),K={class:"row justify-start full-width"},W={class:"col-12"},ce=E({__name:"DataLogsView",setup(X){F({title:`${O} - Logs Data`});const{log:N}=U(),{goBack:B}=M(),{inspectDialog:S}=Y(),m=i(""),r=i([]),p=i([f.Values.timestamp,f.Values.logLevel,f.Values.label]),h=i(P),T=i(h.value.filter(o=>!o.required)),v=C.liveLogs().subscribe({next:o=>{r.value=o},error:o=>{N.error("Error fetching live Logs",o)}});A(()=>{v==null||v.unsubscribe()});async function I(o){const l=await C.getLog(Number(o));S("Log",l)}return(o,l)=>(u(),b(q,{rows:r.value,columns:h.value,"visible-columns":p.value,"rows-per-page-options":[0],filter:m.value,"virtual-scroll":"",fullscreen:"","row-key":"id"},{header:s(e=>[a(V,{props:e},{default:s(()=>[(u(!0),L(k,null,Q(e.cols,t=>R((u(),b(w,{key:t.name,props:e},{default:s(()=>[c(_(t.label),1)]),_:2},1032,["props"])),[[z,!n(G).includes(t.name)]])),128)),a(w,{"auto-width":"",class:"text-left"},{default:s(()=>[c("Actions")]),_:1})]),_:2},1032,["props"])]),body:s(e=>[a(V,{props:e},{default:s(()=>[(u(!0),L(k,null,Q(e.cols,t=>(u(),b(y,{key:t.name,props:e},{default:s(()=>[c(_(t.value),1)]),_:2},1032,["props"]))),128)),a(y,{"auto-width":""},{default:s(()=>[a(x,{flat:"",round:"",dense:"",class:"q-ml-xs",color:"primary",icon:n(g).INSPECT,onClick:t=>I(e.cols[0].value)},null,8,["icon","onClick"])]),_:2},1024)]),_:2},1032,["props"])]),top:s(()=>[d("div",Z,[H,a(x,{round:"",flat:"",class:"absolute-top-right q-mr-sm q-mt-sm",icon:n(g).CLOSE,onClick:l[0]||(l[0]=e=>n(B)())},null,8,["icon"])]),d("div",K,[d("div",W,[a($,{disable:!r.value.length,outlined:"",dense:"",clearable:"",debounce:"300",modelValue:m.value,"onUpdate:modelValue":l[2]||(l[2]=e=>m.value=e),placeholder:"Search"},{before:s(()=>[a(J,{modelValue:p.value,"onUpdate:modelValue":l[1]||(l[1]=e=>p.value=e),options:T.value,disable:!r.value.length,"bg-color":"primary",standout:"",multiple:"",dense:"","options-dense":"","emit-value":"","map-options":"","option-value":"name","display-value":""},{prepend:s(()=>[a(D,{color:"white",name:n(g).OPTIONS},null,8,["name"])]),_:1},8,["modelValue","options","disable"])]),append:s(()=>[a(D,{name:"search"})]),_:1},8,["disable","modelValue"])])])]),bottom:s(()=>[c(_(n(j)(r.value)),1)]),_:1},8,["rows","columns","visible-columns","filter"]))}});export{ce as default};
