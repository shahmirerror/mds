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

export default function LabResult({auth}) {

    const [barcode, setBarcode] = useState(null);
    const [date, setRegDate] = useState(null);
    const [serial_no, setSerialNo] = useState(null);

    const [candidate, setCandidate] = useState(null);
    const [exist, setExist] = useState(false);

    const [searched, setSearched] = useState(false);

    const {data, setData, post, processing, errors, reset} = useForm({
        notes: ''
    });


    useEffect(() => {
    }, []);

    const handleSearch = (e) =>
    {

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
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Lab Result</h2>}
        >
            <Head title="Lab Result" />

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
                                {/* <button className="btn btn-secondary btn-sm mr-5 btn-pill" onClick={handleToken}>
                                    <IconRefresh />
                                </button> */}
                                {/* <span className="badge">Current Token: {currToken}</span> */}
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
                                                        <input type="date" className="form-control" name="barcode" />
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Date</label>
                                                        <input type="text" className="form-control" name="reg_date" />
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Serial Number</label>
                                                        <input type="text" className="form-control" name="serial_no" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row g-5 mb-3">
                                                <div className="col-2">
                                                </div>
                                                <div className="col-4">
                                                    <button className={'btn btn-md btn-outline-secondary'} disabled={searched ? true : false} onChange={handleReset}>Reset Query</button>
                                                </div>
                                                <div className="col-4">
                                                    <button className={'btn btn-md btn-outline-info'} disabled={searched ? false : true} onChange={handleSearch}>Search for Candidate</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {candidate == null && (
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
                                                        <input type="date" className="form-control" name="reg_date" />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Passport Number</label>
                                                        <input type="text" className="form-control" name="serial_no" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row g-5 mb-3">
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Passport Issue Date</label>
                                                        <input type="date" className="form-control" name="reg_date" />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Passport Expiry Date</label>
                                                        <input type="text" className="form-control" name="serial_no" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row g-5 mb-3">
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Registeration Date</label>
                                                        <input type="date" className="form-control" name="reg_date" />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Serial Number</label>
                                                        <input type="text" className="form-control" name="serial_no" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row g-5 mb-3">
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Agency</label>
                                                        <select className="form-select" name="agency">
                                                            <option>Select Agency</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Country</label>
                                                        <select className="form-select" name="country">
                                                            <option>Select Country</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row g-5 mb-3">
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Profession</label>
                                                        <select className="form-select" name="profession">
                                                            <option>Select Profession</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Fees</label>
                                                        <input className="form-control" name="fees" type="text" />
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Discount</label>
                                                        <input className="form-control" name="discount" type="text" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row g-5 mb-3">
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Relation</label>
                                                        <select className="form-select">
                                                            <option value="">Select Relation</option>
                                                            <option value="S/O">S/O</option>
                                                            <option value="W/O">W/O</option>
                                                            <option value="D/O">D/O</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Relative Name</label>
                                                        <input type="text" className="form-control" name="relative_name" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row g-5 mb-3">
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Phone 1</label>
                                                        <input type="text" className="form-control" name="phone_1" />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Phone 2</label>
                                                        <input type="text" className="form-control" name="phone_2" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row g-5">
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Marital Status</label>
                                                        <select className="form-select" name="marital_status">
                                                            <option value="">Select Marital Status</option>
                                                            <option value="Single">Single</option>
                                                            <option value="Married">Married</option>
                                                            <option value="Divorced">Divorced</option>
                                                            <option value="Widowed">Widowed</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Remarks</label>
                                                        <textarea className="form-control"></textarea>
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
                                                        <select className="form-select" name="sugar" >
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
                                                        <select className="form-select" name="albumin" >
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
                                                        <select className="form-select" name="helminthes" >
                                                            <option value="--">- SELECT -</option>
                                                            <option value="absent">Absent</option>
                                                            <option value="present">Present</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>OVA</label>
                                                        <select className="form-select" name="ova" >
                                                            <option value="--">- SELECT -</option>
                                                            <option value="absent">Absent</option>
                                                            <option value="present">Present</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Cyst</label>
                                                        <select className="form-select" name="cyst" >
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
                                                        <select className="form-select" name="tb" >
                                                            <option value="--">- SELECT -</option>
                                                            <option value="absent">Absent</option>
                                                            <option value="present">Present</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Pregnancy Test</label>
                                                        <select className="form-select" name="pregnancy" >
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
                                                        <select className="form-select" name="hcv" >
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
                                                        <select className="form-select" name="hbsag" >
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
                                                        <select className="form-select" name="hiv" >
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
                                                        <select className="form-select" name="vdrl" >
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
                                                        <select className="form-select" name="tpha" >
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
                                                        <input className="form-control" type="text" name="rbs" id="rbs" />
                                                    </div>
                                                </div>
                                            </div>
                                            <hr></hr>
                                            <div className="row g-5 mb-3">
                                                <label>L.F.T</label>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>BIL</label>
                                                        <input className="form-control" type="text" name="bil" id="bil" />
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>ALT</label>
                                                        <input className="form-control" type="text" name="alt" id="alt" />
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>AST</label>
                                                        <input className="form-control" type="text" name="ast" id="ast" />
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>ALK</label>
                                                        <input className="form-control" type="text" name="alk" id="alk" />
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Creatinine</label>
                                                        <input className="form-control" type="text" name="creatinine" id="creatinine" />
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Blood Group</label>
                                                        <select class="form-control" name="blood_group" id="blood_group">
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
                                                        <input className="form-control" type="text" name="haemoglobin" id="haemoglobin" />
                                                    </div>
                                                </div>
                                            </div>
                                            <hr></hr>
                                            <div className="row g-5 mb-3">
                                                <label>Thick Film For</label>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Malaria</label>
                                                        <select class="form-select" name="malaria" id="malaria">
                                                            <option value="--">- SELECT -</option>
                                                            <option value="absent">Absent</option>
                                                            <option value="present">Present</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Micro Filariae</label>
                                                        <select class="form-select" name="micro_filariae" id="micro_filariae">
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
                                                        <select class="form-control" name="polio" id="polio">
                                                            <option value="--">- SELECT -</option>
                                                            <option value="non-vaccinated">Non-Vaccinated</option>
                                                            <option value="vaccinated">Vaccinated</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Polio Date</label>
                                                        <input className="form-control" type="date" name="polio_date" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row g-5 mb-3">
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>MMR1</label>
                                                        <select class="form-control" name="mmr1" id="mmr1">
                                                            <option value="--">- SELECT -</option>
                                                            <option value="non-vaccinated">Non-Vaccinated</option>
                                                            <option value="vaccinated">Vaccinated</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>MMR1 Date</label>
                                                        <input className="form-control" type="date" name="mmr1_date" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row g-5 mb-3">
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>MMR2</label>
                                                        <select class="form-control" name="mmr2" id="mmr2">
                                                            <option value="--">- SELECT -</option>
                                                            <option value="non-vaccinated">Non-Vaccinated</option>
                                                            <option value="vaccinated">Vaccinated</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>MMR2 Date</label>
                                                        <input className="form-control" type="date" name="mmr2_date" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row g-5 mb-3">
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Meningococcal</label>
                                                        <select class="form-control" name="meningococcal" id="meningococcal">
                                                            <option value="--">- SELECT -</option>
                                                            <option value="non-vaccinated">Non-Vaccinated</option>
                                                            <option value="vaccinated">Vaccinated</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Meningococcal Date</label>
                                                        <input className="form-control" type="date" name="meningococcal_date" />
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
                                                        <button className="btn btn-success btn-md w-50" disabled={true}>Save & Upload Result</button>
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
