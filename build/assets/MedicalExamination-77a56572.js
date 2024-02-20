import{r as s,W as j,j as e,a as N}from"./app-c6080e60.js";import{A as v}from"./AuthenticatedLayout-128a3ac1.js";import"./TextInput-546557db.js";function _({auth:a}){const[f,c]=s.useState(null),[g,i]=s.useState(null),[b,r]=s.useState(null),[n,t]=s.useState(null);s.useState(!1);const[l,d]=s.useState(!1),[m,p]=s.useState("None");j({notes:""}),s.useEffect(()=>{},[]);const o=h=>{},x=h=>{t(null),c(null),i(null),r(null),d(!1)};return e.jsxs(v,{user:a.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Medical Examination"}),children:[e.jsx(N,{title:"Medical Examination"}),e.jsx("div",{className:"page-header d-print-none",children:e.jsx("div",{className:"container-xl",children:e.jsx("div",{className:"row g-2 align-items-center",children:e.jsxs("div",{className:"col align-items-center",children:[e.jsx("div",{className:"col-md-3",style:{float:"left"},children:e.jsx("h2",{className:"page-title",style:{float:"left"},children:"Medical Examination"})}),e.jsx("div",{className:"col-md-3 align-items-center",style:{float:"right"},children:e.jsx("h2",{className:"page-title",children:e.jsxs("span",{className:"badge",children:["Current Token: ",m]})})})]})})})}),e.jsx("div",{className:"page-body",children:e.jsxs("div",{className:"container-xl",children:[e.jsxs("div",{className:"row row-cards mb-5",children:[e.jsx("div",{className:"col-md-6",children:e.jsxs("div",{className:"row row-cards",children:[e.jsx("div",{className:"col-8",children:e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-header",children:e.jsx("div",{className:"col-md-12 flex align-items-center",children:e.jsx("div",{className:"col-md-12",style:{float:"left"},children:e.jsx("h2",{style:{float:"left"},className:"h2",children:"Biometric Verification"})})})}),e.jsx("div",{className:"card-body",children:e.jsx("div",{className:"row g-3",children:e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"row g-3 align-items-center justify-content-center",children:[e.jsx("img",{src:"./../assets/static/photos/ThumbPrint.png",style:{width:200}}),e.jsx("div",{className:"col-md-12 text-center",children:e.jsx("button",{className:"btn btn-purple btn-md w-50",disabled:!0,children:"Scan & Verify Fingerprint"})})]})})})})]})}),e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-header",children:e.jsx("div",{className:"col-md-12 flex align-items-center",children:e.jsx("div",{className:"col-md-6",style:{float:"left"},children:e.jsx("h3",{children:"Medical Examination - General"})})})}),e.jsxs("div",{className:"card-body",children:[e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Height"}),e.jsx("input",{type:"text",className:"form-control",name:"height"})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Weight"}),e.jsx("input",{type:"text",className:"form-control",name:"weight"})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"BMI"}),e.jsx("input",{type:"text",className:"form-control",name:"bmi"})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"BP"}),e.jsx("input",{type:"text",className:"form-control",name:"bp"})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Pulse"}),e.jsx("input",{type:"text",className:"form-control",name:"pulse"})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"RR"}),e.jsx("input",{type:"text",className:"form-control",name:"rr"})]})})]}),e.jsx("hr",{}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Visual Aided (R & L)"}),e.jsx("input",{type:"text",className:"form-control",name:"visual_aided_right_eye"}),e.jsx("input",{type:"text",className:"form-control",name:"visual_aided_left_eye"})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Visual Un-Aided (R & L)"}),e.jsx("input",{type:"text",className:"form-control",name:"visual_unaided_right_eye"}),e.jsx("input",{type:"text",className:"form-control",name:"visual_unaided_left_eye"})]})})]}),e.jsx("hr",{}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Distant Eye Sight - Aided (R & L)"}),e.jsx("input",{type:"text",className:"form-control",name:"distant_aided_right_eye"}),e.jsx("input",{type:"text",className:"form-control",name:"distant_aided_left_eye"})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Near Eye Sight - Aided (R & L)"}),e.jsx("input",{type:"text",className:"form-control",name:"near_aided_right_eye"}),e.jsx("input",{type:"text",className:"form-control",name:"near_aided_left_eye"})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Distant Eye Sight - Unaided (R & L)"}),e.jsx("input",{type:"text",className:"form-control",name:"distant_unaided_right_eye"}),e.jsx("input",{type:"text",className:"form-control",name:"distant_unaided_left_eye"})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Near Eye Sight - Unaided (R & L)"}),e.jsx("input",{type:"text",className:"form-control",name:"near_unaided_right_eye"}),e.jsx("input",{type:"text",className:"form-control",name:"near_unaided_left_eye"})]})})]}),e.jsx("hr",{}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-7",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Color Vision"}),e.jsxs("div",{children:[e.jsxs("label",{class:"form-check form-check-inline",children:[e.jsx("input",{class:"form-check-input",type:"radio",name:"radios-inline",value:"Normal"}),e.jsx("span",{class:"form-check-label",children:"Normal"})]}),e.jsxs("label",{class:"form-check form-check-inline",children:[e.jsx("input",{class:"form-check-input",type:"radio",name:"radios-inline",value:"Doubtful"}),e.jsx("span",{class:"form-check-label",children:"Doubtful"})]}),e.jsxs("label",{class:"form-check form-check-inline",children:[e.jsx("input",{class:"form-check-input",type:"radio",name:"radios-inline",value:"Defective"}),e.jsx("span",{class:"form-check-label",children:"Defective"})]})]})]})}),e.jsx("div",{className:"col-5",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Hearing (R & L)"}),e.jsxs("select",{className:"form-select",name:"hearing_right_ear",children:[e.jsx("option",{value:"--",children:"- SELECT -"}),e.jsx("option",{value:"normal",children:"Normal"}),e.jsx("option",{value:"doubtful",children:"Doubtful"}),e.jsx("option",{value:"defective",children:"Defective"})]}),e.jsxs("select",{className:"form-select",name:"hearing_left_ear",children:[e.jsx("option",{value:"--",children:"- SELECT -"}),e.jsx("option",{value:"normal",children:"Normal"}),e.jsx("option",{value:"doubtful",children:"Doubtful"}),e.jsx("option",{value:"defective",children:"Defective"})]})]})})]})]})]})}),e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-header",children:e.jsx("div",{className:"col-md-12 flex align-items-center",children:e.jsx("div",{className:"col-md-6",style:{float:"left"},children:e.jsx("h3",{children:"Medical Examination - Mental Status"})})})}),e.jsxs("div",{className:"card-body",children:[e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Appearance"}),e.jsx("input",{type:"text",className:"form-control",name:"appearance"})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Speech"}),e.jsx("input",{type:"text",className:"form-control",name:"speech"})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Behavior"}),e.jsx("input",{type:"text",className:"form-control",name:"behavior"})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-3",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Cognition"}),e.jsx("input",{type:"text",className:"form-control",name:"cognition"})]})}),e.jsx("div",{className:"col-3",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Orientation"}),e.jsx("input",{type:"text",className:"form-control",name:"orientation"})]})}),e.jsx("div",{className:"col-3",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Memory"}),e.jsx("input",{type:"text",className:"form-control",name:"memory"})]})}),e.jsx("div",{className:"col-3",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Concentration"}),e.jsx("input",{type:"text",className:"form-control",name:"concentration"})]})})]}),e.jsx("hr",{}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Mood"}),e.jsx("input",{type:"text",className:"form-control",name:"mood"})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Thoughts"}),e.jsx("input",{type:"text",className:"form-control",name:"thoughts"})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Others"}),e.jsx("input",{type:"text",className:"form-control",name:"others"})]})})]})]})]})}),e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-header",children:e.jsx("div",{className:"col-md-12 flex align-items-center",children:e.jsx("div",{className:"col-md-6",style:{float:"left"},children:e.jsx("h3",{children:"Medical Examination - SYSTEMIC"})})})}),e.jsxs("div",{className:"card-body",children:[e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"General Appearance"}),e.jsx("input",{type:"text",className:"form-control",name:"general_appearance"})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Cardiovascular"}),e.jsx("input",{type:"text",className:"form-control",name:"cardiovascular"})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Respiratory"}),e.jsx("input",{type:"text",className:"form-control",name:"respiratory"})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"ENT"}),e.jsx("input",{type:"text",className:"form-control",name:"ent"})]})})]}),e.jsx("hr",{}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-3",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Abdomen"}),e.jsx("input",{type:"text",className:"form-control",name:"abdomen"})]})}),e.jsx("div",{className:"col-3",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Hernia"}),e.jsx("input",{type:"text",className:"form-control",name:"hernia"})]})}),e.jsx("div",{className:"col-3",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Hydrocele"}),e.jsx("input",{type:"text",className:"form-control",name:"hydrocele"})]})})]}),e.jsx("hr",{}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Extremities"}),e.jsx("input",{type:"text",className:"form-control",name:"extremities"})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Back"}),e.jsx("input",{type:"text",className:"form-control",name:"back"})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Skin"}),e.jsx("input",{type:"text",className:"form-control",name:"skin"})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"C.N.S"}),e.jsx("input",{type:"text",className:"form-control",name:"cns"})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Deformities"}),e.jsx("input",{type:"text",className:"form-control",name:"deformities"})]})})]})]})]})})]})}),e.jsx("div",{className:"col-md-6",children:e.jsxs("div",{className:"row row-cards",children:[e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-header",children:e.jsx("div",{className:"col-md-12 flex align-items-center",children:e.jsx("div",{className:"col-md-6",style:{float:"left"},children:e.jsx("h2",{children:"Registration Information"})})})}),e.jsxs("div",{className:"card-body",children:[e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Barcode"}),e.jsx("input",{type:"text",className:"form-control",name:"barcode"})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Date"}),e.jsx("input",{type:"date",className:"form-control",name:"reg_date"})]})}),e.jsx("div",{className:"col-4",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Serial Number"}),e.jsx("input",{type:"text",className:"form-control",name:"serial_no"})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-2"}),e.jsx("div",{className:"col-4",children:e.jsx("button",{className:"btn btn-md btn-outline-secondary",disabled:!!l,onChange:x,children:"Reset Query"})}),e.jsx("div",{className:"col-4",children:e.jsx("button",{className:"btn btn-md btn-outline-info",disabled:!l,onChange:o,children:"Search for Candidate"})})]})]})]})}),n&&e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-header",children:e.jsx("div",{className:"col-md-12 flex align-items-center",children:e.jsx("div",{className:"col-md-6",style:{float:"left"},children:e.jsx("h3",{children:"Candidate Information"})})})}),e.jsxs("div",{className:"card-body",children:[e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Candidate Name"}),e.jsx("input",{type:"date",className:"form-control",name:"reg_date"})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Passport Number"}),e.jsx("input",{type:"text",className:"form-control",name:"serial_no"})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Passport Issue Date"}),e.jsx("input",{type:"date",className:"form-control",name:"reg_date"})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Passport Expiry Date"}),e.jsx("input",{type:"text",className:"form-control",name:"serial_no"})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Registeration Date"}),e.jsx("input",{type:"date",className:"form-control",name:"reg_date"})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Serial Number"}),e.jsx("input",{type:"text",className:"form-control",name:"serial_no"})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Agency"}),e.jsx("select",{className:"form-select",name:"agency",children:e.jsx("option",{children:"Select Agency"})})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Country"}),e.jsx("select",{className:"form-select",name:"country",children:e.jsx("option",{children:"Select Country"})})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Profession"}),e.jsx("select",{className:"form-select",name:"profession",children:e.jsx("option",{children:"Select Profession"})})]})}),e.jsx("div",{className:"col-3",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Fees"}),e.jsx("input",{className:"form-control",name:"fees",type:"text"})]})}),e.jsx("div",{className:"col-3",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Discount"}),e.jsx("input",{className:"form-control",name:"discount",type:"text"})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Relation"}),e.jsxs("select",{className:"form-select",children:[e.jsx("option",{value:"",children:"Select Relation"}),e.jsx("option",{value:"S/O",children:"S/O"}),e.jsx("option",{value:"W/O",children:"W/O"}),e.jsx("option",{value:"D/O",children:"D/O"})]})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Relative Name"}),e.jsx("input",{type:"text",className:"form-control",name:"relative_name"})]})})]}),e.jsxs("div",{className:"row g-5 mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Phone 1"}),e.jsx("input",{type:"text",className:"form-control",name:"phone_1"})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Phone 2"}),e.jsx("input",{type:"text",className:"form-control",name:"phone_2"})]})})]}),e.jsxs("div",{className:"row g-5",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Marital Status"}),e.jsxs("select",{className:"form-select",name:"marital_status",children:[e.jsx("option",{value:"",children:"Select Marital Status"}),e.jsx("option",{value:"Single",children:"Single"}),e.jsx("option",{value:"Married",children:"Married"}),e.jsx("option",{value:"Divorced",children:"Divorced"}),e.jsx("option",{value:"Widowed",children:"Widowed"})]})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("label",{className:"form-label",children:"Remarks"}),e.jsx("textarea",{className:"form-control"})]})})]})]})]})}),e.jsx("div",{className:"col-8",children:e.jsx("div",{className:"card",children:e.jsx("div",{className:"card-body",children:e.jsx("div",{className:"row g-3",children:e.jsx("div",{className:"col-12",children:e.jsx("div",{className:"row g-3 align-items-center justify-content-center",children:e.jsx("div",{className:"col-md-12 text-center",children:e.jsx("button",{className:"btn btn-success btn-md w-50",disabled:!0,children:"Save & Upload Exam"})})})})})})})})]})})]}),e.jsxs("div",{className:"row row-cards",children:[e.jsx("div",{className:"col-md-6",children:e.jsx("div",{className:"row row-cards"})}),e.jsx("div",{className:"col-md-6",children:e.jsx("div",{className:"row row-cards"})})]})]})})]})}export{_ as default};
