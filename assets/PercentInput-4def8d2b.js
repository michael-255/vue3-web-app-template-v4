import{d as f,r as c,L as p,c as m,e as _,w as n,f as r,Q as g,l as y,t as V,a5 as h,h as l,aD as v,i as M}from"./index-8d0bb118.js";import{u as b}from"./action-ff137bd1.js";const C={class:"text-h6 q-mb-md"},Q=f({__name:"PercentInput",props:{field:{},label:{},getDefault:{type:Function},validator:{},validationMessage:{}},setup(s){const e=s,t=b(),i=c(null);p(()=>{t.record[e.field]=t.record[e.field]??e.getDefault()});function d(){return async a=>await e.validator.isValid(a)||e.validationMessage}return(a,o)=>(m(),_(M,null,{default:n(()=>[r(g,null,{default:n(()=>[y("p",C,V(a.label),1),r(h,{modelValue:l(t).record[a.field],"onUpdate:modelValue":o[0]||(o[0]=u=>l(t).record[a.field]=u),ref_key:"inputRef",ref:i,rules:[d()],maxlength:l(v).MAX_NAME_LENGTH,type:"number",step:"0.01","lazy-rules":"",dense:"",outlined:"",color:"primary"},null,8,["modelValue","rules","maxlength"])]),_:1})]),_:1}))}});export{Q as default};
