import { useEffect, useState, useRef } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { IconCrosshair, IconClipboardText  } from '@tabler/icons-react';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function Feedback(props) {

    const [isHovered1, setIsHovered1] = useState(false);
    const [isHovered2, setIsHovered2] = useState(false);
    const [isHovered3, setIsHovered3] = useState(false);

    const inputRef = useRef(null);

    const divStyle1 = {
        display: 'inline-grid',
        justifyContent: 'center',
        transition: 'transform 0.3s ease',
        transform: isHovered1 ? 'scale(1.2)' : 'scale(1)',
        border: 0,
        fontFamily: 'Open Sans, sans-serif'
    };

    const divStyle2 = {
        display: 'inline-grid',
        justifyContent: 'center',
        transition: 'transform 0.3s ease',
        transform: isHovered2 ? 'scale(1.2)' : 'scale(1)',
        border: 0,
        fontFamily: 'Open Sans, sans-serif'
    };

    const divStyle3 = {
        display: 'inline-grid',
        justifyContent: 'center',
        transition: 'transform 0.3s ease',
        transform: isHovered3 ? 'scale(1.2)' : 'scale(1)',
        border: 0,
        fontFamily: 'Open Sans, sans-serif'
    };

    const [centre, setCentre] = useState(props.auth?.user?.centre?.details || null);
    const [status, setStatus] = useState(null);
    const [barcode, setBarcode] = useState(null);
    const [comments, setComments] = useState('');

    const [newToken, setToken] = useState(null);

    const handleChange = (e) => {

        setStatus(e.target.name ? e.target.name : e.target.value);

        if(e.target.name == 'Excellent' || e.target.value == 'Excellent')
        {
            setIsHovered1(true);
            setIsHovered2(false);
            setIsHovered3(false);
        }
        else if(e.target.name == 'Satisfied' || e.target.value == 'Satisfied')
        {
            setIsHovered1(false);
            setIsHovered2(true);
            setIsHovered3(false);
        }
        else if(e.target.name == 'Not Satisfied' || e.target.value == 'Not Satisfied')
        {
            setIsHovered1(false);
            setIsHovered2(false);
            setIsHovered3(true);
        }
    }

    const submitFeedback = async (e) => {

        const requestData = {
            centre_id: centre.id,
            barcode: barcode,
            status: status,
            comments: comments
        };

        const requestJson = JSON.stringify(requestData);

        try {
            const response = await toast.promise(fetch(route("feedback.new"), {
                method: "POST",
                body: requestJson,
            }),
            {
                pending: 'Submitting Feedback...'
            })
                .then(res => res.json())
                .then(
                    (result) => {

                            toast.success('Thank you for submitting your feedback!', {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                                });

                                setBarcode('');
                                setStatus('');
                                setComments("");

                                inputRef.current.focus();
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

    return (
        <GuestLayout>
            <Head title="Feedback" />
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
            <div className="page page-center" style={{background: "rgb(73, 100, 166)"}}>
                <div className="p-6">

                    {centre == null ?
                    <>
                        <div className="row g-4" id={'project_logo'}>
                            <div className="col-lg">
                                <div style={{maxWidth: "15rem"}}>
                                    <div className="text-center mb-4">
                                    <div className="card card-sm">
                                        <div className="card-body">
                                        <a href="." className="navbar-brand navbar-brand-autodark">
                                            <img src="./assets/static/logomls.svg" height="50" alt="" /></a>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row align-items-center g-4 mt-7" id={'choose_centres'}>
                            {props.centres.map((centre, index) => (
                                <div className="col-md-3" onClick={() => setCentre(centre)}>
                                    <div className="card card-sm">
                                        <div className="card-body" style={{justifyContent: 'center', display: 'flex'}}>
                                            {centre?.image !== null ?
                                                <img src={`./storage/app/public/centres/logos/${centre?.image}`}  height="100"/>
                                            :
                                                <h1 className="text-center">{centre?.name}</h1>
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                    :
                        <></>
                    }

                    {centre !== null ?
                    <>
                        <div className="row g-4" id={'centre_logo'}>
                            <div className="col-lg">
                                <div style={{maxWidth: "15rem"}}>
                                    <div className="text-center mb-4">
                                    <div className="card card-sm">
                                        <div className="card-body">
                                            <a href="#" className="navbar-brand navbar-brand-autodark">
                                                <img src={`./storage/app/public/centres/logos/${centre?.image}`} height="50" alt="" />
                                            </a>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row align-items-center g-4 mt-5" id={'choose_token'}>
                            <div className="col-md-12 text-center">
                                <div className={'card'}>
                                    <div className={'card-body'}>
                                        <div className='row'>
                                            <div className='col-md-12'>
                                                <h1>Customer Feedback</h1>
                                            </div>
                                        </div>
                                        <div className='row g-3' style={{alignItems: 'center'}}>
                                            <div className='col-md-2'>
                                                <label className='form-label' style={{textAlign: 'left'}}>Barcode Number</label>
                                                <input type="password" className='form-control' value={barcode} autoFocus ref={inputRef} onChange={(e) => setBarcode(e.target.value)} maxLength={6}/>
                                            </div>
                                            <div className='col-md-8'>
                                                <span style={{fontSize: '20px', fontFamily: 'Open Sans, sans-serif'}}>How satisfied are you with our customer support performance?</span>
                                            </div>
                                        </div>
                                        <div className='row mt-3 '>
                                            <div className='col-md-12'>
                                                <button type="button" className='btn btn-md m-5 mt-0 mb-0 ml-0' value="Excellent" onClick={handleChange} style={divStyle1} onMouseEnter={() => setIsHovered1(true)} onMouseLeave={() => setIsHovered1(status != 'Excellent' ? false : true)}>
                                                    <img src={`./storage/app/public/feedback_emojis/excellent.jpg`} height="80" alt="" name="Excellent"/>
                                                    <span className={'mt-3'}>Excellent</span>
                                                </button>

                                                <button type="button" className='btn btn-md m-5 mt-0 mb-0 ml-0' onClick={handleChange} value="Satisfied" style={divStyle2} onMouseEnter={() => setIsHovered2(true)} onMouseLeave={() => setIsHovered2(status != 'Satisfied' ? false : true)}>
                                                    <img src={`./storage/app/public/feedback_emojis/satisfied.jpg`} height="80" alt="" name="Satisfied"/>
                                                    <span className={'mt-3'}>Satisfied</span>
                                                </button>

                                                <button type="button" className='btn btn-md m-5 mt-0 mb-0 ml-0' onClick={handleChange} value="Not Satisfied" style={divStyle3} onMouseEnter={() => setIsHovered3(true)} onMouseLeave={() => setIsHovered3(status != 'Not Satisfied' ? false : true)}>
                                                    <img src={`./storage/app/public/feedback_emojis/not-satisfied.jpg`} height="80" alt="" name="Not Satisfied" />
                                                    <span className={'mt-3'}>Not Satisfied</span>
                                                </button>
                                            </div>
                                        </div>
                                        <div className='row mt-5 mb-5'>
                                            <div className='col-md-12'>
                                                {status == 'Excellent' ?
                                                    <span className='' style={{fontSize: '25px'}}>Thank you! We are glad to be of service.</span>
                                                :status == 'Satisfied' ?
                                                    <span className='' style={{fontSize: '25px'}}>We apologies for anything that may have upset you.</span>
                                                :status == 'Not Satisfied' ?
                                                    <span className='' style={{fontSize: '25px'}}>We apologies for anything that may have upset you.</span>
                                                :
                                                <></>
                                                }
                                            </div>
                                        </div>
                                        <div className='row mt-3'>
                                            <div className='col-md-8'>
                                                <label className='form-label' style={{textAlign: 'left'}}>Comments (if any)</label>
                                                <textarea className='form-control' onChange={(e) => setComments(e.target.value)}>{comments}</textarea>
                                            </div>
                                            <div className='col-md-4 mt-5'>
                                                <button type="button" className='btn btn-success' disabled={barcode?.length < 6 || barcode == null || barcode == '' || status == null} onClick={submitFeedback}>Post Feedback</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                    :
                        <></>
                    }
                </div>
            </div>
        </GuestLayout>
    );
}
