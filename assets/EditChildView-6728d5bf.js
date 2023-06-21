import{d as S,b as V,A as k,e as $,D as y,r as x,$ as B,aj as A,f as b,h as Q,j as s,k as g,l as c,u as a,q as u,m as r,z as F,Q as C,I as l,y as N,B as R,F as q,s as M,n,x as U,C as j,E as T,ah as L,J as z,ai as W}from"./index-5d245f77.js";import{Q as J}from"./QForm-c9bc2434.js";import{_ as O}from"./ResponsivePage.vue_vue_type_script_setup_true_lang-723488f3.js";import{_ as G}from"./ParentInfoCard.vue_vue_type_script_setup_true_lang-5dc6d011.js";import{u as H}from"./useRoutables-128af855.js";import{u as K}from"./action-ec1f5bf5.js";import{u as X}from"./useDialogs-7677fd0b.js";import"./SimpleDialog.vue_vue_type_script_setup_true_lang-9013e5dc.js";const Y={key:0},Z=n("span",{class:"q-ml-md"},"Error rendering this record",-1),P={key:1},ee={class:"row justify-start"},ae={class:"col"},te={class:"col"},oe=n("span",{class:"text-caption q-ml-xs text-warning"}," Correct invalid entries and try again ",-1),pe=S({__name:"EditChildView",setup(se){V({title:`${k} - Edit Record`});const{routeType:m,routeId:p,goBack:w}=H(),{log:f}=$(),{confirmDialog:D}=X(),i=K(),_=y.getChildLabelSingular(m),h=y.getChildFieldProps(m),v=x(!0);B(async()=>{try{if(await A.isValid(p)){const e=await b.getChild(p);e&&Object.keys(e).forEach(t=>{i.record[t]=e[t]})}}catch(e){f.error("Error loading edit child view",e)}}),Q(()=>{i.$reset()});async function E(){D("Update",`Update ${_} record?`,l.SAVE,"positive",async()=>{try{const e=L(!0,{},i.record);await b.updateChild(p,e),f.info("Successfully updated record",{id:e[z.ID],type:m}),w()}catch(e){f.error("Update failed",e)}})}return(e,t)=>(s(),g(O,{bannerIcon:a(l).EDIT,bannerTitle:`Edit ${a(_)}`},{default:c(()=>[!a(_)||!a(h)?(s(),u("div",Y,[r(N,{class:"q-mb-md"},{default:c(()=>[r(F,null,{default:c(()=>[r(C,{name:a(l).WARN,size:"md",color:"warning"},null,8,["name"]),Z]),_:1})]),_:1})])):(s(),u("div",P,[r(J,{onSubmit:E,onValidationError:t[0]||(t[0]=d=>v.value=!1),onValidationSuccess:t[1]||(t[1]=d=>v.value=!0)},{default:c(()=>{var d;return[(d=a(i).record)!=null&&d.parentId?(s(),g(G,{key:0,parentId:a(i).record.parentId},null,8,["parentId"])):R("",!0),(s(!0),u(q,null,M(a(h),(o,I)=>(s(),u("div",{key:I,class:"q-mb-md"},[(s(),g(W(o.component),{field:o.field,label:o.label,desc:o.desc,getDefault:o.getDefault,validator:o.validator,validationMessage:o.validationMessage},null,8,["field","label","desc","getDefault","validator","validationMessage"]))]))),128)),n("div",ee,[n("div",ae,[r(U,{label:"Update",type:"submit",color:"positive",icon:a(l).SAVE},null,8,["icon"])]),n("div",te,[j(n("div",null,[r(C,{name:a(l).WARN,color:"warning"},null,8,["name"]),oe],512),[[T,!v.value]])])])]}),_:1})]))]),_:1},8,["bannerIcon","bannerTitle"]))}});export{pe as default};
