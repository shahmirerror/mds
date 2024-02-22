import{W as S,r as i,j as e,a as C}from"./app-4431c5fe.js";import{A as w}from"./AuthenticatedLayout-59639fa7.js";import{I as k}from"./IconRefresh-2b3191b2.js";import"./createReactComponent-3ce27679.js";import"./index-23e86464.js";function R(r){S(),i.useState();const[a,d]=i.useState(r.pending),[o,h]=i.useState(r.in_process),[x,j]=i.useState(r.completed),[m,u]=i.useState(null),[b,v]=i.useState(null),[p,y]=i.useState(null),f=s=>{const t=s.target.value;u(t);const c=r.pending.filter(n=>Object.values(n).some(l=>typeof l=="string"&&l.toLowerCase().includes(t.toLowerCase())));d(c)},g=s=>{const t=s.target.value;y(t);const c=r.completed.filter(n=>Object.values(n).some(l=>typeof l=="string"&&l.toLowerCase().includes(t.toLowerCase())));j(c)},N=s=>{const t=s.target.value;v(t);const c=r.in_process.filter(n=>Object.values(n).some(l=>typeof l=="string"&&l.toLowerCase().includes(t.toLowerCase())));h(c)};return e.jsxs(w,{user:r.auth.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Token Status"}),children:[e.jsx(C,{title:"Token Status"}),e.jsx("div",{className:"page-header d-print-none",children:e.jsx("div",{className:"container-xl",children:e.jsxs("div",{className:"row g-2 align-items-center",children:[e.jsx("div",{className:"col",style:{display:"inline-flex",justifyContent:"space-between"},children:e.jsx("h2",{className:"page-title",children:"Token Status"})}),e.jsx("div",{className:"col-md-1 align-items-center",style:{float:"right"},children:e.jsx("h2",{className:"page-title",children:e.jsx("button",{className:"btn btn-secondary btn-sm mr-5 btn-pill",onClick:()=>location.reload(),children:e.jsx(k,{})})})})]})})}),e.jsx("div",{className:"page-body",children:e.jsx("div",{class:"container-xl",children:e.jsxs("div",{className:"row",children:[e.jsx("div",{className:"col-4",children:e.jsxs("div",{class:"card",children:[e.jsx("div",{className:"card-header",children:e.jsx("h4",{children:"Completed"})}),e.jsx("div",{class:"card-body border-bottom py-3",children:e.jsx("div",{class:"d-flex",children:e.jsxs("div",{class:"ms-auto text-secondary",children:["Search:",e.jsx("div",{class:"ms-2 d-inline-block",children:e.jsx("input",{type:"text",class:"form-control form-control-sm","aria-label":"Search candidate",value:p,onChange:g})})]})})}),e.jsx("div",{class:"table-responsive",children:e.jsxs("table",{class:"table card-table table-vcenter text-nowrap datatable",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"#"}),e.jsx("th",{children:"Process Name"}),e.jsx("th",{children:"Status"})]})}),e.jsx("tbody",{children:x.map((s,t)=>e.jsxs("tr",{children:[e.jsx("th",{children:s==null?void 0:s.token_no}),e.jsx("th",{children:s==null?void 0:s.process_desc}),e.jsx("th",{children:s==null?void 0:s.status})]}))})]})})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{class:"card",children:[e.jsx("div",{className:"card-header",children:e.jsx("h4",{children:"Pending"})}),e.jsx("div",{class:"card-body border-bottom py-3",children:e.jsx("div",{class:"d-flex",children:e.jsxs("div",{class:"ms-auto text-secondary",children:["Search:",e.jsx("div",{class:"ms-2 d-inline-block",children:e.jsx("input",{type:"text",class:"form-control form-control-sm","aria-label":"Search candidate",value:m,onChange:f})})]})})}),e.jsx("div",{class:"table-responsive",children:e.jsxs("table",{class:"table card-table table-vcenter text-nowrap datatable",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Token No"}),e.jsx("th",{children:"Process Name"}),e.jsx("th",{children:"Status"})]})}),e.jsx("tbody",{children:a.map((s,t)=>e.jsxs("tr",{children:[e.jsx("th",{children:s==null?void 0:s.token_no}),e.jsx("th",{children:s==null?void 0:s.process_desc}),e.jsx("th",{children:s==null?void 0:s.status})]}))})]})})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{class:"card",children:[e.jsx("div",{className:"card-header",children:e.jsx("h4",{children:"In Process"})}),e.jsx("div",{class:"card-body border-bottom py-3",children:e.jsx("div",{class:"d-flex",children:e.jsxs("div",{class:"ms-auto text-secondary",children:["Search:",e.jsx("div",{class:"ms-2 d-inline-block",children:e.jsx("input",{type:"text",class:"form-control form-control-sm","aria-label":"Search candidate",value:b,onChange:N})})]})})}),e.jsx("div",{class:"table-responsive",children:e.jsxs("table",{class:"table card-table table-vcenter text-nowrap datatable",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Token No"}),e.jsx("th",{children:"Process Name"}),e.jsx("th",{children:"Status"})]})}),e.jsx("tbody",{children:o.map((s,t)=>e.jsxs("tr",{children:[e.jsx("th",{children:s==null?void 0:s.token_no}),e.jsx("th",{children:s==null?void 0:s.process_desc}),e.jsx("th",{children:s==null?void 0:s.status})]}))})]})})]})})]})})})]})}export{R as default};
