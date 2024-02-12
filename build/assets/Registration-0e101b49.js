import{W as _,r as i,j as e,a as S}from"./app-352b439c.js";import{A as k}from"./AuthenticatedLayout-cb43d4e9.js";import"./TextInput-b871273f.js";import{c as P}from"./createReactComponent-d4a20834.js";var R=P("refresh","IconRefresh",[["path",{d:"M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4",key:"svg-0"}],["path",{d:"M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4",key:"svg-1"}]]);function W({auth:j}){const{data:I,setData:D,post:T,processing:C,errors:M,reset:N}=_({passport_no:"",passport_issue_date:"",passport_expiry_date:"",candidate_name:"",agency:"",country:"",profession:"",cnic:"",gender:"",dob:"",place_of_issue:"",reg_date:"",serial_no:"",relation_type:"",relative_name:"",phone_1:"",phone_2:"",nationality:"",marital_status:"",biometric_fingerprint:"",fee_charged:"",discount:"",remarks:"",pregnancy_test:0,repeat:!1}),v=[{value:0,label:"L-Thumb"},{value:1,label:"L-Index Finger"},{value:2,label:"L-Middle Finger"},{value:3,label:"L-Ring Finger"},{value:4,label:"L-Pinky Finger"},{value:5,label:"R-Thumb"},{value:6,label:"R-Index Finger"},{value:7,label:"R-Middle Finger"},{value:8,label:"R-Ring Finger"},{value:9,label:"R-Pinky Finger"}];function g(s,l=5e3){return new Promise((a,r)=>{const c=setTimeout(()=>r("Element not found"),l),d=new MutationObserver(y=>{for(const w of y){const x=w.target;if(x.matches(s)){clearTimeout(c),d.disconnect(),a(x);return}}});d.observe(document.body,{childList:!0,subtree:!0}),document.querySelector(s)&&(clearTimeout(c),d.disconnect(),a(document.querySelector(s)))})}const[o,n]=i.useState(!1);i.useState(null);const[u,E]=i.useState("None"),[t,m]=i.useState(!1),[p,h]=i.useState(null);i.useState(null);const f=s=>{if(o){n(!1);let l=document.getElementById("video"),a=document.getElementById("photo-placeholder");s.target.innerHTML="Turn Camera On",s.target.classList.value="btn btn-success btn-md",p.getTracks().forEach(r=>r.stop()),a.style.display="block",l.style.display="none"}else n(!0),s.target.innerHTML="Turn Camera Off",s.target.classList.value="btn btn-danger btn-md",g("#video").then(l=>{let a=document.getElementById("video"),r=document.getElementById("photo-placeholder");navigator.mediaDevices.getUserMedia({video:!0}).then(c=>{h(c),r.style.display="none",a.style.display="block",a.srcObject=c}).catch(c=>{console.error(c)})}).catch(l=>{console.error(l)})},b=s=>{s.preventDefault(),N(),n(!1),m(!1),h(!1),setSImageSrc(null)};return i.useEffect(()=>{},[]),e.jsxs(k,{user:j.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Dashboard"}),children:[e.jsx(S,{title:"Registration Desk"}),e.jsx("div",{className:"page-header d-print-none",children:e.jsx("div",{className:"container-xl",children:e.jsx("div",{className:"row g-2 align-items-center",children:e.jsxs("div",{className:"col align-items-center",children:[e.jsxs("div",{className:"col-md-3",style:{float:"left"},children:[e.jsx("h2",{className:"page-title",style:{float:"left"},children:"Registeration Desk"}),e.jsx("h3",{className:"badge bg-success text-white",style:{float:"right"},children:"Counter 1"})]}),e.jsx("div",{className:"col-md-3 align-items-center",style:{float:"right"},children:e.jsxs("h2",{className:"page-title",children:[e.jsx("button",{className:"btn btn-secondary btn-sm mr-5 btn-pill",onClick:b,children:e.jsx(R,{})}),e.jsxs("span",{className:"badge",children:["Current Token: ",u]})]})})]})})})}),e.jsx("div",{className:"page-body",children:e.jsxs("div",{className:"container-xl",children:[e.jsxs("div",{className:"row row-cards mb-5",children:[e.jsx("div",{className:"col-md-6",children:e.jsx("div",{className:"row row-cards",children:e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-header",children:e.jsx("div",{className:"col-md-12 flex align-items-center",children:e.jsx("div",{className:"col-md-4",style:{float:"left"},children:e.jsx("span",{style:{float:"left"},className:"badge bg-secondary text-white",children:"Barcode Number: 12345"})})})}),e.jsx("div",{className:"card-body",children:e.jsxs("div",{className:"row g-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("img",{src:"./../assets/static/photos/ThumbPrint.png",style:{width:500}}),e.jsx("div",{className:"col-md-12 text-center",children:e.jsx("button",{className:"btn btn-purple btn-md w-50",children:"Scan fingerprint"})}),e.jsx("div",{className:"col-md-12 text-center",children:e.jsxs("select",{className:"form-select",children:[e.jsx("option",{children:"--"}),v.map((s,l)=>e.jsx("option",{value:s.value,children:s.label}))]})})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("video",{id:"video",autoPlay:!0,muted:!0,style:{height:"290px",display:"none"}}),e.jsx("img",{src:"./../assets/static/photos/Photo.png",className:"mb-5 ",id:"photo-placeholder",style:{width:274}}),e.jsx("div",{className:"col-md-6",children:o?e.jsx("button",{className:"btn btn-warning btn-md",children:"Take Photo"}):e.jsx(e.Fragment,{})}),e.jsx("div",{className:"col-md-6",children:e.jsx("button",{className:"btn btn-success btn-md",onClick:f,children:"Turn Camera On"})})]})})]})})]})})})}),e.jsx("div",{className:"col-md-6",children:e.jsx("div",{className:"row row-cards",children:e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-header",children:e.jsxs("div",{className:"col-md-12 flex align-items-center",children:[e.jsx("div",{className:"col-md-6",style:{float:"left"},children:t?e.jsx("h3",{children:"Passport Information"}):e.jsx("button",{className:"btn btn-sm btn-yellow",children:"Import Passport"})}),e.jsx("div",{className:"col-md-6",style:{float:"right"},children:e.jsxs("label",{class:"form-check form-switch",style:{float:"right"},children:[e.jsx("input",{class:"form-check-input",type:"checkbox",checked:t,onChange:s=>m(s.target.checked)}),e.jsx("span",{class:"form-check-label",children:"Manual Entry"})]})})]})}),t?e.jsxs("div",{className:"card-body",id:"manual_import",children:[e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Candidate Name"}),e.jsx("input",{type:"text",className:"form-control",name:"name"})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"PP Issue Date"}),e.jsx("input",{type:"date",className:"form-control",name:"pp_issue_date"})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Place of Issue"}),e.jsx("select",{className:"form-select",children:e.jsx("option",{children:"Select Place of Issue"})})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"PP Issue Date"}),e.jsx("input",{type:"date",className:"form-control",name:"pp_issue_date"})]})})]}),e.jsxs("div",{className:"row g-5",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Reference Slip Issue Date"}),e.jsx("input",{type:"date",className:"form-control",name:"ref_slip_issue_date"})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Reference Slip Expiry Date"}),e.jsx("input",{type:"date",className:"form-control",name:"ref_slip_expiry_date"})]})})]})]}):e.jsxs("div",{className:"card-body",id:"auto_import",children:[e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Place of Issue"}),e.jsx("select",{className:"form-select",children:e.jsx("option",{children:"Select Place of Issue"})})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"PP Issue Date"}),e.jsx("input",{type:"date",className:"form-control",name:"pp_issue_date"})]})})]}),e.jsxs("div",{className:"row g-5",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Reference Slip Issue Date"}),e.jsx("input",{type:"date",className:"form-control",name:"ref_slip_issue_date"})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Reference Slip Expiry Date"}),e.jsx("input",{type:"date",className:"form-control",name:"ref_slip_expiry_date"})]})})]})]})]})})})})]}),e.jsxs("div",{className:"row row-cards",children:[e.jsx("div",{className:"col-md-6",children:e.jsx("div",{className:"row row-cards",children:e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-header",children:e.jsx("div",{className:"col-md-12 flex align-items-center",children:e.jsx("div",{className:"col-md-6",style:{float:"left"},children:e.jsx("h3",{children:"General Information"})})})}),e.jsxs("div",{className:"card-body",children:[e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Registeration Date"}),e.jsx("input",{type:"date",className:"form-control",name:"reg_date"})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Serial Number"}),e.jsx("input",{type:"text",className:"form-control",name:"serial_no"})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Agency"}),e.jsx("select",{className:"form-select",name:"agency",children:e.jsx("option",{children:"Select Agency"})})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Country"}),e.jsx("select",{className:"form-select",name:"country",children:e.jsx("option",{children:"Select Country"})})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Profession"}),e.jsx("select",{className:"form-select",name:"profession",children:e.jsx("option",{children:"Select Profession"})})]})}),e.jsx("div",{className:"col-3",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Fees"}),e.jsx("input",{className:"form-control",name:"fees",type:"text"})]})}),e.jsx("div",{className:"col-3",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Discount"}),e.jsx("input",{className:"form-control",name:"discount",type:"text"})]})})]})]})]})})})}),e.jsx("div",{className:"col-md-6",children:e.jsx("div",{className:"row row-cards",children:e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-header",children:e.jsx("div",{className:"col-md-12 flex align-items-center",children:e.jsx("div",{className:"col-md-6",style:{float:"left"},children:e.jsx("h3",{children:"Candidate Information"})})})}),e.jsxs("div",{className:"card-body",children:[e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Relation"}),e.jsxs("select",{className:"form-select",children:[e.jsx("option",{value:"",children:"Select Relation"}),e.jsx("option",{value:"S/O",children:"S/O"}),e.jsx("option",{value:"W/O",children:"W/O"}),e.jsx("option",{value:"D/O",children:"D/O"})]})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Relative Name"}),e.jsx("input",{type:"text",className:"form-control",name:"relative_name"})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Phone 1"}),e.jsx("input",{type:"text",className:"form-control",name:"phone_1"})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Phone 2"}),e.jsx("input",{type:"text",className:"form-control",name:"phone_2"})]})})]}),e.jsxs("div",{className:"row g-5",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Marital Status"}),e.jsxs("select",{className:"form-select",name:"marital_status",children:[e.jsx("option",{value:"",children:"Select Marital Status"}),e.jsx("option",{value:"Single",children:"Single"}),e.jsx("option",{value:"Married",children:"Married"}),e.jsx("option",{value:"Divorced",children:"Divorced"}),e.jsx("option",{value:"Widowed",children:"Widowed"})]})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Remarks"}),e.jsx("textarea",{className:"form-control"})]})})]})]})]})})})})]})]})})]})}export{W as default};