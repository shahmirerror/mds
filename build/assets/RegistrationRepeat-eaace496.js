import{r as o,W as X,j as e,a as $}from"./app-da2e9840.js";import{A as z}from"./AuthenticatedLayout-39efe80c.js";import"./TextInput-c8b6aa8e.js";import{Q as K,B as i}from"./ReactToastify-4193d200.js";import{S as y}from"./react-select.esm-37c6407f.js";function de(d){const[p,S]=o.useState(d.token_no),[V,P]=o.useState(null);o.useState(null);const[j,b]=o.useState(!1);o.useState(null);const[Y,O]=o.useState(!1),[B,Z]=o.useState(""),[N,w]=o.useState(null),[ee,T]=o.useState(null);o.useState(!1);const[s,x]=o.useState(null),[R,F]=o.useState(null),[C,E]=o.useState(null),{data:m,setData:v,post:se,processing:ae,errors:te,reset:le}=X({passport_no:"",passport_issue_date:"",passport_expiry_date:"",candidate_name:"",candidate_image:null,passport_image:null,agency:"",country:"",profession:"",cnic:"",gender:"",finger_type:"",dob:"",place_of_issue:"",reg_date:"",ref_slip_issue_date:"",ref_slip_expiry_date:"",barcode:"",serial_no:"",relation_type:"",relative_name:"",phone_1:"",phone_2:"",nationality:"",marital_status:"",biometric_fingerprint:"",fees:"",discount:"",remarks:"",pregnancy_test:0,repeat:!1,token_no:p}),I=[{value:"L-Thumb",label:"L-Thumb"},{value:"L-Index Finger",label:"L-Index Finger"},{value:"L-Middle Finger",label:"L-Middle Finger"},{value:"L-Ring Finger",label:"L-Ring Finger"},{value:"L-Pinky Finger",label:"L-Pinky Finger"},{value:"R-Thumb",label:"R-Thumb"},{value:"R-Index Finger",label:"R-Index Finger"},{value:"R-Middle Finger",label:"R-Middle Finger"},{value:"R-Ring Finger",label:"R-Ring Finger"},{value:"R-Pinky Finger",label:"R-Pinky Finger"}];function L(a,l=5e3){return new Promise((r,t)=>{const n=setTimeout(()=>t("Element not found"),l),g=new MutationObserver(u=>{for(const h of u){const k=h.target;if(k.matches(a)){clearTimeout(n),g.disconnect(),r(k);return}}});g.observe(document.body,{childList:!0,subtree:!0}),document.querySelector(a)&&(clearTimeout(n),g.disconnect(),r(document.querySelector(a)))})}const D=a=>{if(j){b(!1);let l=document.getElementById("video"),r=document.getElementById("photo-placeholder");a.target.innerHTML="Turn Camera On",a.target.classList.value="btn btn-success btn-md",N.getTracks().forEach(t=>t.stop()),r.style.display="block",l.style.display="none"}else b(!0),a.target.innerHTML="Turn Camera Off",a.target.classList.value="btn btn-danger btn-md",L("#video").then(async l=>{let r=document.getElementById("video"),t=document.getElementById("photo-placeholder");const n=await navigator.mediaDevices.getUserMedia({video:!0});w(n),t.style.display="none",r.style.display="block",r.srcObject=n}).catch(l=>{i.error("Something went wrong! Can't access your camera :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})})},_=a=>{let l=document.getElementById("video"),r=document.getElementById("taken_photo");if(a.target.value=="take"){const t=document.createElement("canvas");t.width=l.videoWidth,t.height=l.videoHeight,t.getContext("2d").drawImage(l,0,0),r.src=t.toDataURL("image/png"),l.style.display="none",r.style.display="block";const g=new Blob([t.toDataURL("image/png").replace("data:image/png;base64,","")],{type:"image/png"}),u="webcam_photo_"+Date.now()+".png",h=new File([g],u,{type:"image/png"});v("candidate_image",h)}else a.target.value=="retake"&&(v("candidate_image",null),l.style.display="block",r.style.display="none")},H=()=>{const a={centre_id:d.auth.user.centre.centre_id,process_id:1},l=JSON.stringify(a);try{const r=fetch(route("token.assign"),{method:"POST",body:l}).then(t=>t.json()).then(t=>{S(t.new_token),i.success("New Token has been set!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})},t=>{i.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})})}catch{i.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}},M=()=>{m.barcode!=""&&m.barcode!=null&&P(m.barcode);const a={centre_id:d.auth.user.centre.centre_id},l=JSON.stringify(a);try{const r=fetch(route("barcode.new"),{method:"POST",body:l}).then(t=>t.json()).then(t=>{v("barcode",t.new_barcode)},t=>{console.log(t)})}catch(r){console.log(r)}},q=()=>{H(),M(),N!==null&&N.getTracks().forEach(n=>n.stop()),document.getElementById("fingerPrint").src="./../assets/static/photos/ThumbPrint.png";let a=document.getElementById("video"),l=document.getElementById("photo-placeholder"),r=document.getElementById("taken_photo");l.style.display="block",a.style.display="none",r.style.display="none";let t=document.getElementById("cameraToggle");t.innerHTML="Turn Camera On",t.classList.value="btn btn-success btn-md",b(!1),O(!1),w(!1),T(null)};function J(a,l){var r="https://localhost:8443/SGIFPCapture",t=new XMLHttpRequest;t.onreadystatechange=function(){t.readyState==4&&t.status==200?a(JSON.parse(t.responseText)):t.status==404&&l(t.status)},t.onerror=function(){l(t.status)};var n="Timeout=10000";n+="&Quality=50",n+="&licstr="+encodeURIComponent(B),n+="&templateFormat=ISO",t.open("POST",r,!0),t.send(n)}function W(a){a.ErrorCode==0?(a!=null&&a.BMPBase64.length>0&&(document.getElementById("fingerPrint").src="data:image/bmp;base64,"+a.BMPBase64),v("biometric_fingerprint",a.TemplateBase64)):i.error("Fingerprint Capture Error Code:  "+a.ErrorCode,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}function G(a){i.warning("Check if Fingerprint Scanner is running!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}const U=a=>{a.preventDefault(),J(W,G)},A=a=>{x(null);const l={centre_id:d.auth.user.centre.centre_id,passport_no:C},r=JSON.stringify(l);if(C==null)i.warning("Please input Passport Number to proceed!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"});else try{const t=fetch(route("lab.fetch_registration_repeat"),{method:"POST",body:r}).then(n=>n.json()).then(n=>{n.registration.length==0?i.warning("No Registration Found!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}):(F(!0),x(n.registration),i.success("Candidate Found!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}))},n=>{i.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})})}catch{i.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}},Q=a=>{var t,n,g;const l={data:s,candidate_image:m.candidate_image,centre_id:(g=(n=(t=d==null?void 0:d.auth)==null?void 0:t.user)==null?void 0:n.centre)==null?void 0:g.centre_id,fingerprint:m.biometric_fingerprint},r=JSON.stringify(l);try{const u=fetch(route("lab.repeat_case_registration"),{method:"POST",body:r}).then(h=>h.json()).then(h=>{i.success("Candidate has been Registered!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}),q()},h=>{i.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})})}catch(u){i.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}),console.log(u)}},c=a=>{const{name:l,value:r}=a.target;x(t=>({...t,[l]:r}))},f=(a,l)=>{const r=a,t=l;x(n=>({...n,[r]:t}))};return o.useEffect(()=>{},[]),e.jsxs(z,{user:d.auth.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Registration Desk - Repeat Case"}),children:[e.jsx($,{title:"Registration Desk - Repeat Case"}),e.jsx(K,{position:"top-right",autoClose:5e3,hideProgressBar:!1,newestOnTop:!1,closeOnClick:!0,rtl:!1,pauseOnFocusLoss:!0,draggable:!0,pauseOnHover:!0,theme:"light"}),e.jsx("div",{className:"page-header d-print-none",children:e.jsx("div",{className:"container-xl",children:e.jsx("div",{className:"row g-2 align-items-center",children:e.jsxs("div",{className:"col align-items-center",children:[e.jsxs("div",{className:"col-md-4",style:{float:"left"},children:[e.jsx("h2",{className:"page-title",style:{float:"left"},children:"Registration Desk - Repeat Case"}),e.jsx("a",{className:"btn btn-danger btn-sm",type:"button",href:route("registration-desk.index"),style:{float:"right"},children:"Go Back"})]}),e.jsx("div",{className:"col-md-3 align-items-center",style:{float:"right"},children:e.jsx("h2",{className:"page-title",children:e.jsxs("span",{className:"badge",children:["Current Token: ",p!="None"?"M"+p:"None"]})})})]})})})}),e.jsx("div",{className:"page-body",children:e.jsxs("div",{className:"container-xl",children:[e.jsxs("div",{className:"row row-cards mb-5",children:[e.jsx("div",{className:"col-md-6",children:e.jsx("div",{className:"row row-cards",children:e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-header",children:e.jsx("div",{className:"col-md-12 flex align-items-center",children:e.jsx("div",{className:"col-md-4",style:{float:"left"},children:e.jsxs("span",{style:{float:"left"},className:"badge bg-secondary text-white",children:["Barcode Number: ",m.barcode]})})})}),e.jsx("div",{className:"card-body",children:e.jsxs("div",{className:"row g-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("img",{id:"fingerPrint",src:"./../../assets/static/photos/ThumbPrint.png",style:{width:500}}),e.jsx("div",{className:"col-md-12 text-center",children:e.jsx("button",{className:"btn btn-purple btn-md w-50",onClick:U,children:"Scan fingerprint"})}),e.jsx("div",{className:"col-md-12 text-center",children:e.jsxs("select",{className:"form-select",name:"finger_type",value:s==null?void 0:s.finger_type,onChange:c,children:[e.jsx("option",{children:"--"}),I.map((a,l)=>e.jsx("option",{value:a.value,children:a.label}))]})})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("video",{id:"video",autoPlay:!0,muted:!0,style:{height:"280px",display:"none"}}),e.jsx("img",{src:null,id:"taken_photo",style:{width:300,display:"none",marginTop:"55px"},className:"mb-5"}),e.jsx("img",{src:"./../../assets/static/photos/Photo.png",className:"mb-4",id:"photo-placeholder",style:{width:274}}),e.jsx("div",{className:"col-md-6",children:j&&m.candidate_image==null?e.jsx("button",{className:"btn btn-warning btn-md",value:"take",onClick:_,children:"Take Photo"}):j&&m.candidate_image!=null?e.jsx("button",{className:"btn btn-warning btn-md",value:"retake",onClick:_,children:"Re-Take Photo"}):e.jsx(e.Fragment,{})}),e.jsx("div",{className:"col-md-6",children:e.jsx("button",{className:"btn btn-success btn-md",id:"cameraToggle",disabled:(s==null?void 0:s.candidate_image)!=null,onClick:D,children:"Turn Camera On"})})]})})]})})]})})})}),e.jsx("div",{className:"col-md-6",children:e.jsx("div",{className:"row row-cards",children:e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-header",children:e.jsx("div",{className:"col-md-12 flex align-items-center",children:e.jsx("div",{className:"col-md-6",style:{float:"left"},children:e.jsx("h3",{children:"Passport Information"})})})}),e.jsx("div",{className:"card-body",id:"auto_import",children:e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Enter Passport Number"}),e.jsx("input",{type:"text",className:"form-control",name:"passport_issue_date",onChange:a=>E(a.target.value)})]})}),e.jsx("div",{className:"col-6",children:e.jsx("div",{className:"row g-3 align-items-center",children:e.jsx("button",{className:"btn btn-md btn-outline-info",disabled:!!R,onClick:A,children:"Search for Candidate"})})})]})})]})})})})]}),e.jsxs("div",{className:"row row-cards",children:[e.jsx("div",{className:"col-md-6",children:e.jsx("div",{className:"row row-cards",children:e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-header",children:e.jsx("div",{className:"col-md-12 flex align-items-center",children:e.jsx("div",{className:"col-md-6",style:{float:"left"},children:e.jsx("h3",{children:"General Information"})})})}),e.jsxs("div",{className:"card-body",children:[e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Registration Date"}),e.jsx("input",{type:"date",className:"form-control",name:"reg_date",value:s==null?void 0:s.reg_date,onChange:c})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Serial Number"}),e.jsx("input",{type:"text",className:"form-control",name:"serial_no",value:s==null?void 0:s.serial_no,onChange:c})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Agency"}),e.jsx(y,{options:d.agencies,value:s==null?void 0:s.agency,name:"agencies",onChange:a=>f("agency",a)})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Country"}),e.jsx(y,{options:d.countries,value:s==null?void 0:s.country,name:"country",onChange:a=>f("country",a)})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Profession"}),e.jsx(y,{options:d.professions,value:s==null?void 0:s.profession,name:"profession",onChange:a=>f("profession",a)})]})}),e.jsx("div",{className:"col-3",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Fees"}),e.jsx("input",{className:"form-control",name:"fees",type:"text",value:s==null?void 0:s.fee_charged,onChange:c})]})}),e.jsx("div",{className:"col-3",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Discount"}),e.jsx("input",{className:"form-control",name:"discount",type:"text",value:s==null?void 0:s.discount,onChange:c})]})})]})]})]})})})}),e.jsx("div",{className:"col-md-6",children:e.jsx("div",{className:"row row-cards",children:e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-header",children:e.jsx("div",{className:"col-md-12 flex align-items-center",children:e.jsx("div",{className:"col-md-6",style:{float:"left"},children:e.jsx("h3",{children:"Candidate Information"})})})}),e.jsxs("div",{className:"card-body",children:[e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Relation"}),e.jsxs("select",{className:"form-select",name:"relation_type",value:s==null?void 0:s.relation_type,onChange:c,children:[e.jsx("option",{value:"",children:"Select Relation"}),e.jsx("option",{value:"S/O",children:"S/O"}),e.jsx("option",{value:"W/O",children:"W/O"}),e.jsx("option",{value:"D/O",children:"D/O"})]})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Relative Name"}),e.jsx("input",{type:"text",className:"form-control",name:"relative_name",value:s==null?void 0:s.relative_name,onChange:c})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Phone 1"}),e.jsx("input",{type:"text",className:"form-control",name:"phone_1",value:s==null?void 0:s.phone_1,onChange:c})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Phone 2"}),e.jsx("input",{type:"text",className:"form-control",name:"phone_2",value:s==null?void 0:s.phone_2,onChange:c})]})})]}),e.jsxs("div",{className:"row g-5",children:[e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Pregnancy Check"}),e.jsxs("select",{className:"form-select",disabled:(s==null?void 0:s.gender)=="Male",name:"pregnancy_test",value:s==null?void 0:s.pregnancy_test,onChange:c,children:[e.jsx("option",{value:"1",children:"Pregnant"}),e.jsx("option",{value:"0",children:"Not Pregnant"})]})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Marital Status"}),e.jsxs("select",{className:"form-select",name:"marital_status",value:s==null?void 0:s.marital_status,onChange:c,children:[e.jsx("option",{value:"",children:"Select Marital Status"}),e.jsx("option",{value:"Single",children:"Single"}),e.jsx("option",{value:"Married",children:"Married"}),e.jsx("option",{value:"Divorced",children:"Divorced"}),e.jsx("option",{value:"Widowed",children:"Widowed"})]})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Remarks"}),e.jsx("textarea",{className:"form-control",name:"remarks",value:s==null?void 0:s.remarks,onChange:c})]})})]})]}),e.jsx("div",{className:"card-body",children:e.jsx("div",{className:"row g-5",children:e.jsx("div",{className:"col-3",children:e.jsx("button",{className:"btn btn-outline-success",disabled:p=="None"&&s==null||p!="None"&&s==null,onClick:Q,children:"Submit Form"})})})})]})})})})]})]})})]})}export{de as default};
