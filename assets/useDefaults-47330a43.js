import{a as f,I as D,be as u,T as t,aa as l,D as M,b as g}from"./index-5c6f171d.js";import{u as R}from"./useDialogs-7bff28e2.js";function _(){const{log:n}=f(),{confirmDialog:m}=R();async function h(){m("Load Defaults","Would you like the load defaults into the database?",D.INFO,"info",async()=>{try{const i=()=>{const e=["Alpha","Beta","Gamma","Delta","Epsilon","Zeta","Eta","Theta","Iota","Kappa","Lambda","Mu","Nu","Xi","Omicron","Pi","Rho","Sigma","Tau","Upsilon","Phi","Chi","Psi","Omega"];return e[Math.floor(Math.random()*e.length)]},E=()=>{const e="ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");return e[Math.floor(Math.random()*e.length)]},T=()=>Math.random()>=.5,p=()=>Math.floor(Math.random()*100),P=()=>Date.now()-u.PER_DAY*90,r=Object.values(t).reduce((e,a)=>(e[a]=[],e),{}),o=(e,a)=>{const d=l(),c=`${i()} ${E()}`;if(r[a].push({id:d,timestamp:Date.now(),name:c,desc:`${c} ${a} description.`,enabled:!0,favorited:T(),testIds:a===t.EXAMPLE_PARENT?[l()]:void 0}),e>0){const A=M.getChildType(a);for(let s=0;s<e;s++)r[A].push({id:l(),parentId:d,timestamp:P()+u.PER_DAY*s,note:`Note ${s}`,percent:a===t.TEST_PARENT?p():void 0})}};o(3,t.EXAMPLE_PARENT),o(2,t.EXAMPLE_PARENT),o(0,t.EXAMPLE_PARENT),o(0,t.EXAMPLE_PARENT),o(180,t.TEST_PARENT),o(0,t.TEST_PARENT),n.silentDebug("recordTypes:",r),await Promise.all(Object.entries(r).map(([e,a])=>g.importRecords(e,a))),n.info("Defaults loaded")}catch(i){n.error("Failed to load defaults",i)}})}return{onDefaults:h}}export{_ as u};
