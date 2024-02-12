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

export default function LabStickers({auth}) {

    const [barcode, setBarcode] = useState(null);
    const [date, setRegDate] = useState(null);
    const [serial_no, setSerialNo] = useState(null);
    const [currToken, setToken] = useState('None');

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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Lab Sticker</h2>}
        >
            <Head title="Lab Sticker" />

            <div className="page-header d-print-none">
                <div className="container-xl">
                    <div className="row g-2 align-items-center">
                    <div className="col align-items-center">
                        <div className="col-md-3" style={{float: 'left'}}>
                            <h2 className="page-title" style={{float: 'left'}}>
                                Lab Sticker
                            </h2>
                        </div>
                        <div className="col-md-3 align-items-center" style={{float: 'right'}}>
                            <h2 className="page-title">
                                {/* <button className="btn btn-secondary btn-sm mr-5 btn-pill" onClick={handleToken}>
                                    <IconRefresh />
                                </button> */}
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
                        <div className="col-md-4">
                            <div className="row row-cards">
                                <div className="col-12">
                                    <div className="card">
                                    <div className="card-body">
                                        <div className="row g-3">
                                            <div className="col-12">
                                                <div className="row g-3 align-items-center justify-content-center">
                                                    <img src={"./../assets/static/photos/barcodeScanner.png"} style={{width : 200}}/>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    </div>
                                </div>

                            </div>
                        </div>
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
                                {candidate && (
                                <>
                                <div className="col-12">
                                    <div className="card">
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
                                                            <button className="btn btn-success btn-md w-50" disabled={true}>Print Sticker</button>
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
                    <div className="row row-cards">
                    <div className="col-md-6">
                            <div className="row row-cards">

                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="row row-cards">

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
