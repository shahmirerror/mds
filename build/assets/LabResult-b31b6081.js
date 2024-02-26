import{r as c,W as T,j as e,a as L}from"./app-39c368c7.js";import{A as B}from"./AuthenticatedLayout-3c3e3819.js";import"./TextInput-3bffad1a.js";import{Q as R,B as n}from"./ReactToastify-35e89cca.js";import{I as k}from"./IconRefresh-95f031ad.js";import"./createReactComponent-3d9c90ae.js";import"./index-eb642c4a.js";function K(h){const[x,u]=c.useState(null),[v,N]=c.useState(null),[j,b]=c.useState(null),[y,A]=c.useState("None"),[s,g]=c.useState(null),[_,p]=c.useState(null);c.useState(!1);const[f,w]=c.useState(!1),{data:l,setData:S,post:H,processing:D,errors:M,reset:V}=T({sugar:"",albumin:"",hiv:"",hcv:"",alk:"",ast:"",alt:"",ova:"",cyst:"",tb:"",pregnancy:"",hbsag:"",vdrl:"",tpha:"",bil:"",creatinine:"",blood_group:"",haemoglobin:"",rbs:"",malaria:"",micro_filariae:"",polio:"",polio_date:"",mmr1:"",mmr1_date:"",mmr2:"",mmr2_date:"",meningococcal:"",meningococcal_date:""}),P=async i=>{p(null),g(null),i.target.disabled=!0;const o={centre_id:h.auth.user.centre.centre_id,barcode:x,serial_no:j,reg_date:v,process_id:"lab"},d=JSON.stringify(o);if(j==null&&v==null&&x==null)n.warning("Please select date & serial number or input barcode number to proceed!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"});else try{const m=await n.promise(fetch(route("lab.fetch_registration"),{method:"POST",body:d}),{pending:"Fetching Candidate"}).then(r=>r.json()).then(r=>{var C;r.registration.length==0?(i.target.disabled=!1,n.warning("No Candidate Found!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})):(g(r.registration),w(!0),((C=r.verified)==null?void 0:C.length)==0||r.verified==!1?(p(r.verified),n.success("Candidate Found!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})):n.warning("Candidate Lab Result Exists!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}))},r=>{i.target.disabled=!1,n.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})})}catch{i.target.disabled=!1,n.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}},O=async i=>{i.target.disabled=!0;const o={centre_id:h.auth.user.centre.centre_id,reg_id:s==null?void 0:s.reg_id,data:l},d=JSON.stringify(o);try{const m=await n.promise(fetch(route("lab.store_lab_result"),{method:"POST",body:d}),{pending:"Submitting Form"}).then(r=>r.json()).then(r=>{r.message=="Lab Result Stored"?(i.target.disabled=!1,n.success("Lab Result has been saved!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}),t()):(i.target.disabled=!1,t(),n.warning("Candidate Lab Result Exists!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}))},r=>{i.target.disabled=!1,n.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})})}catch{i.target.disabled=!1,n.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}},E=async i=>{i.target.disabled=!0;const o={centre_id:h.auth.user.centre.centre_id,reg_id:s==null?void 0:s.reg_id,data:l},d=JSON.stringify(o);try{const m=await n.promise(fetch(route("lab.update_lab_result"),{method:"POST",body:d}),{pending:"Submitting Form"}).then(r=>r.json()).then(r=>{r.message=="Lab Result Updated"&&(i.target.disabled=!1,n.success("Lab Result has been updaed!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}),t())},r=>{i.target.disabled=!1,n.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})})}catch{i.target.disabled=!1,n.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}},a=i=>{S(i.target.name,i.target.value)},t=i=>{g(null),u(""),N(""),b(""),w(!1)};return e.jsxs(B,{user:h.auth.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Lab Result"}),children:[e.jsx(L,{title:"Lab Result"}),e.jsx(R,{position:"top-right",autoClose:5e3,hideProgressBar:!1,newestOnTop:!1,closeOnClick:!0,rtl:!1,pauseOnFocusLoss:!0,draggable:!0,pauseOnHover:!0,theme:"light"}),e.jsx("div",{className:"page-header d-print-none",children:e.jsx("div",{className:"container-xl",children:e.jsx("div",{className:"row g-2 align-items-center",children:e.jsxs("div",{className:"col align-items-center",children:[e.jsx("div",{className:"col-md-3",style:{float:"left"},children:e.jsx("h2",{className:"page-title",style:{float:"left"},children:"Lab Result"})}),e.jsx("div",{className:"col-md-3 align-items-center",style:{float:"right"},children:e.jsxs("h2",{className:"page-title",children:[e.jsx("button",{className:"btn btn-secondary btn-sm mr-5 btn-pill",onClick:t,children:e.jsx(k,{})}),e.jsxs("span",{className:"badge",children:["Current Token: ",y]})]})})]})})})}),e.jsx("div",{className:"page-body",children:e.jsx("div",{className:"container-xl",children:e.jsxs("div",{className:"row row-cards mb-5",children:[e.jsx("div",{className:"col-md-6",children:e.jsxs("div",{className:"row row-cards",children:[e.jsx("div",{className:"col-12",children:e.jsx("div",{className:"card",children:e.jsxs("div",{className:"card-body",children:[e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Barcode"}),e.jsx("input",{type:"password",className:"form-control",name:"barcode",value:x,onChange:i=>u(i.target.value)})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Date"}),e.jsx("input",{type:"date",className:"form-control",name:"reg_date",value:v,onChange:i=>N(i.target.value)})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Serial Number"}),e.jsx("input",{type:"text",className:"form-control",name:"serial_no",value:j,onChange:i=>b(i.target.value)})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-2"}),e.jsx("div",{className:"col-4",children:e.jsx("button",{className:"btn btn-md btn-outline-secondary",disabled:!f,onClick:t,children:"Reset Form"})}),e.jsx("div",{className:"col-4",children:e.jsx("button",{className:"btn btn-md btn-outline-info",disabled:f,onClick:P,children:"Search for Candidate"})})]})]})})}),s!=null&&e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-header",children:e.jsx("div",{className:"col-md-12 flex align-items-center",children:e.jsx("div",{className:"col-md-6",style:{float:"left"},children:e.jsx("h3",{children:"Candidate Information"})})})}),e.jsxs("div",{className:"card-body",children:[e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Candidate Name"}),e.jsx("input",{type:"text",className:"form-control",name:"reg_date",disabled:!0,value:s==null?void 0:s.candidate_name})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Passport Number"}),e.jsx("input",{type:"text",className:"form-control",name:"serial_no",disabled:!0,value:s==null?void 0:s.passport_no})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Passport Issue Date"}),e.jsx("input",{type:"date",className:"form-control",name:"reg_date",disabled:!0,value:s==null?void 0:s.passport_issue_date})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Passport Expiry Date"}),e.jsx("input",{type:"date",className:"form-control",name:"serial_no",disabled:!0,value:s==null?void 0:s.passport_expiry_date})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Registration Date"}),e.jsx("input",{type:"date",className:"form-control",name:"reg_date",disabled:!0,value:s==null?void 0:s.reg_date})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Serial Number"}),e.jsx("input",{type:"text",className:"form-control",name:"serial_no",disabled:!0,value:s==null?void 0:s.serial_no})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Agency"}),e.jsx("input",{type:"text",className:"form-control",name:"serial_no",disabled:!0,value:s==null?void 0:s.agency})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Country"}),e.jsx("input",{type:"text",className:"form-control",name:"serial_no",disabled:!0,value:s==null?void 0:s.country})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Profession"}),e.jsx("input",{type:"text",className:"form-control",name:"serial_no",disabled:!0,value:s==null?void 0:s.profession})]})}),e.jsx("div",{className:"col-3",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Fees"}),e.jsx("input",{type:"text",className:"form-control",name:"serial_no",disabled:!0,value:s==null?void 0:s.fee_charged})]})}),e.jsx("div",{className:"col-3",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Discount"}),e.jsx("input",{type:"text",className:"form-control",name:"serial_no",disabled:!0,value:s==null?void 0:s.discount})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Relation"}),e.jsx("input",{type:"text",className:"form-control",name:"serial_no",disabled:!0,value:s==null?void 0:s.relation_type})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Relative Name"}),e.jsx("input",{type:"text",className:"form-control",name:"serial_no",disabled:!0,value:s==null?void 0:s.relative_name})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Phone 1"}),e.jsx("input",{type:"text",className:"form-control",name:"serial_no",disabled:!0,value:s==null?void 0:s.phone_1})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Phone 2"}),e.jsx("input",{type:"text",className:"form-control",name:"serial_no",disabled:!0,value:s==null?void 0:s.phone_2})]})})]}),e.jsxs("div",{className:"row g-5",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Marital Status"}),e.jsx("input",{type:"text",className:"form-control",name:"serial_no",disabled:!0,value:s==null?void 0:s.marital_status})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Remarks"}),e.jsx("textarea",{className:"form-control",disabled:!0,children:s==null?void 0:s.remarks})]})})]})]})]})})]})}),e.jsx("div",{className:"col-md-6",children:e.jsxs("div",{className:"row row-cards",children:[e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-header",children:e.jsx("div",{className:"col-md-12 flex align-items-center",children:e.jsx("div",{className:"col-md-12",style:{float:"left"},children:e.jsx("h2",{style:{float:"left"},className:"h2",children:"URINE"})})})}),e.jsx("div",{className:"card-body",children:e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Sugar"}),e.jsxs("select",{className:"form-select",name:"sugar",value:l.sugar,onChange:a,children:[e.jsx("option",{value:"--",children:"- SELECT -"}),e.jsx("option",{value:"negative",children:"Negative"}),e.jsx("option",{value:"positive",children:"Positive"}),e.jsx("option",{value:"see notes",children:"See Notes"})]})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Albumin"}),e.jsxs("select",{className:"form-select",name:"albumin",value:l.albumin,onChange:a,children:[e.jsx("option",{value:"--",children:"- SELECT -"}),e.jsx("option",{value:"negative",children:"Negative"}),e.jsx("option",{value:"positive",children:"Positive"}),e.jsx("option",{value:"see notes",children:"See Notes"})]})]})})]})})]})}),e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-header",children:e.jsx("div",{className:"col-md-12 flex align-items-center",children:e.jsx("div",{className:"col-md-12",style:{float:"left"},children:e.jsx("h2",{style:{float:"left"},className:"h2",children:"STOOL"})})})}),e.jsx("div",{className:"card-body",children:e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Helminthes"}),e.jsxs("select",{className:"form-select",name:"helminthes",value:l.helminthes,onChange:a,children:[e.jsx("option",{value:"--",children:"- SELECT -"}),e.jsx("option",{value:"absent",children:"Absent"}),e.jsx("option",{value:"present",children:"Present"})]})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"OVA"}),e.jsxs("select",{className:"form-select",name:"ova",value:l.ova,onChange:a,children:[e.jsx("option",{value:"--",children:"- SELECT -"}),e.jsx("option",{value:"absent",children:"Absent"}),e.jsx("option",{value:"present",children:"Present"})]})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Cyst"}),e.jsxs("select",{className:"form-select",name:"cyst",value:l.cyst,onChange:a,children:[e.jsx("option",{value:"--",children:"- SELECT -"}),e.jsx("option",{value:"absent",children:"Absent"}),e.jsx("option",{value:"present",children:"Present"})]})]})})]})})]})}),e.jsx("div",{className:"col-12",children:e.jsx("div",{className:"card",children:e.jsx("div",{className:"card-body",children:e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"T.B Test"}),e.jsxs("select",{className:"form-select",name:"tb",value:l.tb,onChange:a,children:[e.jsx("option",{value:"--",children:"- SELECT -"}),e.jsx("option",{value:"absent",children:"Absent"}),e.jsx("option",{value:"present",children:"Present"})]})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Pregnancy Test"}),e.jsxs("select",{className:"form-select",name:"pregnancy",value:l.pregnancy,onChange:a,children:[e.jsx("option",{value:"--",children:"--"}),e.jsx("option",{value:"negative",children:"Negative"}),e.jsx("option",{value:"positive",children:"Positive"})]})]})})]})})})}),e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-header",children:e.jsx("div",{className:"col-md-12 flex align-items-center",children:e.jsx("div",{className:"col-md-12",style:{float:"left"},children:e.jsx("h2",{style:{float:"left"},className:"h2",children:"SEROLOGY"})})})}),e.jsx("div",{className:"card-body",children:e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"HCV"}),e.jsxs("select",{className:"form-select",name:"hcv",value:l.hcv,onChange:a,children:[e.jsx("option",{value:"--",children:"- SELECT -"}),e.jsx("option",{value:"negative",children:"Negative"}),e.jsx("option",{value:"positive",children:"Positive"}),e.jsx("option",{value:"see notes",children:"See Notes"})]})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"HBsAg"}),e.jsxs("select",{className:"form-select",name:"hbsag",value:l.hbsag,onChange:a,children:[e.jsx("option",{value:"--",children:"- SELECT -"}),e.jsx("option",{value:"negative",children:"Negative"}),e.jsx("option",{value:"positive",children:"Positive"}),e.jsx("option",{value:"see notes",children:"See Notes"})]})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"HIV 1.2"}),e.jsxs("select",{className:"form-select",name:"hiv",value:l.hiv,onChange:a,children:[e.jsx("option",{value:"--",children:"- SELECT -"}),e.jsx("option",{value:"negative",children:"Negative"}),e.jsx("option",{value:"positive",children:"Positive"}),e.jsx("option",{value:"see notes",children:"See Notes"})]})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"VDRL"}),e.jsxs("select",{className:"form-select",name:"vdrl",value:l.vdrl,onChange:a,children:[e.jsx("option",{value:"--",children:"- SELECT -"}),e.jsx("option",{value:"negative",children:"Negative"}),e.jsx("option",{value:"positive",children:"Positive"}),e.jsx("option",{value:"see notes",children:"See Notes"})]})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"TPHA"}),e.jsxs("select",{className:"form-select",name:"tpha",value:l.tpha,onChange:a,children:[e.jsx("option",{value:"--",children:"- SELECT -"}),e.jsx("option",{value:"negative",children:"Negative"}),e.jsx("option",{value:"positive",children:"Positive"}),e.jsx("option",{value:"see notes",children:"See Notes"})]})]})})]})})]})}),e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-header",children:e.jsx("div",{className:"col-md-12 flex align-items-center",children:e.jsx("div",{className:"col-md-12",style:{float:"left"},children:e.jsx("h2",{style:{float:"left"},className:"h2",children:"BIOCHEMISTRY"})})})}),e.jsxs("div",{className:"card-body",children:[e.jsx("div",{className:"row g-5 mb-3",children:e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"R.B.S"}),e.jsx("input",{className:"form-control",type:"text",name:"rbs",id:"rbs",value:l.rbs,onChange:a})]})})}),e.jsx("hr",{}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("label",{children:"L.F.T"}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"BIL"}),e.jsx("input",{className:"form-control",type:"text",name:"bil",id:"bil",value:l.bil,onChange:a})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"ALT"}),e.jsx("input",{className:"form-control",type:"text",name:"alt",id:"alt",value:l.alt,onChange:a})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"AST"}),e.jsx("input",{className:"form-control",type:"text",name:"ast",id:"ast",value:l.ast,onChange:a})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"ALK"}),e.jsx("input",{className:"form-control",type:"text",name:"alk",id:"alk",value:l.alk,onChange:a})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Creatinine"}),e.jsx("input",{className:"form-control",type:"text",name:"creatinine",id:"creatinine",value:l.creatinine,onChange:a})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Blood Group"}),e.jsxs("select",{class:"form-control",name:"blood_group",id:"blood_group",value:l.blood_group,onChange:a,children:[e.jsx("option",{value:"--",children:"- SELECT -"}),e.jsx("option",{value:"A+",children:"A+"}),e.jsx("option",{value:"B+",children:"B+"}),e.jsx("option",{value:"AB+",children:"AB+"}),e.jsx("option",{value:"A-",children:"A-"}),e.jsx("option",{value:"B-",children:"B-"}),e.jsx("option",{value:"AB-",children:"AB-"}),e.jsx("option",{value:"O+",children:"O+"}),e.jsx("option",{value:"O-",children:"O-"})]})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Haemoglobin"}),e.jsx("input",{className:"form-control",type:"text",name:"haemoglobin",id:"haemoglobin",value:l.haemoglobin,onChange:a})]})})]}),e.jsx("hr",{}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("label",{children:"Thick Film For"}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Malaria"}),e.jsxs("select",{class:"form-select",name:"malaria",id:"malaria",value:l.malaria,onChange:a,children:[e.jsx("option",{value:"--",children:"- SELECT -"}),e.jsx("option",{value:"absent",children:"Absent"}),e.jsx("option",{value:"present",children:"Present"})]})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Micro Filariae"}),e.jsxs("select",{class:"form-select",name:"micro_filariae",id:"micro_filariae",value:l.micro_filariae,onChange:a,children:[e.jsx("option",{value:"--",children:"- SELECT -"}),e.jsx("option",{value:"absent",children:"Absent"}),e.jsx("option",{value:"present",children:"Present"})]})]})})]})]})]})}),e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-header",children:e.jsx("div",{className:"col-md-12 flex align-items-center",children:e.jsx("div",{className:"col-md-12",style:{float:"left"},children:e.jsx("h2",{style:{float:"left"},className:"h2",children:"VACCINATION STATUS"})})})}),e.jsxs("div",{className:"card-body",children:[e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Polio"}),e.jsxs("select",{class:"form-control",name:"polio",id:"polio",value:l.polio,onChange:a,children:[e.jsx("option",{value:"--",children:"- SELECT -"}),e.jsx("option",{value:"non-vaccinated",children:"Non-Vaccinated"}),e.jsx("option",{value:"vaccinated",children:"Vaccinated"})]})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Polio Date"}),e.jsx("input",{className:"form-control",type:"date",name:"polio_date",value:l.polio_date,onChange:a})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"MMR1"}),e.jsxs("select",{class:"form-control",name:"mmr1",id:"mmr1",value:l.mmr1,onChange:a,children:[e.jsx("option",{value:"--",children:"- SELECT -"}),e.jsx("option",{value:"non-vaccinated",children:"Non-Vaccinated"}),e.jsx("option",{value:"vaccinated",children:"Vaccinated"})]})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"MMR1 Date"}),e.jsx("input",{className:"form-control",type:"date",name:"mmr1_date",value:l.mmr1_date,onChange:a})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"MMR2"}),e.jsxs("select",{class:"form-control",name:"mmr2",id:"mmr2",value:l.mmr2,onChange:a,children:[e.jsx("option",{value:"--",children:"- SELECT -"}),e.jsx("option",{value:"non-vaccinated",children:"Non-Vaccinated"}),e.jsx("option",{value:"vaccinated",children:"Vaccinated"})]})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"MMR2 Date"}),e.jsx("input",{className:"form-control",type:"date",name:"mmr2_date",value:l.mmr2_date,onChange:a})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Meningococcal"}),e.jsxs("select",{class:"form-control",name:"meningococcal",id:"meningococcal",value:l.meningococcal,onChange:a,children:[e.jsx("option",{value:"--",children:"- SELECT -"}),e.jsx("option",{value:"non-vaccinated",children:"Non-Vaccinated"}),e.jsx("option",{value:"vaccinated",children:"Vaccinated"})]})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Meningococcal Date"}),e.jsx("input",{className:"form-control",type:"date",name:"meningococcal_date",value:l.meningococcal_date,onChange:a})]})})]})]})]})}),e.jsx("div",{className:"col-8",children:e.jsx("div",{className:"card",children:e.jsx("div",{className:"card-body",children:e.jsx("div",{className:"row g-3",children:e.jsx("div",{className:"col-12",children:e.jsx("div",{className:"row g-3 align-items-center justify-content-center",children:e.jsx("div",{className:"col-md-12 text-center",children:_==null?e.jsx("button",{className:"btn btn-success btn-md w-50",disabled:s==null,onClick:O,children:"Save & Upload Result"}):e.jsx("button",{className:"btn btn-success btn-md w-50",disabled:s==null,onClick:E,children:"Update & Upload Result"})})})})})})})})]})})]})})})]})}export{K as default};