import{W as i,r as d,j as s,a as u}from"./app-abaa1af2.js";import{G as p}from"./GuestLayout-b4566e01.js";import{I as o}from"./InputError-6072c340.js";import{I as x}from"./InputLabel-e6fa1478.js";import"./TextInput-2742d4cc.js";function w({status:h,canResetPassword:g}){const{data:a,setData:r,post:n,processing:l,errors:t,reset:m}=i({username:"",password:"",remember:!1});d.useEffect(()=>()=>{m("password")},[]);const c=e=>{e.preventDefault(),n(route("login"))};return s.jsxs(p,{children:[s.jsx(u,{title:"Log in"}),s.jsx("div",{className:"page page-center",style:{backgroundImage:"url(./assets/static/photos/mdsbackground.png)",height:"100vh",blur:"10%"},children:s.jsx("div",{className:"container container-normal mt-6 p-4",children:s.jsxs("div",{className:"row align-items-center g-4",children:[s.jsx("div",{className:"col-lg",children:s.jsxs("div",{className:"container-tight",children:[s.jsx("div",{className:"text-center mb-4",children:s.jsx("a",{href:".",className:"navbar-brand navbar-brand-autodark",children:s.jsx("img",{src:"./assets/static/logo-mds.svg",height:"100",alt:""})})}),s.jsx("div",{className:"card card-md",children:s.jsxs("div",{className:"card-body",children:[s.jsx("h2",{className:"h2 text-center mb-4",children:"Login to your account"}),s.jsxs("form",{onSubmit:c,autoComplete:"off",children:[s.jsxs("div",{children:[s.jsx(x,{htmlFor:"username",value:"Username"}),s.jsx("input",{id:"username",type:"text",name:"username",value:a.email,className:"form-control",autoComplete:"username",onChange:e=>r("username",e.target.value)}),s.jsx(o,{message:t.email,className:"mt-2"})]}),s.jsxs("div",{className:"mt-4",children:[s.jsx("label",{className:"form-label",children:"Password"}),s.jsx("input",{id:"password",type:"password",name:"password",value:a.password,className:"form-control",autoComplete:"current-password",onChange:e=>r("password",e.target.value)}),s.jsx(o,{message:t.password,className:"mt-2"})]}),s.jsx("div",{className:"form-footer",children:s.jsx("button",{type:"submit",className:"btn btn-primary w-100",disabled:l,children:"Log in"})})]})]})})]})}),s.jsx("div",{className:"col-lg mt-8"})]})})})]})}export{w as default};
