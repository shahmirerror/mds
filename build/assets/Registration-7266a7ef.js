import{r as m,W as $,j as e,a as z}from"./app-6131b1d3.js";import{A as K}from"./AuthenticatedLayout-aba6e2d5.js";import"./TextInput-eb2ee211.js";import{Q as V,B as o}from"./ReactToastify-684582b2.js";import{S as x}from"./react-select.esm-5e648ebf.js";import{c as Y}from"./createReactComponent-3efd9e7d.js";import"./index-b1db8659.js";var Z=Y("refresh","IconRefresh",[["path",{d:"M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4",key:"svg-0"}],["path",{d:"M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4",key:"svg-1"}]]);function ge(c){const[g,k]=m.useState(c.token_no),[N,P]=m.useState(null),[O,S]=m.useState(null),[v,j]=m.useState(!1);m.useState(null);const[b,_]=m.useState(!1),[R,ee]=m.useState(""),[f,y]=m.useState(null),[se,B]=m.useState(null),[ae,T]=m.useState(!1),{data:a,setData:d,post:te,processing:le,errors:ne,reset:F}=$({passport_no:"",passport_issue_date:null,passport_expiry_date:null,candidate_name:"",candidate_image:null,passport_image:null,agency:"",country:"",profession:"",cnic:"",gender:"",finger_type:"",dob:null,place_of_issue:"",reg_date:null,ref_slip_issue_date:null,ref_slip_expiry_date:null,barcode:"",serial_no:"",relation_type:"",relative_name:"",phone_1:"",phone_2:"",nationality:"",marital_status:"",biometric_fingerprint:"",fees:"",discount:"",remarks:"",pregnancy_test:0,repeat:!1,token_no:g}),I=[{value:"L-Thumb",label:"L-Thumb"},{value:"L-Index Finger",label:"L-Index Finger"},{value:"L-Middle Finger",label:"L-Middle Finger"},{value:"L-Ring Finger",label:"L-Ring Finger"},{value:"L-Pinky Finger",label:"L-Pinky Finger"},{value:"R-Thumb",label:"R-Thumb"},{value:"R-Index Finger",label:"R-Index Finger"},{value:"R-Middle Finger",label:"R-Middle Finger"},{value:"R-Ring Finger",label:"R-Ring Finger"},{value:"R-Pinky Finger",label:"R-Pinky Finger"}];function D(s,n=5e3){return new Promise((r,t)=>{const l=setTimeout(()=>t("Element not found"),n),h=new MutationObserver(p=>{for(const u of p){const C=u.target;if(C.matches(s)){clearTimeout(l),h.disconnect(),r(C);return}}});h.observe(document.body,{childList:!0,subtree:!0}),document.querySelector(s)&&(clearTimeout(l),h.disconnect(),r(document.querySelector(s)))})}const E=s=>{if(v){j(!1);let n=document.getElementById("video"),r=document.getElementById("photo-placeholder");s.target.innerHTML="Turn Camera On",s.target.classList.value="btn btn-success btn-md",f.getTracks().forEach(t=>t.stop()),r.style.display="block",n.style.display="none"}else j(!0),s.target.innerHTML="Turn Camera Off",s.target.classList.value="btn btn-danger btn-md",D("#video").then(async n=>{let r=document.getElementById("video"),t=document.getElementById("photo-placeholder");const l=await navigator.mediaDevices.getUserMedia({video:!0});y(l),t.style.display="none",r.style.display="block",r.srcObject=l}).catch(n=>{o.error("Something went wrong! Can't access your camera :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})})},w=s=>{let n=document.getElementById("video"),r=document.getElementById("taken_photo");if(s.target.value=="take"){const t=document.createElement("canvas");t.width=n.videoWidth,t.height=n.videoHeight,t.getContext("2d").drawImage(n,0,0),r.src=t.toDataURL("image/png"),n.style.display="none",r.style.display="block";const h=new Blob([t.toDataURL("image/png").replace("data:image/png;base64,","")],{type:"image/png"}),p="webcam_photo_"+Date.now()+".png",u=new File([h],p,{type:"image/png"});d("candidate_image",u)}else s.target.value=="retake"&&(d("candidate_image",null),n.style.display="block",r.style.display="none")},M=()=>{const s={centre_id:c.auth.user.centre.centre_id,process_id:1},n=JSON.stringify(s);try{const r=fetch(route("token.assign"),{method:"POST",body:n}).then(t=>t.json()).then(t=>{k(t.new_token),t.new_token=="None"?o.warning("No Tokens found in Queue!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}):o.success("New Token has been set!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})},t=>{o.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})})}catch{o.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}},H=()=>{a.barcode!=""&&a.barcode!=null&&P(a.barcode);const s={centre_id:c.auth.user.centre.centre_id},n=JSON.stringify(s);try{const r=fetch(route("barcode.new"),{method:"POST",body:n}).then(t=>t.json()).then(t=>{d("barcode",t.new_barcode)},t=>{console.log(t)})}catch(r){console.log(r)}},L=()=>{const s={centre_id:c.auth.user.centre.centre_id,barcode_no:N},n=JSON.stringify(s);try{const r=fetch(route("lab.export_reg_report"),{method:"POST",body:n}).then(t=>t.json()).then(t=>{o.success("Report has been generated!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}),S(t.filename),T(!0)},t=>{o.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})})}catch{o.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}},q=()=>{M(),H(),f!==null&&f.getTracks().forEach(l=>l.stop()),document.getElementById("fingerPrint").src="./../assets/static/photos/ThumbPrint.png";let s=document.getElementById("video"),n=document.getElementById("photo-placeholder"),r=document.getElementById("taken_photo");n.style.display="block",s.style.display="none",r.style.display="none";let t=document.getElementById("cameraToggle");t.innerHTML="Turn Camera On",t.classList.value="btn btn-success btn-md",j(!1),_(!1),y(!1),B(null),F(),X()};function J(s,n){var r="https://localhost:8443/SGIFPCapture",t=new XMLHttpRequest;t.onreadystatechange=function(){t.readyState==4&&t.status==200?s(JSON.parse(t.responseText)):t.status==404&&n(t.status)},t.onerror=function(){n(t.status)};var l="Timeout=10000";l+="&Quality=50",l+="&licstr="+encodeURIComponent(R),l+="&templateFormat=ISO",t.open("POST",r,!0),t.send(l)}function G(s){s.ErrorCode==0?(s!=null&&s.BMPBase64.length>0&&(document.getElementById("fingerPrint").src="data:image/bmp;base64,"+s.BMPBase64),d("biometric_fingerprint",s.TemplateBase64)):o.error("Fingerprint Capture Error Code:  "+s.ErrorCode,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}function W(s){o.warning("Check if Fingerprint Scanner is running!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}const U=s=>{s.preventDefault(),J(G,W)},A=async s=>{const n={centre_id:c.auth.user.centre.centre_id,counter_id:1},r=JSON.stringify(n);try{const t=await o.promise(fetch(route("ppscan.new"),{method:"POST",body:r}),{pending:"Importing Passport"}).then(l=>l.json()).then(l=>{l.pp_info.length==0?o.warning("No Passport Found!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}):(a.passport_image=l.filename,a.passport_no=l.pp_info.pp_no,a.nationality=l.pp_info.nationality,a.candidate_name=l.pp_info.first_name+" "+l.pp_info.last_name,a.cnic=l.pp_info.cnic,a.place_of_issue=l.pp_info.pp_issue_state,a.passport_expiry_date=l.pp_info.pp_expiry_date,d("gender",l.pp_info.gender),o.success("Passport Found!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}),console.log(a))},l=>{o.dismiss(),o.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})})}catch{o.dismiss(),o.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}},i=s=>{s.target.name=="gender"?(d("pregnancy_test",0),d("gender",s.target.value)):d(s.target.name,s.target.value)},Q=async s=>{var t,l,h;const n={data:a,passport_image:a.passport_image,candidate_image:a.candidate_image,centre_id:(h=(l=(t=c==null?void 0:c.auth)==null?void 0:t.user)==null?void 0:l.centre)==null?void 0:h.centre_id},r=JSON.stringify(n);try{const p=await o.promise(fetch(route("lab.store_registration"),{method:"POST",body:r}),{pending:"Submitting Form"}).then(u=>u.json()).then(u=>{o.success("Candidate has been Registered!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}),location.reload()},u=>{o.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})})}catch{o.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}},X=()=>{d({passport_no:"",passport_issue_date:"",passport_expiry_date:"",candidate_name:"",candidate_image:null,passport_image:null,agency:"",country:"",profession:"",cnic:"",gender:"",finger_type:"",dob:"",place_of_issue:"",reg_date:"",ref_slip_issue_date:"",ref_slip_expiry_date:"",barcode:c==null?void 0:c.barcode_no,serial_no:"",relation_type:"",relative_name:"",phone_1:"",phone_2:"",nationality:"",marital_status:"",biometric_fingerprint:"",fees:"",discount:"",remarks:"",pregnancy_test:0,repeat:!1,token_no:g})};return m.useEffect(()=>{},[]),e.jsxs(K,{user:c.auth.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Registration Desk"}),children:[e.jsx(z,{title:"Registration Desk"}),e.jsx(V,{position:"top-right",autoClose:5e3,hideProgressBar:!1,newestOnTop:!1,closeOnClick:!0,rtl:!1,pauseOnFocusLoss:!0,draggable:!0,pauseOnHover:!0,theme:"light"}),e.jsx("div",{className:"page-header d-print-none",children:e.jsx("div",{className:"container-xl",children:e.jsx("div",{className:"row g-2 align-items-center",children:e.jsxs("div",{className:"col align-items-center",children:[e.jsx("div",{className:"col-md-3",style:{float:"left"},children:e.jsx("h2",{className:"page-title",style:{float:"left"},children:"Registration Desk"})}),e.jsx("div",{className:"col-md-3 align-items-center",style:{float:"right"},children:e.jsxs("h2",{className:"page-title",children:[e.jsx("button",{className:"btn btn-secondary btn-sm mr-5 btn-pill",onClick:q,children:e.jsx(Z,{})}),e.jsxs("span",{className:"badge",children:["Current Token: ",g!="None"?"M"+g:"None"]})]})})]})})})}),e.jsx("div",{className:"page-body",children:e.jsxs("div",{className:"container-xl",children:[e.jsxs("div",{className:"row row-cards mb-5",children:[e.jsx("div",{className:"col-md-6",children:e.jsx("div",{className:"row row-cards",children:e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-header",children:e.jsx("div",{className:"col-md-12 flex align-items-center",children:e.jsx("div",{className:"col-md-4",style:{float:"left"},children:e.jsxs("span",{style:{float:"left"},className:"badge bg-secondary text-white",children:["Barcode Number: ",a.barcode]})})})}),e.jsx("div",{className:"card-body",children:e.jsxs("div",{className:"row g-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("img",{id:"fingerPrint",src:"./../assets/static/photos/ThumbPrint.png",style:{width:500}}),e.jsx("div",{className:"col-md-12 text-center",children:e.jsx("button",{className:"btn btn-purple btn-md w-50",onClick:U,children:"Scan fingerprint"})}),e.jsx("div",{className:"col-md-12 text-center",children:e.jsxs("select",{className:"form-select",name:"finger_type",onChange:i,children:[e.jsx("option",{children:"--"}),I.map((s,n)=>e.jsx("option",{value:s.value,children:s.label}))]})})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("video",{id:"video",autoPlay:!0,muted:!0,style:{height:"280px",display:"none"}}),e.jsx("img",{src:null,id:"taken_photo",style:{width:300,display:"none",marginTop:"55px"},className:"mb-5"}),e.jsx("img",{src:"./../assets/static/photos/Photo.png",className:"mb-4",id:"photo-placeholder",style:{width:274}}),e.jsx("div",{className:"col-md-6",children:v&&a.candidate_image==null?e.jsx("button",{className:"btn btn-warning btn-md",value:"take",onClick:w,children:"Take Photo"}):v&&a.candidate_image!=null?e.jsx("button",{className:"btn btn-warning btn-md",value:"retake",onClick:w,children:"Re-Take Photo"}):e.jsx(e.Fragment,{})}),e.jsx("div",{className:"col-md-6",children:e.jsx("button",{className:"btn btn-success btn-md",id:"cameraToggle",disabled:a.candidate_image!=null,onClick:E,children:"Turn Camera On"})})]})})]})})]})})})}),e.jsx("div",{className:"col-md-6",children:e.jsx("div",{className:"row row-cards",children:e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-header",children:e.jsxs("div",{className:"col-md-12 flex align-items-center",children:[e.jsx("div",{className:"col-md-6",style:{float:"left",display:"flex",justifyContent:"space-between"},children:b?e.jsx("h3",{children:"Passport Information"}):e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"btn btn-sm btn-yellow",onClick:A,children:"Import Passport"}),e.jsx("a",{className:"btn btn-outline-danger btn-sm",type:"button",href:g!="None"?route("registration-desk.show","repeat-case?token_no="+g):"#",children:"Repeat Case"})]})}),e.jsx("div",{className:"col-md-6",style:{float:"right"},children:e.jsxs("label",{class:"form-check form-switch",style:{float:"right"},children:[e.jsx("input",{class:"form-check-input",type:"checkbox",checked:b,onChange:s=>_(s.target.checked)}),e.jsx("span",{class:"form-check-label",children:"Manual Entry"})]})})]})}),b?e.jsxs("div",{className:"card-body",id:"manual_import",children:[e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Candidate Name"}),e.jsx("input",{type:"text",className:"form-control",name:"candidate_name",value:a.candidate_name,onChange:i})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Passport Number"}),e.jsx("input",{type:"text",className:"form-control",name:"passport_no",value:a.passport_no,onChange:i})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"PP Issue Date"}),e.jsx("input",{type:"date",className:"form-control",name:"passport_issue_date",value:a.passport_issue_date,onChange:i})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"PP Expiry Date"}),e.jsx("input",{type:"date",className:"form-control",name:"passport_expiry_date",value:a.passport_expiry_date,onChange:i})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"DOB"}),e.jsx("input",{type:"date",className:"form-control",name:"dob",value:a.dob,onChange:i})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Gender"}),e.jsxs("select",{className:"form-control",name:"gender",value:a.gender,onChange:i,children:[e.jsx("option",{value:"",children:"Select Gender"}),e.jsx("option",{value:"Male",children:"Male"}),e.jsx("option",{value:"Female",children:"Female"})]})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Passport Image"}),e.jsx("input",{type:"file",className:"form-control",name:"passport_image",onChange:s=>d("passport_image",s.target.files[0])})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Nationality"}),e.jsx("input",{type:"text",className:"form-control",name:"nationality",value:a.nationality,onChange:i})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"CNIC"}),e.jsx("input",{type:"text",className:"form-control",name:"cnic",value:a.cnic,onChange:i})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Place of Issue"}),e.jsx(x,{options:c.places,value:a.place_of_issue,name:"place_of_issue",onChange:s=>d("place_of_issue",s)})]})})]}),e.jsxs("div",{className:"row g-5",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Reference Slip Issue Date"}),e.jsx("input",{type:"date",className:"form-control",name:"ref_slip_issue_date",value:a.ref_slip_issue_date,onChange:i})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Reference Slip Expiry Date"}),e.jsx("input",{type:"date",className:"form-control",name:"ref_slip_expiry_date",value:a.ref_slip_expiry_date,onChange:i})]})})]})]}):e.jsxs("div",{className:"card-body",id:"auto_import",children:[e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"PP Issue Date"}),e.jsx("input",{type:"date",className:"form-control",name:"passport_issue_date",onChange:i})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Reference Slip Issue Date"}),e.jsx("input",{type:"date",className:"form-control",name:"ref_slip_issue_date",value:a.ref_slip_issue_date,onChange:i})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Reference Slip Expiry Date"}),e.jsx("input",{type:"date",className:"form-control",name:"ref_slip_expiry_date",value:a.ref_slip_expiry_date,onChange:i})]})})]}),e.jsx("div",{className:"row g-5 mb-3",children:e.jsx("img",{src:a.passport_image!=null?a.passport_image:"#"})})]})]})})})})]}),e.jsxs("div",{className:"row row-cards",children:[e.jsx("div",{className:"col-md-6",children:e.jsx("div",{className:"row row-cards",children:e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-header",children:e.jsx("div",{className:"col-md-12 flex align-items-center",children:e.jsx("div",{className:"col-md-6",style:{float:"left"},children:e.jsx("h3",{children:"General Information"})})})}),e.jsxs("div",{className:"card-body",children:[e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Registration Date"}),e.jsx("input",{type:"date",className:"form-control",name:"reg_date",value:a.reg_date,onChange:i})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Serial Number"}),e.jsx("input",{type:"text",className:"form-control",name:"serial_no",value:a.serial_no,onChange:i})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Agency"}),e.jsx(x,{options:c.agencies,value:a.agency,name:"agencies",onChange:s=>d("agency",s)})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Country"}),e.jsx(x,{options:c.countries,value:a.country,name:"country",onChange:s=>d("country",s)})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Profession"}),e.jsx(x,{options:c.professions,value:a.profession,name:"profession",onChange:s=>d("profession",s)})]})}),e.jsx("div",{className:"col-3",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Fees"}),e.jsx("input",{className:"form-control",name:"fees",type:"text",value:a.fees,onChange:i})]})}),e.jsx("div",{className:"col-3",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Discount"}),e.jsx("input",{className:"form-control",name:"discount",type:"text",value:a.discount,onChange:i})]})})]})]})]})})})}),e.jsx("div",{className:"col-md-6",children:e.jsx("div",{className:"row row-cards",children:e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-header",children:e.jsx("div",{className:"col-md-12 flex align-items-center",children:e.jsx("div",{className:"col-md-6",style:{float:"left"},children:e.jsx("h3",{children:"Candidate Information"})})})}),e.jsxs("div",{className:"card-body",children:[e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Relation"}),e.jsxs("select",{className:"form-select",name:"relation_type",value:a.relation_type,onChange:i,children:[e.jsx("option",{value:"",children:"Select Relation"}),e.jsx("option",{value:"S/O",children:"S/O"}),e.jsx("option",{value:"W/O",children:"W/O"}),e.jsx("option",{value:"D/O",children:"D/O"})]})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Relative Name"}),e.jsx("input",{type:"text",className:"form-control",name:"relative_name",value:a.relative_name,onChange:i})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Phone 1"}),e.jsx("input",{type:"text",className:"form-control",name:"phone_1",value:a.phone_1,onChange:i})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Phone 2"}),e.jsx("input",{type:"text",className:"form-control",name:"phone_2",value:a.phone_2,onChange:i})]})})]}),e.jsxs("div",{className:"row g-5",children:[e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Pregnancy Check"}),e.jsxs("select",{className:"form-select",disabled:a.gender=="Male",name:"pregnancy_test",value:a.pregnancy_test,onChange:i,children:[e.jsx("option",{value:"1",children:"Pregnant"}),e.jsx("option",{value:"0",children:"Not Pregnant"})]})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Marital Status"}),e.jsxs("select",{className:"form-select",name:"marital_status",value:a.marital_status,onChange:i,children:[e.jsx("option",{value:"",children:"Select Marital Status"}),e.jsx("option",{value:"Single",children:"Single"}),e.jsx("option",{value:"Married",children:"Married"}),e.jsx("option",{value:"Divorced",children:"Divorced"}),e.jsx("option",{value:"Widowed",children:"Widowed"})]})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Remarks"}),e.jsx("textarea",{className:"form-control",name:"remarks",value:a.remarks,onChange:i})]})})]})]}),e.jsx("div",{className:"card-body",children:e.jsxs("div",{className:"row g-5",children:[e.jsx("div",{className:"col-3",children:e.jsx("button",{className:"btn btn-outline-success",disabled:g=="None",onClick:Q,children:"Submit Form"})}),e.jsx("div",{className:"col-3",children:e.jsx("a",{className:"btn btn-outline-info",type:"button",href:route("registration-desk.show","edit"),children:"Edit Registration"})}),e.jsx("div",{className:"col-3",children:e.jsx("button",{className:"btn btn-outline-purple","data-bs-toggle":"modal","data-bs-target":"#reg-report",disabled:N==null,onClick:L,children:"Print Report"})})]})})]})})})})]})]})}),e.jsx("div",{className:"modal modal-blur fade",id:"reg-report",tabindex:"-1",role:"dialog","aria-hidden":"true",children:e.jsx("div",{className:"modal-dialog modal-lg modal-dialog-centered",role:"document",children:e.jsxs("div",{className:"modal-content",children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h5",{className:"modal-title",children:"Registration Slip"}),e.jsx("button",{type:"button",className:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})]}),e.jsx("div",{className:"modal-body",children:e.jsx("iframe",{src:O,style:{height:"300px",width:"100%"}})}),e.jsx("div",{className:"modal-footer",children:e.jsx("a",{href:"#",className:"btn btn-link link-secondary","data-bs-dismiss":"modal",children:"Close"})})]})})})]})}export{ge as default};
