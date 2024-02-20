import{r as s,W as j,j as e,a as N}from"./app-f0e2fffb.js";import{A as v}from"./AuthenticatedLayout-6dfd2edf.js";import"./TextInput-2d1acbcd.js";function S({auth:a}){const[g,c]=s.useState(null),[b,i]=s.useState(null),[p,n]=s.useState(null),[r,u]=s.useState("None"),[d,o]=s.useState(null);s.useState(!1);const[l,t]=s.useState(!1);j({notes:""}),s.useEffect(()=>{},[]);const m=h=>{},x=h=>{o(null),c(null),i(null),n(null),t(!1)};return e.jsxs(v,{user:a.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Lab Result"}),children:[e.jsx(N,{title:"Lab Result"}),e.jsx("div",{className:"page-header d-print-none",children:e.jsx("div",{className:"container-xl",children:e.jsx("div",{className:"row g-2 align-items-center",children:e.jsxs("div",{className:"col align-items-center",children:[e.jsx("div",{className:"col-md-3",style:{float:"left"},children:e.jsx("h2",{className:"page-title",style:{float:"left"},children:"Lab Result"})}),e.jsx("div",{className:"col-md-3 align-items-center",style:{float:"right"},children:e.jsx("h2",{className:"page-title",children:e.jsxs("span",{className:"badge",children:["Current Token: ",r]})})})]})})})}),e.jsx("div",{className:"page-body",children:e.jsx("div",{className:"container-xl",children:e.jsxs("div",{className:"row row-cards mb-5",children:[e.jsx("div",{className:"col-md-6",children:e.jsxs("div",{className:"row row-cards",children:[e.jsx("div",{className:"col-12",children:e.jsx("div",{className:"card",children:e.jsxs("div",{className:"card-body",children:[e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Barcode"}),e.jsx("input",{type:"date",className:"form-control",name:"barcode"})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Date"}),e.jsx("input",{type:"text",className:"form-control",name:"reg_date"})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Serial Number"}),e.jsx("input",{type:"text",className:"form-control",name:"serial_no"})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-2"}),e.jsx("div",{className:"col-4",children:e.jsx("button",{className:"btn btn-md btn-outline-secondary",disabled:!!l,onChange:x,children:"Reset Query"})}),e.jsx("div",{className:"col-4",children:e.jsx("button",{className:"btn btn-md btn-outline-info",disabled:!l,onChange:m,children:"Search for Candidate"})})]})]})})}),d==null&&e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-header",children:e.jsx("div",{className:"col-md-12 flex align-items-center",children:e.jsx("div",{className:"col-md-6",style:{float:"left"},children:e.jsx("h3",{children:"Candidate Information"})})})}),e.jsxs("div",{className:"card-body",children:[e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Candidate Name"}),e.jsx("input",{type:"date",className:"form-control",name:"reg_date"})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Passport Number"}),e.jsx("input",{type:"text",className:"form-control",name:"serial_no"})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Passport Issue Date"}),e.jsx("input",{type:"date",className:"form-control",name:"reg_date"})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Passport Expiry Date"}),e.jsx("input",{type:"text",className:"form-control",name:"serial_no"})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Registeration Date"}),e.jsx("input",{type:"date",className:"form-control",name:"reg_date"})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Serial Number"}),e.jsx("input",{type:"text",className:"form-control",name:"serial_no"})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Agency"}),e.jsx("select",{className:"form-select",name:"agency",children:e.jsx("option",{children:"Select Agency"})})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Country"}),e.jsx("select",{className:"form-select",name:"country",children:e.jsx("option",{children:"Select Country"})})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Profession"}),e.jsx("select",{className:"form-select",name:"profession",children:e.jsx("option",{children:"Select Profession"})})]})}),e.jsx("div",{className:"col-3",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Fees"}),e.jsx("input",{className:"form-control",name:"fees",type:"text"})]})}),e.jsx("div",{className:"col-3",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Discount"}),e.jsx("input",{className:"form-control",name:"discount",type:"text"})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Relation"}),e.jsxs("select",{className:"form-select",children:[e.jsx("option",{value:"",children:"Select Relation"}),e.jsx("option",{value:"S/O",children:"S/O"}),e.jsx("option",{value:"W/O",children:"W/O"}),e.jsx("option",{value:"D/O",children:"D/O"})]})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Relative Name"}),e.jsx("input",{type:"text",className:"form-control",name:"relative_name"})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Phone 1"}),e.jsx("input",{type:"text",className:"form-control",name:"phone_1"})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Phone 2"}),e.jsx("input",{type:"text",className:"form-control",name:"phone_2"})]})})]}),e.jsxs("div",{className:"row g-5",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Marital Status"}),e.jsxs("select",{className:"form-select",name:"marital_status",children:[e.jsx("option",{value:"",children:"Select Marital Status"}),e.jsx("option",{value:"Single",children:"Single"}),e.jsx("option",{value:"Married",children:"Married"}),e.jsx("option",{value:"Divorced",children:"Divorced"}),e.jsx("option",{value:"Widowed",children:"Widowed"})]})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Remarks"}),e.jsx("textarea",{className:"form-control"})]})})]})]})]})})]})}),e.jsx("div",{className:"col-md-6",children:e.jsxs("div",{className:"row row-cards",children:[e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-header",children:e.jsx("div",{className:"col-md-12 flex align-items-center",children:e.jsx("div",{className:"col-md-12",style:{float:"left"},children:e.jsx("h2",{style:{float:"left"},className:"h2",children:"URINE"})})})}),e.jsx("div",{className:"card-body",children:e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Sugar"}),e.jsxs("select",{className:"form-select",name:"sugar",children:[e.jsx("option",{value:"--",children:"- SELECT -"}),e.jsx("option",{value:"negative",children:"Negative"}),e.jsx("option",{value:"positive",children:"Positive"}),e.jsx("option",{value:"see notes",children:"See Notes"})]})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Albumin"}),e.jsxs("select",{className:"form-select",name:"albumin",children:[e.jsx("option",{value:"--",children:"- SELECT -"}),e.jsx("option",{value:"negative",children:"Negative"}),e.jsx("option",{value:"positive",children:"Positive"}),e.jsx("option",{value:"see notes",children:"See Notes"})]})]})})]})})]})}),e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-header",children:e.jsx("div",{className:"col-md-12 flex align-items-center",children:e.jsx("div",{className:"col-md-12",style:{float:"left"},children:e.jsx("h2",{style:{float:"left"},className:"h2",children:"STOOL"})})})}),e.jsx("div",{className:"card-body",children:e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Helminthes"}),e.jsxs("select",{className:"form-select",name:"helminthes",children:[e.jsx("option",{value:"--",children:"- SELECT -"}),e.jsx("option",{value:"absent",children:"Absent"}),e.jsx("option",{value:"present",children:"Present"})]})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"OVA"}),e.jsxs("select",{className:"form-select",name:"ova",children:[e.jsx("option",{value:"--",children:"- SELECT -"}),e.jsx("option",{value:"absent",children:"Absent"}),e.jsx("option",{value:"present",children:"Present"})]})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Cyst"}),e.jsxs("select",{className:"form-select",name:"cyst",children:[e.jsx("option",{value:"--",children:"- SELECT -"}),e.jsx("option",{value:"absent",children:"Absent"}),e.jsx("option",{value:"present",children:"Present"})]})]})})]})})]})}),e.jsx("div",{className:"col-12",children:e.jsx("div",{className:"card",children:e.jsx("div",{className:"card-body",children:e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"T.B Test"}),e.jsxs("select",{className:"form-select",name:"tb",children:[e.jsx("option",{value:"--",children:"- SELECT -"}),e.jsx("option",{value:"absent",children:"Absent"}),e.jsx("option",{value:"present",children:"Present"})]})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Pregnancy Test"}),e.jsxs("select",{className:"form-select",name:"pregnancy",children:[e.jsx("option",{value:"--",children:"--"}),e.jsx("option",{value:"negative",children:"Negative"}),e.jsx("option",{value:"positive",children:"Positive"})]})]})})]})})})}),e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-header",children:e.jsx("div",{className:"col-md-12 flex align-items-center",children:e.jsx("div",{className:"col-md-12",style:{float:"left"},children:e.jsx("h2",{style:{float:"left"},className:"h2",children:"SEROLOGY"})})})}),e.jsx("div",{className:"card-body",children:e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"HCV"}),e.jsxs("select",{className:"form-select",name:"hcv",children:[e.jsx("option",{value:"--",children:"- SELECT -"}),e.jsx("option",{value:"negative",children:"Negative"}),e.jsx("option",{value:"positive",children:"Positive"}),e.jsx("option",{value:"see notes",children:"See Notes"})]})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"HBsAg"}),e.jsxs("select",{className:"form-select",name:"hbsag",children:[e.jsx("option",{value:"--",children:"- SELECT -"}),e.jsx("option",{value:"negative",children:"Negative"}),e.jsx("option",{value:"positive",children:"Positive"}),e.jsx("option",{value:"see notes",children:"See Notes"})]})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"HIV 1.2"}),e.jsxs("select",{className:"form-select",name:"hiv",children:[e.jsx("option",{value:"--",children:"- SELECT -"}),e.jsx("option",{value:"negative",children:"Negative"}),e.jsx("option",{value:"positive",children:"Positive"}),e.jsx("option",{value:"see notes",children:"See Notes"})]})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"VDRL"}),e.jsxs("select",{className:"form-select",name:"vdrl",children:[e.jsx("option",{value:"--",children:"- SELECT -"}),e.jsx("option",{value:"negative",children:"Negative"}),e.jsx("option",{value:"positive",children:"Positive"}),e.jsx("option",{value:"see notes",children:"See Notes"})]})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"TPHA"}),e.jsxs("select",{className:"form-select",name:"tpha",children:[e.jsx("option",{value:"--",children:"- SELECT -"}),e.jsx("option",{value:"negative",children:"Negative"}),e.jsx("option",{value:"positive",children:"Positive"}),e.jsx("option",{value:"see notes",children:"See Notes"})]})]})})]})})]})}),e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-header",children:e.jsx("div",{className:"col-md-12 flex align-items-center",children:e.jsx("div",{className:"col-md-12",style:{float:"left"},children:e.jsx("h2",{style:{float:"left"},className:"h2",children:"BIOCHEMISTRY"})})})}),e.jsxs("div",{className:"card-body",children:[e.jsx("div",{className:"row g-5 mb-3",children:e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"R.B.S"}),e.jsx("input",{className:"form-control",type:"text",name:"rbs",id:"rbs"})]})})}),e.jsx("hr",{}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("label",{children:"L.F.T"}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"BIL"}),e.jsx("input",{className:"form-control",type:"text",name:"bil",id:"bil"})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"ALT"}),e.jsx("input",{className:"form-control",type:"text",name:"alt",id:"alt"})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"AST"}),e.jsx("input",{className:"form-control",type:"text",name:"ast",id:"ast"})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"ALK"}),e.jsx("input",{className:"form-control",type:"text",name:"alk",id:"alk"})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Creatinine"}),e.jsx("input",{className:"form-control",type:"text",name:"creatinine",id:"creatinine"})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Blood Group"}),e.jsxs("select",{class:"form-control",name:"blood_group",id:"blood_group",children:[e.jsx("option",{value:"--",children:"- SELECT -"}),e.jsx("option",{value:"A+",children:"A+"}),e.jsx("option",{value:"B+",children:"B+"}),e.jsx("option",{value:"AB+",children:"AB+"}),e.jsx("option",{value:"A-",children:"A-"}),e.jsx("option",{value:"B-",children:"B-"}),e.jsx("option",{value:"AB-",children:"AB-"}),e.jsx("option",{value:"O+",children:"O+"}),e.jsx("option",{value:"O-",children:"O-"})]})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Haemoglobin"}),e.jsx("input",{className:"form-control",type:"text",name:"haemoglobin",id:"haemoglobin"})]})})]}),e.jsx("hr",{}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("label",{children:"Thick Film For"}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Malaria"}),e.jsxs("select",{class:"form-select",name:"malaria",id:"malaria",children:[e.jsx("option",{value:"--",children:"- SELECT -"}),e.jsx("option",{value:"absent",children:"Absent"}),e.jsx("option",{value:"present",children:"Present"})]})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Micro Filariae"}),e.jsxs("select",{class:"form-select",name:"micro_filariae",id:"micro_filariae",children:[e.jsx("option",{value:"--",children:"- SELECT -"}),e.jsx("option",{value:"absent",children:"Absent"}),e.jsx("option",{value:"present",children:"Present"})]})]})})]})]})]})}),e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-header",children:e.jsx("div",{className:"col-md-12 flex align-items-center",children:e.jsx("div",{className:"col-md-12",style:{float:"left"},children:e.jsx("h2",{style:{float:"left"},className:"h2",children:"VACCINATION STATUS"})})})}),e.jsxs("div",{className:"card-body",children:[e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Polio"}),e.jsxs("select",{class:"form-control",name:"polio",id:"polio",children:[e.jsx("option",{value:"--",children:"- SELECT -"}),e.jsx("option",{value:"non-vaccinated",children:"Non-Vaccinated"}),e.jsx("option",{value:"vaccinated",children:"Vaccinated"})]})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Polio Date"}),e.jsx("input",{className:"form-control",type:"date",name:"polio_date"})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"MMR1"}),e.jsxs("select",{class:"form-control",name:"mmr1",id:"mmr1",children:[e.jsx("option",{value:"--",children:"- SELECT -"}),e.jsx("option",{value:"non-vaccinated",children:"Non-Vaccinated"}),e.jsx("option",{value:"vaccinated",children:"Vaccinated"})]})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"MMR1 Date"}),e.jsx("input",{className:"form-control",type:"date",name:"mmr1_date"})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"MMR2"}),e.jsxs("select",{class:"form-control",name:"mmr2",id:"mmr2",children:[e.jsx("option",{value:"--",children:"- SELECT -"}),e.jsx("option",{value:"non-vaccinated",children:"Non-Vaccinated"}),e.jsx("option",{value:"vaccinated",children:"Vaccinated"})]})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"MMR2 Date"}),e.jsx("input",{className:"form-control",type:"date",name:"mmr2_date"})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Meningococcal"}),e.jsxs("select",{class:"form-control",name:"meningococcal",id:"meningococcal",children:[e.jsx("option",{value:"--",children:"- SELECT -"}),e.jsx("option",{value:"non-vaccinated",children:"Non-Vaccinated"}),e.jsx("option",{value:"vaccinated",children:"Vaccinated"})]})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Meningococcal Date"}),e.jsx("input",{className:"form-control",type:"date",name:"meningococcal_date"})]})})]})]})]})}),e.jsx("div",{className:"col-8",children:e.jsx("div",{className:"card",children:e.jsx("div",{className:"card-body",children:e.jsx("div",{className:"row g-3",children:e.jsx("div",{className:"col-12",children:e.jsx("div",{className:"row g-3 align-items-center justify-content-center",children:e.jsx("div",{className:"col-md-12 text-center",children:e.jsx("button",{className:"btn btn-success btn-md w-50",disabled:!0,children:"Save & Upload Result"})})})})})})})})]})})]})})})]})}export{S as default};
