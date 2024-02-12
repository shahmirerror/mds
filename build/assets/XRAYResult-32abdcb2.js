import{r as a,W as m,j as e,a as o}from"./app-abf259ba.js";import{A as h}from"./AuthenticatedLayout-72ed3d24.js";import"./TextInput-d3884dd3.js";function y({auth:c}){const[x,i]=a.useState(null),[j,n]=a.useState(null);a.useState(!1),a.useState(null),a.useState(null),a.useState(null);const[t,N]=a.useState("None"),{data:u,setData:r,post:g,processing:d,errors:v,reset:f}=m({chest:"",note:"",serial_no:"",remarks:"",date:"",images:""});a.useEffect(()=>{},[]);const l=s=>{s.target.name=="images"?r(s.target.name,s.target.files):r(s.target.name,s.target.value)};return e.jsxs(h,{user:c.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Xray Result"}),children:[e.jsx(o,{title:"XRAY Result"}),e.jsx("div",{className:"page-header d-print-none",children:e.jsx("div",{className:"container-xl",children:e.jsx("div",{className:"row g-2 align-items-center",children:e.jsxs("div",{className:"col align-items-center",children:[e.jsx("div",{className:"col-md-3",style:{float:"left"},children:e.jsx("h2",{className:"page-title",style:{float:"left"},children:"XRAY Result"})}),e.jsx("div",{className:"col-md-3 align-items-center",style:{float:"right"},children:e.jsx("h2",{className:"page-title",children:e.jsxs("span",{className:"badge",children:["Current Token: ",t]})})})]})})})}),e.jsx("div",{className:"page-body",children:e.jsx("div",{className:"container-xl",children:e.jsxs("div",{className:"row row-cards mb-5",children:[e.jsx("div",{className:"col-md-8",children:e.jsx("div",{className:"row row-cards",children:e.jsx("div",{className:"col-12",children:e.jsx("div",{className:"card",children:e.jsxs("div",{className:"card-body",id:"manual_import",children:[e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Date"}),e.jsx("input",{type:"date",className:"form-control",name:"date",onChange:l})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Serial Number"}),e.jsx("input",{type:"text",className:"form-control",name:"serial_no",onChange:l})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Chest"}),e.jsxs("select",{className:"form-select",name:"chest",required:!0,onChange:l,children:[e.jsx("option",{value:"",children:"- SELECT -"}),e.jsx("option",{value:"lung fields clear",children:"LUNG FIELDS CLEAR"}),e.jsx("option",{value:"unfit due to x-ray findings",children:"Unfit Due to X-Ray Findings."}),e.jsx("option",{value:"see notes",children:'"See Notes"'})]})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Images"}),e.jsx("input",{type:"file",className:"form-control",name:"images",multiple:!0,onChange:l})]})})]}),e.jsxs("div",{className:"row g-5",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Notes"}),e.jsx("textarea",{className:"form-control",name:"notes",onChange:l})]})}),e.jsx("div",{className:"col-6 pt-6",children:e.jsx("button",{class:"btn btn-md btn-outline-primary",disabled:d,children:"Save Result"})})]})]})})})})}),e.jsx("div",{className:"col-md-4",children:e.jsx("div",{className:"row row-cards",children:e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-header",children:e.jsx("h4",{children:"Search Xray Result"})}),e.jsx("div",{className:"card-body",id:"manual_import",children:e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Date"}),e.jsx("input",{type:"date",className:"form-control",name:"search_date",onChange:s=>i(s.target.value)})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Serial Number"}),e.jsx("input",{type:"text",className:"form-control",name:"search_serial_number",onChange:s=>n(s.target.value)})]})})]})})]})})})})]})})})]})}export{y as default};
