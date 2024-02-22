import{r as a,j as e,a as ae}from"./app-4431c5fe.js";import{A as le}from"./AuthenticatedLayout-59639fa7.js";import{S as R}from"./react-select.esm-7f25b372.js";import{Q as re,B as n}from"./ReactToastify-4595696f.js";import{I as A}from"./IconDownload-92fc1ae9.js";import"./createReactComponent-3ce27679.js";import"./index-23e86464.js";function pe({auth:O}){a.useState([]);const[I,L]=a.useState([]),[Q,K]=a.useState([]),[M,F]=a.useState([]),[g,v]=a.useState([]),[y,q]=a.useState([]),[U,V]=a.useState([]),$=[{value:1,label:"January"},{value:2,label:"February"},{value:3,label:"March"},{value:4,label:"April"},{value:5,label:"May"},{value:6,label:"June"},{value:7,label:"July"},{value:8,label:"August"},{value:9,label:"September"},{value:10,label:"October"},{value:11,label:"November"},{value:12,label:"December"}],[z,u]=a.useState(null),[oe,W]=a.useState(!0),[o,_]=a.useState(null),s=new Date;let j;s.getMonth()+1>=10?j=s.getFullYear()-1+"-"+(s.getMonth()+1)+"-"+s.getDate():j=s.getFullYear()-1+"-0"+(s.getMonth()+1)+"-"+s.getDate();const i=new Date(j),[b,P]=a.useState(s.getFullYear()+"-"+s.getMonth()+1+"-"+s.getDate()),[C,Y]=a.useState(s.getFullYear()),[N,E]=a.useState(s.getMonth()+1),[k,B]=a.useState(s.getFullYear()+"-"+s.getMonth()+1+"-"+s.getDate()),[D,T]=a.useState(i.getFullYear()+"-"+i.getMonth()+1+"-"+i.getDate()),[h,H]=a.useState(null),[p,ne]=a.useState(O.centre.id),[w,J]=a.useState([]),X=()=>{try{const t=fetch(route("admin.reports.fetch_reports"),{method:"GET"}).then(l=>l.json()).then(l=>{L(l.modules)},l=>{console.log(l)})}catch(t){console.error(t)}},Z=()=>{try{const t=fetch(route("admin.reports.fetch_countries"),{method:"GET"}).then(l=>l.json()).then(l=>{K(l.countries)},l=>{console.log(l)})}catch(t){console.error(t)}},ee=t=>{t.preventDefault(),W(!0),u(null),_(null),P(s.getFullYear()+"-"+s.getMonth()+1+"-"+s.getDate()),Y(s.getFullYear()),E(s.getMonth()+1),B(s.getFullYear()+"-"+s.getMonth()+1+"-"+s.getDate()),T(i.getFullYear()+"-"+i.getMonth()+1+"-"+i.getDate()),H(0),J([]),F([]),v([]),q([])},te=async t=>{if(t.preventDefault(),o==null)S("Data Frequency");else if(p==0)S("Centre");else if(h==0)S("Report Type");else{u(["generate"]);const c=JSON.stringify({datafreq:o,dailydate:b,monthlydate:N,yearlydate:C,fromRange:D,toRange:k,centreID:p,countries:w,report_type:h});try{const d=await n.promise(fetch(route("admin.reports.generate_report"),{method:"POST",body:c}),{pending:"Fetching Report"}).then(r=>r.json()).then(r=>{var f;F(r.data),v(r.data),q(r.keys),u(null),((f=r.data)==null?void 0:f.length)>0?n.success("Report has been generated!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}):n.error("No data could be find based on your query!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})},r=>{u(null),n.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})})}catch{u(null),n.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}}},x=t=>{_(t.target.value)},S=t=>{n.warning("Please select a "+t+" first!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})},G=async t=>{t.preventDefault();const c=JSON.stringify({datafreq:o,dailydate:b,monthlydate:N,yearlydate:C,fromRange:D,toRange:k,centreID:p,countries:w,report_type:h,keys:y,data:M});try{const d=await n.promise(fetch(route("admin.reports.export_report",t.target.value),{method:"POST",body:c}),{pending:"Generating File"}).then(r=>r.json()).then(r=>{document.body.removeChild(m),n.success("Report has been exported!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"});const f=r.filename,m=document.createElement("a");m.href=f,m.download=data.filename,document.body.appendChild(m),m.click()},r=>{n.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})})}catch{n.error("Something went wrong! Please try again :(",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}},se=t=>{const l=t.target.value;V(l);const c=M.filter(d=>Object.values(d).some(r=>typeof r=="string"&&r.toLowerCase().includes(l.toLowerCase())));v(c)};return a.useEffect(()=>{X(),Z()},[]),e.jsxs(le,{user:O.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Reports"}),children:[e.jsx(ae,{title:"Reports"}),e.jsx(re,{position:"top-right",autoClose:5e3,hideProgressBar:!1,newestOnTop:!1,closeOnClick:!0,rtl:!1,pauseOnFocusLoss:!0,draggable:!0,pauseOnHover:!0,theme:"light"}),e.jsx("div",{className:"page-header d-print-none",children:e.jsx("div",{className:"container-xl",children:e.jsx("div",{className:"row g-2 align-items-center",children:e.jsx("div",{className:"col",children:e.jsx("h2",{className:"page-title",children:"Reports"})})})})}),e.jsx("div",{className:"page-body",children:e.jsxs("div",{className:"container-xl",children:[e.jsxs("div",{className:"row row-deck row-cards",children:[e.jsx("div",{className:"col-sm-6 col-lg-3",children:e.jsxs("div",{style:{width:"100%"},children:[e.jsx("div",{className:"form-label",children:"Report Type"}),e.jsx(R,{options:I,value:h,name:"report_type",onChange:H})]})}),e.jsx("div",{className:"col-sm-6 col-lg-3",children:e.jsxs("div",{children:[e.jsx("div",{className:"form-label",children:"Data Frequency"}),e.jsxs("div",{children:[e.jsxs("label",{className:"form-check form-check-inline",children:[e.jsx("input",{className:"form-check-input",type:"radio",name:"data_freq",value:"Daily",checked:o=="Daily",onChange:x}),e.jsx("span",{className:"form-check-label",children:"Daily"})]}),e.jsxs("label",{className:"form-check form-check-inline",children:[e.jsx("input",{className:"form-check-input",type:"radio",name:"data_freq",value:"Yearly",checked:o=="Yearly",onChange:x}),e.jsx("span",{className:"form-check-label",children:"Yearly"})]}),e.jsxs("label",{className:"form-check form-check-inline",children:[e.jsx("input",{className:"form-check-input",type:"radio",name:"data_freq",value:"Monthly",checked:o=="Monthly",onChange:x}),e.jsx("span",{className:"form-check-label",children:"Monthly"})]}),e.jsxs("label",{className:"form-check form-check-inline",children:[e.jsx("input",{className:"form-check-input",type:"radio",name:"data_freq",value:"Custom Date Range",checked:o=="Custom Date Range",onChange:x}),e.jsx("span",{className:"form-check-label",children:"Custom Date Range"})]})]})]})}),o=="Daily"?e.jsx("div",{className:"col-sm-6 col-lg-3",children:e.jsxs("div",{children:[e.jsx("div",{className:"form-label",children:"Choose Date"}),e.jsx("input",{className:"form-control",type:"date",name:"daily_date",value:b,onChange:t=>P(t.target.value)})]})}):o=="Monthly"?e.jsx("div",{className:"col-sm-6 col-lg-3",children:e.jsxs("div",{children:[e.jsx("div",{className:"form-label",children:"Choose Month(s)"}),e.jsx(R,{options:$,value:N,name:"monthly_date",onChange:E})]})}):o=="Yearly"?e.jsx("div",{className:"col-sm-6 col-lg-3",children:e.jsxs("div",{children:[e.jsx("div",{className:"form-label",children:"Choose Year"}),e.jsx("input",{className:"form-control",type:"text",name:"yearly_date",placeholder:"Enter Year e.g. 2024",value:C,onChange:t=>Y(t.target.value)})]})}):o=="Custom Date Range"?e.jsxs("div",{className:"col-sm-6 col-lg-3",style:{justifyContent:"space-between"},children:[e.jsxs("div",{children:[e.jsx("div",{className:"form-label",children:"From"}),e.jsx("input",{className:"form-control form-date-picker",type:"date",name:"from_date_range",value:D,onChange:t=>T(t.target.value)})]}),e.jsxs("div",{children:[e.jsx("div",{className:"form-label",children:"To"}),e.jsx("input",{className:"form-control",type:"date",name:"to_date_range",value:k,onChange:t=>B(t.target.value)})]})]}):e.jsx(e.Fragment,{})]}),e.jsx("div",{className:"row row-deck row-cards",children:e.jsx("div",{className:"col-sm-6 col-lg-3",children:e.jsxs("div",{style:{width:"100%"},children:[e.jsx("div",{className:"form-label",children:"Countries"}),e.jsx(R,{options:Q,value:w,name:"country",isMulti:!0,onChange:J})]})})}),e.jsx("div",{className:"mt-3 row row-deck row-cards mb-3",style:{justifyContent:"flex-end"},children:e.jsx("div",{className:"col-sm-6 col-lg-3",style:{justifyContent:"space-between"},children:e.jsxs("div",{className:"col-12",style:{display:"inline-flex",justifyContent:"space-between"},children:[e.jsx("button",{type:"submit",className:"btn btn-primary",onClick:te,disabled:z!==null,children:"Generate Report"}),e.jsx("button",{type:"submit",className:"btn btn-secondary",disabled:p==0&&h==0&&o==null,onClick:ee,children:"Reset Selection"})]})})}),(g==null?void 0:g.length)>0?e.jsx("div",{className:"row row-deck row-cards",children:e.jsxs("div",{class:"card",children:[e.jsxs("div",{className:"card-header",style:{display:"inline-flex",justifyContent:"space-between"},children:[e.jsx("h2",{class:"page-title",children:"Query Result"}),e.jsxs("div",{children:[e.jsxs("button",{className:"btn btn-sm btn-success text-white mr-2",value:"csv",onClick:G,children:["Export CSV",e.jsx(A,{})]}),e.jsxs("button",{className:"btn btn-sm btn-danger text-white ml-2",value:"pdf",onClick:G,children:["Export PDF",e.jsx(A,{})]})]})]}),e.jsx("div",{class:"card-body border-bottom py-3",children:e.jsx("div",{class:"d-flex",children:e.jsxs("div",{class:"ms-auto text-secondary",children:["Search:",e.jsx("div",{class:"ms-2 d-inline-block",children:e.jsx("input",{type:"text",class:"form-control form-control-sm","aria-label":"Search",value:U,onChange:se})})]})})}),e.jsx("div",{class:"card-body",children:e.jsx("div",{id:"table-default",class:"table-responsive",children:e.jsxs("table",{class:"table",children:[e.jsx("thead",{children:e.jsx("tr",{children:y.map((t,l)=>e.jsx("th",{children:e.jsx("button",{class:"table-sort","data-sort":"sort-name",children:t.name.replaceAll("_"," ")})}))})}),e.jsx("tbody",{class:"table-tbody",children:g.map((t,l)=>e.jsx("tr",{children:y.map((c,d)=>e.jsx("td",{class:"sort-name",children:t[c.name]}))}))})]})})})]})}):e.jsx(e.Fragment,{})]})})]})}export{pe as default};
