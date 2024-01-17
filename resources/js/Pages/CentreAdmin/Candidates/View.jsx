import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { IconTrash } from '@tabler/icons-react';
import { IconUserPlus } from '@tabler/icons-react';
import { IconEye } from '@tabler/icons-react';

export default function View(props) {

    const [registration, setReg] = useState(null);
    const [medical, setMedical] = useState(null);
    const [lab, setLab] = useState(null);
    const [xray, setXRAY] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        phone: '',
        city: '',
        country: '',
        address: ''
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('centres.store'));
    }

    const getReg = (e, id) => {

        e.preventDefault();

        try {
            const response = fetch(route("admin.candidate.fetch_reg", id), {
                method: "GET"
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        // $('#preloader').hide();
                        setReg(result.reg);
                        // console.log(result);
                    },
                    (error) => {
                        console.log(error)
                    }
                );
        } catch (ex) {
            console.error(ex);
        }
    }

    const getMed = (e, id) => {

        e.preventDefault();

        try {
            const response = fetch(route("admin.candidate.fetch_medical", id), {
                method: "GET"
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        // $('#preloader').hide();
                        setMedical(result.medical);
                        // console.log(result);
                    },
                    (error) => {
                        console.log(error)
                    }
                );
        } catch (ex) {
            console.error(ex);
        }
    }

    const getLab = (e, id) => {

        e.preventDefault();

        try {
            const response = fetch(route("admin.candidate.fetch_lab", id), {
                method: "GET"
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        // $('#preloader').hide();
                        setLab(result.lab);
                        // console.log(result);
                    },
                    (error) => {
                        console.log(error)
                    }
                );
        } catch (ex) {
            console.error(ex);
        }
    }

    const getXray = (e, id) => {

        e.preventDefault();

        try {
            const response = fetch(route("admin.candidate.fetch_xray", id), {
                method: "GET"
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        // $('#preloader').hide();
                        setXRAY(result.xray);
                        // console.log(result);
                    },
                    (error) => {
                        console.log(error)
                    }
                );
        } catch (ex) {
            console.error(ex);
        }
    }

    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">View Candidate</h2>}
        >
            <Head title="View Candidate" />

        <div className="page-header">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-auto">
                {/* <span className="avatar avatar-lg rounded" style={{backgroundImage: "url(./static/avatars/003m.jpg)"}}></span> */}
              </div>
              <div className="col">
                <h1 className="fw-bold">{props.candidate?.candidate_name}</h1>
                {/* <div className="my-2">
                    Unemployed. Building a $1M solo business while traveling the world. Currently at $400k/yr.
                </div> */}
                <div className="list-inline list-inline-dots text-secondary">
                  {/* <div className="list-inline-item">

                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-inline" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 7l6 -3l6 3l6 -3v13l-6 3l-6 -3l-6 3v-13" /><path d="M9 4v13" /><path d="M15 7v13" /></svg>
                    {props?.candidate?.country}
                  </div> */}
                  {/* <div className="list-inline-item">

                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-inline" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" /><path d="M3 7l9 6l9 -6" /></svg>
                    <a href="#" className="text-reset">dslane3@epa.gov</a>
                  </div> */}
                  {/* <div className="list-inline-item">

                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-inline" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 20h18v-8a3 3 0 0 0 -3 -3h-12a3 3 0 0 0 -3 3v8z" /><path d="M3 14.803c.312 .135 .654 .204 1 .197a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1c.35 .007 .692 -.062 1 -.197" /><path d="M12 4l1.465 1.638a2 2 0 1 1 -3.015 .099l1.55 -1.737z" /></svg>
                    {props.candidate.dob}
                  </div> */}
                </div>
              </div>
              <div className="col-auto ms-auto d-none">
                <div className="btn-list">
                  <a href="#" className="btn btn-icon" aria-label="Button">

                    <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>
                  </a>
                  <a href="#" className="btn btn-icon" aria-label="Button">

                    <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 9h8" /><path d="M8 13h6" /><path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z" /></svg>
                  </a>
                  <a href="#" className="btn btn-primary">

                    <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l5 5l10 -10" /></svg>
                    Following
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="page-body">
          <div className="container-xl">
            <div className="row g-3">
              <div className="col">
                <ul className="timeline">
                    {props?.registrations?.length > 0 ? props.registrations.map((regs, index) => (
                        <li className="timeline-event">
                            <div className="timeline-event-icon bg-twitter">
                                {/* <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c0 -.249 1.51 -2.772 1.818 -4.013z" /></svg> */}
                            </div>
                            <div className="card timeline-event-card">
                            <div className="card-body">
                                <h4 className="text-secondary float-end">
                                    {regs?.medical_status == 'FIT' && regs?.xray_status == 'FIT' && regs?.laboratory_status == 'FIT' ?
                                        <span className="badge bg-success text-white">FIT</span>
                                    : regs?.medical_status == 'UNFIT' || regs?.xray_status == 'UNFIT' || regs?.laboratory_status == 'UNFIT' ?
                                        <span className="badge bg-danger text-danger">UNFIT</span>
                                    :
                                        <span className="badge bg-warning text-white">PENDING</span>
                                    }
                                </h4>
                                <div className="text-primary mb-3">{'M-'+regs?.token_no}</div>
                                <p className="text-secondary">Date : {regs?.reg_date}</p>
                                <p className="text-secondary">
                                    Medical Status : {regs?.medical_status == null ?
                                                        <span className="badge bg-warning text-white">In Process</span>
                                                    : regs?.medical_status == 'UNFIT' ?
                                                        <>
                                                        <span className="badge bg-danger text-white">UNFIT</span>
                                                        <span className="badge bg-primary text-white float-end" data-bs-toggle="modal" data-bs-target="#view-medical" onClick={(e) => getMed(e, regs?.med_id)}>View Medical</span>
                                                        </>
                                                    :
                                                        <>
                                                        <span className="badge bg-success text-white">FIT</span>
                                                        <span className="badge bg-primary text-white float-end" data-bs-toggle="modal" data-bs-target="#view-medical" onClick={(e) => getMed(e, regs?.med_id)}>View Medical</span>
                                                        </>
                                                    }
                                </p>
                                <p className="text-secondary">
                                    Lab Status : {regs?.laboratory_status == null ?
                                                    <span className="badge bg-warning text-white">In Process</span>
                                                : regs?.laboratory_status == 'UNFIT' ?
                                                    <>
                                                    <span className="badge bg-danger text-white">UNFIT</span>
                                                    <span className="badge bg-primary text-white float-end" data-bs-toggle="modal" data-bs-target="#view-lab" onClick={(e) => getLab(e, regs?.lab_id)}>View Lab</span>
                                                    </>
                                                :
                                                    <>
                                                    <span className="badge bg-success text-white">FIT</span>
                                                    <span className="badge bg-primary text-white float-end" data-bs-toggle="modal" data-bs-target="#view-lab" onClick={(e) => getLab(e, regs?.lab_id)}>View Lab</span>
                                                    </>
                                                }
                                </p>
                                <p className="text-secondary">
                                    XRAY Status : {regs?.xray_status == null ?
                                                    <span className="badge bg-warning text-white">In Process</span>
                                                : regs?.xray_status == 'UNFIT' ?
                                                    <>
                                                    <span className="badge bg-danger text-white">UNFIT</span>
                                                    <span className="badge bg-primary text-white float-end" data-bs-toggle="modal" data-bs-target="#view-xray" onClick={(e) => getXray(e, regs?.xray_id)}>View XRAY</span>
                                                    </>
                                                :
                                                    <>
                                                    <span className="badge bg-success text-white">FIT</span>
                                                    <span className="badge bg-primary text-white float-end" data-bs-toggle="modal" data-bs-target="#view-xray" onClick={(e) => getXray(e, regs?.xray_id)}>View XRAY</span>
                                                    </>
                                                }
                                </p>
                                <p className="text-secondary">
                                    <button className="btn btn-md float-end btn-primary" data-bs-toggle="modal" data-bs-target="#view-registration" onClick={(e) => getReg(e, regs?.id)}>View Registration</button>
                                </p>
                            </div>
                            </div>
                        </li>
                    ))
                    :
                    ''
                }
                  {/* <li className="timeline-event">
                    <div className="timeline-event-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 7m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" /><path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2" /><path d="M12 12l0 .01" /><path d="M3 13a20 20 0 0 0 18 0" /></svg>
                    </div>
                    <div className="card timeline-event-card">
                      <div className="card-body">
                        <div className="text-secondary float-end">2 hrs ago</div>
                        <h4>+3 New Products were added!</h4>
                        <p className="text-secondary">Congratulations!</p>
                      </div>
                    </div>
                  </li>
                  <li className="timeline-event">
                    <div className="timeline-event-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l5 5l10 -10" /></svg>
                    </div>
                    <div className="card timeline-event-card">
                      <div className="card-body">
                        <div className="text-secondary float-end">1 day ago</div>
                        <h4>Database backup completed!</h4>
                        <p className="text-secondary">Download the <a href="#">latest backup</a>.</p>
                      </div>
                    </div>
                  </li>
                  <li className="timeline-event">
                    <div className="timeline-event-icon bg-facebook-lt">
                      <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" /></svg>
                    </div>
                    <div className="card timeline-event-card">
                      <div className="card-body">
                        <div className="text-secondary float-end">1 day ago</div>
                        <h4>+290 Page Likes</h4>
                        <p className="text-secondary">This is great, keep it up!</p>
                      </div>
                    </div>
                  </li>
                  <li className="timeline-event">
                    <div className="timeline-event-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M16 19h6" /><path d="M19 16v6" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4" /></svg>
                    </div>
                    <div className="card timeline-event-card">
                      <div className="card-body">
                        <div className="text-secondary float-end">2 days ago</div>
                        <h4>+3 Friend Requests</h4>
                        <div className="avatar-list mt-3">
                          <span className="avatar" style={{backgroundImage: "url(./static/avatars/000m.jpg)"}}>
                            <span className="badge bg-success"></span></span>
                          <span className="avatar">
                            <span className="badge bg-success"></span>JL</span>
                          <span className="avatar" style={{backgroundImage: "url(./static/avatars/002m.jpg)"}}>
                            <span className="badge bg-success"></span></span>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="timeline-event">
                    <div className="timeline-event-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 8h.01" /><path d="M3 6a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-12z" /><path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l5 5" /><path d="M14 14l1 -1c.928 -.893 2.072 -.893 3 0l3 3" /></svg>
                    </div>
                    <div className="card timeline-event-card">
                      <div className="card-body">
                        <div className="text-secondary float-end">3 days ago</div>
                        <h4>+2 New photos</h4>
                        <div className="mt-3">
                          <div className="row g-2">
                            <div className="col-6">
                              <div className="media media-2x1 rounded">
                                <a className="media-content" style={{backgroundImage: "url(./static/photos/blue-sofa-with-pillows-in-a-designer-living-room-interior.jpg)"}}></a>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="media media-2x1 rounded">
                                <a className="media-content" style={{backgroundImage: "url(./static/photos/home-office-desk-with-macbook-iphone-calendar-watch-and-organizer.jpg)"}}></a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="timeline-event">
                    <div className="timeline-event-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" /><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /></svg>
                    </div>
                    <div className="card timeline-event-card">
                      <div className="card-body">
                        <div className="text-secondary float-end">2 weeks ago</div>
                        <h4>System updated to v2.02</h4>
                        <p className="text-secondary">Check the complete changelog at the <a href="#">activity
                            page</a>.</p>
                      </div>
                    </div>
                  </li> */}
                </ul>
              </div>
              <div className="col-lg-4">
                <div className="row row-cards">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-body">
                        <div className="card-title">Basic info</div>
                        <div className="mb-2">

                          {/* <svg xmlns="http://www.w3.org/2000/svg" className="icon me-2 text-secondary" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" /><path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" /><path d="M3 6l0 13" /><path d="M12 6l0 13" /><path d="M21 6l0 13" /></svg> */}
                          Passport Number: <strong>{props.candidate?.passport_no}</strong>
                        </div>
                        <div className="mb-2">

                          {/* <svg xmlns="http://www.w3.org/2000/svg" className="icon me-2 text-secondary" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 7m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" /><path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2" /><path d="M12 12l0 .01" /><path d="M3 13a20 20 0 0 0 18 0" /></svg> */}
                          Passport Issue Date: <strong>{props.candidate?.passport_issue_date}</strong>
                        </div>
                        <div className="mb-2">

                          {/* <svg xmlns="http://www.w3.org/2000/svg" className="icon me-2 text-secondary" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l-2 0l9 -9l9 9l-2 0" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" /><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg> */}
                          Passport Expiry Date: <strong>{props.candidate?.passport_expiry_date}</strong>
                        </div>
                        <div className="mb-2">

                          {/* <svg xmlns="http://www.w3.org/2000/svg" className="icon me-2 text-secondary" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /><path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" /></svg> */}
                          Country: <strong>
                            {props.candidate?.country}</strong>
                        </div>
                        <div className="mb-2">

                          {/* <svg xmlns="http://www.w3.org/2000/svg" className="icon me-2 text-secondary" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /><path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" /></svg> */}
                          Profession: <strong>
                            {props.candidate?.profession}</strong>
                        </div>
                        <div className="mb-2">

                          {/* <svg xmlns="http://www.w3.org/2000/svg" className="icon me-2 text-secondary" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" /><path d="M16 3v4" /><path d="M8 3v4" /><path d="M4 11h16" /><path d="M11 15h1" /><path d="M12 15v3" /></svg> */}
                          Agency: <strong>{props?.candidate?.agency}</strong>
                        </div>
                        <div className="mb-2">

                          {/* <svg xmlns="http://www.w3.org/2000/svg" className="icon me-2 text-secondary" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" /><path d="M16 3v4" /><path d="M8 3v4" /><path d="M4 11h16" /><path d="M11 15h1" /><path d="M12 15v3" /></svg> */}
                          Birth date: <strong>{props?.candidate?.dob}</strong>
                        </div>
                        <div>

                          {/* <svg xmlns="http://www.w3.org/2000/svg" className="icon me-2 text-secondary" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M12 7v5l3 3" /></svg> */}
                          Gender: <strong>{props?.candidate?.gender}</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* View Registration Modal */}
        <div className="modal modal-blur fade" id="view-registration" tabindex="-1" role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Viewing Registration</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                <div className="modal-body">
                    <div className="col-2 mb-3 float-end">
                        <label className="form-label">Marital Status</label>
                        <span className="text-secondary">{registration?.marital_status}</span>
                    </div>
                    <div className="col-4 mb-3 float-end">
                        <label className="form-label">Gender</label>
                        <span className="text-secondary">{props?.candidate?.gender == null ? "No Information" : props?.candidate?.gender}</span>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <span className="text-secondary">{props?.candidate?.candidate_name == null ? "No Information" : props?.candidate?.candidate_name}</span>
                    </div>
                    <div className="col-4 mb-3 float-end">
                        <label className="form-label">Token Number</label>
                        <span className="text-secondary">{registration?.token_no == null ? "No Information" : "M-"+registration?.token_no}</span>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Barcode Number</label>
                        <span className="text-secondary">{registration?.barcode_no == null ? "No Information" : registration?.barcode_no}</span>
                    </div>
                    <div className="col-4 mb-3 float-end">
                        <label className="form-label">Date of Birth</label>
                        <span className="text-secondary">{props?.candidate?.dob == null ? "No Information" : props?.candidate?.dob}</span>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Passport Number</label>
                        <span className="text-secondary">{props?.candidate?.passport_no == null ? "No Information" : props?.candidate?.passport_no}</span>
                    </div>
                    <div className="col-4 mb-3 float-end">
                        <label className="form-label">Passport Issue Date</label>
                        <span className="text-secondary">{props?.candidate?.passport_issue_date == null ? "No Information" : props?.candidate?.passport_issue_date}</span>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Passport Expiry Date</label>
                        <span className="text-secondary">{props?.candidate?.passport_expiry_date == null ? "No Information" : props?.candidate?.passport_expiry_date}</span>
                    </div>
                    <div className="col-4 mb-3 float-end">
                        <label className="form-label">Country</label>
                        <span className="text-secondary">{props?.candidate?.country == null ? "No Information" : props?.candidate?.country}</span>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Profession</label>
                        <span className="text-secondary">{props?.candidate?.profession == null ? "No Information" : props?.candidate?.profession}</span>
                    </div>
                    <div className="col-4 mb-3 float-end">
                        <label className="form-label">Place of Issue</label>
                        <span className="text-secondary">{registration?.place_of_issue == null ? "No Information" : registration?.place_of_issue}</span>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Agency</label>
                        <span className="text-secondary">{props?.candidate?.agency == null ? "No Information" : props?.candidate?.agency}</span>
                    </div>
                    <div className="col-4 mb-3 float-end">
                        <label className="form-label">Nationality</label>
                        <span className="text-secondary">{registration?.nationality == null ? "No Information" : registration?.nationality}</span>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Serial Number</label>
                        <span className="text-secondary">{registration?.serial_no == null ? "No Information" : registration?.serial_no}</span>
                    </div>
                    <div className="col-4 mb-3 float-end">
                        <label className="form-label">Relation Type</label>
                        <span className="text-secondary">{registration?.relation_type == null ? "No Information" : registration?.relation_type}</span>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Relation Name</label>
                        <span className="text-secondary">{registration?.relation_name == null ? "No Information" : registration?.relation_name}</span>
                    </div>
                    <div className="col-4 mb-3 float-end">
                        <label className="form-label">Slip Expiry Date</label>
                        <span className="text-secondary">{registration?.slip_expiry_date == null ? "No Information" : registration?.slip_expiry_date}</span>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Slip Issue Date</label>
                        <span className="text-secondary">{registration?.slip_issue_date == null ? "No Information" : registration?.slip_issue_date}</span>
                    </div>
                    {props?.candidate?.gender == "Female" ?
                    <div className="col-4 mb-3 float-end">
                        <label className="form-label">Pregnancy Test</label>
                        <span className="text-secondary">{registration?.pregnancy_test == null ? "No Information" : registration?.pregnancy_test}</span>
                    </div>
                    :
                    <></>
                    }
                    <div className="mb-3">
                        <label className="form-label">Print Portion</label>
                        <span className="text-secondary">{registration?.print_report_portion == null ? "No Information" : registration?.print_report_portion}</span>
                    </div>
                </div>
                <div className="modal-footer">
                    <a href="#" className="btn btn-link link-secondary" data-bs-dismiss="modal">
                        Close
                    </a>
                </div>
                </div>
            </div>
        </div>
        {/* View Registration Modal */}

        {/* View Medical Modal */}
        <div className="modal modal-blur fade" id="view-medical" tabindex="-1" role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Viewing Medical</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                <div className="modal-body">
                    <div className="col-2 mb-3 float-end">
                        <label className="form-label">Weight</label>
                        <span className="text-secondary">{medical?.weight}</span>
                    </div>
                    <div className="col-4 mb-3 float-end">
                        <label className="form-label">Height</label>
                        <span className="text-secondary">{medical?.height == null ? "No Information" : medical?.height}</span>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Date</label>
                        <span className="text-secondary">{medical?.created_at}</span>
                    </div>
                    <div className="col-4 mb-3 float-end">
                        <label className="form-label">RR</label>
                        <span className="text-secondary">{medical?.rr == null ? "No Information" : medical?.rr}</span>
                    </div>
                    <div className="col-4 mb-3 float-end">
                        <label className="form-label">Pulse</label>
                        <span className="text-secondary">{medical?.pulse == null ? "No Information" : medical?.pulse}</span>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">BMI</label>
                        <span className="text-secondary">{medical?.bmi == null ? "No Information" : medical?.bmi}</span>
                    </div>
                    <div className="col-4 mb-3 float-end">
                        <label className="form-label">Visual Unaided Right Eye</label>
                        <span className="text-secondary">{medical?.visual_unaided_right_eye == "" || medical?.visual_unaided_right_eye == null ? "No Information" : medical?.visual_unaided_right_eye}</span>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Visual Unaided Left Eye</label>
                        <span className="text-secondary">{medical?.visual_unaided_left_eye == "" || medical?.visual_unaided_left_eye == null ? "No Information" : medical?.visual_unaided_left_eye}</span>
                    </div>
                    <div className="col-4 mb-3 float-end">
                        <label className="form-label">Visual Aided Right Eye</label>
                        <span className="text-secondary">{medical?.visual_aided_right_eye == "" || medical?.visual_aided_right_eye == null ? "No Information" : medical?.visual_aided_right_eye}</span>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Visual Aided Left Eye</label>
                        <span className="text-secondary">{medical?.visual_aided_left_eye == "" || medical?.visual_aided_left_eye == null ? "No Information" : medical?.visual_aided_left_eye}</span>
                    </div>

                    <div className="col-4 mb-3 float-end">
                        <label className="form-label">Distant Unaided Right Eye</label>
                        <span className="text-secondary">{medical?.distant_unaided_right_eye == "" || medical?.distant_unaided_right_eye == null ? "No Information" : medical?.distant_unaided_right_eye}</span>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Distant Unaided Left Eye</label>
                        <span className="text-secondary">{medical?.distant_unaided_left_eye == "" || medical?.distant_unaided_left_eye == null ? "No Information" : medical?.distant_unaided_left_eye}</span>
                    </div>
                    <div className="col-4 mb-3 float-end">
                        <label className="form-label">Distant Aided Right Eye</label>
                        <span className="text-secondary">{medical?.distant_aided_right_eye == "" || medical?.distant_aided_right_eye == null ? "No Information" : medical?.distant_aided_right_eye}</span>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Distant Aided Left Eye</label>
                        <span className="text-secondary">{medical?.distant_aided_left_eye == "" || medical?.distant_aided_left_eye == null ? "No Information" : medical?.distant_aided_left_eye}</span>
                    </div>

                    <div className="col-4 mb-3 float-end">
                        <label className="form-label">Near Unaided Right Eye</label>
                        <span className="text-secondary">{medical?.near_unaided_right_eye == "" || medical?.near_unaided_right_eye == null ? "No Information" : medical?.near_unaided_right_eye}</span>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Near Unaided Left Eye</label>
                        <span className="text-secondary">{medical?.near_unaided_left_eye == "" || medical?.near_unaided_left_eye == null ? "No Information" : medical?.near_unaided_left_eye}</span>
                    </div>
                    <div className="col-4 mb-3 float-end">
                        <label className="form-label">Near Aided Right Eye</label>
                        <span className="text-secondary">{medical?.near_aided_right_eye == "" || medical?.near_aided_right_eye == null ? "No Information" : medical?.near_aided_right_eye}</span>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Near Aided Left Eye</label>
                        <span className="text-secondary">{medical?.near_aided_left_eye == "" || medical?.near_aided_left_eye == null ? "No Information" : medical?.near_aided_left_eye}</span>
                    </div>

                    <div className="col-4 mb-3 float-end">
                        <label className="form-label">Hearing Right Ear</label>
                        <span className="text-secondary">{medical?.hearing_left_ear == "" || medical?.hearing_left_ear == null ? "No Information" : medical?.hearing_left_ear}</span>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Hearing Left Ear</label>
                        <span className="text-secondary">{medical?.hearing_right_ear == "" || medical?.hearing_right_ear == null ? "No Information" : medical?.hearing_right_ear}</span>
                    </div>

                    <div className="col-4 mb-3 float-end">
                        <label className="form-label">Color Vision</label>
                        <span className="text-secondary">{medical?.color_vision == "" || medical?.color_vision == null ? "No Information" : medical?.color_vision}</span>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Appearance</label>
                        <span className="text-secondary">{medical?.appearance == "" || medical?.appearance == null ? "No Information" : medical?.appearance}</span>
                    </div>

                    <div className="col-4 mb-3 float-end">
                        <label className="form-label">Speech</label>
                        <span className="text-secondary">{medical?.speech == "" || medical?.speech == null ? "No Information" : medical?.speech}</span>
                    </div>
                    <div className="col-4 mb-3 float-end">
                        <label className="form-label">Behavior</label>
                        <span className="text-secondary">{medical?.behavior == "" || medical?.behavior == null ? "No Information" : medical?.behavior}</span>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Cognition</label>
                        <span className="text-secondary">{medical?.cognition == "" || medical?.cognition == null ? "No Information" : medical?.cognition}</span>
                    </div>

                    <div className="col-4 mb-3 float-end">
                        <label className="form-label">Orientation</label>
                        <span className="text-secondary">{medical?.orientation == "" || medical?.orientation == null ? "No Information" : medical?.orientation}</span>
                    </div>
                    <div className="col-4 mb-3 float-end">
                        <label className="form-label">Memory</label>
                        <span className="text-secondary">{medical?.memory == "" || medical?.memory == null ? "No Information" : medical?.memory}</span>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Concentration</label>
                        <span className="text-secondary">{medical?.concentration == "" || medical?.concentration == null ? "No Information" : medical?.concentration}</span>
                    </div>

                    <div className="col-4 mb-3 float-end">
                        <label className="form-label">Other</label>
                        <span className="text-secondary">{medical?.other == "" || medical?.other == null ? "No Information" : medical?.other}</span>
                    </div>
                    <div className="col-4 mb-3 float-end">
                        <label className="form-label">Mood</label>
                        <span className="text-secondary">{medical?.mood == "" || medical?.mood == null ? "No Information" : medical?.mood}</span>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Thoughts</label>
                        <span className="text-secondary">{medical?.thoughts == "" || medical?.thoughts == null ? "No Information" : medical?.thoughts}</span>
                    </div>

                    <div className="col-4 mb-3 float-end">
                        <label className="form-label">Respiratory</label>
                        <span className="text-secondary">{medical?.respiratory == "" || medical?.respiratory == null ? "No Information" : medical?.respiratory}</span>
                    </div>
                    <div className="col-4 mb-3 float-end">
                        <label className="form-label">Cardio Vascular</label>
                        <span className="text-secondary">{medical?.cardio_vascular == "" || medical?.cardio_vascular == null ? "No Information" : medical?.cardio_vascular}</span>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">General Appearance</label>
                        <span className="text-secondary">{medical?.general_appearance == "" || medical?.general_appearance == null ? "No Information" : medical?.general_appearance}</span>
                    </div>

                    <div className="col-4 mb-3 float-end">
                        <label className="form-label">Hydrocele</label>
                        <span className="text-secondary">{medical?.hydrocele == "" || medical?.hydrocele == null ? "No Information" : medical?.hydrocele}</span>
                    </div>
                    <div className="col-4 mb-3 float-end">
                        <label className="form-label">Abdomen</label>
                        <span className="text-secondary">{medical?.abdomen == "" || medical?.abdomen == null ? "No Information" : medical?.abdomen}</span>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Hernia</label>
                        <span className="text-secondary">{medical?.hernia == "" || medical?.hernia == null ? "No Information" : medical?.hernia}</span>
                    </div>

                    <div className="col-4 mb-3 float-end">
                        <label className="form-label">Skin</label>
                        <span className="text-secondary">{medical?.skin == "" || medical?.skin == null ? "No Information" : medical?.skin}</span>
                    </div>
                    <div className="col-4 mb-3 float-end">
                        <label className="form-label">Back</label>
                        <span className="text-secondary">{medical?.back == "" || medical?.back == null ? "No Information" : medical?.back}</span>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Extremities</label>
                        <span className="text-secondary">{medical?.extremities == "" || medical?.extremities == null ? "No Information" : medical?.extremities}</span>
                    </div>

                    <div className="col-4 mb-3 float-end">
                        <label className="form-label">BP</label>
                        <span className="text-secondary">{medical?.bp == "" || medical?.bp == null ? "No Information" : medical?.bp}</span>
                    </div>
                    <div className="col-4 mb-3 float-end">
                        <label className="form-label">CNS</label>
                        <span className="text-secondary">{medical?.cns == "" || medical?.cns == null ? "No Information" : medical?.cns}</span>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Deformities</label>
                        <span className="text-secondary">{medical?.deformities == "" || medical?.deformities == null ? "No Information" : medical?.deformities}</span>
                    </div>

                    <div className="col-4 mb-3 float-end">
                        <label className="form-label">ENT</label>
                        <span className="text-secondary">{medical?.ent == "" || medical?.ent == null ? "No Information" : medical?.ent}</span>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Remarks</label>
                        <span className="text-secondary">{medical?.remarks == "" || medical?.remarks == null ? "No Information" : medical?.remarks}</span>
                    </div>

                </div>
                <div className="modal-footer">
                    <a href="#" className="btn btn-link link-secondary" data-bs-dismiss="modal">
                        Close
                    </a>
                </div>
                </div>
            </div>
        </div>
        {/* View Medical Modal */}


        </AuthenticatedLayout>
    );
}
