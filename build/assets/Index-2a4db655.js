import{r as n,W as j,j as e,a as p}from"./app-72f3f2f1.js";import{A as N}from"./AuthenticatedLayout-88e4a52b.js";import{I as b}from"./IconPencil-bc6e5dff.js";import{I as u}from"./IconTrash-58ce1110.js";import"./createReactComponent-467ac043.js";function M(i){n.useState(0),n.useState(""),n.useState(""),n.useState(""),n.useState("");const{data:l,setData:d,post:r,delete:o,put:m,processing:g,errors:v,reset:f}=j({id:0,name:"",email:"",username:"",password:""}),s=a=>{d(a.target.name,a.target.value)},c=a=>{a.preventDefault(),r(route("users.store"))},h=a=>{a.preventDefault(),m(route("users.update",l.id))},t=a=>{d("id",a==null?void 0:a.id),d("name",a==null?void 0:a.name),d("username",a==null?void 0:a.username),d("email",a==null?void 0:a.email),console.log(a)},x=a=>{o(route("users.destroy",a))};return e.jsxs(N,{user:i.auth.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Super Administration"}),children:[e.jsx(p,{title:"Super Administration"}),e.jsx("div",{className:"page-header d-print-none",children:e.jsx("div",{className:"container-xl",children:e.jsxs("div",{className:"row g-2 align-items-center",children:[e.jsx("div",{className:"col",children:e.jsx("h2",{className:"page-title",children:"Users"})}),e.jsx("div",{className:"col-auto ms-auto d-print-none",children:e.jsx("div",{className:"d-flex",children:e.jsxs("a",{href:"#",className:"btn btn-primary","data-bs-toggle":"modal","data-bs-target":"#new-user",children:[e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",className:"icon",width:"24",height:"24",viewBox:"0 0 24 24","stroke-width":"2",stroke:"currentColor",fill:"none","stroke-linecap":"round","stroke-linejoin":"round",children:[e.jsx("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e.jsx("path",{d:"M12 5l0 14"}),e.jsx("path",{d:"M5 12l14 0"})]}),"New user"]})})})]})})}),e.jsx("div",{className:"page-body",children:e.jsxs("div",{className:"container-xl",children:[e.jsx("div",{className:"row row-cards",children:i.data.map((a,w)=>e.jsx("div",{className:"col-md-6 col-lg-3",children:e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"card-body p-4 text-center",children:[e.jsx("span",{className:"avatar avatar-xl mb-3 rounded",style:{backgroundImage:"url("+(a==null?void 0:a.profile_photo_url)+")"}}),e.jsx("h3",{className:"m-0 mb-1",children:e.jsx("a",{href:"#",children:a==null?void 0:a.name})}),e.jsx("div",{className:"text-secondary",children:"Super Admin"})]}),e.jsxs("div",{className:"d-flex",children:[e.jsx("a",{href:"#",className:"card-btn","data-bs-toggle":"modal","data-bs-target":"#edit-user",onClick:()=>t(a),children:e.jsx(b,{})}),e.jsx("a",{href:"#",className:"card-btn","data-bs-toggle":"modal","data-bs-target":"#delete-user",onClick:()=>t(a),children:e.jsx(u,{})})]})]})}))}),e.jsx("div",{className:"d-flex mt-4 d-none",children:e.jsxs("ul",{className:"pagination ms-auto",children:[e.jsx("li",{className:"page-item disabled",children:e.jsxs("a",{className:"page-link",href:"#",tabindex:"-1","aria-disabled":"true",children:[e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",className:"icon",width:"24",height:"24",viewBox:"0 0 24 24","stroke-width":"2",stroke:"currentColor",fill:"none","stroke-linecap":"round","stroke-linejoin":"round",children:[e.jsx("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e.jsx("path",{d:"M15 6l-6 6l6 6"})]}),"prev"]})}),e.jsx("li",{className:"page-item",children:e.jsx("a",{className:"page-link",href:"#",children:"1"})}),e.jsx("li",{className:"page-item active",children:e.jsx("a",{className:"page-link",href:"#",children:"2"})}),e.jsx("li",{className:"page-item",children:e.jsx("a",{className:"page-link",href:"#",children:"3"})}),e.jsx("li",{className:"page-item",children:e.jsx("a",{className:"page-link",href:"#",children:"4"})}),e.jsx("li",{className:"page-item",children:e.jsx("a",{className:"page-link",href:"#",children:"5"})}),e.jsx("li",{className:"page-item",children:e.jsxs("a",{className:"page-link",href:"#",children:["next",e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",className:"icon",width:"24",height:"24",viewBox:"0 0 24 24","stroke-width":"2",stroke:"currentColor",fill:"none","stroke-linecap":"round","stroke-linejoin":"round",children:[e.jsx("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e.jsx("path",{d:"M9 6l6 6l-6 6"})]})]})})]})})]})}),e.jsx("div",{className:"modal modal-blur fade",id:"new-user",tabindex:"-1",role:"dialog","aria-hidden":"true",children:e.jsx("div",{className:"modal-dialog modal-lg modal-dialog-centered",role:"document",children:e.jsxs("div",{className:"modal-content",children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h5",{className:"modal-title",children:"Create Super Admin"}),e.jsx("button",{type:"button",className:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})]}),e.jsxs("div",{className:"modal-body",children:[e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"form-label",children:"Name"}),e.jsx("input",{type:"text",className:"form-control",placeholder:"Super Admin's name",name:"name",onChange:s})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"form-label",children:"Email"}),e.jsx("input",{type:"text",className:"form-control",placeholder:"Email Address",name:"email",onChange:s})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"form-label",children:"Username"}),e.jsx("input",{type:"text",className:"form-control",placeholder:"Username",name:"username",onChange:s})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"form-label",children:"Password"}),e.jsx("input",{type:"password",className:"form-control",placeholder:"Password",name:"password",onChange:s})]})]}),e.jsxs("div",{className:"modal-footer",children:[e.jsx("a",{href:"#",className:"btn btn-link link-secondary","data-bs-dismiss":"modal",children:"Cancel"}),e.jsxs("button",{className:"btn btn-primary ms-auto","data-bs-dismiss":"modal",type:"button",onClick:c,children:[e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",className:"icon",width:"24",height:"24",viewBox:"0 0 24 24","stroke-width":"2",stroke:"currentColor",fill:"none","stroke-linecap":"round","stroke-linejoin":"round",children:[e.jsx("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e.jsx("path",{d:"M12 5l0 14"}),e.jsx("path",{d:"M5 12l14 0"})]}),"Create Super Admin"]})]})]})})}),e.jsx("div",{className:"modal modal-blur fade",id:"edit-user",tabindex:"-1",role:"dialog","aria-hidden":"true",children:e.jsx("div",{className:"modal-dialog modal-lg modal-dialog-centered",role:"document",children:e.jsxs("div",{className:"modal-content",children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h5",{className:"modal-title",children:"Edit Super Admin"}),e.jsx("button",{type:"button",className:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})]}),e.jsxs("div",{className:"modal-body",children:[e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"form-label",children:"Name"}),e.jsx("input",{type:"text",className:"form-control",placeholder:"Super Admin's name",name:"name",value:l.name,onChange:s})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"form-label",children:"Email"}),e.jsx("input",{type:"text",className:"form-control",placeholder:"Email Address",name:"email",value:l.email,onChange:s})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"form-label",children:"Username"}),e.jsx("input",{type:"text",className:"form-control",placeholder:"Username",name:"username",value:l.username,onChange:s})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"form-label",children:"Change Password (if forgotten)"}),e.jsx("input",{type:"password",className:"form-control",placeholder:"Password",name:"password",onChange:s})]})]}),e.jsxs("div",{className:"modal-footer",children:[e.jsx("a",{href:"#",className:"btn btn-link link-secondary","data-bs-dismiss":"modal",children:"Cancel"}),e.jsx("button",{className:"btn btn-primary ms-auto","data-bs-dismiss":"modal",type:"button",onClick:h,children:"Update Super Admin"})]})]})})}),e.jsx("div",{className:"modal modal-blur fade",id:"delete-user",tabindex:"-1",role:"dialog","aria-hidden":"true",children:e.jsx("div",{className:"modal-dialog modal-lg modal-dialog-centered",role:"document",children:e.jsxs("div",{className:"modal-content",children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h5",{className:"modal-title",children:"Delete Super Admin"}),e.jsx("button",{type:"button",className:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})]}),e.jsx("div",{className:"modal-body",children:e.jsx("span",{children:"Are you sure you want to delete this Super Admin?"})}),e.jsxs("div",{className:"modal-footer",children:[e.jsx("a",{href:"#",className:"btn btn-link link-secondary","data-bs-dismiss":"modal",children:"Cancel"}),e.jsx("button",{className:"btn btn-primary ms-auto","data-bs-dismiss":"modal",type:"button",onClick:()=>x(l.id),children:"Delete Super Admin"})]})]})})})]})}export{M as default};