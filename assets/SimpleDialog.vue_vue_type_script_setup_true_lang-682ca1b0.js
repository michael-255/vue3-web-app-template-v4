import{s as p,r as k,d as D,c as m,e as d,w as l,h as f,bf as y,f as a,Q as g,b0 as x,m as O,l as Q,t as C,a2 as q,bh as w,n as h,a4 as B,i as j}from"./index-bcd0c63a.js";const H=()=>!0;function N(e){const n={};return e.forEach(t=>{n[t]=H}),n}function s(){const{emit:e,proxy:n}=p(),t=k(null);function i(){t.value.show()}function o(){t.value.hide()}function c(u){e("ok",u),o()}function r(){e("hide")}return Object.assign(n,{show:i,hide:o}),{dialogRef:t,onDialogHide:r,onDialogOK:c,onDialogCancel:o}}const b=["ok","hide"];s.emits=b;s.emitsObject=N(b);const V={class:"text-h6"},S=D({__name:"SimpleDialog",props:{type:null,icon:null,title:null,message:null,color:null,persistent:{type:Boolean}},emits:[...s.emits],setup(e){const n=e,{dialogRef:t,onDialogHide:i,onDialogOK:o,onDialogCancel:c}=s();function r(){o()}return(u,K)=>(m(),d(y,{ref_key:"dialogRef",ref:t,persistent:e.persistent,onHide:f(i)},{default:l(()=>[a(j,{class:"q-dialog-plugin"},{default:l(()=>[a(g,{class:x(`bg-${n.color} text-white q-py-sm`)},{default:l(()=>[a(O,{name:e.icon,size:"sm",class:"q-pb-sm q-mr-md"},null,8,["name"]),Q("span",V,C(e.title),1)]),_:1},8,["class"]),a(g,{class:"q-mt-md"},{default:l(()=>[q(C(e.message),1)]),_:1}),a(w,{align:"right"},{default:l(()=>[e.type==="Confirm"?(m(),d(h,{key:0,flat:"",label:"Cancel",onClick:f(c)},null,8,["onClick"])):B("",!0),a(h,{flat:"",label:e.type,color:e.color,onClick:r},null,8,["label","color"])]),_:1})]),_:1})]),_:1},8,["persistent","onHide"]))}});export{S as _};
