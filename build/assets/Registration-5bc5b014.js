import{r as h,W as Se,j as e,a as Be}from"./app-39c368c7.js";import{A as Fe}from"./AuthenticatedLayout-3c3e3819.js";import"./TextInput-3bffad1a.js";import{Q as De,B as c}from"./ReactToastify-35e89cca.js";import{S as b}from"./react-select.esm-dd8b99cd.js";import{I as Ie}from"./IconRefresh-95f031ad.js";import"./createReactComponent-3d9c90ae.js";import"./index-eb642c4a.js";function ze(i){var T,q,R,M,E,H,L,J,A,G,U,W,Q,Y,X,$,z,K,V,Z,ee,se,ae,le;const[x,te]=h.useState(i.token_no),[ne,re]=h.useState(i.in_queue),[S,Te]=h.useState(i.prevBarcode),[ie,B]=h.useState(null),[_,y]=h.useState(!0),[oe,w]=h.useState(!1),[C,ce]=h.useState(i.auth.user.role_id==2?1:0),[m,v]=h.useState(null),u=new Date;h.useState(null);const[P,O]=h.useState(!1);h.useState(null);const[d,F]=h.useState(!1),[de,qe]=h.useState(""),[k,D]=h.useState(null),[Re,me]=h.useState(null),[Me,ge]=h.useState(!1),{data:s,setData:g,post:Ee,processing:He,errors:Le,reset:Je}=Se({passport_no:"",passport_issue_date:null,passport_expiry_date:null,candidate_name:"",candidate_image:null,passport_image:null,agency:"",country:"",profession:"",cnic:"",gender:"",finger_type:"",dob:null,place_of_issue:"",reg_date:u.getMonth()+1>=10?u.getFullYear()+"-"+(u.getMonth()+1)+"-"+u.getDate():u.getFullYear()+"-0"+(u.getMonth()+1)+"-"+u.getDate(),ref_slip_issue_date:null,ref_slip_expiry_date:null,barcode:i.barcode,serial_no:"",relation_type:"",relative_name:"",phone_1:"",phone_2:"",nationality:"",marital_status:"",biometric_fingerprint:"",fees:"",discount:"",remarks:"",pregnancy_test:0,repeat:!1,token_no:x}),he=[{value:"L-Thumb",label:"L-Thumb"},{value:"L-Index Finger",label:"L-Index Finger"},{value:"L-Middle Finger",label:"L-Middle Finger"},{value:"L-Ring Finger",label:"L-Ring Finger"},{value:"L-Pinky Finger",label:"L-Pinky Finger"},{value:"R-Thumb",label:"R-Thumb"},{value:"R-Index Finger",label:"R-Index Finger"},{value:"R-Middle Finger",label:"R-Middle Finger"},{value:"R-Ring Finger",label:"R-Ring Finger"},{value:"R-Pinky Finger",label:"R-Pinky Finger"}];function ue(a,n=5e3){return new Promise((r,l)=>{const t=setTimeout(()=>l("Element not found"),n),p=new MutationObserver(f=>{for(const N of f){const j=N.target;if(j.matches(a)){clearTimeout(t),p.disconnect(),r(j);return}}});p.observe(document.body,{childList:!0,subtree:!0}),document.querySelector(a)&&(clearTimeout(t),p.disconnect(),r(document.querySelector(a)))})}const pe=a=>{if(P){O(!1);let n=document.getElementById("video"),r=document.getElementById("photo-placeholder");a.target.innerHTML="Turn Camera On",a.target.classList.value="btn btn-success btn-md",k.getTracks().forEach(l=>l.stop()),r.style.display="block",n.style.display="none"}else O(!0),a.target.innerHTML="Turn Camera Off",a.target.classList.value="btn btn-danger btn-md",ue("#video").then(async n=>{let r=document.getElementById("video"),l=document.getElementById("photo-placeholder");const t=await navigator.mediaDevices.getUserMedia({video:!0});D(t),l.style.display="none",r.style.display="block",r.srcObject=t}).catch(n=>{console.log(n),c.error("Something went wrong! Can't access your camera :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})})},I=a=>{let n=document.getElementById("video"),r=document.getElementById("taken_photo");if(a.target.value=="take"){const l=document.createElement("canvas");l.width=n.videoWidth,l.height=n.videoHeight,l.getContext("2d").drawImage(n,0,0),r.src=l.toDataURL("image/png"),n.style.display="none",r.style.display="block";const p=new Blob([l.toDataURL("image/png").replace("data:image/png;base64,","")],{type:"image/png"}),f="webcam_photo_"+Date.now()+".png",N=new File([p],f,{type:"image/png"});s.candidate_image=l.toDataURL("image/png"),console.log(N)}else a.target.value=="retake"&&(g("candidate_image",null),n.style.display="block",r.style.display="none",s.candidate_image=NULL)},xe=()=>{const a={centre_id:i.auth.user.centre.centre_id,process_id:1,counter_no:C},n=JSON.stringify(a);try{const r=fetch(route("token.assign"),{method:"POST",body:n}).then(l=>l.json()).then(l=>{te(l.new_token),re(l.in_queue),l.new_token=="None"?c.warning("No Tokens found in Queue!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}):c.success("New Token has been set!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})},l=>{c.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})})}catch{c.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}},ve=()=>{const a={centre_id:i.auth.user.centre.centre_id},n=JSON.stringify(a);try{const r=fetch(route("barcode.new"),{method:"POST",body:n}).then(l=>l.json()).then(l=>{g("barcode",l.new_barcode)},l=>{console.log(l)})}catch(r){console.log(r)}},je=async()=>{const a={centre_id:i.auth.user.centre.centre_id,barcode_no:S},n=JSON.stringify(a);try{B(null);const r=await c.promise(fetch(route("lab.export_reg_report"),{method:"POST",body:n}),{pending:"Fetching Report"}).then(l=>l.json()).then(l=>{c.success("Report has been generated!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}),B(l.filename),ge(!0)},l=>{c.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})})}catch{c.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}},fe=()=>{xe(),ve(),k!==null&&k.getTracks().forEach(t=>t.stop()),document.getElementById("fingerPrint").src="./../assets/static/photos/ThumbPrint.png";let a=document.getElementById("video"),n=document.getElementById("photo-placeholder"),r=document.getElementById("taken_photo");n.style.display="block",a.style.display="none",r.style.display="none";let l=document.getElementById("cameraToggle");l.innerHTML="Turn Camera On",l.classList.value="btn btn-success btn-md",O(!1),F(!1),D(!1),me(null),y(!0),v(null),Oe()};function Ne(a,n){var r="https://localhost:8443/SGIFPCapture",l=new XMLHttpRequest;l.onreadystatechange=function(){l.readyState==4&&l.status==200?a(JSON.parse(l.responseText)):l.status==404&&n(l.status)},l.onerror=function(){n(l.status)};var t="Timeout=10000";t+="&Quality=50",t+="&licstr="+encodeURIComponent(de),t+="&templateFormat=ISO",l.open("POST",r,!0),l.send(t)}function be(a){a.ErrorCode==0?(a!=null&&a.BMPBase64.length>0&&(document.getElementById("fingerPrint").src="data:image/bmp;base64,"+a.BMPBase64),g("biometric_fingerprint",a.TemplateBase64)):c.error("Fingerprint Capture Error Code:  "+a.ErrorCode,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}function _e(a){c.warning("Check if Fingerprint Scanner is running!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}const ye=a=>{a.preventDefault(),Ne(be,_e)},we=async a=>{const n={centre_id:i.auth.user.centre.centre_id,counter_id:C,username:i.username};y(!0),w(!1),v(null),s.passport_image=null,s.passport_no="",s.nationality="",s.candidate_name="",s.cnic="",s.dob="",s.place_of_issue="",s.passport_expiry_date="",g("gender","");const r=JSON.stringify(n);try{const l=await c.promise(fetch(route("ppscan.new"),{method:"POST",body:r}),{pending:"Importing Passport"}).then(t=>t.json()).then(t=>{t.message=="No Passport Found!"||t.message=="Passport is Invalid"?(w(!1),g("passport_image",t.filename),c.warning(t.message,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})):(y(!1),w(!0),v(t.prev),t.prev!==null&&c.info("A previous registration was found!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}),s.passport_image=t.filename,s.passport_no=t.pp_info.pp_no,s.nationality=t.pp_info.nationality,s.candidate_name=t.pp_info.first_name+" "+t.pp_info.last_name,s.cnic=t.pp_info.cnic,s.dob=t.pp_info.dob,s.place_of_issue=t.pp_info.pp_issue_state,s.passport_expiry_date=t.pp_info.pp_expiry_date,g("gender",t.pp_info.gender),c.success("Passport Found!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}),console.log(s))},t=>{c.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})})}catch(l){console.log(l),c.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}},Ce=async a=>{const n={centre_id:i.auth.user.centre.centre_id,cnic:s.cnic};v(null);const r=JSON.stringify(n);try{const l=await c.promise(fetch(route("lab.fetch_prev_registration"),{method:"POST",body:r}),{pending:"Checking for any previous registrations"}).then(t=>t.json()).then(t=>{t.prev==null?(v(null),c.info("Candidate is new to the centre",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})):(v(t.prev),c.info("A previous registration was found!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}))},t=>{c.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})})}catch(l){console.log(l),c.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}},o=a=>{a.target.name=="gender"?(g("pregnancy_test",0),g("gender",a.target.value)):a.target.name=="marital_status"||a.target.name=="pregnancy_test"?g(a.target.name,a.target.value):g(a.target.name,a.target.value.toUpperCase())},Pe=async a=>{var r,l,t;let n=ke();if(n==!0){const p={data:s,passport_image:s.passport_image,candidate_image:s.candidate_image,centre_id:(t=(l=(r=i==null?void 0:i.auth)==null?void 0:r.user)==null?void 0:l.centre)==null?void 0:t.centre_id},f=JSON.stringify(p);try{const N=await c.promise(fetch(route("lab.store_registration"),{method:"POST",body:f}),{pending:"Submitting Form"}).then(j=>j.json()).then(j=>{c.success("Candidate has been Registered!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}),location.reload()},j=>{c.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})})}catch{c.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}}else c.warning(n,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})},Oe=()=>{s.passport_no="",s.passport_issue_date="",s.passport_expiry_date="",s.candidate_name="",s.candidate_image=null,s.passport_image=null,s.agency="",s.country="",s.profession="",s.cnic="",s.gender="",s.finger_type="",s.dob="",s.place_of_issue="",s.reg_date=u.getMonth()+1>=10?u.getFullYear()+"-"+(u.getMonth()+1)+"-"+u.getDate():u.getFullYear()+"-0"+(u.getMonth()+1)+"-"+u.getDate(),s.slip_issue_date="",s.ref_slip_expiry_date="",s.serial_no="",s.relation_type="",s.relative_name="",s.phone_1="",s.phone_2="",s.nationality="",s.marital_status="",s.biometric_fingerprint="",s.fees="",s.discount="",s.remarks="",s.pregnancy_test=0},ke=()=>{let a=!0;return Object.entries(s).map(([n,r])=>{(n=="biometric_fingerprint"||n=="serial_no")&&(r==null||r=="")?a="Please input "+n.replaceAll("_"," ")+" before submitting form!":(n=="candidate_image"||n=="passport_image"||n=="passport_no"||n=="gender")&&(r==null||r=="")&&(a="Please input candidate details before submitting form!")}),a};return e.jsxs(Fe,{user:i.auth.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Registration Desk"}),children:[e.jsx(Be,{title:"Registration Desk"}),e.jsx(De,{position:"top-right",autoClose:5e3,hideProgressBar:!1,newestOnTop:!1,closeOnClick:!0,rtl:!1,pauseOnFocusLoss:!0,draggable:!0,pauseOnHover:!0,theme:"light"}),e.jsx("div",{className:"page-header d-print-none",children:e.jsx("div",{className:"container-xl",children:e.jsx("div",{className:"row g-2 align-items-center",children:e.jsxs("div",{className:"col align-items-center",children:[e.jsxs("div",{className:"col-md-5",style:{float:"left"},children:[e.jsx("h2",{className:"page-title",style:{float:"left"},children:"Registration Desk"}),e.jsx("h4",{style:{float:"right"},children:e.jsxs("select",{className:"form-select",name:"counter_no",value:C,onChange:a=>ce(a.target.value),children:[e.jsx("option",{value:1,children:"Counter 1"}),e.jsx("option",{value:2,children:"Counter 2"})]})})]}),e.jsx("div",{className:"col-md-6 align-items-center",style:{float:"right"},children:e.jsxs("h2",{className:"page-title",style:{float:"right"},children:[e.jsx("button",{className:"btn btn-secondary btn-sm mr-5 btn-pill",onClick:fe,children:e.jsx(Ie,{})}),e.jsxs("span",{className:"badge",children:["Current Token: ",x!="None"?"M"+x:"None"]}),"|",e.jsxs("span",{className:"badge",children:["In Queue: ",ne]})]})})]})})})}),e.jsx("div",{className:"page-body",children:e.jsxs("div",{className:"container-xl",children:[e.jsxs("div",{className:"row row-cards mb-5",children:[e.jsx("div",{className:"col-md-6",children:e.jsx("div",{className:"row row-cards",children:e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-header",children:e.jsx("div",{className:"col-md-12 flex align-items-center",children:e.jsx("div",{className:"col-md-4",style:{float:"left"},children:e.jsxs("span",{style:{float:"left"},className:"badge bg-secondary text-white",children:["Barcode Number: ",s.barcode]})})})}),e.jsx("div",{className:"card-body",children:e.jsxs("div",{className:"row g-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("img",{id:"fingerPrint",src:"./../assets/static/photos/ThumbPrint.png",style:{width:500}}),e.jsx("div",{className:"col-md-12 text-center",children:e.jsx("button",{className:"btn btn-purple btn-md w-50",onClick:ye,children:"Scan fingerprint"})}),e.jsx("div",{className:"col-md-12 text-center",children:e.jsxs("select",{className:"form-select",required:!0,name:"finger_type",onChange:o,children:[e.jsx("option",{children:"--"}),he.map((a,n)=>e.jsx("option",{value:a.value,children:a.label}))]})})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("video",{id:"video",autoPlay:!0,muted:!0,style:{height:"280px",display:"none"}}),e.jsx("img",{src:null,id:"taken_photo",style:{width:300,display:"none",marginTop:"55px"},className:"mb-5"}),e.jsx("img",{src:"./../assets/static/photos/Photo.png",className:"mb-4",id:"photo-placeholder",style:{width:274}}),e.jsx("div",{className:"col-md-6",children:P&&s.candidate_image==null?e.jsx("button",{className:"btn btn-warning btn-md",value:"take",onClick:I,children:"Take Photo"}):P&&s.candidate_image!=null?e.jsx("button",{className:"btn btn-warning btn-md",value:"retake",onClick:I,children:"Re-Take Photo"}):e.jsx(e.Fragment,{})}),e.jsx("div",{className:"col-md-6",children:e.jsx("button",{className:"btn btn-success btn-md",id:"cameraToggle",disabled:s.candidate_image!=null,onClick:pe,children:"Turn Camera On"})})]})})]})})]})})})}),e.jsx("div",{className:"col-md-6",children:e.jsx("div",{className:"row row-cards",children:e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-header",children:e.jsxs("div",{className:"col-md-12 flex align-items-center",children:[e.jsx("div",{className:"col-md-6",style:{float:"left",display:"flex",justifyContent:"space-between"},children:d?e.jsx("h3",{children:"Passport Information"}):e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"btn btn-sm btn-yellow",onClick:we,children:"Import Passport"}),e.jsx("a",{className:"btn btn-outline-danger btn-sm",type:"button",href:x!="None"?route("registration-desk.show","repeat-case?token_no="+x):"#",children:"Repeat Case"})]})}),e.jsx("div",{className:"col-md-6",style:{float:"right"},children:((E=(M=(R=(q=(T=i==null?void 0:i.auth)==null?void 0:T.modules)==null?void 0:q[0])==null?void 0:R.rights)==null?void 0:M[2])==null?void 0:E.permission_name)=="manual_entry"&&((G=(A=(J=(L=(H=i==null?void 0:i.auth)==null?void 0:H.modules)==null?void 0:L[2])==null?void 0:J.rights)==null?void 0:A[0])==null?void 0:G.status)==!0?e.jsxs("label",{class:"form-check form-switch",style:{float:"right"},children:[e.jsx("input",{class:"form-check-input",type:"checkbox",disabled:s.passport_image!=null&&s.passport_image!=""&&oe,checked:d,onChange:a=>F(a.target.checked)}),e.jsx("span",{class:"form-check-label",children:"Manual Entry"})]}):e.jsx(e.Fragment,{})})]})}),d?e.jsxs("div",{className:"card-body",id:"manual_import",children:[e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Candidate Name"}),e.jsx("input",{type:"text",required:d,className:"form-control",name:"candidate_name",value:s.candidate_name,onChange:o})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Passport Number"}),e.jsx("input",{type:"text",required:d,className:"form-control",name:"passport_no",value:s.passport_no,onChange:o})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"PP Issue Date"}),e.jsx("input",{type:"date",required:d,className:"form-control",name:"passport_issue_date",value:s.passport_issue_date,onChange:o})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"PP Expiry Date"}),e.jsx("input",{type:"date",required:d,className:"form-control",name:"passport_expiry_date",value:s.passport_expiry_date,onChange:o})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"DOB"}),e.jsx("input",{type:"date",required:d,className:"form-control",name:"dob",value:s.dob,onChange:o})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Gender"}),e.jsxs("select",{className:"form-control",required:d,name:"gender",value:s.gender,onChange:o,children:[e.jsx("option",{value:"",children:"Select Gender"}),e.jsx("option",{value:"Male",children:"Male"}),e.jsx("option",{value:"Female",children:"Female"})]})]})}),_&&e.jsx("div",{className:"col-4",id:"passport_manual_image",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Passport Image"}),e.jsx("input",{type:"file",className:"form-control",required:d,name:"passport_image",onChange:a=>g("passport_image",a.target.files[0])})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Nationality"}),e.jsx("input",{type:"text",className:"form-control",required:d,name:"nationality",value:s.nationality,onChange:o})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"CNIC"}),e.jsx("input",{type:"text",className:"form-control",required:d,name:"cnic",value:s.cnic,onChange:o,onBlur:Ce})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Place of Issue"}),e.jsx(b,{options:i.places,value:s.place_of_issue,required:d,name:"place_of_issue",onChange:a=>g("place_of_issue",a)})]})})]}),e.jsxs("div",{className:"row g-5",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Reference Slip Issue Date"}),e.jsx("input",{type:"date",required:d,className:"form-control",name:"ref_slip_issue_date",value:s.ref_slip_issue_date,onChange:o})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Reference Slip Expiry Date"}),e.jsx("input",{type:"date",required:d,className:"form-control",name:"ref_slip_expiry_date",value:s.ref_slip_expiry_date,onChange:o})]})})]})]}):e.jsxs("div",{className:"card-body",id:"auto_import",children:[!_&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Candidate Name"}),e.jsx("input",{type:"text",className:"form-control",name:"candidate_name",value:s.candidate_name,onChange:o})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Passport Number"}),e.jsx("input",{type:"text",disabled:!0,className:"form-control",name:"passport_no",value:s.passport_no,onChange:o})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"PP Expiry Date"}),e.jsx("input",{type:"date",disabled:!0,className:"form-control",name:"passport_expiry_date",value:s.passport_expiry_date,onChange:o})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"DOB"}),e.jsx("input",{type:"date",disabled:!0,className:"form-control",name:"dob",value:s.dob,onChange:o})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Gender"}),e.jsxs("select",{className:"form-control",disabled:!0,name:"gender",value:s.gender,onChange:o,children:[e.jsx("option",{value:"",children:"Select Gender"}),e.jsx("option",{value:"Male",children:"Male"}),e.jsx("option",{value:"Female",children:"Female"})]})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Nationality"}),e.jsx("input",{type:"text",className:"form-control",disabled:!0,name:"nationality",value:s.nationality,onChange:o})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"CNIC"}),e.jsx("input",{type:"text",className:"form-control",disabled:!0,name:"cnic",value:s.cnic,onChange:o})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Place of Issue"}),e.jsx(b,{options:i.places,value:s.place_of_issue,name:"place_of_issue",onChange:a=>g("place_of_issue",a)})]})})]})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"PP Issue Date"}),e.jsx("input",{type:"date",required:d==!1,className:"form-control",name:"passport_issue_date",onChange:o})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Reference Slip Issue Date"}),e.jsx("input",{type:"date",required:d==!1,className:"form-control",name:"ref_slip_issue_date",value:s.ref_slip_issue_date,onChange:o})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Reference Slip Expiry Date"}),e.jsx("input",{type:"date",required:d==!1,className:"form-control",name:"ref_slip_expiry_date",value:s.ref_slip_expiry_date,onChange:o})]})})]})]}),!_&&e.jsx("div",{className:"card-body",children:e.jsx("div",{className:"row g-5 mb-3",children:e.jsx("img",{src:s.passport_image!=null||s.passport_image!=""?s.passport_image:"#"})})})]})})})})]}),m&&e.jsx("div",{className:"row row-cards",children:e.jsx("div",{className:"col-md-6",children:e.jsx("div",{className:"row row-cards",children:e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-header",children:e.jsxs("div",{className:"col-md-12 flex align-items-center",children:[e.jsx("div",{className:"col-md-6",style:{float:"left"},children:e.jsx("h3",{children:"Previous Registration"})}),e.jsx("div",{className:"col-md-6",style:{float:"right"},children:e.jsx("h3",{style:{textAlign:"right"},children:((U=m==null?void 0:m.reg_date)==null?void 0:U.replaceAll("-",""))+((W=m==null?void 0:m.serial_no)==null?void 0:W.replaceAll("/",""))})})]})}),e.jsx("div",{className:"card-body",children:e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Registration Date"}),e.jsx("input",{type:"date",required:!0,className:"form-control",name:"reg_date",value:m==null?void 0:m.reg_date,disabled:!0})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Serial Number"}),e.jsx("input",{type:"text",required:!0,className:"form-control",name:"serial_no",value:m==null?void 0:m.serial_no,disabled:!0})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Status"}),e.jsx("input",{type:"text",required:!0,className:"form-control",name:"serial_no",value:m==null?void 0:m.status,disabled:!0})]})})]})})]})})})})}),e.jsxs("div",{className:"row row-cards",children:[e.jsx("div",{className:"col-md-6",children:e.jsx("div",{className:"row row-cards",children:e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-header",children:e.jsxs("div",{className:"col-md-12 flex align-items-center",children:[e.jsx("div",{className:"col-md-6",style:{float:"left"},children:e.jsx("h3",{children:"General Information"})}),e.jsx("div",{className:"col-md-6",style:{float:"right"},children:e.jsx("h3",{style:{textAlign:"right"},children:((Q=s.reg_date)==null?void 0:Q.replaceAll("-",""))+((Y=s.serial_no)==null?void 0:Y.replaceAll("/",""))})})]})}),e.jsxs("div",{className:"card-body",children:[e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Registration Date"}),e.jsx("input",{type:"date",required:!0,className:"form-control",name:"reg_date",value:s.reg_date,onChange:o})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Serial Number"}),e.jsx("input",{type:"text",required:!0,className:"form-control",name:"serial_no",value:s.serial_no,onChange:o})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Agency"}),e.jsx(b,{options:i.agencies,value:s.agency,name:"agencies",onChange:a=>g("agency",a)})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Country"}),e.jsx(b,{options:i.countries,value:s.country,name:"country",onChange:a=>g("country",a)})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Profession"}),e.jsx(b,{options:i.professions,value:s.profession,name:"profession",onChange:a=>g("profession",a)})]})}),e.jsx("div",{className:"col-3",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Fees"}),e.jsx("input",{className:"form-control",name:"fees",type:"text",value:s.fees,onChange:o})]})}),e.jsx("div",{className:"col-3",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Discount"}),e.jsx("input",{className:"form-control",name:"discount",type:"text",value:s.discount,onChange:o})]})})]})]})]})})})}),e.jsx("div",{className:"col-md-6",children:e.jsx("div",{className:"row row-cards",children:e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-header",children:e.jsx("div",{className:"col-md-12 flex align-items-center",children:e.jsx("div",{className:"col-md-6",style:{float:"left"},children:e.jsx("h3",{children:"Candidate Information"})})})}),e.jsxs("div",{className:"card-body",children:[e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Relation"}),e.jsxs("select",{className:"form-select",name:"relation_type",value:s.relation_type,onChange:o,children:[e.jsx("option",{value:"",children:"Select Relation"}),e.jsx("option",{value:"S/O",children:"S/O"}),e.jsx("option",{value:"W/O",children:"W/O"}),e.jsx("option",{value:"D/O",children:"D/O"})]})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"S/O or W/O or D/O"}),e.jsx("input",{type:"text",className:"form-control",name:"relative_name",value:s.relative_name,onChange:o})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Phone 1"}),e.jsx("input",{type:"text",required:!0,className:"form-control",name:"phone_1",value:s.phone_1,onChange:o})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Phone 2"}),e.jsx("input",{type:"text",className:"form-control",name:"phone_2",value:s.phone_2,onChange:o})]})})]}),e.jsxs("div",{className:"row g-5",children:[e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:s.gender=="Male"?"row g-3 align-items-center d-none":"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Pregnancy Check"}),e.jsxs("select",{className:"form-select",disabled:s.gender=="Male",name:"pregnancy_test",value:s.pregnancy_test,onChange:o,children:[e.jsx("option",{value:"1",children:"Pregnant"}),e.jsx("option",{value:"0",children:"Not Pregnant"})]})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Marital Status"}),e.jsxs("select",{className:"form-select",name:"marital_status",value:s.marital_status,onChange:o,children:[e.jsx("option",{value:"",children:"Select Marital Status"}),e.jsx("option",{value:"Single",children:"Single"}),e.jsx("option",{value:"Married",children:"Married"}),e.jsx("option",{value:"Divorced",children:"Divorced"}),e.jsx("option",{value:"Widowed",children:"Widowed"})]})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Remarks"}),e.jsx("textarea",{className:"form-control",name:"remarks",value:s.remarks,onChange:o})]})})]})]}),e.jsx("div",{className:"card-body",children:e.jsxs("div",{className:"row g-5",children:[e.jsx("div",{className:"col-3",children:e.jsx("button",{className:"btn btn-outline-success",disabled:x=="None",onClick:Pe,children:"Submit Form"})}),((V=(K=(z=($=(X=i==null?void 0:i.auth)==null?void 0:X.modules)==null?void 0:$[0])==null?void 0:z.rights)==null?void 0:K[0])==null?void 0:V.permission_name)=="edit"&&((le=(ae=(se=(ee=(Z=i==null?void 0:i.auth)==null?void 0:Z.modules)==null?void 0:ee[0])==null?void 0:se.rights)==null?void 0:ae[0])==null?void 0:le.status)==!0?e.jsx("div",{className:"col-3",children:e.jsx("a",{className:"btn btn-outline-info",type:"button",href:route("registration-desk.show","edit"),children:"Edit Registration"})}):e.jsx(e.Fragment,{}),e.jsx("div",{className:"col-3",children:e.jsx("button",{className:"btn btn-outline-purple","data-bs-toggle":"modal","data-bs-target":"#reg-report",disabled:S==null,onClick:je,children:"Print Report"})})]})})]})})})})]})]})}),e.jsx("div",{className:"modal modal-blur fade",id:"reg-report",tabindex:"-1",role:"dialog","aria-hidden":"true",children:e.jsx("div",{className:"modal-dialog modal-lg modal-dialog-centered",role:"document",children:e.jsxs("div",{className:"modal-content",children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h5",{className:"modal-title",children:"Registration Slip"}),e.jsx("button",{type:"button",className:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})]}),e.jsx("div",{className:"modal-body",children:e.jsx("iframe",{src:ie,style:{height:"300px",width:"100%"}})}),e.jsx("div",{className:"modal-footer",children:e.jsx("a",{href:"#",className:"btn btn-link link-secondary","data-bs-dismiss":"modal",children:"Close"})})]})})})]})}export{ze as default};
