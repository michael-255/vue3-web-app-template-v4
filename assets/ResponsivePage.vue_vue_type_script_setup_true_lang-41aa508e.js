import{U as w,ba as S,bb as f,bc as N,ad as l,Z as O,Y as x,T as I,r as B,ag as P,ai as F,aT as H,aj as R,bs as j,bt as z,d as E,f as y,h as k,w as g,p as v,m as q,j as p,t as L,K as D,x as K,Q,i as A,q as T,b6 as U,B as Y,l as G,I as W}from"./index-85cdcb14.js";const X={position:{type:String,default:"bottom-right",validator:e=>["top-right","top-left","bottom-right","bottom-left","top","right","bottom","left"].includes(e)},offset:{type:Array,validator:e=>e.length===2},expand:Boolean};function Z(){const{props:e,proxy:{$q:r}}=w(),n=S(N,f);if(n===f)return console.error("QPageSticky needs to be child of QLayout"),f;const s=l(()=>{const t=e.position;return{top:t.indexOf("top")>-1,right:t.indexOf("right")>-1,bottom:t.indexOf("bottom")>-1,left:t.indexOf("left")>-1,vertical:t==="top"||t==="bottom",horizontal:t==="left"||t==="right"}}),a=l(()=>n.header.offset),d=l(()=>n.right.offset),i=l(()=>n.footer.offset),o=l(()=>n.left.offset),m=l(()=>{let t=0,c=0;const u=s.value,_=r.lang.rtl===!0?-1:1;u.top===!0&&a.value!==0?c=`${a.value}px`:u.bottom===!0&&i.value!==0&&(c=`${-i.value}px`),u.left===!0&&o.value!==0?t=`${_*o.value}px`:u.right===!0&&d.value!==0&&(t=`${-_*d.value}px`);const h={transform:`translate(${t}, ${c})`};return e.offset&&(h.margin=`${e.offset[1]}px ${e.offset[0]}px`),u.vertical===!0?(o.value!==0&&(h[r.lang.rtl===!0?"right":"left"]=`${o.value}px`),d.value!==0&&(h[r.lang.rtl===!0?"left":"right"]=`${d.value}px`)):u.horizontal===!0&&(a.value!==0&&(h.top=`${a.value}px`),i.value!==0&&(h.bottom=`${i.value}px`)),h}),$=l(()=>`q-page-sticky row flex-center fixed-${e.position} q-page-sticky--${e.expand===!0?"expand":"shrink"}`);function b(t){const c=O(t.default);return x("div",{class:$.value,style:m.value},e.expand===!0?c:[x("div",c)])}return{$layout:n,getStickyContent:b}}const J=I({name:"QPageScroller",props:{...X,scrollOffset:{type:Number,default:1e3},reverse:Boolean,duration:{type:Number,default:300},offset:{default:()=>[18,18]}},emits:["click"],setup(e,{slots:r,emit:n}){const{proxy:{$q:s}}=w(),{$layout:a,getStickyContent:d}=Z(),i=B(null);let o;const m=l(()=>a.height.value-(a.isContainer.value===!0?a.containerHeight.value:s.screen.height));function $(){return e.reverse===!0?m.value-a.scroll.value.position>e.scrollOffset:a.scroll.value.position>e.scrollOffset}const b=B($());function t(){const C=$();b.value!==C&&(b.value=C)}function c(){e.reverse===!0?o===void 0&&(o=P(m,t)):u()}P(a.scroll,t),P(()=>e.reverse,c);function u(){o!==void 0&&(o(),o=void 0)}function _(C){const V=R(a.isContainer.value===!0?i.value:a.rootRef.value);j(V,e.reverse===!0?a.height.value:0,e.duration),n("click",C)}function h(){return b.value===!0?x("div",{ref:i,class:"q-page-scroller",onClick:_},d(r)):null}return c(),F(u),()=>x(H,{name:"q-transition--fade"},h)}}),M=I({name:"QPage",props:{padding:Boolean,styleFn:Function},setup(e,{slots:r}){const{proxy:{$q:n}}=w(),s=S(N,f);if(s===f)return console.error("QPage needs to be a deep child of QLayout"),f;if(S(z,f)===f)return console.error("QPage needs to be child of QPageContainer"),f;const d=l(()=>{const o=(s.header.space===!0?s.header.size:0)+(s.footer.space===!0?s.footer.size:0);if(typeof e.styleFn=="function"){const m=s.isContainer.value===!0?s.containerHeight.value:n.screen.height;return e.styleFn(o,m)}return{minHeight:s.isContainer.value===!0?s.containerHeight.value-o+"px":n.screen.height===0?o!==0?`calc(100vh - ${o}px)`:"100vh":n.screen.height-o+"px"}}),i=l(()=>`q-page${e.padding===!0?" q-layout-padding":""}`);return()=>x("main",{class:i.value,style:d.value},O(r.default))}}),ee={class:"row justify-center"},te={class:"col-md-8 col-sm-10 col-xs-12"},oe=v("div",{class:"text-h6 q-mb-md"},"Something went wrong...",-1),ae=v("div",null," The page was unable to load due to an error. Troubleshoot using the application Logs if the problem persists. ",-1),ne={key:2},se=v("div",{class:"text-h6 q-mb-md"},"No data available...",-1),le=v("div",null," There doesn't appear to be any data to display. If this is an error, troubleshoot using the application Logs if the problem persists. ",-1),re={key:3},ie=v("div",{class:"q-mb-xl"},null,-1),ue=E({__name:"ResponsivePage",props:{bannerIcon:null,bannerTitle:null,showPageError:{type:Boolean},showPageNoData:{type:Boolean}},setup(e){return(r,n)=>(y(),k(M,{padding:""},{default:g(()=>[v("div",ee,[v("div",te,[e.bannerIcon&&e.bannerTitle?(y(),k(q,{key:0,class:"q-mb-md"},{default:g(()=>[p(Q,{class:"text-h5"},{default:g(()=>[p(L,{class:"q-pb-xs q-pr-xs",name:e.bannerIcon},null,8,["name"]),D(" "+K(e.bannerTitle),1)]),_:1})]),_:1})):A("",!0),e.showPageError?(y(),k(q,{key:1},{default:g(()=>[p(Q,null,{default:g(()=>[oe,ae]),_:1})]),_:1})):e.showPageNoData?(y(),T("div",ne,[p(q,{class:"q-mb-md"},{default:g(()=>[p(Q,null,{default:g(()=>[se,le]),_:1})]),_:1})])):(y(),T("div",re,[U(r.$slots,"default")])),ie])]),p(J,null,{default:g(()=>[p(Y,{fab:"",icon:G(W).TOP_OF_PAGE,color:"accent"},null,8,["icon"])]),_:1})]),_:3}))}});export{ue as _};
