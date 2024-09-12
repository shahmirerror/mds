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

export default function MedicalExamination(props) {

    const [barcode, setBarcode] = useState(null);
    const [barcode2, setBarcode2] = useState(null);
    const todayDate = new Date();
    const [date, setRegDate] = useState(todayDate.getMonth()+1 >= 10 && todayDate.getDate() >= 10 ? todayDate.getFullYear()+"-"+(todayDate.getMonth()+1)+"-"+todayDate.getDate() : todayDate.getMonth()+1 >= 10 && todayDate.getDate() < 10 ? todayDate.getFullYear()+"-"+(todayDate.getMonth()+1)+"-0"+todayDate.getDate() : todayDate.getMonth()+1 < 10 && todayDate.getDate() >= 10 ? todayDate.getFullYear()+"-0"+(todayDate.getMonth()+1)+"-"+todayDate.getDate() : todayDate.getFullYear()+"-0"+(todayDate.getMonth()+1)+"-0"+todayDate.getDate());
    const [serial_no, setSerialNo] = useState(null);

    const [candidate, setCandidate] = useState(null);
    const [result, setResult] = useState(null);
    const [exist, setExist] = useState(false);

    const [fingerDamaged, setDamaged] = useState(false);

    const [searched, setSearched] = useState(false);
    const [secugen_lic, setSecugenLic] = useState('');

    const [currToken, setToken] = useState('None');

    const {data, setData, post, processing, errors, reset} = useForm({
        height: '',
        weight: '',
        bmi: '',
        bp: '120/80',
        pulse: '70',
        rr: '18',
        biometric_fingerprint: '',
        visual_aided_right_eye: '-',
        visual_aided_left_eye: '-',
        visual_unaided_right_eye: '-',
        visual_unaided_left_eye: '-',
        distant_aided_right_eye: '-',
        distant_aided_left_eye: '-',
        distant_unaided_right_eye: '6',
        distant_unaided_left_eye: '6',
        near_aided_right_eye: '-',
        near_aided_left_eye: '-',
        near_unaided_right_eye: '20',
        near_unaided_left_eye: '20',
        color_vision: '',
        hearing_right_ear: 'normal',
        hearing_left_ear: 'normal',
        appearance: 'NAD',
        speech: 'NAD',
        behavior: 'NAD',
        cognition: 'NAD',
        orientation: 'NAD',
        memory: 'NAD',
        concentration: 'NAD',
        mood: 'NAD',
        thoughts: 'NAD',
        other: 'NAD',
        general_appearance: 'NAD',
        cardiovascular: 'NAD',
        respiratory: 'NAD',
        abdomen: 'NAD',
        hernia: 'NAD',
        hydrocele: 'NAD',
        extremities: 'NAD',
        back: 'NAD',
        skin: 'NAD',
        cns: 'NAD',
        deformities: 'NAD',
        remarks: 'NAD',
        ent: 'NAD',
        mo_file: '',
        status: 'FIT',
        created_by: props?.auth?.user?.id
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
        setResult(null);

        const requestData = {
            centre_id: props.auth.user.centre.centre_id,
            serial_no: serial_no,
            reg_date: date,
            barcode: barcode,
            barcode2: barcode2,
            process_id: 2
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
                                    if(fingerDamaged || ((barcode2 == '' || barcode2 == null) && data.biometric_fingerprint == ''))
                                    {
                                        setCandidate(result.registration);
                                        setToken('M'+result.registration.token_no);
                                        setSearched(true);
                                        if(result.verified)
                                        {
                                            setResult(result.medical);
                                            handleEdit(result.medical);
                                            toast.warning('Candidate Medical Result Already Exists!', {
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
                                        matchScore(result.registration, result.medical, result.verified);
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

    const matchScore = (registration, medical, verified) => {

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
                            setCandidate(registration);
                            setToken('M'+registration.token_no);
                            if(verified)
                            {
                                setResult(medical);
                                handleEdit(medical);
                                toast.warning('Candidate Medical Result Already Exists!', {
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
        // if(handleFormRequired('store'))
        // {
            e.target.disabled = true;
            const requestData = {
                centre_id: props.auth.user.centre.centre_id,
                date: candidate?.reg_date,
                serial_no: candidate?.serial_no,
                data: data
            };

            const requestJson = JSON.stringify(requestData);

            try {
                const response = await toast.promise(fetch(route("lab.store_medical_result"), {
                    method: "POST",
                    body: requestJson,
                }),
                {
                    pending: 'Submitting Form'
                })
                    .then(res => res.json())
                    .then(
                        (result) => {

                            if(result.message == 'Medical Result has been saved!')
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

                                    handleReset();
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

                                    handleReset();
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
        // }
    };

    const handleUpdate = async (e) =>
    {
        // if(handleFormRequired('update'))
        // {
            e.target.disabled = true;
            const requestData = {
                centre_id: props.auth.user.centre.centre_id,
                date: candidate?.reg_date,
                serial_no: candidate?.serial_no,
                data: data
            };

            const requestJson = JSON.stringify(requestData);

            try {
                const response = await toast.promise(fetch(route("lab.update_medical_result"), {
                    method: "POST",
                    body: requestJson,
                }),
                {
                    pending: 'Submitting Form'
                })
                    .then(res => res.json())
                    .then(
                        (result) => {

                            if(result.message == 'Medical Result has been updated!')
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
        // }
    };

    const handleChange = (e) =>
    {
        setData(e.target.name, e.target.value);
        if((e.target.name == 'height' || e.target.name == 'weight') && (data.weight != '' && data.height != ''))
        {
            if(e.target.name == 'height')
            {
                data.height = e.target.value;
            }
            else if(e.target.name == 'weight')
            {
                data.weight = e.target.value;
            }
            setData('bmi', (data.weight/((data.height*data.height))*10000).toFixed(2));
        }
        console.log(e.target.name, e.target.value);
    }

    const handleReset = () =>
    {
        document.getElementById('fingerPrint').src = "./../assets/static/photos/ThumbPrint.png";
        setCandidate(null);
        setResult(null);
        setSearched(false);
        setBarcode('');
        setBarcode2('');
        setRegDate(todayDate.getMonth()+1 >= 10 && todayDate.getDate() >= 10 ? todayDate.getFullYear()+"-"+(todayDate.getMonth()+1)+"-"+todayDate.getDate() : todayDate.getMonth()+1 >= 10 && todayDate.getDate() < 10 ? todayDate.getFullYear()+"-"+(todayDate.getMonth()+1)+"-0"+todayDate.getDate() : todayDate.getMonth()+1 < 10 && todayDate.getDate() >= 10 ? todayDate.getFullYear()+"-0"+(todayDate.getMonth()+1)+"-"+todayDate.getDate() : todayDate.getFullYear()+"-0"+(todayDate.getMonth()+1)+"-0"+todayDate.getDate());
        setSerialNo('');
        data.biometric_fingerprint = '';
        setToken('None');

        data.height =  '';
        data.weight =  '';
        data.bmi =  '';
        data.bp =  '120/80';
        data.pulse =  '70';
        data.rr =  '18';
        data.distant_aided_right_eye =  '-';
        data.distant_aided_left_eye =  '-';
        data.distant_unaided_right_eye =  '6';
        data.distant_unaided_left_eye =  '6';
        data.near_aided_right_eye =  '-';
        data.near_aided_left_eye =  '-';
        data.near_unaided_right_eye =  '20';
        data.near_unaided_left_eye =  '20';
        data.color_vision =  '';
        data.hearing_right_ear =  'normal';
        data.hearing_left_ear =  'normal';
        data.appearance =  'NAD';
        data.speech =  'NAD';
        data.behavior =  'NAD';
        data.cognition =  'NAD';
        data.orientation =  'NAD';
        data.memory =  'NAD';
        data.concentration =  'NAD';
        data.mood =  'NAD';
        data.thoughts =  'NAD';
        data.other =  'NAD';
        data.general_appearance =  'NAD';
        data.cardiovascular =  'NAD';
        data.respiratory =  'NAD';
        data.abdomen =  'NAD';
        data.hernia =  'NAD';
        data.hydrocele =  'NAD';
        data.extremities =  'NAD';
        data.back =  'NAD';
        data.skin =  'NAD';
        data.cns =  'NAD';
        data.deformities =  'NAD';
        data.remarks =  'NAD';
        data.ent =  'NAD';
        data.mo_file = '';

    }

    const handleEdit = (medical) =>
    {
        data.height = medical?.height;
        data.weight = medical?.weight;
        data.bmi = medical?.bmi;
        data.bp = medical?.bp;
        data.pulse = medical?.pulse;
        data.rr = medical?.rr;
        data.visual_aided_right_eye = medical?.visual_aided_right_eye;
        data.visual_aided_left_eye = medical?.visual_aided_left_eye;
        data.visual_unaided_right_eye = medical?.visual_unaided_right_eye;
        data.visual_unaided_left_eye = medical?.visual_unaided_left_eye;
        data.distant_aided_right_eye = medical?.distant_aided_right_eye;
        data.distant_aided_left_eye = medical?.distant_aided_left_eye;
        data.distant_unaided_right_eye = medical?.distant_unaided_right_eye;
        data.distant_unaided_left_eye = medical?.distant_unaided_left_eye;
        data.near_aided_right_eye = medical?.near_aided_right_eye;
        data.near_aided_left_eye = medical?.near_aided_left_eye;
        data.near_unaided_right_eye = medical?.near_unaided_right_eye;
        data.near_unaided_left_eye = medical?.near_unaided_left_eye;
        data.color_vision = medical?.color_vision;
        data.hearing_right_ear = medical?.hearing_right_ear;
        data.hearing_left_ear = medical?.hearing_left_ear;
        data.appearance = medical?.appearance.toUpperCase();
        data.speech = medical?.speech.toUpperCase();
        data.behavior = medical?.behavior.toUpperCase();
        data.cognition = medical?.cognition.toUpperCase();
        data.orientation = medical?.orientation.toUpperCase();
        data.memory = medical?.memory.toUpperCase();
        data.concentration = medical?.concentration.toUpperCase();
        data.mood = medical?.mood.toUpperCase();
        data.thoughts = medical?.thoughts.toUpperCase();
        data.other = medical?.other.toUpperCase();
        data.general_appearance = medical?.general_appearance.toUpperCase();
        data.cardiovascular = medical?.cardiovascular.toUpperCase();
        data.respiratory = medical?.respiratory.toUpperCase();
        data.abdomen = medical?.abdomen.toUpperCase();
        data.hernia = medical?.hernia.toUpperCase();
        data.hydrocele = medical?.hydrocele.toUpperCase();
        data.extremities = medical?.extremities.toUpperCase();
        data.back = medical?.back.toUpperCase();
        data.skin = medical?.skin.toUpperCase();
        data.cns = medical?.cns.toUpperCase();
        data.deformities = medical?.deformities.toUpperCase();
        data.remarks = medical?.remarks.toUpperCase();
        data.ent = medical?.ent.toUpperCase();
        data.status = medical?.status;
    }

    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Medical Examination</h2>}
        >
            <Head title="Medical Examination" />
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
                                Medical Examination
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
                                                        {props?.auth?.modules?.[2]?.rights?.[1]?.permission_name == 'biometric_search' && props?.auth?.modules?.[2]?.rights?.[1]?.status == true ?
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
                                                    {props?.auth?.modules?.[2]?.rights?.[1]?.permission_name == 'biometric_search' && props?.auth?.modules?.[2]?.rights?.[1]?.status == true ?
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
                                                    <div className="row g-3 align-items-center justify-content-center">
                                                        <img id="fingerPrint" src={"./../assets/static/photos/ThumbPrint.png"} style={{width : 500}}/>
                                                        <div className="col-md-12 text-center">
                                                            {props?.auth?.modules?.[2]?.rights?.[1]?.permission_name == 'biometric_search' && props?.auth?.modules?.[2]?.rights?.[1]?.status == true ?
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
                                {candidate && (
                                <>
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <div className="col-md-12 flex align-items-center">
                                                <div className='col-md-6' style={{float: 'left'}}>
                                                    <h3>Medical Examination - General</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="row g-5 mb-3">
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Height</label>
                                                        <input type="text" className="form-control" name="height"  value={data.height} onChange={handleChange}/>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Weight</label>
                                                        <input type="text" className="form-control" name="weight"  value={data.weight} onChange={handleChange}/>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>BMI</label>
                                                        <input type="text" className="form-control" name="bmi"  value={data.bmi} onChange={handleChange}/>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row g-5 mb-3">
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>BP</label>
                                                        <input type="text" className="form-control" name="bp" value={data.bp} onChange={handleChange}/>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Pulse</label>
                                                        <input type="text" className="form-control" name="pulse" value={data.pulse} onChange={handleChange}/>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>RR</label>
                                                        <input type="text" className="form-control" name="rr" value={data.rr} onChange={handleChange}/>
                                                    </div>
                                                </div>
                                            </div>

                                            <hr></hr>
                                            <div className="row g-5 mb-3">
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Distant Eye Sight - Aided (R & L)</label>
                                                        <input type="text" className="form-control" name="distant_aided_right_eye" value={data.distant_aided_right_eye} onChange={handleChange}/>
                                                        <input type="text" className="form-control" name="distant_aided_left_eye" value={data.distant_aided_left_eye} onChange={handleChange}/>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Near Eye Sight - Aided (R & L)</label>
                                                        <input type="text" className="form-control" name="near_aided_right_eye" value={data.near_aided_right_eye} onChange={handleChange}/>
                                                        <input type="text" className="form-control" name="near_aided_left_eye" value={data.near_aided_left_eye} onChange={handleChange}/>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row g-5 mb-3">
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Distant Eye Sight - Unaided (R & L)</label>
                                                        <input type="text" className="form-control" name="distant_unaided_right_eye" value={data.distant_unaided_right_eye} onChange={handleChange}/>
                                                        <input type="text" className="form-control" name="distant_unaided_left_eye" value={data.distant_unaided_left_eye} onChange={handleChange}/>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Near Eye Sight - Unaided (R & L)</label>
                                                        <input type="text" className="form-control" name="near_unaided_right_eye" value={data.near_unaided_right_eye} onChange={handleChange}/>
                                                        <input type="text" className="form-control" name="near_unaided_left_eye" value={data.near_unaided_left_eye} onChange={handleChange}/>
                                                    </div>
                                                </div>
                                            </div>

                                            <hr></hr>
                                            <div className="row g-5 mb-3">
                                                <div className="col-7">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Color Vision</label>
                                                        <div>
                                                            <label class="form-check form-check-inline">
                                                                <input class="form-check-input" type="radio" name="color_vision" value="Normal" onChange={handleChange}/>
                                                                <span class="form-check-label">Normal</span>
                                                            </label>
                                                            <label class="form-check form-check-inline">
                                                                <input class="form-check-input" type="radio" name="color_vision" value="Doubtful" onChange={handleChange}/>
                                                                <span class="form-check-label">Doubtful</span>
                                                            </label>
                                                            <label class="form-check form-check-inline">
                                                                <input class="form-check-input" type="radio" name="color_vision" value="Defective" onChange={handleChange}/>
                                                                <span class="form-check-label">Defective</span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-5">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Hearing (R & L)</label>
                                                        <select className="form-select" name="hearing_right_ear" value={data.hearing_right_ear} onChange={handleChange}>
                                                            <option value="--">- SELECT -</option>
                                                            <option value="normal">Normal</option>
                                                            <option value="doubtful">Doubtful</option>
                                                            <option value="defective">Defective</option>
                                                        </select>
                                                        <select className="form-select" name="hearing_left_ear" value={data.hearing_left_ear} onChange={handleChange}>
                                                            <option value="--">- SELECT -</option>
                                                            <option value="normal">Normal</option>
                                                            <option value="doubtful">Doubtful</option>
                                                            <option value="defective">Defective</option>
                                                        </select>
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
                        <div className="col-md-8">
                            <div className="row row-cards">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <div className="col-md-12 flex align-items-center">
                                                <div className='col-md-6' style={{float: 'left'}}>
                                                    <h3>Registration Information</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="row g-5 mb-3">
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Barcode</label>
                                                        {props?.auth?.modules?.[2]?.rights?.[2]?.permission_name == 'barcode_search' && props?.auth?.modules?.[2]?.rights?.[2]?.status == true ?
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
                                                        {props?.auth?.modules?.[2]?.rights?.[3]?.permission_name == 'date_search' && props?.auth?.modules?.[2]?.rights?.[3]?.status == true ?
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
                                                        {props?.auth?.modules?.[2]?.rights?.[3]?.permission_name == 'date_search' && props?.auth?.modules?.[2]?.rights?.[3]?.status == true ?
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
                                                    <button className={'btn btn-md btn-outline-info'} disabled={searched} onClick={handleSearch}>Search for Candidate</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {candidate && (
                                <>
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

                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <div className="col-md-12 flex align-items-center">
                                                <div className='col-md-6' style={{float: 'left'}}>
                                                    <h3>Medical Examination - Mental Status</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="row g-5 mb-3">
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Appearance</label>
                                                        <input type="text" className="form-control" name="appearance" value={data.appearance} onChange={handleChange}/>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Speech</label>
                                                        <input type="text" className="form-control" name="speech" value={data.speech} onChange={handleChange}/>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Behavior</label>
                                                        <input type="text" className="form-control" name="behavior" value={data.behavior} onChange={handleChange}/>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row g-5 mb-3">
                                                <div className="col-3">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Cognition</label>
                                                        <input type="text" className="form-control" name="cognition" value={data.cognition} onChange={handleChange}/>
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Orientation</label>
                                                        <input type="text" className="form-control" name="orientation" value={data.orientation} onChange={handleChange}/>
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Memory</label>
                                                        <input type="text" className="form-control" name="memory" value={data.memory} onChange={handleChange}/>
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Concentration</label>
                                                        <input type="text" className="form-control" name="concentration" value={data.concentration} onChange={handleChange}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr></hr>
                                            <div className="row g-5 mb-3">
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Mood</label>
                                                        <input type="text" className="form-control" name="mood" value={data.mood} onChange={handleChange}/>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Thoughts</label>
                                                        <input type="text" className="form-control" name="thoughts" value={data.thoughts} onChange={handleChange}/>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Others</label>
                                                        <input type="text" className="form-control" name="others" value={data.others} onChange={handleChange}/>
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
                                                <div className='col-md-6' style={{float: 'left'}}>
                                                    <h3>Medical Examination - SYSTEMIC</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="row g-5 mb-3">
                                                <div className="col-3">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>General Appearance</label>
                                                        <input type="text" className="form-control" name="general_appearance" value={data.general_appearance} onChange={handleChange}/>
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Cardiovascular</label>
                                                        <input type="text" className="form-control" name="cardiovascular" value={data.cardiovascular} onChange={handleChange}/>
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Respiratory</label>
                                                        <input type="text" className="form-control" name="respiratory" value={data.respiratory} onChange={handleChange}/>
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>ENT</label>
                                                        <input type="text" className="form-control" name="ent" value={data.ent} onChange={handleChange}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr></hr>
                                            <div className="row g-5 mb-3">
                                                <div className="col-3">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Abdomen</label>
                                                        <input type="text" className="form-control" name="abdomen" value={data.abdomen} onChange={handleChange}/>
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Hernia</label>
                                                        <input type="text" className="form-control" name="hernia" value={data.hernia} onChange={handleChange}/>
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Hydrocele</label>
                                                        <input type="text" className="form-control" name="hydrocele" value={data.hydrocele} onChange={handleChange}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr></hr>
                                            <div className="row g-5 mb-3">
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Extremities</label>
                                                        <input type="text" className="form-control" name="extremities" value={data.extremities} onChange={handleChange}/>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Back</label>
                                                        <input type="text" className="form-control" name="back" value={data.back} onChange={handleChange}/>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Skin</label>
                                                        <input type="text" className="form-control" name="skin" value={data.skin} onChange={handleChange}/>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>C.N.S</label>
                                                        <input type="text" className="form-control" name="cns" value={data.cns} onChange={handleChange}/>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Deformities</label>
                                                        <input type="text" className="form-control" name="deformities" value={data.deformities} onChange={handleChange}/>
                                                    </div>
                                                </div>
                                                {/* <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Status</label>
                                                        <select className="form-select" name="status" value={data.status} onChange={handleChange}>
                                                            <option value="FIT">FIT</option>
                                                            <option value="UNFIT">UNFIT</option>
                                                            <option value="In Process">In Process</option>
                                                        </select>
                                                    </div>
                                                </div> */}
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Remarks</label>
                                                        <textarea name={'remarks'} onChange={handleChange} className='form-control'>{data.remarks}</textarea>
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
                                                        {result == null ?
                                                        <button className="btn btn-success btn-md w-50" disabled={candidate == null} onClick={handleSubmit}>Save & Upload Exam</button>
                                                        :result != null && props?.auth?.modules?.[2]?.rights?.[4]?.permission_name == 'upload_&_edit' && props?.auth?.modules?.[2]?.rights?.[4]?.status == true ?
                                                            <button className="btn btn-success btn-md w-50" onClick={handleUpdate}>Update & Upload Exam</button>
                                                        :
                                                        <button className="btn btn-success btn-md w-50" onClick={''}>
                                                            <IconLock stroke={1} />
                                                            Update & Upload Exam
                                                        </button>
                                                        }
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
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
