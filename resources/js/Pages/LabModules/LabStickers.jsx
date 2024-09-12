import { useEffect, useState, useRef } from 'react';
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
import Barcode from 'react-barcode';
import html2canvas from "html2canvas";

export default function LabStickers(props) {

    const [barcode, setBarcode] = useState(null);
    const [Attempts, setAttempts] = useState(0);
    const todayDate = new Date();
    const [date, setRegDate] = useState(todayDate.getMonth()+1 >= 10 && todayDate.getDate() >= 10 ? todayDate.getFullYear()+"-"+(todayDate.getMonth()+1)+"-"+todayDate.getDate() : todayDate.getMonth()+1 >= 10 && todayDate.getDate() < 10 ? todayDate.getFullYear()+"-"+(todayDate.getMonth()+1)+"-0"+todayDate.getDate() : todayDate.getMonth()+1 < 10 && todayDate.getDate() >= 10 ? todayDate.getFullYear()+"-0"+(todayDate.getMonth()+1)+"-"+todayDate.getDate() : todayDate.getFullYear()+"-0"+(todayDate.getMonth()+1)+"-0"+todayDate.getDate());
    const [serial_no, setSerialNo] = useState(null);
    const [currToken, setToken] = useState('None');
    const wrapper_ref = useRef();

    const [candidate, setCandidate] = useState(null);
    const [sticker2, setSticker2] = useState(null);
    const [exist, setExist] = useState(false);

    const [searched, setSearched] = useState(false);

    const {data, setData, post, processing, errors, reset} = useForm({
        notes: ''
    });

    const handleSearch = async (e) =>
    {
        setCandidate(null);
        setSticker2(null);

        const requestData = {
            centre_id: props.auth.user.centre.centre_id,
            barcode: barcode,
            serial_no: serial_no,
            reg_date: date,
            process_id: 'lab_sticker',
            created_by: props?.auth?.user?.id
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
                                    setSticker2(result.sticker_2);
                                    setAttempts(result.attempts);
                                    setSearched(true);
                                    if(result.sticker_2 == false)
                                    {
                                        toast.warning('Blood Sample Not Collected!', {
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
                                }
                        },
                        (error) => {
                            console.log(error);
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
                console.log(ex);
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

    const handleReset = (e) =>
    {
        setCandidate(null);
        setBarcode('');
        setRegDate(todayDate.getMonth()+1 >= 10 && todayDate.getDate() >= 10 ? todayDate.getFullYear()+"-"+(todayDate.getMonth()+1)+"-"+todayDate.getDate() : todayDate.getMonth()+1 >= 10 && todayDate.getDate() < 10 ? todayDate.getFullYear()+"-"+(todayDate.getMonth()+1)+"-0"+todayDate.getDate() : todayDate.getMonth()+1 < 10 && todayDate.getDate() >= 10 ? todayDate.getFullYear()+"-0"+(todayDate.getMonth()+1)+"-"+todayDate.getDate() : todayDate.getFullYear()+"-0"+(todayDate.getMonth()+1)+"-0"+todayDate.getDate());
        setSerialNo('');
        setSearched(false);
    };

    const handlePrintw11 = async (e, sticker2) => {
        // const opt = {
        //     scale: 3
        // };
        const elem = wrapper_ref.current;

        // Generate canvas image from HTML content
        html2canvas(elem, {
            scale: 10
          }).then(canvas => {
            // Create an iframe to hold the printed content
            const iframe = document.createElement('iframe');
            iframe.name = 'printf';
            iframe.id = 'printf';
            iframe.height = 0;
            iframe.width = 0;
            document.body.appendChild(iframe);

            // Convert canvas image to data URL
            const imgUrl = canvas.toDataURL({
                format: 'jpeg',
                quality: '1.0',
            });

            // Define the style for the label
            const style = `
                position: absolute;
                bottom: 0px;
            `;

            // Generate HTML content with the label image
            const url = `<img style="${style}" src="${imgUrl}"/>`;

            // Write the HTML content to the iframe document
            const newWin = window.frames["printf"];
            newWin.document.write(`
                <style>
                    @media print {
                        /* Adjust print-specific styles here */
                        body {
                            margin: 0;
                            padding: 0;
                        }
                        img {
                            max-width: 100%;
                            height: auto;
                        }
                    }
                </style>
                <body onload="window.print()">${url}</body>
            `);
            newWin.document.close();
        });
    };

    const logAttempts = async (sticker_value) =>
    {

        const requestData = {
            centre_id: props.auth.user.centre.centre_id,
            sticker_value: sticker_value,
            user_id: props?.auth?.user?.id,
        };

        const requestJson = JSON.stringify(requestData);

        try {
            const response = await fetch(route("prints.log_attempts"), {
                method: "POST",
                body: requestJson,
            })
                .then(res => res.json())
                .then(
                    (result) => {
                            setAttempts(Attempts+1);
                    },
                    (error) => {
                        console.log(error)
                    }
                );
        } catch (ex) {
           console.log(ex)
        }
    };

    const handlePrint = async (e, sticker2) => {
        const permissionValue = props?.auth?.user?.role_id == 3 ? parseInt(props?.auth?.modules?.[8]?.rights?.[3]?.permission_value) : 1;
        const elem = wrapper_ref.current;

        for (let i = 0; i < permissionValue; i++) {
            // Generate canvas image from HTML content
            const canvas = await html2canvas(elem, { scale: 3 });

            // Create an iframe to hold the printed content
            const iframe = document.createElement('iframe');
            iframe.name = 'printf';
            iframe.id = 'printf';
            iframe.height = 0;
            iframe.width = 0;
            document.body.appendChild(iframe);

            // Convert canvas image to data URL
            const imgUrl = canvas.toDataURL({ format: 'jpeg', quality: '1.0' });

            // Define the style for the label
            const style = `
                position: absolute;
                top: 0;
            `;

            // Generate HTML content with the label image
            const url = `<img style="${style}" src="${imgUrl}"/>`;

            // Write the HTML content to the iframe document
            const newWin = window.frames["printf"];
            newWin.document.write(`
                <style>
                    @media print {
                        /* Adjust print-specific styles here */
                        body {
                            margin: 0;
                            padding: 0;
                        }
                        img {
                            max-width: 100%;
                            height: auto;
                        }
                    }
                </style>
                <body onload="window.print()">${url}</body>
            `);
            newWin.document.close();
        }

        logAttempts(sticker2);
    };


    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Lab Sticker</h2>}
        >
            <Head title="Lab Sticker" />
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
                                Lab Sticker
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
                        <div className="col-md-5">
                            <div className="row row-cards">
                                <div className="col-12">
                                    <div className="card">
                                    <div className="card-body">
                                        <div className="row g-3">
                                            <div className="col-12">
                                                <div className="row g-3 align-items-center justify-content-center">
                                                    <img src={"./../assets/static/photos/barcodeScanner.png"} style={{width : 256}}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7">
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
                                                        {props?.auth?.modules?.[8]?.rights?.[0]?.permission_name == 'barcode_search' && props?.auth?.modules?.[8]?.rights?.[0]?.status == true ?
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
                                                        {props?.auth?.modules?.[8]?.rights?.[2]?.permission_name == 'date_search' && props?.auth?.modules?.[8]?.rights?.[2]?.status == true ?
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
                                                        {props?.auth?.modules?.[8]?.rights?.[2]?.permission_name == 'date_search' && props?.auth?.modules?.[8]?.rights?.[2]?.status == true ?
                                                        <input type="text" className="form-control" name="serial_no" value={serial_no} onChange={(e) => setSerialNo(e.target.value.toUpperCase())} onKeyDown={event => {
                                                                                                                                                                                                                        if (event.key === 'Enter') {
                                                                                                                                                                                                                            handleSearch(event)
                                                                                                                                                                                                                        }
                                                                                                                                                                                                                        }} />
                                                                                                                                                                                                                        :
                                                                                                                                                                                                                        <IconLock stroke={1} /> }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row g-5 mb-3">
                                                <div className='col-md-12 flex justify-content-center'>
                                                    <div className="col-4">
                                                        <button className={'btn btn-md btn-outline-secondary'} disabled={searched ? false : true} onClick={handleReset}>Reset Form</button>
                                                    </div>
                                                    <div className="col-4">
                                                    {props?.auth?.modules?.[8]?.rights?.[0]?.status == true || props?.auth?.modules?.[8]?.rights?.[2]?.status == true ?
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
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row row-cards'>
                        <div className='col-md-5'>
                            <div className="row row-cards">
                                <div className="col-12">
                                    <div className="card">
                                    {candidate !== null && sticker2 != false ?
                                    <>
                                    <div className="card-header">
                                        <h3>Blood Sample is ok</h3>
                                    </div>
                                        <div className="row g-3">
                                            <div className="col-1"></div>
                                            <div className="col-10">
                                                <div className="row g-3">
                                                <div id="barcodeSection" ref={wrapper_ref} style={{textAlign: 'center', marginLeft: '-19px', position: 'sticky'}}>
                                                        <Barcode value={`${sticker2}`} displayValue={true} width={2} fontOptions={"bold"} />

                                                        {/*<span style={{fontWeight: 900, fontSize: '17px'}}>{sticker2}</span>*/}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                        {props.auth.user.role_id == 2 ?
                                        <div className="row g-3">
                                            <div className="col-12">
                                                <div className="row g-3 align-items-center">
                                                    <div className="row g-3 align-items-center">
                                                        <button className='btn btn-info' onClick={(e) => handlePrint(e, sticker2)}>Print Sticker</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        :props.auth.user.role_id == 3 && Attempts < props.auth?.modules[8]?.rights[4]?.permission_value ?
                                        <div className="row g-3">
                                            <div className="col-12">
                                                <div className="row g-3 align-items-center">
                                                    <div className="row g-3 align-items-center">
                                                        <button className='btn btn-info' onClick={(e) => handlePrint(e, sticker2)}>Print Sticker</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        <div className="row g-3">
                                            <div className="col-12">
                                                <div className="row g-3 align-items-center">
                                                    <div className="row g-3 align-items-center">
                                                        <button className='btn btn-danger' >Out of Attempts!</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        }

                                    </div>
                                    </>
                                    : candidate !== null && sticker2 == false ?
                                    <>
                                    <div className="card-header">
                                        <h3>Blood Sample is not collected</h3>
                                    </div>
                                    </>
                                    :
                                    <></>
                                    }

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
