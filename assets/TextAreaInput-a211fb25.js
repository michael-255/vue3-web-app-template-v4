import{d as m,r as p,J as g,c as x,e as y,w as d,f as s,Q as v,l as i,t as u,a5 as b,h as l,aC as A,i as C}from"./index-bcd0c63a.js";import{u as V}from"./action-7fb54c5b.js";const h={class:"text-h6 q-mb-md"},w={class:"q-mb-md"},Q=m({__name:"TextAreaInput",props:{field:null,label:null,desc:null,getDefault:{type:Function},validator:{type:Function},validationMessage:null},setup(e){const a=e,t=V(),c=p(null);g(()=>{t.record[a.field]=t.record[a.field]??a.getDefault()});function f(){return async o=>await a.validator(o)||a.validationMessage}return(o,n)=>(x(),y(C,null,{default:d(()=>[s(v,null,{default:d(()=>[i("p",h,u(e.label),1),i("p",w,u(e.desc),1),s(b,{modelValue:l(t).record[e.field],"onUpdate:modelValue":n[0]||(n[0]=r=>l(t).record[e.field]=r),ref_key:"inputRef",ref:c,rules:[f()],maxlength:l(A).MAX_TEXT_AREA_LENGTH,type:"textarea","lazy-rules":"",autogrow:"",counter:"",dense:"",outlined:"",clearable:"",color:"primary",onBlur:n[1]||(n[1]=r=>l(t).record[e.field]=l(t).record[e.field].trim())},null,8,["modelValue","rules","maxlength"])]),_:1})]),_:1}))}});export{Q as default};
