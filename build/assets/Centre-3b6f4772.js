import{r as d,W,j as e,a as K}from"./app-d96bfa13.js";import{A as X}from"./AuthenticatedLayout-36136bc7.js";import{Q as Y,B as r}from"./ReactToastify-a6fdf43a.js";import{I as Z}from"./IconUserPlus-57fcc09c.js";import{I as ee}from"./IconPencil-146cb6ce.js";import{I as se}from"./IconCategory-676f761a.js";import{I as U}from"./IconPower-6c460822.js";import"./createReactComponent-8450585a.js";import"./index-7b9fc52f.js";function xe(l){var M,H;const[E,D]=d.useState(l.users);d.useState(l.modules);const[j,P]=d.useState(null),[y,F]=d.useState(null),[O,f]=d.useState(0),[b,m]=d.useState(""),[g,h]=d.useState(""),[_,v]=d.useState(""),[w,u]=d.useState("Staff"),[N,B]=d.useState(""),{data:x,setData:A,put:$,processing:ae,errors:te,reset:le}=W({name:l.centre.name,phone:l.centre.phone,city:l.centre.city,country:l.centre.country,address:l.centre.address,logo:""}),p=s=>{A(s.target.name,s.target.value)},q=s=>{console.log(s.target.files[0]),A(s.target.name,s.target.files[0])},R=s=>{s.preventDefault(),$(route("centre-settings.update",l.centre.id))},C=(s,t)=>{document.getElementById("basic-information").style.display="none",document.getElementById("users").style.display="none",document.getElementById("modules").style.display="none",document.getElementById(t).style.display="block",t=="basic-information"?document.getElementById("form_footer").style.display="block":document.getElementById("form_footer").style.display="none"},k=()=>{try{const s=fetch(route("admin.centre.fetch_staff",{id:l.centre.id,userid:l.auth.user.id}),{method:"GET"}).then(t=>t.json()).then(t=>{D(t.users)},t=>{console.log(t)})}catch(s){console.error(s)}},T=s=>{s.preventDefault();const n=JSON.stringify({name:b,username:g,role:w,password:_});try{const o=fetch(route("admin.centre.add_staff",l.centre.id),{method:"POST",body:n}).then(a=>a.json()).then(a=>{m(""),v(""),u("Staff"),h(""),k(),r.success("New Staff Profile has been created!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})},a=>{console.log(a),r.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})})}catch(o){console.error(o),r.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}},J=s=>{f(s.id),m(s.name),h(s.username),u(s.role_id==2?"Admin":"Staff"),console.log(s,"edit")},L=s=>{s.preventDefault();const n=JSON.stringify({id:O,name:b,username:g,role:w,password:_});try{const o=fetch(route("admin.centre.edit_staff",l.centre.id),{method:"PUT",body:n}).then(a=>a.json()).then(a=>{f(0),m(""),v(""),u("Staff"),h(""),k(),r.success("Staff Profile has been updated!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})},a=>{console.log(a),r.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})})}catch(o){console.error(o),r.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}},I=(s,t)=>{f(s),B(t),console.log(s,t)},z=s=>{s.preventDefault();const n=JSON.stringify({id:O,status:N});try{const o=fetch(route("admin.centre.staff_status",l.centre.id),{method:"PUT",body:n}).then(a=>a.json()).then(a=>{f(0),B(""),k(),r.success("Staff Profile has been made inactive!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})},a=>{console.log(a),r.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})})}catch(o){console.error(o),r.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}},G=(s,t,n)=>{s.preventDefault();let o=s.target.checked?"On":"Off";try{const a=fetch(route("admin.centre.lab_modules",{module_id:t,centre_id:l.centre.id}),{method:"PUT"}).then(i=>i.json()).then(i=>{document.getElementById(`switchlabel${n}`).innerHTML=o,document.getElementById(`switch${n}`).checked=s.target.checked},i=>{console.log(i)})}catch(a){console.error(a)}},Q=(s,t,n)=>{P(null),F(t);try{const o=fetch(route("admin.centre.lab_module_permissions",{user_id:t,centre_id:l.centre.id}),{method:"GET"}).then(a=>a.json()).then(a=>{P(a.module_rights),r.info("Module Permissions have been loaded!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})},a=>{r.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})})}catch{r.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}},S=(s,t,n,o)=>{let a=s.target.checked?"On":"Off";try{const i=fetch(route("admin.centre.toggle_lab_module_permissions",{user_id:t,permission_id:n}),{method:"POST",body:JSON.stringify({permission_value:document.getElementById("perswitch"+n).value})}).then(c=>c.json()).then(c=>{s.target.checked=a!=="Off";let V="Permissions have been updated!";r.success(V,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})},c=>{r.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}),console.log(c)})}catch(i){r.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}),console.log(i)}};return e.jsxs(X,{user:l.auth.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Centre Management"}),children:[e.jsx(K,{title:"Centre Management"}),e.jsx(Y,{position:"top-right",autoClose:5e3,hideProgressBar:!1,newestOnTop:!1,closeOnClick:!0,rtl:!1,pauseOnFocusLoss:!0,draggable:!0,pauseOnHover:!0,theme:"light"}),e.jsx("div",{className:"page-header d-print-none",children:e.jsx("div",{className:"container-xl",children:e.jsx("div",{className:"row g-2 align-items-center",children:e.jsx("div",{className:"col",children:e.jsx("h2",{className:"page-title",children:"Centre Management"})})})})}),e.jsx("div",{className:"page-body",children:e.jsx("div",{className:"container-xl",children:e.jsx("div",{className:"card",children:e.jsxs("div",{className:"row g-0",children:[e.jsx("div",{className:"col-12 col-md-2 border-end",children:e.jsxs("div",{className:"card-body",children:[e.jsx("h4",{className:"subheader",children:"Centre settings"}),e.jsxs("div",{className:"list-group list-group-transparent",children:[e.jsx("a",{href:"#",className:"list-group-item list-group-item-action d-flex align-items-center",onClick:s=>C(s,"basic-information"),children:"Basic Information"}),e.jsx("a",{href:"#",className:"list-group-item list-group-item-action d-flex align-items-center",onClick:s=>C(s,"users"),children:"Centre Staff"}),e.jsx("a",{href:"#",className:"list-group-item list-group-item-action d-flex align-items-center d-none",onClick:s=>C(s,"modules"),children:"Centre Lab Modules"})]})]})}),e.jsxs("div",{className:"col-12 col-md-10 d-flex flex-column",children:[e.jsxs("div",{className:"card-body",id:"basic-information",children:[e.jsxs("div",{class:"row",children:[e.jsxs("div",{className:"col-md",children:[e.jsx("h3",{className:"card-title",children:"Logo"}),e.jsx("div",{className:"row align-items-center",children:e.jsx("div",{className:"col-auto",children:e.jsx("input",{className:"form-control",type:"file",name:"logo",onChange:q})})})]}),((M=l.centre)==null?void 0:M.image)!==null?e.jsxs("div",{className:"col-md",children:[e.jsx("h3",{className:"card-title",children:"Current Logo"}),e.jsx("div",{className:"row align-items-center",children:e.jsx("div",{className:"col-auto",children:e.jsx("span",{className:"avatar avatar-xl rounded",style:{backgroundImage:"url(./../storage/app/public/centres/logos/"+((H=l.centre)==null?void 0:H.image)+")"}})})})]}):e.jsx(e.Fragment,{})]}),e.jsx("h3",{className:"card-title mt-4",children:"Information"}),e.jsxs("div",{className:"row mb-3",children:[e.jsxs("div",{className:"col-md",children:[e.jsx("div",{className:"form-label",children:"Name"}),e.jsx("input",{type:"text",className:"form-control",value:x.name,name:"name",onChange:p})]}),e.jsxs("div",{className:"col-md",children:[e.jsx("div",{className:"form-label",children:"City"}),e.jsx("input",{type:"text",className:"form-control",value:x.city,name:"city",onChange:p})]}),e.jsxs("div",{className:"col-md",children:[e.jsx("div",{className:"form-label",children:"Country"}),e.jsx("input",{type:"text",className:"form-control",value:x.country,name:"country",onChange:p})]})]}),e.jsxs("div",{className:"row g-3",children:[e.jsxs("div",{className:"col-md",children:[e.jsx("div",{className:"form-label",children:"Phone"}),e.jsx("input",{type:"text",className:"form-control",value:x.phone,name:"phone",onChange:p})]}),e.jsxs("div",{className:"col-md",children:[e.jsx("div",{className:"form-label",children:"Address"}),e.jsx("input",{type:"text",className:"form-control",value:x.address,name:"address",onChange:p})]})]})]}),e.jsxs("div",{className:"card-body",id:"users",style:{display:"none"},children:[e.jsxs("div",{className:"row mb-3",children:[e.jsx("h3",{className:"card-title",style:{float:"left",width:"90%"},children:"Centre Staff"}),e.jsx("a",{href:"#",type:"button",className:"btn btn-sm btn-success","data-bs-toggle":"modal","data-bs-target":"#new-user",style:{float:"right",width:"10%"},children:e.jsx(Z,{})}),e.jsx("div",{style:{clear:"both"}})]}),e.jsx("div",{className:"row m-3",children:e.jsx("div",{className:"table-responsive",children:e.jsxs("table",{className:"table card-table table-vcenter text-nowrap datatable",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"text-center",children:"Name"}),e.jsx("th",{className:"text-center",children:"Username"}),e.jsx("th",{className:"text-center",children:"Role"}),e.jsx("th",{className:"text-center",children:"Status"}),e.jsx("th",{className:"text-center",children:"Action(s)"})]})}),e.jsx("tbody",{children:E.map((s,t)=>e.jsxs("tr",{children:[e.jsx("td",{className:"text-center",children:e.jsx("a",{href:"#",className:"text-reset",tabindex:"-1",children:s.name})}),e.jsx("td",{className:"text-center",children:s==null?void 0:s.username}),e.jsx("td",{className:"text-center",children:(s==null?void 0:s.role_id)==2?"Admin":"Staff"}),e.jsx("td",{className:"text-center",children:(s==null?void 0:s.status)=="Active"?e.jsx("span",{className:"badge bg-success me-1 text-white",children:" Active"}):(s==null?void 0:s.status)=="Inactive"?e.jsx("span",{className:"badge bg-danger me-1 text-white",children:" Inactive"}):e.jsx(e.Fragment,{})}),e.jsx("td",{className:"text-center",children:e.jsxs("div",{className:"d-flex",children:[e.jsx("a",{className:"card-btn",href:"#",type:"button","data-bs-toggle":"modal","data-bs-target":"#edit-user",onClick:()=>J(s),children:e.jsx(ee,{})}),(s==null?void 0:s.role_id)==3?e.jsx("a",{className:"card-btn",href:"#",type:"button","data-bs-toggle":"modal","data-bs-target":"#edit-permissions",onClick:n=>Q(n,s==null?void 0:s.id),children:e.jsx(se,{})}):e.jsx(e.Fragment,{}),(s==null?void 0:s.status)=="Active"?e.jsx("a",{className:"card-btn text-danger",href:"#",type:"button","data-bs-toggle":"modal","data-bs-target":"#delete-user",onClick:()=>I(s==null?void 0:s.id,"Inactive"),children:e.jsx(U,{})}):e.jsx("a",{className:"dropdown-item text-success",href:"#",type:"button","data-bs-toggle":"modal","data-bs-target":"#delete-user",onClick:()=>I(s==null?void 0:s.id,"Active"),children:e.jsx(U,{})})]})})]}))})]})})})]}),e.jsxs("div",{className:"card-body",id:"modules",style:{display:"none"},children:[e.jsx("h3",{className:"card-title",children:"Centre Lab Modules"}),e.jsx("hr",{}),l.modules.map((s,t)=>e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"row m-3",children:e.jsxs("div",{className:"col-md",style:{display:"inline-flex",justifyContent:"space-evenly"},children:[e.jsx("div",{className:"form-label",children:s==null?void 0:s.title}),e.jsx("div",{className:"form-desc",children:s==null?void 0:s.description}),e.jsx("div",{children:e.jsxs("label",{className:"form-check form-switch",children:[e.jsx("input",{className:"form-check-input",type:"checkbox",id:`switch${t}`,name:`switch${t}`,checked:s==null?void 0:s.status,onChange:n=>G(n,s.id,t)}),e.jsx("span",{class:"form-check-label",id:`switchlabel${t}`,children:s!=null&&s.status?"On":"Off"})]})})]})}),e.jsx("hr",{})]}))]}),e.jsx("div",{id:"form_footer",className:"card-footer bg-transparent mt-auto",children:e.jsx("div",{className:"btn-list justify-content-end",children:e.jsx("a",{href:"#",className:"btn btn-primary",type:"button",onClick:R,children:"Update Centre"})})})]})]})})})}),e.jsx("div",{className:"modal modal-blur fade",id:"new-user",tabindex:"-1",role:"dialog","aria-hidden":"true",children:e.jsx("div",{className:"modal-dialog modal-lg modal-dialog-centered",role:"document",children:e.jsxs("div",{className:"modal-content",children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h5",{className:"modal-title",children:"Add New Staff Member"}),e.jsx("button",{type:"button",className:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})]}),e.jsxs("div",{className:"modal-body",children:[e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"form-label",children:"Name"}),e.jsx("input",{type:"text",className:"form-control",placeholder:"Staff Member's name",name:"name",value:b,onChange:s=>m(s.target.value)})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"form-label",children:"Username"}),e.jsx("input",{type:"text",className:"form-control",placeholder:"Username",name:"username",value:g,onChange:s=>h(s.target.value)})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"form-label",children:"Role"}),e.jsxs("select",{class:"form-select",name:"role",onChange:s=>u(s.target.value),children:[e.jsx("option",{value:"Admin",children:"Admin"}),e.jsx("option",{value:"Staff",selected:!0,children:"Staff"})]})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"form-label",children:"Password"}),e.jsx("input",{type:"password",className:"form-control",placeholder:"Password",name:"password",onChange:s=>v(s.target.value)})]})]}),e.jsxs("div",{className:"modal-footer",children:[e.jsx("a",{href:"#",className:"btn btn-link link-secondary","data-bs-dismiss":"modal",children:"Cancel"}),e.jsxs("button",{className:"btn btn-primary ms-auto","data-bs-dismiss":"modal",type:"button",onClick:T,children:[e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",className:"icon",width:"24",height:"24",viewBox:"0 0 24 24","stroke-width":"2",stroke:"currentColor",fill:"none","stroke-linecap":"round","stroke-linejoin":"round",children:[e.jsx("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e.jsx("path",{d:"M12 5l0 14"}),e.jsx("path",{d:"M5 12l14 0"})]}),"Create Staff"]})]})]})})}),e.jsx("div",{className:"modal modal-blur fade",id:"edit-user",tabindex:"-1",role:"dialog","aria-hidden":"true",children:e.jsx("div",{className:"modal-dialog modal-lg modal-dialog-centered",role:"document",children:e.jsxs("div",{className:"modal-content",children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h5",{className:"modal-title",children:"Edit Staff Member"}),e.jsx("button",{type:"button",className:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})]}),e.jsxs("div",{className:"modal-body",children:[e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"form-label",children:"Name"}),e.jsx("input",{type:"text",className:"form-control",placeholder:"Staff Member's name",name:"name",value:b,onChange:s=>m(s.target.value)})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"form-label",children:"Username"}),e.jsx("input",{type:"text",className:"form-control",placeholder:"Username",name:"username",value:g,onChange:s=>h(s.target.value)})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"form-label",children:"Role"}),e.jsx("select",{class:"form-select",name:"role",onChange:s=>u(s.target.value),children:w=="Admin"?e.jsxs(e.Fragment,{children:[e.jsx("option",{value:"Admin",selected:!0,children:"Admin"}),e.jsx("option",{value:"Staff",children:"Staff"})]}):e.jsxs(e.Fragment,{children:[e.jsx("option",{value:"Admin",children:"Admin"}),e.jsx("option",{value:"Staff",selected:!0,children:"Staff"})]})})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"form-label",children:"Password"}),e.jsx("input",{type:"password",className:"form-control",placeholder:"Password",name:"password",onChange:s=>v(s.target.value)})]})]}),e.jsxs("div",{className:"modal-footer",children:[e.jsx("a",{href:"#",className:"btn btn-link link-secondary","data-bs-dismiss":"modal",children:"Cancel"}),e.jsxs("button",{className:"btn btn-primary ms-auto","data-bs-dismiss":"modal",type:"button",onClick:L,children:[e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",className:"icon",width:"24",height:"24",viewBox:"0 0 24 24","stroke-width":"2",stroke:"currentColor",fill:"none","stroke-linecap":"round","stroke-linejoin":"round",children:[e.jsx("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e.jsx("path",{d:"M12 5l0 14"}),e.jsx("path",{d:"M5 12l14 0"})]}),"Update Staff Information"]})]})]})})}),e.jsx("div",{className:"modal modal-blur fade",id:"edit-permissions",tabindex:"-1",role:"dialog","aria-hidden":"true",children:e.jsx("div",{className:"modal-dialog modal-lg modal-dialog-centered",role:"document",children:e.jsxs("div",{className:"modal-content",children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h5",{className:"modal-title",children:"Edit Permissions"}),e.jsx("button",{type:"button",className:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})]}),e.jsx("div",{className:"modal-body",children:e.jsx("div",{className:"row m-3",children:(j==null?void 0:j.length)>0?j.map((s,t)=>{var n,o;return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"col-md-12 mb-2",children:[e.jsxs("div",{style:{display:"inline-flex",justifyContent:"space-between"},className:"col-7",children:[e.jsx("div",{className:"form-label h4",children:s==null?void 0:s.title}),((n=s==null?void 0:s.rights)==null?void 0:n.length)>0?s==null?void 0:s.rights.map((a,i)=>e.jsx("div",{children:(a==null?void 0:a.permission_type)=="Primary"?e.jsxs("label",{className:"form-check form-switch",children:[e.jsx("input",{className:"form-check-input",type:"checkbox",id:`perswitch${a==null?void 0:a.permission_id}`,name:`perswitch${a==null?void 0:a.permission_id}`,checked:a==null?void 0:a.status,onChange:c=>S(c,y,a==null?void 0:a.permission_id)}),e.jsx("span",{class:"form-check-label text-small",id:`perswitchlabel${a==null?void 0:a.permission_id}`,children:"Allow Access?"})]}):e.jsx(e.Fragment,{})})):e.jsx(e.Fragment,{})]}),e.jsx("div",{className:"mt-2 col-md-12 mb-3",style:{display:"inline-flex",justifyContent:"space-between"},children:((o=s==null?void 0:s.rights)==null?void 0:o.length)>0?s==null?void 0:s.rights.map((a,i)=>e.jsx("div",{children:(a==null?void 0:a.permission_type)=="CRUD"||(a==null?void 0:a.permission_type)=="Alternate"?e.jsxs("label",{className:"form-check",children:[e.jsx("input",{className:"form-check-input",type:"checkbox",id:`perswitch${a==null?void 0:a.permission_id}`,name:`perswitch${a==null?void 0:a.permission_id}`,checked:a==null?void 0:a.status,onChange:c=>S(c,y,a==null?void 0:a.permission_id)}),e.jsx("span",{class:"form-check-label text-small",id:`perswitchlabel${a==null?void 0:a.permission_id}`,children:a==null?void 0:a.permission_name.replaceAll("_"," ").toUpperCase()})]}):(a==null?void 0:a.permission_type)=="Counter"||(a==null?void 0:a.permission_type)=="Printing"?e.jsxs(e.Fragment,{children:[e.jsx("label",{className:"form-label",id:`perswitchlabel${i}`,children:a==null?void 0:a.permission_name.replaceAll("_"," ").toUpperCase()}),e.jsx("input",{className:"form-control",type:"text",id:`perswitch${a==null?void 0:a.permission_id}`,name:`perswitch${a==null?void 0:a.permission_id}`,placeholder:"Enter Value",value:a==null?void 0:a.permission_value,onChange:c=>S(c,y,a==null?void 0:a.permission_id)})]}):e.jsx(e.Fragment,{})})):e.jsx("div",{children:e.jsx("span",{class:"form-check-label",id:"",children:"No Rights are available for this Module"})})})]}),e.jsx("hr",{})]})}):e.jsx(e.Fragment,{})})}),e.jsx("div",{className:"modal-footer",children:e.jsx("a",{href:"#",className:"btn btn-link link-secondary","data-bs-dismiss":"modal",children:"Close"})})]})})}),e.jsx("div",{className:"modal modal-blur fade",id:"delete-user",tabindex:"-1",role:"dialog","aria-hidden":"true",children:e.jsx("div",{className:"modal-dialog modal-lg modal-dialog-centered",role:"document",children:e.jsxs("div",{className:"modal-content",children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("h5",{className:"modal-title",children:[N=="Active"?"Activate":"Deactivate"," Staff Profile"]}),e.jsx("button",{type:"button",className:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})]}),e.jsx("div",{className:"modal-body",children:e.jsxs("span",{children:["Are you sure you want to make this Staff Profile ",N=="Active"?"active":"inactive","?"]})}),e.jsxs("div",{className:"modal-footer",children:[e.jsx("a",{href:"#",className:"btn btn-link link-secondary","data-bs-dismiss":"modal",children:"Cancel"}),e.jsxs("button",{className:"btn btn-primary ms-auto","data-bs-dismiss":"modal",type:"button",onClick:z,children:[e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",className:"icon",width:"24",height:"24",viewBox:"0 0 24 24","stroke-width":"2",stroke:"currentColor",fill:"none","stroke-linecap":"round","stroke-linejoin":"round",children:[e.jsx("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e.jsx("path",{d:"M12 5l0 14"}),e.jsx("path",{d:"M5 12l14 0"})]}),N=="Inactive"?"Deactivate":"Activate"," Staff Profile"]})]})]})})})]})}export{xe as default};
