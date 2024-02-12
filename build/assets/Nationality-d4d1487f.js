import{r as d,W as j,j as e,a as N}from"./app-05b46bff.js";import{A as b}from"./AuthenticatedLayout-d29700ac.js";import{I as p}from"./IconPencil-30e47be5.js";import{I as g}from"./IconTrash-7939e6fd.js";import"./createReactComponent-89f5f90d.js";import"./index-34e21f62.js";function A(t){d.useState(0),d.useState("");const{data:l,setData:s,post:o,delete:r,put:c,processing:u,errors:v,reset:f}=j({id:0,name:""}),i=a=>{s(a.target.name,a.target.value)},m=a=>{a.preventDefault(),o(route("nationality-setup.store"))},h=a=>{a.preventDefault(),c(route("nationality-setup.update",l.id))},n=a=>{s("id",a==null?void 0:a.id),s("name",a==null?void 0:a.name),s("username",a==null?void 0:a.username),s("email",a==null?void 0:a.email),console.log(a)},x=a=>{r(route("nationality-setup.destroy",a))};return e.jsxs(b,{user:t.auth.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Nationality Setup"}),children:[e.jsx(N,{title:"Nationality Setup"}),e.jsx("div",{className:"page-header d-print-none",children:e.jsx("div",{className:"container-xl",children:e.jsxs("div",{className:"row g-2 align-items-center",children:[e.jsx("div",{className:"col",children:e.jsx("h2",{className:"page-title",children:"Nationality Setup"})}),e.jsx("div",{className:"col-auto ms-auto d-print-none",children:e.jsx("div",{className:"d-flex",children:e.jsxs("a",{href:"#",className:"btn btn-primary","data-bs-toggle":"modal","data-bs-target":"#new-user",children:[e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",className:"icon",width:"24",height:"24",viewBox:"0 0 24 24","stroke-width":"2",stroke:"currentColor",fill:"none","stroke-linecap":"round","stroke-linejoin":"round",children:[e.jsx("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e.jsx("path",{d:"M12 5l0 14"}),e.jsx("path",{d:"M5 12l14 0"})]}),"Add Nationality"]})})})]})})}),e.jsx("div",{className:"page-body",children:e.jsxs("div",{className:"container-xl",children:[e.jsx("div",{className:"row row-cards",style:{justifyContent:"center"},children:e.jsx("div",{className:"col-md-12 col-lg-6",children:e.jsx("div",{class:"card",children:e.jsx("div",{class:"card-body",children:e.jsx("div",{id:"table-default",class:"table-responsive",children:e.jsxs("table",{class:"table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:e.jsx("button",{class:"table-sort","data-sort":"sort-name",children:"Name"})}),e.jsx("th",{children:e.jsx("button",{class:"table-sort","data-sort":"sort-name",children:"Action(s)"})})]})}),e.jsx("tbody",{class:"table-tbody",children:t.nationality.map((a,y)=>e.jsxs("tr",{children:[e.jsx("td",{class:"sort-name",children:a.name}),e.jsxs("td",{children:[e.jsx("a",{href:"#",className:"btn btn-sm","data-bs-toggle":"modal","data-bs-target":"#edit-user",onClick:()=>n(a),children:e.jsx(p,{})}),e.jsx("a",{href:"#",className:"btn btn-sm","data-bs-toggle":"modal","data-bs-target":"#delete-user",onClick:()=>n(a),children:e.jsx(g,{})})]})]}))})]})})})})})}),e.jsx("div",{className:"d-flex mt-4 d-none",children:e.jsxs("ul",{className:"pagination ms-auto",children:[e.jsx("li",{className:"page-item disabled",children:e.jsxs("a",{className:"page-link",href:"#",tabindex:"-1","aria-disabled":"true",children:[e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",className:"icon",width:"24",height:"24",viewBox:"0 0 24 24","stroke-width":"2",stroke:"currentColor",fill:"none","stroke-linecap":"round","stroke-linejoin":"round",children:[e.jsx("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e.jsx("path",{d:"M15 6l-6 6l6 6"})]}),"prev"]})}),e.jsx("li",{className:"page-item",children:e.jsx("a",{className:"page-link",href:"#",children:"1"})}),e.jsx("li",{className:"page-item active",children:e.jsx("a",{className:"page-link",href:"#",children:"2"})}),e.jsx("li",{className:"page-item",children:e.jsx("a",{className:"page-link",href:"#",children:"3"})}),e.jsx("li",{className:"page-item",children:e.jsx("a",{className:"page-link",href:"#",children:"4"})}),e.jsx("li",{className:"page-item",children:e.jsx("a",{className:"page-link",href:"#",children:"5"})}),e.jsx("li",{className:"page-item",children:e.jsxs("a",{className:"page-link",href:"#",children:["next",e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",className:"icon",width:"24",height:"24",viewBox:"0 0 24 24","stroke-width":"2",stroke:"currentColor",fill:"none","stroke-linecap":"round","stroke-linejoin":"round",children:[e.jsx("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e.jsx("path",{d:"M9 6l6 6l-6 6"})]})]})})]})})]})}),e.jsx("div",{className:"modal modal-blur fade",id:"new-user",tabindex:"-1",role:"dialog","aria-hidden":"true",children:e.jsx("div",{className:"modal-dialog modal-lg modal-dialog-centered",role:"document",children:e.jsxs("div",{className:"modal-content",children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h5",{className:"modal-title",children:"Create Nationality"}),e.jsx("button",{type:"button",className:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})]}),e.jsx("div",{className:"modal-body",children:e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"form-label",children:"Name"}),e.jsx("input",{type:"text",className:"form-control",placeholder:"Nationality name",name:"name",onChange:i})]})}),e.jsxs("div",{className:"modal-footer",children:[e.jsx("a",{href:"#",className:"btn btn-link link-secondary","data-bs-dismiss":"modal",children:"Cancel"}),e.jsxs("button",{className:"btn btn-primary ms-auto","data-bs-dismiss":"modal",type:"button",onClick:m,children:[e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",className:"icon",width:"24",height:"24",viewBox:"0 0 24 24","stroke-width":"2",stroke:"currentColor",fill:"none","stroke-linecap":"round","stroke-linejoin":"round",children:[e.jsx("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e.jsx("path",{d:"M12 5l0 14"}),e.jsx("path",{d:"M5 12l14 0"})]}),"Create Nationality"]})]})]})})}),e.jsx("div",{className:"modal modal-blur fade",id:"edit-user",tabindex:"-1",role:"dialog","aria-hidden":"true",children:e.jsx("div",{className:"modal-dialog modal-lg modal-dialog-centered",role:"document",children:e.jsxs("div",{className:"modal-content",children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h5",{className:"modal-title",children:"Edit Nationality"}),e.jsx("button",{type:"button",className:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})]}),e.jsx("div",{className:"modal-body",children:e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"form-label",children:"Name"}),e.jsx("input",{type:"text",className:"form-control",placeholder:"Nationality name",name:"name",value:l.name,onChange:i})]})}),e.jsxs("div",{className:"modal-footer",children:[e.jsx("a",{href:"#",className:"btn btn-link link-secondary","data-bs-dismiss":"modal",children:"Cancel"}),e.jsx("button",{className:"btn btn-primary ms-auto","data-bs-dismiss":"modal",type:"button",onClick:h,children:"Update Place Of Issue"})]})]})})}),e.jsx("div",{className:"modal modal-blur fade",id:"delete-user",tabindex:"-1",role:"dialog","aria-hidden":"true",children:e.jsx("div",{className:"modal-dialog modal-lg modal-dialog-centered",role:"document",children:e.jsxs("div",{className:"modal-content",children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h5",{className:"modal-title",children:"Delete Nationality"}),e.jsx("button",{type:"button",className:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})]}),e.jsx("div",{className:"modal-body",children:e.jsx("span",{children:"Are you sure you want to delete nationality?"})}),e.jsxs("div",{className:"modal-footer",children:[e.jsx("a",{href:"#",className:"btn btn-link link-secondary","data-bs-dismiss":"modal",children:"Cancel"}),e.jsx("button",{className:"btn btn-primary ms-auto","data-bs-dismiss":"modal",type:"button",onClick:()=>x(l.id),children:"Delete Nationality"})]})]})})})]})}export{A as default};
