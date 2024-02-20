import{r as i,W as R,j as e,a as D}from"./app-8b5ea9c7.js";import{A as V}from"./AuthenticatedLayout-f4b0d9e0.js";import"./TextInput-0deca653.js";import{Q as E,B as t}from"./ReactToastify-a39b397b.js";function W(d){const[h,g]=i.useState(null),[u,x]=i.useState(null),[p,v]=i.useState(null),[N,C]=i.useState(!1),[_,m]=i.useState("None"),[s,c]=i.useState(null);i.useState(!1);const[j,f]=i.useState(!1),[P,I]=i.useState(""),{data:b,setData:y,post:q,processing:J,errors:M,reset:A}=R({notes:"",biometric_fingerprint:""});function O(r,o){var n="https://localhost:8443/SGIFPCapture",l=new XMLHttpRequest;l.onreadystatechange=function(){l.readyState==4&&l.status==200?r(JSON.parse(l.responseText)):l.status==404&&o(l.status)},l.onerror=function(){o(l.status)};var a="Timeout=10000";a+="&Quality=50",a+="&licstr="+encodeURIComponent(P),a+="&templateFormat=ISO",l.open("POST",n,!0),l.send(a)}function S(r){r.ErrorCode==0?(r!=null&&r.BMPBase64.length>0&&(document.getElementById("fingerPrint").src="data:image/bmp;base64,"+r.BMPBase64),y("biometric_fingerprint",r.TemplateBase64),console.log(r.TemplateBase64),F(r.TemplateBase64)):t.error("Fingerprint Capture Error Code:  "+r.ErrorCode,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}function k(r){t.warning("Check if Fingerprint Scanner is running!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}const B=r=>{r.preventDefault(),O(S,k)},F=r=>{c(null);const o={centre_id:d.auth.user.centre.centre_id,biometric_fingerprint:r},n=JSON.stringify(o);try{const l=fetch(route("lab.fetch_by_fingerprint"),{method:"POST",body:n}).then(a=>a.json()).then(a=>{a.registration.length==0?t.warning("No Registration Found!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}):(c(a.registration),m("M"+a.registration.token_no),a.verified?(C(a.verified),t.warning("Candidate Passport Already Verified!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})):t.success("Candidate Found!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}))},a=>{t.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})})}catch{t.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}},H=r=>{c(null);const o={centre_id:d.auth.user.centre.centre_id,barcode:h,serial_no:p,reg_date:u,process_id:3},n=JSON.stringify(o);if(p==null&&u==null&&h==null)t.warning("Please select date & serial number or input barcode number to proceed!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"});else try{const l=fetch(route("lab.fetch_registration"),{method:"POST",body:n}).then(a=>a.json()).then(a=>{a.registration.length==0?t.warning("No Registration Found!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}):(f(!0),c(a.registration),m("M"+a.registration.token_no),a.verified?t.warning("Candidate Passport Already Verified!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}):t.success("Candidate Found!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}))},a=>{t.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})})}catch{t.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}},T=r=>{const o={centre_id:d.auth.user.centre.centre_id,notes:b.notes,token_no:s.token_no,reg_date:s.reg_date,reg_id:s.reg_id},n=JSON.stringify(o);try{const l=fetch(route("lab.verify_passport"),{method:"POST",body:n}).then(a=>a.json()).then(a=>{m("None"),w(),t.success("Passport Verified!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})},a=>{t.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})})}catch{t.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}},w=r=>{c(null),g(null),x(null),v(null),f(!1)};return e.jsxs(V,{user:d.auth.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Passport Verification"}),children:[e.jsx(D,{title:"Passport Verification"}),e.jsx(E,{position:"top-right",autoClose:5e3,hideProgressBar:!1,newestOnTop:!1,closeOnClick:!0,rtl:!1,pauseOnFocusLoss:!0,draggable:!0,pauseOnHover:!0,theme:"light"}),e.jsx("div",{className:"page-header d-print-none",children:e.jsx("div",{className:"container-xl",children:e.jsx("div",{className:"row g-2 align-items-center",children:e.jsxs("div",{className:"col align-items-center",children:[e.jsx("div",{className:"col-md-3",style:{float:"left"},children:e.jsx("h2",{className:"page-title",style:{float:"left"},children:"Passport Verification"})}),e.jsx("div",{className:"col-md-3 align-items-center",style:{float:"right"},children:e.jsx("h2",{className:"page-title",children:e.jsxs("span",{className:"badge",children:["Current Token: ",_]})})})]})})})}),e.jsx("div",{className:"page-body",children:e.jsx("div",{className:"container-xl",children:e.jsxs("div",{className:"row row-cards mb-5",children:[e.jsx("div",{className:"col-md-3",children:e.jsxs("div",{className:"row row-cards",children:[e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-header",children:e.jsx("h3",{children:"Biometric Verification"})}),e.jsx("div",{className:"card-body",children:e.jsx("div",{className:"row g-3",children:e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("img",{id:"fingerPrint",src:"./../assets/static/photos/ThumbPrint.png",style:{width:500}}),e.jsx("div",{className:"col-md-12 text-center",children:e.jsx("button",{className:"btn btn-purple btn-md w-50",onClick:B,children:"Scan fingerprint"})})]})})})})]})}),e.jsx("div",{className:"col-12",children:e.jsx("div",{className:"card",children:s!==null&&N==!0?e.jsx("div",{className:"card-header",children:e.jsx("h3",{children:"Passport has been Verified!"})}):s!==null&&N==!1?e.jsx("div",{className:"card-body",children:e.jsx("div",{className:"row g-3",children:e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Notes"}),e.jsx("textarea",{name:"notes",className:"form-control",onChange:r=>y("notes",r.target.value),children:b.notes})]}),e.jsx("div",{className:"row g-3 align-items-center",children:e.jsx("button",{className:"btn btn-info",disabled:verification,onClick:T,children:"Verify Passsport"})})]})})})}):e.jsx(e.Fragment,{})})})]})}),e.jsx("div",{className:"col-md-8",children:e.jsxs("div",{className:"row row-cards",children:[e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-header",children:e.jsx("div",{className:"col-md-12 flex align-items-center",children:e.jsx("div",{className:"col-md-6",style:{float:"left"},children:e.jsx("h3",{children:"Passport Information"})})})}),e.jsxs("div",{className:"card-body",id:"auto_import",children:[e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Barcode"}),e.jsx("input",{type:"password",className:"form-control",name:"barcode",onChange:r=>g(r.target.value)})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Date"}),e.jsx("input",{type:"date",className:"form-control",name:"reg_date",onChange:r=>x(r.target.value)})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Serial Number"}),e.jsx("input",{type:"text",className:"form-control",name:"serial_no",onChange:r=>v(r.target.value)})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-2"}),e.jsx("div",{className:"col-4",children:e.jsx("button",{className:"btn btn-md btn-outline-secondary",disabled:!j,onClick:w,children:"Reset Form"})}),e.jsx("div",{className:"col-4",children:e.jsx("button",{className:"btn btn-md btn-outline-info",disabled:!!j,onClick:H,children:"Search for Candidate"})})]})]})]})}),s&&e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-header",children:e.jsx("div",{className:"col-md-12 flex align-items-center",children:e.jsx("div",{className:"col-md-6",style:{float:"left"},children:e.jsx("h3",{children:"Candidate Information"})})})}),e.jsxs("div",{className:"card-body",children:[e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Candidate Name"}),e.jsx("input",{type:"text",className:"form-control",name:"reg_date",readonly:!0,value:s==null?void 0:s.candidate_name})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Passport Number"}),e.jsx("input",{type:"text",className:"form-control",name:"serial_no",readonly:!0,value:s==null?void 0:s.passport_no})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Passport Issue Date"}),e.jsx("input",{type:"date",className:"form-control",name:"reg_date",readonly:!0,value:s==null?void 0:s.passport_issue_date})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Passport Expiry Date"}),e.jsx("input",{type:"date",className:"form-control",name:"serial_no",readonly:!0,value:s==null?void 0:s.passport_expiry_date})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Registration Date"}),e.jsx("input",{type:"date",className:"form-control",name:"reg_date",readonly:!0,value:s==null?void 0:s.reg_date})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Serial Number"}),e.jsx("input",{type:"text",className:"form-control",name:"serial_no",readonly:!0,value:s==null?void 0:s.serial_no})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Agency"}),e.jsx("input",{type:"text",className:"form-control",name:"serial_no",readonly:!0,value:s==null?void 0:s.agency})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Country"}),e.jsx("input",{type:"text",className:"form-control",name:"serial_no",readonly:!0,value:s==null?void 0:s.country})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Profession"}),e.jsx("input",{type:"text",className:"form-control",name:"serial_no",readonly:!0,value:s==null?void 0:s.profession})]})}),e.jsx("div",{className:"col-3",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Fees"}),e.jsx("input",{className:"form-control",name:"fees",type:"text",readonly:!0,value:s==null?void 0:s.fee_charged})]})}),e.jsx("div",{className:"col-3",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Discount"}),e.jsx("input",{className:"form-control",name:"discount",type:"text",readonly:!0,value:s==null?void 0:s.discount})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Relation"}),e.jsx("input",{className:"form-control",name:"discount",type:"text",readonly:!0,value:s==null?void 0:s.relation_type})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Relative Name"}),e.jsx("input",{type:"text",className:"form-control",name:"relative_name",readonly:!0,value:s==null?void 0:s.relative_name})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Phone 1"}),e.jsx("input",{type:"text",className:"form-control",name:"phone_1",readonly:!0,value:s==null?void 0:s.phone_1})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Phone 2"}),e.jsx("input",{type:"text",className:"form-control",name:"phone_2",readonly:!0,value:s==null?void 0:s.phone_2})]})})]}),e.jsxs("div",{className:"row g-5",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Marital Status"}),e.jsx("input",{type:"text",className:"form-control",name:"phone_2",readonly:!0,value:s==null?void 0:s.marital_status})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Remarks"}),e.jsx("textarea",{className:"form-control",readonly:!0,children:s==null?void 0:s.remarks})]})})]})]})]})})]})})]})})})]})}export{W as default};
