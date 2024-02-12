import{W as r,r as l,j as e,a,d as i}from"./app-5171a690.js";import{A as d}from"./AuthenticatedLayout-4e957625.js";function h(t){return r(),l.useState(),l.useEffect(()=>{console.log(t.candidates,"hello")},[]),e.jsxs(d,{user:t.auth.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Candidates"}),children:[e.jsx(a,{title:"Centres Management"}),e.jsx("div",{className:"page-header d-print-none",children:e.jsx("div",{className:"container-xl",children:e.jsx("div",{className:"row g-2 align-items-center",children:e.jsxs("div",{className:"col",style:{display:"inline-flex",justifyContent:"space-between"},children:[e.jsx("h2",{className:"page-title",children:"Candidates"}),e.jsx("div",{children:e.jsxs("select",{className:"form-select",children:[e.jsx("option",{value:"list",children:"List"}),e.jsx("option",{value:"token_process",children:"Token Process"}),e.jsx("option",{value:"medical_status",children:"Medical Status"})]})})]})})})}),e.jsx("div",{className:"page-body",children:e.jsx("div",{class:"container-xl",children:e.jsxs("div",{class:"card",children:[e.jsx("div",{class:"card-body border-bottom py-3",children:e.jsx("div",{class:"d-flex",children:e.jsxs("div",{class:"ms-auto text-secondary",children:["Search:",e.jsx("div",{class:"ms-2 d-inline-block",children:e.jsx("input",{type:"text",class:"form-control form-control-sm","aria-label":"Search candidate"})})]})})}),e.jsx("div",{class:"table-responsive",children:e.jsxs("table",{class:"table card-table table-vcenter text-nowrap datatable",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Candidate Name"}),e.jsx("th",{children:"Passport Number"}),e.jsx("th",{children:"CNIC Number"}),e.jsx("th",{children:"Gender"}),e.jsx("th",{children:"Date of Birth"}),e.jsx("th",{children:"Created At"})]})}),e.jsx("tbody",{children:t.candidates.map((s,n)=>e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(i,{href:route("candidates.show",s==null?void 0:s.candidate_id),children:s==null?void 0:s.candidate_name})}),e.jsx("td",{children:e.jsx("span",{class:"text-secondary",children:e.jsx(i,{href:route("candidates.show",s==null?void 0:s.candidate_id),children:s==null?void 0:s.passport_no})})}),e.jsx("td",{children:e.jsx("span",{class:"text-secondary",children:e.jsx(i,{href:route("candidates.show",s==null?void 0:s.candidate_id),children:s==null?void 0:s.cnic})})}),e.jsx("td",{children:e.jsx("span",{class:"text-secondary",children:s==null?void 0:s.gender})}),e.jsx("td",{children:e.jsx("span",{class:"text-secondary",children:s==null?void 0:s.dob})}),e.jsx("td",{children:e.jsx("span",{class:"text-secondary",children:s==null?void 0:s.created_at})})]}))})]})}),e.jsx("div",{class:"card-footer d-flex align-items-center"})]})})})]})}export{h as default};
