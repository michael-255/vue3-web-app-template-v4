import{d as S,b as V,A as $,e as k,D as y,r as A,$ as x,aj as B,J as u,ag as R,h as N,j as o,k as C,l as m,u as e,q as p,m as s,z as Q,Q as b,I as i,y as T,B as F,F as q,s as M,n,x as j,C as L,E as z,ah as W,f as J,ai as U}from"./index-5d245f77.js";import{Q as Y}from"./QForm-c9bc2434.js";import{_ as G}from"./ResponsivePage.vue_vue_type_script_setup_true_lang-723488f3.js";import{_ as H}from"./ParentInfoCard.vue_vue_type_script_setup_true_lang-5dc6d011.js";import{u as K}from"./useRoutables-128af855.js";import{u as O}from"./action-ec1f5bf5.js";import{u as X}from"./useDialogs-7677fd0b.js";import"./SimpleDialog.vue_vue_type_script_setup_true_lang-9013e5dc.js";const Z={key:0},P=n("span",{class:"q-ml-md"},"Error rendering this record",-1),ee={key:1},ae={class:"row justify-start"},te={class:"col"},re={class:"col"},oe=n("span",{class:"text-caption q-ml-xs text-warning"}," Correct invalid entries and try again ",-1),_e=S({__name:"CreateChildView",setup(se){V({title:`${$} - Create Record`});const{routeType:l,routeParentId:_,goBack:I}=K(),{log:f}=k(),{confirmDialog:w}=X(),a=O(),v=y.getChildLabelSingular(l),h=y.getChildFieldProps(l),g=A(!0);x(async()=>{try{if(await B.isValid(_))a.record[u.ID]=R(),a.record[u.TYPE]=l,a.record[u.PARENT_ID]=_;else throw new Error(`Invalid parent id: ${_}`)}catch(t){f.error("Error loading create child view",t)}}),N(()=>{a.$reset()});async function D(){w("Create",`Create ${v} record?`,i.CREATE,"positive",async()=>{try{const t=W(!0,{},a.record);await J.addChild(t),f.info("Successfully created record",{id:t[u.ID],type:l}),I()}catch(t){f.error("Create failed",t)}})}return(t,d)=>(o(),C(G,{bannerIcon:e(i).CREATE,bannerTitle:`Create ${e(v)}`},{default:m(()=>[!e(v)||!e(h)?(o(),p("div",Z,[s(T,{class:"q-mb-md"},{default:m(()=>[s(Q,null,{default:m(()=>[s(b,{name:e(i).WARN,size:"md",color:"warning"},null,8,["name"]),P]),_:1})]),_:1})])):(o(),p("div",ee,[s(Y,{onSubmit:D,onValidationError:d[0]||(d[0]=c=>g.value=!1),onValidationSuccess:d[1]||(d[1]=c=>g.value=!0)},{default:m(()=>{var c;return[(c=e(a).record)!=null&&c.parentId?(o(),C(H,{key:0,parentId:e(a).record.parentId},null,8,["parentId"])):F("",!0),(o(!0),p(q,null,M(e(h),(r,E)=>(o(),p("div",{key:E,class:"q-mb-md"},[(o(),C(U(r.component),{field:r.field,label:r.label,desc:r.desc,getDefault:r.getDefault,validator:r.validator,validationMessage:r.validationMessage},null,8,["field","label","desc","getDefault","validator","validationMessage"]))]))),128)),n("div",ae,[n("div",te,[s(j,{label:"Create",type:"submit",color:"positive",icon:e(i).SAVE},null,8,["icon"])]),n("div",re,[L(n("div",null,[s(b,{name:e(i).WARN,color:"warning"},null,8,["name"]),oe],512),[[z,!g.value]])])])]}),_:1})]))]),_:1},8,["bannerIcon","bannerTitle"]))}});export{_e as default};