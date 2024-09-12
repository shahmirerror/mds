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

import {Inertia} from '@inertiajs/inertia';

import Select from 'react-select';

export default function RegistrationRepeat(props) {

    const [currToken, setToken] = useState(props.token_no);
    const [prevBarcode, setPrevBarcode] = useState(null);
    const [report, setReport] = useState(null);

    const [camera, setCamera] = useState(false);
    const [centre, setCentre] = useState(null);

    const [manual, setManual] = useState(false);
    const [secugen_lic, setSecugenLic] = useState("");

    const [stream, setStream] = useState(null);
    const [imageSrc, setImageSrc] = useState(null);
    const [showModal, setModal] = useState(false);
    const [fingerDamaged, setDamaged] = useState(false);

    const [candidate, setCandidate] = useState(null);
    const [searched, setSearched] = useState(null);
    const [passport_no, setPassportNo] = useState(null);

    const todayDate = new Date();

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
        reg_date: todayDate.getMonth()+1 >= 10 && todayDate.getDate() >= 10 ? todayDate.getFullYear()+"-"+(todayDate.getMonth()+1)+"-"+todayDate.getDate() : todayDate.getMonth()+1 >= 10 && todayDate.getDate() < 10 ? todayDate.getFullYear()+"-"+(todayDate.getMonth()+1)+"-0"+todayDate.getDate() : todayDate.getMonth()+1 < 10 && todayDate.getDate() >= 10 ? todayDate.getFullYear()+"-0"+(todayDate.getMonth()+1)+"-"+todayDate.getDate() : todayDate.getFullYear()+"-0"+(todayDate.getMonth()+1)+"-0"+todayDate.getDate(),
        ref_slip_issue_date: '',
        ref_slip_expiry_date: '',
        barcode: props.barcode,
        serial_no: '',
        relation_type: '',
        relative_name: '',
        phone_1: '',
        phone_2: '',
        nationality: '',
        marital_status: '',
        biometric_fingerprint: '',
        fees: '',
        discount: '',
        remarks: '',
        pregnancy_test: 0,
        repeat: false,
        token_no: currToken

    });

    const fingers = [
                        {value: 'R-Thumb', label: 'R-Thumb'},
                        {value: 'R-Index Finger', label: 'R-Index Finger'},
                        {value: 'R-Middle Finger', label: 'R-Middle Finger'},
                        {value: 'R-Ring Finger', label: 'R-Ring Finger'},
                        {value: 'R-Pinky Finger', label: 'R-Pinky Finger'},
                        {value: 'L-Thumb', label: 'L-Thumb'},
                        {value: 'L-Index Finger', label: 'L-Index Finger'},
                        {value: 'L-Middle Finger', label: 'L-Middle Finger'},
                        {value: 'L-Ring Finger', label: 'L-Ring Finger'},
                        {value: 'L-Pinky Finger', label: 'L-Pinky Finger'},
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
            .then(async(element) => {
                let video = document.getElementById('video');
                let ph = document.getElementById('photo-placeholder');
                const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
                setStream(mediaStream);
                ph.style.display = 'none';
                video.style.display = 'block';
                video.srcObject = mediaStream;
            })
            .catch((error) => {
                toast.error("Something went wrong! Can't access your camera :(", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
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

        if(data.barcode != '' && data.barcode != null)
        {
            setPrevBarcode(data.barcode);
        }

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

    const handlePrint = () => {

        const requestData = {
            centre_id: props.auth.user.centre.centre_id,
            barcode_no: prevBarcode
        };

        const requestJson = JSON.stringify(requestData);

        try {
            const response = fetch(route("lab.export_reg_report"), {
                method: "POST",
                body: requestJson,
            })
                .then(res => res.json())
                .then(
                    (result) => {

                        toast.success('Report has been generated!', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            });

                            setReport(result.filename);
                            setModal(true);
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

    const handleToken = () => {
        // e.preventDefault();

        fetchToken();
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

    const handleSearch = async (e) =>
    {
        setCandidate(null);

        const requestData = {
            centre_id: props.auth.user.centre.centre_id,
            passport_no: passport_no
        };

        const requestJson = JSON.stringify(requestData);

        if(passport_no == null || (data.biometric_fingerprint == '' && fingerDamaged == false))
        {
            toast.warning('Please input Passport Number and Scan Finger Print to proceed!', {
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
                const response = await toast.promise(fetch(route("lab.fetch_registration_repeat"), {
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
                                    if(fingerDamaged)
                                    {
                                        let temp = data.reg_date;
                                        data.reg_date = result.registration.reg_date;
                                        result.registration.reg_date = temp;
                                        setCandidate(result.registration);
                                        setSearched(true);
                                        data.serial_no = result.registration.serial_no;
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
                                        matchScore(result.registration);
                                    }
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

    const matchScore = (registration) => {

        let db_template = candidate?.biometric_fingerprint;
            var uri = "https://localhost:8443/SGIMatchScore";

            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    let fpobject = JSON.parse(xmlhttp.responseText);
                    if(fpobject.ErrorCode == 0)
                    {
                        if(fpobject.MatchingScore >= 100)
                        {
                            let temp = data.reg_date;
                            data.reg_date = registration.reg_date;
                            registration.reg_date = temp;
                            data.serial_no = registration.serial_no;
                            setCandidate(registration);
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

    const handleSubmit = async (e) => {
        e.target.disabled = true;
        const requestData = {
            data: candidate,
            barcode: data.barcode,
            candidate_image: data.candidate_image,
            centre_id: props?.auth?.user?.centre?.centre_id,
            fingerprint: data.biometric_fingerprint,
            token_no: currToken,
            created_by: props?.auth?.user?.id
        };

        const requestJson = JSON.stringify(requestData);

            try {
                const response = await toast.promise(fetch(route("lab.repeat_case_registration"), {
                    method: "POST",
                    body: requestJson,
                }),
                {
                    pending: "Submitting Form"
                })
                    .then(res => res.json())
                    .then(
                        (result) => {
                                    toast.success('Candidate has been Registered!', {
                                        position: "top-right",
                                        autoClose: 5000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "light",
                                        });

                                        Inertia.visit(route('registration-desk.index'));
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
                    console.log(ex);
            }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCandidate(prevCandidate => ({
            ...prevCandidate,
            [name]: name == 'marital_status' || name == 'pregnancy_check' || name == 'finger_type' ? value : value.toUpperCase()
        }));
    }

    const handleChangeSelects = (name, e) => {
        const Name = name;
        const value = e;
        setCandidate(prevCandidate => ({
            ...prevCandidate,
            [Name]: value
        }));
    }

    useEffect(() => {
        // reset();
        // handleToken();
    }, []);

    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Registration Desk - Repeat Case</h2>}
        >
            <Head title="Registration Desk - Repeat Case" />
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
                        <div className="col-md-4" style={{float: 'left'}}>
                            <h2 className="page-title" style={{float: 'left'}}>
                                Registration Desk - Repeat Case
                            </h2>
                            <a className="btn btn-danger btn-sm" type={'button'} href={route('registration-desk.index')} style={{float: 'right'}}>Go Back</a>
                        </div>
                        <div className="col-md-4 align-items-center" style={{float: 'right'}}>
                            <h2 className="page-title">
                                <button className="btn btn-secondary btn-sm mr-5 btn-pill" onClick={(e) => location.reload()}>
                                    <IconRefresh />
                                </button>
                                <span className="badge">Current Token: {currToken != 'None' ? 'M'+currToken : 'None'}</span>
                                |
                                <span className="badge">In Queue: {props.in_queue}</span>
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
                                            <div className='col-md-4' style={{float: 'left'}}>
                                                <span style={{float: "left"}} className={'badge bg-secondary text-white'}>Barcode Number: {data.barcode}</span>
                                            </div>
                                            <div className="col-4" style={{float: 'right'}}>
                                                <label class="form-check form-switch" style={{float: 'right'}}>
                                                    <input class="form-check-input" type="checkbox" disabled={candidate != null} checked={fingerDamaged} onChange={(e) => setDamaged(e.target.checked)}/>
                                                    <span class="form-check-label">Finger Damaged</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="row g-3">
                                            <div className="col-6">
                                                <div className="row g-3 align-items-center">
                                                    <img id="fingerPrint" src={"./../../assets/static/photos/ThumbPrint.png"} style={{width : 500}}/>
                                                    <div className="col-md-12 text-center">
                                                        <button className="btn btn-purple btn-md w-50" disabled={fingerDamaged} onClick={handleFinger}>Scan fingerprint</button>
                                                    </div>
                                                </div>
                                                
                                                <div className="col-md-12 text-center mt-3">
                                                    <select className="form-select" required name="finger_type" disabled={candidate == null} value={candidate?.finger_type} onChange={handleChange}>
                                                        <option value={null}>--</option>
                                                        {fingers.map((finger, index) => (
                                                            <option value={finger.value}>{finger.label}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="row g-3 align-items-center">
                                                    <img src={candidate != null ? candidate?.candidate_image : "./../../assets/static/photos/Photo.png"} className="mb-4" id="photo-placeholder" style={{width : 274}} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div className={'col-12'}>
                                    <div className={'card'}>
                                        <div className={'card-body'}>
                                            <div className="row g-3">
                                                <img id="passportImage" src={candidate?.passport_image}/>
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
                                                    <h3>Passport Information</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body" id="auto_import">
                                            <div className="row g-5 mb-3">
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Enter Passport Number</label>
                                                        <input type="text" className="form-control" name="passport_no" value={passport_no} onChange={(e) => setPassportNo(e.target.value.toUpperCase())} onKeyDown={event => {
                                                                                                                                                                                                                        if (event.key === 'Enter') {
                                                                                                                                                                                                                            handleSearch(event)
                                                                                                                                                                                                                        }
                                                                                                                                                                                                                        }} />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center mt-4">
                                                        <button className={'btn btn-md btn-outline-info'} disabled={searched ? true : false} onClick={handleSearch}>Fetch Candidate & Verify</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {candidate && (
                                            <>
                                            <div className="card-body" id="auto_import">
                                                <div className="row g-5 mb-3">
                                                    <div className="col-6">
                                                        <div className="row g-3 align-items-center">
                                                            <label className='form-label'>Candidate Name</label>
                                                            <input type="text" className="form-control" name="candidate_name" value={candidate?.candidate_name} onChange={handleChange} />
                                                        </div>
                                                    </div>
                                                    <div className="col-6">
                                                        <div className="row g-3 align-items-center">
                                                            <label className='form-label'>Passport Number</label>
                                                            <input type="text" disabled className="form-control" name="passport_no" value={candidate?.passport_no} onChange={handleChange} />
                                                        </div>
                                                    </div>
                                                    <div className="col-4">
                                                        <div className="row g-3 align-items-center">
                                                            <label className='form-label'>PP Expiry Date</label>
                                                            <input type="date" disabled className="form-control" name="passport_expiry_date" value={candidate?.passport_expiry_date} onChange={handleChange} />
                                                        </div>
                                                    </div>
                                                    <div className="col-4">
                                                        <div className="row g-3 align-items-center">
                                                            <label className='form-label'>DOB</label>
                                                            <input type="date" disabled className="form-control" name="dob" value={candidate?.dob} onChange={handleChange} />
                                                        </div>
                                                    </div>
                                                    <div className="col-4">
                                                        <div className="row g-3 align-items-center">
                                                            <label className='form-label'>Gender</label>
                                                            <select className="form-control" disabled name="gender" value={candidate?.gender} onChange={handleChange}>
                                                                <option value="">Select Gender</option>
                                                                <option value="Male">Male</option>
                                                                <option value="Female">Female</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row g-5 mb-3">
                                                    <div className="col-4">
                                                        <div className="row g-3 align-items-center">
                                                            <label className='form-label'>Nationality</label>
                                                            <input type="text" className="form-control" disabled name="nationality" value={candidate?.nationality} onChange={handleChange} />
                                                        </div>
                                                    </div>
                                                    <div className="col-4">
                                                        <div className="row g-3 align-items-center">
                                                            <label className='form-label'>CNIC</label>
                                                            <input type="text" className="form-control" disabled name="cnic" value={candidate?.cnic} onChange={handleChange} />
                                                        </div>
                                                    </div>
                                                    <div className="col-4">
                                                        <div className="row g-3 align-items-center">
                                                            <label className='form-label'>Place of Issue</label>
                                                            <Select
                                                                options={props.places}
                                                                value={candidate?.place_of_issue}
                                                                name="place_of_issue"
                                                                onChange={(e) => setData('place_of_issue', e)}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row g-5 mb-3">
                                                    <div className="col-4">
                                                        <div className="row g-3 align-items-center">
                                                            <label className='form-label'>PP Issue Date</label>
                                                            <input type="date" className="form-control" name="passport_issue_date" value={candidate?.passport_issue_date} onChange={handleChange} />
                                                        </div>
                                                    </div>
                                                    <div className="col-4">
                                                        <div className="row g-3 align-items-center">
                                                            <label className='form-label'>Reference Slip Issue Date</label>
                                                            <input type="date" className="form-control" name="ref_slip_issue_date" value={candidate?.slip_issue_date} onChange={handleChange} />
                                                        </div>
                                                    </div>
                                                    <div className="col-4">
                                                        <div className="row g-3 align-items-center">
                                                            <label className='form-label'>Reference Slip Expiry Date</label>
                                                            <input type="date" className="form-control" name="ref_slip_expiry_date" value={candidate?.slip_expiry_date} onChange={handleChange} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-body" id="auto_import">
                                                <div className="row g-5 mb-3">
                                                    <div className="col-4">
                                                        <div className="row g-3 align-items-center">
                                                            <label className='form-label'>Previous Registration Date</label>
                                                            <input type="date" className="form-control" name="prev_reg_date" value={data.reg_date} disabled />
                                                        </div>
                                                    </div>
                                                    <div className="col-4">
                                                        <div className="row g-3 align-items-center">
                                                            <label className='form-label'>Previous Serial Number</label>
                                                            <input type="text" disabled className="form-control" name="prev_serial_no" value={candidate?.serial_no} />
                                                        </div>
                                                    </div>
                                                    <div className="col-4">
                                                        <div className="row g-3 align-items-center">
                                                            <label className='form-label'>Previous Status</label>
                                                            <input type="text" disabled className="form-control" name="passport_expiry_date" value={candidate?.reg_status} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            </>
                                        )}
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
                                                <div className='col-md-6' style={{float: 'right'}}>
                                                    <h3 style={{textAlign: 'right'}}>{candidate?.reg_date?.replaceAll('-','')+candidate?.serial_no?.replaceAll('/','')}</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="row g-5 mb-3">
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Registration Date</label>
                                                        <input type="date" className="form-control" name="reg_date" value={candidate?.reg_date} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Serial Number</label>
                                                        <input type="text" className="form-control" name="serial_no" value={candidate?.serial_no} onChange={handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row g-5 mb-3">
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Agency</label>
                                                        <Select
                                                            options={props.agencies}
                                                            value={candidate?.agency}
                                                            name="agencies"
                                                            onChange={(e) => handleChangeSelects('agency',e)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Country</label>
                                                        <Select
                                                            options={props.countries}
                                                            value={candidate?.country}
                                                            name="country"
                                                            onChange={(e) => handleChangeSelects('country',e)}
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
                                                            value={candidate?.profession}
                                                            name="profession"
                                                            onChange={(e) => handleChangeSelects('profession',e)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Fees</label>
                                                        <input className="form-control" name="fee_charged" type="text" value={candidate?.fee_charged} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Discount</label>
                                                        <input className="form-control" name="discount" type="text" value={candidate?.discount} onChange={handleChange} />
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
                                                        <select className="form-select" name="relation_type" value={candidate?.relation_type} onChange={handleChange}>
                                                            <option value="">Select Relation</option>
                                                            <option value="S/O">S/O</option>
                                                            <option value="W/O">W/O</option>
                                                            <option value="D/O">D/O</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>S/O or W/O or D/O</label>
                                                        <input type="text" className="form-control" name="relative_name" value={candidate?.relative_name} onChange={handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row g-5 mb-3">
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Phone 1</label>
                                                        <input type="text" className="form-control" name="phone_1" value={candidate?.phone_1} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Phone 2</label>
                                                        <input type="text" className="form-control" name="phone_2" value={candidate?.phone_2} onChange={handleChange}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row g-5">
                                                <div className="col-4">
                                                    <div className={candidate != null ? candidate?.gender == 'Male' ? "row g-3 align-items-center d-none" : "row g-3 align-items-center" : "row g-3 align-items-center"}>
                                                        <label className='form-label'>Pregnancy Check</label>
                                                        <select className="form-select" disabled={candidate?.gender == 'Male'} name="pregnancy_test" value={candidate?.pregnancy_test} onChange={handleChange}>
                                                            <option value="1">Pregnant</option>
                                                            <option value="0">Not Pregnant</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Marital Status</label>
                                                        <select className="form-select" name="marital_status" value={candidate?.marital_status} onChange={handleChange}>
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
                                                        <textarea className="form-control" name="remarks" value={candidate?.remarks} onChange={handleChange}></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className='row g-5'>
                                                <div className="col-3">
                                                    <button className="btn btn-outline-success" disabled={(currToken == 'None' && candidate == null) || (currToken != 'None' && candidate == null)} onClick={handleSubmit}>Submit Form</button>
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
