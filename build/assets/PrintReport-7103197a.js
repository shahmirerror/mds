import{r as t,j as e,a as b}from"./app-078181b4.js";import{A as f}from"./AuthenticatedLayout-3f3fe829.js";import"./TextInput-f468e4f9.js";import{Q as w,B as r}from"./ReactToastify-d82c62be.js";function S(n){const[u,C]=t.useState("None"),[s,i]=t.useState(null),[m,p]=t.useState(null),[h,x]=t.useState(null),[g,N]=t.useState(null),j=l=>{i(null);const o={centre_id:n.auth.user.centre.centre_id,serial_no:m,reg_date:h},c=JSON.stringify(o);if(m==null&&h==null)r.warning("Please select date & serial number or input barcode number to proceed!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"});else try{const d=fetch(route("lab.fetch_registration_print_normal"),{method:"POST",body:c}).then(a=>a.json()).then(a=>{a.registration.length==0?r.warning("No Registration Found!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}):(i(a.registration),r.success("Candidate Found!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}))},a=>{r.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})})}catch{r.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}},v=l=>{i(null);const o={centre_id:n.auth.user.centre.centre_id,passport_no:g},c=JSON.stringify(o);if(g==null)r.warning("Please input barcode number to proceed!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"});else try{const d=fetch(route("lab.fetch_registration_print_passport"),{method:"POST",body:c}).then(a=>a.json()).then(a=>{a.registration.length==0?r.warning("No Registration Found!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}):(i(a.registration),r.success("Candidate Found!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}))},a=>{r.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})})}catch{r.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}};return e.jsxs(f,{user:n.auth.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Print Report"}),children:[e.jsx(b,{title:"Print Report"}),e.jsx(w,{position:"top-right",autoClose:5e3,hideProgressBar:!1,newestOnTop:!1,closeOnClick:!0,rtl:!1,pauseOnFocusLoss:!0,draggable:!0,pauseOnHover:!0,theme:"light"}),e.jsx("div",{className:"page-header d-print-none",children:e.jsx("div",{className:"container-xl",children:e.jsx("div",{className:"row g-2 align-items-center",children:e.jsxs("div",{className:"col align-items-center",children:[e.jsx("div",{className:"col-md-3",style:{float:"left"},children:e.jsx("h2",{className:"page-title",style:{float:"left"},children:"Print Report"})}),e.jsx("div",{className:"col-md-3 align-items-center",style:{float:"right"},children:e.jsx("h2",{className:"page-title",children:e.jsxs("span",{className:"badge",children:["Current Token: ",u]})})})]})})})}),e.jsx("div",{className:"page-body",children:e.jsx("div",{className:"container-xl",children:e.jsxs("div",{className:"row row-cards mb-5",children:[e.jsxs("div",{className:"col-md-6",children:[e.jsx("div",{className:"row row-cards",children:e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-header",children:e.jsx("div",{className:"col-md-12 flex align-items-center",children:e.jsx("div",{className:"col-md-6",style:{float:"left"},children:e.jsx("h3",{children:"Candidate Information"})})})}),e.jsx("div",{className:"card-body",id:"manual_import",children:e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Date"}),e.jsx("input",{type:"date",className:"form-control",name:"reg_date",onChange:l=>x(l.target.value)})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Serial Number"}),e.jsx("input",{type:"text",className:"form-control",name:"serial_no",onChange:l=>p(l.target.value)})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Passport Number"}),e.jsx("input",{type:"text",className:"form-control",name:"passport_no",onChange:l=>N(l.target.value)})]})})]})})]})})}),s&&e.jsx("div",{className:"row row-cards",children:e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-header",children:e.jsx("div",{className:"col-md-12 flex align-items-center",children:e.jsx("div",{className:"col-md-6",style:{float:"left"},children:e.jsx("h3",{children:"Candidate Information"})})})}),e.jsx("div",{className:"card-body",id:"manual_import",children:e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Candidate Name"}),e.jsx("input",{type:"text",className:"form-control",name:"candidate_name",value:s==null?void 0:s.candidate_name,disabled:!0})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Relative Name"}),e.jsx("input",{type:"text",className:"form-control",name:"passport_no",value:s==null?void 0:s.relative_name,disabled:!0})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Passport Number"}),e.jsx("input",{type:"date",className:"form-control",name:"passport_issue_date",value:s==null?void 0:s.passport_no,disabled:!0})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"CNIC"}),e.jsx("input",{type:"date",className:"form-control",name:"passport_expiry_date",value:s==null?void 0:s.cnic,disabled:!0})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Country"}),e.jsx("input",{type:"date",className:"form-control",name:"dob",value:s==null?void 0:s.country,disabled:!0})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Registration Date"}),e.jsx("input",{type:"date",className:"form-control",name:"passport_image",value:s==null?void 0:s.reg_date,disabled:!0})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Serial No"}),e.jsx("input",{type:"text",className:"form-control",name:"passport_image",value:s==null?void 0:s.serial_no,disabled:!0})]})})]})})]})})})]}),e.jsx("div",{className:"col-md-6",children:e.jsx("div",{className:"row row-cards",children:e.jsx("div",{className:"col-12",children:e.jsx("div",{className:"card",children:e.jsxs("div",{className:"card-body",id:"manual_import",children:[e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-3",children:e.jsx("div",{className:"row g-3 align-items-center",children:e.jsx("button",{className:"btn btn-primary btn-md",onClick:j,children:"Find Candidate"})})}),e.jsx("div",{className:"col-4",children:e.jsx("div",{className:"row g-3",children:e.jsx("button",{className:"btn btn-info btn-md",onClick:v,children:"Find Candidate by Passport"})})}),e.jsx("div",{className:"col-3",children:e.jsx("div",{className:"row g-3 align-items-center",children:e.jsx("button",{className:"btn btn-success btn-md",disabled:s==null,children:"Print Report"})})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-3",children:e.jsx("div",{className:"row g-3 align-items-center",children:e.jsx("button",{className:"btn btn-secondary btn-md",disabled:s==null,children:"History"})})}),e.jsx("div",{className:"col-4",children:e.jsx("div",{className:"row g-3",children:e.jsx("button",{className:"btn btn-outline-success btn-md",disabled:s==null,children:"Embassy Slip"})})})]})]})})})})})]})})})]})}export{S as default};
