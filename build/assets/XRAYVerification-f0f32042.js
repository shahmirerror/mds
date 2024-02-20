import{r as i,W as B,j as e,a as R}from"./app-c11e87d9.js";import{A as H}from"./AuthenticatedLayout-b2b3a3e1.js";import"./TextInput-0ea3fed6.js";import{Q as T,B as a}from"./ReactToastify-da45a59a.js";import{I as A}from"./IconRefresh-f17f4890.js";import"./createReactComponent-3a3ccaf3.js";import"./index-09cc7d7f.js";function J(n){const[d,N]=i.useState(null),[m,v]=i.useState(null),[h,p]=i.useState(null),[g,w]=i.useState(!1),[y,u]=i.useState(n.token_no),[_,C]=i.useState(n.in_queue),[s,x]=i.useState(null);i.useState(!1);const[b,f]=i.useState(!1);i.useState(""),B({biometric_fingerprint:""});const O=async r=>{x(null);const o={centre_id:n.auth.user.centre.centre_id,barcode:d,serial_no:h,reg_date:m,process_id:5},c=JSON.stringify(o);if(h==null&&m==null&&d==null)a.warning("Please select date & serial number or input barcode number to proceed!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"});else try{const t=await a.promise(fetch(route("lab.fetch_registration"),{method:"POST",body:c}),{pending:"Fetching Candidate"}).then(l=>l.json()).then(l=>{l.registration.length==0?a.warning("No Registration Found!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}):(f(!0),x(l.registration),u("M"+l.registration.token_no),l.verified?(w(l.verified),a.warning("Candidate XRAY Already Verified!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})):a.success("Candidate Found!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}))},l=>{a.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})})}catch{a.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}},P=async r=>{const o={centre_id:n.auth.user.centre.centre_id,token_no:s.token_no,reg_date:s.reg_date,reg_id:s.reg_id},c=JSON.stringify(o);try{const t=await a.promise(fetch(route("lab.verify_xray"),{method:"POST",body:c}),{pending:"Submitting Form"}).then(l=>l.json()).then(l=>{u("None"),j(),a.success("XRAY Verified!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})},l=>{a.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})})}catch{a.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}},j=r=>{x(null),N(""),v(""),p(""),f(!1)},k=()=>{const r={centre_id:n.auth.user.centre.centre_id,process_id:3},o=JSON.stringify(r);try{const c=fetch(route("token.assign"),{method:"POST",body:o}).then(t=>t.json()).then(t=>{u("M"+t.new_token),C(t.in_queue),t.new_token=="None"?a.warning("No Tokens found in Queue!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}):a.success("New Token has been set!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})},t=>{a.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})})}catch{a.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}},S=()=>{k(),j(),document.getElementById("fingerPrint").src="./../assets/static/photos/ThumbPrint.png"};return e.jsxs(H,{user:n.auth.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"XRAY Verification"}),children:[e.jsx(R,{title:"XRAY Verification"}),e.jsx(T,{position:"top-right",autoClose:5e3,hideProgressBar:!1,newestOnTop:!1,closeOnClick:!0,rtl:!1,pauseOnFocusLoss:!0,draggable:!0,pauseOnHover:!0,theme:"light"}),e.jsx("div",{className:"page-header d-print-none",children:e.jsx("div",{className:"container-xl",children:e.jsx("div",{className:"row g-2 align-items-center",children:e.jsxs("div",{className:"col align-items-center",children:[e.jsx("div",{className:"col-md-3",style:{float:"left"},children:e.jsx("h2",{className:"page-title",style:{float:"left"},children:"XRAY Verification"})}),e.jsx("div",{className:"col-md-4 align-items-center",style:{float:"right"},children:e.jsxs("h2",{className:"page-title",children:[e.jsx("button",{className:"btn btn-secondary btn-sm mr-5 btn-pill",onClick:S,children:e.jsx(A,{})}),e.jsxs("span",{className:"badge",children:["Current Token: ",y]}),"|",e.jsxs("span",{className:"badge",children:["In Queue: ",_]})]})})]})})})}),e.jsx("div",{className:"page-body",children:e.jsxs("div",{className:"container-xl",children:[e.jsxs("div",{className:"row row-cards mb-5",children:[e.jsx("div",{className:"col-md-3",children:e.jsxs("div",{className:"row row-cards",children:[e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-header",children:e.jsx("div",{className:"col-md-12 flex align-items-center",children:e.jsx("div",{className:"col-md-12",style:{float:"left"},children:e.jsx("h3",{style:{float:"left"},className:"h2",children:"Biometric Verification"})})})}),e.jsx("div",{className:"card-body",children:e.jsx("div",{className:"row g-3",children:e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"row g-3 align-items-center justify-content-center",children:[e.jsx("img",{id:"fingerPrint",src:"./../assets/static/photos/ThumbPrint.png",style:{width:500}}),e.jsx("div",{className:"col-md-12 text-center",children:e.jsx("button",{className:"btn btn-purple btn-md",children:"Scan & Verify Fingerprint"})})]})})})})]})}),e.jsx("div",{className:"col-12",children:e.jsx("div",{className:"card",children:s!==null&&g==!0?e.jsx("div",{className:"card-header",children:e.jsx("h3",{children:"XRAY Verification has already been done!"})}):s!==null&&g==!1?e.jsx("div",{className:"card-body",children:e.jsx("div",{className:"row g-3",children:e.jsx("div",{className:"col-12",children:e.jsx("div",{className:"row g-3 align-items-center",children:e.jsx("div",{className:"row g-3 align-items-center",children:e.jsx("button",{className:"btn btn-info",disabled:g,onClick:P,children:"Verify Xray"})})})})})}):e.jsx(e.Fragment,{})})})]})}),e.jsx("div",{className:"col-md-8",children:e.jsxs("div",{className:"row row-cards",children:[e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-header",children:e.jsx("div",{className:"col-md-12 flex align-items-center",children:e.jsx("div",{className:"col-md-6",style:{float:"left"},children:e.jsx("h2",{children:"Passport Information"})})})}),e.jsxs("div",{className:"card-body",children:[e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Barcode"}),e.jsx("input",{type:"password",className:"form-control",name:"reg_date",value:d,onChange:r=>N(r.target.value)})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Date"}),e.jsx("input",{type:"date",className:"form-control",name:"serial_no",value:m,onChange:r=>v(r.target.value)})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Serial Number"}),e.jsx("input",{type:"text",className:"form-control",name:"serial_no",value:h,onChange:r=>p(r.target.value)})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-2"}),e.jsx("div",{className:"col-4",children:e.jsx("button",{className:"btn btn-md btn-outline-secondary",disabled:!b,onClick:j,children:"Reset Form"})}),e.jsx("div",{className:"col-4",children:e.jsx("button",{className:"btn btn-md btn-outline-info",disabled:b,onClick:O,children:"Search for Candidate"})})]})]})]})}),s&&e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-header",children:e.jsx("div",{className:"col-md-12 flex align-items-center",children:e.jsx("div",{className:"col-md-6",style:{float:"left"},children:e.jsx("h3",{children:"Candidate Information"})})})}),e.jsxs("div",{className:"card-body",children:[e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Candidate Name"}),e.jsx("input",{type:"text",disabled:!0,className:"form-control",name:"reg_date",value:s==null?void 0:s.candidate_name})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Passport Number"}),e.jsx("input",{type:"text",disabled:!0,className:"form-control",name:"serial_no",value:s==null?void 0:s.serial_no})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Passport Issue Date"}),e.jsx("input",{type:"date",className:"form-control",name:"reg_date",disabled:!0,value:s==null?void 0:s.passport_issue_date})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Passport Expiry Date"}),e.jsx("input",{type:"date",className:"form-control",name:"serial_no",disabled:!0,value:s==null?void 0:s.passport_expiry_date})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Registration Date"}),e.jsx("input",{type:"date",className:"form-control",name:"reg_date",disabled:!0,value:s==null?void 0:s.reg_date})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Serial Number"}),e.jsx("input",{type:"text",className:"form-control",name:"serial_no",disabled:!0,value:s==null?void 0:s.serial_no})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Agency"}),e.jsx("input",{type:"text",className:"form-control",name:"serial_no",disabled:!0,value:s==null?void 0:s.agency})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Country"}),e.jsx("input",{type:"text",className:"form-control",name:"serial_no",disabled:!0,value:s==null?void 0:s.country})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Profession"}),e.jsx("input",{type:"text",className:"form-control",name:"serial_no",disabled:!0,value:s==null?void 0:s.profession})]})}),e.jsx("div",{className:"col-3",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Fees"}),e.jsx("input",{className:"form-control",name:"fees",type:"text",disabled:!0,value:s==null?void 0:s.fee_charged})]})}),e.jsx("div",{className:"col-3",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Discount"}),e.jsx("input",{className:"form-control",name:"discount",type:"text",disabled:!0,value:s==null?void 0:s.discount})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Relation"}),e.jsx("input",{className:"form-control",name:"discount",type:"text",disabled:!0,value:s==null?void 0:s.relation_type})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Relative Name"}),e.jsx("input",{type:"text",className:"form-control",name:"relative_name",disabled:!0,value:s==null?void 0:s.relative_name})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Phone 1"}),e.jsx("input",{type:"text",className:"form-control",name:"phone_1",disabled:!0,value:s==null?void 0:s.phone_1})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Phone 2"}),e.jsx("input",{type:"text",className:"form-control",name:"phone_2",disabled:!0,value:s==null?void 0:s.phone_2})]})})]}),e.jsxs("div",{className:"row g-5",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Marital Status"}),e.jsx("input",{type:"text",className:"form-control",name:"phone_2",disabled:!0,value:s==null?void 0:s.marital_status})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Remarks"}),e.jsx("textarea",{className:"form-control",disabled:!0,children:s==null?void 0:s.remarks})]})})]})]})]})})]})})]}),e.jsxs("div",{className:"row row-cards",children:[e.jsx("div",{className:"col-md-6",children:e.jsx("div",{className:"row row-cards"})}),e.jsx("div",{className:"col-md-6",children:e.jsx("div",{className:"row row-cards"})})]})]})})]})}export{J as default};
