import { useEffect, useState } from 'react';
import Checkbox from '@/Components/Checkbox';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { IconCrosshair, IconClipboardText, IconLock  } from '@tabler/icons-react';
import { IconRefresh } from '@tabler/icons-react';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function PrintReport(props) {
    const [currToken, setToken] = useState('None');
    const [candidate, setCandidate] = useState(null);
    const [serial_no, setSerialNo] = useState(null);
    const todayDate = new Date();
    const [reg_date, setRegDate] = useState(todayDate.getMonth()+1 >= 10 && todayDate.getDate() >= 10 ? todayDate.getFullYear()+"-"+(todayDate.getMonth()+1)+"-"+todayDate.getDate() : todayDate.getMonth()+1 >= 10 && todayDate.getDate() < 10 ? todayDate.getFullYear()+"-"+(todayDate.getMonth()+1)+"-0"+todayDate.getDate() : todayDate.getMonth()+1 < 10 && todayDate.getDate() >= 10 ? todayDate.getFullYear()+"-0"+(todayDate.getMonth()+1)+"-"+todayDate.getDate() : todayDate.getFullYear()+"-0"+(todayDate.getMonth()+1)+"-0"+todayDate.getDate());
    const [reg_status, setRegStatus] = useState(null);
    const [portion, setPortion] = useState(null);
    const [passport_no, setPassportNo] = useState(null);
    const [report, setReport] = useState(null);

    const handleSearchNormal = async (e) =>
    {
        setCandidate(null);

        const requestData = {
            centre_id: props.auth.user.centre.centre_id,
            serial_no: serial_no,
            reg_date: reg_date
        };

        const requestJson = JSON.stringify(requestData);

        if(serial_no == null && reg_date == null)
        {
            toast.warning('Please select date & serial number or input barcode number to proceed!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
        else
        {

            try {
                const response = await toast.promise(fetch(route("lab.fetch_registration_print_normal"), {
                    method: "POST",
                    body: requestJson,
                }),
                {
                    pending: 'Fetching Candidate'
                })
                    .then(res => res.json())
                    .then(
                        (result) => {

                                if(result.registration.length == 0)
                                {
                                    toast.warning('No Registration Found!', {
                                        position: "top-right",
                                        autoClose: 5000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "light",
                                        });
                                }
                                else
                                {
                                    // setSearched(true);
                                    setCandidate(result.registration);
                                    setRegStatus(result.registration.reg_status);
                                    setPortion(result.registration.print_report_portion);
                                    setPassportNo(candidate?.passport_no)
                                    toast.success('Candidate Found!', {
                                        position: "top-right",
                                        autoClose: 5000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "light",
                                        });
                                }
                        },
                        (error) => {

                            toast.error('Something went wrong! Please try again :(', {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                                });
                        }
                    );
            } catch (ex) {

                toast.error('Something went wrong! Please try again :(', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            }
        }
    };

    const handleSearchPassport = async (e) =>
    {
        setCandidate(null);

        const requestData = {
            centre_id: props.auth.user.centre.centre_id,
            passport_no: passport_no
        };

        const requestJson = JSON.stringify(requestData);

        if(passport_no == null)
        {
            toast.warning('Please input barcode number to proceed!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
        else
        {

            try {
                const response = await toast.promise(fetch(route("lab.fetch_registration_print_passport"), {
                    method: "POST",
                    body: requestJson,
                }),
                {
                    pending: 'Fetching Candidate'
                })
                    .then(res => res.json())
                    .then(
                        (result) => {

                                if(result.registration.length == 0)
                                {
                                    toast.warning('No Registration Found!', {
                                        position: "top-right",
                                        autoClose: 5000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "light",
                                        });
                                }
                                else
                                {
                                    // setSearched(true);
                                    setCandidate(result.registration);
                                    setRegStatus(result.registration.reg_status);
                                    setPortion(result.registration.print_report_portion);
                                    toast.success('Candidate Found!', {
                                        position: "top-right",
                                        autoClose: 5000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "light",
                                        });
                                }
                        },
                        (error) => {

                            toast.error('Something went wrong! Please try again :(', {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                                });
                        }
                    );
            } catch (ex) {

                toast.error('Something went wrong! Please try again :(', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            }
        }
    };

    const updatePortion = async (e) =>
    {
        setPortion(e.target.checked ? 'B' : 'A');
        const requestData = {
            centre_id: props.auth.user.centre.centre_id,
            reg_id: candidate?.reg_id,
            portion: e.target.checked ? 'B' : 'A'
        };

        const requestJson = JSON.stringify(requestData);

            try {
                const response = await toast.promise(fetch(route("lab.update_registration_portion"), {
                    method: "POST",
                    body: requestJson,
                }),
                {
                    pending: 'Updating Portion'
                })
                    .then(res => res.json())
                    .then(
                        (result) => {


                                    toast.success('Portion Updated!', {
                                        position: "top-right",
                                        autoClose: 5000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "light",
                                        });
                        },
                        (error) => {

                            toast.error('Something went wrong! Please try again :(', {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                                });
                        }
                    );
            } catch (ex) {

                toast.error('Something went wrong! Please try again :(', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            }
    };

    const updateStatus = async (e) =>
    {
        setRegStatus(e.target.checked ? 'Pending' : candidate?.lab_result?.status == 'UNFIT' || candidate?.xray_result?.status == 'UNFIT' || candidate?.medical?.status == 'UNFIT' ? 'UNFIT' : candidate?.lab_result?.status == 'FIT' && candidate?.xray_result?.status == 'FIT' && candidate?.medical?.status == 'FIT' ? 'FIT' : 'In Process')
        const requestData = {
            centre_id: props.auth.user.centre.centre_id,
            reg_id: candidate?.reg_id,
            status: e.target.checked ? 'Pending' : 'FIT'
        };

        const requestJson = JSON.stringify(requestData);

            try {
                const response = await toast.promise(fetch(route("lab.update_registration_status"), {
                    method: "POST",
                    body: requestJson,
                }),
                {
                    pending: 'Updating Status'
                })
                    .then(res => res.json())
                    .then(
                        (result) => {


                                    toast.success('Status Updated!', {
                                        position: "top-right",
                                        autoClose: 5000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "light",
                                        });
                        },
                        (error) => {

                            toast.error('Something went wrong! Please try again :(', {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                                });
                        }
                    );
            } catch (ex) {

                toast.error('Something went wrong! Please try again :(', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            }
    };

    const handlePrint = async () => {

        const requestData = {
            centre_id: props.auth.user.centre.centre_id,
            barcode_no: candidate?.barcode_no
        };

        const requestJson = JSON.stringify(requestData);

        try {
            setReport(null);
            const response = await toast.promise(fetch(route("lab.export_final_report"), {
                method: "POST",
                body: requestJson,
            }),
            {
                pending: "Fetching Report"
            })
                .then(res => res.json())
                .then(
                    (result) => {

                        toast.success('Report has been generated!', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            });

                            setReport(result.filename);
                    },
                    (error) => {

                        toast.error('Something went wrong! Please try again :(', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            });
                    }
                );
        } catch (ex) {

            toast.error('Something went wrong! Please try again :(', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
    }

    const handleEmbassy = async () => {

        const requestData = {
            centre_id: props.auth.user.centre.centre_id,
            barcode_no: candidate?.barcode_no
        };

        const requestJson = JSON.stringify(requestData);

        try {
            setReport(null);
            const response = await toast.promise(fetch(route("lab.export_embassy_report"), {
                method: "POST",
                body: requestJson,
            }),
            {
                pending: "Fetching Report"
            })
                .then(res => res.json())
                .then(
                    (result) => {

                        toast.success('Report has been generated!', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            });

                            setReport(result.filename);
                    },
                    (error) => {

                        toast.error('Something went wrong! Please try again :(', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            });
                    }
                );
        } catch (ex) {

            toast.error('Something went wrong! Please try again :(', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
    }

    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Print Report</h2>}
        >
            <Head title="Print Report" />
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                />

            <div className="page-header d-print-none">
                <div className="container-xl">
                    <div className="row g-2 align-items-center">
                    <div className="col align-items-center">
                        <div className="col-md-3" style={{float: 'left'}}>
                            <h2 className="page-title" style={{float: 'left'}}>
                                Print Report
                            </h2>
                        </div>
                        <div className="col-md-1 align-items-center" style={{float: 'right'}}>
                            <h2 className="page-title">
                                <button className="btn btn-secondary btn-sm mr-5 btn-pill" onClick={(e) => location.reload()}>
                                    <IconRefresh />
                                </button>
                            </h2>
                        </div>
                    </div>
                    </div>
                </div>
            </div>

            <div className="page-body">
                <div className="container-xl">
                    <div className="row row-cards mb-5">
                        <div className="col-md-6">
                            <div className="row row-cards">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <div className="col-md-12 flex align-items-center">
                                                <div className='col-md-6' style={{float: 'left'}}>
                                                    <h3>Candidate Information</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body" id="manual_import">
                                            <div className="row g-5 mb-3">
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Date</label>
                                                        {props?.auth?.modules?.[11]?.rights?.[1]?.permission_name == 'date_search' && props?.auth?.modules?.[11]?.rights?.[1]?.status == true ?
                                                        <input type="date" className="form-control" name="reg_date" value={reg_date} onChange={(e) => setRegDate(e.target.value)} onKeyDown={event => {
                                                                                                                                                                                                        if (event.key === 'Enter') {
                                                                                                                                                                                                            handleSearchNormal(event)
                                                                                                                                                                                                        }
                                                                                                                                                                                                        }} />
                                                        :
                                                            <IconLock stroke={1} />
                                                        }
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Serial Number</label>
                                                        {props?.auth?.modules?.[11]?.rights?.[1]?.permission_name == 'date_search' && props?.auth?.modules?.[11]?.rights?.[1]?.status == true ?
                                                        <input type="text" className="form-control" name="serial_no" value={serial_no} onChange={(e) => setSerialNo(e.target.value.toUpperCase())} onKeyDown={event => {
                                                                                                                                                                                                                        if (event.key === 'Enter') {
                                                                                                                                                                                                                            handleSearchNormal(event)
                                                                                                                                                                                                                        }
                                                                                                                                                                                                                        }} />
                                                        :
                                                            <IconLock stroke={1} />
                                                        }
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Passport Number</label>
                                                        {props?.auth?.modules?.[11]?.rights?.[2]?.permission_name == 'passport_search' && props?.auth?.modules?.[11]?.rights?.[2]?.status == true ?
                                                        <input type="text" className="form-control" name="passport_no"  onChange={(e) => setPassportNo(e.target.value.toUpperCase())} onKeyDown={event => {
                                                                                                                                                                                                            if (event.key === 'Enter') {
                                                                                                                                                                                                                handleSearchPassport(event)
                                                                                                                                                                                                            }
                                                                                                                                                                                                            }} />
                                                        :
                                                            <IconLock stroke={1} />
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {candidate && (
                            <div className="row row-cards">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <div className="col-md-12 flex align-items-center">
                                                <div className='col-md-6' style={{float: 'left'}}>
                                                    <h3>Candidate Information</h3>
                                                </div>
                                            </div>
                                        </div><div className="card-body" id="manual_import">
                                        <div className="row g-5 mb-3">
                                                <div className="col-6">
                                                    <img src={candidate?.candidate_image} />
                                                </div>
                                                <div className="col-6">
                                                    <img src={candidate?.candidate_passport} />
                                                </div>
                                            </div>
                                            <div className="row g-5 mb-3">
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Candidate Name</label>
                                                        <input type="text" className="form-control" name="candidate_name" value={candidate?.candidate_name} disabled={true} />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>S/O or D/O or W/O</label>
                                                        <input type="text" className="form-control" name="passport_no" value={candidate?.relative_name} disabled={true} />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Passport Number</label>
                                                        <input type="text" className="form-control" name="passport_issue_date" value={candidate?.passport_no} disabled={true} />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>CNIC</label>
                                                        <input type="text" className="form-control" name="passport_expiry_date" value={candidate?.cnic} disabled={true} />
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Country</label>
                                                        <input type="text" className="form-control" name="dob" value={candidate?.country} disabled={true} />
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Registration Date</label>
                                                        <input type="date" className="form-control" name="passport_image" value={candidate?.reg_date} disabled={true} />
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Serial No</label>
                                                        <input type="text" className="form-control" name="passport_image" value={candidate?.serial_no} disabled={true} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            )}
                        </div>
                        <div className="col-md-6">
                            <div className="row row-cards">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-body" id="manual_import">
                                            <div className="row g-5 mb-3">
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        {props?.auth?.modules?.[11]?.rights?.[1]?.permission_name == 'date_search' && props?.auth?.modules?.[11]?.rights?.[1]?.status == true ?
                                                        <button className="btn btn-primary btn-md" onClick={handleSearchNormal}>Find Candidate</button>
                                                        :
                                                        <button className="btn btn-info btn-md" onClick={''} disabled={candidate == null}>
                                                            <IconLock stroke={1} />
                                                            Find Candidate
                                                        </button>
                                                        }
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row g-3">
                                                        {props?.auth?.modules?.[11]?.rights?.[2]?.permission_name == 'passport_search' && props?.auth?.modules?.[11]?.rights?.[2]?.status == true ?
                                                        <button className="btn btn-info btn-md" onClick={handleSearchPassport}>Find Candidate by Passport</button>
                                                        :
                                                        <button className="btn btn-info btn-md" onClick={''} disabled={candidate == null}>
                                                            <IconLock stroke={1} />
                                                            Find Candidate by Passport
                                                        </button>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row g-5 mb-3">
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        {props?.auth?.modules?.[11]?.rights?.[3]?.permission_name == 'print_report' && props?.auth?.modules?.[11]?.rights?.[3]?.status == true ?
                                                        <button className="btn btn-success btn-md" data-bs-toggle="modal" data-bs-target="#final-report" disabled={candidate == null || candidate?.xray_result == null || candidate?.medical == null || candidate?.lab_result == null || reg_status == 'Pending'} onClick={handlePrint}>Print Report</button>
                                                        :
                                                        <button className="btn btn-success btn-md" onClick={''} disabled={candidate == null}>
                                                            <IconLock stroke={1} />
                                                            Print Report
                                                        </button>
                                                        }
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div className="row g-3 align-items-center">
                                                        {props?.auth?.modules?.[11]?.rights?.[5]?.permission_name == 'view_history' && props?.auth?.modules?.[11]?.rights?.[5]?.status == true ?
                                                        <button className="btn btn-secondary btn-md" data-bs-toggle="modal" data-bs-target="#history-report" disabled={candidate == null}>History</button>
                                                        :
                                                        <button className="btn btn-secondary btn-md" onClick={''} disabled={candidate == null}>
                                                            <IconLock stroke={1} />
                                                            History
                                                        </button>
                                                        }
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row g-3">
                                                        {props?.auth?.modules?.[11]?.rights?.[4]?.permission_name == 'print_embassy_slip' && props?.auth?.modules?.[11]?.rights?.[4]?.status == true ?
                                                        <button className="btn btn-outline-success btn-md" data-bs-toggle="modal" data-bs-target="#embassy-report" onClick={handleEmbassy} disabled={candidate == null}>Embassy Slip</button>
                                                        :
                                                        <button className="btn btn-outline-success btn-md" onClick={''} disabled={candidate == null}>
                                                            <IconLock stroke={1} />
                                                            Embassy Slip
                                                        </button>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row g-5 mb-3">
                                                <div className='col-md-4'>
                                                    {props?.auth?.modules?.[11]?.rights?.[6]?.permission_name == 'b+' && props?.auth?.modules?.[11]?.rights?.[6]?.status == true ?
                                                    <label className="form-check form-switch">
                                                        <input className="form-check-input" type="checkbox" disabled={candidate == null} checked={portion == 'B' ? true : false} onChange={updatePortion}/>
                                                        <span className="form-check-label h2">B+</span>
                                                    </label>
                                                    :
                                                    <label className="form-check form-switch" style={{display: 'flex'}}>
                                                        <IconLock stroke={1} />
                                                        <span className="form-check-label h2">B+</span>
                                                    </label>
                                                    }
                                                </div>
                                                <div className='col-md-4'>
                                                    {props?.auth?.modules?.[11]?.rights?.[7]?.permission_name == 'status_change' && props?.auth?.modules?.[11]?.rights?.[7]?.status == true ?
                                                    <label className="form-check form-switch">
                                                        <input className="form-check-input" type="checkbox" disabled={candidate == null} checked={reg_status == 'Pending' ? true : false} onChange={updateStatus}/>
                                                        <span className="form-check-label h2">Pending</span>
                                                    </label>
                                                    :
                                                    <label className="form-check form-switch" style={{display: 'flex'}}>
                                                        <IconLock stroke={1} />
                                                        <span className="form-check-label h2">Pending</span>
                                                    </label>
                                                    }
                                                </div>
                                                {reg_status != null?
                                                <div className='col-md-4'>
                                                    <span className={`badge ${reg_status == 'In Process' || reg_status == 'Pending' ? 'bg-warning' : reg_status == 'FIT' ? 'bg-success' : 'bg-danger'} text-white form-check-label h2`}>{reg_status}</span>
                                                </div>
                                                :
                                                <></>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {candidate && (
                            <>
                            <div className='row row-cards'>
                                <div className='col-12'>
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="d-flex align-items-center">
                                                <div className="subheader">XRAY</div>
                                                <div class="ms-auto lh-1">
                                                    <div class="dropdown">
                                                        <a className="text-secondary" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{candidate?.xray_result != null ? candidate?.xray_result?.status : 'In Process'}</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="h1 mb-3">
                                                {candidate?.xray_verification != null ? candidate?.xray_result != null ? '100%' : '50%' : '0%'}
                                            </div>
                                            <div className="progress progress-sm">
                                                <div className="progress-bar bg-primary" style={{width: `${candidate?.xray_verification != null ? candidate?.xray_result != null ? '100%' : '50%' : '0%'}`}} role="progressbar" aria-valuenow={candidate?.xray_verification != null ? candidate?.xray_result != null ? '100' : '50' : '0'} aria-valuemin="0" aria-valuemax="100" aria-label={candidate?.xray_verification != null ? candidate?.xray_result != null ? '100% Complete' : '50% Complete' : '0% Complete'}>
                                                    <span className="visually-hidden">{candidate?.xray_verification != null ? candidate?.xray_result != null ? '100%' : '50%' : '0%'} Complete</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row row-cards'>
                                <div className='col-12'>
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="d-flex align-items-center">
                                                <div className="subheader">Lab</div>
                                                <div class="ms-auto lh-1">
                                                    <div class="dropdown">
                                                        <a className="text-secondary" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{candidate?.lab_result != null ? candidate?.lab_result?.status : 'In Process'}</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="h1 mb-3">
                                                {candidate?.lab_stickers != null ? candidate?.lab_result != null ? '100%' : '50%' : '0%'}
                                            </div>
                                            <div className="progress progress-sm">
                                                <div className="progress-bar bg-primary" style={{width: `${candidate?.lab_stickers != null ? candidate?.lab_result != null ? '100%' : '50%' : '0%'}`}} role="progressbar" aria-valuenow={candidate?.lab_stickers != null ? candidate?.lab_result != null ? '100' : '50' : '0'} aria-valuemin="0" aria-valuemax="100" aria-label={candidate?.lab_stickers != null ? candidate?.lab_result != null ? '100% Complete' : '50% Complete' : '0% Complete'}>
                                                    <span className="visually-hidden">{candidate?.lab_stickers != null ? candidate?.lab_result != null ? '100%' : '50%' : '0%'} Complete</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row row-cards'>
                                <div className='col-12'>
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="d-flex align-items-center">
                                                <div className="subheader">Medical</div>
                                                <div class="ms-auto lh-1">
                                                    <div class="dropdown">
                                                        <a className="text-secondary" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{candidate?.medical != null ? candidate?.medical?.status : 'In Process'}</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="h1 mb-3">
                                                {candidate?.sample_collection != null ? candidate?.medical != null ? '100%' : '50%' : '0%'}
                                            </div>
                                            <div className="progress progress-sm">
                                                <div className="progress-bar bg-primary" style={{width: `${candidate?.sample_collection != null ? candidate?.medical != null ? '100%' : '50%' : '0%'}`}} role="progressbar" aria-valuenow={candidate?.sample_collection != null ? candidate?.medical != null ? '100' : '50' : '0'} aria-valuemin="0" aria-valuemax="100" aria-label={candidate?.sample_collection != null ? candidate?.medical != null ? '100% Complete' : '50% Complete' : '0% Complete'}>
                                                    <span className="visually-hidden">{candidate?.sample_collection != null ? candidate?.medical != null ? '100%' : '50%' : '0%'} Complete</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div class="row">
                                <div class="col-lg-6">
                                <div style={{width: '19rem'}}>
                                    <div class="card card-stats mb-4 mb-lg-0">
                                    <div class="card-body">
                                        <div class="row">
                                        <div class="col">
                                            <h5 class="card-title text-uppercase text-muted mb-0">Registration</h5>
                                            <div class="row mt-3 mb-0 text-muted text-sm">
                                                <span class="text-nowrap mr-2">Registration by {candidate?.reg_by}</span>
                                                <span class="text-nowrap">on {candidate?.reg_created_at.substr(0, 10)}</span>
                                            </div>
                                        </div>
                                        <div class="col-auto">
                                            <div class="icon icon-shape bg-info text-white rounded-circle shadow">
                                            <i class="fa fa-user-plus text-orange"></i>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>

                                <div class="col-lg-6">
                                <div style={{width: '18.5rem'}}>
                                    <div class="card card-stats mb-4 mb-lg-0">
                                    <div class="card-body">
                                        <div class="row">
                                        <div class="col">
                                            <h5 class="card-title text-uppercase text-muted mb-0">PP Check</h5>
                                            <div class="row mt-3 mb-0 text-muted text-sm">
                                                <span class="text-nowrap mr-2">PP checked by {candidate?.pp_check?.pp_check_by}</span>
                                                <span class="text-nowrap">on {candidate?.pp_check?.created_at.substr(0, 10)}</span>
                                            </div>
                                        </div>
                                        <div class="col-auto">
                                            <div class="icon icon-shape bg-info text-white rounded-circle shadow">
                                            <i class="fa fa-fingerprint text-danger"></i>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                                </div>
                                <div class="row">
                                <div class="col-lg-6">
                                <div style={{width: '19rem'}}>
                                    <div class="card card-stats mb-4 mb-lg-0">
                                    <div class="card-body">
                                        <div class="row">
                                        <div class="col">
                                            <h5 class="card-title text-uppercase text-muted mb-0">Medical Examination</h5>
                                            <div class="row mt-3 mb-0 text-muted text-sm">
                                                <span class="text-nowrap mr-2">Medical examination by {candidate?.medical?.medical_by}</span>
                                                <span class="text-nowrap">on {candidate?.medical?.created_at.substr(0, 10).substr(0, 10)}</span>
                                            </div>
                                        </div>
                                        <div class="col-auto">
                                            <div class="icon icon-shape bg-info text-white rounded-circle shadow">
                                            <i class="fa fa-file-medical-alt text-orange"></i>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>

                                <div class="col-lg-6">
                                <div style={{width: '18.5rem'}}>
                                    <div class="card card-stats mb-4 mb-lg-0">
                                    <div class="card-body">
                                        <div class="row">
                                        <div class="col">
                                            <h5 class="card-title text-uppercase text-muted mb-0">Picture</h5>
                                            <div class="row mt-3 mb-0 text-muted text-sm">
                                                <span class="text-nowrap mr-2">Picture Taken by: {candidate?.reg_by}</span>
                                                <span class="text-nowrap">on {candidate?.created_at.substr(0, 10).substr(0, 10)}</span>
                                            </div>
                                        </div>
                                        <div class="col-auto">
                                            <div class="icon icon-shape bg-info text-white rounded-circle shadow">
                                            <i class="ni ni-circle-08 text-orange"></i>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                                </div>

                                <div class="row">
                                <div class="col-lg-6">
                                <div style={{width: '18.5rem'}}>
                                    <div class="card card-stats mb-4 mb-lg-0">
                                    <div class="card-body">
                                        <div class="row">
                                        <div class="col">
                                            <h5 class="card-title text-uppercase text-muted mb-0">Lab Sticker</h5>
                                            <div class="row mt-3 mb-0 text-muted text-sm">
                                                <span class="text-nowrap mr-2">Sticker Printed by {candidate?.lab_stickers?.lab_sticker_by}</span>
                                                <span class="text-nowrap">on {candidate?.lab_stickers?.updated_by}</span>
                                            </div>
                                        </div>
                                        <div class="col-auto">
                                            <div class="icon icon-shape bg-info text-white rounded-circle shadow">
                                            <i class="fa fa-plus-square text-danger"></i>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>

                                <div class="col-lg-6">
                                <div style={{width: '19rem'}}>
                                    <div class="card card-stats mb-4 mb-lg-0">
                                    <div class="card-body">
                                        <div class="row">
                                        <div class="col">
                                            <h5 class="card-title text-uppercase text-muted mb-0">Lab Results</h5>
                                            <div class="row mt-3 mb-0 text-muted text-sm">
                                                <span class="text-nowrap mr-2">Result Updated by {candidate?.lab_result?.lab_result_by}</span>
                                                <span class="text-nowrap">on {candidate?.lab_result?.created_at.substr(0, 10).substr(0, 10)}</span>
                                            </div>
                                        </div>
                                        <div class="col-auto">
                                            <div class="icon icon-shape bg-info text-white rounded-circle shadow">
                                            <i class="fa fa-plus-square text-danger"></i>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                                </div>

                                <div class="row">
                                <div class="col-lg-6">
                                <div style={{width: '18.5rem'}}>
                                    <div class="card card-stats mb-4 mb-lg-0">
                                    <div class="card-body">
                                        <div class="row">
                                        <div class="col">
                                            <h5 class="card-title text-uppercase text-muted mb-0">X-Ray Verification</h5>
                                            <div class="row mt-3 mb-0 text-muted text-sm">
                                                <span class="text-nowrap mr-2">Verified By {candidate?.xray_verification?.xray_verification_by}</span>
                                                <span class="text-nowrap">on {candidate?.xray_verification?.created_at.substr(0, 10).substr(0, 10)}</span>
                                            </div>
                                        </div>
                                        <div class="col-auto">
                                            <div class="icon icon-shape bg-info text-white rounded-circle shadow">
                                            <i class="fa fa-x-ray text-orange"></i>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>

                                <div class="col-lg-6">
                                <div style={{width: '18.5rem'}}>
                                    <div class="card card-stats mb-4 mb-lg-0">
                                    <div class="card-body">
                                        <div class="row">
                                        <div class="col">
                                            <h5 class="card-title text-uppercase text-muted mb-0">X-Ray Result</h5>
                                            <div class="row mt-3 mb-0 text-muted text-sm">
                                                <span class="text-nowrap mr-2">Result Updated by {candidate?.xray_verification?.xray_result_by}</span>
                                                <span class="text-nowrap">on {candidate?.xray_result?.created_at.substr(0, 10).substr(0, 10)}</span>
                                            </div>
                                        </div>
                                        <div class="col-auto">
                                            <div class="icon icon-shape bg-info text-white rounded-circle shadow">
                                            <i class="fa fa-x-ray text-orange"></i>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                                </div>

                                <div class="row">
                                <div class="col-lg-6">
                                <div style={{width: '19rem'}}>
                                    <div class="card card-stats mb-4 mb-lg-0">
                                    <div class="card-body">
                                        <div class="row">
                                        <div class="col">
                                            <h5 class="card-title text-uppercase text-muted mb-0">Blood Sample</h5>
                                            <div class="row mt-3 mb-0 text-muted text-sm">
                                                <span class="text-nowrap mr-2">Sample Collected by {candidate?.sample_collection?.sample_collected_by}</span>
                                                <span class="text-nowrap">on {candidate?.sample_collection?.created_at.substr(0, 10).substr(0, 10)}</span>
                                            </div>
                                        </div>
                                        <div class="col-auto">
                                            <div class="icon icon-shape bg-info text-white rounded-circle shadow">
                                            <i class="fa fa-vials text-danger"></i>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>

                                <div class="col-lg-6">
                                <div style={{width: '18.5rem'}}>
                                    <div class="card card-stats mb-4 mb-lg-0">
                                    <div class="card-body">
                                        <div class="row">
                                        <div class="col">
                                            <h5 class="card-title text-uppercase text-muted mb-0">Report Issue</h5>
                                            <div class="row mt-3 mb-0 text-muted text-sm">
                                                <span class="text-nowrap mr-2">Report Issued by {candidate?.report_issue?.report_issue_by}</span>
                                                <span class="text-nowrap">on {candidate?.report_issue?.created_at.substr(0, 10)}</span>
                                            </div>
                                        </div>
                                        <div class="col-auto">
                                            <div class="icon icon-shape bg-info text-white rounded-circle shadow">
                                            <i class="fa fa-file text-orange"></i>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                                </div>
                                </>
                            )}
                        </div>
                    </div>

                </div>
            </div>

            {/* Final Report Modal */}
            <div className={`modal modal-blur fade`} id="final-report" tabindex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Final Report</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                    <div className="modal-body">
                        <iframe src={report} style={{height: '300px', width: '100%'}}></iframe>
                    </div>
                    <div className="modal-footer">
                        <a href="#" className="btn btn-link link-secondary" data-bs-dismiss="modal">
                            Close
                        </a>
                    </div>
                    </div>
                </div>
            </div>
            {/* Final Report Modal */}

            {/* History Modal */}
            <div className={`modal modal-blur fade`} id="history-report" tabindex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Candidate Medical History</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                    <div className="modal-body">
                        <div class="table-responsive">
                            <table class="table card-table table-vcenter text-nowrap datatable">
                                <tbody>
                                {candidate?.history?.length > 0 ? candidate?.history?.map((h, index) => (
                                <>
                                    <tr style={{backgroundColor: 'blue'}}>
                                        <td className='text-white'>Examination Date</td>
                                        <td className='text-white'>{h?.reg_date}</td>
                                    </tr>
                                    <tr>
                                        <td>Serial No</td>
                                        <td>{h?.serial_no}</td>
                                    </tr>
                                    <tr>
                                        <td>XRAY Remark</td>
                                        <td>{h?.xray_remarks}</td>
                                    </tr>
                                    <tr>
                                        <td>Medical Remark</td>
                                        <td>{h?.medical_remarks}</td>
                                    </tr>
                                    <tr>
                                        <td>Registration Remark</td>
                                        <td>{h?.remarks}</td>
                                    </tr>
                                </>
                                ))
                                :
                                <></>
                                }
                                </tbody>
                            </table>
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
            {/* Final Report Modal */}

            {/* Embassy Slip Modal */}
            <div className={`modal modal-blur fade`} id="embassy-report" tabindex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Embassy Slip</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                    <div className="modal-body">
                        <iframe src={report} style={{height: '300px', width: '100%'}}></iframe>
                    </div>
                    <div className="modal-footer">
                        <a href="#" className="btn btn-link link-secondary" data-bs-dismiss="modal">
                            Close
                        </a>
                    </div>
                    </div>
                </div>
            </div>
            {/* Embassy Slip Modal */}

        </AuthenticatedLayout>
    );
}
