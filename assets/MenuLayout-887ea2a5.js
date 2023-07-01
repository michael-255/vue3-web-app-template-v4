import{b as Me,aW as Ie,a6 as We,aX as Ne,f as Pe,a7 as Re,b4 as Fe,aZ as ze,a_ as ue,a$ as He,r as V,c as i,aY as Ee,b5 as Ue,w as c,ak as ve,p as G,ab as Ge,ae as je,Y as q,l as j,aJ as me,a4 as Ke,b6 as Xe,q as Je,b7 as Ye,O as Ze,W as ea,y as g,z as _,A as o,B as u,b8 as aa,aO as ta,u as n,b9 as la,aQ as ua,J as be,I as p,aR as oa,_ as x,F as he,G as na,K as D,X as ra,E as ge,ba as ia,Q as $,bb as L,ao as ye,S as sa,U as da,T as ca,bc as fa,bd as va,aT as ma,ar as ba,be as ha}from"./index-5cff7ac3.js";import{Q as M,a as h}from"./QItem-7dd31eaa.js";import{Q as ya}from"./QList-30b88ef1.js";import{T as oe}from"./TouchPan-9aff6428.js";import{u as wa}from"./useRoutables-30265fa0.js";import{u as ga}from"./ui-d55f9c7f.js";import"./selection-2bdc6de2.js";const we=150,ka=Me({name:"QDrawer",inheritAttrs:!1,props:{...Ie,...We,side:{type:String,default:"left",validator:a=>["left","right"].includes(a)},width:{type:Number,default:300},mini:Boolean,miniToOverlay:Boolean,miniWidth:{type:Number,default:57},noMiniAnimation:Boolean,breakpoint:{type:Number,default:1023},showIfAbove:Boolean,behavior:{type:String,validator:a=>["default","desktop","mobile"].includes(a),default:"default"},bordered:Boolean,elevated:Boolean,overlay:Boolean,persistent:Boolean,noSwipeOpen:Boolean,noSwipeClose:Boolean,noSwipeBackdrop:Boolean},emits:[...Ne,"onLayout","miniState"],setup(a,{slots:I,emit:v,attrs:F}){const y=Pe(),{proxy:{$q:w}}=y,S=Re(a,w),{preventBodyScroll:s}=Xe(),{registerTimeout:A,removeTimeout:z}=Fe(),t=ze(He,ue);if(t===ue)return console.error("QDrawer needs to be child of QLayout"),ue;let K,C=null,W;const d=V(a.behavior==="mobile"||a.behavior!=="desktop"&&t.totalWidth.value<=a.breakpoint),N=i(()=>a.mini===!0&&d.value!==!0),m=i(()=>N.value===!0?a.miniWidth:a.width),r=V(a.showIfAbove===!0&&d.value===!1?!0:a.modelValue===!0),ne=i(()=>a.persistent!==!0&&(d.value===!0||Se.value===!0));function re(e,l){if(ke(),e!==!1&&t.animate(),b(0),d.value===!0){const f=t.instances[E.value];f!==void 0&&f.belowBreakpoint===!0&&f.hide(!1),T(1),t.isContainer.value!==!0&&s(!0)}else T(0),e!==!1&&ae(!1);A(()=>{e!==!1&&ae(!0),l!==!0&&v("show",e)},we)}function ie(e,l){_e(),e!==!1&&t.animate(),T(0),b(O.value*m.value),te(),l!==!0?A(()=>{v("hide",e)},we):z()}const{show:X,hide:P}=Ee({showing:r,hideOnRouteChange:ne,handleShow:re,handleHide:ie}),{addToHistory:ke,removeFromHistory:_e}=Ue(r,P,ne),H={belowBreakpoint:d,hide:P},k=i(()=>a.side==="right"),O=i(()=>(w.lang.rtl===!0?-1:1)*(k.value===!0?1:-1)),se=V(0),Q=V(!1),J=V(!1),de=V(m.value*O.value),E=i(()=>k.value===!0?"left":"right"),Y=i(()=>r.value===!0&&d.value===!1&&a.overlay===!1?a.miniToOverlay===!0?a.miniWidth:m.value:0),Z=i(()=>a.overlay===!0||a.miniToOverlay===!0||t.view.value.indexOf(k.value?"R":"L")>-1||w.platform.is.ios===!0&&t.isContainer.value===!0),R=i(()=>a.overlay===!1&&r.value===!0&&d.value===!1),Se=i(()=>a.overlay===!0&&r.value===!0&&d.value===!1),Te=i(()=>"fullscreen q-drawer__backdrop"+(r.value===!1&&Q.value===!1?" hidden":"")),Be=i(()=>({backgroundColor:`rgba(0,0,0,${se.value*.4})`})),ce=i(()=>k.value===!0?t.rows.value.top[2]==="r":t.rows.value.top[0]==="l"),Ce=i(()=>k.value===!0?t.rows.value.bottom[2]==="r":t.rows.value.bottom[0]==="l"),pe=i(()=>{const e={};return t.header.space===!0&&ce.value===!1&&(Z.value===!0?e.top=`${t.header.offset}px`:t.header.space===!0&&(e.top=`${t.header.size}px`)),t.footer.space===!0&&Ce.value===!1&&(Z.value===!0?e.bottom=`${t.footer.offset}px`:t.footer.space===!0&&(e.bottom=`${t.footer.size}px`)),e}),xe=i(()=>{const e={width:`${m.value}px`,transform:`translateX(${de.value}px)`};return d.value===!0?e:Object.assign(e,pe.value)}),De=i(()=>"q-drawer__content fit "+(t.isContainer.value!==!0?"scroll":"overflow-auto")),qe=i(()=>`q-drawer q-drawer--${a.side}`+(J.value===!0?" q-drawer--mini-animate":"")+(a.bordered===!0?" q-drawer--bordered":"")+(S.value===!0?" q-drawer--dark q-dark":"")+(Q.value===!0?" no-transition":r.value===!0?"":" q-layout--prevent-focus")+(d.value===!0?" fixed q-drawer--on-top q-drawer--mobile q-drawer--top-padding":` q-drawer--${N.value===!0?"mini":"standard"}`+(Z.value===!0||R.value!==!0?" fixed":"")+(a.overlay===!0||a.miniToOverlay===!0?" q-drawer--on-top":"")+(ce.value===!0?" q-drawer--top-padding":""))),Ae=i(()=>{const e=w.lang.rtl===!0?a.side:E.value;return[[oe,$e,void 0,{[e]:!0,mouse:!0}]]}),Oe=i(()=>{const e=w.lang.rtl===!0?E.value:a.side;return[[oe,fe,void 0,{[e]:!0,mouse:!0}]]}),Qe=i(()=>{const e=w.lang.rtl===!0?E.value:a.side;return[[oe,fe,void 0,{[e]:!0,mouse:!0,mouseAllDir:!0}]]});function ee(){Le(d,a.behavior==="mobile"||a.behavior!=="desktop"&&t.totalWidth.value<=a.breakpoint)}c(d,e=>{e===!0?(K=r.value,r.value===!0&&P(!1)):a.overlay===!1&&a.behavior!=="mobile"&&K!==!1&&(r.value===!0?(b(0),T(0),te()):X(!1))}),c(()=>a.side,(e,l)=>{t.instances[l]===H&&(t.instances[l]=void 0,t[l].space=!1,t[l].offset=0),t.instances[e]=H,t[e].size=m.value,t[e].space=R.value,t[e].offset=Y.value}),c(t.totalWidth,()=>{(t.isContainer.value===!0||document.qScrollPrevented!==!0)&&ee()}),c(()=>a.behavior+a.breakpoint,ee),c(t.isContainer,e=>{r.value===!0&&s(e!==!0),e===!0&&ee()}),c(t.scrollbarWidth,()=>{b(r.value===!0?0:void 0)}),c(Y,e=>{B("offset",e)}),c(R,e=>{v("onLayout",e),B("space",e)}),c(k,()=>{b()}),c(m,e=>{b(),le(a.miniToOverlay,e)}),c(()=>a.miniToOverlay,e=>{le(e,m.value)}),c(()=>w.lang.rtl,()=>{b()}),c(()=>a.mini,()=>{a.noMiniAnimation||a.modelValue===!0&&(Ve(),t.animate())}),c(N,e=>{v("miniState",e)});function b(e){e===void 0?ve(()=>{e=r.value===!0?0:m.value,b(O.value*e)}):(t.isContainer.value===!0&&k.value===!0&&(d.value===!0||Math.abs(e)===m.value)&&(e+=O.value*t.scrollbarWidth.value),de.value=e)}function T(e){se.value=e}function ae(e){const l=e===!0?"remove":t.isContainer.value!==!0?"add":"";l!==""&&document.body.classList[l]("q-body--drawer-toggle")}function Ve(){C!==null&&clearTimeout(C),y.proxy&&y.proxy.$el&&y.proxy.$el.classList.add("q-drawer--mini-animate"),J.value=!0,C=setTimeout(()=>{C=null,J.value=!1,y&&y.proxy&&y.proxy.$el&&y.proxy.$el.classList.remove("q-drawer--mini-animate")},150)}function $e(e){if(r.value!==!1)return;const l=m.value,f=G(e.distance.x,0,l);if(e.isFinal===!0){f>=Math.min(75,l)===!0?X():(t.animate(),T(0),b(O.value*l)),Q.value=!1;return}b((w.lang.rtl===!0?k.value!==!0:k.value)?Math.max(l-f,0):Math.min(0,f-l)),T(G(f/l,0,1)),e.isFirst===!0&&(Q.value=!0)}function fe(e){if(r.value!==!0)return;const l=m.value,f=e.direction===a.side,U=(w.lang.rtl===!0?f!==!0:f)?G(e.distance.x,0,l):0;if(e.isFinal===!0){Math.abs(U)<Math.min(75,l)===!0?(t.animate(),T(1),b(0)):P(),Q.value=!1;return}b(O.value*U),T(G(1-U/l,0,1)),e.isFirst===!0&&(Q.value=!0)}function te(){s(!1),ae(!0)}function B(e,l){t.update(a.side,e,l)}function Le(e,l){e.value!==l&&(e.value=l)}function le(e,l){B("size",e===!0?a.miniWidth:l)}return t.instances[a.side]=H,le(a.miniToOverlay,m.value),B("space",R.value),B("offset",Y.value),a.showIfAbove===!0&&a.modelValue!==!0&&r.value===!0&&a["onUpdate:modelValue"]!==void 0&&v("update:modelValue",!0),Ge(()=>{v("onLayout",R.value),v("miniState",N.value),K=a.showIfAbove===!0;const e=()=>{(r.value===!0?re:ie)(!1,!0)};if(t.totalWidth.value!==0){ve(e);return}W=c(t.totalWidth,()=>{W(),W=void 0,r.value===!1&&a.showIfAbove===!0&&d.value===!1?X(!1):e()})}),je(()=>{W!==void 0&&W(),C!==null&&(clearTimeout(C),C=null),r.value===!0&&te(),t.instances[a.side]===H&&(t.instances[a.side]=void 0,B("size",0),B("offset",0),B("space",!1))}),()=>{const e=[];d.value===!0&&(a.noSwipeOpen===!1&&e.push(q(j("div",{key:"open",class:`q-drawer__opener fixed-${a.side}`,"aria-hidden":"true"}),Ae.value)),e.push(me("div",{ref:"backdrop",class:Te.value,style:Be.value,"aria-hidden":"true",onClick:P},void 0,"backdrop",a.noSwipeBackdrop!==!0&&r.value===!0,()=>Qe.value)));const l=N.value===!0&&I.mini!==void 0,f=[j("div",{...F,key:""+l,class:[De.value,F.class]},l===!0?I.mini():Ke(I.default))];return a.elevated===!0&&r.value===!0&&f.push(j("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),e.push(me("aside",{ref:"content",class:qe.value,style:xe.value},f,"contentclose",a.noSwipeClose!==!0&&d.value===!0,()=>Oe.value)),j("div",{class:"q-drawer-container"},e)}}}),_a="/vue3-web-app-template-v4/assets/menu-avatar-0f3de820.png",Sa={class:"row justify-center"},Ta=ge("img",{src:_a},null,-1),Qa=Je({__name:"MenuLayout",setup(a){const{goBack:I}=wa(),v=ga(),F=Ye(),y=Ze.getGroupOptions(ea.Values.core);return(w,S)=>(g(),_(ha,{view:"hHh LpR lff"},{default:o(()=>[u(aa,{elevated:"",class:ta(`bg-${n(la)}`)},{default:o(()=>[u(ua,null,{default:o(()=>[u(be,{flat:"",round:"",icon:n(p).MENU_STANDARD,onClick:S[0]||(S[0]=s=>n(v).drawer=!n(v).drawer)},null,8,["icon"]),u(oa,null,{default:o(()=>[x(he(n(na)),1)]),_:1}),n(F).name!==n(D).Values.Dashboard?(g(),_(be,{key:0,flat:"",round:"",icon:n(p).BACK,onClick:S[1]||(S[1]=s=>n(I)())},null,8,["icon"])):ra("",!0)]),_:1})]),_:1},8,["class"]),u(ka,{modelValue:n(v).drawer,"onUpdate:modelValue":S[2]||(S[2]=s=>n(v).drawer=s),width:250,"show-if-above":"",bordered:"",side:"left"},{default:o(()=>[ge("div",Sa,[u(ia,{size:"96px",class:"q-my-md"},{default:o(()=>[Ta]),_:1})]),u(ya,null,{default:o(()=>[q((g(),_(M,{clickable:"",to:{name:n(D).Values.Dashboard}},{default:o(()=>[u(h,{avatar:""},{default:o(()=>[u($,{color:"primary",name:n(p).DASHBOARD},null,8,["name"])]),_:1}),u(h,null,{default:o(()=>[x("Dashboard")]),_:1})]),_:1},8,["to"])),[[L]]),u(ye,{spaced:"md",inset:""}),(g(!0),sa(da,null,ca(n(y),(s,A)=>{var z,t;return q((g(),_(M,{key:A,clickable:"",to:{name:n(D).Values.DataRecords,params:{group:(z=s==null?void 0:s.value)==null?void 0:z.group,type:(t=s==null?void 0:s.value)==null?void 0:t.type}}},{default:o(()=>[u(h,{avatar:""},{default:o(()=>[u($,{color:"primary",name:s.icon},null,8,["name"])]),_:2},1024),u(h,null,{default:o(()=>[x(he(s.label),1)]),_:2},1024)]),_:2},1032,["to"])),[[L]])}),128)),u(ye,{spaced:"md",inset:""}),q((g(),_(M,{clickable:"",to:{name:n(D).Values.Settings}},{default:o(()=>[u(h,{avatar:""},{default:o(()=>[u($,{color:"primary",name:n(p).SETTINGS},null,8,["name"])]),_:1}),u(h,null,{default:o(()=>[x("Settings")]),_:1})]),_:1},8,["to"])),[[L]]),q((g(),_(M,{clickable:"",to:{name:n(D).Values.FAQ}},{default:o(()=>[u(h,{avatar:""},{default:o(()=>[u($,{color:"primary",name:n(p).HELP},null,8,["name"])]),_:1}),u(h,null,{default:o(()=>[x("FAQ")]),_:1})]),_:1},8,["to"])),[[L]]),q((g(),_(M,{clickable:"",to:{name:n(D).Values.About}},{default:o(()=>[u(h,{avatar:""},{default:o(()=>[u($,{color:"primary",name:n(p).INFO},null,8,["name"])]),_:1}),u(h,null,{default:o(()=>[x("About")]),_:1})]),_:1},8,["to"])),[[L]]),q((g(),_(M,{clickable:"","active-class":"text-warning",to:{name:n(D).Values.Donate}},{default:o(()=>[u(h,{avatar:""},{default:o(()=>[u($,{color:"warning",name:n(p).DONATE},null,8,["name"])]),_:1}),u(h,null,{default:o(()=>[x("Donate")]),_:1})]),_:1},8,["to"])),[[L]])]),_:1})]),_:1},8,["modelValue"]),u(fa,null,{default:o(()=>[u(n(va),null,{default:o(({Component:s,route:A})=>[u(ma,{name:"global-fade",mode:"out-in"},{default:o(()=>[(g(),_(ba(s),{key:A.path}))]),_:2},1024)]),_:1})]),_:1})]),_:1}))}});export{Qa as default};
