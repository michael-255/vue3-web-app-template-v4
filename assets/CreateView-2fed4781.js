import{q as $,N as k,G as x,t as B,O as C,r as R,aa as h,$ as n,ao as A,x as D,y as o,z as p,A as b,u as r,R as f,B as y,T as I,S as T,E as _,J as q,I as i,X as F,Y as N,Q,ap as L,D as j,aq as G}from"./index-24dbccec.js";import{Q as M}from"./QForm-dd1a2df2.js";import{_ as z}from"./ErrorStates.vue_vue_type_script_setup_true_lang-9c0cc8d9.js";import{_ as J}from"./ResponsivePage.vue_vue_type_script_setup_true_lang-de00a452.js";import{u as O}from"./useRoutables-4d249602.js";import{u as U}from"./action-b51c5118.js";import{u as W}from"./useDialogs-81031fdf.js";import"./QSelect-1164f6a3.js";import"./QItem-4a4784b7.js";import"./QItemLabel-2ad87e79.js";import"./QMenu-315589be.js";import"./selection-f172746f.js";import"./ui-e8c912c8.js";const X={key:0},Y={class:"row justify-center q-my-sm"},H={class:"row justify-center"},K=_("span",{class:"text-caption q-ml-xs text-warning"}," Correct invalid entries and try again ",-1),me=$({__name:"CreateView",setup(P){k({title:`${x} - Create Record`});const{routeGroup:c,routeType:t,routeCoreId:v,goBack:w}=O(),{log:l}=B(),{confirmDialog:V}=W(),a=U(),u=C.getLabel(c,t,"singular"),g=C.getFields(c,t),d=R(!0);h(async()=>{try{a.record[n.Values.id]=A(),a.record[n.Values.type]=t,v&&(a.record[n.Values.coreId]=v)}catch(e){l.error("Error loading create view",e)}}),D(()=>{a.$reset()});async function E(){V("Create",`Create ${u} record?`,i.CREATE,"positive",async()=>{try{const e=L(!0,{},a.record);await j.addRecord(c,t,e),l.info("Successfully created record",{id:e[n.Values.id],type:t}),w()}catch(e){l.error("Create failed",e)}})}return(e,s)=>(o(),p(J,{bannerIcon:r(i).CREATE,bannerTitle:`Create ${r(u)}`},{default:b(()=>[r(u)&&r(g)?(o(),f("div",X,[y(M,{onSubmit:E,onValidationError:s[0]||(s[0]=m=>d.value=!1),onValidationSuccess:s[1]||(s[1]=m=>d.value=!0)},{default:b(()=>[(o(!0),f(I,null,T(r(g),(m,S)=>(o(),f("div",{key:S,class:"q-mb-md"},[(o(),p(G(m),{inspecting:!1}))]))),128)),_("div",Y,[y(q,{label:"Create",type:"submit",color:"positive",icon:r(i).SAVE},null,8,["icon"])]),F(_("div",H,[y(Q,{name:r(i).WARN,color:"warning"},null,8,["name"]),K],512),[[N,!d.value]])]),_:1})])):(o(),p(z,{key:1,error:"unknown"}))]),_:1},8,["bannerIcon","bannerTitle"]))}});export{me as default};
