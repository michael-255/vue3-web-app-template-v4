import{d as u,$ as c,j as p,k as f,l,m as r,z as m,n as y,t as V,K as g,u as n,y as v}from"./index-5d245f77.js";import{u as _}from"./action-ec1f5bf5.js";const C={class:"text-h6"},k=u({__name:"InputPercent",props:{field:{},label:{},getDefault:{type:Function},validator:{},validationMessage:{}},setup(s){const e=s,t=_();c(()=>{t.record[e.field]=t.record[e.field]??e.getDefault()});function d(){return async a=>await e.validator.isValid(a)||e.validationMessage}return(a,o)=>(p(),f(v,null,{default:l(()=>[r(m,null,{default:l(()=>[y("p",C,V(a.label),1),r(g,{modelValue:n(t).record[a.field],"onUpdate:modelValue":o[0]||(o[0]=i=>n(t).record[a.field]=i),rules:[d()],type:"number","lazy-rules":"",dense:"",outlined:"",color:"primary"},null,8,["modelValue","rules"])]),_:1})]),_:1}))}});export{k as default};
