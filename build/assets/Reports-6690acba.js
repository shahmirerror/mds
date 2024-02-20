import{r as l,j as e,a as se}from"./app-8b5ea9c7.js";import{A as ae}from"./AuthenticatedLayout-f4b0d9e0.js";import{S as v}from"./react-select.esm-32be4dc4.js";import{Q as le,B as n}from"./ReactToastify-a39b397b.js";import{I as J}from"./IconDownload-4c468d62.js";import"./createReactComponent-cd75750e.js";import"./index-e55138a9.js";function me({auth:G}){const[A,I]=l.useState([]),[K,L]=l.useState([]),[Q,U]=l.useState([]),[i,O]=l.useState([]),[j,M]=l.useState([]),V=[{value:1,label:"January"},{value:2,label:"February"},{value:3,label:"March"},{value:4,label:"April"},{value:5,label:"May"},{value:6,label:"June"},{value:7,label:"July"},{value:8,label:"August"},{value:9,label:"September"},{value:10,label:"October"},{value:11,label:"November"},{value:12,label:"December"}],[$,d]=l.useState(null),[re,z]=l.useState(!0),[r,R]=l.useState(null),s=new Date;let y;s.getMonth()+1>=10?y=s.getFullYear()-1+"-"+(s.getMonth()+1)+"-"+s.getDate():y=s.getFullYear()-1+"-0"+(s.getMonth()+1)+"-"+s.getDate();const c=new Date(y),[b,F]=l.useState(s.getFullYear()+"-"+s.getMonth()+1+"-"+s.getDate()),[C,_]=l.useState(s.getFullYear()),[N,q]=l.useState(s.getMonth()+1),[k,P]=l.useState(s.getFullYear()+"-"+s.getMonth()+1+"-"+s.getDate()),[D,Y]=l.useState(c.getFullYear()+"-"+c.getMonth()+1+"-"+c.getDate()),[h,E]=l.useState(null),[u,T]=l.useState(0),[w,B]=l.useState([]),W=()=>{try{const t=fetch(route("super.reports.fetch_centres"),{method:"GET"}).then(a=>a.json()).then(a=>{I(a.centres)},a=>{console.log(a)})}catch(t){console.error(t)}},X=()=>{try{const t=fetch(route("super.reports.fetch_reports"),{method:"GET"}).then(a=>a.json()).then(a=>{L(a.modules)},a=>{console.log(a)})}catch(t){console.error(t)}},Z=()=>{try{const t=fetch(route("super.reports.fetch_countries"),{method:"GET"}).then(a=>a.json()).then(a=>{U(a.countries)},a=>{console.log(a)})}catch(t){console.error(t)}},ee=t=>{t.preventDefault(),z(!0),d(null),R(null),F(s.getFullYear()+"-"+s.getMonth()+1+"-"+s.getDate()),_(s.getFullYear()),q(s.getMonth()+1),P(s.getFullYear()+"-"+s.getMonth()+1+"-"+s.getDate()),Y(c.getFullYear()+"-"+c.getMonth()+1+"-"+c.getDate()),T(0),E(0),B([]),O([]),M([])},te=t=>{if(t.preventDefault(),r==null)S("Data Frequency");else if(u==0)S("Centre");else if(h==null)S("Report Type");else{d(["generate"]);const m=JSON.stringify({datafreq:r,dailydate:b,monthlydate:N,yearlydate:C,fromRange:D,toRange:k,centreID:u,countries:w,report_type:h});try{const x=fetch(route("super.reports.generate_report"),{method:"POST",body:m}).then(o=>o.json()).then(o=>{var f;O(o.data),M(o.keys),d(null),((f=o.data)==null?void 0:f.length)>0?n.success("Report has been generated!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}):n.error("No data could be find based on your query!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})},o=>{d(null),n.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})})}catch{d(null),n.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}}},p=t=>{R(t.target.value)},S=t=>{n.warning("Please select a "+t+" first!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})},H=t=>{t.preventDefault();const m=JSON.stringify({datafreq:r,dailydate:b,monthlydate:N,yearlydate:C,fromRange:D,toRange:k,centreID:u,countries:w,report_type:h,keys:j,data:i});try{const x=fetch(route("super.reports.export_report",t.target.value),{method:"POST",body:m}).then(o=>o.json()).then(o=>{document.body.removeChild(g),n.success("Report has been exported!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"});const f=o.filename,g=document.createElement("a");g.href=f,g.download=data.filename,document.body.appendChild(g),g.click()},o=>{n.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})})}catch{n.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}};return l.useEffect(()=>{X(),W(),Z()},[]),e.jsxs(ae,{user:G.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Reports"}),children:[e.jsx(se,{title:"Reports"}),e.jsx(le,{position:"top-right",autoClose:5e3,hideProgressBar:!1,newestOnTop:!1,closeOnClick:!0,rtl:!1,pauseOnFocusLoss:!0,draggable:!0,pauseOnHover:!0,theme:"light"}),e.jsx("div",{className:"page-header d-print-none",children:e.jsx("div",{className:"container-xl",children:e.jsx("div",{className:"row g-2 align-items-center",children:e.jsx("div",{className:"col",children:e.jsx("h2",{className:"page-title",children:"Reports"})})})})}),e.jsx("div",{className:"page-body",children:e.jsxs("div",{className:"container-xl",children:[e.jsxs("div",{className:"row row-deck row-cards",children:[e.jsx("div",{className:"col-sm-6 col-lg-3",children:e.jsxs("div",{style:{width:"100%"},children:[e.jsx("div",{className:"form-label",children:"Select Centre"}),e.jsx(v,{options:A,value:u,name:"centreID",onChange:T})]})}),e.jsx("div",{className:"col-sm-6 col-lg-3",children:e.jsxs("div",{children:[e.jsx("div",{className:"form-label",children:"Data Frequency"}),e.jsxs("div",{children:[e.jsxs("label",{className:"form-check form-check-inline",children:[e.jsx("input",{className:"form-check-input",type:"radio",name:"data_freq",value:"Daily",checked:r=="Daily",onChange:p}),e.jsx("span",{className:"form-check-label",children:"Daily"})]}),e.jsxs("label",{className:"form-check form-check-inline",children:[e.jsx("input",{className:"form-check-input",type:"radio",name:"data_freq",value:"Yearly",checked:r=="Yearly",onChange:p}),e.jsx("span",{className:"form-check-label",children:"Yearly"})]}),e.jsxs("label",{className:"form-check form-check-inline",children:[e.jsx("input",{className:"form-check-input",type:"radio",name:"data_freq",value:"Monthly",checked:r=="Monthly",onChange:p}),e.jsx("span",{className:"form-check-label",children:"Monthly"})]}),e.jsxs("label",{className:"form-check form-check-inline",children:[e.jsx("input",{className:"form-check-input",type:"radio",name:"data_freq",value:"Custom Date Range",checked:r=="Custom Date Range",onChange:p}),e.jsx("span",{className:"form-check-label",children:"Custom Date Range"})]})]})]})}),r=="Daily"?e.jsx("div",{className:"col-sm-6 col-lg-3",children:e.jsxs("div",{children:[e.jsx("div",{className:"form-label",children:"Choose Date"}),e.jsx("input",{className:"form-control",type:"date",name:"daily_date",value:b,onChange:t=>F(t.target.value)})]})}):r=="Monthly"?e.jsx("div",{className:"col-sm-6 col-lg-3",children:e.jsxs("div",{children:[e.jsx("div",{className:"form-label",children:"Choose Month(s)"}),e.jsx(v,{options:V,value:N,name:"monthly_date",onChange:q})]})}):r=="Yearly"?e.jsx("div",{className:"col-sm-6 col-lg-3",children:e.jsxs("div",{children:[e.jsx("div",{className:"form-label",children:"Choose Year"}),e.jsx("input",{className:"form-control",type:"text",name:"yearly_date",placeholder:"Enter Year e.g. 2024",value:C,onChange:t=>_(t.target.value)})]})}):r=="Custom Date Range"?e.jsxs("div",{className:"col-sm-6 col-lg-3",style:{justifyContent:"space-between"},children:[e.jsxs("div",{children:[e.jsx("div",{className:"form-label",children:"From"}),e.jsx("input",{className:"form-control form-date-picker",type:"date",name:"from_date_range",value:D,onChange:t=>Y(t.target.value)})]}),e.jsxs("div",{children:[e.jsx("div",{className:"form-label",children:"To"}),e.jsx("input",{className:"form-control",type:"date",name:"to_date_range",value:k,onChange:t=>P(t.target.value)})]})]}):e.jsx(e.Fragment,{})]}),e.jsxs("div",{className:"row row-deck row-cards",children:[e.jsx("div",{className:"col-sm-6 col-lg-3",children:e.jsxs("div",{style:{width:"100%"},children:[e.jsx("div",{className:"form-label",children:"Report Type"}),e.jsx(v,{options:K,value:h,name:"report_type",onChange:E})]})}),e.jsx("div",{className:"col-sm-6 col-lg-3",children:e.jsxs("div",{style:{width:"100%"},children:[e.jsx("div",{className:"form-label",children:"Countries"}),e.jsx(v,{options:Q,value:w,name:"country",isMulti:!0,onChange:B})]})})]}),e.jsx("div",{className:"mt-3 row row-deck row-cards mb-3",style:{justifyContent:"flex-end"},children:e.jsx("div",{className:"col-sm-6 col-lg-3",style:{justifyContent:"space-between"},children:e.jsxs("div",{className:"col-12",style:{display:"inline-flex",justifyContent:"space-between"},children:[e.jsx("button",{type:"submit",className:"btn btn-primary",onClick:te,disabled:$!==null,children:"Generate Report"}),e.jsx("button",{type:"submit",className:"btn btn-secondary",disabled:u==0&&h==0&&r==null,onClick:ee,children:"Reset Selection"})]})})}),(i==null?void 0:i.length)>0?e.jsx("div",{className:"row row-deck row-cards",children:e.jsxs("div",{class:"card",children:[e.jsxs("div",{className:"card-header",style:{display:"inline-flex",justifyContent:"space-between"},children:[e.jsx("h2",{class:"page-title",children:"Query Result"}),e.jsxs("div",{children:[e.jsxs("button",{className:"btn btn-sm btn-success text-white mr-2",value:"csv",onClick:H,children:["Export CSV",e.jsx(J,{})]}),e.jsxs("button",{className:"btn btn-sm btn-danger text-white ml-2",value:"pdf",onClick:H,children:["Export PDF",e.jsx(J,{})]})]})]}),e.jsx("div",{class:"card-body",children:e.jsx("div",{id:"table-default",class:"table-responsive",children:e.jsxs("table",{class:"table",children:[e.jsx("thead",{children:e.jsx("tr",{children:j.map((t,a)=>e.jsx("th",{children:e.jsx("button",{class:"table-sort","data-sort":"sort-name",children:t.name.replaceAll("_"," ")})}))})}),e.jsx("tbody",{class:"table-tbody",children:i.map((t,a)=>e.jsx("tr",{children:j.map((m,x)=>e.jsx("td",{class:"sort-name",children:t[m.name]}))}))})]})})})]})}):e.jsx(e.Fragment,{})]})})]})}export{me as default};