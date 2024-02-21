import{r as i,W as R,j as e,a as D}from"./app-b520917d.js";import{A as V}from"./AuthenticatedLayout-9847b026.js";import"./TextInput-f96658f4.js";import{Q as I,B as l}from"./ReactToastify-a3207ea2.js";import{I as E}from"./IconRefresh-e01220e9.js";import"./createReactComponent-ec56704d.js";import"./index-d60a9fbe.js";function Y(d){const[m,v]=i.useState(null),[h,j]=i.useState(null),[g,N]=i.useState(null),[u,f]=i.useState(!1),[_,p]=i.useState("None"),[s,c]=i.useState(null);i.useState(!1);const[b,y]=i.useState(!1),[P,q]=i.useState(""),{data:w,setData:C,post:J,processing:M,errors:A,reset:G}=R({notes:"",biometric_fingerprint:""});function O(r,n){var o="https://localhost:8443/SGIFPCapture",t=new XMLHttpRequest;t.onreadystatechange=function(){t.readyState==4&&t.status==200?r(JSON.parse(t.responseText)):t.status==404&&n(t.status)},t.onerror=function(){n(t.status)};var a="Timeout=10000";a+="&Quality=50",a+="&licstr="+encodeURIComponent(P),a+="&templateFormat=ISO",t.open("POST",o,!0),t.send(a)}function S(r){r.ErrorCode==0?(r!=null&&r.BMPBase64.length>0&&(document.getElementById("fingerPrint").src="data:image/bmp;base64,"+r.BMPBase64),C("biometric_fingerprint",r.TemplateBase64),console.log(r.TemplateBase64),F(r.TemplateBase64)):l.error("Fingerprint Capture Error Code:  "+r.ErrorCode,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}function k(r){l.warning("Check if Fingerprint Scanner is running!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}const B=r=>{r.preventDefault(),O(S,k)},F=async r=>{c(null);const n={centre_id:d.auth.user.centre.centre_id,biometric_fingerprint:r},o=JSON.stringify(n);try{const t=await l.promise(fetch(route("lab.fetch_by_fingerprint"),{method:"POST",body:o}),{pending:"Fetching Candidate"}).then(a=>a.json()).then(a=>{a.registration.length==0?l.warning("No Registration Found!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}):(c(a.registration),p("M"+a.registration.token_no),a.verified?(f(a.verified),l.warning("Candidate Passport Already Verified!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})):l.success("Candidate Found!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}))},a=>{l.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})})}catch{l.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}},H=async r=>{c(null);const n={centre_id:d.auth.user.centre.centre_id,barcode:m,serial_no:g,reg_date:h,process_id:3},o=JSON.stringify(n);if(g==null&&h==null&&m==null)l.warning("Please select date & serial number or input barcode number to proceed!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"});else try{const t=await l.promise(fetch(route("lab.fetch_registration"),{method:"POST",body:o}),{pending:"Fetching Candidate"}).then(a=>a.json()).then(a=>{a.registration.length==0?l.warning("No Registration Found!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}):(y(!0),c(a.registration),p("M"+a.registration.token_no),a.verified?(f(a.verified),l.warning("Candidate Passport Already Verified!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})):l.success("Candidate Found!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}))},a=>{l.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})})}catch{l.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}},T=async r=>{const n={centre_id:d.auth.user.centre.centre_id,notes:w.notes,token_no:s.token_no,reg_date:s.reg_date,reg_id:s.reg_id},o=JSON.stringify(n);try{const t=await l.promise(fetch(route("lab.verify_passport"),{method:"POST",body:o}),{pending:"Submitting Form"}).then(a=>a.json()).then(a=>{p("None"),x(),l.success("Passport Verified!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})},a=>{l.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})})}catch{l.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}},x=r=>{document.getElementById("fingerPrint").src="./../assets/static/photos/ThumbPrint.png",c(null),v(""),j(""),N(""),y(!1)};return e.jsxs(V,{user:d.auth.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Passport Verification"}),children:[e.jsx(D,{title:"Passport Verification"}),e.jsx(I,{position:"top-right",autoClose:5e3,hideProgressBar:!1,newestOnTop:!1,closeOnClick:!0,rtl:!1,pauseOnFocusLoss:!0,draggable:!0,pauseOnHover:!0,theme:"light"}),e.jsx("div",{className:"page-header d-print-none",children:e.jsx("div",{className:"container-xl",children:e.jsx("div",{className:"row g-2 align-items-center",children:e.jsxs("div",{className:"col align-items-center",children:[e.jsx("div",{className:"col-md-3",style:{float:"left"},children:e.jsx("h2",{className:"page-title",style:{float:"left"},children:"Passport Verification"})}),e.jsx("div",{className:"col-md-3 align-items-center",style:{float:"right"},children:e.jsxs("h2",{className:"page-title",children:[e.jsx("button",{className:"btn btn-secondary btn-sm mr-5 btn-pill",onClick:x,children:e.jsx(E,{})}),e.jsxs("span",{className:"badge",children:["Current Token: ",_]})]})})]})})})}),e.jsx("div",{className:"page-body",children:e.jsx("div",{className:"container-xl",children:e.jsxs("div",{className:"row row-cards mb-5",children:[e.jsx("div",{className:"col-md-3",children:e.jsxs("div",{className:"row row-cards",children:[e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-header",children:e.jsx("h3",{children:"Biometric Verification"})}),e.jsx("div",{className:"card-body",children:e.jsx("div",{className:"row g-3",children:e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("img",{id:"fingerPrint",src:"./../assets/static/photos/ThumbPrint.png",style:{width:500}}),e.jsx("div",{className:"col-md-12 text-center",children:e.jsx("button",{className:"btn btn-purple btn-md",onClick:B,children:"Scan & Verify fingerprint"})})]})})})})]})}),e.jsx("div",{className:"col-12",children:e.jsx("div",{className:"card",children:s!==null&&u==!0?e.jsx("div",{className:"card-header",children:e.jsx("h3",{children:"Passport has been Verified!"})}):s!==null&&u==!1?e.jsx("div",{className:"card-body",children:e.jsx("div",{className:"row g-3",children:e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Notes"}),e.jsx("textarea",{name:"notes",className:"form-control",onChange:r=>C("notes",r.target.value),children:w.notes})]}),e.jsx("div",{className:"row g-3 align-items-center",children:e.jsx("button",{className:"btn btn-info",disabled:u,onClick:T,children:"Verify Passsport"})})]})})})}):e.jsx(e.Fragment,{})})})]})}),e.jsx("div",{className:"col-md-8",children:e.jsxs("div",{className:"row row-cards",children:[e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-header",children:e.jsx("div",{className:"col-md-12 flex align-items-center",children:e.jsx("div",{className:"col-md-6",style:{float:"left"},children:e.jsx("h3",{children:"Passport Information"})})})}),e.jsxs("div",{className:"card-body",id:"auto_import",children:[e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Barcode"}),e.jsx("input",{type:"password",className:"form-control",name:"barcode",value:m,onChange:r=>v(r.target.value)})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Date"}),e.jsx("input",{type:"date",className:"form-control",name:"reg_date",value:h,onChange:r=>j(r.target.value)})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Serial Number"}),e.jsx("input",{type:"text",className:"form-control",name:"serial_no",value:g,onChange:r=>N(r.target.value)})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-2"}),e.jsx("div",{className:"col-4",children:e.jsx("button",{className:"btn btn-md btn-outline-secondary",disabled:!b,onClick:x,children:"Reset Form"})}),e.jsx("div",{className:"col-4",children:e.jsx("button",{className:"btn btn-md btn-outline-info",disabled:!!b,onClick:H,children:"Search for Candidate"})})]})]})]})}),s&&e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-header",children:e.jsx("div",{className:"col-md-12 flex align-items-center",children:e.jsx("div",{className:"col-md-6",style:{float:"left"},children:e.jsx("h3",{children:"Candidate Information"})})})}),e.jsxs("div",{className:"card-body",children:[e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Candidate Name"}),e.jsx("input",{type:"text",className:"form-control",name:"reg_date",disabled:!0,value:s==null?void 0:s.candidate_name})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Passport Number"}),e.jsx("input",{type:"text",className:"form-control",name:"serial_no",disabled:!0,value:s==null?void 0:s.passport_no})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Passport Issue Date"}),e.jsx("input",{type:"date",className:"form-control",name:"reg_date",disabled:!0,value:s==null?void 0:s.passport_issue_date})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Passport Expiry Date"}),e.jsx("input",{type:"date",className:"form-control",name:"serial_no",disabled:!0,value:s==null?void 0:s.passport_expiry_date})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Registration Date"}),e.jsx("input",{type:"date",className:"form-control",name:"reg_date",disabled:!0,value:s==null?void 0:s.reg_date})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Serial Number"}),e.jsx("input",{type:"text",className:"form-control",name:"serial_no",disabled:!0,value:s==null?void 0:s.serial_no})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Agency"}),e.jsx("input",{type:"text",className:"form-control",name:"serial_no",disabled:!0,value:s==null?void 0:s.agency})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Country"}),e.jsx("input",{type:"text",className:"form-control",name:"serial_no",disabled:!0,value:s==null?void 0:s.country})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Profession"}),e.jsx("input",{type:"text",className:"form-control",name:"serial_no",disabled:!0,value:s==null?void 0:s.profession})]})}),e.jsx("div",{className:"col-3",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Fees"}),e.jsx("input",{className:"form-control",name:"fees",type:"text",disabled:!0,value:s==null?void 0:s.fee_charged})]})}),e.jsx("div",{className:"col-3",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Discount"}),e.jsx("input",{className:"form-control",name:"discount",type:"text",disabled:!0,value:s==null?void 0:s.discount})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Relation"}),e.jsx("input",{className:"form-control",name:"discount",type:"text",disabled:!0,value:s==null?void 0:s.relation_type})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Relative Name"}),e.jsx("input",{type:"text",className:"form-control",name:"relative_name",disabled:!0,value:s==null?void 0:s.relative_name})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Phone 1"}),e.jsx("input",{type:"text",className:"form-control",name:"phone_1",disabled:!0,value:s==null?void 0:s.phone_1})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Phone 2"}),e.jsx("input",{type:"text",className:"form-control",name:"phone_2",disabled:!0,value:s==null?void 0:s.phone_2})]})})]}),e.jsxs("div",{className:"row g-5",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Marital Status"}),e.jsx("input",{type:"text",className:"form-control",name:"phone_2",disabled:!0,value:s==null?void 0:s.marital_status})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Remarks"}),e.jsx("textarea",{className:"form-control",disabled:!0,children:s==null?void 0:s.remarks})]})})]})]})]})})]})})]})})})]})}export{Y as default};
