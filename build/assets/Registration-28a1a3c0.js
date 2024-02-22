import{r as m,W as ye,j as e,a as we}from"./app-4431c5fe.js";import{A as Ce}from"./AuthenticatedLayout-59639fa7.js";import"./TextInput-4c395509.js";import{Q as Pe,B as c}from"./ReactToastify-4595696f.js";import{S as b}from"./react-select.esm-7f25b372.js";import{I as ke}from"./IconRefresh-2b3191b2.js";import"./createReactComponent-3ce27679.js";import"./index-23e86464.js";function Ge(i){var B,R,I,T,D,q,M,E,L,H,J,G,U,A,Q,W,Y,X,$,z,K;const[h,V]=m.useState(i.token_no),[Z,ee]=m.useState(i.in_queue),[C,se]=m.useState(i.prevBarcode),[ae,P]=m.useState(null),[f,N]=m.useState(!0),[le,k]=m.useState(!1),u=new Date;m.useState(null);const[_,y]=m.useState(!1);m.useState(null);const[d,S]=m.useState(!1),[te,Se]=m.useState(""),[w,O]=m.useState(null),[Oe,ne]=m.useState(null),[Fe,re]=m.useState(!1),{data:s,setData:g,post:Be,processing:Re,errors:Ie,reset:ie}=ye({passport_no:"",passport_issue_date:null,passport_expiry_date:null,candidate_name:"",candidate_image:null,passport_image:null,agency:"",country:"",profession:"",cnic:"",gender:"",finger_type:"",dob:null,place_of_issue:"",reg_date:u.getMonth()+1>=10?u.getFullYear()+"-"+(u.getMonth()+1)+"-"+u.getDate():u.getFullYear()+"-0"+(u.getMonth()+1)+"-"+u.getDate(),ref_slip_issue_date:null,ref_slip_expiry_date:null,barcode:i.barcode,serial_no:"",relation_type:"",relative_name:"",phone_1:"",phone_2:"",nationality:"",marital_status:"",biometric_fingerprint:"",fees:"",discount:"",remarks:"",pregnancy_test:0,repeat:!1,token_no:h}),oe=[{value:"L-Thumb",label:"L-Thumb"},{value:"L-Index Finger",label:"L-Index Finger"},{value:"L-Middle Finger",label:"L-Middle Finger"},{value:"L-Ring Finger",label:"L-Ring Finger"},{value:"L-Pinky Finger",label:"L-Pinky Finger"},{value:"R-Thumb",label:"R-Thumb"},{value:"R-Index Finger",label:"R-Index Finger"},{value:"R-Middle Finger",label:"R-Middle Finger"},{value:"R-Ring Finger",label:"R-Ring Finger"},{value:"R-Pinky Finger",label:"R-Pinky Finger"}];function ce(a,t=5e3){return new Promise((o,l)=>{const r=setTimeout(()=>l("Element not found"),t),p=new MutationObserver(j=>{for(const v of j){const x=v.target;if(x.matches(a)){clearTimeout(r),p.disconnect(),o(x);return}}});p.observe(document.body,{childList:!0,subtree:!0}),document.querySelector(a)&&(clearTimeout(r),p.disconnect(),o(document.querySelector(a)))})}const de=a=>{if(_){y(!1);let t=document.getElementById("video"),o=document.getElementById("photo-placeholder");a.target.innerHTML="Turn Camera On",a.target.classList.value="btn btn-success btn-md",w.getTracks().forEach(l=>l.stop()),o.style.display="block",t.style.display="none"}else y(!0),a.target.innerHTML="Turn Camera Off",a.target.classList.value="btn btn-danger btn-md",ce("#video").then(async t=>{let o=document.getElementById("video"),l=document.getElementById("photo-placeholder");const r=await navigator.mediaDevices.getUserMedia({video:!0});O(r),l.style.display="none",o.style.display="block",o.srcObject=r}).catch(t=>{console.log(t),c.error("Something went wrong! Can't access your camera :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})})},F=a=>{let t=document.getElementById("video"),o=document.getElementById("taken_photo");if(a.target.value=="take"){const l=document.createElement("canvas");l.width=t.videoWidth,l.height=t.videoHeight,l.getContext("2d").drawImage(t,0,0),o.src=l.toDataURL("image/png"),t.style.display="none",o.style.display="block";const p=new Blob([l.toDataURL("image/png").replace("data:image/png;base64,","")],{type:"image/png"}),j="webcam_photo_"+Date.now()+".png",v=new File([p],j,{type:"image/png"});s.candidate_image=l.toDataURL("image/png"),console.log(v)}else a.target.value=="retake"&&(g("candidate_image",null),t.style.display="block",o.style.display="none",s.candidate_image=NULL)},me=()=>{const a={centre_id:i.auth.user.centre.centre_id,process_id:1},t=JSON.stringify(a);try{const o=fetch(route("token.assign"),{method:"POST",body:t}).then(l=>l.json()).then(l=>{V(l.new_token),ee(l.in_queue),l.new_token=="None"?c.warning("No Tokens found in Queue!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}):c.success("New Token has been set!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})},l=>{c.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})})}catch{c.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}},ge=()=>{s.barcode!=""&&s.barcode!=null&&se(s.barcode);const a={centre_id:i.auth.user.centre.centre_id},t=JSON.stringify(a);try{const o=fetch(route("barcode.new"),{method:"POST",body:t}).then(l=>l.json()).then(l=>{g("barcode",l.new_barcode)},l=>{console.log(l)})}catch(o){console.log(o)}},he=async()=>{const a={centre_id:i.auth.user.centre.centre_id,barcode_no:C},t=JSON.stringify(a);try{P(null);const o=await c.promise(fetch(route("lab.export_reg_report"),{method:"POST",body:t}),{pending:"Fetching Report"}).then(l=>l.json()).then(l=>{c.success("Report has been generated!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}),P(l.filename),re(!0)},l=>{c.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})})}catch{c.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}},ue=()=>{me(),ge(),w!==null&&w.getTracks().forEach(r=>r.stop()),document.getElementById("fingerPrint").src="./../assets/static/photos/ThumbPrint.png";let a=document.getElementById("video"),t=document.getElementById("photo-placeholder"),o=document.getElementById("taken_photo");t.style.display="block",a.style.display="none",o.style.display="none";let l=document.getElementById("cameraToggle");l.innerHTML="Turn Camera On",l.classList.value="btn btn-success btn-md",y(!1),S(!1),O(!1),ne(null),N(!0),ie(),Ne()};function pe(a,t){var o="https://localhost:8443/SGIFPCapture",l=new XMLHttpRequest;l.onreadystatechange=function(){l.readyState==4&&l.status==200?a(JSON.parse(l.responseText)):l.status==404&&t(l.status)},l.onerror=function(){t(l.status)};var r="Timeout=10000";r+="&Quality=50",r+="&licstr="+encodeURIComponent(te),r+="&templateFormat=ISO",l.open("POST",o,!0),l.send(r)}function xe(a){a.ErrorCode==0?(a!=null&&a.BMPBase64.length>0&&(document.getElementById("fingerPrint").src="data:image/bmp;base64,"+a.BMPBase64),g("biometric_fingerprint",a.TemplateBase64)):c.error("Fingerprint Capture Error Code:  "+a.ErrorCode,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}function je(a){c.warning("Check if Fingerprint Scanner is running!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}const ve=a=>{a.preventDefault(),pe(xe,je)},be=async a=>{const t={centre_id:i.auth.user.centre.centre_id,counter_id:1,username:i.username},o=JSON.stringify(t);try{const l=await c.promise(fetch(route("ppscan.new"),{method:"POST",body:o}),{pending:"Importing Passport"}).then(r=>r.json()).then(r=>{r.pp_info==null?(N(!1),k(!1),g("passport_image",r.filename),c.warning(r.message,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})):(N(!1),k(!0),s.passport_image=r.filename,s.passport_no=r.pp_info.pp_no,s.nationality=r.pp_info.nationality,s.candidate_name=r.pp_info.first_name+" "+r.pp_info.last_name,s.cnic=r.pp_info.cnic,s.dob=r.pp_info.dob,s.place_of_issue=r.pp_info.pp_issue_state,s.passport_expiry_date=r.pp_info.pp_expiry_date,g("gender",r.pp_info.gender),c.success("Passport Found!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}),console.log(s))},r=>{c.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})})}catch(l){console.log(l),c.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}},n=a=>{a.target.name=="gender"?(g("pregnancy_test",0),g("gender",a.target.value)):g(a.target.name,a.target.value.toUpperCase())},fe=async a=>{var o,l,r;let t=_e();if(t==!0){const p={data:s,passport_image:s.passport_image,candidate_image:s.candidate_image,centre_id:(r=(l=(o=i==null?void 0:i.auth)==null?void 0:o.user)==null?void 0:l.centre)==null?void 0:r.centre_id},j=JSON.stringify(p);try{const v=await c.promise(fetch(route("lab.store_registration"),{method:"POST",body:j}),{pending:"Submitting Form"}).then(x=>x.json()).then(x=>{c.success("Candidate has been Registered!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}),location.reload()},x=>{c.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})})}catch{c.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}}else c.warning(t,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})},Ne=()=>{g({passport_no:"",passport_issue_date:"",passport_expiry_date:"",candidate_name:"",candidate_image:null,passport_image:null,agency:"",country:"",profession:"",cnic:"",gender:"",finger_type:"",dob:"",place_of_issue:"",reg_date:"",ref_slip_issue_date:"",ref_slip_expiry_date:"",barcode:i==null?void 0:i.barcode_no,serial_no:"",relation_type:"",relative_name:"",phone_1:"",phone_2:"",nationality:"",marital_status:"",biometric_fingerprint:"",fees:"",discount:"",remarks:"",pregnancy_test:0,repeat:!1,token_no:h})},_e=()=>{let a=!0;return Object.entries(s).map(([t,o])=>{(t=="biometric_fingerprint"||t=="serial_no")&&(o==null||o=="")?a="Please input "+t.replaceAll("_"," ")+" before submitting form!":(t=="candidate_image"||t=="passport_image"||t=="passport_no"||t=="gender")&&(o==null||o=="")&&(a="Please input candidate details before submitting form!")}),a};return m.useEffect(()=>{},[]),e.jsxs(Ce,{user:i.auth.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Registration Desk"}),children:[e.jsx(we,{title:"Registration Desk"}),e.jsx(Pe,{position:"top-right",autoClose:5e3,hideProgressBar:!1,newestOnTop:!1,closeOnClick:!0,rtl:!1,pauseOnFocusLoss:!0,draggable:!0,pauseOnHover:!0,theme:"light"}),e.jsx("div",{className:"page-header d-print-none",children:e.jsx("div",{className:"container-xl",children:e.jsx("div",{className:"row g-2 align-items-center",children:e.jsxs("div",{className:"col align-items-center",children:[e.jsx("div",{className:"col-md-3",style:{float:"left"},children:e.jsx("h2",{className:"page-title",style:{float:"left"},children:"Registration Desk"})}),e.jsx("div",{className:"col-md-6 align-items-center",style:{float:"right"},children:e.jsxs("h2",{className:"page-title",style:{float:"right"},children:[e.jsx("button",{className:"btn btn-secondary btn-sm mr-5 btn-pill",onClick:ue,children:e.jsx(ke,{})}),e.jsxs("span",{className:"badge",children:["Current Token: ",h!="None"?"M"+h:"None"]}),"|",e.jsxs("span",{className:"badge",children:["In Queue: ",Z]})]})})]})})})}),e.jsx("div",{className:"page-body",children:e.jsxs("div",{className:"container-xl",children:[e.jsxs("div",{className:"row row-cards mb-5",children:[e.jsx("div",{className:"col-md-6",children:e.jsx("div",{className:"row row-cards",children:e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-header",children:e.jsx("div",{className:"col-md-12 flex align-items-center",children:e.jsx("div",{className:"col-md-4",style:{float:"left"},children:e.jsxs("span",{style:{float:"left"},className:"badge bg-secondary text-white",children:["Barcode Number: ",s.barcode]})})})}),e.jsx("div",{className:"card-body",children:e.jsxs("div",{className:"row g-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("img",{id:"fingerPrint",src:"./../assets/static/photos/ThumbPrint.png",style:{width:500}}),e.jsx("div",{className:"col-md-12 text-center",children:e.jsx("button",{className:"btn btn-purple btn-md w-50",onClick:ve,children:"Scan fingerprint"})}),e.jsx("div",{className:"col-md-12 text-center",children:e.jsxs("select",{className:"form-select",required:!0,name:"finger_type",onChange:n,children:[e.jsx("option",{children:"--"}),oe.map((a,t)=>e.jsx("option",{value:a.value,children:a.label}))]})})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("video",{id:"video",autoPlay:!0,muted:!0,style:{height:"280px",display:"none"}}),e.jsx("img",{src:null,id:"taken_photo",style:{width:300,display:"none",marginTop:"55px"},className:"mb-5"}),e.jsx("img",{src:"./../assets/static/photos/Photo.png",className:"mb-4",id:"photo-placeholder",style:{width:274}}),e.jsx("div",{className:"col-md-6",children:_&&s.candidate_image==null?e.jsx("button",{className:"btn btn-warning btn-md",value:"take",onClick:F,children:"Take Photo"}):_&&s.candidate_image!=null?e.jsx("button",{className:"btn btn-warning btn-md",value:"retake",onClick:F,children:"Re-Take Photo"}):e.jsx(e.Fragment,{})}),e.jsx("div",{className:"col-md-6",children:e.jsx("button",{className:"btn btn-success btn-md",id:"cameraToggle",disabled:s.candidate_image!=null,onClick:de,children:"Turn Camera On"})})]})})]})})]})})})}),e.jsx("div",{className:"col-md-6",children:e.jsx("div",{className:"row row-cards",children:e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-header",children:e.jsxs("div",{className:"col-md-12 flex align-items-center",children:[e.jsx("div",{className:"col-md-6",style:{float:"left",display:"flex",justifyContent:"space-between"},children:d?e.jsx("h3",{children:"Passport Information"}):e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"btn btn-sm btn-yellow",onClick:be,children:"Import Passport"}),e.jsx("a",{className:"btn btn-outline-danger btn-sm",type:"button",href:h!="None"?route("registration-desk.show","repeat-case?token_no="+h):"#",children:"Repeat Case"})]})}),e.jsx("div",{className:"col-md-6",style:{float:"right"},children:((D=(T=(I=(R=(B=i==null?void 0:i.auth)==null?void 0:B.modules)==null?void 0:R[0])==null?void 0:I.rights)==null?void 0:T[2])==null?void 0:D.permission_name)=="manual_entry"&&((H=(L=(E=(M=(q=i==null?void 0:i.auth)==null?void 0:q.modules)==null?void 0:M[2])==null?void 0:E.rights)==null?void 0:L[0])==null?void 0:H.status)==!0?e.jsxs("label",{class:"form-check form-switch",style:{float:"right"},children:[e.jsx("input",{class:"form-check-input",type:"checkbox",disabled:s.passport_image!=null&&s.passport_image!=""&&le,checked:d,onChange:a=>S(a.target.checked)}),e.jsx("span",{class:"form-check-label",children:"Manual Entry"})]}):e.jsx(e.Fragment,{})})]})}),d?e.jsxs("div",{className:"card-body",id:"manual_import",children:[e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Candidate Name"}),e.jsx("input",{type:"text",required:d,className:"form-control",name:"candidate_name",value:s.candidate_name,onChange:n})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Passport Number"}),e.jsx("input",{type:"text",required:d,className:"form-control",name:"passport_no",value:s.passport_no,onChange:n})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"PP Issue Date"}),e.jsx("input",{type:"date",required:d,className:"form-control",name:"passport_issue_date",value:s.passport_issue_date,onChange:n})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"PP Expiry Date"}),e.jsx("input",{type:"date",required:d,className:"form-control",name:"passport_expiry_date",value:s.passport_expiry_date,onChange:n})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"DOB"}),e.jsx("input",{type:"date",required:d,className:"form-control",name:"dob",value:s.dob,onChange:n})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Gender"}),e.jsxs("select",{className:"form-control",required:d,name:"gender",value:s.gender,onChange:n,children:[e.jsx("option",{value:"",children:"Select Gender"}),e.jsx("option",{value:"Male",children:"Male"}),e.jsx("option",{value:"Female",children:"Female"})]})]})}),f&&e.jsx("div",{className:"col-4",id:"passport_manual_image",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Passport Image"}),e.jsx("input",{type:"file",className:"form-control",required:d,name:"passport_image",onChange:a=>g("passport_image",a.target.files[0])})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Nationality"}),e.jsx("input",{type:"text",className:"form-control",required:d,name:"nationality",value:s.nationality,onChange:n})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"CNIC"}),e.jsx("input",{type:"text",className:"form-control",required:d,name:"cnic",value:s.cnic,onChange:n})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Place of Issue"}),e.jsx(b,{options:i.places,value:s.place_of_issue,required:d,name:"place_of_issue",onChange:a=>g("place_of_issue",a)})]})})]}),e.jsxs("div",{className:"row g-5",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Reference Slip Issue Date"}),e.jsx("input",{type:"date",required:d,className:"form-control",name:"ref_slip_issue_date",value:s.ref_slip_issue_date,onChange:n})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Reference Slip Expiry Date"}),e.jsx("input",{type:"date",required:d,className:"form-control",name:"ref_slip_expiry_date",value:s.ref_slip_expiry_date,onChange:n})]})})]})]}):e.jsxs("div",{className:"card-body",id:"auto_import",children:[!f&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Candidate Name"}),e.jsx("input",{type:"text",className:"form-control",name:"candidate_name",value:s.candidate_name,onChange:n})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Passport Number"}),e.jsx("input",{type:"text",disabled:!0,className:"form-control",name:"passport_no",value:s.passport_no,onChange:n})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"PP Expiry Date"}),e.jsx("input",{type:"date",disabled:!0,className:"form-control",name:"passport_expiry_date",value:s.passport_expiry_date,onChange:n})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"DOB"}),e.jsx("input",{type:"date",disabled:!0,className:"form-control",name:"dob",value:s.dob,onChange:n})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Gender"}),e.jsxs("select",{className:"form-control",disabled:!0,name:"gender",value:s.gender,onChange:n,children:[e.jsx("option",{value:"",children:"Select Gender"}),e.jsx("option",{value:"Male",children:"Male"}),e.jsx("option",{value:"Female",children:"Female"})]})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Nationality"}),e.jsx("input",{type:"text",className:"form-control",disabled:!0,name:"nationality",value:s.nationality,onChange:n})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"CNIC"}),e.jsx("input",{type:"text",className:"form-control",disabled:!0,name:"cnic",value:s.cnic,onChange:n})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Place of Issue"}),e.jsx("input",{type:"text",className:"form-control",disabled:!0,name:"cnic",value:s.place_of_issue,onChange:n})]})})]})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"PP Issue Date"}),e.jsx("input",{type:"date",required:d==!1,className:"form-control",name:"passport_issue_date",onChange:n})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Reference Slip Issue Date"}),e.jsx("input",{type:"date",required:d==!1,className:"form-control",name:"ref_slip_issue_date",value:s.ref_slip_issue_date,onChange:n})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Reference Slip Expiry Date"}),e.jsx("input",{type:"date",required:d==!1,className:"form-control",name:"ref_slip_expiry_date",value:s.ref_slip_expiry_date,onChange:n})]})})]})]}),!f&&e.jsx("div",{className:"card-body",children:e.jsx("div",{className:"row g-5 mb-3",children:e.jsx("img",{src:s.passport_image!=null||s.passport_image!=""?s.passport_image:"#"})})})]})})})})]}),e.jsxs("div",{className:"row row-cards",children:[e.jsx("div",{className:"col-md-6",children:e.jsx("div",{className:"row row-cards",children:e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-header",children:e.jsxs("div",{className:"col-md-12 flex align-items-center",children:[e.jsx("div",{className:"col-md-6",style:{float:"left"},children:e.jsx("h3",{children:"General Information"})}),e.jsx("div",{className:"col-md-6",style:{float:"right"},children:e.jsx("h3",{style:{textAlign:"right"},children:((J=s.reg_date)==null?void 0:J.replaceAll("-",""))+s.serial_no})})]})}),e.jsxs("div",{className:"card-body",children:[e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Registration Date"}),e.jsx("input",{type:"date",required:!0,className:"form-control",name:"reg_date",value:s.reg_date,onChange:n})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Serial Number"}),e.jsx("input",{type:"text",required:!0,className:"form-control",name:"serial_no",value:s.serial_no,onChange:n})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Agency"}),e.jsx(b,{options:i.agencies,value:s.agency,name:"agencies",onChange:a=>g("agency",a)})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Country"}),e.jsx(b,{options:i.countries,value:s.country,name:"country",onChange:a=>g("country",a)})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Profession"}),e.jsx(b,{options:i.professions,value:s.profession,name:"profession",onChange:a=>g("profession",a)})]})}),e.jsx("div",{className:"col-3",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Fees"}),e.jsx("input",{className:"form-control",name:"fees",type:"text",value:s.fees,onChange:n})]})}),e.jsx("div",{className:"col-3",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Discount"}),e.jsx("input",{className:"form-control",name:"discount",type:"text",value:s.discount,onChange:n})]})})]})]})]})})})}),e.jsx("div",{className:"col-md-6",children:e.jsx("div",{className:"row row-cards",children:e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-header",children:e.jsx("div",{className:"col-md-12 flex align-items-center",children:e.jsx("div",{className:"col-md-6",style:{float:"left"},children:e.jsx("h3",{children:"Candidate Information"})})})}),e.jsxs("div",{className:"card-body",children:[e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Relation"}),e.jsxs("select",{className:"form-select",name:"relation_type",value:s.relation_type,onChange:n,children:[e.jsx("option",{value:"",children:"Select Relation"}),e.jsx("option",{value:"S/O",children:"S/O"}),e.jsx("option",{value:"W/O",children:"W/O"}),e.jsx("option",{value:"D/O",children:"D/O"})]})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Relative Name"}),e.jsx("input",{type:"text",className:"form-control",name:"relative_name",value:s.relative_name,onChange:n})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Phone 1"}),e.jsx("input",{type:"text",required:!0,className:"form-control",name:"phone_1",value:s.phone_1,onChange:n})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Phone 2"}),e.jsx("input",{type:"text",className:"form-control",name:"phone_2",value:s.phone_2,onChange:n})]})})]}),e.jsxs("div",{className:"row g-5",children:[e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:s.gender=="Male"?"row g-3 align-items-center d-none":"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Pregnancy Check"}),e.jsxs("select",{className:"form-select",disabled:s.gender=="Male",name:"pregnancy_test",value:s.pregnancy_test,onChange:n,children:[e.jsx("option",{value:"1",children:"Pregnant"}),e.jsx("option",{value:"0",children:"Not Pregnant"})]})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Marital Status"}),e.jsxs("select",{className:"form-select",name:"marital_status",value:s.marital_status,onChange:n,children:[e.jsx("option",{value:"",children:"Select Marital Status"}),e.jsx("option",{value:"Single",children:"Single"}),e.jsx("option",{value:"Married",children:"Married"}),e.jsx("option",{value:"Divorced",children:"Divorced"}),e.jsx("option",{value:"Widowed",children:"Widowed"})]})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Remarks"}),e.jsx("textarea",{className:"form-control",name:"remarks",value:s.remarks,onChange:n})]})})]})]}),e.jsx("div",{className:"card-body",children:e.jsxs("div",{className:"row g-5",children:[e.jsx("div",{className:"col-3",children:e.jsx("button",{className:"btn btn-outline-success",disabled:h=="None",onClick:fe,children:"Submit Form"})}),((W=(Q=(A=(U=(G=i==null?void 0:i.auth)==null?void 0:G.modules)==null?void 0:U[0])==null?void 0:A.rights)==null?void 0:Q[0])==null?void 0:W.permission_name)=="edit"&&((K=(z=($=(X=(Y=i==null?void 0:i.auth)==null?void 0:Y.modules)==null?void 0:X[0])==null?void 0:$.rights)==null?void 0:z[0])==null?void 0:K.status)==!0?e.jsx("div",{className:"col-3",children:e.jsx("a",{className:"btn btn-outline-info",type:"button",href:route("registration-desk.show","edit"),children:"Edit Registration"})}):e.jsx(e.Fragment,{}),e.jsx("div",{className:"col-3",children:e.jsx("button",{className:"btn btn-outline-purple","data-bs-toggle":"modal","data-bs-target":"#reg-report",disabled:C==null,onClick:he,children:"Print Report"})})]})})]})})})})]})]})}),e.jsx("div",{className:"modal modal-blur fade",id:"reg-report",tabindex:"-1",role:"dialog","aria-hidden":"true",children:e.jsx("div",{className:"modal-dialog modal-lg modal-dialog-centered",role:"document",children:e.jsxs("div",{className:"modal-content",children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h5",{className:"modal-title",children:"Registration Slip"}),e.jsx("button",{type:"button",className:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})]}),e.jsx("div",{className:"modal-body",children:e.jsx("iframe",{src:ae,style:{height:"300px",width:"100%"}})}),e.jsx("div",{className:"modal-footer",children:e.jsx("a",{href:"#",className:"btn btn-link link-secondary","data-bs-dismiss":"modal",children:"Close"})})]})})})]})}export{Ge as default};
