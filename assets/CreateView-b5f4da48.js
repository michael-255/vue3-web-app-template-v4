import{d as k,u as A,A as U,a as $,b as h,r as x,J as B,a8 as G,a9 as t,aa as D,o as Q,c as n,e as w,w as d,h as o,j as u,f as s,Q as T,m as I,I as l,i as F,F as M,k as N,l as i,n as O,a6 as q,a7 as L,ab as P,D as j,ac as W}from"./index-bcd0c63a.js";import{Q as Y}from"./QForm-8eee3399.js";import{_ as z}from"./ResponsivePage.vue_vue_type_script_setup_true_lang-7d23b4d4.js";import{_ as J}from"./ParentInfoCard.vue_vue_type_script_setup_true_lang-a82fe29f.js";import{u as H}from"./useRoutables-8e2fcfd3.js";import{u as K}from"./action-7fb54c5b.js";import{u as X}from"./useDialogs-a5eb05fb.js";import"./SimpleDialog.vue_vue_type_script_setup_true_lang-682ca1b0.js";const Z={key:0},ee=i("span",{class:"q-ml-md"},"Error rendering this record",-1),ae={key:1},te={class:"row justify-start"},oe={class:"col"},re={class:"col"},se=i("span",{class:"text-caption q-ml-xs text-warning"}," Correct invalid entries and try again ",-1),fe=k({__name:"CreateView",setup(ne){var b,C;A({title:`${U} - Create Record`});const{routeGroupId:v,routeType:m,routeGroup:p,goBack:R}=H(),{log:_}=$(),{confirmDialog:E}=X(),r=K(),f=(b=h.find(e=>e.type===m&&e.group===p))==null?void 0:b.labelSingular,y=(C=h.find(e=>e.type===m&&e.group===p))==null?void 0:C.fieldProps,g=x(!0);B(async()=>{try{await G.isValid(v)?r.record[t.GROUP_ID]=v:r.record[t.GROUP_ID]=D(),r.record[t.UID]=D(),r.record[t.TYPE]=m,r.record[t.GROUP]=p}catch(e){_.error("Error loading create view",e)}}),Q(()=>{r.$reset()});async function S(){E("Create",`Create ${f} record?`,l.CREATE,"positive",async()=>{try{const e=P(!0,{},r.record);await j.add(e),_.info("Successfully created record",{uid:e[t.UID],groupId:e[t.GROUP_ID],type:e[t.TYPE],group:e[t.GROUP]}),R()}catch(e){_.error("Create failed",e)}})}return(e,c)=>(n(),w(z,{bannerIcon:o(l).CREATE,bannerTitle:`Create ${o(f)}`},{default:d(()=>[!o(f)||!o(y)?(n(),u("div",Z,[s(F,{class:"q-mb-md"},{default:d(()=>[s(T,null,{default:d(()=>[s(I,{name:o(l).WARN,size:"md",color:"warning"},null,8,["name"]),ee]),_:1})]),_:1})])):(n(),u("div",ae,[s(Y,{onSubmit:S,onValidationError:c[0]||(c[0]=a=>g.value=!1),onValidationSuccess:c[1]||(c[1]=a=>g.value=!0)},{default:d(()=>[s(J),(n(!0),u(M,null,N(o(y),(a,V)=>(n(),u("div",{key:V,class:"q-mb-md"},[(n(),w(W(a.component),{field:a.field,label:a.label,desc:a.desc,getDefault:a.getDefault,validator:a.validator,validationMessage:a.validationMessage},null,8,["field","label","desc","getDefault","validator","validationMessage"]))]))),128)),i("div",te,[i("div",oe,[s(O,{label:"Create",type:"submit",color:"positive",icon:o(l).SAVE},null,8,["icon"])]),i("div",re,[q(i("div",null,[s(I,{name:o(l).WARN,color:"warning"},null,8,["name"]),se],512),[[L,!g.value]])])])]),_:1})]))]),_:1},8,["bannerIcon","bannerTitle"]))}});export{fe as default};
