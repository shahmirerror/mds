import{r as l,m as y,e as le}from"./app-74b9db6d.js";var Fe=Object.defineProperty,Ce=(e,t,r)=>t in e?Fe(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,Q=(e,t,r)=>(Ce(e,typeof t!="symbol"?t+"":t,r),r);let Oe=class{constructor(){Q(this,"current",this.detect()),Q(this,"handoffState","pending"),Q(this,"currentId",0)}set(t){this.current!==t&&(this.handoffState="pending",this.currentId=0,this.current=t)}reset(){this.set(this.detect())}nextId(){return++this.currentId}get isServer(){return this.current==="server"}get isClient(){return this.current==="client"}detect(){return typeof window>"u"||typeof document>"u"?"server":"client"}handoff(){this.handoffState==="pending"&&(this.handoffState="complete")}get isHandoffComplete(){return this.handoffState==="complete"}},U=new Oe,L=(e,t)=>{U.isServer?l.useEffect(e,t):l.useLayoutEffect(e,t)};function P(e){let t=l.useRef(e);return L(()=>{t.current=e},[e]),t}function Ne(e){typeof queueMicrotask=="function"?queueMicrotask(e):Promise.resolve().then(e).catch(t=>setTimeout(()=>{throw t}))}function k(){let e=[],t={addEventListener(r,n,i,d){return r.addEventListener(n,i,d),t.add(()=>r.removeEventListener(n,i,d))},requestAnimationFrame(...r){let n=requestAnimationFrame(...r);return t.add(()=>cancelAnimationFrame(n))},nextFrame(...r){return t.requestAnimationFrame(()=>t.requestAnimationFrame(...r))},setTimeout(...r){let n=setTimeout(...r);return t.add(()=>clearTimeout(n))},microTask(...r){let n={current:!0};return Ne(()=>{n.current&&r[0]()}),t.add(()=>{n.current=!1})},style(r,n,i){let d=r.style.getPropertyValue(n);return Object.assign(r.style,{[n]:i}),this.add(()=>{Object.assign(r.style,{[n]:d})})},group(r){let n=k();return r(n),this.add(()=>n.dispose())},add(r){return e.push(r),()=>{let n=e.indexOf(r);if(n>=0)for(let i of e.splice(n,1))i()}},dispose(){for(let r of e.splice(0))r()}};return t}function oe(){let[e]=l.useState(k);return l.useEffect(()=>()=>e.dispose(),[e]),e}let S=function(e){let t=P(e);return y.useCallback((...r)=>t.current(...r),[t])};function $e(){let e=typeof document>"u";return"useSyncExternalStore"in le?(t=>t.useSyncExternalStore)(le)(()=>()=>{},()=>!1,()=>!e):!1}function ue(){let e=$e(),[t,r]=l.useState(U.isHandoffComplete);return t&&U.isHandoffComplete===!1&&r(!1),l.useEffect(()=>{t!==!0&&r(!0)},[t]),l.useEffect(()=>U.handoff(),[]),e?!1:t}function E(e,t,...r){if(e in t){let i=t[e];return typeof i=="function"?i(...r):i}let n=new Error(`Tried to handle "${e}" but there is no handler defined. Only defined handlers are: ${Object.keys(t).map(i=>`"${i}"`).join(", ")}.`);throw Error.captureStackTrace&&Error.captureStackTrace(n,E),n}let ce=Symbol();function Xe(e,t=!0){return Object.assign(e,{[ce]:t})}function fe(...e){let t=l.useRef(e);l.useEffect(()=>{t.current=e},[e]);let r=S(n=>{for(let i of t.current)i!=null&&(typeof i=="function"?i(n):i.current=n)});return e.every(n=>n==null||(n==null?void 0:n[ce]))?void 0:r}function I(...e){return Array.from(new Set(e.flatMap(t=>typeof t=="string"?t.split(" "):[]))).filter(Boolean).join(" ")}var de=(e=>(e[e.None=0]="None",e[e.RenderStrategy=1]="RenderStrategy",e[e.Static=2]="Static",e))(de||{}),C=(e=>(e[e.Unmount=0]="Unmount",e[e.Hidden=1]="Hidden",e))(C||{});function me({ourProps:e,theirProps:t,slot:r,defaultTag:n,features:i,visible:d=!0,name:m}){let s=pe(t,e);if(d)return q(s,r,n,m);let o=i??0;if(o&2){let{static:a=!1,...f}=s;if(a)return q(f,r,n,m)}if(o&1){let{unmount:a=!0,...f}=s;return E(a?0:1,{0(){return null},1(){return q({...f,hidden:!0,style:{display:"none"}},r,n,m)}})}return q(s,r,n,m)}function q(e,t={},r,n){let{as:i=r,children:d,refName:m="ref",...s}=X(e,["unmount","static"]),o=e.ref!==void 0?{[m]:e.ref}:{},a=typeof d=="function"?d(t):d;"className"in s&&s.className&&typeof s.className=="function"&&(s.className=s.className(t));let f={};if(t){let p=!1,g=[];for(let[h,u]of Object.entries(t))typeof u=="boolean"&&(p=!0),u===!0&&g.push(h);p&&(f["data-headlessui-state"]=g.join(" "))}if(i===l.Fragment&&Object.keys(ae(s)).length>0){if(!l.isValidElement(a)||Array.isArray(a)&&a.length>1)throw new Error(['Passing props on "Fragment"!',"",`The current component <${n} /> is rendering a "Fragment".`,"However we need to passthrough the following props:",Object.keys(s).map(u=>`  - ${u}`).join(`
`),"","You can apply a few solutions:",['Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".',"Render a single element as the child so that we can forward the props onto that element."].map(u=>`  - ${u}`).join(`
`)].join(`
`));let p=a.props,g=typeof(p==null?void 0:p.className)=="function"?(...u)=>I(p==null?void 0:p.className(...u),s.className):I(p==null?void 0:p.className,s.className),h=g?{className:g}:{};return l.cloneElement(a,Object.assign({},pe(a.props,ae(X(s,["ref"]))),f,o,je(a.ref,o.ref),h))}return l.createElement(i,Object.assign({},X(s,["ref"]),i!==l.Fragment&&o,i!==l.Fragment&&f),a)}function je(...e){return{ref:e.every(t=>t==null)?void 0:t=>{for(let r of e)r!=null&&(typeof r=="function"?r(t):r.current=t)}}}function pe(...e){if(e.length===0)return{};if(e.length===1)return e[0];let t={},r={};for(let n of e)for(let i in n)i.startsWith("on")&&typeof n[i]=="function"?(r[i]!=null||(r[i]=[]),r[i].push(n[i])):t[i]=n[i];if(t.disabled||t["aria-disabled"])return Object.assign(t,Object.fromEntries(Object.keys(r).map(n=>[n,void 0])));for(let n in r)Object.assign(t,{[n](i,...d){let m=r[n];for(let s of m){if((i instanceof Event||(i==null?void 0:i.nativeEvent)instanceof Event)&&i.defaultPrevented)return;s(i,...d)}}});return t}function Z(e){var t;return Object.assign(l.forwardRef(e),{displayName:(t=e.displayName)!=null?t:e.name})}function ae(e){let t=Object.assign({},e);for(let r in t)t[r]===void 0&&delete t[r];return t}function X(e,t=[]){let r=Object.assign({},e);for(let n of t)n in r&&delete r[n];return r}let ee=l.createContext(null);ee.displayName="OpenClosedContext";var T=(e=>(e[e.Open=1]="Open",e[e.Closed=2]="Closed",e[e.Closing=4]="Closing",e[e.Opening=8]="Opening",e))(T||{});function he(){return l.useContext(ee)}function xe({value:e,children:t}){return y.createElement(ee.Provider,{value:e},t)}function te(){let e=l.useRef(!1);return L(()=>(e.current=!0,()=>{e.current=!1}),[]),e}function Pe(e=0){let[t,r]=l.useState(e),n=te(),i=l.useCallback(o=>{n.current&&r(a=>a|o)},[t,n]),d=l.useCallback(o=>!!(t&o),[t]),m=l.useCallback(o=>{n.current&&r(a=>a&~o)},[r,n]),s=l.useCallback(o=>{n.current&&r(a=>a^o)},[r]);return{flags:t,addFlag:i,hasFlag:d,removeFlag:m,toggleFlag:s}}function Re(e){let t={called:!1};return(...r)=>{if(!t.called)return t.called=!0,e(...r)}}function Y(e,...t){e&&t.length>0&&e.classList.add(...t)}function _(e,...t){e&&t.length>0&&e.classList.remove(...t)}function Le(e,t){let r=k();if(!e)return r.dispose;let{transitionDuration:n,transitionDelay:i}=getComputedStyle(e),[d,m]=[n,i].map(o=>{let[a=0]=o.split(",").filter(Boolean).map(f=>f.includes("ms")?parseFloat(f):parseFloat(f)*1e3).sort((f,p)=>p-f);return a}),s=d+m;if(s!==0){r.group(a=>{a.setTimeout(()=>{t(),a.dispose()},s),a.addEventListener(e,"transitionrun",f=>{f.target===f.currentTarget&&a.dispose()})});let o=r.addEventListener(e,"transitionend",a=>{a.target===a.currentTarget&&(t(),o())})}else t();return r.add(()=>t()),r.dispose}function ke(e,t,r,n){let i=r?"enter":"leave",d=k(),m=n!==void 0?Re(n):()=>{};i==="enter"&&(e.removeAttribute("hidden"),e.style.display="");let s=E(i,{enter:()=>t.enter,leave:()=>t.leave}),o=E(i,{enter:()=>t.enterTo,leave:()=>t.leaveTo}),a=E(i,{enter:()=>t.enterFrom,leave:()=>t.leaveFrom});return _(e,...t.base,...t.enter,...t.enterTo,...t.enterFrom,...t.leave,...t.leaveFrom,...t.leaveTo,...t.entered),Y(e,...t.base,...s,...a),d.nextFrame(()=>{_(e,...t.base,...s,...a),Y(e,...t.base,...s,...o),Le(e,()=>(_(e,...t.base,...s),Y(e,...t.base,...t.entered),m()))}),d.dispose}function Ae({immediate:e,container:t,direction:r,classes:n,onStart:i,onStop:d}){let m=te(),s=oe(),o=P(r);L(()=>{e&&(o.current="enter")},[e]),L(()=>{let a=k();s.add(a.dispose);let f=t.current;if(f&&o.current!=="idle"&&m.current)return a.dispose(),i.current(o.current),a.add(ke(f,n.current,o.current==="enter",()=>{a.dispose(),d.current(o.current)})),a.dispose},[r])}function F(e=""){return e.split(" ").filter(t=>t.trim().length>1)}let B=l.createContext(null);B.displayName="TransitionContext";var He=(e=>(e.Visible="visible",e.Hidden="hidden",e))(He||{});function De(){let e=l.useContext(B);if(e===null)throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");return e}function Me(){let e=l.useContext(V);if(e===null)throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");return e}let V=l.createContext(null);V.displayName="NestingContext";function W(e){return"children"in e?W(e.children):e.current.filter(({el:t})=>t.current!==null).filter(({state:t})=>t==="visible").length>0}function ve(e,t){let r=P(e),n=l.useRef([]),i=te(),d=oe(),m=S((h,u=C.Hidden)=>{let v=n.current.findIndex(({el:c})=>c===h);v!==-1&&(E(u,{[C.Unmount](){n.current.splice(v,1)},[C.Hidden](){n.current[v].state="hidden"}}),d.microTask(()=>{var c;!W(n)&&i.current&&((c=r.current)==null||c.call(r))}))}),s=S(h=>{let u=n.current.find(({el:v})=>v===h);return u?u.state!=="visible"&&(u.state="visible"):n.current.push({el:h,state:"visible"}),()=>m(h,C.Unmount)}),o=l.useRef([]),a=l.useRef(Promise.resolve()),f=l.useRef({enter:[],leave:[],idle:[]}),p=S((h,u,v)=>{o.current.splice(0),t&&(t.chains.current[u]=t.chains.current[u].filter(([c])=>c!==h)),t==null||t.chains.current[u].push([h,new Promise(c=>{o.current.push(c)})]),t==null||t.chains.current[u].push([h,new Promise(c=>{Promise.all(f.current[u].map(([$,j])=>j)).then(()=>c())})]),u==="enter"?a.current=a.current.then(()=>t==null?void 0:t.wait.current).then(()=>v(u)):v(u)}),g=S((h,u,v)=>{Promise.all(f.current[u].splice(0).map(([c,$])=>$)).then(()=>{var c;(c=o.current.shift())==null||c()}).then(()=>v(u))});return l.useMemo(()=>({children:n,register:s,unregister:m,onStart:p,onStop:g,wait:a,chains:f}),[s,m,n,p,g,f,a])}function qe(){}let Ue=["beforeEnter","afterEnter","beforeLeave","afterLeave"];function se(e){var t;let r={};for(let n of Ue)r[n]=(t=e[n])!=null?t:qe;return r}function Ie(e){let t=l.useRef(se(e));return l.useEffect(()=>{t.current=se(e)},[e]),t}let Be="div",ge=de.RenderStrategy;function Ve(e,t){var r,n;let{beforeEnter:i,afterEnter:d,beforeLeave:m,afterLeave:s,enter:o,enterFrom:a,enterTo:f,entered:p,leave:g,leaveFrom:h,leaveTo:u,...v}=e,c=l.useRef(null),$=fe(c,t),j=(r=v.unmount)==null||r?C.Unmount:C.Hidden,{show:b,appear:O,initial:re}=De(),[N,z]=l.useState(b?"visible":"hidden"),ne=Me(),{register:A,unregister:H}=ne;l.useEffect(()=>A(c),[A,c]),l.useEffect(()=>{if(j===C.Hidden&&c.current){if(b&&N!=="visible"){z("visible");return}return E(N,{hidden:()=>H(c),visible:()=>A(c)})}},[N,c,A,H,b,j]);let G=P({base:F(v.className),enter:F(o),enterFrom:F(a),enterTo:F(f),entered:F(p),leave:F(g),leaveFrom:F(h),leaveTo:F(u)}),D=Ie({beforeEnter:i,afterEnter:d,beforeLeave:m,afterLeave:s}),K=ue();l.useEffect(()=>{if(K&&N==="visible"&&c.current===null)throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?")},[c,N,K]);let ye=re&&!O,ie=O&&b&&re,Ee=(()=>!K||ye?"idle":b?"enter":"leave")(),R=Pe(0),Te=S(w=>E(w,{enter:()=>{R.addFlag(T.Opening),D.current.beforeEnter()},leave:()=>{R.addFlag(T.Closing),D.current.beforeLeave()},idle:()=>{}})),Se=S(w=>E(w,{enter:()=>{R.removeFlag(T.Opening),D.current.afterEnter()},leave:()=>{R.removeFlag(T.Closing),D.current.afterLeave()},idle:()=>{}})),M=ve(()=>{z("hidden"),H(c)},ne);Ae({immediate:ie,container:c,classes:G,direction:Ee,onStart:P(w=>{M.onStart(c,w,Te)}),onStop:P(w=>{M.onStop(c,w,Se),w==="leave"&&!W(M)&&(z("hidden"),H(c))})});let x=v,we={ref:$};return ie?x={...x,className:I(v.className,...G.current.enter,...G.current.enterFrom)}:(x.className=I(v.className,(n=c.current)==null?void 0:n.className),x.className===""&&delete x.className),y.createElement(V.Provider,{value:M},y.createElement(xe,{value:E(N,{visible:T.Open,hidden:T.Closed})|R.flags},me({ourProps:we,theirProps:x,defaultTag:Be,features:ge,visible:N==="visible",name:"Transition.Child"})))}function We(e,t){let{show:r,appear:n=!1,unmount:i=!0,...d}=e,m=l.useRef(null),s=fe(m,t);ue();let o=he();if(r===void 0&&o!==null&&(r=(o&T.Open)===T.Open),![!0,!1].includes(r))throw new Error("A <Transition /> is used but it is missing a `show={true | false}` prop.");let[a,f]=l.useState(r?"visible":"hidden"),p=ve(()=>{f("hidden")}),[g,h]=l.useState(!0),u=l.useRef([r]);L(()=>{g!==!1&&u.current[u.current.length-1]!==r&&(u.current.push(r),h(!1))},[u,r]);let v=l.useMemo(()=>({show:r,appear:n,initial:g}),[r,n,g]);l.useEffect(()=>{if(r)f("visible");else if(!W(p))f("hidden");else{let b=m.current;if(!b)return;let O=b.getBoundingClientRect();O.x===0&&O.y===0&&O.width===0&&O.height===0&&f("hidden")}},[r,p]);let c={unmount:i},$=S(()=>{var b;g&&h(!1),(b=e.beforeEnter)==null||b.call(e)}),j=S(()=>{var b;g&&h(!1),(b=e.beforeLeave)==null||b.call(e)});return y.createElement(V.Provider,{value:p},y.createElement(B.Provider,{value:v},me({ourProps:{...c,as:l.Fragment,children:y.createElement(be,{ref:s,...c,...d,beforeEnter:$,beforeLeave:j})},theirProps:{},defaultTag:l.Fragment,features:ge,visible:a==="visible",name:"Transition"})))}function ze(e,t){let r=l.useContext(B)!==null,n=he()!==null;return y.createElement(y.Fragment,null,!r&&n?y.createElement(J,{ref:t,...e}):y.createElement(be,{ref:t,...e}))}let J=Z(We),be=Z(Ve),Ge=Z(ze),Ye=Object.assign(J,{Child:Ge,Root:J});export{he as C,Z as D,de as S,Xe as T,me as X,L as a,P as b,Ne as c,k as d,T as e,te as f,ue as l,S as o,oe as p,U as s,Ye as t,E as u,fe as y};
