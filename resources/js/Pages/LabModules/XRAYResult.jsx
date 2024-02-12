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

export default function XRAYResult({auth}) {
    const [search_date, setSearchDate] = useState(null);
    const [search_serial_number, setSerialNumber] = useState(null);

    const [edit, setEdit] = useState(false);
    const [editchest, setEditChest] = useState(null);
    const [editnote, setEditNote] = useState(null);
    const [editremarks, setEditRemarks] = useState(null);
    const [currToken, setToken] = useState('None');

    const {data, setData, post, processing, errors, reset} = useForm({
        chest: '',
        note: '',
        serial_no: '',
        remarks: '',
        date: '',
        images: ''
    });


    useEffect(() => {
    }, []);

    const handleChange = (e) => {
        if(e.target.name == 'images')
        {
            setData(e.target.name, e.target.files);
            // console.log(e.target.name, e.target.files);
        }
        else
        {
            setData(e.target.name, e.target.value);
            // console.log(e.target.name, e.target.value);
        }

    };

    const handleSubmit = (e) =>
    {
        e.preventDefault();

        post(route('xray-result.store'))
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Xray Result</h2>}
        >
            <Head title="XRAY Result" />

            <div className="page-header d-print-none">
                <div className="container-xl">
                    <div className="row g-2 align-items-center">
                    <div className="col align-items-center">
                        <div className="col-md-3" style={{float: 'left'}}>
                            <h2 className="page-title" style={{float: 'left'}}>
                                XRAY Result
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

                        <div className="col-md-8">
                            <div className="row row-cards">
                                <div className="col-12">
                                    <div className="card">

                                        <div className="card-body" id="manual_import">
                                            <div className="row g-5 mb-3">
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Date</label>
                                                        <input type="date" className="form-control" name="date" onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Serial Number</label>
                                                        <input type="text" className="form-control" name="serial_no" onChange={handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row g-5 mb-3">
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Chest</label>
                                                        <select className="form-select" name="chest" required onChange={handleChange}>
                                                            <option value="">- SELECT -</option>
                                                            <option value="lung fields clear">LUNG FIELDS CLEAR</option>
                                                            <option value="unfit due to x-ray findings">Unfit Due to X-Ray Findings.</option>
                                                            <option value="see notes">"See Notes"</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Images</label>
                                                        <input type="file" className="form-control" name="images" multiple onChange={handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row g-5">
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Notes</label>
                                                        <textarea className="form-control" name="notes" onChange={handleChange}></textarea>
                                                    </div>
                                                </div>
                                                <div className="col-6 pt-6">
                                                    <button class="btn btn-md btn-outline-primary" disabled={processing}>Save Result</button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="row row-cards">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4>Search Xray Result</h4>
                                        </div>

                                        <div className="card-body" id="manual_import">
                                            <div className="row g-5 mb-3">
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Date</label>
                                                        <input type="date" className="form-control" name="search_date" onChange={(e) => setSearchDate(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Serial Number</label>
                                                        <input type="text" className="form-control" name="search_serial_number" onChange={(e) => setSerialNumber(e.target.value)} />
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
