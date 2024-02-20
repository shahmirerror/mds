import{r as i,W as j,j as e,a as b}from"./app-8b5ea9c7.js";import{A as p}from"./AuthenticatedLayout-f4b0d9e0.js";import{I as N}from"./IconPencil-4f2db409.js";import{I as g}from"./IconTrash-9516bf01.js";import"./createReactComponent-cd75750e.js";import"./index-e55138a9.js";function S(n){i.useState(0),i.useState("");const{data:l,setData:a,post:o,delete:r,put:c,processing:u,errors:f,reset:v}=j({id:0,name:""}),t=s=>{a(s.target.name,s.target.value)},m=s=>{s.preventDefault(),o(route("profession-setup.store"))},h=s=>{s.preventDefault(),c(route("profession-setup.update",l.id))},d=s=>{a("id",s==null?void 0:s.id),a("name",s==null?void 0:s.name),a("username",s==null?void 0:s.username),a("email",s==null?void 0:s.email),console.log(s)},x=s=>{r(route("profession-setup.destroy",s))};return e.jsxs(p,{user:n.auth.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Profession Setup"}),children:[e.jsx(b,{title:"Profession Setup"}),e.jsx("div",{className:"page-header d-print-none",children:e.jsx("div",{className:"container-xl",children:e.jsxs("div",{className:"row g-2 align-items-center",children:[e.jsx("div",{className:"col",children:e.jsx("h2",{className:"page-title",children:"Profession Setup"})}),e.jsx("div",{className:"col-auto ms-auto d-print-none",children:e.jsx("div",{className:"d-flex",children:e.jsxs("a",{href:"#",className:"btn btn-primary","data-bs-toggle":"modal","data-bs-target":"#new-user",children:[e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",className:"icon",width:"24",height:"24",viewBox:"0 0 24 24","stroke-width":"2",stroke:"currentColor",fill:"none","stroke-linecap":"round","stroke-linejoin":"round",children:[e.jsx("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e.jsx("path",{d:"M12 5l0 14"}),e.jsx("path",{d:"M5 12l14 0"})]}),"Add Profession"]})})})]})})}),e.jsx("div",{className:"page-body",children:e.jsxs("div",{className:"container-xl",children:[e.jsx("div",{className:"row row-cards",style:{justifyContent:"center"},children:e.jsx("div",{className:"col-md-12 col-lg-6",children:e.jsx("div",{class:"card",children:e.jsx("div",{class:"card-body",children:e.jsx("div",{id:"table-default",class:"table-responsive",children:e.jsxs("table",{class:"table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:e.jsx("button",{class:"table-sort","data-sort":"sort-name",children:"Name"})}),e.jsx("th",{children:e.jsx("button",{class:"table-sort","data-sort":"sort-name",children:"Action(s)"})})]})}),e.jsx("tbody",{class:"table-tbody",children:n.profession.map((s,k)=>e.jsxs("tr",{children:[e.jsx("td",{class:"sort-name",children:s.name}),e.jsxs("td",{children:[e.jsx("a",{href:"#",className:"btn btn-sm","data-bs-toggle":"modal","data-bs-target":"#edit-user",onClick:()=>d(s),children:e.jsx(N,{})}),e.jsx("a",{href:"#",className:"btn btn-sm","data-bs-toggle":"modal","data-bs-target":"#delete-user",onClick:()=>d(s),children:e.jsx(g,{})})]})]}))})]})})})})})}),e.jsx("div",{className:"d-flex mt-4 d-none",children:e.jsxs("ul",{className:"pagination ms-auto",children:[e.jsx("li",{className:"page-item disabled",children:e.jsxs("a",{className:"page-link",href:"#",tabindex:"-1","aria-disabled":"true",children:[e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",className:"icon",width:"24",height:"24",viewBox:"0 0 24 24","stroke-width":"2",stroke:"currentColor",fill:"none","stroke-linecap":"round","stroke-linejoin":"round",children:[e.jsx("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e.jsx("path",{d:"M15 6l-6 6l6 6"})]}),"prev"]})}),e.jsx("li",{className:"page-item",children:e.jsx("a",{className:"page-link",href:"#",children:"1"})}),e.jsx("li",{className:"page-item active",children:e.jsx("a",{className:"page-link",href:"#",children:"2"})}),e.jsx("li",{className:"page-item",children:e.jsx("a",{className:"page-link",href:"#",children:"3"})}),e.jsx("li",{className:"page-item",children:e.jsx("a",{className:"page-link",href:"#",children:"4"})}),e.jsx("li",{className:"page-item",children:e.jsx("a",{className:"page-link",href:"#",children:"5"})}),e.jsx("li",{className:"page-item",children:e.jsxs("a",{className:"page-link",href:"#",children:["next",e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",className:"icon",width:"24",height:"24",viewBox:"0 0 24 24","stroke-width":"2",stroke:"currentColor",fill:"none","stroke-linecap":"round","stroke-linejoin":"round",children:[e.jsx("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e.jsx("path",{d:"M9 6l6 6l-6 6"})]})]})})]})})]})}),e.jsx("div",{className:"modal modal-blur fade",id:"new-user",tabindex:"-1",role:"dialog","aria-hidden":"true",children:e.jsx("div",{className:"modal-dialog modal-lg modal-dialog-centered",role:"document",children:e.jsxs("div",{className:"modal-content",children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h5",{className:"modal-title",children:"Create Profession"}),e.jsx("button",{type:"button",className:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})]}),e.jsx("div",{className:"modal-body",children:e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"form-label",children:"Name"}),e.jsx("input",{type:"text",className:"form-control",placeholder:"Profession Name",name:"name",onChange:t})]})}),e.jsxs("div",{className:"modal-footer",children:[e.jsx("a",{href:"#",className:"btn btn-link link-secondary","data-bs-dismiss":"modal",children:"Cancel"}),e.jsxs("button",{className:"btn btn-primary ms-auto","data-bs-dismiss":"modal",type:"button",onClick:m,children:[e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",className:"icon",width:"24",height:"24",viewBox:"0 0 24 24","stroke-width":"2",stroke:"currentColor",fill:"none","stroke-linecap":"round","stroke-linejoin":"round",children:[e.jsx("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e.jsx("path",{d:"M12 5l0 14"}),e.jsx("path",{d:"M5 12l14 0"})]}),"Create Profession"]})]})]})})}),e.jsx("div",{className:"modal modal-blur fade",id:"edit-user",tabindex:"-1",role:"dialog","aria-hidden":"true",children:e.jsx("div",{className:"modal-dialog modal-lg modal-dialog-centered",role:"document",children:e.jsxs("div",{className:"modal-content",children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h5",{className:"modal-title",children:"Edit Profession"}),e.jsx("button",{type:"button",className:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})]}),e.jsx("div",{className:"modal-body",children:e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"form-label",children:"Name"}),e.jsx("input",{type:"text",className:"form-control",placeholder:"Profession",name:"name",value:l.name,onChange:t})]})}),e.jsxs("div",{className:"modal-footer",children:[e.jsx("a",{href:"#",className:"btn btn-link link-secondary","data-bs-dismiss":"modal",children:"Cancel"}),e.jsx("button",{className:"btn btn-primary ms-auto","data-bs-dismiss":"modal",type:"button",onClick:h,children:"Update Profession"})]})]})})}),e.jsx("div",{className:"modal modal-blur fade",id:"delete-user",tabindex:"-1",role:"dialog","aria-hidden":"true",children:e.jsx("div",{className:"modal-dialog modal-lg modal-dialog-centered",role:"document",children:e.jsxs("div",{className:"modal-content",children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h5",{className:"modal-title",children:"Delete Profession"}),e.jsx("button",{type:"button",className:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})]}),e.jsx("div",{className:"modal-body",children:e.jsx("span",{children:"Are you sure you want to delete profession?"})}),e.jsxs("div",{className:"modal-footer",children:[e.jsx("a",{href:"#",className:"btn btn-link link-secondary","data-bs-dismiss":"modal",children:"Cancel"}),e.jsx("button",{className:"btn btn-primary ms-auto","data-bs-dismiss":"modal",type:"button",onClick:()=>x(l.id),children:"Delete Profession"})]})]})})})]})}export{S as default};
