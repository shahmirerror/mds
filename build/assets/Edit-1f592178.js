import{r as c,W,j as e,a as K}from"./app-4431c5fe.js";import{A as X}from"./AuthenticatedLayout-59639fa7.js";import{Q as Y,B as l}from"./ReactToastify-4595696f.js";import{I as Z}from"./IconUserPlus-1c34a969.js";import{I as ee}from"./IconPencil-cb647f01.js";import{I as se}from"./IconCategory-8c0d1599.js";import{I as E}from"./IconPower-9076cff9.js";import"./createReactComponent-3ce27679.js";import"./index-23e86464.js";function xe(n){var M,H;const[U,D]=c.useState(n.users);c.useState(n.modules);const[f,P]=c.useState(null),[y,F]=c.useState(null),[O,j]=c.useState(0),[g,m]=c.useState(""),[b,h]=c.useState(""),[_,v]=c.useState(""),[C,u]=c.useState("Staff"),[N,B]=c.useState(""),{data:x,setData:A,post:$,processing:ae,errors:te,reset:le}=W({name:n.centre.name,phone:n.centre.phone,city:n.centre.city,country:n.centre.country,address:n.centre.address,logo:""}),p=s=>{A(s.target.name,s.target.value)},q=s=>{console.log(s.target.files[0]),A(s.target.name,s.target.files[0])},R=s=>{s.preventDefault(),l.loading("Please wait..."),$(route("centres.update",n.centre.id))},w=(s,t)=>{document.getElementById("basic-information").style.display="none",document.getElementById("users").style.display="none",document.getElementById("modules").style.display="none",document.getElementById(t).style.display="block",t=="basic-information"?document.getElementById("form_footer").style.display="block":document.getElementById("form_footer").style.display="none"},k=()=>{try{const s=fetch(route("super.centre.fetch_staff",n.centre.id),{method:"GET"}).then(t=>t.json()).then(t=>{D(t.users)},t=>{console.log(t)})}catch{l.error("Something went wrong! Can not fetch users",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}},T=s=>{s.preventDefault();const r=JSON.stringify({name:g,username:b,role:C,password:_});try{const o=fetch(route("super.centre.add_staff",n.centre.id),{method:"POST",body:r}).then(a=>a.json()).then(a=>{m(""),v(""),u("Staff"),h(""),k(),l.success("Staff Profile has been created!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})},a=>{l.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})})}catch{l.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}},J=s=>{j(s.id),m(s.name),h(s.username),u(s.role_id==2?"Admin":"Staff")},L=s=>{s.preventDefault();const r=JSON.stringify({id:O,name:g,username:b,role:C,password:_});try{const o=fetch(route("super.centre.edit_staff",n.centre.id),{method:"PUT",body:r}).then(a=>a.json()).then(a=>{j(0),m(""),v(""),u("Staff"),h(""),k(),l.success("Staff Profile has been updated!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})},a=>{l.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})})}catch{l.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}},I=(s,t)=>{j(s),B(t),console.log(s,t)},z=s=>{s.preventDefault();const r=JSON.stringify({id:O,status:N});try{const o=fetch(route("super.centre.staff_status",n.centre.id),{method:"PUT",body:r}).then(a=>a.json()).then(a=>{j(0),B(""),k(),l.success("Staff Profile has been made Inactive",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})},a=>{l.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})})}catch{l.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}},G=(s,t,r)=>{let o=s.target.checked?"On":"Off";try{const a=fetch(route("super.centre.lab_modules",{module_id:t,centre_id:n.centre.id}),{method:"PUT"}).then(d=>d.json()).then(d=>{document.getElementById(`switchlabel${r}`).innerHTML=o,s.target.checked=o!=="Off";let i=o==="Off"?"Module has been removed!":"Module has been activated!";l.success(i,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})},d=>{l.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})})}catch{l.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}},Q=(s,t,r)=>{P(null),F(t);try{const o=fetch(route("super.centre.lab_module_permissions",{user_id:t,centre_id:n.centre.id}),{method:"GET"}).then(a=>a.json()).then(a=>{P(a.module_rights),l.info("Module Permissions have been loaded!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})},a=>{l.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})})}catch{l.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}},S=(s,t,r,o)=>{let a=s.target.checked?"On":"Off";try{const d=fetch(route("super.centre.toggle_lab_module_permissions",{user_id:t,permission_id:r}),{method:"POST",body:JSON.stringify({permission_value:document.getElementById("perswitch"+r).value})}).then(i=>i.json()).then(i=>{s.target.checked=a!=="Off";let V="Permissions have been updated!";l.success(V,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})},i=>{l.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}),console.log(i)})}catch(d){l.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}),console.log(d)}};return e.jsxs(X,{user:n.auth.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Centres Management"}),children:[e.jsx(K,{title:"Edit Centre"}),e.jsx(Y,{position:"top-right",autoClose:5e3,hideProgressBar:!1,newestOnTop:!1,closeOnClick:!0,rtl:!1,pauseOnFocusLoss:!0,draggable:!0,pauseOnHover:!0,theme:"light"}),e.jsx("div",{className:"page-header d-print-none",children:e.jsx("div",{className:"container-xl",children:e.jsx("div",{className:"row g-2 align-items-center",children:e.jsx("div",{className:"col",children:e.jsx("h2",{className:"page-title",children:"Edit Centre"})})})})}),e.jsx("div",{className:"page-body",children:e.jsx("div",{className:"container-xl",children:e.jsx("div",{className:"card",children:e.jsxs("div",{className:"row g-0",children:[e.jsx("div",{className:"col-12 col-md-2 border-end",children:e.jsxs("div",{className:"card-body",children:[e.jsx("h4",{className:"subheader",children:"Centre settings"}),e.jsxs("div",{className:"list-group list-group-transparent",children:[e.jsx("a",{href:"#",className:"list-group-item list-group-item-action d-flex align-items-center",onClick:s=>w(s,"basic-information"),children:"Basic Information"}),e.jsx("a",{href:"#",className:"list-group-item list-group-item-action d-flex align-items-center",onClick:s=>w(s,"users"),children:"Centre Staff"}),e.jsx("a",{href:"#",className:"list-group-item list-group-item-action d-flex align-items-center",onClick:s=>w(s,"modules"),children:"Centre Lab Modules"})]})]})}),e.jsxs("div",{className:"col-12 col-md-10 d-flex flex-column",children:[e.jsxs("div",{className:"card-body",id:"basic-information",children:[e.jsxs("div",{class:"row",children:[e.jsxs("div",{className:"col-md",children:[e.jsx("h3",{className:"card-title",children:"Logo"}),e.jsx("div",{className:"row align-items-center",children:e.jsx("div",{className:"col-auto",children:e.jsx("input",{className:"form-control",type:"file",name:"logo",onChange:q,value:""})})})]}),((M=n.centre)==null?void 0:M.image)!==null?e.jsxs("div",{className:"col-md",children:[e.jsx("h3",{className:"card-title",children:"Current Logo"}),e.jsx("div",{className:"row align-items-center",children:e.jsx("div",{className:"col-auto",children:e.jsx("img",{class:"mb-3 rounded",style:{width:"5.5rem"},src:"./../../../storage/app/public/centres/logos/"+((H=n.centre)==null?void 0:H.image)})})})]}):e.jsx(e.Fragment,{})]}),e.jsx("h3",{className:"card-title mt-4",children:"Information"}),e.jsxs("div",{className:"row mb-3",children:[e.jsxs("div",{className:"col-md",children:[e.jsx("div",{className:"form-label",children:"Name"}),e.jsx("input",{type:"text",className:"form-control",value:x.name,name:"name",onChange:p})]}),e.jsxs("div",{className:"col-md",children:[e.jsx("div",{className:"form-label",children:"City"}),e.jsx("input",{type:"text",className:"form-control",value:x.city,name:"city",onChange:p})]}),e.jsxs("div",{className:"col-md",children:[e.jsx("div",{className:"form-label",children:"Country"}),e.jsx("input",{type:"text",className:"form-control",value:x.country,name:"country",onChange:p})]})]}),e.jsxs("div",{className:"row g-3",children:[e.jsxs("div",{className:"col-md",children:[e.jsx("div",{className:"form-label",children:"Phone"}),e.jsx("input",{type:"text",className:"form-control",value:x.phone,name:"phone",onChange:p})]}),e.jsxs("div",{className:"col-md",children:[e.jsx("div",{className:"form-label",children:"Address"}),e.jsx("input",{type:"text",className:"form-control",value:x.address,name:"address",onChange:p})]})]})]}),e.jsxs("div",{className:"card-body",id:"users",style:{display:"none"},children:[e.jsxs("div",{className:"row mb-3",children:[e.jsx("h3",{className:"card-title",style:{float:"left",width:"90%"},children:"Centre Staff"}),e.jsx("a",{href:"#",type:"button",className:"btn btn-sm btn-success","data-bs-toggle":"modal","data-bs-target":"#new-user",style:{float:"right",width:"5%"},children:e.jsx(Z,{})}),e.jsx("div",{style:{clear:"both"}})]}),e.jsx("div",{className:"row m-3",children:e.jsx("div",{className:"table-responsive",children:e.jsxs("table",{className:"table card-table table-vcenter text-nowrap datatable",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"text-center",children:"Name"}),e.jsx("th",{className:"text-center",children:"Username"}),e.jsx("th",{className:"text-center",children:"Role"}),e.jsx("th",{className:"text-center",children:"Status"}),e.jsx("th",{className:"text-center",children:"Action(s)"})]})}),e.jsx("tbody",{children:U.map((s,t)=>e.jsxs("tr",{children:[e.jsx("td",{className:"text-center",children:e.jsx("a",{href:"#",className:"text-reset",tabindex:"-1",children:s.name})}),e.jsx("td",{className:"text-center",children:s==null?void 0:s.username}),e.jsx("td",{className:"text-center",children:(s==null?void 0:s.role_id)==2?"Admin":"Staff"}),e.jsx("td",{className:"text-center",children:(s==null?void 0:s.status)=="Active"?e.jsx("span",{className:"badge bg-success me-1 text-white",children:" Active"}):(s==null?void 0:s.status)=="Inactive"?e.jsx("span",{className:"badge bg-danger me-1 text-white",children:" Inactive"}):e.jsx(e.Fragment,{})}),e.jsx("td",{className:"text-center",children:e.jsxs("div",{className:"d-flex",children:[e.jsx("a",{className:"card-btn",href:"#",type:"button","data-bs-toggle":"modal","data-bs-target":"#edit-user",onClick:()=>J(s),children:e.jsx(ee,{})}),(s==null?void 0:s.role_id)==3?e.jsx("a",{className:"card-btn",href:"#",type:"button","data-bs-toggle":"modal","data-bs-target":"#edit-permissions",onClick:r=>Q(r,s==null?void 0:s.id),children:e.jsx(se,{})}):e.jsx(e.Fragment,{}),(s==null?void 0:s.status)=="Active"?e.jsx("a",{className:"card-btn text-danger",href:"#",type:"button","data-bs-toggle":"modal","data-bs-target":"#delete-user",onClick:()=>I(s==null?void 0:s.id,"Inactive"),children:e.jsx(E,{})}):e.jsx("a",{className:"card-btn text-success",href:"#",type:"button","data-bs-toggle":"modal","data-bs-target":"#delete-user",onClick:()=>I(s==null?void 0:s.id,"Active"),children:e.jsx(E,{})})]})})]}))})]})})})]}),e.jsxs("div",{className:"card-body",id:"modules",style:{display:"none"},children:[e.jsx("h3",{className:"card-title",children:"Centre Lab Modules"}),e.jsx("hr",{}),e.jsx("div",{className:"row m-3",children:n.modules.map((s,t)=>e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"col-md-5 m-3",style:{display:"inline-flex",justifyContent:"space-between"},children:[e.jsxs("div",{children:[e.jsx("div",{className:"form-label",children:s==null?void 0:s.title}),e.jsx("div",{className:"form-desc",children:s==null?void 0:s.description})]}),e.jsx("div",{children:e.jsxs("label",{className:"form-check form-switch",children:[e.jsx("input",{className:"form-check-input",type:"checkbox",id:`switch${t}`,name:`switch${t}`,checked:s==null?void 0:s.status,onChange:r=>G(r,s==null?void 0:s.id,t)}),e.jsx("span",{class:"form-check-label",id:`switchlabel${t}`,children:s!=null&&s.status?"On":"Off"})]})})]}),(t+1)%2==0?e.jsx("hr",{}):""]}))})]}),e.jsx("div",{id:"form_footer",className:"card-footer bg-transparent mt-auto",children:e.jsxs("div",{className:"btn-list justify-content-end",children:[e.jsx("a",{href:route("centres.index"),className:"btn",children:"Cancel"}),e.jsx("a",{href:"#",className:"btn btn-primary",type:"button",onClick:R,children:"Update Centre"})]})})]})]})})})}),e.jsx("div",{className:"modal modal-blur fade",id:"new-user",tabindex:"-1",role:"dialog","aria-hidden":"true",children:e.jsx("div",{className:"modal-dialog modal-lg modal-dialog-centered",role:"document",children:e.jsxs("div",{className:"modal-content",children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h5",{className:"modal-title",children:"Add New Staff Member"}),e.jsx("button",{type:"button",className:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})]}),e.jsxs("div",{className:"modal-body",children:[e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"form-label",children:"Name"}),e.jsx("input",{type:"text",className:"form-control",placeholder:"Staff Member's name",name:"name",value:g,onChange:s=>m(s.target.value)})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"form-label",children:"Username"}),e.jsx("input",{type:"text",className:"form-control",placeholder:"Username",name:"username",value:b,onChange:s=>h(s.target.value)})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"form-label",children:"Role"}),e.jsxs("select",{class:"form-select",name:"role",onChange:s=>u(s.target.value),children:[e.jsx("option",{value:"Admin",children:"Admin"}),e.jsx("option",{value:"Staff",selected:!0,children:"Staff"})]})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"form-label",children:"Password"}),e.jsx("input",{type:"password",className:"form-control",placeholder:"Password",name:"password",onChange:s=>v(s.target.value)})]})]}),e.jsxs("div",{className:"modal-footer",children:[e.jsx("a",{href:"#",className:"btn btn-link link-secondary","data-bs-dismiss":"modal",children:"Cancel"}),e.jsxs("button",{className:"btn btn-primary ms-auto","data-bs-dismiss":"modal",type:"button",onClick:T,children:[e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",className:"icon",width:"24",height:"24",viewBox:"0 0 24 24","stroke-width":"2",stroke:"currentColor",fill:"none","stroke-linecap":"round","stroke-linejoin":"round",children:[e.jsx("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e.jsx("path",{d:"M12 5l0 14"}),e.jsx("path",{d:"M5 12l14 0"})]}),"Create Staff"]})]})]})})}),e.jsx("div",{className:"modal modal-blur fade",id:"edit-user",tabindex:"-1",role:"dialog","aria-hidden":"true",children:e.jsx("div",{className:"modal-dialog modal-lg modal-dialog-centered",role:"document",children:e.jsxs("div",{className:"modal-content",children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h5",{className:"modal-title",children:"Edit Staff Member"}),e.jsx("button",{type:"button",className:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})]}),e.jsxs("div",{className:"modal-body",children:[e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"form-label",children:"Name"}),e.jsx("input",{type:"text",className:"form-control",placeholder:"Staff Member's name",name:"name",value:g,onChange:s=>m(s.target.value)})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"form-label",children:"Username"}),e.jsx("input",{type:"text",className:"form-control",placeholder:"Username",name:"username",value:b,onChange:s=>h(s.target.value)})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"form-label",children:"Role"}),e.jsx("select",{class:"form-select",name:"role",onChange:s=>u(s.target.value),children:C=="Admin"?e.jsxs(e.Fragment,{children:[e.jsx("option",{value:"Admin",selected:!0,children:"Admin"}),e.jsx("option",{value:"Staff",children:"Staff"})]}):e.jsxs(e.Fragment,{children:[e.jsx("option",{value:"Admin",children:"Admin"}),e.jsx("option",{value:"Staff",selected:!0,children:"Staff"})]})})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"form-label",children:"Password"}),e.jsx("input",{type:"password",className:"form-control",placeholder:"Password",name:"password",onChange:s=>v(s.target.value)})]})]}),e.jsxs("div",{className:"modal-footer",children:[e.jsx("a",{href:"#",className:"btn btn-link link-secondary","data-bs-dismiss":"modal",children:"Cancel"}),e.jsxs("button",{className:"btn btn-primary ms-auto","data-bs-dismiss":"modal",type:"button",onClick:L,children:[e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",className:"icon",width:"24",height:"24",viewBox:"0 0 24 24","stroke-width":"2",stroke:"currentColor",fill:"none","stroke-linecap":"round","stroke-linejoin":"round",children:[e.jsx("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e.jsx("path",{d:"M12 5l0 14"}),e.jsx("path",{d:"M5 12l14 0"})]}),"Update Staff Information"]})]})]})})}),e.jsx("div",{className:"modal modal-blur fade",id:"edit-permissions",tabindex:"-1",role:"dialog","aria-hidden":"true",children:e.jsx("div",{className:"modal-dialog modal-lg modal-dialog-centered",role:"document",children:e.jsxs("div",{className:"modal-content",children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h5",{className:"modal-title",children:"Edit Permissions"}),e.jsx("button",{type:"button",className:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})]}),e.jsx("div",{className:"modal-body",children:e.jsx("div",{className:"row m-3",children:(f==null?void 0:f.length)>0?f.map((s,t)=>{var r,o;return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"col-md-12 mb-2",children:[e.jsxs("div",{style:{display:"inline-flex",justifyContent:"space-between"},className:"col-7",children:[e.jsx("div",{className:"form-label h4",children:s==null?void 0:s.title}),((r=s==null?void 0:s.rights)==null?void 0:r.length)>0?s==null?void 0:s.rights.map((a,d)=>e.jsx("div",{children:(a==null?void 0:a.permission_type)=="Primary"?e.jsxs("label",{className:"form-check form-switch",children:[e.jsx("input",{className:"form-check-input",type:"checkbox",id:`perswitch${a==null?void 0:a.permission_id}`,name:`perswitch${a==null?void 0:a.permission_id}`,checked:a==null?void 0:a.status,onChange:i=>S(i,y,a==null?void 0:a.permission_id)}),e.jsx("span",{class:"form-check-label text-small",id:`perswitchlabel${a==null?void 0:a.permission_id}`,children:"Allow Access?"})]}):e.jsx(e.Fragment,{})})):e.jsx(e.Fragment,{})]}),e.jsx("div",{className:"mt-2 col-md-12 mb-3",style:{display:"inline-flex",justifyContent:"space-between"},children:((o=s==null?void 0:s.rights)==null?void 0:o.length)>0?s==null?void 0:s.rights.map((a,d)=>e.jsx("div",{children:(a==null?void 0:a.permission_type)=="CRUD"||(a==null?void 0:a.permission_type)=="Alternate"?e.jsxs("label",{className:"form-check",children:[e.jsx("input",{className:"form-check-input",type:"checkbox",id:`perswitch${a==null?void 0:a.permission_id}`,name:`perswitch${a==null?void 0:a.permission_id}`,checked:a==null?void 0:a.status,onChange:i=>S(i,y,a==null?void 0:a.permission_id)}),e.jsx("span",{class:"form-check-label text-small",id:`perswitchlabel${a==null?void 0:a.permission_id}`,children:a==null?void 0:a.permission_name.replaceAll("_"," ").toUpperCase()})]}):(a==null?void 0:a.permission_type)=="Counter"||(a==null?void 0:a.permission_type)=="Printing"?e.jsxs(e.Fragment,{children:[e.jsx("label",{className:"form-label",id:`perswitchlabel${d}`,children:a==null?void 0:a.permission_name.replaceAll("_"," ").toUpperCase()}),e.jsx("input",{className:"form-control",type:"text",id:`perswitch${a==null?void 0:a.permission_id}`,name:`perswitch${a==null?void 0:a.permission_id}`,placeholder:"Enter Value",value:a==null?void 0:a.permission_value,onChange:i=>S(i,y,a==null?void 0:a.permission_id)})]}):e.jsx(e.Fragment,{})})):e.jsx("div",{children:e.jsx("span",{class:"form-check-label",id:"",children:"No Rights are available for this Module"})})})]}),e.jsx("hr",{})]})}):e.jsx(e.Fragment,{})})}),e.jsx("div",{className:"modal-footer",children:e.jsx("a",{href:"#",className:"btn btn-link link-secondary","data-bs-dismiss":"modal",children:"Close"})})]})})}),e.jsx("div",{className:"modal modal-blur fade",id:"delete-user",tabindex:"-1",role:"dialog","aria-hidden":"true",children:e.jsx("div",{className:"modal-dialog modal-lg modal-dialog-centered",role:"document",children:e.jsxs("div",{className:"modal-content",children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("h5",{className:"modal-title",children:[N=="Active"?"Activate":"Deactivate"," Staff Profile"]}),e.jsx("button",{type:"button",className:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})]}),e.jsx("div",{className:"modal-body",children:e.jsxs("span",{children:["Are you sure you want to make this Staff Profile ",N=="Active"?"active":"inactive","?"]})}),e.jsxs("div",{className:"modal-footer",children:[e.jsx("a",{href:"#",className:"btn btn-link link-secondary","data-bs-dismiss":"modal",children:"Cancel"}),e.jsxs("button",{className:"btn btn-primary ms-auto","data-bs-dismiss":"modal",type:"button",onClick:z,children:[e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",className:"icon",width:"24",height:"24",viewBox:"0 0 24 24","stroke-width":"2",stroke:"currentColor",fill:"none","stroke-linecap":"round","stroke-linejoin":"round",children:[e.jsx("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e.jsx("path",{d:"M12 5l0 14"}),e.jsx("path",{d:"M5 12l14 0"})]}),N=="Inactive"?"Deactivate":"Activate"," Staff Profile"]})]})]})})})]})}export{xe as default};
