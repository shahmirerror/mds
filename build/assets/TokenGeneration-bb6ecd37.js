import{r,j as e,a as p}from"./app-b520917d.js";import{G as v}from"./GuestLayout-8642b3d7.js";import"./TextInput-f96658f4.js";import{Q as u,B as i}from"./ReactToastify-a3207ea2.js";import{c as n}from"./createReactComponent-ec56704d.js";import"./index-d60a9fbe.js";var j=n("clipboard-text","IconClipboardText",[["path",{d:"M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2",key:"svg-0"}],["path",{d:"M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z",key:"svg-1"}],["path",{d:"M9 12h6",key:"svg-2"}],["path",{d:"M9 16h6",key:"svg-3"}]]),b=n("crosshair","IconCrosshair",[["path",{d:"M4 8v-2a2 2 0 0 1 2 -2h2",key:"svg-0"}],["path",{d:"M4 16v2a2 2 0 0 0 2 2h2",key:"svg-1"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v2",key:"svg-2"}],["path",{d:"M16 20h2a2 2 0 0 0 2 -2v-2",key:"svg-3"}],["path",{d:"M9 12l6 0",key:"svg-4"}],["path",{d:"M12 9l0 6",key:"svg-5"}]]);function O({centres:c}){const[a,d]=r.useState(null),[k,h]=r.useState(null),l=(s,o)=>{const g={centre_id:a.id,token_type:o},m=JSON.stringify(g);try{const x=fetch(route("token.new"),{method:"POST",body:m}).then(t=>t.json()).then(t=>{h("M"+t.token_no),i.success("New Token has been generated!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})},t=>{i.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})})}catch{i.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}};return r.useEffect(()=>{},[]),e.jsxs(v,{children:[e.jsx(p,{title:"Token Generation"}),e.jsx(u,{position:"top-right",autoClose:5e3,hideProgressBar:!1,newestOnTop:!1,closeOnClick:!0,rtl:!1,pauseOnFocusLoss:!0,draggable:!0,pauseOnHover:!0,theme:"light"}),e.jsx("div",{className:"page page-center",style:{backgroundImage:"url(./assets/static/photos/mdsbackground.png)",height:"100vh",blur:"10%"},children:e.jsxs("div",{className:"p-6",children:[a==null?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"row g-4",id:"project_logo",children:e.jsx("div",{className:"col-lg",children:e.jsx("div",{style:{maxWidth:"15rem"},children:e.jsx("div",{className:"text-center mb-4",children:e.jsx("div",{className:"card card-sm",children:e.jsx("div",{className:"card-body",children:e.jsx("a",{href:".",className:"navbar-brand navbar-brand-autodark",children:e.jsx("img",{src:"./assets/static/logomls.svg",height:"50",alt:""})})})})})})})}),e.jsx("div",{className:"row align-items-center g-4 mt-7",id:"choose_centres",children:c.map((s,o)=>e.jsx("div",{className:"col-md-3",onClick:()=>d(s),children:e.jsx("div",{className:"card card-sm",children:e.jsx("div",{className:"card-body",style:{justifyContent:"center",display:"flex"},children:(s==null?void 0:s.image)!==null?e.jsx("img",{src:`./storage/app/public/centres/logos/${s==null?void 0:s.image}`,height:"100"}):e.jsx("h1",{className:"text-center",children:s==null?void 0:s.name})})})}))})]}):e.jsx(e.Fragment,{}),a!==null?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"row g-4",id:"centre_logo",children:e.jsx("div",{className:"col-lg",children:e.jsx("div",{style:{maxWidth:"15rem"},children:e.jsx("div",{className:"text-center mb-4",children:e.jsx("div",{className:"card card-sm",children:e.jsx("div",{className:"card-body",children:e.jsx("a",{href:"#",className:"navbar-brand navbar-brand-autodark",children:e.jsx("img",{src:`./storage/app/public/centres/logos/${a==null?void 0:a.image}`,height:"50",alt:""})})})})})})})}),e.jsxs("div",{className:"row align-items-center g-4 mt-7",id:"choose_token",children:[e.jsx("div",{className:"col-md-6 text-center",children:e.jsxs("button",{className:"btn btn-lg",onClick:s=>l(s,"Medical"),children:[e.jsx("span",{className:"mr-1",children:e.jsx(b,{style:{width:"70px",height:"70px"}})}),e.jsx("span",{style:{fontSize:"xx-large"},children:"Medical Registration"})]})}),e.jsx("div",{className:"col-md-6 text-center",children:e.jsxs("button",{className:"btn btn-lg",onClick:s=>l(s,"Reporting"),children:[e.jsx("span",{children:e.jsx(j,{style:{width:"70px",height:"70px"}})}),e.jsx("span",{style:{fontSize:"xx-large"},children:"Report Collection"})]})})]})]}):e.jsx(e.Fragment,{})]})})]})}export{O as default};
