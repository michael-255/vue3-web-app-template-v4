import{q as m,ab as f,y as c,z as p,A as n,B as u,C as g,E as y,F as B,a1 as C,u as o,aM as V,L as h}from"./index-5cff7ac3.js";import{u as A}from"./action-d0cf9b67.js";const M={class:"text-h6"},b=m({__name:"InputName",props:{field:{},label:{},getDefault:{type:Function},schema:{},message:{}},setup(d){const t=d,a=A();f(()=>{a.record[t.field]=a.record[t.field]??t.getDefault()});function i(){return e=>t.schema.safeParse(e).success||t.message}return(e,r)=>(c(),p(h,null,{default:n(()=>[u(g,null,{default:n(()=>[y("p",M,B(e.label),1),u(C,{modelValue:o(a).record[e.field],"onUpdate:modelValue":r[0]||(r[0]=s=>o(a).record[e.field]=s),rules:[i()],maxlength:o(V).MAX_NAME,type:"text","lazy-rules":"",counter:"",dense:"",outlined:"",color:"primary",onBlur:r[1]||(r[1]=s=>{var l;return o(a).record[e.field]=(l=o(a).record[e.field])==null?void 0:l.trim()})},null,8,["modelValue","rules","maxlength"])]),_:1})]),_:1}))}});export{b as default};
