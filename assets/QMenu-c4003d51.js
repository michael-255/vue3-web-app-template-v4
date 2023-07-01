import{f as ae,r as q,by as be,aG as N,ak as ye,bB as U,w as H,ab as Te,ae as O,bD as we,a9 as D,bP as G,ax as pe,bQ as Ee,b as Ce,aW as He,a6 as ke,bR as Se,aX as We,c as C,a7 as Me,bS as qe,b4 as Pe,bT as Be,aY as Le,bU as Ae,bV as ze,bW as Z,bX as Re,aH as Fe,bY as $e,a8 as De,bZ as Ke,l as J,a4 as Oe,aT as je,au as Qe,b_ as Ve,s as Xe}from"./index-408197b4.js";import{c as Ye}from"./selection-cd46e154.js";const Ie={target:{default:!0},noParentEvent:Boolean,contextMenu:Boolean};function _e({showing:e,avoidEmit:n,configureAnchorEl:o}){const{props:t,proxy:l,emit:c}=ae(),i=q(null);let f=null;function h(a){return i.value===null?!1:a===void 0||a.touches===void 0||a.touches.length<=1}const s={};o===void 0&&(Object.assign(s,{hide(a){l.hide(a)},toggle(a){l.toggle(a),a.qAnchorHandled=!0},toggleKey(a){be(a,13)===!0&&s.toggle(a)},contextClick(a){l.hide(a),N(a),ye(()=>{l.show(a),a.qAnchorHandled=!0})},prevent:N,mobileTouch(a){if(s.mobileCleanup(a),h(a)!==!0)return;l.hide(a),i.value.classList.add("non-selectable");const r=a.target;U(s,"anchor",[[r,"touchmove","mobileCleanup","passive"],[r,"touchend","mobileCleanup","passive"],[r,"touchcancel","mobileCleanup","passive"],[i.value,"contextmenu","prevent","notPassive"]]),f=setTimeout(()=>{f=null,l.show(a),a.qAnchorHandled=!0},300)},mobileCleanup(a){i.value.classList.remove("non-selectable"),f!==null&&(clearTimeout(f),f=null),e.value===!0&&a!==void 0&&Ye()}}),o=function(a=t.contextMenu){if(t.noParentEvent===!0||i.value===null)return;let r;a===!0?l.$q.platform.is.mobile===!0?r=[[i.value,"touchstart","mobileTouch","passive"]]:r=[[i.value,"mousedown","hide","passive"],[i.value,"contextmenu","contextClick","notPassive"]]:r=[[i.value,"click","toggle","passive"],[i.value,"keyup","toggleKey","passive"]],U(s,"anchor",r)});function d(){we(s,"anchor")}function g(a){for(i.value=a;i.value.classList.contains("q-anchor--skip");)i.value=i.value.parentNode;o()}function x(){if(t.target===!1||t.target===""||l.$el.parentNode===null)i.value=null;else if(t.target===!0)g(l.$el.parentNode);else{let a=t.target;if(typeof t.target=="string")try{a=document.querySelector(t.target)}catch{a=void 0}a!=null?(i.value=a.$el||a,o()):(i.value=null,console.error(`Anchor: target "${t.target}" not found`))}}return H(()=>t.contextMenu,a=>{i.value!==null&&(d(),o(a))}),H(()=>t.target,()=>{i.value!==null&&d(),x()}),H(()=>t.noParentEvent,a=>{i.value!==null&&(a===!0?d():o())}),Te(()=>{x(),n!==!0&&t.modelValue===!0&&i.value===null&&c("update:modelValue",!1)}),O(()=>{f!==null&&clearTimeout(f),d()}),{anchorEl:i,canShow:h,anchorEvents:s}}function Ne(e,n){const o=q(null);let t;function l(f,h){const s=`${h!==void 0?"add":"remove"}EventListener`,d=h!==void 0?h:t;f!==window&&f[s]("scroll",d,D.passive),window[s]("scroll",d,D.passive),t=h}function c(){o.value!==null&&(l(o.value),o.value=null)}const i=H(()=>e.noParentEvent,()=>{o.value!==null&&(c(),n())});return O(i),{localScrollTarget:o,unconfigureScrollTarget:c,changeScrollEvent:l}}const{notPassiveCapture:P}=D,p=[];function B(e){const n=e.target;if(n===void 0||n.nodeType===8||n.classList.contains("no-pointer-events")===!0)return;let o=G.length-1;for(;o>=0;){const t=G[o].$;if(t.type.name!=="QDialog")break;if(t.props.seamless!==!0)return;o--}for(let t=p.length-1;t>=0;t--){const l=p[t];if((l.anchorEl.value===null||l.anchorEl.value.contains(n)===!1)&&(n===document.body||l.innerRef.value!==null&&l.innerRef.value.contains(n)===!1))e.qClickOutside=!0,l.onClickOutside(e);else return}}function Ue(e){p.push(e),p.length===1&&(document.addEventListener("mousedown",B,P),document.addEventListener("touchstart",B,P))}function ee(e){const n=p.findIndex(o=>o===e);n>-1&&(p.splice(n,1),p.length===0&&(document.removeEventListener("mousedown",B,P),document.removeEventListener("touchstart",B,P)))}let te,ne;function oe(e){const n=e.split(" ");return n.length!==2?!1:["top","center","bottom"].includes(n[0])!==!0?(console.error("Anchor/Self position must start with one of top/center/bottom"),!1):["left","middle","right","start","end"].includes(n[1])!==!0?(console.error("Anchor/Self position must end with one of left/middle/right/start/end"),!1):!0}function Ge(e){return e?!(e.length!==2||typeof e[0]!="number"||typeof e[1]!="number"):!0}const K={"start#ltr":"left","start#rtl":"right","end#ltr":"right","end#rtl":"left"};["left","middle","right"].forEach(e=>{K[`${e}#ltr`]=e,K[`${e}#rtl`]=e});function le(e,n){const o=e.split(" ");return{vertical:o[0],horizontal:K[`${o[1]}#${n===!0?"rtl":"ltr"}`]}}function Ze(e,n){let{top:o,left:t,right:l,bottom:c,width:i,height:f}=e.getBoundingClientRect();return n!==void 0&&(o-=n[1],t-=n[0],c+=n[1],l+=n[0],i+=n[0],f+=n[1]),{top:o,bottom:c,height:f,left:t,right:l,width:i,middle:t+(l-t)/2,center:o+(c-o)/2}}function Je(e,n,o){let{top:t,left:l}=e.getBoundingClientRect();return t+=n.top,l+=n.left,o!==void 0&&(t+=o[1],l+=o[0]),{top:t,bottom:t+1,height:1,left:l,right:l+1,width:1,middle:l,center:t}}function et(e,n){return{top:0,center:n/2,bottom:n,left:0,middle:e/2,right:e}}function ie(e,n,o,t){return{top:e[o.vertical]-n[t.vertical],left:e[o.horizontal]-n[t.horizontal]}}function ue(e,n=0){if(e.targetEl===null||e.anchorEl===null||n>5)return;if(e.targetEl.offsetHeight===0||e.targetEl.offsetWidth===0){setTimeout(()=>{ue(e,n+1)},10);return}const{targetEl:o,offset:t,anchorEl:l,anchorOrigin:c,selfOrigin:i,absoluteOffset:f,fit:h,cover:s,maxHeight:d,maxWidth:g}=e;if(pe.is.ios===!0&&window.visualViewport!==void 0){const E=document.body.style,{offsetLeft:b,offsetTop:y}=window.visualViewport;b!==te&&(E.setProperty("--q-pe-left",b+"px"),te=b),y!==ne&&(E.setProperty("--q-pe-top",y+"px"),ne=y)}const{scrollLeft:x,scrollTop:a}=o,r=f===void 0?Ze(l,s===!0?[0,0]:t):Je(l,f,t);Object.assign(o.style,{top:0,left:0,minWidth:null,minHeight:null,maxWidth:g||"100vw",maxHeight:d||"100vh",visibility:"visible"});const{width:W,height:k}=o.getBoundingClientRect(),{elWidth:M,elHeight:L}=h===!0||s===!0?{elWidth:Math.max(r.width,W),elHeight:s===!0?Math.max(r.height,k):k}:{elWidth:W,elHeight:k};let v={maxWidth:g,maxHeight:d};(h===!0||s===!0)&&(v.minWidth=r.width+"px",s===!0&&(v.minHeight=r.height+"px")),Object.assign(o.style,v);const T=et(M,L);let m=ie(r,T,c,i);if(f===void 0||t===void 0)$(m,r,T,c,i);else{const{top:E,left:b}=m;$(m,r,T,c,i);let y=!1;if(m.top!==E){y=!0;const w=2*t[1];r.center=r.top-=w,r.bottom-=w+2}if(m.left!==b){y=!0;const w=2*t[0];r.middle=r.left-=w,r.right-=w+2}y===!0&&(m=ie(r,T,c,i),$(m,r,T,c,i))}v={top:m.top+"px",left:m.left+"px"},m.maxHeight!==void 0&&(v.maxHeight=m.maxHeight+"px",r.height>m.maxHeight&&(v.minHeight=v.maxHeight)),m.maxWidth!==void 0&&(v.maxWidth=m.maxWidth+"px",r.width>m.maxWidth&&(v.minWidth=v.maxWidth)),Object.assign(o.style,v),o.scrollTop!==a&&(o.scrollTop=a),o.scrollLeft!==x&&(o.scrollLeft=x)}function $(e,n,o,t,l){const c=o.bottom,i=o.right,f=Ee(),h=window.innerHeight-f,s=document.body.clientWidth;if(e.top<0||e.top+c>h)if(l.vertical==="center")e.top=n[t.vertical]>h/2?Math.max(0,h-c):0,e.maxHeight=Math.min(c,h);else if(n[t.vertical]>h/2){const d=Math.min(h,t.vertical==="center"?n.center:t.vertical===l.vertical?n.bottom:n.top);e.maxHeight=Math.min(c,d),e.top=Math.max(0,d-c)}else e.top=Math.max(0,t.vertical==="center"?n.center:t.vertical===l.vertical?n.top:n.bottom),e.maxHeight=Math.min(c,h-e.top);if(e.left<0||e.left+i>s)if(e.maxWidth=Math.min(i,s),l.horizontal==="middle")e.left=n[t.horizontal]>s/2?Math.max(0,s-i):0;else if(n[t.horizontal]>s/2){const d=Math.min(s,t.horizontal==="middle"?n.middle:t.horizontal===l.horizontal?n.right:n.left);e.maxWidth=Math.min(i,d),e.left=Math.max(0,d-e.maxWidth)}else e.left=Math.max(0,t.horizontal==="middle"?n.middle:t.horizontal===l.horizontal?n.left:n.right),e.maxWidth=Math.min(i,s-e.left)}const ot=Ce({name:"QMenu",inheritAttrs:!1,props:{...Ie,...He,...ke,...Se,persistent:Boolean,autoClose:Boolean,separateClosePopup:Boolean,noRouteDismiss:Boolean,noRefocus:Boolean,noFocus:Boolean,fit:Boolean,cover:Boolean,square:Boolean,anchor:{type:String,validator:oe},self:{type:String,validator:oe},offset:{type:Array,validator:Ge},scrollTarget:{default:void 0},touchPosition:Boolean,maxHeight:{type:String,default:null},maxWidth:{type:String,default:null}},emits:[...We,"click","escapeKey"],setup(e,{slots:n,emit:o,attrs:t}){let l=null,c,i,f;const h=ae(),{proxy:s}=h,{$q:d}=s,g=q(null),x=q(!1),a=C(()=>e.persistent!==!0&&e.noRouteDismiss!==!0),r=Me(e,d),{registerTick:W,removeTick:k}=qe(),{registerTimeout:M}=Pe(),{transitionProps:L,transitionStyle:v}=Be(e),{localScrollTarget:T,changeScrollEvent:m,unconfigureScrollTarget:E}=Ne(e,I),{anchorEl:b,canShow:y}=_e({showing:x}),{hide:w}=Le({showing:x,canShow:y,handleShow:fe,handleHide:he,hideOnRouteChange:a,processOnMount:!0}),{showPortal:j,hidePortal:Q,renderPortal:re}=Ae(h,g,ve,"menu"),A={anchorEl:b,innerRef:g,onClickOutside(u){if(e.persistent!==!0&&x.value===!0)return w(u),(u.type==="touchstart"||u.target.classList.contains("q-dialog__backdrop"))&&Xe(u),!0}},V=C(()=>le(e.anchor||(e.cover===!0?"center middle":"bottom start"),d.lang.rtl)),se=C(()=>e.cover===!0?V.value:le(e.self||"top start",d.lang.rtl)),ce=C(()=>(e.square===!0?" q-menu--square":"")+(r.value===!0?" q-menu--dark q-dark":"")),de=C(()=>e.autoClose===!0?{onClick:me}:{}),X=C(()=>x.value===!0&&e.persistent!==!0);H(X,u=>{u===!0?(ze(R),Ue(A)):(Z(R),ee(A))});function z(){Qe(()=>{let u=g.value;u&&u.contains(document.activeElement)!==!0&&(u=u.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]")||u.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]")||u.querySelector("[autofocus], [data-autofocus]")||u,u.focus({preventScroll:!0}))})}function fe(u){if(l=e.noRefocus===!1?document.activeElement:null,Re(_),j(),I(),c=void 0,u!==void 0&&(e.touchPosition||e.contextMenu)){const F=Fe(u);if(F.left!==void 0){const{top:ge,left:xe}=b.value.getBoundingClientRect();c={left:F.left-xe,top:F.top-ge}}}i===void 0&&(i=H(()=>d.screen.width+"|"+d.screen.height+"|"+e.self+"|"+e.anchor+"|"+d.lang.rtl,S)),e.noFocus!==!0&&document.activeElement.blur(),W(()=>{S(),e.noFocus!==!0&&z()}),M(()=>{d.platform.is.ios===!0&&(f=e.autoClose,g.value.click()),S(),j(!0),o("show",u)},e.transitionDuration)}function he(u){k(),Q(),Y(!0),l!==null&&(u===void 0||u.qClickOutside!==!0)&&(((u&&u.type.indexOf("key")===0?l.closest('[tabindex]:not([tabindex^="-"])'):void 0)||l).focus(),l=null),M(()=>{Q(!0),o("hide",u)},e.transitionDuration)}function Y(u){c=void 0,i!==void 0&&(i(),i=void 0),(u===!0||x.value===!0)&&($e(_),E(),ee(A),Z(R)),u!==!0&&(l=null)}function I(){(b.value!==null||e.scrollTarget!==void 0)&&(T.value=De(b.value,e.scrollTarget),m(T.value,S))}function me(u){f!==!0?(Ke(s,u),o("click",u)):f=!1}function _(u){X.value===!0&&e.noFocus!==!0&&Ve(g.value,u.target)!==!0&&z()}function R(u){o("escapeKey"),w(u)}function S(){ue({targetEl:g.value,offset:e.offset,anchorEl:b.value,anchorOrigin:V.value,selfOrigin:se.value,absoluteOffset:c,fit:e.fit,cover:e.cover,maxHeight:e.maxHeight,maxWidth:e.maxWidth})}function ve(){return J(je,L.value,()=>x.value===!0?J("div",{role:"menu",...t,ref:g,tabindex:-1,class:["q-menu q-position-engine scroll"+ce.value,t.class],style:[t.style,v.value],...de.value},Oe(n.default)):null)}return O(Y),Object.assign(s,{focus:z,updatePosition:S}),re}});export{ot as Q,_e as a,Ie as u};