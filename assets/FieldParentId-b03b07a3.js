import{k as m,F as f,r as h,l as I,D as d,m as _,G as b,p as c,bG as g,x as e,R as l,w as v,Q as w,I as T,bH as x,L as y,t as p}from"./index-fedd1f23.js";import{Q as P}from"./QSelect-3c47dbb7.js";import{u as R}from"./action-06507f24.js";import{u as S}from"./useRouting-10a92d3b.js";import"./QItem-a384fd65.js";import"./QItemLabel-ee07051d.js";import"./QMenu-3df4d98a.js";import"./selection-25ddb021.js";const V=p("div",{class:"text-weight-bold text-body1"},"Parent Record",-1),k=p("p",null," The parent record that this child record is associated with. This cannot be updated once set during record creation. ",-1),G=m({__name:"FieldParentId",setup(B){const{route:s,routeTable:i}=S(),{log:u}=f(),o=R(),r=h([]);return I(async()=>{try{if(i){const a=d.getParentTable(i);r.value=await d.getParentIdOptions(a),r.value.some(t=>t.value===o.record.parentId)||(o.record.parentId=void 0)}}catch(a){u.error("Error with parent id field",a)}}),(a,n)=>(_(),b(y,null,[V,k,c(P,{disable:e(s).name===e(l).EDIT,modelValue:e(o).record.parentId,"onUpdate:modelValue":n[0]||(n[0]=t=>e(o).record.parentId=t),rules:[t=>e(x).safeParse(t).success||"Required"],options:r.value,"emit-value":"","map-options":"","options-dense":"",dense:"",outlined:"",color:"primary"},g({_:2},[e(s).name===e(l).EDIT?{name:"prepend",fn:v(()=>[c(w,{color:"warning",name:e(T).LOCK},null,8,["name"])]),key:"0"}:void 0]),1032,["disable","modelValue","rules","options"])],64))}});export{G as default};
