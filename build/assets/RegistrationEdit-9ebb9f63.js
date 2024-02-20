import{r as o,W as G,j as e,a as J}from"./app-da2e9840.js";import{A as U}from"./AuthenticatedLayout-39efe80c.js";import"./TextInput-c8b6aa8e.js";import{Q as A,B as d}from"./ReactToastify-4193d200.js";import{S as v}from"./react-select.esm-37c6407f.js";function ae(m){const[f,y]=o.useState(null),[_,w]=o.useState(null),[C,S]=o.useState(null),[k,O]=o.useState(!1),[s,g]=o.useState(null),{data:P,setData:p,post:Q,processing:$,errors:z,reset:T}=G({passport_no:s==null?void 0:s.passport_no,passport_issue_date:"",passport_expiry_date:"",candidate_id:0,reg_id:0,candidate_name:"",candidate_image:null,agency:"",country:"",profession:"",cnic:"",gender:"",finger_type:"",dob:"",place_of_issue:"",reg_date:"",serial_no:"",relation_type:"",relative_name:"",phone_1:"",phone_2:"",nationality:"",marital_status:"",fee_charged:"",discount:"",remarks:"",pregnancy_test:0});function R(a,n=5e3){return new Promise((i,r)=>{const l=setTimeout(()=>r("Element not found"),n),c=new MutationObserver(h=>{for(const u of h){const I=u.target;if(I.matches(a)){clearTimeout(l),c.disconnect(),i(I);return}}});c.observe(document.body,{childList:!0,subtree:!0}),document.querySelector(a)&&(clearTimeout(l),c.disconnect(),i(document.querySelector(a)))})}const[j,N]=o.useState(!1);o.useState(null);const[K,M]=o.useState(!1);o.useState("");const[b,D]=o.useState(null),[V,H]=o.useState(null),L=a=>{if(j){N(!1);let n=document.getElementById("video"),i=document.getElementById("photo-placeholder");a.target.innerHTML="Turn Camera On",a.target.classList.value="btn btn-success btn-md",b.getTracks().forEach(r=>r.stop()),i.style.display="block",n.style.display="none"}else N(!0),a.target.innerHTML="Turn Camera Off",a.target.classList.value="btn btn-danger btn-md",R("#video").then(n=>{let i=document.getElementById("video"),r=document.getElementById("photo-placeholder");navigator.mediaDevices.enumerateDevices().then(l=>{const c=l.filter(h=>h.kind==="videoinput");if(c.length>0){const u={video:{deviceId:c[0].deviceId}};return navigator.mediaDevices.getUserMedia(u)}else throw new Error("No video input devices found.")}).then(l=>{D(l),r.style.display="none",i.style.display="block",i.srcObject=l}).catch(l=>{console.error("Error accessing webcam:",l)})}).catch(n=>{console.error(n)})},E=a=>{let n=document.getElementById("video"),i=document.getElementById("taken_photo");if(a.target.value=="take"){const r=document.createElement("canvas");r.width=n.videoWidth,r.height=n.videoHeight,r.getContext("2d").drawImage(n,0,0),i.src=r.toDataURL("image/png"),n.style.display="none",i.style.display="block";const c=new Blob([r.toDataURL("image/png").replace("data:image/png;base64,","")],{type:"image/png"}),h="webcam_photo_"+Date.now()+".png",u=new File([c],h,{type:"image/png"});p("candidate_image",u)}else a.target.value=="retake"&&(p("candidate_image",null),n.style.display="block",i.style.display="none")},F=()=>{T(),b!==null&&b.getTracks().forEach(l=>l.stop());let a=document.getElementById("video"),n=document.getElementById("photo-placeholder"),i=document.getElementById("taken_photo");n.style.display="block",a.style.display="none",i.style.display="none";let r=document.getElementById("cameraToggle");r.innerHTML="Turn Camera On",r.classList.value="btn btn-success btn-md",N(!1),M(!1),D(!1),H(null)},t=a=>{const{name:n,value:i}=a.target;g(r=>({...r,[n]:i}))},x=(a,n)=>{const i=a,r=n;g(l=>({...l,[i]:r}))},q=a=>{g(null);const n={centre_id:m.auth.user.centre.centre_id,barcode:f,serial_no:C,reg_date:_},i=JSON.stringify(n);if(C==null&&_==null&&f==null)d.warning("Please select date & serial number or input barcode number to proceed!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"});else try{const r=fetch(route("lab.fetch_registration_edit"),{method:"POST",body:i}).then(l=>l.json()).then(l=>{l.registration.length==0?d.warning("No Registration Found!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}):(O(!0),g(l.registration),d.success("Candidate Found!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}))},l=>{d.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})})}catch{d.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}},B=a=>{g(null),y(null),w(null),S(null),O(!1)},W=a=>{const n={candidate:s,candidate_image:P.candidate_image,passport_image:P.passport_image},i=JSON.stringify(n);try{const r=fetch(route("lab.update_registration"),{method:"POST",body:i}).then(l=>l.json()).then(l=>{d.success("Candidate has been updated!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}),B()},l=>{d.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})})}catch{d.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}};return o.useEffect(()=>{F()},[]),e.jsxs(U,{user:m.auth.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Registration Desk - Edit"}),children:[e.jsx(J,{title:"Registration Desk - Edit"}),e.jsx(A,{position:"top-right",autoClose:5e3,hideProgressBar:!1,newestOnTop:!1,closeOnClick:!0,rtl:!1,pauseOnFocusLoss:!0,draggable:!0,pauseOnHover:!0,theme:"light"}),e.jsx("div",{className:"page-header d-print-none",children:e.jsx("div",{className:"container-xl",children:e.jsx("div",{className:"row g-2 align-items-center",children:e.jsx("div",{className:"col align-items-center",children:e.jsxs("div",{className:"col-md-3",style:{float:"left"},children:[e.jsx("h2",{className:"page-title",style:{float:"left"},children:"Registration Desk - Edit"}),e.jsx("a",{className:"btn btn-danger btn-sm",type:"button",href:route("registration-desk.index"),style:{float:"right"},children:"Go Back"})]})})})})}),e.jsx("div",{className:"page-body",children:e.jsxs("div",{className:"container-xl",children:[e.jsxs("div",{className:"row row-cards mb-5",children:[e.jsxs("div",{className:"col-md-6",children:[e.jsx("div",{className:"row row-cards",children:e.jsx("div",{className:"col-12",children:e.jsx("div",{className:"card",children:e.jsxs("div",{className:"card-body",id:"manual_import",children:[e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Barcode"}),e.jsx("input",{type:"password",className:"form-control",name:"barcode",onChange:a=>y(a.target.value)})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Date"}),e.jsx("input",{type:"date",className:"form-control",name:"reg_date",onChange:a=>w(a.target.value)})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Serial Number"}),e.jsx("input",{type:"text",className:"form-control",name:"serial_no",onChange:a=>S(a.target.value)})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-2"}),e.jsx("div",{className:"col-4",children:e.jsx("button",{className:"btn btn-md btn-outline-secondary",disabled:!k,onClick:B,children:"Reset Form"})}),e.jsx("div",{className:"col-4",children:e.jsx("button",{className:"btn btn-md btn-outline-info",disabled:!!k,onClick:q,children:"Search for Candidate"})})]})]})})})}),s&&e.jsx("div",{className:"row row-cards",children:e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-header",children:e.jsx("div",{className:"col-md-12 flex align-items-center",children:e.jsx("div",{className:"col-md-6",style:{float:"left"},children:e.jsx("h3",{children:"Candidate Information"})})})}),e.jsxs("div",{className:"card-body",id:"manual_import",children:[e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Candidate Name"}),e.jsx("input",{type:"text",className:"form-control",name:"candidate_name",value:s==null?void 0:s.candidate_name,onChange:t})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Passport Number"}),e.jsx("input",{type:"text",className:"form-control",name:"passport_no",value:s==null?void 0:s.passport_no,onChange:t})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"PP Issue Date"}),e.jsx("input",{type:"date",className:"form-control",name:"passport_issue_date",value:s==null?void 0:s.passport_issue_date,onChange:t})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"PP Expiry Date"}),e.jsx("input",{type:"date",className:"form-control",name:"passport_expiry_date",value:s==null?void 0:s.passport_expiry_date,onChange:t})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"DOB"}),e.jsx("input",{type:"date",className:"form-control",name:"dob",value:s==null?void 0:s.dob,onChange:t})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Gender"}),e.jsxs("select",{className:"form-control",name:"gender",value:s==null?void 0:s.gender,onChange:t,children:[e.jsx("option",{value:"",children:"Select Gender"}),e.jsx("option",{value:"Male",children:"Male"}),e.jsx("option",{value:"Female",children:"Female"})]})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Passport Image"}),e.jsx("input",{type:"file",className:"form-control",name:"passport_image",onChange:a=>p("passport_image",a.target.files[0])})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Nationality"}),e.jsx("input",{type:"text",className:"form-control",name:"nationality",value:s==null?void 0:s.nationality,onChange:t})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"CNIC"}),e.jsx("input",{type:"text",className:"form-control",name:"cnic",value:s==null?void 0:s.cnic,onChange:t})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Place of Issue"}),e.jsx(v,{options:m.places,value:s==null?void 0:s.place_of_issue,name:"place_of_issue",onChange:a=>x("place_of_issue",a)})]})})]}),e.jsxs("div",{className:"row g-5",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Reference Slip Issue Date"}),e.jsx("input",{type:"date",className:"form-control",name:"slip_issue_date",value:s==null?void 0:s.slip_issue_date,onChange:t})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Reference Slip Expiry Date"}),e.jsx("input",{type:"date",className:"form-control",name:"slip_expiry_date",value:s==null?void 0:s.slip_expiry_date,onChange:t})]})})]})]})]})})})]}),e.jsx("div",{className:"col-md-6",children:e.jsx("div",{className:"row row-cards",children:e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-header",children:e.jsx("div",{className:"col-md-12 flex align-items-center"})}),e.jsx("div",{className:"card-body",children:e.jsx("div",{className:"row g-3",children:e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("video",{id:"video",autoPlay:!0,muted:!0,style:{height:"280px",display:"none"}}),e.jsx("img",{src:null,id:"taken_photo",style:{width:300,display:"none",marginTop:"55px"},className:"mb-5"}),e.jsx("img",{src:"./../../assets/static/photos/Photo.png",className:"mb-4",id:"photo-placeholder",style:{width:274}}),e.jsx("div",{className:"col-md-6",children:j&&(s==null?void 0:s.candidate_image)==null?e.jsx("button",{className:"btn btn-warning btn-md",value:"take",onClick:E,children:"Take Photo"}):j&&(s==null?void 0:s.candidate_image)!=null?e.jsx("button",{className:"btn btn-warning btn-md",value:"retake",onClick:E,children:"Re-Take Photo"}):e.jsx(e.Fragment,{})}),e.jsx("div",{className:"col-md-6",children:e.jsx("button",{className:"btn btn-success btn-md",id:"cameraToggle",disabled:(s==null?void 0:s.candidate_image)!=null,onClick:L,children:"Turn Camera On"})})]})})})})]})})})})]}),s&&e.jsxs("div",{className:"row row-cards",children:[e.jsx("div",{className:"col-md-6",children:e.jsx("div",{className:"row row-cards",children:e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-header",children:e.jsx("div",{className:"col-md-12 flex align-items-center",children:e.jsx("div",{className:"col-md-6",style:{float:"left"},children:e.jsx("h3",{children:"General Information"})})})}),e.jsxs("div",{className:"card-body",children:[e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Registration Date"}),e.jsx("input",{type:"date",className:"form-control",name:"reg_date",value:s==null?void 0:s.reg_date,onChange:t})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Serial Number"}),e.jsx("input",{type:"text",className:"form-control",name:"serial_no",value:s==null?void 0:s.serial_no,onChange:t})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Agency"}),e.jsx(v,{options:m.agencies,value:s==null?void 0:s.agency,name:"agencies",onChange:a=>x("agency",a)})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Country"}),e.jsx(v,{options:m.countries,value:s==null?void 0:s.country,name:"country",onChange:a=>x("country",a)})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Profession"}),e.jsx(v,{options:m.professions,value:s==null?void 0:s.profession,name:"profession",onChange:a=>x("profession",a)})]})}),e.jsx("div",{className:"col-3",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Fees"}),e.jsx("input",{className:"form-control",name:"fee_charged",type:"text",value:s==null?void 0:s.fee_charged,onChange:t})]})}),e.jsx("div",{className:"col-3",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Discount"}),e.jsx("input",{className:"form-control",name:"discount",type:"text",value:s==null?void 0:s.discount,onChange:t})]})})]})]})]})})})}),e.jsx("div",{className:"col-md-6",children:e.jsx("div",{className:"row row-cards",children:e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-header",children:e.jsx("div",{className:"col-md-12 flex align-items-center",children:e.jsx("div",{className:"col-md-6",style:{float:"left"},children:e.jsx("h3",{children:"Candidate Information"})})})}),e.jsxs("div",{className:"card-body",children:[e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Relation"}),e.jsxs("select",{className:"form-select",name:"relation_type",value:s==null?void 0:s.relation_type,onChange:t,children:[e.jsx("option",{value:"",children:"Select Relation"}),e.jsx("option",{value:"S/O",children:"S/O"}),e.jsx("option",{value:"W/O",children:"W/O"}),e.jsx("option",{value:"D/O",children:"D/O"})]})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Relative Name"}),e.jsx("input",{type:"text",className:"form-control",name:"relative_name",value:s==null?void 0:s.relative_name,onChange:t})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Phone 1"}),e.jsx("input",{type:"text",className:"form-control",name:"phone_1",value:s==null?void 0:s.phone_1,onChange:t})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Phone 2"}),e.jsx("input",{type:"text",className:"form-control",name:"phone_2",value:s==null?void 0:s.phone_2,onChange:t})]})})]}),e.jsxs("div",{className:"row g-5",children:[e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Pregnancy Check"}),e.jsxs("select",{className:"form-select",disabled:(s==null?void 0:s.gender)=="Male",name:"pregnancy_test",value:s==null?void 0:s.pregnancy_test,onChange:t,children:[e.jsx("option",{value:"1",children:"Pregnant"}),e.jsx("option",{value:"0",children:"Not Pregnant"})]})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Marital Status"}),e.jsxs("select",{className:"form-select",name:"marital_status",value:s==null?void 0:s.marital_status,onChange:t,children:[e.jsx("option",{value:"",children:"Select Marital Status"}),e.jsx("option",{value:"Single",children:"Single"}),e.jsx("option",{value:"Married",children:"Married"}),e.jsx("option",{value:"Divorced",children:"Divorced"}),e.jsx("option",{value:"Widowed",children:"Widowed"})]})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Remarks"}),e.jsx("textarea",{className:"form-control",name:"remarks",value:s==null?void 0:s.remarks,onChange:t})]})})]})]}),e.jsx("div",{className:"card-body",children:e.jsx("div",{className:"row g-5",children:e.jsx("div",{className:"col-12",children:e.jsx("button",{className:"btn btn-outline-success",disabled:s==null,onClick:W,children:"Update Registration"})})})})]})})})})]})]})})]})}export{ae as default};
