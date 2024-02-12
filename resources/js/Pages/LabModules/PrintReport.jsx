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

export default function PrintReport({auth}) {

    const {data, setData, post, processing, errors, reset} = useForm({
        passport_no: '',
        passport_issue_date: '',
        passport_expiry_date: '',
        candidate_name: '',
        agency: '',
        country: '',
        profession: '',
        cnic: '',
        gender: '',
        dob: '',
        place_of_issue: '',
        reg_date: '',
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
        repeat: false

    });

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
    const [currToken, setToken] = useState('None');
    const [manual, setManual] = useState(false);

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
            // navigator.mediaDevices
            // .getUserMedia({ video: true })
            // .then(() => {

                ph.style.display = 'block';
                video.style.display = 'none';
            // })
            // .catch(() => {

            // });
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
                navigator.mediaDevices
                .getUserMedia({ video: true })
                .then((stream) => {
                    setStream(stream);
                    ph.style.display = 'none';
                    video.style.display = 'block';
                    video.srcObject = stream;

                })
                .catch((error) => {
                    console.error(error);
                });
            })
            .catch((error) => {
              console.error(error);
            });
        }

    }

    const handleToken = (e) => {
        e.preventDefault();


        reset();
        setCamera(false);
        setManual(false);
        setStream(false);
        setSImageSrc(null);
    }

    useEffect(() => {
    }, []);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Print Report</h2>}
        >
            <Head title="Registration Desk" />

            <div className="page-header d-print-none">
                <div className="container-xl">
                    <div className="row g-2 align-items-center">
                    <div className="col align-items-center">
                        <div className="col-md-3" style={{float: 'left'}}>
                            <h2 className="page-title" style={{float: 'left'}}>
                                Print Report
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
                                        <div className="card-body" id="manual_import">
                                            <div className="row g-5 mb-3">
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Date</label>
                                                        <input type="date" className="form-control" name="name" />
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Serial Number</label>
                                                        <input type="text" className="form-control" name="pp_issue_date" />
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Passport Number</label>
                                                        <input type="text" className="form-control" name="pp_issue_date" />
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
                                        <div className="card-body" id="manual_import">
                                            <div className="row g-5 mb-3">
                                                <div className="col-3">
                                                    <div className="row g-3 align-items-center">
                                                        <button className="btn btn-primary btn-md">Find Candidate</button>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row g-3">
                                                        <button className="btn btn-info btn-md">Find Candidate by Passport</button>
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div className="row g-3 align-items-center">
                                                        <button className="btn btn-success btn-md">Print Report</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row g-5 mb-3">
                                                <div className="col-3">
                                                    <div className="row g-3 align-items-center">
                                                        <button className="btn btn-secondary btn-md">History</button>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row g-3">
                                                        <button className="btn btn-outline-success btn-md">Embassy Slip</button>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div className="row g-5 mb-3">
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Place of Issue</label>
                                                        <select className="form-select">
                                                            <option>Select Place of Issue</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>PP Issue Date</label>
                                                        <input type="date" className="form-control" name="pp_issue_date" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row g-5">
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Reference Slip Issue Date</label>
                                                        <input type="date" className="form-control" name="ref_slip_issue_date" />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Reference Slip Expiry Date</label>
                                                        <input type="date" className="form-control" name="ref_slip_expiry_date" />
                                                    </div>
                                                </div>
                                            </div> */}
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
