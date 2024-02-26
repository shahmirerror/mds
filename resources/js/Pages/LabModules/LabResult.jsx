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

export default function LabResult(props) {

    const [barcode, setBarcode] = useState(null);
    const [date, setRegDate] = useState(null);
    const [serial_no, setSerialNo] = useState(null);
    const [currToken, setToken] = useState('None');

    const [candidate, setCandidate] = useState(null);
    const [result, setResult] = useState(null);
    const [exist, setExist] = useState(false);

    const [searched, setSearched] = useState(false);

    const {data, setData, post, processing, errors, reset} = useForm({
        sugar: '',
        albumin: '',
        hiv: '',
        hcv: '',
        alk: '',
        ast: '',
        alt: '',
        ova: '',
        cyst: '',
        tb: '',
        pregnancy: '',
        hbsag: '',
        vdrl: '',
        tpha: '',
        bil: '',
        creatinine: '',
        blood_group: '',
        haemoglobin: '',
        rbs: '',
        malaria: '',
        micro_filariae: '',
        polio: '',
        polio_date: '',
        mmr1: '',
        mmr1_date: '',
        mmr2: '',
        mmr2_date: '',
        meningococcal: '',
        meningococcal_date: ''
    });

    const handleSearch = async (e) =>
    {
        setResult(null);
        setCandidate(null);

        e.target.disabled = true;

        const requestData = {
            centre_id: props.auth.user.centre.centre_id,
            barcode: barcode,
            serial_no: serial_no,
            reg_date: date,
            process_id: 'lab'
        };

        const requestJson = JSON.stringify(requestData);

        if(serial_no == null && date == null && barcode == null)
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
                const response = await toast.promise(fetch(route("lab.fetch_registration"), {
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
                                    e.target.disabled = false;
                                    toast.warning('No Candidate Found!', {
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

                                    if(result.verified?.length == 0 || result.verified == false)
                                    {
                                        setResult(result.verified);
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
                                    else
                                    {
                                        toast.warning('Candidate Lab Result Exists!', {
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
                        },
                        (error) => {
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
        }
    };

    const handleSubmit = async (e) =>
    {
        e.target.disabled = true;

        const requestData = {
            centre_id: props.auth.user.centre.centre_id,
            reg_id: candidate?.reg_id,
            data: data
        };

        const requestJson = JSON.stringify(requestData);

        try {
            const response = await toast.promise(fetch(route("lab.store_lab_result"), {
                method: "POST",
                body: requestJson,
            }),
            {
                pending: 'Submitting Form'
            })
                .then(res => res.json())
                .then(
                    (result) => {

                            if(result.message == 'Lab Result Stored')
                            {
                                e.target.disabled = false;
                                toast.success('Lab Result has been saved!', {
                                    position: "top-right",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "light",
                                    });

                                handleReset();
                            }
                            else
                            {
                                e.target.disabled = false;
                                handleReset();
                                toast.warning('Candidate Lab Result Exists!', {
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

    const handleUpdate = async (e) =>
    {
        e.target.disabled = true;

        const requestData = {
            centre_id: props.auth.user.centre.centre_id,
            reg_id: candidate?.reg_id,
            data: data
        };

        const requestJson = JSON.stringify(requestData);

        try {
            const response = await toast.promise(fetch(route("lab.update_lab_result"), {
                method: "POST",
                body: requestJson,
            }),
            {
                pending: 'Submitting Form'
            })
                .then(res => res.json())
                .then(
                    (result) => {

                            if(result.message == 'Lab Result Updated')
                            {
                                e.target.disabled = false;
                                toast.success('Lab Result has been updaed!', {
                                    position: "top-right",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "light",
                                    });

                                handleReset();
                            }
                    },
                    (error) => {
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

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    }

    const handleReset = (e) =>
    {
        setCandidate(null);
        setBarcode('');
        setRegDate('');
        setSerialNo('');
        setSearched(false);
    };

    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Lab Result</h2>}
        >
            <Head title="Lab Result" />
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
                                Lab Result
                            </h2>
                        </div>
                        <div className="col-md-3 align-items-center" style={{float: 'right'}}>
                            <h2 className="page-title">
                                <button className="btn btn-secondary btn-sm mr-5 btn-pill" onClick={handleReset}>
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
                                        <div className="card-body">
                                            <div className="row g-5 mb-3">
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Barcode</label>
                                                        <input type="password" className="form-control" name="barcode" value={barcode} onChange={(e) => setBarcode(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Date</label>
                                                        <input type="date" className="form-control" name="reg_date" value={date} onChange={(e) => setRegDate(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Serial Number</label>
                                                        <input type="text" className="form-control" name="serial_no" value={serial_no} onChange={(e) => setSerialNo(e.target.value)} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row g-5 mb-3">
                                                <div className="col-2">
                                                </div>
                                                <div className="col-4">
                                                    <button className={'btn btn-md btn-outline-secondary'} disabled={searched ? false : true} onClick={handleReset}>Reset Form</button>
                                                </div>
                                                <div className="col-4">
                                                    <button className={'btn btn-md btn-outline-info'} disabled={searched} onClick={handleSearch}>Search for Candidate</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {candidate != null && (
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <div className="col-md-12 flex align-items-center">
                                                <div className='col-md-6' style={{float: 'left'}}>
                                                    <h3>Candidate Information</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="row g-5 mb-3">
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Candidate Name</label>
                                                        <input type="text" className="form-control" name="reg_date" disabled value={candidate?.candidate_name}/>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Passport Number</label>
                                                        <input type="text" className="form-control" name="serial_no" disabled value={candidate?.passport_no} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row g-5 mb-3">
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Passport Issue Date</label>
                                                        <input type="date" className="form-control" name="reg_date" disabled value={candidate?.passport_issue_date} />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Passport Expiry Date</label>
                                                        <input type="date" className="form-control" name="serial_no" disabled value={candidate?.passport_expiry_date} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row g-5 mb-3">
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Registration Date</label>
                                                        <input type="date" className="form-control" name="reg_date" disabled value={candidate?.reg_date} />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Serial Number</label>
                                                        <input type="text" className="form-control" name="serial_no" disabled value={candidate?.serial_no} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row g-5 mb-3">
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Agency</label>
                                                        <input type="text" className="form-control" name="serial_no" disabled value={candidate?.agency} />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Country</label>
                                                        <input type="text" className="form-control" name="serial_no" disabled value={candidate?.country} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row g-5 mb-3">
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Profession</label>
                                                        <input type="text" className="form-control" name="serial_no" disabled value={candidate?.profession} />
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Fees</label>
                                                        <input type="text" className="form-control" name="serial_no" disabled value={candidate?.fee_charged} />
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Discount</label>
                                                        <input type="text" className="form-control" name="serial_no" disabled value={candidate?.discount} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row g-5 mb-3">
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Relation</label>
                                                        <input type="text" className="form-control" name="serial_no" disabled value={candidate?.relation_type} />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Relative Name</label>
                                                        <input type="text" className="form-control" name="serial_no" disabled value={candidate?.relative_name} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row g-5 mb-3">
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Phone 1</label>
                                                        <input type="text" className="form-control" name="serial_no" disabled value={candidate?.phone_1} />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Phone 2</label>
                                                        <input type="text" className="form-control" name="serial_no" disabled value={candidate?.phone_2} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row g-5">
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Marital Status</label>
                                                        <input type="text" className="form-control" name="serial_no" disabled value={candidate?.marital_status} />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Remarks</label>
                                                        <textarea className="form-control" disabled>{candidate?.remarks}</textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                )}

                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="row row-cards">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <div className="col-md-12 flex align-items-center">
                                                <div className='col-md-12' style={{float: 'left'}}>
                                                    <h2 style={{float: "left"}} className={'h2'}>URINE</h2>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="row g-5 mb-3">
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Sugar</label>
                                                        <select className="form-select" name="sugar" value={data.sugar} onChange={handleChange} >
                                                            <option value="--">- SELECT -</option>
                                                            <option value="negative">Negative</option>
                                                            <option value="positive">Positive</option>
                                                            <option value="see notes">See Notes</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Albumin</label>
                                                        <select className="form-select" name="albumin" value={data.albumin} onChange={handleChange} >
                                                            <option value="--">- SELECT -</option>
                                                            <option value="negative">Negative</option>
                                                            <option value="positive">Positive</option>
                                                            <option value="see notes">See Notes</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <div className="col-md-12 flex align-items-center">
                                                <div className='col-md-12' style={{float: 'left'}}>
                                                    <h2 style={{float: "left"}} className={'h2'}>STOOL</h2>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="row g-5 mb-3">
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Helminthes</label>
                                                        <select className="form-select" name="helminthes" value={data.helminthes} onChange={handleChange} >
                                                            <option value="--">- SELECT -</option>
                                                            <option value="absent">Absent</option>
                                                            <option value="present">Present</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>OVA</label>
                                                        <select className="form-select" name="ova" value={data.ova} onChange={handleChange} >
                                                            <option value="--">- SELECT -</option>
                                                            <option value="absent">Absent</option>
                                                            <option value="present">Present</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Cyst</label>
                                                        <select className="form-select" name="cyst" value={data.cyst} onChange={handleChange} >
                                                            <option value="--">- SELECT -</option>
                                                            <option value="absent">Absent</option>
                                                            <option value="present">Present</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="row g-5 mb-3">
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>T.B Test</label>
                                                        <select className="form-select" name="tb" value={data.tb} onChange={handleChange} >
                                                            <option value="--">- SELECT -</option>
                                                            <option value="absent">Absent</option>
                                                            <option value="present">Present</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Pregnancy Test</label>
                                                        <select className="form-select" name="pregnancy" value={data.pregnancy} onChange={handleChange} >
                                                            <option value="--">--</option>
                                                            <option value="negative">Negative</option>
                                                            <option value="positive">Positive</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <div className="col-md-12 flex align-items-center">
                                                <div className='col-md-12' style={{float: 'left'}}>
                                                    <h2 style={{float: "left"}} className={'h2'}>SEROLOGY</h2>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="row g-5 mb-3">
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>HCV</label>
                                                        <select className="form-select" name="hcv" value={data.hcv} onChange={handleChange} >
                                                            <option value="--">- SELECT -</option>
                                                            <option value="negative">Negative</option>
                                                            <option value="positive">Positive</option>
                                                            <option value="see notes">See Notes</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>HBsAg</label>
                                                        <select className="form-select" name="hbsag" value={data.hbsag} onChange={handleChange} >
                                                            <option value="--">- SELECT -</option>
                                                            <option value="negative">Negative</option>
                                                            <option value="positive">Positive</option>
                                                            <option value="see notes">See Notes</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>HIV 1.2</label>
                                                        <select className="form-select" name="hiv" value={data.hiv} onChange={handleChange} >
                                                            <option value="--">- SELECT -</option>
                                                            <option value="negative">Negative</option>
                                                            <option value="positive">Positive</option>
                                                            <option value="see notes">See Notes</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>VDRL</label>
                                                        <select className="form-select" name="vdrl" value={data.vdrl} onChange={handleChange} >
                                                            <option value="--">- SELECT -</option>
                                                            <option value="negative">Negative</option>
                                                            <option value="positive">Positive</option>
                                                            <option value="see notes">See Notes</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>TPHA</label>
                                                        <select className="form-select" name="tpha" value={data.tpha} onChange={handleChange} >
                                                            <option value="--">- SELECT -</option>
                                                            <option value="negative">Negative</option>
                                                            <option value="positive">Positive</option>
                                                            <option value="see notes">See Notes</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <div className="col-md-12 flex align-items-center">
                                                <div className='col-md-12' style={{float: 'left'}}>
                                                    <h2 style={{float: "left"}} className={'h2'}>BIOCHEMISTRY</h2>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="row g-5 mb-3">
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>R.B.S</label>
                                                        <input className="form-control" type="text" name="rbs" id="rbs" value={data.rbs} onChange={handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <hr></hr>
                                            <div className="row g-5 mb-3">
                                                <label>L.F.T</label>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>BIL</label>
                                                        <input className="form-control" type="text" name="bil" id="bil" value={data.bil} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>ALT</label>
                                                        <input className="form-control" type="text" name="alt" id="alt" value={data.alt} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>AST</label>
                                                        <input className="form-control" type="text" name="ast" id="ast" value={data.ast} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>ALK</label>
                                                        <input className="form-control" type="text" name="alk" id="alk" value={data.alk} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Creatinine</label>
                                                        <input className="form-control" type="text" name="creatinine" id="creatinine" value={data.creatinine} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Blood Group</label>
                                                        <select class="form-control" name="blood_group" id="blood_group" value={data.blood_group} onChange={handleChange}>
                                                            <option value="--">- SELECT -</option>
                                                            <option value="A+">A+</option>
                                                            <option value="B+">B+</option>
                                                            <option value="AB+">AB+</option>
                                                            <option value="A-">A-</option>
                                                            <option value="B-">B-</option>
                                                            <option value="AB-">AB-</option>
                                                            <option value="O+">O+</option>
                                                            <option value="O-">O-</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className="form-label">Haemoglobin</label>
                                                        <input className="form-control" type="text" name="haemoglobin" id="haemoglobin" value={data.haemoglobin} onChange={handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <hr></hr>
                                            <div className="row g-5 mb-3">
                                                <label>Thick Film For</label>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Malaria</label>
                                                        <select class="form-select" name="malaria" id="malaria" value={data.malaria} onChange={handleChange}>
                                                            <option value="--">- SELECT -</option>
                                                            <option value="absent">Absent</option>
                                                            <option value="present">Present</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Micro Filariae</label>
                                                        <select class="form-select" name="micro_filariae" id="micro_filariae" value={data.micro_filariae} onChange={handleChange}>
                                                            <option value="--">- SELECT -</option>
                                                            <option value="absent">Absent</option>
                                                            <option value="present">Present</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <div className="col-md-12 flex align-items-center">
                                                <div className='col-md-12' style={{float: 'left'}}>
                                                    <h2 style={{float: "left"}} className={'h2'}>VACCINATION STATUS</h2>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="row g-5 mb-3">
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Polio</label>
                                                        <select class="form-control" name="polio" id="polio" value={data.polio} onChange={handleChange}>
                                                            <option value="--">- SELECT -</option>
                                                            <option value="non-vaccinated">Non-Vaccinated</option>
                                                            <option value="vaccinated">Vaccinated</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Polio Date</label>
                                                        <input className="form-control" type="date" name="polio_date" value={data.polio_date} onChange={handleChange} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row g-5 mb-3">
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>MMR1</label>
                                                        <select class="form-control" name="mmr1" id="mmr1" value={data.mmr1} onChange={handleChange}>
                                                            <option value="--">- SELECT -</option>
                                                            <option value="non-vaccinated">Non-Vaccinated</option>
                                                            <option value="vaccinated">Vaccinated</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>MMR1 Date</label>
                                                        <input className="form-control" type="date" name="mmr1_date" value={data.mmr1_date} onChange={handleChange} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row g-5 mb-3">
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>MMR2</label>
                                                        <select class="form-control" name="mmr2" id="mmr2" value={data.mmr2} onChange={handleChange}>
                                                            <option value="--">- SELECT -</option>
                                                            <option value="non-vaccinated">Non-Vaccinated</option>
                                                            <option value="vaccinated">Vaccinated</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>MMR2 Date</label>
                                                        <input className="form-control" type="date" name="mmr2_date" value={data.mmr2_date} onChange={handleChange} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row g-5 mb-3">
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Meningococcal</label>
                                                        <select class="form-control" name="meningococcal" id="meningococcal" value={data.meningococcal} onChange={handleChange}>
                                                            <option value="--">- SELECT -</option>
                                                            <option value="non-vaccinated">Non-Vaccinated</option>
                                                            <option value="vaccinated">Vaccinated</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Meningococcal Date</label>
                                                        <input className="form-control" type="date" name="meningococcal_date" value={data.meningococcal_date} onChange={handleChange}/>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div className="col-8">
                                    <div className="card">
                                    <div className="card-body">
                                        <div className="row g-3">
                                            <div className="col-12">
                                                <div className="row g-3 align-items-center justify-content-center">
                                                    <div className="col-md-12 text-center">
                                                        {result == null ?
                                                            <button className="btn btn-success btn-md w-50" disabled={candidate == null} onClick={handleSubmit} >Save & Upload Result</button>
                                                        :
                                                            <button className="btn btn-success btn-md w-50" disabled={candidate == null} onClick={handleUpdate}>Update & Upload Result</button>
                                                        }
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
