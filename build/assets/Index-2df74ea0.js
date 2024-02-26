import{W as c,r as m,j as s,a as h}from"./app-e59b4425.js";import{A as x}from"./AuthenticatedLayout-37843d7a.js";import{Q as j}from"./ReactToastify-04442846.js";import{I as p}from"./IconPencil-e0f41224.js";import{I as i}from"./IconPower-fae21fb3.js";import{I as u}from"./IconTrash-67ba9558.js";import"./createReactComponent-b7d89a71.js";import"./index-5c5e5c96.js";function M(a){const{delete:d,put:t}=c(),[n,o]=m.useState(),r=e=>{d(route("centres.destroy",e))},l=e=>{t(route("centres.suspend",e))};return s.jsxs(x,{user:a.auth.user,header:s.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Centres Management"}),children:[s.jsx(h,{title:"Centres Management"}),s.jsx(j,{position:"top-right",autoClose:5e3,hideProgressBar:!1,newestOnTop:!1,closeOnClick:!0,rtl:!1,pauseOnFocusLoss:!0,draggable:!0,pauseOnHover:!0,theme:"light"}),s.jsx("div",{className:"page-header d-print-none",children:s.jsx("div",{className:"container-xl",children:s.jsxs("div",{className:"row g-2 align-items-center",children:[s.jsx("div",{className:"col",children:s.jsx("h2",{className:"page-title",children:"Centres Management"})}),s.jsx("div",{className:"col-auto ms-auto d-print-none",children:s.jsx("div",{className:"d-flex",children:s.jsxs("a",{href:route("centres.create"),className:"btn btn-primary",children:[s.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",className:"icon",width:"24",height:"24",viewBox:"0 0 24 24","stroke-width":"2",stroke:"currentColor",fill:"none","stroke-linecap":"round","stroke-linejoin":"round",children:[s.jsx("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),s.jsx("path",{d:"M12 5l0 14"}),s.jsx("path",{d:"M5 12l14 0"})]}),"New centre"]})})})]})})}),s.jsx("div",{className:"page-body",children:s.jsxs("div",{className:"container-xl",children:[s.jsx("div",{className:"row row-cards",children:a.data.map((e,g)=>s.jsx("div",{className:"col-md-6 col-lg-3",children:s.jsxs("div",{className:"card",children:[s.jsxs("div",{className:"card-body p-4 text-center",children:[(e==null?void 0:e.image)!=null?s.jsx("img",{class:"mb-3 rounded",style:{width:"10rem",height:"3.5rem"},src:"./../storage/app/public/centres/logos/"+(e==null?void 0:e.image)}):s.jsx(s.Fragment,{}),s.jsx("h3",{className:"m-0 mb-1",children:s.jsx("a",{href:"#",children:e==null?void 0:e.name})}),s.jsxs("div",{className:"text-secondary",children:[(e==null?void 0:e.city)!=null?(e==null?void 0:e.city)+", ":"",(e==null?void 0:e.country)!=null?e==null?void 0:e.country:"No Location Specified"]}),s.jsx("div",{className:"mt-3",children:s.jsx("span",{className:"badge bg-purple-lt",children:e==null?void 0:e.status})})]}),s.jsxs("div",{className:"d-flex",children:[s.jsx("a",{href:route("centres.edit",e.id),className:"card-btn",children:s.jsx(p,{})}),(e==null?void 0:e.status)=="Active"?s.jsx("a",{href:"#",className:"card-btn text-danger",type:"button",onClick:()=>l(e.id),children:s.jsx(i,{})}):s.jsx("a",{href:"#",className:"card-btn text-success",type:"button",onClick:()=>l(e.id),children:s.jsx(i,{})}),s.jsx("a",{href:"#",className:"card-btn","data-bs-toggle":"modal","data-bs-target":"#delete-centre",onClick:()=>o(e.id),children:s.jsx(u,{})})]})]})}))}),s.jsx("div",{className:"d-flex mt-4 d-none",children:s.jsxs("ul",{className:"pagination ms-auto",children:[s.jsx("li",{className:"page-item disabled",children:s.jsxs("a",{className:"page-link",href:"#",tabindex:"-1","aria-disabled":"true",children:[s.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",className:"icon",width:"24",height:"24",viewBox:"0 0 24 24","stroke-width":"2",stroke:"currentColor",fill:"none","stroke-linecap":"round","stroke-linejoin":"round",children:[s.jsx("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),s.jsx("path",{d:"M15 6l-6 6l6 6"})]}),"prev"]})}),s.jsx("li",{className:"page-item",children:s.jsx("a",{className:"page-link",href:"#",children:"1"})}),s.jsx("li",{className:"page-item active",children:s.jsx("a",{className:"page-link",href:"#",children:"2"})}),s.jsx("li",{className:"page-item",children:s.jsx("a",{className:"page-link",href:"#",children:"3"})}),s.jsx("li",{className:"page-item",children:s.jsx("a",{className:"page-link",href:"#",children:"4"})}),s.jsx("li",{className:"page-item",children:s.jsx("a",{className:"page-link",href:"#",children:"5"})}),s.jsx("li",{className:"page-item",children:s.jsxs("a",{className:"page-link",href:"#",children:["next",s.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",className:"icon",width:"24",height:"24",viewBox:"0 0 24 24","stroke-width":"2",stroke:"currentColor",fill:"none","stroke-linecap":"round","stroke-linejoin":"round",children:[s.jsx("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),s.jsx("path",{d:"M9 6l6 6l-6 6"})]})]})})]})})]})}),s.jsx("div",{className:"modal modal-blur fade",id:"delete-centre",tabindex:"-1",role:"dialog","aria-hidden":"true",children:s.jsx("div",{className:"modal-dialog modal-lg modal-dialog-centered",role:"document",children:s.jsxs("div",{className:"modal-content",children:[s.jsxs("div",{className:"modal-header",children:[s.jsx("h5",{className:"modal-title",children:"Delete Centre"}),s.jsx("button",{type:"button",className:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})]}),s.jsx("div",{className:"modal-body",children:s.jsx("span",{children:"Are you sure you want to delete this Centre?"})}),s.jsxs("div",{className:"modal-footer",children:[s.jsx("a",{href:"#",className:"btn btn-link link-secondary","data-bs-dismiss":"modal",children:"Cancel"}),s.jsx("button",{className:"btn btn-primary ms-auto","data-bs-dismiss":"modal",type:"button",onClick:()=>r(n),children:"Delete Centre"})]})]})})})]})}export{M as default};
