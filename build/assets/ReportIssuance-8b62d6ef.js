import{r as l,j as e,a as b}from"./app-c11e87d9.js";import{A as f}from"./AuthenticatedLayout-b2b3a3e1.js";import"./TextInput-0ea3fed6.js";import{Q as C,B as a}from"./ReactToastify-da45a59a.js";import{I as w}from"./IconRefresh-f17f4890.js";import"./createReactComponent-3a3ccaf3.js";import"./index-09cc7d7f.js";function R(o){const[g,d]=l.useState("None"),[s,m]=l.useState(null),[h,p]=l.useState(null),[x,N]=l.useState(!1),j=t=>{m(null);const i={centre_id:o.auth.user.centre.centre_id,barcode:h,process_id:6},n=JSON.stringify(i);if(h==null)a.warning("Please input barcode number to proceed!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"});else try{const c=fetch(route("lab.fetch_registration"),{method:"POST",body:n}).then(r=>r.json()).then(r=>{r.registration.length==0?a.warning("No Registration Found!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}):(m(r.registration),d("M"+r.registration.token_no),N(r.verified),r.verified?a.warning("Candidate Report Already Issued!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}):a.success("Candidate Found!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}))},r=>{a.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})})}catch{a.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}},v=t=>{const i={centre_id:o.auth.user.centre.centre_id,token_no:s.token_no,reg_date:s.reg_date,reg_id:s.reg_id},n=JSON.stringify(i);try{const c=fetch(route("lab.report_issue"),{method:"POST",body:n}).then(r=>r.json()).then(r=>{d("None"),u(),a.success("Report has been issued!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})},r=>{a.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})})}catch{a.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}},u=t=>{location.reload()};return e.jsxs(f,{user:o.auth.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Report Issue"}),children:[e.jsx(b,{title:"Report Issue"}),e.jsx(C,{position:"top-right",autoClose:5e3,hideProgressBar:!1,newestOnTop:!1,closeOnClick:!0,rtl:!1,pauseOnFocusLoss:!0,draggable:!0,pauseOnHover:!0,theme:"light"}),e.jsx("div",{className:"page-header d-print-none",children:e.jsx("div",{className:"container-xl",children:e.jsx("div",{className:"row g-2 align-items-center",children:e.jsxs("div",{className:"col align-items-center",children:[e.jsx("div",{className:"col-md-3",style:{float:"left"},children:e.jsx("h2",{className:"page-title",style:{float:"left"},children:"Report Issue"})}),e.jsx("div",{className:"col-md-3 align-items-center",style:{float:"right"},children:e.jsxs("h2",{className:"page-title",children:[e.jsx("button",{className:"btn btn-secondary btn-sm mr-5 btn-pill",onClick:u,children:e.jsx(w,{})}),e.jsxs("span",{className:"badge",children:["Current Token: ",g]})]})})]})})})}),e.jsx("div",{className:"page-body",children:e.jsx("div",{className:"container-xl",children:e.jsxs("div",{className:"row row-cards mb-5",children:[e.jsx("div",{className:"col-md-6",children:s&&e.jsx("div",{className:"row row-cards",children:e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-header",children:e.jsx("div",{className:"col-md-12 flex align-items-center",children:e.jsx("div",{className:"col-md-6",style:{float:"left"},children:e.jsx("h3",{children:"Candidate Information"})})})}),e.jsx("div",{className:"card-body",id:"manual_import",children:e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Candidate Name"}),e.jsx("input",{type:"text",className:"form-control",name:"candidate_name",value:s==null?void 0:s.candidate_name,disabled:!0})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Relative Name"}),e.jsx("input",{type:"text",className:"form-control",name:"passport_no",value:s==null?void 0:s.relative_name,disabled:!0})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Passport Number"}),e.jsx("input",{type:"text",className:"form-control",name:"passport_issue_date",value:s==null?void 0:s.passport_no,disabled:!0})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"CNIC"}),e.jsx("input",{type:"text",className:"form-control",name:"passport_expiry_date",value:s==null?void 0:s.cnic,disabled:!0})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Country"}),e.jsx("input",{type:"date",className:"form-control",name:"dob",value:s==null?void 0:s.country,disabled:!0})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Registration Date"}),e.jsx("input",{type:"date",className:"form-control",name:"passport_image",value:s==null?void 0:s.reg_date,disabled:!0})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Serial No"}),e.jsx("input",{type:"text",className:"form-control",name:"passport_image",value:s==null?void 0:s.serial_no,disabled:!0})]})})]})})]})})})}),e.jsx("div",{className:"col-md-6",children:e.jsx("div",{className:"row row-cards",children:e.jsx("div",{className:"col-12",children:e.jsx("div",{className:"card",children:e.jsx("div",{className:"card-body",id:"manual_import",children:e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Barcode Number"}),e.jsx("input",{type:"password",className:"form-control",name:"reg_date",onChange:t=>p(t.target.value)})]})}),e.jsx("div",{className:"col-4",children:e.jsx("div",{className:"row g-3 align-items-center mt-4",children:e.jsx("button",{className:"btn btn-md btn-info",onClick:j,disabled:s!=null,children:"Find"})})}),e.jsx("div",{className:"col-4",children:e.jsx("div",{className:"row g-3 align-items-center mt-4",children:e.jsx("button",{className:"btn btn-md btn-info",onClick:v,disabled:s==null||x==!0,children:"Issue Report"})})})]})})})})})})]})})})]})}export{R as default};