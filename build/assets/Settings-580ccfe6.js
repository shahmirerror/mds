import{r,W as T,j as e,a as E}from"./app-abf259ba.js";import{A as I}from"./AuthenticatedLayout-72ed3d24.js";import{Q as q,B as t}from"./ReactToastify-27ea926f.js";import{I as J}from"./IconUserPlus-cc57f712.js";import{I as A}from"./IconPencil-2e4bc410.js";import{I as F}from"./IconPower-4c2c0451.js";import{I as L}from"./IconDownload-d50fbc4f.js";import"./createReactComponent-42993444.js";import"./index-2a8e9ad7.js";function se(j){const[d,P]=r.useState([]),[m,U]=r.useState([]),[k,O]=r.useState(0),[h,b]=r.useState(0),[u,v]=r.useState(""),[x,N]=r.useState(""),[p,y]=r.useState(""),{data:i,setData:B,post:M,processing:z,errors:G,reset:Q}=T({frequency:0,type:"Daily"}),n=s=>{B(s.target.name,s.target.value),console.log(s.target.name,s.target.value)},g=()=>{try{const s=fetch(route("super.settings.fetch_devices"),{method:"GET"}).then(a=>a.json()).then(a=>{P(a.devices)},a=>{console.log(a)})}catch{t.error("Something went wrong! Can not fetch devices",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}},w=s=>{s.preventDefault();const a=JSON.stringify(i);try{const o=fetch(route("super.settings.update_settings",1),{method:"POST",body:a}).then(l=>l.json()).then(l=>{t.success("Backup Settings have been updated!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})},l=>{t.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})})}catch{t.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}},f=(s,a)=>{document.getElementById("basic-information").style.display="none",document.getElementById("users").style.display="none",document.getElementById("modules").style.display="none",document.getElementById(a).style.display="block",a=="basic-information"?document.getElementById("form_footer").style.display="block":document.getElementById("form_footer").style.display="none"},D=s=>{s.preventDefault();const o=JSON.stringify({centre_id:h,name:p,brand:u,type:x});try{const l=fetch(route("super.settings.store_devices"),{method:"POST",body:o}).then(c=>c.json()).then(c=>{g(),t.success("New Device details have been saved!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})},c=>{t.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})})}catch{t.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}},S=s=>{O(s.id),y(s.name),v(s.brand),N(s.type),b(s.centre_id)},_=(s,a)=>{s.preventDefault();try{const o=fetch(route("super.settings.delete_devices",a),{method:"DELETE"}).then(l=>l.json()).then(l=>{g(),t.success("Device details have been removed!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})},l=>{t.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})})}catch{t.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}},H=(s,a)=>{s.preventDefault();const l=JSON.stringify({centre_id:h,name:p,brand:u,type:x});try{const c=fetch(route("super.settings.update_devices",a),{method:"PUT",body:l}).then(C=>C.json()).then(C=>{g(),t.success("Device details have been updated!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})},C=>{t.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})})}catch{t.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}};return r.useEffect(()=>{g()},[]),e.jsxs(I,{user:j.auth.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Organization Settings"}),children:[e.jsx(E,{title:"Organization Settings"}),e.jsx(q,{position:"top-right",autoClose:5e3,hideProgressBar:!1,newestOnTop:!1,closeOnClick:!0,rtl:!1,pauseOnFocusLoss:!0,draggable:!0,pauseOnHover:!0,theme:"light"}),e.jsx("div",{className:"page-header d-print-none",children:e.jsx("div",{className:"container-xl",children:e.jsx("div",{className:"row g-2 align-items-center",children:e.jsx("div",{className:"col",children:e.jsx("h2",{className:"page-title",children:"Organization Settings"})})})})}),e.jsx("div",{className:"page-body",children:e.jsx("div",{className:"container-xl",children:e.jsx("div",{className:"card",children:e.jsxs("div",{className:"row g-0",children:[e.jsx("div",{className:"col-12 col-md-2 border-end",children:e.jsx("div",{className:"card-body",children:e.jsxs("div",{className:"list-group list-group-transparent",children:[e.jsx("a",{href:"#",className:"list-group-item list-group-item-action d-flex align-items-center",onClick:s=>f(s,"basic-information"),children:"Backup Settings"}),e.jsx("a",{href:"#",className:"list-group-item list-group-item-action d-flex align-items-center",onClick:s=>f(s,"users"),children:"Centre Devices"}),e.jsx("a",{href:"#",className:"list-group-item list-group-item-action d-flex align-items-center",onClick:s=>f(s,"modules"),children:"Backup Logs"})]})})}),e.jsxs("div",{className:"col-12 col-md-10 d-flex flex-column",children:[e.jsxs("div",{className:"card-body",id:"basic-information",children:[e.jsx("h3",{className:"card-title",children:"Backup Settings"}),e.jsxs("div",{className:"row mt-3",children:[e.jsxs("div",{className:"col-md",children:[e.jsx("div",{className:"form-label",children:"Type"}),e.jsxs("div",{children:[e.jsxs("label",{className:"form-check form-check-inline",children:[i.type=="Hourly"?e.jsx("input",{className:"form-check-input",type:"radio",name:"type",id:"hourly_type",value:"Hourly",checked:!0,onChange:n}):e.jsx("input",{className:"form-check-input",type:"radio",name:"type",id:"hourly_type",value:"Hourly",onChange:n}),e.jsx("span",{className:"form-check-label",children:"Hourly"})]}),e.jsxs("label",{className:"form-check form-check-inline",children:[i.type=="Daily"?e.jsx("input",{className:"form-check-input",type:"radio",name:"type",id:"daily_type",value:"Daily",checked:!0,onChange:n}):e.jsx("input",{className:"form-check-input",type:"radio",name:"type",id:"daily_type",value:"Daily",onChange:n}),e.jsx("span",{className:"form-check-label",children:"Daily"})]}),e.jsxs("label",{className:"form-check form-check-inline",children:[i.type=="Monthly"?e.jsx("input",{className:"form-check-input",type:"radio",name:"type",id:"monthly_type",value:"Monthly",checked:!0,onChange:n}):e.jsx("input",{className:"form-check-input",type:"radio",name:"type",id:"monthly_type",value:"Monthly",onChange:n}),e.jsx("span",{className:"form-check-label",children:"Monthly"})]})]})]}),e.jsx("div",{className:"col-md",children:e.jsxs("div",{className:"col-md-3",children:[e.jsx("div",{className:"form-label",children:"Frequency"}),e.jsx("input",{type:"number",className:"form-control sm",name:"frequency",value:i.frequency,onChange:n})]})})]})]}),e.jsxs("div",{className:"card-body",id:"users",style:{display:"none"},children:[e.jsxs("div",{className:"row mb-3",children:[e.jsx("h3",{className:"card-title",style:{float:"left",width:"90%"},children:"Centre Devices"}),e.jsx("a",{href:"#",type:"button",className:"btn btn-sm btn-success","data-bs-toggle":"modal","data-bs-target":"#new-device",style:{float:"right",width:"10%"},children:e.jsx(J,{})}),e.jsx("div",{style:{clear:"both"}})]}),e.jsx("div",{className:"row m-3",children:e.jsx("div",{className:"table-responsive",children:e.jsxs("table",{className:"table card-table table-vcenter text-nowrap datatable",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"text-center",children:"Centre"}),e.jsx("th",{className:"text-center",children:"Name"}),e.jsx("th",{className:"text-center",children:"Brand"}),e.jsx("th",{className:"text-center",children:"Type"}),e.jsx("th",{className:"text-center",children:"Action(s)"})]})}),e.jsx("tbody",{children:(d==null?void 0:d.length)>0?d.map((s,a)=>e.jsxs("tr",{children:[e.jsx("td",{className:"text-center",children:e.jsx("a",{href:"#",className:"text-reset",tabindex:"-1",children:s.centre_name})}),e.jsx("td",{className:"text-center",children:s==null?void 0:s.name}),e.jsx("td",{className:"text-center",children:s==null?void 0:s.brand}),e.jsx("td",{className:"text-center",children:s==null?void 0:s.type}),e.jsx("td",{className:"text-center",children:e.jsxs("div",{className:"d-flex",children:[e.jsx("a",{className:"card-btn",href:"#",type:"button","data-bs-toggle":"modal","data-bs-target":"#edit-device",onClick:()=>S(s),children:e.jsx(A,{})}),e.jsx("a",{className:"card-btn text-danger",href:"#",type:"button","data-bs-toggle":"modal","data-bs-target":"#delete-device",onClick:()=>S(s),children:e.jsx(F,{})})]})})]})):e.jsx(e.Fragment,{})})]})})})]}),e.jsxs("div",{className:"card-body",id:"modules",style:{display:"none"},children:[e.jsx("h3",{className:"card-title",children:"Backup Logs"}),e.jsx("div",{className:"row m-3",children:e.jsx("div",{className:"table-responsive",children:e.jsxs("table",{className:"table card-table table-vcenter text-nowrap datatable",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"text-center",children:"Name"}),e.jsx("th",{className:"text-center",children:"Created Time"}),e.jsx("th",{className:"text-center",children:"Action(s)"})]})}),e.jsx("tbody",{children:(m==null?void 0:m.length)>0?m.map((s,a)=>e.jsxs("tr",{children:[e.jsx("td",{className:"text-center",children:e.jsx("a",{href:"#",className:"text-reset",tabindex:"-1",children:s.name})}),e.jsx("td",{className:"text-center",children:s==null?void 0:s.created_at}),e.jsx("td",{className:"text-center",children:e.jsx("div",{className:"d-flex",children:e.jsx("a",{className:"card-btn",href:"#",type:"button","data-bs-toggle":"modal","data-bs-target":"#edit-user",onClick:"",children:e.jsx(L,{})})})})]})):e.jsx(e.Fragment,{})})]})})})]}),e.jsx("div",{className:"card-footer bg-transparent mt-auto",id:"form_footer",children:e.jsx("div",{className:"btn-list justify-content-end",children:e.jsx("a",{href:"#",className:"btn btn-primary",type:"button",onClick:w,children:"Update Settings"})})})]})]})})})}),e.jsx("div",{className:"modal modal-blur fade",id:"new-device",tabindex:"-1",role:"dialog","aria-hidden":"true",children:e.jsx("div",{className:"modal-dialog modal-lg modal-dialog-centered",role:"document",children:e.jsxs("div",{className:"modal-content",children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h5",{className:"modal-title",children:"Create Centre Device"}),e.jsx("button",{type:"button",className:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})]}),e.jsxs("div",{className:"modal-body",children:[e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"form-label",children:"Centre"}),e.jsxs("select",{className:"form-select",value:h,name:"centre",onChange:s=>b(s.target.value),children:[e.jsx("option",{value:0,children:"Select Centre"}),j.centres.map((s,a)=>e.jsx("option",{value:s==null?void 0:s.id,children:s.name}))]})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"form-label",children:"Name"}),e.jsx("input",{type:"text",className:"form-control",placeholder:"Device Name",name:"name",value:p,onChange:s=>y(s.target.value)})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"form-label",children:"Brand"}),e.jsx("input",{type:"text",className:"form-control",placeholder:"Brand",name:"brand",value:u,onChange:s=>v(s.target.value)})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"form-label",children:"Type"}),e.jsxs("select",{className:"form-select",value:x,name:"type",onChange:s=>N(s.target.value),children:[e.jsx("option",{value:null,children:"--"}),e.jsx("option",{value:"Thumb Print Scanner",children:"Thumb Print Scanner"}),e.jsx("option",{value:"Barcode Scanner",children:"Barcode Scanner"}),e.jsx("option",{value:"Printer",children:"Printer"}),e.jsx("option",{value:"Passport Scanner",children:"Passport Scanner"})]})]})]}),e.jsxs("div",{className:"modal-footer",children:[e.jsx("a",{href:"#",className:"btn btn-link link-secondary","data-bs-dismiss":"modal",children:"Cancel"}),e.jsx("button",{className:"btn btn-primary ms-auto","data-bs-dismiss":"modal",type:"button",onClick:D,children:"Create Centre Device"})]})]})})}),e.jsx("div",{className:"modal modal-blur fade",id:"edit-device",tabindex:"-1",role:"dialog","aria-hidden":"true",children:e.jsx("div",{className:"modal-dialog modal-lg modal-dialog-centered",role:"document",children:e.jsxs("div",{className:"modal-content",children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h5",{className:"modal-title",children:"Edit Centre Device"}),e.jsx("button",{type:"button",className:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})]}),e.jsxs("div",{className:"modal-body",children:[e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"form-label",children:"Centre"}),e.jsxs("select",{className:"form-select",value:h,name:"centre",onChange:s=>b(s.target.value),children:[e.jsx("option",{value:0,children:"Select Centre"}),j.centres.map((s,a)=>e.jsx("option",{value:s==null?void 0:s.id,children:s.name}))]})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"form-label",children:"Name"}),e.jsx("input",{type:"text",className:"form-control",placeholder:"Device Name",name:"name",value:p,onChange:s=>y(s.target.value)})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"form-label",children:"Brand"}),e.jsx("input",{type:"text",className:"form-control",placeholder:"Brand Name",name:"brand",value:u,onChange:s=>v(s.target.value)})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"form-label",children:"Type"}),e.jsxs("select",{className:"form-select",value:x,name:"type",onChange:s=>N(s.target.value),children:[e.jsx("option",{value:null,children:"--"}),e.jsx("option",{value:"Thumb Print Scanner",children:"Thumb Print Scanner"}),e.jsx("option",{value:"Barcode Scanner",children:"Barcode Scanner"}),e.jsx("option",{value:"Printer",children:"Printer"}),e.jsx("option",{value:"Passport Scanner",children:"Passport Scanner"})]})]})]}),e.jsxs("div",{className:"modal-footer",children:[e.jsx("a",{href:"#",className:"btn btn-link link-secondary","data-bs-dismiss":"modal",children:"Cancel"}),e.jsx("button",{className:"btn btn-primary ms-auto","data-bs-dismiss":"modal",type:"button",onClick:s=>H(s,k),children:"Update Centre Device"})]})]})})}),e.jsx("div",{className:"modal modal-blur fade",id:"delete-device",tabindex:"-1",role:"dialog","aria-hidden":"true",children:e.jsx("div",{className:"modal-dialog modal-lg modal-dialog-centered",role:"document",children:e.jsxs("div",{className:"modal-content",children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h5",{className:"modal-title",children:"Delete Centre Device"}),e.jsx("button",{type:"button",className:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})]}),e.jsx("div",{className:"modal-body",children:e.jsx("span",{children:"Are you sure you want to delete this device?"})}),e.jsxs("div",{className:"modal-footer",children:[e.jsx("a",{href:"#",className:"btn btn-link link-secondary","data-bs-dismiss":"modal",children:"Cancel"}),e.jsx("button",{className:"btn btn-primary ms-auto","data-bs-dismiss":"modal",type:"button",onClick:s=>_(s,k),children:"Delete Centre Device"})]})]})})})]})}export{se as default};
