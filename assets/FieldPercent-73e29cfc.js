import{q as d,$ as u,aa as i,y as n,R as c,F as p,u as e,z as m,c1 as f,a0 as y,T as _,E as b}from"./index-24dbccec.js";import{u as g}from"./action-b51c5118.js";const k=b("div",{class:"text-weight-bold text-body1"},"Percentage",-1),B={key:0},S=d({__name:"FieldPercent",props:{inspecting:{type:Boolean}},setup(F){const t=g(),o=u.Values.percent;i(()=>{t.record[o]=t.record[o]??0});function l(r){return`${r}%`}return(r,a)=>(n(),c(_,null,[k,r.inspecting?(n(),c("div",B,p(l(e(t).record[e(o)])),1)):(n(),m(y,{key:1,modelValue:e(t).record[e(o)],"onUpdate:modelValue":a[0]||(a[0]=s=>e(t).record[e(o)]=s),modelModifiers:{number:!0},rules:[s=>e(f).safeParse(s).success||"Percent must be between 0 and 100"],type:"number","lazy-rules":"",dense:"",outlined:"",color:"primary"},null,8,["modelValue","rules"]))],64))}});export{S as default};
