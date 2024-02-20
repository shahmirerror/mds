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

export default function XRAYResult(props) {
    const [date, setSearchDate] = useState(null);
    const [serial_no, setSerialNumber] = useState(null);

    const [result, setResult] = useState(null);
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

    const handleSearch = async (e) =>
    {
        setResult(null);

        const requestData = {
            centre_id: props.auth.user.centre.centre_id,
            serial_no: serial_no,
            reg_date: date,
            process_id: 3
        };

        const requestJson = JSON.stringify(requestData);

        if(serial_no == null && date == null)
        {
            toast.warning('Please select date & serial number to proceed!', {
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
                const response = await toast.promise(fetch(route("xray.fetch_result"), {
                    method: "POST",
                    body: requestJson,
                }),
                {
                    pending: 'Fetching XRAY Result'
                })
                    .then(res => res.json())
                    .then(
                        (result) => {

                                if(result.xray.length == 0)
                                {
                                    toast.warning('No Result Found!', {
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
                                    setResult(result.xray);
                                    data.date = result.xray.reg_date;
                                    data.serial_no = result.xray.serial_no;
                                    data.chest = result.xray.chest;
                                    data.notes = result.xray.notes;

                                    toast.success('Candidate XRAY Result Found!', {
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

    const handleSubmit = async (e) =>
    {
        if(handleFormRequired('store'))
        {
            e.target.disabled = true;
            const requestData = {
                centre_id: props.auth.user.centre.centre_id,
                date: data.date,
                serial_no: data.serial_no,
                notes: data.notes,
                chest: data.chest,
                images: data.images
            };

            const requestJson = JSON.stringify(requestData);

            try {
                const response = await toast.promise(fetch(route("lab.store_xray_result"), {
                    method: "POST",
                    body: requestJson,
                }),
                {
                    pending: 'Submitting Form'
                })
                    .then(res => res.json())
                    .then(
                        (result) => {

                            if(result.message == 'XRAY Result has been saved')
                            {
                                toast.success(result.message, {
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
                                toast.warning(result.message, {
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
                        (error, result) => {

                            toast.error(result.message, {
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
            e.target.disabled = false;
        }
    };

    const handleUpdate = async (e) =>
    {
        if(handleFormRequired('update'))
        {
            e.target.disabled = true;
            const requestData = {
                centre_id: props.auth.user.centre.centre_id,
                date: data.date,
                serial_no: data.serial_no,
                notes: data.notes,
                chest: data.chest,
                images: data.images
            };

            const requestJson = JSON.stringify(requestData);

            try {
                const response = await toast.promise(fetch(route("lab.update_xray_result"), {
                    method: "POST",
                    body: requestJson,
                }),
                {
                    pending: 'Submitting Form'
                })
                    .then(res => res.json())
                    .then(
                        (result) => {

                            if(result.message == 'XRAY Result has been updated!')
                            {
                                handleReset();
                                toast.success(result.message, {
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
                                toast.warning(result.message, {
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
                        (error, result) => {

                            toast.error(result.message, {
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
            e.target.disabled = false;
        }
    };

    const handleFormRequired = (form) =>
    {
        let message = true;

        if(data.images?.length == 0 && form == 'store')
        {
            toast.warning('Please add at least one image before submitting the form!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });

            message = false;
        }
        else if(data.chest == "")
        {
            toast.warning('Please select chest status before submitting the form!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });

            message = false;
        }

        return message;
    }

    const handleReset = () =>
    {
        setResult(null);
        data.notes = '';
        data.date = '';
        data.chest = '';
        data.images = '';
        data.serial_no = '';
        setSearchDate('');
        setSerialNumber('');
    }

    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">XRAY Result</h2>}
        >
            <Head title="XRAY Result" />
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
                                XRAY Result
                            </h2>
                        </div>
                        <div className="col-md-2 align-items-center" style={{float: 'right'}}>
                            <h2 className="page-title">
                                <button className="btn btn-secondary btn-sm mr-5 btn-pill" onClick={() => location.reload()}>
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

                        <div className="col-md-8">
                            <div className="row row-cards">
                                <div className="col-12">
                                    <div className="card">

                                        <div className="card-body" id="manual_import">
                                            <div className="row g-5 mb-3">
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Date</label>
                                                        <input type="date" className="form-control" name="date" disabled={result != null} value={data.date} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Serial Number</label>
                                                        <input type="text" className="form-control" name="serial_no" disabled={result != null} value={data.serial_no} onChange={handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row g-5 mb-3">
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Chest</label>
                                                        <select className="form-select" name="chest" value={data.chest} required onChange={handleChange}>
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
                                                        <textarea className="form-control" name="notes" onChange={handleChange}>{data.notes}</textarea>
                                                    </div>
                                                </div>
                                                {result == null ?
                                                <div className="col-6 pt-6">
                                                    <button class="btn btn-md btn-outline-success" onClick={handleSubmit}>Save Result</button>
                                                </div>
                                                :
                                                <>
                                                    <div className="col-3">
                                                        <div className="row g-3 align-items-center">
                                                            <label className='form-label'>Status</label>
                                                            <input type="text" className="form-control" name="images" disabled value={result.status} />
                                                        </div>
                                                    </div>
                                                    <div className="col-3 pt-6">
                                                        <button class="btn btn-md btn-outline-primary" onClick={handleUpdate}>Update Result</button>
                                                    </div>
                                                </>
                                                }

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
                                                        <input type="date" className="form-control" name="search_date" value={date} onChange={(e) => setSearchDate(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Serial Number</label>
                                                        <input type="text" className="form-control" name="search_serial_number" value={serial_no} onChange={(e) => setSerialNumber(e.target.value)} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row g-5 mb-3">
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <button className={'btn btn-outline-secondary btn-md'} disabled={result == null} onClick={handleReset}>Reset Form</button>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                    <button className={'btn btn-outline-primary btn-md'} disabled={result != null} onClick={handleSearch}>Search Result</button>
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
