import{d as m,r as p,J as y,c as g,e as h,w as s,f as r,Q as x,l as u,t as d,a5 as b,h as l,aC as v,i as C}from"./index-bcd0c63a.js";import{u as M}from"./action-7fb54c5b.js";const V={class:"text-h6 q-mb-md"},_={class:"q-mb-md"},S=m({__name:"PercentInput",props:{field:null,label:null,desc:null,getDefault:{type:Function},validator:{type:Function},validationMessage:null},setup(e){const t=e,a=M(),i=p(null);y(()=>{a.record[t.field]=a.record[t.field]??t.getDefault()});function c(){return async n=>await t.validator(n)||t.validationMessage}return(n,o)=>(g(),h(C,null,{default:s(()=>[r(x,null,{default:s(()=>[u("p",V,d(e.label),1),u("p",_,d(e.desc),1),r(b,{modelValue:l(a).record[e.field],"onUpdate:modelValue":o[0]||(o[0]=f=>l(a).record[e.field]=f),ref_key:"inputRef",ref:i,rules:[c()],maxlength:l(v).MAX_NAME_LENGTH,type:"number",step:"0.01","lazy-rules":"",dense:"",outlined:"",color:"primary"},null,8,["modelValue","rules","maxlength"])]),_:1})]),_:1}))}});export{S as default};
