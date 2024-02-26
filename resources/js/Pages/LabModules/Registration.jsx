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

export default function Registration(props) {

    const [currToken, setToken] = useState(props.token_no);
    const [Queue, setQueue] = useState(props.in_queue);
    const [prevBarcode, setPrevBarcode] = useState(props.prevBarcode);
    const [report, setReport] = useState(null);
    const [manualPP, setManualPP] = useState(true);
    const [ppFormat, setPPFormat] = useState(false);
    const [counterID, setCounter] = useState(props.auth.user.role_id == 2 ? 1 : 0);
    const [prevReg, setPrevReg] = useState(null);

    const todayDate = new Date();
    const [today, setToday] = useState(null);

    const [camera, setCamera] = useState(false);
    const [centre, setCentre] = useState(null);

    const [manual, setManual] = useState(false);
    const [secugen_lic, setSecugenLic] = useState("");

    const [stream, setStream] = useState(null);
    const [imageSrc, setImageSrc] = useState(null);
    const [showModal, setModal] = useState(false);

    const {data, setData, post, processing, errors, reset} = useForm({
        passport_no: '',
        passport_issue_date: null,
        passport_expiry_date: null,
        candidate_name: '',
        candidate_image: null,
        passport_image: null,
        agency: '',
        country: '',
        profession: '',
        cnic: '',
        gender: '',
        finger_type: '',
        dob: null,
        place_of_issue: '',
        reg_date: todayDate.getMonth()+1 >= 10 ? todayDate.getFullYear()+"-"+(todayDate.getMonth()+1)+"-"+todayDate.getDate() : todayDate.getFullYear()+"-0"+(todayDate.getMonth()+1)+"-"+todayDate.getDate(),
        ref_slip_issue_date: null,
        ref_slip_expiry_date: null,
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
                console.log(error)
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

            data.candidate_image = canvas.toDataURL('image/png');
            console.log(file);
        }
        else if(e.target.value == 'retake')
        {
            setData('candidate_image',null);
            video.style.display = 'block';
            ph.style.display = 'none';

            data.candidate_image = NULL;
        }
    }

    const fetchToken = () => {

        const requestData = {
            centre_id: props.auth.user.centre.centre_id,
            process_id: 1,
            counter_no: counterID
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
                        setQueue(result.in_queue)

                        if(result.new_token == 'None')
                        {
                            toast.warning('No Tokens found in Queue!', {
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

    const handlePrint = async () => {

        const requestData = {
            centre_id: props.auth.user.centre.centre_id,
            barcode_no: prevBarcode
        };

        const requestJson = JSON.stringify(requestData);

        try {
            setReport(null);
            const response = await toast.promise(fetch(route("lab.export_reg_report"), {
                method: "POST",
                body: requestJson,
            }),
            {
                pending: "Fetching Report"
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
        setManualPP(true);
        setPrevReg(null);
        resetData();
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

    const handleImport = async (e) => {

        const requestData = {
            centre_id: props.auth.user.centre.centre_id,
            counter_id: counterID,
            username: props.username
        };

        setManualPP(true);
        setPPFormat(false);
        setPrevReg(null);

        data.passport_image = null;
        data.passport_no = '';
        data.nationality = '';
        data.candidate_name = '';
        data.cnic = '';
        data.dob = '';
        data.place_of_issue = '';
        data.passport_expiry_date = '';
        setData('gender', '');

        const requestJson = JSON.stringify(requestData);

        try {

            const response = await toast.promise(
                fetch(route("ppscan.new"),{
                    method: "POST",
                    body: requestJson,
                }),
                {
                  pending: 'Importing Passport',
                })
                .then(res => res.json())
                .then(
                    (result) => {
                        // $('#preloader').hide();
                        if(result.message == 'No Passport Found!' || result.message == 'Passport is Invalid')
                        {
                            setPPFormat(false);
                            setData('passport_image',result.filename);
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
                        else
                        {
                            setManualPP(false);
                            setPPFormat(true);
                            setPrevReg(result.prev);
                            if(result.prev !== null)
                            {
                                toast.info('A previous registration was found!', {
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
                            data.passport_image = result.filename;
                            data.passport_no = result.pp_info.pp_no;
                            data.nationality = result.pp_info.nationality;
                            data.candidate_name = result.pp_info.first_name+' '+result.pp_info.last_name;
                            data.cnic = result.pp_info.cnic;
                            data.dob = result.pp_info.dob;
                            data.place_of_issue = result.pp_info.pp_issue_state;
                            data.passport_expiry_date = result.pp_info.pp_expiry_date;
                            setData('gender', result.pp_info.gender);

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

                                console.log(data);
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

    const handlePrev = async (e) => {

        const requestData = {
            centre_id: props.auth.user.centre.centre_id,
            cnic: data.cnic
        };

        setPrevReg(null);

        const requestJson = JSON.stringify(requestData);

        try {

            const response = await toast.promise(
                fetch(route("lab.fetch_prev_registration"),{
                    method: "POST",
                    body: requestJson,
                }),
                {
                  pending: 'Checking for any previous registrations',
                })
                .then(res => res.json())
                .then(
                    (result) => {
                        // $('#preloader').hide();
                        if(result.prev == null)
                        {
                            setPrevReg(null);
                            toast.info('Candidate is new to the centre', {
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
                            setPrevReg(result.prev);
                            toast.info('A previous registration was found!', {
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

    const handleChange = (e) => {
        if(e.target.name == 'gender')
        {
            setData('pregnancy_test',0);
            setData('gender',e.target.value);
        }
        else
        {
            if(e.target.name == 'marital_status' || e.target.name == 'pregnancy_test')
            {
                setData(e.target.name, e.target.value);
            }
            else
            {
                setData(e.target.name, e.target.value.toUpperCase());
            }

        }
    }

    const handleSubmit = async (e) => {

        let verify = handleFormRequired();

        if(verify == true)
        {
            const requestData = {
                data: data,
                passport_image: data.passport_image,
                candidate_image: data.candidate_image,
                centre_id: props?.auth?.user?.centre?.centre_id
            };

            const requestJson = JSON.stringify(requestData);

                try {
                    const response = await toast.promise(fetch(route("lab.store_registration"), {
                        method: "POST",
                        body: requestJson,
                    }),
                    {
                    pending: 'Submitting Form',
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

                                            location.reload();
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
        else
        {
            toast.warning(verify, {
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

    const resetData = () => {
        data.passport_no = '';
        data.passport_issue_date = '';
        data.passport_expiry_date = '';
        data.candidate_name = '';
        data.candidate_image = null;
        data.passport_image = null;
        data.agency = '';
        data.country = '';
        data.profession = '';
        data.cnic = '';
        data.gender = '';
        data.finger_type = '';
        data.dob = '';
        data.place_of_issue = '';
        data.reg_date = todayDate.getMonth()+1 >= 10 ? todayDate.getFullYear()+"-"+(todayDate.getMonth()+1)+"-"+todayDate.getDate() : todayDate.getFullYear()+"-0"+(todayDate.getMonth()+1)+"-"+todayDate.getDate();
        data.slip_issue_date = '';
        data.ref_slip_expiry_date = '';
        data.serial_no = '';
        data.relation_type = '';
        data.relative_name = '';
        data.phone_1 = '';
        data.phone_2 = '';
        data.nationality = '';
        data.marital_status = '';
        data.biometric_fingerprint = '';
        data.fees = '';
        data.discount = '';
        data.remarks = '';
        data.pregnancy_test = 0;
    };

    const handleFormRequired = () =>
    {
        let message = true;
        Object.entries(data).map(([key, value]) => {
            if((key == 'biometric_fingerprint' || key == 'serial_no') && (value == null || value == ''))
            {
                message = 'Please input '+key.replaceAll('_',' ')+' before submitting form!';
            }
            else if((key == 'candidate_image' || key == 'passport_image' || key == 'passport_no' || key == 'gender') && (value == null || value == ''))
            {
                message = 'Please input candidate details before submitting form!';
            }
        });

        return message;
    }

    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Registration Desk</h2>}
        >
            <Head title="Registration Desk" />
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
                        <div className="col-md-5" style={{float: 'left'}}>
                            <h2 className="page-title" style={{float: 'left'}}>
                                Registration Desk
                            </h2>
                            <h4 style={{float: 'right'}}>
                                <select className="form-select" name="counter_no" value={counterID} onChange={(e) => setCounter(e.target.value)}>
                                    <option value={1}>Counter 1</option>
                                    <option value={2}>Counter 2</option>
                                </select>
                            </h4>
                        </div>
                        <div className="col-md-6 align-items-center" style={{float: 'right'}}>
                            <h2 className="page-title" style={{float: 'right'}}>
                                <button className="btn btn-secondary btn-sm mr-5 btn-pill" onClick={handleToken}>
                                    <IconRefresh />
                                </button>
                                <span className="badge">Current Token: {currToken != 'None' ? 'M'+currToken : 'None'}</span>
                                |
                                <span className="badge">In Queue: {Queue}</span>
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
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="row g-3">
                                            <div className="col-6">
                                                <div className="row g-3 align-items-center">
                                                    <img id="fingerPrint" src={"./../assets/static/photos/ThumbPrint.png"} style={{width : 500}}/>
                                                    <div className="col-md-12 text-center">
                                                        <button className="btn btn-purple btn-md w-50" onClick={handleFinger}>Scan fingerprint</button>
                                                    </div>
                                                    <div className="col-md-12 text-center">
                                                        <select className="form-select" required name="finger_type" onChange={handleChange}>
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
                                                <div className='col-md-6' style={{float: 'left', display: 'flex', justifyContent: 'space-between'}}>
                                                    {!manual ?
                                                    (
                                                        <>
                                                        <button className="btn btn-sm btn-yellow" onClick={handleImport}>Import Passport</button>
                                                        <a className="btn btn-outline-danger btn-sm" type="button" href={currToken != 'None' ? route('registration-desk.show','repeat-case?token_no='+currToken) : '#'}>Repeat Case</a>
                                                        </>
                                                    )
                                                    :
                                                    (<h3>Passport Information</h3>)}
                                                </div>
                                                <div className='col-md-6' style={{float: 'right'}}>
                                                {props?.auth?.modules?.[0]?.rights?.[2]?.permission_name == 'manual_entry' && props?.auth?.modules?.[2]?.rights?.[0]?.status == true ?
                                                    <label class="form-check form-switch" style={{float: 'right'}}>
                                                        <input class="form-check-input" type="checkbox" disabled={data.passport_image != null && data.passport_image != '' && ppFormat} checked={manual} onChange={(e) => setManual(e.target.checked)}/>
                                                        <span class="form-check-label">Manual Entry</span>
                                                    </label>
                                                :
                                                <></>
                                                }
                                                </div>
                                            </div>
                                        </div>
                                        {!manual ?
                                        (<div className="card-body" id="auto_import">
                                            {!manualPP && (
                                                <>
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
                                                            <input type="text" disabled className="form-control" name="passport_no" value={data.passport_no} onChange={handleChange} />
                                                        </div>
                                                    </div>
                                                    <div className="col-4">
                                                        <div className="row g-3 align-items-center">
                                                            <label className='form-label'>PP Expiry Date</label>
                                                            <input type="date" disabled className="form-control" name="passport_expiry_date" value={data.passport_expiry_date} onChange={handleChange} />
                                                        </div>
                                                    </div>
                                                    <div className="col-4">
                                                        <div className="row g-3 align-items-center">
                                                            <label className='form-label'>DOB</label>
                                                            <input type="date" disabled className="form-control" name="dob" value={data.dob} onChange={handleChange} />
                                                        </div>
                                                    </div>
                                                    <div className="col-4">
                                                        <div className="row g-3 align-items-center">
                                                            <label className='form-label'>Gender</label>
                                                            <select className="form-control" disabled name="gender" value={data.gender} onChange={handleChange}>
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
                                                            <input type="text" className="form-control" disabled name="nationality" value={data.nationality} onChange={handleChange} />
                                                        </div>
                                                    </div>
                                                    <div className="col-4">
                                                        <div className="row g-3 align-items-center">
                                                            <label className='form-label'>CNIC</label>
                                                            <input type="text" className="form-control" disabled name="cnic" value={data.cnic} onChange={handleChange} />
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
                                                </>
                                            )}
                                            <div className="row g-5 mb-3">
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>PP Issue Date</label>
                                                        <input type="date" required={manual == false} className="form-control" name="passport_issue_date" onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Reference Slip Issue Date</label>
                                                        <input type="date" required={manual == false} className="form-control" name="ref_slip_issue_date" value={data.ref_slip_issue_date} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Reference Slip Expiry Date</label>
                                                        <input type="date" required={manual == false} className="form-control" name="ref_slip_expiry_date" value={data.ref_slip_expiry_date} onChange={handleChange} />
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
                                                        <input type="text" required={manual} className="form-control" name="candidate_name" value={data.candidate_name} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Passport Number</label>
                                                        <input type="text" required={manual} className="form-control" name="passport_no" value={data.passport_no} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>PP Issue Date</label>
                                                        <input type="date" required={manual} className="form-control" name="passport_issue_date" value={data.passport_issue_date} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>PP Expiry Date</label>
                                                        <input type="date" required={manual} className="form-control" name="passport_expiry_date" value={data.passport_expiry_date} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>DOB</label>
                                                        <input type="date" required={manual} className="form-control" name="dob" value={data.dob} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Gender</label>
                                                        <select className="form-control" required={manual} name="gender" value={data.gender} onChange={handleChange}>
                                                            <option value="">Select Gender</option>
                                                            <option value="Male">Male</option>
                                                            <option value="Female">Female</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                {manualPP &&(
                                                <div className="col-4" id="passport_manual_image">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Passport Image</label>
                                                        <input type="file" className="form-control" required={manual} name="passport_image" onChange={(e) => setData('passport_image',e.target.files[0])} />
                                                    </div>
                                                </div>
                                                )}
                                            </div>
                                            <div className="row g-5 mb-3">
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Nationality</label>
                                                        <input type="text" className="form-control" required={manual} name="nationality" value={data.nationality} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>CNIC</label>
                                                        <input type="text" className="form-control" required={manual} name="cnic" value={data.cnic} onChange={handleChange} onBlur={handlePrev} />
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Place of Issue</label>
                                                        <Select
                                                            options={props.places}
                                                            value={data.place_of_issue}
                                                            required={manual}
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
                                                        <input type="date" required={manual} className="form-control" name="ref_slip_issue_date" value={data.ref_slip_issue_date} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Reference Slip Expiry Date</label>
                                                        <input type="date" required={manual} className="form-control" name="ref_slip_expiry_date" value={data.ref_slip_expiry_date} onChange={handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>)
                                        }
                                        {!manualPP && (
                                            <div className="card-body">
                                                <div className="row g-5 mb-3">
                                                    <img src={data.passport_image != null || data.passport_image != '' ? data.passport_image : '#'} />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {prevReg && (
                    <div className={'row row-cards'}>
                        <div className="col-md-6">
                            <div className="row row-cards">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <div className="col-md-12 flex align-items-center">
                                                <div className='col-md-6' style={{float: 'left'}}>
                                                    <h3>Previous Registration</h3>
                                                </div>
                                                <div className='col-md-6' style={{float: 'right'}}>
                                                    <h3 style={{textAlign: 'right'}}>{prevReg?.reg_date?.replaceAll('-','')+prevReg?.serial_no?.replaceAll('/','')}</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="row g-5 mb-3">
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Registration Date</label>
                                                        <input type="date" required className="form-control" name="reg_date" value={prevReg?.reg_date} disabled />
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Serial Number</label>
                                                        <input type="text" required className="form-control" name="serial_no" value={prevReg?.serial_no} disabled />
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Status</label>
                                                        <input type="text" required className="form-control" name="serial_no" value={prevReg?.status} disabled />
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
                                                    <h3 style={{textAlign: 'right'}}>{data.reg_date?.replaceAll('-','')+data.serial_no?.replaceAll('/','')}</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="row g-5 mb-3">
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Registration Date</label>
                                                        <input type="date" required className="form-control" name="reg_date" value={data.reg_date} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Serial Number</label>
                                                        <input type="text" required className="form-control" name="serial_no" value={data.serial_no} onChange={handleChange} />
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
                                                        <label className='form-label'>S/O or W/O or D/O</label>
                                                        <input type="text" className="form-control" name="relative_name" value={data.relative_name} onChange={handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row g-5 mb-3">
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Phone 1</label>
                                                        <input type="text" required className="form-control" name="phone_1" value={data.phone_1} onChange={handleChange} />
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
                                                    <div className={data.gender == 'Male' ? "row g-3 align-items-center d-none" : "row g-3 align-items-center"}>
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
                                                <div className="col-3">
                                                    <button className="btn btn-outline-success" disabled={currToken == 'None'} onClick={handleSubmit}>Submit Form</button>
                                                </div>
                                                {props?.auth?.modules?.[0]?.rights?.[0]?.permission_name == 'edit' && props?.auth?.modules?.[0]?.rights?.[0]?.status == true ?
                                                <div className="col-3">
                                                    <a className="btn btn-outline-info" type="button" href={route('registration-desk.show','edit')}>Edit Registration</a>
                                                </div>
                                                :
                                                <>{}</>
                                                }
                                                <div className="col-3">
                                                    <button className="btn btn-outline-purple" data-bs-toggle="modal" data-bs-target="#reg-report" disabled={prevBarcode == null} onClick={handlePrint}>Print Report</button>
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

            {/* Registration Report Modal */}
            <div className={`modal modal-blur fade`} id="reg-report" tabindex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Registration Slip</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                    <div className="modal-body">
                        <iframe src={report} style={{height: '300px', width: '100%'}}></iframe>
                    </div>
                    <div className="modal-footer">
                        <a href="#" className="btn btn-link link-secondary" data-bs-dismiss="modal">
                            Close
                        </a>
                    </div>
                    </div>
                </div>
            </div>
            {/* Registration Report Modal */}

        </AuthenticatedLayout>
    );
}
