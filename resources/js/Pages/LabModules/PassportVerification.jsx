import { useEffect, useState } from 'react';
import Checkbox from '@/Components/Checkbox';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { IconCrosshair, IconClipboardText  } from '@tabler/icons-react';
import { IconLock, IconRefresh } from '@tabler/icons-react';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function PassportVerification(props) {

    const [barcode, setBarcode] = useState(null);
    const [barcode2, setBarcode2] = useState(null);
    const todayDate = new Date();
    const [date, setRegDate] = useState(todayDate.getMonth()+1 >= 10 && todayDate.getDate() >= 10 ? todayDate.getFullYear()+"-"+(todayDate.getMonth()+1)+"-"+todayDate.getDate() : todayDate.getMonth()+1 >= 10 && todayDate.getDate() < 10 ? todayDate.getFullYear()+"-"+(todayDate.getMonth()+1)+"-0"+todayDate.getDate() : todayDate.getMonth()+1 < 10 && todayDate.getDate() >= 10 ? todayDate.getFullYear()+"-0"+(todayDate.getMonth()+1)+"-"+todayDate.getDate() : todayDate.getFullYear()+"-0"+(todayDate.getMonth()+1)+"-0"+todayDate.getDate());
    const [serial_no, setSerialNo] = useState(null);
    const [verified, setVerified] = useState(false);
    const [currToken, setToken] = useState('None');
    const [fingerDamaged, setDamaged] = useState(false);

    const [candidate, setCandidate] = useState(null);
    const [exist, setExist] = useState(false);

    const [searched, setSearched] = useState(false);
    const [secugen_lic, setSecugenLic] = useState("");

    const {data, setData, post, processing, errors, reset} = useForm({
        notes: '',
        biometric_fingerprint: ''
    });

    function CallSGIFPGetData(successCall, failCall) {
        // var uri = "https://localhost:8000/SGIFPCapture";
        var uri = "https://localhost:8443/SGIFPCapture";
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                // fpobject = JSON.parse(xmlhttp.responseText);
                successCall(JSON.parse(xmlhttp.responseText));
            }
            else if (xmlhttp.status == 404) {
                failCall(xmlhttp.status)
            }
        }
        xmlhttp.onerror = function () {
            failCall(xmlhttp.status);
        }
        var params = "Timeout=" + "10000";
        params += "&Quality=" + "50";
        params += "&licstr=" + encodeURIComponent(secugen_lic);
        params += "&templateFormat=" + "ISO";
        xmlhttp.open("POST", uri, true);
        xmlhttp.send(params);
    }

    function FingerSuccessFunc(result) {
        if (result.ErrorCode == 0) {
            /*  Display BMP data in image tag
                BMP data is in base 64 format
            */
            if (result != null && result.BMPBase64.length > 0) {
                document.getElementById('fingerPrint').src = "data:image/bmp;base64," + result.BMPBase64;
            }
            setData('biometric_fingerprint', result.TemplateBase64);
        }
        else {
            // alert("Fingerprint Capture Error Code:  " + result.ErrorCode + ".\nDescription:  " + ErrorCodeToString(result.ErrorCode) + ".");
            toast.error("Fingerprint Capture Error Code:  " + result.ErrorCode, {
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

    function FingerErrorFunc(status) {
        toast.warning('Check if Fingerprint Scanner is running!', {
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

    const handleFinger = (e) => {
        e.preventDefault();

        CallSGIFPGetData(FingerSuccessFunc, FingerErrorFunc);
    }

    const handleSearch = async (e) =>
    {
        setCandidate(null);

        const requestData = {
            centre_id: props.auth.user.centre.centre_id,
            barcode: barcode,
            barcode2: barcode2,
            serial_no: serial_no,
            reg_date: date,
            process_id: 3
        };

        const requestJson = JSON.stringify(requestData);

        if((serial_no == null && date == null && barcode == null) && (barcode2 == null && data.biometric_fingerprint == '' && fingerDamaged == false))
        {
            toast.warning('Please select date & serial number or input barcode number and scan finger print to proceed!', {
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
                                    if(fingerDamaged || ((barcode2 == '' || barcode2 == null) && data.biometric_fingerprint == ''))
                                    {
                                        setSearched(true);
                                        setCandidate(result.registration);
                                        setToken('M'+result.registration.token_no);
                                        if(result.verified)
                                        {
                                            setVerified(result.verified)
                                            toast.warning('Candidate Passport Already Verified!', {
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
                                    else
                                    {
                                        matchScore(result.registration, result.verified);
                                    }
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

    const matchScore = (registration, verified) => {

        let db_template = registration?.biometric_fingerprint;
            var uri = "https://localhost:8443/SGIMatchScore";

            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    let fpobject = JSON.parse(xmlhttp.responseText);
                    if(fpobject.ErrorCode == 0)
                    {
                        if(fpobject.MatchingScore >= 100)
                        {
                            setSearched(true);
                            setCandidate(registration);
                            setToken('M'+registration.token_no);
                            if(verified)
                            {
                                setVerified(verified)
                                toast.warning('Candidate Passport Already Verified!', {
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
                        else
                        {
                            toast.error('Finger does not match!', {
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
                }
                else if (xmlhttp.status == 404) {
                    setCandidate(null);
                    toast.warning('Check Finger Print Matching Function!', {
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

            xmlhttp.onerror = function () {
                // failFunction(xmlhttp.status);
                console.log(xmlhttp);
                toast.error('Finger Print Matching Failed!', {
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

            var params = "template1=" + encodeURIComponent(data.biometric_fingerprint); //user scanned template
            params += "&template2=" + encodeURIComponent(registration?.biometric_fingerprint); //db template
            params += "&licstr=" + encodeURIComponent(secugen_lic);
            params += "&templateFormat=" + "ISO";
            xmlhttp.open("POST", uri, true);
            xmlhttp.send(params);
    }

    const handleSubmit = async (e) =>
    {
        const requestData = {
            centre_id: props.auth.user.centre.centre_id,
            notes: data.notes,
            token_no: candidate.token_no,
            reg_date: candidate.reg_date,
            reg_id: candidate.reg_id,
            created_by: props?.auth?.user?.id
        };

        const requestJson = JSON.stringify(requestData);

        try {
            const response = await toast.promise(fetch(route("lab.verify_passport"), {
                method: "POST",
                body: requestJson,
            }),
            {
                pending: 'Submitting Form'
            })
                .then(res => res.json())
                .then(
                    (result) => {
                            setToken('None');
                            handleReset();
                            toast.success('Passport Verified!', {
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

    const handleReset = (e) =>
    {
        document.getElementById('fingerPrint').src = "./../assets/static/photos/ThumbPrint.png";
        setCandidate(null);
        setBarcode('');
        setRegDate(todayDate.getMonth()+1 >= 10 && todayDate.getDate() >= 10 ? todayDate.getFullYear()+"-"+(todayDate.getMonth()+1)+"-"+todayDate.getDate() : todayDate.getMonth()+1 >= 10 && todayDate.getDate() < 10 ? todayDate.getFullYear()+"-"+(todayDate.getMonth()+1)+"-0"+todayDate.getDate() : todayDate.getMonth()+1 < 10 && todayDate.getDate() >= 10 ? todayDate.getFullYear()+"-0"+(todayDate.getMonth()+1)+"-"+todayDate.getDate() : todayDate.getFullYear()+"-0"+(todayDate.getMonth()+1)+"-0"+todayDate.getDate());
        setSerialNo('');
        setSearched(false);
        data.notes = '';
        data.biometric_fingerprint = '';
        location.reload();
   };



    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Passport Verification</h2>}
        >
            <Head title="Passport Verification" />
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
                                Passport Verification
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
                        <div className="col-md-4">
                            <div className="row row-cards">
                                <div className="col-12">
                                    <div className="card">
                                    <div className="card-header">
                                        <div className="col-md-12 flex align-items-center">
                                            <div className='col-md-4' style={{float: 'left'}}>
                                                <h3>Biometric Verification</h3>
                                            </div>
                                            <div className="col-4" style={{float: 'right'}}>
                                                <label class="form-check form-switch" style={{float: 'right'}}>
                                                {props?.auth?.modules?.[1]?.rights?.[1]?.permission_name == 'biometric_search' && props?.auth?.modules?.[1]?.rights?.[1]?.status == true ?
                                                    <input class="form-check-input" type="checkbox" disabled={candidate != null} checked={fingerDamaged} onChange={(e) => setDamaged(e.target.checked)}/>
                                                :
                                                    <IconLock stroke={1} />
                                                }
                                                    <span class="form-check-label">Finger Damaged</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="row g-3 mb-3">
                                            <div className="col-3">
                                                <div className="row g-3 align-items-center justify-content-center">
                                                    {props?.auth?.modules?.[1]?.rights?.[1]?.permission_name == 'biometric_search' && props?.auth?.modules?.[1]?.rights?.[1]?.status == true ?
                                                        <input type="text" className='form-control' value={barcode2} onChange={(e) => setBarcode2(e.target.value)} onKeyDown={event => {
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
                                        <div className="row g-3">
                                            <div className="col-12">
                                                <div className="row g-3 align-items-center">
                                                    <img id="fingerPrint" src={"./../assets/static/photos/ThumbPrint.png"} style={{width : 500}}/>
                                                    <div className="col-md-12 text-center">
                                                        {props?.auth?.modules?.[1]?.rights?.[1]?.permission_name == 'biometric_search' && props?.auth?.modules?.[1]?.rights?.[1]?.status == true ?
                                                            <button className="btn btn-purple btn-md" disabled={fingerDamaged} onClick={handleFinger}>Scan fingerprint</button>
                                                        :
                                                            <button className="btn btn-purple btn-md" disabled={true} onClick={''}>
                                                                <IconLock stroke={1} />
                                                                Scan fingerprint
                                                            </button>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="card">
                                    {candidate !== null && verified == true ?
                                    <div className="card-header">
                                        <h3>Passport has been Verified!</h3>
                                    </div>
                                    : candidate !== null && verified == false ?
                                    <div className="card-body">
                                        <div className="row g-3">
                                            <div className="col-12">
                                                <div className="row g-3 align-items-center">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Notes</label>
                                                        <textarea name="notes" className="form-control" onChange={(e) => setData('notes',e.target.value.toUpperCase())}>{data.notes}</textarea>
                                                    </div>
                                                    <div className="row g-3 align-items-center">
                                                        <button className='btn btn-info' disabled={verified} onClick={handleSubmit}>Verify Passsport</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <></>
                                    }

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="row row-cards">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <div className="col-md-12 flex align-items-center">
                                                <div className='col-md-6' style={{float: 'left'}}>
                                                    <h3>Passport Information</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body" id="auto_import">
                                            <div className="row g-5 mb-3">
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Barcode</label>
                                                        {props?.auth?.modules?.[1]?.rights?.[2]?.permission_name == 'barcode_search' && props?.auth?.modules?.[1]?.rights?.[2]?.status == true ?
                                                        <input type="password" className="form-control" name="barcode" value={barcode} onChange={(e) => setBarcode(e.target.value)}  maxLength={6} onKeyDown={event => {
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
                                                        {props?.auth?.modules?.[1]?.rights?.[3]?.permission_name == 'date_search' && props?.auth?.modules?.[1]?.rights?.[3]?.status == true ?
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
                                                        {props?.auth?.modules?.[1]?.rights?.[3]?.permission_name == 'date_search' && props?.auth?.modules?.[1]?.rights?.[3]?.status == true ?
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
                                                    <button className={'btn btn-md btn-outline-info'} disabled={searched ? true : false} onClick={handleSearch}>Search for Candidate</button>
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
                                                <div className='col-md-6' style={{float: 'left'}}>
                                                    <h3>Candidate Information</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="row g-5 mb-3">
                                                <div className='col-md-6'>
                                                    <img src={candidate?.candidate_image} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="row g-5 mb-3">
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Candidate Name</label>
                                                        <input type="text" className="form-control" name="reg_date" disabled value={candidate?.candidate_name} />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Passport Number</label>
                                                        <input type="text" className="form-control" name="serial_no" disabled value={candidate?.passport_no}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row g-5 mb-3">
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Registration Date</label>
                                                        <input type="date" className="form-control" name="reg_date" disabled value={candidate?.reg_date}/>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Serial Number</label>
                                                        <input type="text" className="form-control" name="serial_no" disabled value={candidate?.serial_no}/>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row g-5 mb-3">
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>S/O or D/O or W/O</label>
                                                        <input type="text" className="form-control" name="relative_name" disabled value={candidate?.relative_name}/>
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
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
