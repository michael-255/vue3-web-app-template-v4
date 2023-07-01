import{f as N,r as Q,q as v,y as p,z as k,A as n,u as a,M as w,B as e,C as D,aP as I,Q as H,E as _,F as g,_ as S,aQ as z,J as y,L as T,I as b,aR as B,aS as E,S as R,T as K,U as V,aK as u,O as j,as as A,aT as L}from"./index-ef11a4d2.js";import{Q as M}from"./QSelect-f9ed5694.js";import{u as P}from"./ui-29eb266c.js";const U=()=>!0;function J(s){const c={};return s.forEach(l=>{c[l]=U}),c}function m(){const{emit:s,proxy:c}=N(),l=Q(null);function d(){l.value.show()}function i(){l.value.hide()}function t(r){s("ok",r),i()}function o(){s("hide")}return Object.assign(c,{show:d,hide:i}),{dialogRef:l,onDialogHide:o,onDialogOK:t,onDialogCancel:i}}const F=["ok","hide"];m.emits=F;m.emitsObject=J(F);const W={class:"text-h6"},Y=v({__name:"ConfirmationDialog",props:{title:{},message:{},icon:{},color:{}},emits:[...m.emits],setup(s){const c=s,{dialogRef:l,onDialogHide:d,onDialogOK:i,onDialogCancel:t}=m();return(o,r)=>(p(),k(w,{ref_key:"dialogRef",ref:l,onHide:a(d)},{default:n(()=>[e(T,{class:"q-dialog-plugin"},{default:n(()=>[e(D,{class:I(`bg-${c.color} text-white q-py-sm`)},{default:n(()=>[e(H,{name:o.icon,size:"sm",class:"q-pb-sm q-mr-md"},null,8,["name"]),_("span",W,g(o.title),1)]),_:1},8,["class"]),e(D,{class:"q-mt-md"},{default:n(()=>[S(g(o.message),1)]),_:1}),e(z,{align:"right"},{default:n(()=>[e(y,{flat:"",label:"Cancel",onClick:a(t)},null,8,["onClick"]),e(y,{flat:"",label:"Confirm",color:o.color,onClick:a(i)},null,8,["color","onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}}),G={class:"text-h6"},X=v({__name:"DismissalDialog",props:{title:{},message:{},icon:{},color:{}},emits:[...m.emits],setup(s){const c=s,{dialogRef:l,onDialogHide:d,onDialogOK:i}=m();return(t,o)=>(p(),k(w,{ref_key:"dialogRef",ref:l,onHide:a(d)},{default:n(()=>[e(T,{class:"q-dialog-plugin"},{default:n(()=>[e(D,{class:I(`bg-${c.color} text-white q-py-sm`)},{default:n(()=>[e(H,{name:t.icon,size:"sm",class:"q-pb-sm q-mr-md"},null,8,["name"]),_("span",G,g(t.title),1)]),_:1},8,["class"]),e(D,{class:"q-mt-md"},{default:n(()=>[S(g(t.message),1)]),_:1}),e(z,{align:"right"},{default:n(()=>[e(y,{flat:"",label:"Dismiss",onClick:a(i)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}}),Z={class:"text-h5"},ee={class:"text-weight-bold"},oe=v({__name:"InspectionDialog",props:{title:{},fieldProps:{},record:{}},emits:[...m.emits],setup(s){const{dialogRef:c,onDialogHide:l,onDialogOK:d}=m();return(i,t)=>(p(),k(w,{ref_key:"dialogRef",ref:c,"transition-show":"slide-up","transition-hide":"slide-down",maximized:"",onHide:a(l)},{default:n(()=>[e(E,{class:"bg-info text-white",style:{"max-height":"50px"}},{default:n(()=>[e(H,{name:a(b).INSPECT,size:"sm",class:"q-mx-sm"},null,8,["name"]),e(B,null,{default:n(()=>[S("Inspect")]),_:1}),e(y,{flat:"",round:"",icon:a(b).CLOSE,onClick:a(d)},null,8,["icon","onClick"])]),_:1}),e(T,{class:"q-dialog-plugin"},{default:n(()=>[e(D,null,{default:n(()=>[_("p",Z,g(i.title),1),(p(!0),R(V,null,K(i.fieldProps,(o,r)=>{var f;return p(),R("div",{key:r,class:"q-mb-md"},[_("div",ee,g(o.label),1),_("div",null,g(o.inspectFormat((f=i.record)==null?void 0:f[o==null?void 0:o.field])),1)])}),128))]),_:1})]),_:1})]),_:1},8,["onHide"]))}}),ne={class:"text-h5"},te=_("p",null,"Select how far back you want the charts to display record data.",-1),se=v({__name:"ChartingDialog",props:{title:{},type:{},id:{}},emits:[...m.emits],setup(s){const c=s,{dialogRef:l,onDialogHide:d,onDialogOK:i}=m(),t=P(),o=Q(null),r=Q([u[u["One Week"]],u[u["One Month"]],u[u["Three Months"]],u[u["Six Months"]],u[u["One Year"]],u[u["All Time"]]]),f=j.getCharts(c.type);function x(h){return h!=null&&h!==""}return(h,q)=>(p(),k(w,{ref_key:"dialogRef",ref:l,"transition-show":"slide-up","transition-hide":"slide-down",maximized:"",onHide:a(d)},{default:n(()=>[e(E,{class:"bg-info text-white",style:{"max-height":"50px"}},{default:n(()=>[e(H,{name:a(b).CHARTS,size:"sm",class:"q-mx-sm"},null,8,["name"]),e(B,null,{default:n(()=>[S("Charts")]),_:1}),e(y,{flat:"",round:"",icon:a(b).CLOSE,onClick:a(i)},null,8,["icon","onClick"])]),_:1}),e(T,{class:"q-dialog-plugin"},{default:n(()=>[e(D,null,{default:n(()=>[_("p",ne,g(h.title),1),te,e(M,{modelValue:a(t).chartTime,"onUpdate:modelValue":q[0]||(q[0]=C=>a(t).chartTime=C),ref_key:"inputRef",ref:o,label:"Chart Time",options:r.value,rules:[C=>x(C)||"* Required"],"emit-value":"","map-options":"","options-dense":"",dense:"",outlined:"",color:"primary",onBlur:q[1]||(q[1]=C=>{var O,$;return!!(($=(O=o.value)==null?void 0:O.value)!=null&&$.validate())})},null,8,["modelValue","options","rules"]),(p(!0),R(V,null,K(a(f),(C,O)=>(p(),R("div",{key:O,class:"q-mb-md"},[(p(),k(A(C),{type:h.type,id:h.id},null,8,["type","id"]))]))),128))]),_:1})]),_:1})]),_:1},8,["onHide"]))}});function ce(){const s=L();function c(t,o,r,f,x){s.dialog({component:Y,componentProps:{title:t,message:o,icon:r,color:f}}).onOk(()=>{x()})}function l(t,o,r=b.INFO,f="info"){s.dialog({component:X,componentProps:{title:t,message:o,icon:r,color:f}})}function d(t,o,r){s.dialog({component:oe,componentProps:{title:t,fieldProps:o,record:r}})}function i(t,o,r){s.dialog({component:se,componentProps:{title:t,type:o,id:r}})}return{confirmDialog:c,dismissDialog:l,inspectDialog:d,chartsDialog:i}}export{ce as u};
