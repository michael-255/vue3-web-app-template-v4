import{k as D,U as I,A as R,l as $,D as c,r as x,Y as C,am as g,m as V,n as t,p as f,w as y,y as e,G as a,q as l,L as A,M as S,B as w,I as s,v as _,H as U,J as q,Q as L,an as Q}from"./index-d68b0eaf.js";import{Q as T}from"./QForm-23e3b5e0.js";import{_ as F}from"./ErrorStates.vue_vue_type_script_setup_true_lang-f09fb14b.js";import{_ as N}from"./ResponsivePage.vue_vue_type_script_setup_true_lang-f78d365d.js";import{u as j}from"./action-bacae855.js";import{u as M}from"./useDialogs-930d4a32.js";import{u as G}from"./useRouting-2e4d5d3d.js";import"./QSelect-eea99a9e.js";import"./QItem-6b6e34f3.js";import"./QItemLabel-e1600f7f.js";import"./QMenu-7efd4149.js";import"./selection-319d849e.js";import"./ui-903b8f03.js";const H={key:0},J={key:0,class:"row justify-center q-my-sm"},K={key:1,class:"row justify-center q-my-sm"},O={class:"row justify-center"},W=_("span",{class:"text-caption q-ml-xs text-warning"}," Correct invalid entries and try again ",-1),le=D({__name:"EditView",setup(Y){I({title:`${R} - Edit Record`});const{routeTable:r,routeId:b,goBack:k}=G(),{log:d}=$(),{confirmDialog:E}=M(),n=j(),m=c.getLabel(r,"singular"),v=c.getFieldComponents(r),u=x(!0);C(async()=>{try{const o=await c.getRecord(r,b);if(o)g(!0,n.record,o);else throw new Error("Record not found")}catch(o){d.error("Error loading edit view",o)}}),V(()=>{n.$reset()});async function h(){E("Update",`Update ${m} record?`,s.EDIT,"positive",async()=>{try{await c.putRecord(r,g(!0,{},n.record)),d.info("Record updated",{table:r,id:n.record.id}),k()}catch(o){d.error("Update failed",o)}})}return(o,i)=>(t(),f(N,{bannerIcon:e(s).EDIT,bannerTitle:`Edit ${e(m)}`},{default:y(()=>[e(m)&&e(v).length>0?(t(),a("div",H,[l(T,{onSubmit:h,onValidationError:i[0]||(i[0]=p=>u.value=!1),onValidationSuccess:i[1]||(i[1]=p=>u.value=!0)},{default:y(()=>[(t(!0),a(A,null,S(e(v),(p,B)=>(t(),a("div",{key:B,class:"q-mb-md"},[(t(),f(Q(p),{inspecting:!1}))]))),128)),e(n).record.activated?(t(),a("div",K,[l(w,{disable:"",label:"Active",color:"warning",icon:e(s).LOCK},null,8,["icon"])])):(t(),a("div",J,[l(w,{label:"Update",type:"submit",color:"positive",icon:e(s).SAVE},null,8,["icon"])])),_("div",O,[U(_("div",null,[l(L,{name:e(s).WARN,color:"warning"},null,8,["name"]),W],512),[[q,!u.value]])])]),_:1})])):(t(),f(F,{key:1,error:"unknown"}))]),_:1},8,["bannerIcon","bannerTitle"]))}});export{le as default};