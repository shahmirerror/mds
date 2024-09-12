import { useEffect, useState } from 'react';
import Checkbox from '@/Components/Checkbox';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { IconCrosshair, IconClipboardText  } from '@tabler/icons-react';
import { IconRefresh, IconLock } from '@tabler/icons-react';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function LabResult(props) {

    const [barcode, setBarcode] = useState(null);
    const todayDate = new Date();
    const [date, setRegDate] = useState(todayDate.getMonth()+1 >= 10 && todayDate.getDate() >= 10 ? todayDate.getFullYear()+"-"+(todayDate.getMonth()+1)+"-"+todayDate.getDate() : todayDate.getMonth()+1 >= 10 && todayDate.getDate() < 10 ? todayDate.getFullYear()+"-"+(todayDate.getMonth()+1)+"-0"+todayDate.getDate() : todayDate.getMonth()+1 < 10 && todayDate.getDate() >= 10 ? todayDate.getFullYear()+"-0"+(todayDate.getMonth()+1)+"-"+todayDate.getDate() : todayDate.getFullYear()+"-0"+(todayDate.getMonth()+1)+"-0"+todayDate.getDate());
    const [serial_no, setSerialNo] = useState(null);
    const [currToken, setToken] = useState('None');

    const [candidate, setCandidate] = useState(null);
    const [result, setResult] = useState(null);
    const [exist, setExist] = useState(false);

    const [searched, setSearched] = useState(false);

    const {data, setData, post, processing, errors, reset} = useForm({
        sugar: 'negative',
        albumin: 'negative',
        hiv: 'negative',
        hcv: 'negative',
        alk: '',
        ast: '',
        alt: '',
        ova: 'absent',
        helminthes: 'absent',
        cyst: 'absent',
        tb: 'absent',
        pregnancy: '--',
        hbsag: 'negative',
        vdrl: 'negative',
        tpha: 'negative',
        bil: '',
        creatinine: '',
        blood_group: 'A+',
        haemoglobin: '',
        rbs: '',
        malaria: 'absent',
        micro_filariae: 'absent',
        polio: 'non-vaccinated',
        polio_date: '',
        mmr1: 'non-vaccinated',
        mmr1_date: '',
        mmr2: 'non-vaccinated',
        mmr2_date: '',
        meningococcal: 'non-vaccinated',
        meningococcal_date: '',
        created_by: props?.auth?.user?.id
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
                                    e.target.disabled = false;
                                    setCandidate(result.registration);
                                    setSearched(true);

                                    if(result.verified?.length == 0 || result.verified == false)
                                    {
                                        setResult(null);
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
                                        setResult(result.verified);
                                        handleEdit(result.verified);
                                        toast.info('Candidate Lab Result Exists!', {
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
        let val = e.target.value;
        setData(e.target.name, val);

        let constraint_names = ['alt','ast','bil','creatinine','rbs','alk','haemoglobin'];
        let constraints = {'alt': 42,'ast':45,'bil':1.2,'creatinine':1.0,'rbs':130,'alk':340,'haemoglobin':16.5};

        if(constraint_names.includes(e.target.name))
        {
            handleRange(e.target.name, parseFloat(val), constraints[e.target.name]);
        }
    }

    const handleReset = (e) =>
    {
        location.reload();
    };

    const handleRange = (name, val, max) =>
    {
        if(val > max)
        {
            toast.error(name.toUpperCase()+' is above range!', {
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

    const handleEdit = (result) => {
        data.sugar = result.sugar;
        data.albumin = result.albumin;
        data.hiv = result.hiv;
        data.hcv = result.hcv;
        data.alk = result.alk;
        data.ast = result.ast;
        data.alt = result.alt;
        data.ova = result.ova;
        data.helminthes = result.helminthes;
        data.cyst = result.cyst;
        data.tb = result.tb;
        data.pregnancy = result.pregnancy;
        data.hbsag = result.hbsag;
        data.vdrl = result.vdrl;
        data.tpha = result.tpha;
        data.bil = result.bil;
        data.creatinine = result.creatinine;
        data.blood_group = result.blood_group;
        data.haemoglobin = result.haemoglobin;
        data.rbs = result.rbs;
        data.malaria = result.malaria;
        data.micro_filariae = result.micro_filariae;
        data.polio = result.polio;
        data.polio_date = result.polio_date;
        data.mmr1 = result.mmr1;
        data.mmr1_date = result.mmr1_date;
        data.mmr2 = result.mmr2;
        data.mmr2_date = result.mmr2_date;
        data.meningococcal = result.meningococcal;
        data.meningococcal_date = result.meningococcal_date;
    }

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
                                                        {props?.auth?.modules?.[7]?.rights?.[0]?.permission_name == 'barcode_search' && props?.auth?.modules?.[7]?.rights?.[0]?.status == true ?
                                                        <input type="password" className="form-control" name="barcode" value={barcode} onChange={(e) => setBarcode(e.target.value)} onKeyDown={event => {
                                                                                                                                                                                                        if (event.key === 'Enter') {
                                                                                                                                                                                                            handleSearch(event)
                                                                                                                                                                                                        }
                                                                                                                                                                                                        }} />
                                                        :
                                                            <IconLock stroke={1} />
                                                        }
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Date</label>
                                                        {props?.auth?.modules?.[7]?.rights?.[1]?.permission_name == 'date_search' && props?.auth?.modules?.[7]?.rights?.[1]?.status == true ?
                                                        <input type="date" className="form-control" name="reg_date" value={date} onChange={(e) => setRegDate(e.target.value)} onKeyDown={event => {
                                                                                                                                                                                                    if (event.key === 'Enter') {
                                                                                                                                                                                                        handleSearch(event)
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
                                                        {props?.auth?.modules?.[7]?.rights?.[1]?.permission_name == 'date_search' && props?.auth?.modules?.[7]?.rights?.[1]?.status == true ?
                                                        <input type="text" className="form-control" name="serial_no" value={serial_no} onChange={(e) => setSerialNo(e.target.value.toUpperCase())} onKeyDown={event => {
                                                                                                                                                                                                                        if (event.key === 'Enter') {
                                                                                                                                                                                                                            handleSearch(event)
                                                                                                                                                                                                                        }
                                                                                                                                                                                                                        }} />
                                                        :
                                                            <IconLock stroke={1} />
                                                        }
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
                                                    {props?.auth?.modules?.[7]?.rights?.[0]?.status == true || props?.auth?.modules?.[7]?.rights?.[1]?.status == true ?
                                                        <button className={'btn btn-md btn-outline-info'} disabled={searched} onClick={handleSearch}>Search for Candidate</button>
                                                    :
                                                        <button className={'btn btn-md btn-outline-info'} disabled={searched} onClick={''}>
                                                            <IconLock stroke={1} />
                                                            Search for Candidate
                                                        </button>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {candidate && (
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
                                )}
                                {candidate && (
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
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>BIL</label>
                                                        <input className="form-control" placeholder="NORMAL RANGE 0.03-1.20" type="text" name="bil" id="bil" value={data.bil} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>ALT</label>
                                                        <input className="form-control" placeholder="NORMAL RANGE 15-42 U/L" type="text" name="alt" id="alt" value={data.alt} onChange={handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <hr></hr>
                                            <div className="row g-5 mb-3">
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>AST</label>
                                                        <input className="form-control" placeholder="NORMAL RANGE 10-45 U/L" type="text" name="ast" id="ast" value={data.ast} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>ALK</label>
                                                        <input className="form-control" placeholder="NORMAL RANGE 170-340 U/L" type="text" name="alk" id="alk" value={data.alk} onChange={handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <hr></hr>
                                            <div className="row g-5 mb-3">
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Creatinine</label>
                                                        <input className="form-control" placeholder="NORMAL RANGE 0.05-1.0" type="text" name="creatinine" id="creatinine" value={data.creatinine} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-6">
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
                                            </div>
                                            <hr></hr>
                                            <div className="row g-5 mb-3">
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className="form-label">Haemoglobin</label>
                                                        <input className="form-control" placeholder="NORMAL RANGE 12-17 G/DL" type="text" name="haemoglobin" id="haemoglobin" value={data.haemoglobin} onChange={handleChange} />
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
                                )}
                            </div>
                        </div>
                        {candidate && (
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
                                                            <option value="not seen">Not Seen</option>
                                                            <option value="seen">Seen</option>
                                                            <option value="ND">ND</option>
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
                                                            <option value="not seen">Not Seen</option>
                                                            <option value="seen">Seen</option>
                                                            <option value="ND">ND</option>
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
                                                    {data.polio == 'vaccinated' ?
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Polio Date</label>
                                                        <input className="form-control" type="date" name="polio_date" value={data.polio_date} onChange={handleChange} />
                                                    </div>
                                                    :
                                                    <></>
                                                    }
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
                                                    {data.mmr1 == 'vaccinated' ?
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>MMR1 Date</label>
                                                        <input className="form-control" type="date" name="mmr1_date" value={data.mmr1_date} onChange={handleChange} />
                                                    </div>
                                                    :
                                                    <></>
                                                    }
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
                                                    {data.mmr2 == 'vaccinated' ?
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>MMR2 Date</label>
                                                        <input className="form-control" type="date" name="mmr2_date" value={data.mmr2_date} onChange={handleChange} />
                                                    </div>
                                                    :
                                                    <></>
                                                    }
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
                                                    {data.meningococcal == 'vaccinated' ?
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Meningococcal Date</label>
                                                        <input className="form-control" type="date" name="meningococcal_date" value={data.meningococcal_date} onChange={handleChange}/>
                                                    </div>
                                                    :
                                                    <></>
                                                    }
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
                                                        {result == null || result?.length > 0 ?
                                                            <button className="btn btn-success btn-md w-50" disabled={candidate == null} onClick={handleSubmit} >Save & Upload Result</button>
                                                        : props?.auth?.modules?.[7]?.rights?.[3]?.status == true ?
                                                            <button className="btn btn-success btn-md w-100" disabled={candidate == null} onClick={handleUpdate}>Update & Upload Result</button>
                                                        :
                                                            <button className="btn btn-success btn-md w-100" disabled={candidate == null} onClick={''}>
                                                                <IconLock stroke={1} />
                                                                Update & Upload Result
                                                            </button>
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
                        )}
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
