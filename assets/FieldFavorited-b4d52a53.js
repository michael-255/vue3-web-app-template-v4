import{q as c,$ as p,aa as u,y as a,R as r,F as m,u as e,B as _,aK as f,T as h,E as d}from"./index-24dbccec.js";import{u as g}from"./action-b51c5118.js";const v=d("div",{class:"text-weight-bold text-body1"},"Favorited",-1),F={key:0},y={key:1},V=d("p",null,"Whether the record is favorited and is prioritized on the Dashboard.",-1),x=c({__name:"FieldFavorited",props:{inspecting:{type:Boolean}},setup(B){const o=g(),t=p.Values.favorited;u(()=>{o.record[t]=o.record[t]??!1});function i(s){return s?"Yes":"No"}return(s,n)=>(a(),r(h,null,[v,s.inspecting?(a(),r("div",F,m(i(e(o).record[e(t)])),1)):(a(),r("div",y,[V,_(f,{modelValue:e(o).record[e(t)],"onUpdate:modelValue":n[0]||(n[0]=l=>e(o).record[e(t)]=l)},null,8,["modelValue"])]))],64))}});export{x as default};
