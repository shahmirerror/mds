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

import Select from 'react-select';

export default function RegistrationEdit(props) {

    const [currToken, setToken] = useState('None');

    const {data, setData, post, processing, errors, reset} = useForm({
        passport_no: '',
        passport_issue_date: '',
        passport_expiry_date: '',
        candidate_name: '',
        candidate_image: null,
        passport_image: null,
        agency: '',
        country: '',
        profession: '',
        cnic: '',
        gender: '',
        finger_type: '',
        dob: '',
        place_of_issue: '',
        reg_date: '',
        barcode: props.barcode,
        serial_no: '',
        relation_type: '',
        relative_name: '',
        phone_1: '',
        phone_2: '',
        nationality: '',
        marital_status: '',
        biometric_fingerprint: '',
        fee_charged: '',
        discount: '',
        remarks: '',
        pregnancy_test: 0,
        repeat: false,
        token_no: currToken

    });

    const fingers = [
                        {value: 'L-Thumb', label: 'L-Thumb'},
                        {value: 'L-Index Finger', label: 'L-Index Finger'},
                        {value: 'L-Middle Finger', label: 'L-Middle Finger'},
                        {value: 'L-Ring Finger', label: 'L-Ring Finger'},
                        {value: 'L-Pinky Finger', label: 'L-Pinky Finger'},
                        {value: 'R-Thumb', label: 'R-Thumb'},
                        {value: 'R-Index Finger', label: 'R-Index Finger'},
                        {value: 'R-Middle Finger', label: 'R-Middle Finger'},
                        {value: 'R-Ring Finger', label: 'R-Ring Finger'},
                        {value: 'R-Pinky Finger', label: 'R-Pinky Finger'}
                    ]

    function findElementPromise(elementSelector, timeout = 5000) {
        return new Promise((resolve, reject) => {
          const timer = setTimeout(() => reject("Element not found"), timeout);

          const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
              const target = mutation.target;
              if (target.matches(elementSelector)) {
                clearTimeout(timer);
                observer.disconnect();
                resolve(target);
                return;
              }
            }
          });

          observer.observe(document.body, { childList: true, subtree: true });

          if (document.querySelector(elementSelector)) {
            clearTimeout(timer);
            observer.disconnect();
            resolve(document.querySelector(elementSelector));
          }
        });
    }

    const [camera, setCamera] = useState(false);
    const [centre, setCentre] = useState(null);

    const [manual, setManual] = useState(false);
    const [secugen_lic, setSecugenLic] = useState("");

    const [stream, setStream] = useState(null);
    const [imageSrc, setImageSrc] = useState(null);

    const handleCamera = (e) => {
        if(camera)
        {
            setCamera(false);
            let video = document.getElementById('video');
            let ph = document.getElementById('photo-placeholder');
            e.target.innerHTML = 'Turn Camera On';
            e.target.classList.value = 'btn btn-success btn-md';
            stream.getTracks().forEach((track) => track.stop())

                ph.style.display = 'block';
                video.style.display = 'none';
        }
        else
        {
            setCamera(true);

            e.target.innerHTML = 'Turn Camera Off';
            e.target.classList.value = 'btn btn-danger btn-md';

            findElementPromise("#video")
            .then((element) => {
                let video = document.getElementById('video');
                let ph = document.getElementById('photo-placeholder');
                navigator.mediaDevices.enumerateDevices()
                .then(devices => {
                    const videoDevices = devices.filter(device => device.kind === 'videoinput');
                    if (videoDevices.length > 0) {
                        const selectedDevice = videoDevices[0]; // You can choose the desired device based on your criteria
                        const constraints = {
                            video: {
                                deviceId: selectedDevice.deviceId
                            }
                        };

                        return navigator.mediaDevices.getUserMedia(constraints);
                    } else {
                        throw new Error('No video input devices found.');
                    }
                })
                .then(stream => {
                    // Success: Access to the webcam stream
                    setStream(stream);
                    ph.style.display = 'none';
                    video.style.display = 'block';
                    video.srcObject = stream;
                })
                .catch(error => {
                    // Error handling
                    console.error('Error accessing webcam:', error);
                });
            })
            .catch((error) => {
              console.error(error);
            });
        }

    }

    const handleCapture = (e) => {

        let video = document.getElementById('video');
        let ph = document.getElementById('taken_photo');

        if(e.target.value == 'take')
        {
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext('2d');
            context.drawImage(video, 0, 0);
            ph.src = canvas.toDataURL('image/png');
            video.style.display = 'none';
            ph.style.display = 'block';

            // Create a Blob object from the image data
            const blob = new Blob([canvas.toDataURL('image/png').replace('data:image/png;base64,', '')], { type: 'image/png' });

            // Create a File object with a custom name
            const filename = 'webcam_photo_' + Date.now() + '.png';
            const file = new File([blob], filename, { type: 'image/png' });

            setData('candidate_image',file);
        }
        else if(e.target.value == 'retake')
        {
            setData('candidate_image',null);
            video.style.display = 'block';
            ph.style.display = 'none';
        }
    }

    const fetchToken = () => {

        const requestData = {
            centre_id: props.auth.user.centre.centre_id,
            process_id: 1
        };

        const requestJson = JSON.stringify(requestData);

        try {
            const response = fetch(route("token.assign"), {
                method: "POST",
                body: requestJson,
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        // $('#preloader').hide();
                        setToken(result.new_token)

                            toast.success('New Token has been set!', {
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
    }

    const fetchBarcode = () => {

        const requestData = {
            centre_id: props.auth.user.centre.centre_id
        };

        const requestJson = JSON.stringify(requestData);

        try {
            const response = fetch(route("barcode.new"), {
                method: "POST",
                body: requestJson,
            })
                .then(res => res.json())
                .then(
                    (result) => {

                        setData('barcode',result.new_barcode)
                    },
                    (error) => {

                        console.log(error)
                    }
                );
        } catch (ex) {

            console.log(ex)
        }
    }

    const handleToken = () => {
        // e.preventDefault();

        fetchToken();
        reset();
        fetchBarcode();
        if(stream !== null)
        {
            stream.getTracks().forEach((track) => track.stop())
        }
        document.getElementById('fingerPrint').src = "./../assets/static/photos/ThumbPrint.png";
        let video = document.getElementById('video');
        let ph = document.getElementById('photo-placeholder');
        let ph2 = document.getElementById('taken_photo');
        ph.style.display = 'block';
        video.style.display = 'none';
        ph2.style.display = 'none';
        let toggle = document.getElementById('cameraToggle');
        toggle.innerHTML = 'Turn Camera On';
        toggle.classList.value = 'btn btn-success btn-md';
        setCamera(false);
        setManual(false);
        setStream(false);
        setImageSrc(null);
    }

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

    const handleImport = (e) => {
        const requestData = {
            centre_id: props.auth.user.centre.centre_id,
            counter_id: 1
        };

        const requestJson = JSON.stringify(requestData);

        try {
            const response = fetch(route("ppscan.new"), {
                method: "POST",
                body: requestJson,
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        // $('#preloader').hide();
                        if(result.pp_info.length == 0)
                        {
                            toast.warning('No Passport Found!', {
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
                            toast.success('Passport Found!', {
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

    const handleChange = (e) => {
        if(e.target.name == 'gender')
        {
            setData('pregnancy_test',0);
        }
        setData(e.target.name, e.target.value);
    }

    const submit = (e) => {
        post(route('registration-desk.store'));
    }

    useEffect(() => {
        // reset();
        handleToken();
    }, []);

    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Registration Desk - Edit</h2>}
        >
            <Head title="Registration Desk - Edit" />
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
                                Registration Desk - Edit
                            </h2>
                            {/* <h3 className="badge bg-success text-white" style={{float: 'right'}}>Counter 1</h3> */}
                        </div>
                        <div className="col-md-3 align-items-center" style={{float: 'right'}}>
                            <h2 className="page-title">
                                <button className="btn btn-secondary btn-sm mr-5 btn-pill" onClick={''}>
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

                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="row g-3">
                                            <div className="col-6">
                                                <div className="row g-3 align-items-center">
                                                    <img id="fingerPrint" src={"./../../assets/static/photos/ThumbPrint.png"} style={{width : 500}}/>
                                                    <div className="col-md-12 text-center">
                                                        <button className="btn btn-purple btn-md w-50" onClick={handleFinger}>Scan fingerprint</button>
                                                    </div>
                                                    <div className="col-md-12 text-center">
                                                        <select className="form-select" name="finger_type" onChange={handleChange}>
                                                            <option>--</option>
                                                            {fingers.map((finger, index) => (
                                                                <option value={finger.value}>{finger.label}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="row g-3 align-items-center">
                                                    <video id="video" autoPlay muted style={{height: '280px', display: 'none'}}/>
                                                    <img src={null} id="taken_photo" style={{width : 300, display: 'none', marginTop: '55px'}} className="mb-5" />
                                                    <img src={"./../assets/static/photos/Photo.png"} className="mb-4" id="photo-placeholder" style={{width : 274}} />
                                                    <div className="col-md-6">
                                                    { camera && data.candidate_image == null ?
                                                        (<button className="btn btn-warning btn-md" value="take" onClick={handleCapture}>Take Photo</button>)
                                                    : camera && data.candidate_image != null ?
                                                        (<button className="btn btn-warning btn-md" value="retake" onClick={handleCapture}>Re-Take Photo</button>)
                                                    :
                                                        (<></>)
                                                    }
                                                    </div>
                                                    <div className="col-md-6">
                                                        <button className="btn btn-success btn-md" id="cameraToggle" disabled={data.candidate_image != null} onClick={handleCamera}>Turn Camera On</button>
                                                    </div>
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
                                                    {!manual ?
                                                    (<button className="btn btn-sm btn-yellow" onClick={handleImport}>Import Passport</button>)
                                                    :
                                                    (<h3>Passport Information</h3>)}
                                                </div>
                                                <div className='col-md-6' style={{float: 'right'}}>
                                                <label class="form-check form-switch" style={{float: 'right'}}>
                                                    <input class="form-check-input" type="checkbox" checked={manual} onChange={(e) => setManual(e.target.checked)}/>
                                                    <span class="form-check-label">Manual Entry</span>
                                                </label>
                                                </div>
                                            </div>
                                        </div>
                                        {!manual ?
                                        (<div className="card-body" id="auto_import">
                                            <div className="row g-5 mb-3">
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Place of Issue</label>
                                                        <Select
                                                            options={props.places}
                                                            value={data.place_of_issue}
                                                            name="place_of_issue"
                                                            onChange={(e) => setData('place_of_issue', e)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>PP Issue Date</label>
                                                        <input type="date" className="form-control" name="passport_issue_date" onChange={handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row g-5">
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Reference Slip Issue Date</label>
                                                        <input type="date" className="form-control" name="ref_slip_issue_date" value={data.ref_slip_issue_date} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Reference Slip Expiry Date</label>
                                                        <input type="date" className="form-control" name="ref_slip_expiry_date" value={data.ref_slip_expiry_date} onChange={handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>)
                                        :
                                        (<div className="card-body" id="manual_import">
                                            <div className="row g-5 mb-3">
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Candidate Name</label>
                                                        <input type="text" className="form-control" name="candidate_name" value={data.candidate_name} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Passport Number</label>
                                                        <input type="text" className="form-control" name="passport_no" value={data.passport_no} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>PP Issue Date</label>
                                                        <input type="date" className="form-control" name="passport_issue_date" value={data.passport_issue_date} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>PP Expiry Date</label>
                                                        <input type="date" className="form-control" name="passport_expiry_date" value={data.passport_expiry_date} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>DOB</label>
                                                        <input type="date" className="form-control" name="dob" value={data.dob} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Gender</label>
                                                        <select className="form-control" name="gender" onChange={handleChange}>
                                                            <option value="">Select Gender</option>
                                                            <option value="Male">Male</option>
                                                            <option value="Female">Female</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Passport Image</label>
                                                        <input type="file" className="form-control" name="passport_image" onChange={(e) => setData('passport_image',e.target.files[0])} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row g-5 mb-3">
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Nationality</label>
                                                        <input type="text" className="form-control" name="nationality" value={data.nationality} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>CNIC</label>
                                                        <input type="text" className="form-control" name="cnic" value={data.cnic} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Place of Issue</label>
                                                        <Select
                                                            options={props.places}
                                                            value={data.place_of_issue}
                                                            name="place_of_issue"
                                                            onChange={(e) => setData('place_of_issue', e)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row g-5">
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Reference Slip Issue Date</label>
                                                        <input type="date" className="form-control" name="ref_slip_issue_date" value={data.ref_slip_issue_date} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Reference Slip Expiry Date</label>
                                                        <input type="date" className="form-control" name="ref_slip_expiry_date" value={data.ref_slip_expiry_date} onChange={handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>)
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row row-cards">
                    <div className="col-md-6">
                            <div className="row row-cards">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <div className="col-md-12 flex align-items-center">
                                                <div className='col-md-6' style={{float: 'left'}}>
                                                    <h3>General Information</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="row g-5 mb-3">
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Registration Date</label>
                                                        <input type="date" className="form-control" name="reg_date" value={data.reg_date} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Serial Number</label>
                                                        <input type="text" className="form-control" name="serial_no" value={data.serial_no} onChange={handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row g-5 mb-3">
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Agency</label>
                                                        <Select
                                                            options={props.agencies}
                                                            value={data.agency}
                                                            name="agencies"
                                                            onChange={(e) => setData('agency', e)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Country</label>
                                                        <Select
                                                            options={props.countries}
                                                            value={data.country}
                                                            name="country"
                                                            onChange={(e) => setData('country', e)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row g-5 mb-3">
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Profession</label>
                                                        <Select
                                                            options={props.professions}
                                                            value={data.profession}
                                                            name="profession"
                                                            onChange={(e) => setData('profession', e)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Fees</label>
                                                        <input className="form-control" name="fees" type="text" value={data.fees} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Discount</label>
                                                        <input className="form-control" name="discount" type="text" value={data.discount} onChange={handleChange} />
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
                                                    <h3>Candidate Information</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="row g-5 mb-3">
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Relation</label>
                                                        <select className="form-select" name="relation_type" value={data.relation_type} onChange={handleChange}>
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
                                                        <input type="text" className="form-control" name="relative_name" value={data.relative_name} onChange={handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row g-5 mb-3">
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Phone 1</label>
                                                        <input type="text" className="form-control" name="phone_1" value={data.phone_1} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Phone 2</label>
                                                        <input type="text" className="form-control" name="phone_2" value={data.phone_2} onChange={handleChange}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row g-5">
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Pregnancy Check</label>
                                                        <select className="form-select" disabled={data.gender == 'Male'} name="pregnancy_test" value={data.pregnancy_test} onChange={handleChange}>
                                                            <option value="1">Pregnant</option>
                                                            <option value="0">Not Pregnant</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Marital Status</label>
                                                        <select className="form-select" name="marital_status" value={data.marital_status} onChange={handleChange}>
                                                            <option value="">Select Marital Status</option>
                                                            <option value="Single">Single</option>
                                                            <option value="Married">Married</option>
                                                            <option value="Divorced">Divorced</option>
                                                            <option value="Widowed">Widowed</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Remarks</label>
                                                        <textarea className="form-control" name="remarks" value={data.remarks} onChange={handleChange}></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className='row g-5'>
                                                <div className="col-12">
                                                    <button className="btn btn-outline-success" disabled={currToken == 'None'} onClick={submit}>Submit</button>
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
