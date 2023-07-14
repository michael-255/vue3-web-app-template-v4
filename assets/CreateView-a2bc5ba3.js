import{k as B,U as E,A as R,l as $,D as i,r as h,Y as x,m as D,n as t,p as c,w as g,y as e,G as l,M as I,L as V,q as f,I as a,B as y,H as S,J as q,v as C,Q as L,al as Q,am as T,an as F}from"./index-b1310b53.js";import{Q as N}from"./QForm-4741473d.js";import{_ as j}from"./ErrorStates.vue_vue_type_script_setup_true_lang-a4b91786.js";import{_ as M}from"./ResponsivePage.vue_vue_type_script_setup_true_lang-1ad6e8c9.js";import{u as U}from"./action-9e6d41df.js";import{u as G}from"./useDialogs-2a28f744.js";import{u as H}from"./useRouting-7df5cfde.js";import"./QSelect-d09ef7ef.js";import"./QItem-10c60c82.js";import"./QItemLabel-d1472da3.js";import"./QMenu-6d0c942a.js";import"./selection-f70df0eb.js";import"./ui-34ff337f.js";const J={key:0,class:"row justify-center q-my-sm"},K={key:1,class:"row justify-center q-my-sm"},O={class:"row justify-center"},P=C("span",{class:"text-caption q-ml-xs text-warning"}," Correct invalid entries and try again ",-1),le=B({__name:"CreateView",setup(W){E({title:`${R} - Create Record`});const{routeTable:o,routeParentId:v,goBack:b}=H(),{log:d}=$(),{confirmDialog:w}=G(),r=U(),m=i.getLabel(o,"singular"),_=i.getFieldComponents(o),u=h(!0);x(async()=>{try{r.record=i.getDefaultActionRecord(o),v&&(r.record.parentId=v)}catch(n){d.error("Error loading create view",n)}}),D(()=>{r.$reset()});async function k(){w("Create",`Create ${m} record?`,a.CREATE,"positive",async()=>{try{r.record.id=Q(),r.record.activated=!1,await i.addRecord(o,T(!0,{},r.record)),d.info("Record created",{table:o,id:r.record.id}),b()}catch(n){d.error("Create failed",n)}})}return(n,s)=>(t(),c(M,{bannerIcon:e(a).CREATE,bannerTitle:`Create ${e(m)}`},{default:g(()=>[e(m)&&e(_).length>0?(t(),c(N,{key:0,onSubmit:k,onValidationError:s[0]||(s[0]=p=>u.value=!1),onValidationSuccess:s[1]||(s[1]=p=>u.value=!0)},{default:g(()=>[(t(!0),l(V,null,I(e(_),(p,A)=>(t(),l("div",{key:A,class:"q-mb-md"},[(t(),c(F(p),{inspecting:!1}))]))),128)),e(r).record.activated?(t(),l("div",K,[f(y,{disable:"",label:"Active",color:"warning",icon:e(a).LOCK},null,8,["icon"])])):(t(),l("div",J,[f(y,{label:"Create",type:"submit",color:"positive",icon:e(a).SAVE},null,8,["icon"])])),S(C("div",O,[f(L,{name:e(a).WARN,color:"warning"},null,8,["name"]),P],512),[[q,!u.value]])]),_:1})):(t(),c(j,{key:1,error:"unknown"}))]),_:1},8,["bannerIcon","bannerTitle"]))}});export{le as default};
