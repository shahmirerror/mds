import{r as u,W as C,j as e,a as w}from"./app-060f6990.js";import{A as k}from"./AuthenticatedLayout-d604710e.js";import{I}from"./IconUserPlus-998d038b.js";import{I as S}from"./IconTrash-dfe591ba.js";import"./createReactComponent-6e009751.js";import"./index-a8cda3f0.js";function D(x){const[t,d]=u.useState([{id:1,username:"",password:"",role:"Staff"}]),o=u.useState([x.modules]),{data:j,setData:i,post:f,processing:p,errors:R,reset:E}=C({name:"",phone:"",city:"",country:"",address:"",logo:"",users:t,modules:o[0][0]}),n=s=>{i(s.target.name,s.target.value)},N=s=>{console.log(s.target.files[0]),i(s.target.name,s.target.files[0])},g=s=>{s.preventDefault(),f(route("centres.store"))},m=(s,a)=>{document.getElementById("basic-information").style.display="none",document.getElementById("users").style.display="none",document.getElementById("modules").style.display="none",document.getElementById(a).style.display="block"},v=()=>{const s={id:t.length+1,username:"",password:"",role:"Staff"};d([...t,s])},h=(s,a,l)=>{const r=t.map(c=>c.id===l?{...c,[a]:s.target.value}:c);d(r),i("users",r)},b=s=>{const a=t.filter(l=>l.id!==s);d(a)},y=(s,a,l)=>{let r=s.target.checked?"On":"Off",c=s.target.checked;o[0][0][l].status=c,i("modules",o[0][0]),document.getElementById(`switchlabel${l}`).innerHTML=r};return e.jsxs(k,{user:x.auth.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Centres Management"}),children:[e.jsx(w,{title:"Centres Management"}),e.jsx("div",{className:"page-header d-print-none",children:e.jsx("div",{className:"container-xl",children:e.jsx("div",{className:"row g-2 align-items-center",children:e.jsx("div",{className:"col",children:e.jsx("h2",{className:"page-title",children:"Create a new Centre"})})})})}),e.jsx("div",{className:"page-body",children:e.jsx("div",{className:"container-xl",children:e.jsx("div",{className:"card",children:e.jsxs("div",{className:"row g-0",children:[e.jsx("div",{className:"col-12 col-md-2 border-end",children:e.jsxs("div",{className:"card-body",children:[e.jsx("h4",{className:"subheader",children:"Centre settings"}),e.jsxs("div",{className:"list-group list-group-transparent",children:[e.jsx("a",{href:"#",className:"list-group-item list-group-item-action d-flex align-items-center",onClick:s=>m(s,"basic-information"),children:"Basic Information"}),e.jsx("a",{href:"#",className:"list-group-item list-group-item-action d-flex align-items-center",onClick:s=>m(s,"users"),children:"Centre Staff"}),e.jsx("a",{href:"#",className:"list-group-item list-group-item-action d-flex align-items-center",onClick:s=>m(s,"modules"),children:"Centre Lab Modules"})]})]})}),e.jsxs("div",{className:"col-12 col-md-10 d-flex flex-column",children:[e.jsxs("div",{className:"card-body",id:"basic-information",children:[e.jsx("h3",{className:"card-title",children:"Logo"}),e.jsx("div",{className:"row align-items-center",children:e.jsx("div",{className:"col-auto",children:e.jsx("input",{className:"form-control",type:"file",name:"logo",onChange:N})})}),e.jsx("h3",{className:"card-title mt-4",children:"Information"}),e.jsxs("div",{className:"row mb-3",children:[e.jsxs("div",{className:"col-md",children:[e.jsx("div",{className:"form-label",children:"Name"}),e.jsx("input",{type:"text",className:"form-control",name:"name",onChange:n})]}),e.jsxs("div",{className:"col-md",children:[e.jsx("div",{className:"form-label",children:"City"}),e.jsx("input",{type:"text",className:"form-control",name:"city",onChange:n})]}),e.jsxs("div",{className:"col-md",children:[e.jsx("div",{className:"form-label",children:"Country"}),e.jsx("input",{type:"text",className:"form-control",name:"country",onChange:n})]})]}),e.jsxs("div",{className:"row g-3",children:[e.jsxs("div",{className:"col-md",children:[e.jsx("div",{className:"form-label",children:"Phone"}),e.jsx("input",{type:"text",className:"form-control",name:"phone",onChange:n})]}),e.jsxs("div",{className:"col-md",children:[e.jsx("div",{className:"form-label",children:"Address"}),e.jsx("input",{type:"text",className:"form-control",name:"address",onChange:n})]})]})]}),e.jsxs("div",{className:"card-body",id:"users",style:{display:"none"},children:[e.jsxs("div",{className:"row mb-3",children:[e.jsx("h3",{className:"card-title",style:{float:"left",width:"90%"},children:"Centre Staff"}),e.jsx("a",{href:"#",type:"button",className:"btn btn-sm btn-success",style:{float:"right",width:"5%"},onClick:v,children:e.jsx(I,{})}),e.jsx("div",{style:{clear:"both"}})]}),t.map((s,a)=>e.jsxs("div",{className:"row mb-3",children:[e.jsx("div",{className:"col-sm",style:{display:"flex",alignItems:"end"},children:e.jsx("button",{type:"button",className:"btn btn-md btn-danger",onClick:()=>b(s.id),children:e.jsx(S,{})})}),e.jsxs("div",{className:"col-md",children:[e.jsx("div",{className:"form-label",children:"Username"}),e.jsx("input",{type:"text",className:"form-control",name:"username",value:s.username,onChange:l=>h(l,"username",s.id)})]}),e.jsxs("div",{className:"col-md",children:[e.jsx("div",{className:"form-label",children:"Password"}),e.jsx("input",{type:"password",className:"form-control",name:"password",value:s.password,onChange:l=>h(l,"password",s.id)})]}),e.jsxs("div",{className:"col-md",children:[e.jsx("div",{className:"form-label",children:"Role"}),e.jsxs("select",{class:"form-select",name:"role",onChange:l=>h(l,"role",s.id),children:[e.jsx("option",{value:"Admin",children:"Admin"}),e.jsx("option",{value:"Staff",selected:!0,children:"Staff"})]})]})]},a))]}),e.jsxs("div",{className:"card-body",id:"modules",style:{display:"none"},children:[e.jsx("h3",{className:"card-title",children:"Centre Lab Modules"}),e.jsx("hr",{}),j.modules.map((s,a)=>e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"col-md-5 m-3",style:{display:"inline-flex",justifyContent:"space-between"},children:[e.jsxs("div",{children:[e.jsx("div",{className:"form-label",children:s==null?void 0:s.title}),e.jsx("div",{className:"form-desc",children:s==null?void 0:s.description})]}),e.jsx("div",{children:e.jsxs("label",{className:"form-check form-switch",children:[e.jsx("input",{className:"form-check-input",type:"checkbox",id:`switch${a}`,name:`switch${a}`,checked:s.status,onChange:l=>y(l,s.id,a)}),e.jsx("span",{class:"form-check-label",id:`switchlabel${a}`,children:s!=null&&s.status?"On":"Off"})]})})]}),(a+1)%2==0?e.jsx("hr",{}):""]}))]}),e.jsx("div",{className:"card-footer bg-transparent mt-auto",children:e.jsxs("div",{className:"btn-list justify-content-end",children:[e.jsx("a",{href:route("centres.index"),className:"btn",children:"Cancel"}),e.jsx("a",{href:"#",className:"btn btn-primary",type:"button",onClick:g,disabled:p,children:"Submit"})]})})]})]})})})})]})}export{D as default};
