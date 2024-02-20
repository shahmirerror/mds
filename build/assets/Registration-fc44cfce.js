import{r as g,W as se,j as e,a as ae}from"./app-8b5ea9c7.js";import{A as te}from"./AuthenticatedLayout-f4b0d9e0.js";import"./TextInput-0deca653.js";import{Q as le,B as o}from"./ReactToastify-a39b397b.js";import{S as f}from"./react-select.esm-32be4dc4.js";import{I as ne}from"./IconRefresh-d5c8d06d.js";import"./createReactComponent-cd75750e.js";import"./index-e55138a9.js";function be(c){var O;const[h,S]=g.useState(c.token_no),[B,R]=g.useState(c.in_queue),[y,T]=g.useState(null),[F,I]=g.useState(null),[q,w]=g.useState(!0),u=new Date;g.useState(null);const[b,N]=g.useState(!1);g.useState(null);const[d,C]=g.useState(!1),[D,re]=g.useState(""),[_,P]=g.useState(null),[ie,E]=g.useState(null),[oe,M]=g.useState(!1),{data:a,setData:m,post:ce,processing:de,errors:me,reset:H}=se({passport_no:"",passport_issue_date:null,passport_expiry_date:null,candidate_name:"",candidate_image:null,passport_image:null,agency:"",country:"",profession:"",cnic:"",gender:"",finger_type:"",dob:null,place_of_issue:"",reg_date:u.getMonth()+1>=10?u.getFullYear()+"-"+(u.getMonth()+1)+"-"+u.getDate():u.getFullYear()+"-0"+(u.getMonth()+1)+"-"+u.getDate(),ref_slip_issue_date:null,ref_slip_expiry_date:null,barcode:c.barcode,serial_no:"",relation_type:"",relative_name:"",phone_1:"",phone_2:"",nationality:"",marital_status:"",biometric_fingerprint:"",fees:"",discount:"",remarks:"",pregnancy_test:0,repeat:!1,token_no:h}),L=[{value:"L-Thumb",label:"L-Thumb"},{value:"L-Index Finger",label:"L-Index Finger"},{value:"L-Middle Finger",label:"L-Middle Finger"},{value:"L-Ring Finger",label:"L-Ring Finger"},{value:"L-Pinky Finger",label:"L-Pinky Finger"},{value:"R-Thumb",label:"R-Thumb"},{value:"R-Index Finger",label:"R-Index Finger"},{value:"R-Middle Finger",label:"R-Middle Finger"},{value:"R-Ring Finger",label:"R-Ring Finger"},{value:"R-Pinky Finger",label:"R-Pinky Finger"}];function J(s,l=5e3){return new Promise((n,t)=>{const r=setTimeout(()=>t("Element not found"),l),p=new MutationObserver(v=>{for(const j of v){const x=j.target;if(x.matches(s)){clearTimeout(r),p.disconnect(),n(x);return}}});p.observe(document.body,{childList:!0,subtree:!0}),document.querySelector(s)&&(clearTimeout(r),p.disconnect(),n(document.querySelector(s)))})}const A=s=>{if(b){N(!1);let l=document.getElementById("video"),n=document.getElementById("photo-placeholder");s.target.innerHTML="Turn Camera On",s.target.classList.value="btn btn-success btn-md",_.getTracks().forEach(t=>t.stop()),n.style.display="block",l.style.display="none"}else N(!0),s.target.innerHTML="Turn Camera Off",s.target.classList.value="btn btn-danger btn-md",J("#video").then(async l=>{let n=document.getElementById("video"),t=document.getElementById("photo-placeholder");const r=await navigator.mediaDevices.getUserMedia({video:!0});P(r),t.style.display="none",n.style.display="block",n.srcObject=r}).catch(l=>{o.error("Something went wrong! Can't access your camera :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})})},k=s=>{let l=document.getElementById("video"),n=document.getElementById("taken_photo");if(s.target.value=="take"){const t=document.createElement("canvas");t.width=l.videoWidth,t.height=l.videoHeight,t.getContext("2d").drawImage(l,0,0),n.src=t.toDataURL("image/png"),l.style.display="none",n.style.display="block";const p=new Blob([t.toDataURL("image/png").replace("data:image/png;base64,","")],{type:"image/png"}),v="webcam_photo_"+Date.now()+".png",j=new File([p],v,{type:"image/png"});m("candidate_image",j)}else s.target.value=="retake"&&(m("candidate_image",null),l.style.display="block",n.style.display="none")},G=()=>{const s={centre_id:c.auth.user.centre.centre_id,process_id:1},l=JSON.stringify(s);try{const n=fetch(route("token.assign"),{method:"POST",body:l}).then(t=>t.json()).then(t=>{S(t.new_token),R(t.in_queue),t.new_token=="None"?o.warning("No Tokens found in Queue!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}):o.success("New Token has been set!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})},t=>{o.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})})}catch{o.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}},Q=()=>{a.barcode!=""&&a.barcode!=null&&T(a.barcode);const s={centre_id:c.auth.user.centre.centre_id},l=JSON.stringify(s);try{const n=fetch(route("barcode.new"),{method:"POST",body:l}).then(t=>t.json()).then(t=>{m("barcode",t.new_barcode)},t=>{console.log(t)})}catch(n){console.log(n)}},W=()=>{const s={centre_id:c.auth.user.centre.centre_id,barcode_no:y},l=JSON.stringify(s);try{const n=fetch(route("lab.export_reg_report"),{method:"POST",body:l}).then(t=>t.json()).then(t=>{o.success("Report has been generated!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}),I(t.filename),M(!0)},t=>{o.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})})}catch{o.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}},U=()=>{G(),Q(),_!==null&&_.getTracks().forEach(r=>r.stop()),document.getElementById("fingerPrint").src="./../assets/static/photos/ThumbPrint.png";let s=document.getElementById("video"),l=document.getElementById("photo-placeholder"),n=document.getElementById("taken_photo");l.style.display="block",s.style.display="none",n.style.display="none";let t=document.getElementById("cameraToggle");t.innerHTML="Turn Camera On",t.classList.value="btn btn-success btn-md",N(!1),C(!1),P(!1),E(null),H(),Z()};function Y(s,l){var n="https://localhost:8443/SGIFPCapture",t=new XMLHttpRequest;t.onreadystatechange=function(){t.readyState==4&&t.status==200?s(JSON.parse(t.responseText)):t.status==404&&l(t.status)},t.onerror=function(){l(t.status)};var r="Timeout=10000";r+="&Quality=50",r+="&licstr="+encodeURIComponent(D),r+="&templateFormat=ISO",t.open("POST",n,!0),t.send(r)}function X(s){s.ErrorCode==0?(s!=null&&s.BMPBase64.length>0&&(document.getElementById("fingerPrint").src="data:image/bmp;base64,"+s.BMPBase64),m("biometric_fingerprint",s.TemplateBase64)):o.error("Fingerprint Capture Error Code:  "+s.ErrorCode,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}function $(s){o.warning("Check if Fingerprint Scanner is running!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}const z=s=>{s.preventDefault(),Y(X,$)},K=async s=>{const l={centre_id:c.auth.user.centre.centre_id,counter_id:1,username:c.username},n=JSON.stringify(l);try{const t=await o.promise(fetch(route("ppscan.new"),{method:"POST",body:n}),{pending:"Importing Passport"}).then(r=>r.json()).then(r=>{r.pp_info==null?(w(!1),o.warning(r.message,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})):(w(!1),a.passport_image=r.filename,a.passport_no=r.pp_info.pp_no,a.nationality=r.pp_info.nationality,a.candidate_name=r.pp_info.first_name+" "+r.pp_info.last_name,a.cnic=r.pp_info.cnic,a.place_of_issue=r.pp_info.pp_issue_state,a.passport_expiry_date=r.pp_info.pp_expiry_date,m("gender",r.pp_info.gender),o.success("Passport Found!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}),console.log(a))},r=>{o.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})})}catch(t){console.log(t),o.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}},i=s=>{s.target.name=="gender"?(m("pregnancy_test",0),m("gender",s.target.value)):m(s.target.name,s.target.value)},V=async s=>{var n,t,r;let l=ee();if(l==!0){const p={data:a,passport_image:a.passport_image,candidate_image:a.candidate_image,centre_id:(r=(t=(n=c==null?void 0:c.auth)==null?void 0:n.user)==null?void 0:t.centre)==null?void 0:r.centre_id},v=JSON.stringify(p);try{const j=await o.promise(fetch(route("lab.store_registration"),{method:"POST",body:v}),{pending:"Submitting Form"}).then(x=>x.json()).then(x=>{o.success("Candidate has been Registered!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}),location.reload()},x=>{o.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})})}catch{o.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}}else o.warning(l,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})},Z=()=>{m({passport_no:"",passport_issue_date:"",passport_expiry_date:"",candidate_name:"",candidate_image:null,passport_image:null,agency:"",country:"",profession:"",cnic:"",gender:"",finger_type:"",dob:"",place_of_issue:"",reg_date:"",ref_slip_issue_date:"",ref_slip_expiry_date:"",barcode:c==null?void 0:c.barcode_no,serial_no:"",relation_type:"",relative_name:"",phone_1:"",phone_2:"",nationality:"",marital_status:"",biometric_fingerprint:"",fees:"",discount:"",remarks:"",pregnancy_test:0,repeat:!1,token_no:h})},ee=()=>{let s=!0;return Object.entries(a).map(([l,n])=>{(l=="biometric_fingerprint"||l=="serial_no")&&(n==null||n=="")?s="Please input "+l.replaceAll("_"," ")+" before submitting form!":(l=="candidate_image"||l=="passport_image"||l=="passport_no"||l=="gender")&&(n==null||n=="")&&(s="Please input candidate details before submitting form!")}),s};return g.useEffect(()=>{},[]),e.jsxs(te,{user:c.auth.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Registration Desk"}),children:[e.jsx(ae,{title:"Registration Desk"}),e.jsx(le,{position:"top-right",autoClose:5e3,hideProgressBar:!1,newestOnTop:!1,closeOnClick:!0,rtl:!1,pauseOnFocusLoss:!0,draggable:!0,pauseOnHover:!0,theme:"light"}),e.jsx("div",{className:"page-header d-print-none",children:e.jsx("div",{className:"container-xl",children:e.jsx("div",{className:"row g-2 align-items-center",children:e.jsxs("div",{className:"col align-items-center",children:[e.jsx("div",{className:"col-md-3",style:{float:"left"},children:e.jsx("h2",{className:"page-title",style:{float:"left"},children:"Registration Desk"})}),e.jsx("div",{className:"col-md-6 align-items-center",style:{float:"right"},children:e.jsxs("h2",{className:"page-title",style:{float:"right"},children:[e.jsx("button",{className:"btn btn-secondary btn-sm mr-5 btn-pill",onClick:U,children:e.jsx(ne,{})}),e.jsxs("span",{className:"badge",children:["Current Token: ",h!="None"?"M"+h:"None"]}),"|",e.jsxs("span",{className:"badge",children:["In Queue: ",B]})]})})]})})})}),e.jsx("div",{className:"page-body",children:e.jsxs("div",{className:"container-xl",children:[e.jsxs("div",{className:"row row-cards mb-5",children:[e.jsx("div",{className:"col-md-6",children:e.jsx("div",{className:"row row-cards",children:e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-header",children:e.jsx("div",{className:"col-md-12 flex align-items-center",children:e.jsx("div",{className:"col-md-4",style:{float:"left"},children:e.jsxs("span",{style:{float:"left"},className:"badge bg-secondary text-white",children:["Barcode Number: ",a.barcode]})})})}),e.jsx("div",{className:"card-body",children:e.jsxs("div",{className:"row g-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("img",{id:"fingerPrint",src:"./../assets/static/photos/ThumbPrint.png",style:{width:500}}),e.jsx("div",{className:"col-md-12 text-center",children:e.jsx("button",{className:"btn btn-purple btn-md w-50",onClick:z,children:"Scan fingerprint"})}),e.jsx("div",{className:"col-md-12 text-center",children:e.jsxs("select",{className:"form-select",required:!0,name:"finger_type",onChange:i,children:[e.jsx("option",{children:"--"}),L.map((s,l)=>e.jsx("option",{value:s.value,children:s.label}))]})})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("video",{id:"video",autoPlay:!0,muted:!0,style:{height:"280px",display:"none"}}),e.jsx("img",{src:null,id:"taken_photo",style:{width:300,display:"none",marginTop:"55px"},className:"mb-5"}),e.jsx("img",{src:"./../assets/static/photos/Photo.png",className:"mb-4",id:"photo-placeholder",style:{width:274}}),e.jsx("div",{className:"col-md-6",children:b&&a.candidate_image==null?e.jsx("button",{className:"btn btn-warning btn-md",value:"take",onClick:k,children:"Take Photo"}):b&&a.candidate_image!=null?e.jsx("button",{className:"btn btn-warning btn-md",value:"retake",onClick:k,children:"Re-Take Photo"}):e.jsx(e.Fragment,{})}),e.jsx("div",{className:"col-md-6",children:e.jsx("button",{className:"btn btn-success btn-md",id:"cameraToggle",disabled:a.candidate_image!=null,onClick:A,children:"Turn Camera On"})})]})})]})})]})})})}),e.jsx("div",{className:"col-md-6",children:e.jsx("div",{className:"row row-cards",children:e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-header",children:e.jsxs("div",{className:"col-md-12 flex align-items-center",children:[e.jsx("div",{className:"col-md-6",style:{float:"left",display:"flex",justifyContent:"space-between"},children:d?e.jsx("h3",{children:"Passport Information"}):e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"btn btn-sm btn-yellow",onClick:K,children:"Import Passport"}),e.jsx("a",{className:"btn btn-outline-danger btn-sm",type:"button",href:h!="None"?route("registration-desk.show","repeat-case?token_no="+h):"#",children:"Repeat Case"})]})}),e.jsx("div",{className:"col-md-6",style:{float:"right"},children:e.jsxs("label",{class:"form-check form-switch",style:{float:"right"},children:[e.jsx("input",{class:"form-check-input",type:"checkbox",disabled:a.passport_image!=null&&a.passport_image!="",checked:d,onChange:s=>C(s.target.checked)}),e.jsx("span",{class:"form-check-label",children:"Manual Entry"})]})})]})}),d?e.jsxs("div",{className:"card-body",id:"manual_import",children:[e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Candidate Name"}),e.jsx("input",{type:"text",required:d,className:"form-control",name:"candidate_name",value:a.candidate_name,onChange:i})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Passport Number"}),e.jsx("input",{type:"text",required:d,className:"form-control",name:"passport_no",value:a.passport_no,onChange:i})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"PP Issue Date"}),e.jsx("input",{type:"date",required:d,className:"form-control",name:"passport_issue_date",value:a.passport_issue_date,onChange:i})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"PP Expiry Date"}),e.jsx("input",{type:"date",required:d,className:"form-control",name:"passport_expiry_date",value:a.passport_expiry_date,onChange:i})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"DOB"}),e.jsx("input",{type:"date",required:d,className:"form-control",name:"dob",value:a.dob,onChange:i})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Gender"}),e.jsxs("select",{className:"form-control",required:d,name:"gender",value:a.gender,onChange:i,children:[e.jsx("option",{value:"",children:"Select Gender"}),e.jsx("option",{value:"Male",children:"Male"}),e.jsx("option",{value:"Female",children:"Female"})]})]})}),q&&e.jsx("div",{className:"col-4",id:"passport_manual_image",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Passport Image"}),e.jsx("input",{type:"file",className:"form-control",required:d,name:"passport_image",onChange:s=>m("passport_image",s.target.files[0])})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Nationality"}),e.jsx("input",{type:"text",className:"form-control",required:d,name:"nationality",value:a.nationality,onChange:i})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"CNIC"}),e.jsx("input",{type:"text",className:"form-control",required:d,name:"cnic",value:a.cnic,onChange:i})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Place of Issue"}),e.jsx(f,{options:c.places,value:a.place_of_issue,required:d,name:"place_of_issue",onChange:s=>m("place_of_issue",s)})]})})]}),e.jsxs("div",{className:"row g-5",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Reference Slip Issue Date"}),e.jsx("input",{type:"date",required:d,className:"form-control",name:"ref_slip_issue_date",value:a.ref_slip_issue_date,onChange:i})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Reference Slip Expiry Date"}),e.jsx("input",{type:"date",required:d,className:"form-control",name:"ref_slip_expiry_date",value:a.ref_slip_expiry_date,onChange:i})]})})]})]}):e.jsx("div",{className:"card-body",id:"auto_import",children:e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"PP Issue Date"}),e.jsx("input",{type:"date",required:d==!1,className:"form-control",name:"passport_issue_date",onChange:i})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Reference Slip Issue Date"}),e.jsx("input",{type:"date",required:d==!1,className:"form-control",name:"ref_slip_issue_date",value:a.ref_slip_issue_date,onChange:i})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Reference Slip Expiry Date"}),e.jsx("input",{type:"date",required:d==!1,className:"form-control",name:"ref_slip_expiry_date",value:a.ref_slip_expiry_date,onChange:i})]})})]})}),!d&&e.jsx("div",{className:"card-body",children:e.jsx("div",{className:"row g-5 mb-3",children:e.jsx("img",{src:a.passport_image!=null||a.passport_image!=""?a.passport_image:"#"})})})]})})})})]}),e.jsxs("div",{className:"row row-cards",children:[e.jsx("div",{className:"col-md-6",children:e.jsx("div",{className:"row row-cards",children:e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-header",children:e.jsxs("div",{className:"col-md-12 flex align-items-center",children:[e.jsx("div",{className:"col-md-6",style:{float:"left"},children:e.jsx("h3",{children:"General Information"})}),e.jsx("div",{className:"col-md-6",style:{float:"right"},children:e.jsx("h3",{style:{textAlign:"right"},children:((O=a.reg_date)==null?void 0:O.replaceAll("-",""))+a.serial_no})})]})}),e.jsxs("div",{className:"card-body",children:[e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Registration Date"}),e.jsx("input",{type:"date",required:!0,className:"form-control",name:"reg_date",value:a.reg_date,onChange:i})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Serial Number"}),e.jsx("input",{type:"text",required:!0,className:"form-control",name:"serial_no",value:a.serial_no,onChange:i})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Agency"}),e.jsx(f,{options:c.agencies,value:a.agency,name:"agencies",onChange:s=>m("agency",s)})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Country"}),e.jsx(f,{options:c.countries,value:a.country,name:"country",onChange:s=>m("country",s)})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Profession"}),e.jsx(f,{options:c.professions,value:a.profession,name:"profession",onChange:s=>m("profession",s)})]})}),e.jsx("div",{className:"col-3",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Fees"}),e.jsx("input",{className:"form-control",name:"fees",type:"text",value:a.fees,onChange:i})]})}),e.jsx("div",{className:"col-3",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Discount"}),e.jsx("input",{className:"form-control",name:"discount",type:"text",value:a.discount,onChange:i})]})})]})]})]})})})}),e.jsx("div",{className:"col-md-6",children:e.jsx("div",{className:"row row-cards",children:e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-header",children:e.jsx("div",{className:"col-md-12 flex align-items-center",children:e.jsx("div",{className:"col-md-6",style:{float:"left"},children:e.jsx("h3",{children:"Candidate Information"})})})}),e.jsxs("div",{className:"card-body",children:[e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Relation"}),e.jsxs("select",{className:"form-select",name:"relation_type",value:a.relation_type,onChange:i,children:[e.jsx("option",{value:"",children:"Select Relation"}),e.jsx("option",{value:"S/O",children:"S/O"}),e.jsx("option",{value:"W/O",children:"W/O"}),e.jsx("option",{value:"D/O",children:"D/O"})]})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Relative Name"}),e.jsx("input",{type:"text",className:"form-control",name:"relative_name",value:a.relative_name,onChange:i})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Phone 1"}),e.jsx("input",{type:"text",required:!0,className:"form-control",name:"phone_1",value:a.phone_1,onChange:i})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Phone 2"}),e.jsx("input",{type:"text",className:"form-control",name:"phone_2",value:a.phone_2,onChange:i})]})})]}),e.jsxs("div",{className:"row g-5",children:[e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Pregnancy Check"}),e.jsxs("select",{className:"form-select",disabled:a.gender=="Male",name:"pregnancy_test",value:a.pregnancy_test,onChange:i,children:[e.jsx("option",{value:"1",children:"Pregnant"}),e.jsx("option",{value:"0",children:"Not Pregnant"})]})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Marital Status"}),e.jsxs("select",{className:"form-select",name:"marital_status",value:a.marital_status,onChange:i,children:[e.jsx("option",{value:"",children:"Select Marital Status"}),e.jsx("option",{value:"Single",children:"Single"}),e.jsx("option",{value:"Married",children:"Married"}),e.jsx("option",{value:"Divorced",children:"Divorced"}),e.jsx("option",{value:"Widowed",children:"Widowed"})]})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Remarks"}),e.jsx("textarea",{className:"form-control",name:"remarks",value:a.remarks,onChange:i})]})})]})]}),e.jsx("div",{className:"card-body",children:e.jsxs("div",{className:"row g-5",children:[e.jsx("div",{className:"col-3",children:e.jsx("button",{className:"btn btn-outline-success",disabled:h=="None",onClick:V,children:"Submit Form"})}),e.jsx("div",{className:"col-3",children:e.jsx("a",{className:"btn btn-outline-info",type:"button",href:route("registration-desk.show","edit"),children:"Edit Registration"})}),e.jsx("div",{className:"col-3",children:e.jsx("button",{className:"btn btn-outline-purple","data-bs-toggle":"modal","data-bs-target":"#reg-report",disabled:y==null,onClick:W,children:"Print Report"})})]})})]})})})})]})]})}),e.jsx("div",{className:"modal modal-blur fade",id:"reg-report",tabindex:"-1",role:"dialog","aria-hidden":"true",children:e.jsx("div",{className:"modal-dialog modal-lg modal-dialog-centered",role:"document",children:e.jsxs("div",{className:"modal-content",children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h5",{className:"modal-title",children:"Registration Slip"}),e.jsx("button",{type:"button",className:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})]}),e.jsx("div",{className:"modal-body",children:e.jsx("iframe",{src:F,style:{height:"300px",width:"100%"}})}),e.jsx("div",{className:"modal-footer",children:e.jsx("a",{href:"#",className:"btn btn-link link-secondary","data-bs-dismiss":"modal",children:"Close"})})]})})})]})}export{be as default};