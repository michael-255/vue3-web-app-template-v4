import{d as c,$ as p,j as f,k as m,l,m as s,z as g,n,t as r,aK as V,u as d,y as C}from"./index-5d245f77.js";import{u as S}from"./action-ec1f5bf5.js";const _={class:"text-h6"},B=c({__name:"InputToggle",props:{field:{},label:{},desc:{},getDefault:{type:Function}},setup(u){const a=u,e=S();return p(()=>{e.record[a.field]=e.record[a.field]??a.getDefault()}),(o,t)=>(f(),m(C,null,{default:l(()=>[s(g,null,{default:l(()=>[n("p",_,r(o.label),1),n("p",null,r(o.desc),1),s(V,{modelValue:d(e).record[o.field],"onUpdate:modelValue":t[0]||(t[0]=i=>d(e).record[o.field]=i)},null,8,["modelValue"])]),_:1})]),_:1}))}});export{B as default};
