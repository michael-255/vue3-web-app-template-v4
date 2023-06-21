import{d as S,b as w,A as k,e as x,D as p,r as A,$,J as _,ag as B,h as I,j as s,k as y,l as d,u as a,q as u,m as r,z as Q,Q as C,I as n,y as R,F as V,s as F,n as o,x as T,C as q,E as M,ah as N,f as L,ai as j}from"./index-5d245f77.js";import{Q as z}from"./QForm-c9bc2434.js";import{_ as W}from"./ResponsivePage.vue_vue_type_script_setup_true_lang-723488f3.js";import{u as J}from"./useRoutables-128af855.js";import{u as P}from"./action-ec1f5bf5.js";import{u as U}from"./useDialogs-7677fd0b.js";import"./SimpleDialog.vue_vue_type_script_setup_true_lang-9013e5dc.js";const Y={key:0},G=o("span",{class:"q-ml-md"},"Error rendering this record",-1),H={key:1},K={class:"row justify-start"},O={class:"col"},X={class:"col"},Z=o("span",{class:"text-caption q-ml-xs text-warning"}," Correct invalid entries and try again ",-1),le=S({__name:"CreateParentView",setup(ee){w({title:`${k} - Create Record`});const{routeType:i,goBack:b}=J(),{log:m}=x(),{confirmDialog:h}=U(),l=P(),f=p.getParentLabelSingular(i),g=p.getParentFieldProps(i),v=A(!0);$(async()=>{try{l.record[_.ID]=B(),l.record[_.TYPE]=i}catch(t){m.error("Error loading create parent view",t)}}),I(()=>{l.$reset()});async function D(){h("Create",`Create ${f} record?`,n.CREATE,"positive",async()=>{try{const t=N(!0,{},l.record);await L.addParent(t),m.info("Successfully created record",{id:t[_.ID],type:i}),b()}catch(t){m.error("Create failed",t)}})}return(t,c)=>(s(),y(W,{bannerIcon:a(n).CREATE,bannerTitle:`Create ${a(f)}`},{default:d(()=>[!a(f)||!a(g)?(s(),u("div",Y,[r(R,{class:"q-mb-md"},{default:d(()=>[r(Q,null,{default:d(()=>[r(C,{name:a(n).WARN,size:"md",color:"warning"},null,8,["name"]),G]),_:1})]),_:1})])):(s(),u("div",H,[r(z,{onSubmit:D,onValidationError:c[0]||(c[0]=e=>v.value=!1),onValidationSuccess:c[1]||(c[1]=e=>v.value=!0)},{default:d(()=>[(s(!0),u(V,null,F(a(g),(e,E)=>(s(),u("div",{key:E,class:"q-mb-md"},[(s(),y(j(e.component),{field:e.field,label:e.label,desc:e.desc,getDefault:e.getDefault,validator:e.validator,validationMessage:e.validationMessage},null,8,["field","label","desc","getDefault","validator","validationMessage"]))]))),128)),o("div",K,[o("div",O,[r(T,{label:"Create",type:"submit",color:"positive",icon:a(n).SAVE},null,8,["icon"])]),o("div",X,[q(o("div",null,[r(C,{name:a(n).WARN,color:"warning"},null,8,["name"]),Z],512),[[M,!v.value]])])])]),_:1})]))]),_:1},8,["bannerIcon","bannerTitle"]))}});export{le as default};