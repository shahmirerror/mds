import{r as c,W as h,j as e,_ as s}from"./app-8f21bdfb.js";const E=(a,d)=>{const l=a[d];return l?typeof l=="function"?l():Promise.resolve(l):new Promise((o,i)=>{(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(i.bind(null,new Error("Unknown variable dynamic import: "+d)))})};c.createContext();function I({user:a,logo:d}){var i;const{post:l}=h(),o=m=>{m.preventDefault(),l(route("logout"))};return e.jsx(e.Fragment,{children:e.jsx("header",{className:"navbar navbar-expand-md d-none d-lg-flex d-print-none",children:e.jsxs("div",{className:"container-xl",children:[e.jsx("button",{className:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbar-menu","aria-controls":"navbar-menu","aria-expanded":"false","aria-label":"Toggle navigation",children:e.jsx("span",{className:"navbar-toggler-icon"})}),e.jsxs("div",{className:"navbar-nav flex-row order-md-last",children:[e.jsx("div",{className:"d-none d-md-flex",children:e.jsxs("div",{className:"nav-item dropdown d-none d-md-flex me-3",children:[e.jsx("a",{href:"#",className:"nav-link px-0","data-bs-toggle":"dropdown",tabindex:"-1","aria-label":"Show notifications",children:e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",className:"icon",width:"24",height:"24",viewBox:"0 0 24 24","stroke-width":"2",stroke:"currentColor",fill:"none","stroke-linecap":"round","stroke-linejoin":"round",children:[e.jsx("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e.jsx("path",{d:"M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6"}),e.jsx("path",{d:"M9 17v1a3 3 0 0 0 6 0v-1"})]})}),e.jsx("div",{className:"dropdown-menu dropdown-menu-arrow dropdown-menu-end dropdown-menu-card",children:e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-header",children:e.jsx("h3",{className:"card-title",children:"Last updates"})}),e.jsx("div",{className:"list-group list-group-flush list-group-hoverable"})]})})]})}),e.jsxs("div",{className:"nav-item dropdown",children:[e.jsxs("a",{href:"#",className:"nav-link d-flex lh-1 text-reset p-0","data-bs-toggle":"dropdown","aria-label":"Open user menu",children:[e.jsx("span",{className:"avatar avatar-sm",style:{backgroundImage:"url("+(a==null?void 0:a.profile_photo_url)+")"}}),e.jsxs("div",{className:"d-none d-xl-block ps-2",children:[e.jsx("div",{children:a==null?void 0:a.name}),e.jsx("div",{className:"mt-1 small text-secondary",children:(i=a==null?void 0:a.role)==null?void 0:i.name})]})]}),e.jsxs("div",{className:"dropdown-menu dropdown-menu-end dropdown-menu-arrow",children:[e.jsx("a",{href:route("users.edit",a==null?void 0:a.id),className:"dropdown-item",children:"Profile"}),e.jsx("div",{className:"dropdown-divider"}),e.jsx("a",{href:route("organization-settings.index"),className:"dropdown-item",children:"Settings"}),e.jsx("a",{href:"./sign-in.html",className:"dropdown-item",onClick:o,children:"Logout"})]})]})]}),e.jsx("div",{className:"collapse navbar-collapse",id:"navbar-menu",children:e.jsx("div",{children:e.jsx("form",{action:"./",method:"get",autocomplete:"off",novalidate:!0,children:e.jsxs("div",{className:"input-icon",children:[e.jsx("span",{className:"input-icon-addon",children:e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",className:"icon",width:"24",height:"24",viewBox:"0 0 24 24","stroke-width":"2",stroke:"currentColor",fill:"none","stroke-linecap":"round","stroke-linejoin":"round",children:[e.jsx("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e.jsx("path",{d:"M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"}),e.jsx("path",{d:"M21 21l-6 -6"})]})}),e.jsx("input",{type:"text",value:"",className:"form-control",placeholder:"Search…","aria-label":"Search in website"})]})})})}),e.jsx("div",{className:"collapse navbar-collapse",id:"navbar-menu",children:e.jsx("div",{children:e.jsx("img",{src:d,width:"110",height:"32",alt:"Tabler",className:"navbar-brand-image"})})})]})})})}function k({modules:a,logo:d,labs:l}){return h(),e.jsx(e.Fragment,{children:e.jsx("aside",{className:"navbar navbar-vertical navbar-expand-lg ","data-bs-theme":"light",children:e.jsxs("div",{className:"container-fluid",children:[e.jsx("button",{className:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#sidebar-menu","aria-controls":"sidebar-menu","aria-expanded":"false","aria-label":"Toggle navigation",children:e.jsx("span",{className:"navbar-toggler-icon"})}),e.jsx("h1",{className:"navbar-brand navbar-brand",children:e.jsx("a",{href:".",children:e.jsx("img",{src:d,width:"110",height:"32",alt:"Tabler",className:"navbar-brand-image"})})}),e.jsx("div",{className:"collapse navbar-collapse",id:"sidebar-menu",children:e.jsxs("ul",{className:"navbar-nav pt-lg-3",children:[a.map((o,i)=>e.jsx("li",{className:"nav-item",children:e.jsx("a",{className:"nav-link",href:o.route!=null?route(`${o.route}`):"#",children:e.jsx("span",{className:"nav-link-title",children:o.title})})})),(l==null?void 0:l.length)>0&&e.jsxs("li",{className:"nav-item dropdown",children:[e.jsx("a",{className:"nav-link dropdown-toggle",href:"#navbar-base","data-bs-toggle":"dropdown","data-bs-auto-close":"false",role:"button","aria-expanded":"false",children:e.jsx("span",{className:"nav-link-title",children:"Centre Modules"})}),e.jsx("div",{className:"dropdown-menu",children:l.map((o,i)=>e.jsx("div",{className:"dropdown-menu-columns",children:e.jsx("div",{className:"dropdown-menu-column",children:e.jsx("a",{className:"dropdown-item",href:o.route!=null?route(`${o.route}`):"#",children:o==null?void 0:o.title})})}))})]})]})})]})})})}function T({user:a,header:d,children:l}){c.useState(!1);const[o,i]=c.useState([]),[m,v]=c.useState([]),[x,_]=c.useState(),[u,j]=c.useState();function b(){var r;(a==null?void 0:a.role_id)==1?fetch(route("super.mods")).then(n=>n.json()).then(n=>{i(n.modules)},n=>{console.log(n)}):(a==null?void 0:a.role_id)==2&&fetch(route("admin.mods",(r=a==null?void 0:a.centre)==null?void 0:r.id)).then(n=>n.json()).then(n=>{i(n.modules),v(n.lab)},n=>{console.log(n)})}const N=async r=>{if(r!==null){let t=r.split("."),p="",f=t[(t==null?void 0:t.length)-1];for(let g=0;g<(t==null?void 0:t.length)-1;g++)p+=t[g];const w=await E(Object.assign({"../../../storage/app/public/centres/logos/1701341109.png":()=>s(()=>import("./1701341109-cd13cb25.js"),[]),"../../../storage/app/public/centres/logos/1705388760.png":()=>s(()=>import("./1705388760-eaa5be41.js"),[]),"../../../storage/app/public/centres/logos/1705388807.png":()=>s(()=>import("./1705388807-eaa5be41.js"),[]),"../../../storage/app/public/centres/logos/1705388873.png":()=>s(()=>import("./1705388873-2fbf05de.js"),[]),"../../../storage/app/public/centres/logos/1705388901.png":()=>s(()=>import("./1705388901-df06663f.js"),[]),"../../../storage/app/public/centres/logos/1705388937.png":()=>s(()=>import("./1705388937-0df88cb5.js"),[]),"../../../storage/app/public/centres/logos/1705388970.png":()=>s(()=>import("./1705388970-5d558c41.js"),[]),"../../../storage/app/public/centres/logos/1705389004.png":()=>s(()=>import("./1705389004-899738b5.js"),[]),"../../../storage/app/public/centres/logos/1705992315.png":()=>s(()=>import("./1705992315-c2d3df44.js"),[]),"../../../storage/app/public/centres/logos/1705992437.png":()=>s(()=>import("./1705992437-c2d3df44.js"),[]),"../../../storage/app/public/centres/logos/1705992473.png":()=>s(()=>import("./1705992473-c2d3df44.js"),[]),"../../../storage/app/public/centres/logos/1705992510.png":()=>s(()=>import("./1705992510-c2d3df44.js"),[]),"../../../storage/app/public/centres/logos/1705992568.png":()=>s(()=>import("./1705992568-c2d3df44.js"),[]),"../../../storage/app/public/centres/logos/1706262708.png":()=>s(()=>import("./1706262708-899738b5.js"),[]),"../../../storage/app/public/centres/logos/1706262802.png":()=>s(()=>import("./1706262802-899738b5.js"),[]),"../../../storage/app/public/centres/logos/reliance_logo.png":()=>s(()=>import("./reliance_logo-9f8c5bf0.js"),[])}),`../../../storage/app/public/centres/logos/${p}.${f}`);j(w.default)}const n=await s(()=>import("./logo-mds-f347cf71.js"),[]);_(n.default)};return c.useEffect(()=>{var r,n,t,p;b(),N(a!=null&&a.centre&&((n=(r=a==null?void 0:a.centre)==null?void 0:r.details)==null?void 0:n.image)!==null?(p=(t=a==null?void 0:a.centre)==null?void 0:t.details)==null?void 0:p.image:null)},[]),e.jsx(e.Fragment,{children:e.jsxs("div",{className:"page",children:[e.jsx(k,{logo:x,modules:o,labs:m}),e.jsx(I,{user:a,logo:u}),e.jsxs("div",{className:"page-wrapper",children:[e.jsx("main",{children:l}),e.jsx("footer",{className:"footer footer-transparent d-print-none",children:e.jsx("div",{className:"container-xl",children:e.jsx("div",{className:"row text-center align-items-center flex-row-reverse",children:e.jsx("div",{className:"col-12 col-lg-auto mt-3 mt-lg-0",children:e.jsxs("ul",{className:"list-inline list-inline-dots mb-0",children:[e.jsxs("li",{className:"list-inline-item",children:["Copyright © 2023",e.jsx("a",{href:".",className:"link-secondary",children:" Medical Diagnostic System"}),". All rights reserved."]}),e.jsx("li",{className:"list-inline-item",children:e.jsx("a",{href:"#",className:"link-secondary",rel:"noopener",children:"v2.0.0"})})]})})})})})]})]})})}export{T as A};
