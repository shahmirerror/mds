import{r as d,W as J,j as e,a as U}from"./app-868e92ff.js";import{A as W}from"./AuthenticatedLayout-4f994a80.js";import"./TextInput-c0aa5515.js";import{Q as G,B as c}from"./ReactToastify-8aab9ff9.js";import{S as p}from"./react-select.esm-4da0f788.js";import{I as A}from"./IconRefresh-fe66dc8a.js";import"./createReactComponent-558f8cc0.js";import"./index-7067921b.js";function re(h){const[N,b]=d.useState(null),[f,y]=d.useState(null),[_,w]=d.useState(null),[C,S]=d.useState(!1),[s,u]=d.useState(null),[B,k]=d.useState(null),{data:o,setData:E,post:Q,processing:$,errors:z,reset:K}=J({passport_no:s==null?void 0:s.passport_no,passport_issue_date:"",passport_expiry_date:"",candidate_id:0,reg_id:0,candidate_name:"",candidate_image:null,agency:"",country:"",profession:"",cnic:"",gender:"",finger_type:"",dob:"",place_of_issue:"",reg_date:"",serial_no:"",relation_type:"",relative_name:"",phone_1:"",phone_2:"",nationality:"",marital_status:"",fee_charged:"",discount:"",remarks:"",pregnancy_test:0});function I(a,r=5e3){return new Promise((i,l)=>{const t=setTimeout(()=>l("Element not found"),r),m=new MutationObserver(g=>{for(const j of g){const R=j.target;if(R.matches(a)){clearTimeout(t),m.disconnect(),i(R);return}}});m.observe(document.body,{childList:!0,subtree:!0}),document.querySelector(a)&&(clearTimeout(t),m.disconnect(),i(document.querySelector(a)))})}const[v,P]=d.useState(!1);d.useState(null),d.useState(!1),d.useState("");const[T,H]=d.useState(null);d.useState(null);const F=a=>{if(v){P(!1);let r=document.getElementById("video"),i=document.getElementById("photo-placeholder");a.target.innerHTML="Turn Camera On",a.target.classList.value="btn btn-success btn-md",T.getTracks().forEach(l=>l.stop()),i.style.display="block",r.style.display="none"}else P(!0),a.target.innerHTML="Turn Camera Off",a.target.classList.value="btn btn-danger btn-md",I("#video").then(r=>{let i=document.getElementById("video"),l=document.getElementById("photo-placeholder");navigator.mediaDevices.enumerateDevices().then(t=>{const m=t.filter(g=>g.kind==="videoinput");if(m.length>0){const j={video:{deviceId:m[0].deviceId}};return navigator.mediaDevices.getUserMedia(j)}else throw new Error("No video input devices found.")}).then(t=>{H(t),l.style.display="none",i.style.display="block",i.srcObject=t}).catch(t=>{console.error("Error accessing webcam:",t)})}).catch(r=>{console.error(r)})},O=a=>{let r=document.getElementById("video"),i=document.getElementById("taken_photo");if(a.target.value=="take"){const l=document.createElement("canvas");l.width=r.videoWidth,l.height=r.videoHeight,l.getContext("2d").drawImage(r,0,0),i.src=l.toDataURL("image/png"),r.style.display="none",i.style.display="block";const m=new Blob([l.toDataURL("image/png").replace("data:image/png;base64,","")],{type:"image/png"}),g="webcam_photo_"+Date.now()+".png";new File([m],g,{type:"image/png"}),o.candidate_image=l.toDataURL("image/png"),console.log(o.candidate_image)}else a.target.value=="retake"&&(r.style.display="block",i.style.display="none",o.candidate_image=null)},n=a=>{const{name:r,value:i}=a.target;u(l=>({...l,[r]:i.toUpperCase()}))},x=(a,r)=>{const i=a,l=r;u(t=>({...t,[i]:l}))},M=async a=>{u(null);const r={centre_id:h.auth.user.centre.centre_id,passport_no:N,serial_no:_,reg_date:f},i=JSON.stringify(r);if(_==null&&f==null&&N==null)c.warning("Please select date & serial number or input Passport number to proceed!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"});else try{const l=await c.promise(fetch(route("lab.fetch_registration_edit"),{method:"POST",body:i}),{pending:"Fetching Candidate"}).then(t=>t.json()).then(t=>{t.registration.length==0?c.warning("No Registration Found!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}):(S(!0),u(t.registration),c.success("Candidate Found!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}))},t=>{c.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})})}catch{c.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}},D=a=>{u(null),b(null),y(null),w(null),S(!1),location.reload()},L=async a=>{const r={candidate:s,candidate_image:o.candidate_image,passport_image:o.passport_image},i=JSON.stringify(r);try{const l=await c.promise(fetch(route("lab.update_registration"),{method:"POST",body:i}),{pending:"Submitting Form"}).then(t=>t.json()).then(t=>{c.success("Candidate has been updated!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})},t=>{c.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})})}catch{c.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}},q=async()=>{const a={centre_id:h.auth.user.centre.centre_id,barcode_no:s==null?void 0:s.barcode_no},r=JSON.stringify(a);try{k(null);const i=await c.promise(fetch(route("lab.export_reg_report"),{method:"POST",body:r}),{pending:"Fetching Report"}).then(l=>l.json()).then(l=>{c.success("Report has been generated!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}),k(l.filename)},l=>{c.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})})}catch{c.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}};return d.useEffect(()=>{},[]),e.jsxs(W,{user:h.auth.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Registration Desk - Edit"}),children:[e.jsx(U,{title:"Registration Desk - Edit"}),e.jsx(G,{position:"top-right",autoClose:5e3,hideProgressBar:!1,newestOnTop:!1,closeOnClick:!0,rtl:!1,pauseOnFocusLoss:!0,draggable:!0,pauseOnHover:!0,theme:"light"}),e.jsx("div",{className:"page-header d-print-none",children:e.jsx("div",{className:"container-xl",children:e.jsx("div",{className:"row g-2 align-items-center",children:e.jsxs("div",{className:"col align-items-center",children:[e.jsxs("div",{className:"col-md-3",style:{float:"left"},children:[e.jsx("h2",{className:"page-title",style:{float:"left"},children:"Registration Desk - Edit"}),e.jsx("a",{className:"btn btn-danger btn-sm",type:"button",href:route("registration-desk.index"),style:{float:"right"},children:"Go Back"})]}),e.jsx("div",{className:"col-md-3 align-items-center",style:{float:"right"},children:e.jsx("h2",{className:"page-title",style:{float:"right"},children:e.jsx("button",{className:"btn btn-secondary btn-sm mr-5 btn-pill",onClick:D,children:e.jsx(A,{})})})})]})})})}),e.jsx("div",{className:"page-body",children:e.jsxs("div",{className:"container-xl",children:[e.jsxs("div",{className:"row row-cards mb-5",children:[e.jsxs("div",{className:"col-md-6",children:[e.jsx("div",{className:"row row-cards",children:e.jsx("div",{className:"col-12",children:e.jsx("div",{className:"card",children:e.jsxs("div",{className:"card-body",id:"manual_import",children:[e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Passport Number"}),e.jsx("input",{type:"password",className:"form-control",name:"barcode",onChange:a=>b(a.target.value)})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Date"}),e.jsx("input",{type:"date",className:"form-control",name:"reg_date",onChange:a=>y(a.target.value)})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Serial Number"}),e.jsx("input",{type:"text",className:"form-control",name:"serial_no",onChange:a=>w(a.target.value)})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-2"}),e.jsx("div",{className:"col-4",children:e.jsx("button",{className:"btn btn-md btn-outline-secondary",disabled:!C,onClick:D,children:"Reset Form"})}),e.jsx("div",{className:"col-4",children:e.jsx("button",{className:"btn btn-md btn-outline-info",disabled:!!C,onClick:M,children:"Search for Candidate"})})]})]})})})}),s&&e.jsx("div",{className:"row row-cards",children:e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-header",children:e.jsx("div",{className:"col-md-12 flex align-items-center",children:e.jsx("div",{className:"col-md-6",style:{float:"left"},children:e.jsx("h3",{children:"Candidate Information"})})})}),e.jsxs("div",{className:"card-body",id:"manual_import",children:[e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Candidate Name"}),e.jsx("input",{type:"text",className:"form-control",name:"candidate_name",value:s==null?void 0:s.candidate_name,onChange:n})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Passport Number"}),e.jsx("input",{type:"text",className:"form-control",name:"passport_no",value:s==null?void 0:s.passport_no,onChange:n})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"PP Issue Date"}),e.jsx("input",{type:"date",className:"form-control",name:"passport_issue_date",value:s==null?void 0:s.passport_issue_date,onChange:n})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"PP Expiry Date"}),e.jsx("input",{type:"date",className:"form-control",name:"passport_expiry_date",value:s==null?void 0:s.passport_expiry_date,onChange:n})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"DOB"}),e.jsx("input",{type:"date",className:"form-control",name:"dob",value:s==null?void 0:s.dob,onChange:n})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Gender"}),e.jsxs("select",{className:"form-control",name:"gender",value:s==null?void 0:s.gender,onChange:n,children:[e.jsx("option",{value:"",children:"Select Gender"}),e.jsx("option",{value:"Male",children:"Male"}),e.jsx("option",{value:"Female",children:"Female"})]})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Passport Image"}),e.jsx("input",{type:"file",className:"form-control",name:"passport_image",onChange:a=>E("passport_image",a.target.files[0])})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Nationality"}),e.jsx("input",{type:"text",className:"form-control",name:"nationality",value:s==null?void 0:s.nationality,onChange:n})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"CNIC"}),e.jsx("input",{type:"text",className:"form-control",name:"cnic",value:s==null?void 0:s.cnic,onChange:n})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Place of Issue"}),e.jsx(p,{options:h.places,value:s==null?void 0:s.place_of_issue,name:"place_of_issue",onChange:a=>x("place_of_issue",a)})]})})]}),e.jsxs("div",{className:"row g-5",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Reference Slip Issue Date"}),e.jsx("input",{type:"date",className:"form-control",name:"slip_issue_date",value:s==null?void 0:s.slip_issue_date,onChange:n})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Reference Slip Expiry Date"}),e.jsx("input",{type:"date",className:"form-control",name:"slip_expiry_date",value:s==null?void 0:s.slip_expiry_date,onChange:n})]})})]})]})]})})})]}),e.jsx("div",{className:"col-md-6",children:e.jsx("div",{className:"row row-cards",children:e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-header",children:e.jsx("div",{className:"col-md-12 flex align-items-center"})}),e.jsx("div",{className:"card-body",children:e.jsxs("div",{className:"row g-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("video",{id:"video",autoPlay:!0,muted:!0,style:{height:"280px",display:"none"}}),e.jsx("img",{src:null,id:"taken_photo",style:{width:300,display:"none",marginTop:"55px"},className:"mb-5"}),e.jsx("img",{src:"./../../assets/static/photos/Photo.png",className:"mb-4",id:"photo-placeholder",style:{width:274}}),e.jsx("div",{className:"col-md-6",children:v&&(o==null?void 0:o.candidate_image)==null?e.jsx("button",{className:"btn btn-warning btn-md",value:"take",onClick:O,children:"Take Photo"}):v&&(o==null?void 0:o.candidate_image)!=null?e.jsx("button",{className:"btn btn-warning btn-md",value:"retake",onClick:O,children:"Re-Take Photo"}):e.jsx(e.Fragment,{})}),e.jsx("div",{className:"col-md-6",children:e.jsx("button",{className:"btn btn-success btn-md",id:"cameraToggle",disabled:(o==null?void 0:o.candidate_image)!=null,onClick:F,children:"Turn Camera On"})})]})}),e.jsx("div",{className:"col-6",children:e.jsx("div",{className:"row g-3 align-items-center",children:e.jsx("img",{src:s==null?void 0:s.candidate_image,style:{width:300,marginTop:"55px"},className:"mb-5"})})})]})})]})})})})]}),s&&e.jsxs("div",{className:"row row-cards",children:[e.jsx("div",{className:"col-md-6",children:e.jsx("div",{className:"row row-cards",children:e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-header",children:e.jsx("div",{className:"col-md-12 flex align-items-center",children:e.jsx("div",{className:"col-md-6",style:{float:"left"},children:e.jsx("h3",{children:"General Information"})})})}),e.jsxs("div",{className:"card-body",children:[e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Registration Date"}),e.jsx("input",{type:"date",className:"form-control",name:"reg_date",value:s==null?void 0:s.reg_date,onChange:n})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Serial Number"}),e.jsx("input",{type:"text",className:"form-control",name:"serial_no",value:s==null?void 0:s.serial_no,onChange:n})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Agency"}),e.jsx(p,{options:h.agencies,value:s==null?void 0:s.agency,name:"agencies",onChange:a=>x("agency",a)})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Country"}),e.jsx(p,{options:h.countries,value:s==null?void 0:s.country,name:"country",onChange:a=>x("country",a)})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Profession"}),e.jsx(p,{options:h.professions,value:s==null?void 0:s.profession,name:"profession",onChange:a=>x("profession",a)})]})}),e.jsx("div",{className:"col-3",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Fees"}),e.jsx("input",{className:"form-control",name:"fee_charged",type:"text",value:s==null?void 0:s.fee_charged,onChange:n})]})}),e.jsx("div",{className:"col-3",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Discount"}),e.jsx("input",{className:"form-control",name:"discount",type:"text",value:s==null?void 0:s.discount,onChange:n})]})})]})]})]})})})}),e.jsx("div",{className:"col-md-6",children:e.jsx("div",{className:"row row-cards",children:e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-header",children:e.jsx("div",{className:"col-md-12 flex align-items-center",children:e.jsx("div",{className:"col-md-6",style:{float:"left"},children:e.jsx("h3",{children:"Candidate Information"})})})}),e.jsxs("div",{className:"card-body",children:[e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Relation"}),e.jsxs("select",{className:"form-select",name:"relation_type",value:s==null?void 0:s.relation_type,onChange:n,children:[e.jsx("option",{value:"",children:"Select Relation"}),e.jsx("option",{value:"S/O",children:"S/O"}),e.jsx("option",{value:"W/O",children:"W/O"}),e.jsx("option",{value:"D/O",children:"D/O"})]})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Relative Name"}),e.jsx("input",{type:"text",className:"form-control",name:"relative_name",value:s==null?void 0:s.relative_name,onChange:n})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Phone 1"}),e.jsx("input",{type:"text",className:"form-control",name:"phone_1",value:s==null?void 0:s.phone_1,onChange:n})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Phone 2"}),e.jsx("input",{type:"text",className:"form-control",name:"phone_2",value:s==null?void 0:s.phone_2,onChange:n})]})})]}),e.jsxs("div",{className:"row g-5",children:[e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Pregnancy Check"}),e.jsxs("select",{className:"form-select",disabled:(s==null?void 0:s.gender)=="Male",name:"pregnancy_test",value:s==null?void 0:s.pregnancy_test,onChange:n,children:[e.jsx("option",{value:"1",children:"Pregnant"}),e.jsx("option",{value:"0",children:"Not Pregnant"})]})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Marital Status"}),e.jsxs("select",{className:"form-select",name:"marital_status",value:s==null?void 0:s.marital_status,onChange:n,children:[e.jsx("option",{value:"",children:"Select Marital Status"}),e.jsx("option",{value:"Single",children:"Single"}),e.jsx("option",{value:"Married",children:"Married"}),e.jsx("option",{value:"Divorced",children:"Divorced"}),e.jsx("option",{value:"Widowed",children:"Widowed"})]})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Remarks"}),e.jsx("textarea",{className:"form-control",name:"remarks",value:s==null?void 0:s.remarks,onChange:n})]})})]})]}),e.jsx("div",{className:"card-body",children:e.jsxs("div",{className:"row g-5",children:[e.jsx("div",{className:"col-4",children:e.jsx("button",{className:"btn btn-outline-success",disabled:s==null,onClick:L,children:"Update Registration"})}),e.jsx("div",{className:"col-3",children:e.jsx("button",{className:"btn btn-outline-purple","data-bs-toggle":"modal","data-bs-target":"#reg-report",disabled:s==null,onClick:q,children:"Print Report"})})]})})]})})})})]})]})}),e.jsx("div",{className:"modal modal-blur fade",id:"reg-report",tabindex:"-1",role:"dialog","aria-hidden":"true",children:e.jsx("div",{className:"modal-dialog modal-lg modal-dialog-centered",role:"document",children:e.jsxs("div",{className:"modal-content",children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h5",{className:"modal-title",children:"Registration Slip"}),e.jsx("button",{type:"button",className:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})]}),e.jsx("div",{className:"modal-body",children:e.jsx("iframe",{src:B,style:{height:"300px",width:"100%"}})}),e.jsx("div",{className:"modal-footer",children:e.jsx("a",{href:"#",className:"btn btn-link link-secondary","data-bs-dismiss":"modal",children:"Close"})})]})})})]})}export{re as default};
