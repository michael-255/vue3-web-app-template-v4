import{d as V,b as k,A as x,e as C,D as g,r as I,$,aj as A,f as b,h as B,j as o,k as y,l,u as t,q as d,m as n,z as Q,Q as h,I as i,y as F,F as R,s as q,n as r,x as M,C as N,E as U,ah as j,J as T,ai as L}from"./index-5d245f77.js";import{Q as z}from"./QForm-c9bc2434.js";import{_ as W}from"./ResponsivePage.vue_vue_type_script_setup_true_lang-723488f3.js";import{u as J}from"./useRoutables-128af855.js";import{u as O}from"./action-ec1f5bf5.js";import{u as P}from"./useDialogs-7677fd0b.js";import"./SimpleDialog.vue_vue_type_script_setup_true_lang-9013e5dc.js";const G={key:0},H=r("span",{class:"q-ml-md"},"Error rendering this record",-1),K={key:1},X={class:"row justify-start"},Y={class:"col"},Z={class:"col"},ee=r("span",{class:"text-caption q-ml-xs text-warning"}," Correct invalid entries and try again ",-1),de=V({__name:"EditParentView",setup(ae){k({title:`${x} - Edit Record`});const{routeType:c,routeId:u,goBack:w}=J(),{log:m}=C(),{confirmDialog:D}=P(),p=O(),f=g.getParentLabelSingular(c),_=g.getParentFieldProps(c),v=I(!0);$(async()=>{try{if(await A.isValid(u)){const e=await b.getParent(u);e&&Object.keys(e).forEach(s=>{p.record[s]=e[s]})}}catch(e){m.error("Error loading edit parent view",e)}}),B(()=>{p.$reset()});async function E(){D("Update",`Update ${f} record?`,i.SAVE,"positive",async()=>{try{const e=j(!0,{},p.record);await b.updateParent(u,e),m.info("Successfully updated record",{id:e[T.ID],type:c}),w()}catch(e){m.error("Update failed",e)}})}return(e,s)=>(o(),y(W,{bannerIcon:t(i).EDIT,bannerTitle:`Edit ${t(f)}`},{default:l(()=>[!t(f)||!t(_)?(o(),d("div",G,[n(F,{class:"q-mb-md"},{default:l(()=>[n(Q,null,{default:l(()=>[n(h,{name:t(i).WARN,size:"md",color:"warning"},null,8,["name"]),H]),_:1})]),_:1})])):(o(),d("div",K,[n(z,{onSubmit:E,onValidationError:s[0]||(s[0]=a=>v.value=!1),onValidationSuccess:s[1]||(s[1]=a=>v.value=!0)},{default:l(()=>[(o(!0),d(R,null,q(t(_),(a,S)=>(o(),d("div",{key:S,class:"q-mb-md"},[(o(),y(L(a.component),{field:a.field,label:a.label,desc:a.desc,getDefault:a.getDefault,validator:a.validator,validationMessage:a.validationMessage},null,8,["field","label","desc","getDefault","validator","validationMessage"]))]))),128)),r("div",X,[r("div",Y,[n(M,{label:"Update",type:"submit",color:"positive",icon:t(i).SAVE},null,8,["icon"])]),r("div",Z,[N(r("div",null,[n(h,{name:t(i).WARN,color:"warning"},null,8,["name"]),ee],512),[[U,!v.value]])])])]),_:1})]))]),_:1},8,["bannerIcon","bannerTitle"]))}});export{de as default};
