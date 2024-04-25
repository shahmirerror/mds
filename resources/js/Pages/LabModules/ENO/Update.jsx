import { useEffect, useState } from 'react';
import Checkbox from '@/Components/Checkbox';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { IconCrosshair, IconClipboardText  } from '@tabler/icons-react';
import { IconRefresh } from '@tabler/icons-react';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function Update(props) {

    const [barcode, setBarcode] = useState(null);
    const [date, setRegDate] = useState(null);
    const [serial_no, setSerialNo] = useState(null);
    const [passport, setPassport] = useState(null);
    const [currToken, setToken] = useState('None');

    const [candidate, setCandidate] = useState(null);
    const [exist, setExist] = useState(false);

    const [searched, setSearched] = useState(false);

    const {data, setData, post, processing, errors, reset} = useForm({
        eno: '',
        screenshot: null
    });

    const handleChange = (e) => {
        // console.log(e.target.files[0]);
        setData(e.target.name, e.target.type == 'file' ? e.target.files[0] : e.target.value);

        console.log(e.target.name, e.target.type == 'file' ? e.target.files[0] : e.target.value);
    }
    const handleSearch = async (e) =>
    {
        setCandidate(null);

        const requestData = {
            centre_id: props.auth.user.centre.centre_id,
            barcode: passport,
            process_id: 'eno'
        };

        const requestJson = JSON.stringify(requestData);

        if(passport == null)
        {
            toast.warning('Please input Passport Number', {
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
                const response = await toast.promise(fetch(route("lab.fetch_registration"), {
                    method: "POST",
                    body: requestJson,
                }),
                {
                    pending: "Fetching Candidate"
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
                                    setCandidate(result.registration);
                                    setSearched(true);
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
                            console.log(error)
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
                console.log(ex)
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

    const handleSubmit = async (e) =>
    {
        e.target.disabled = true;
        const requestData = {
            centre_id: props.auth.user.centre.centre_id,
            reg_id: candidate?.reg_id,
            eno: data.eno,
            screenshot: data.screenshot
        };

        const requestJson = JSON.stringify(requestData);

            try {
                const response = await toast.promise(fetch(route("lab.submit_eno"), {
                    method: "POST",
                    body: requestJson,
                }),
                {
                    pending: "Submitting Form"
                })
                    .then(res => res.json())
                    .then(
                        (result) => {


                            toast.success('Form Submitted Successfully!', {
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
                            console.log(error)
                            e.target.disabled = false;
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
                console.log(ex)
                e.target.disabled = false;
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

    const handleReset = (e) =>
    {
        setCandidate(null);
        setBarcode(null);
        setRegDate(null);
        setSerialNo(null);
        setSearched(false);
    };

    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Electronic Numbers</h2>}
        >
            <Head title="Electronic Numbers" />
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
                                Electronic Numbers
                            </h2>
                        </div>
                        <div className="col-md-3 align-items-center" style={{float: 'right'}}>
                            <h2 className="page-title">
                                <button className="btn btn-secondary btn-sm mr-5 btn-pill" onClick={() => location.reload()}>
                                    <IconRefresh />
                                </button>
                                <span className="badge">Current Token: {currToken}</span>
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
                                                    <h2>Candidate Information</h2>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {candidate && (
                                <>
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="row g-5 mb-3">
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <img src={candidate?.candidate_image} />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Candidate Name</label>
                                                        <input type="text" className="form-control" name="reg_date" disabled value={candidate?.candidate_name} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row g-5 mb-3">
                                                <div className="col-3">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Passport Number</label>
                                                        <input type="text" className="form-control" name="reg_date" disabled value={candidate?.passport_no} />
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Serial No</label>
                                                        <input type="text" className="form-control" name="reg_date" disabled value={candidate?.serial_no} />
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Country</label>
                                                        <input type="text" className="form-control" name="reg_date" disabled value={candidate?.country} />
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Status</label>
                                                        <input type="text" className="form-control" name="reg_date" disabled value={candidate?.status} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row g-5 mb-3">
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>ENO</label>
                                                        <input type="text" className="form-control" name="eno" value={candidate?.eno} disabled={candidate?.status != 'FIT'} onChange={handleChange}/>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>ENO Date</label>
                                                        <input type="text" className="form-control" name="reg_date" value={candidate?.eno_date} disabled={candidate?.status != 'FIT'} />
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Screenshot</label>
                                                        <input type="file" className="form-control" name="screenshot" onChange={handleChange} disabled={candidate?.status != 'FIT'} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row g-5 mb-3">
                                                <div className="col-6">
                                                    <button type="button" className='btn btn-info btn-md' disabled={candidate == null || candidate?.status != 'FIT'} onClick={handleSubmit}>Submit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </>
                                )}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="row row-cards">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="row g-5 mb-3">
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Passport Number</label>
                                                        <input type="text" className="form-control" name="passport_no" value={passport} onChange={(e) => setPassport(e.target.value)} onKeyDown={event => {
                                                                                                                                                                                                            if (event.key === 'Enter') {
                                                                                                                                                                                                                handleSearch(event)
                                                                                                                                                                                                            }
                                                                                                                                                                                                            }} />
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center mt-4">
                                                        <button className={'btn btn-md btn-outline-info'} onClick={handleSearch} disabled={searched}>Search for Candidate</button>
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
                                        <div className="card-body">
                                            <div className="row g-5 mb-3">
                                                <img src={candidate?.screenshot} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
