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

export default function PassportVerification({auth}) {

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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">PassportVerification</h2>}
        >
            <Head title="Passport Verification" />

            <div className="page-header d-print-none">
                <div className="container-xl">
                    <div className="row g-2 align-items-center">
                    <div className="col align-items-center">
                        <div className="col-md-3" style={{float: 'left'}}>
                            <h2 className="page-title" style={{float: 'left'}}>
                                Passport Verification
                            </h2>
                            <h3 className="badge bg-success text-white" style={{float: 'right'}}>Counter 1</h3>
                        </div>
                        <div className="col-md-3 align-items-center" style={{float: 'right'}}>
                            <h2 className="page-title">
                                <button className="btn btn-secondary btn-sm mr-5 btn-pill" onClick={handleToken}>
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
                        <div className="col-md-3">
                            <div className="row row-cards">
                                <div className="col-12">
                                    <div className="card">
                                    <div className="card-header">
                                        <h3>Biometric Area</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="row g-3">
                                            <div className="col-12">
                                                <div className="row g-3 align-items-center">
                                                    <img src={"./../assets/static/photos/ThumbPrint.png"} style={{width : 500}}/>
                                                    <div className="col-md-12 text-center">
                                                        <button className="btn btn-purple btn-md w-50">Scan fingerprint</button>
                                                    </div>
                                                </div>
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
                                            <div className="col-md-12 flex align-items-center">
                                                <div className='col-md-6' style={{float: 'left'}}>
                                                    <h3>Passport Information</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body" id="auto_import">
                                            <div className="row g-5 mb-3">
                                                <div className="col-12">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Barcode</label>
                                                        <input type="password" className="form-control" name="barcode"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row g-5 mb-3">
                                                <div className="col-12">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Registeration Date</label>
                                                        <input type="date" className="form-control" name="reg_date" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row g-5">
                                                <div className="col-12">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Serial Number</label>
                                                        <input type="text" className="form-control" name="serial_number" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row g-3 mt-3">
                                            <div className="col-12">
                                                <div className="row g-3 align-items-center">
                                                    <div className="col-md-12 text-center">
                                                        <button className="btn btn-info btn-md w-50">Fetch Candidate</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5">
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
                                                        <select className="form-select">
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
                                                        <input type="text" className="form-control" name="relative_name" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row g-5 mb-3">
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Phone 1</label>
                                                        <input type="text" className="form-control" name="phone_1" />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Phone 2</label>
                                                        <input type="text" className="form-control" name="phone_2" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row g-5">
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Marital Status</label>
                                                        <select className="form-select" name="marital_status">
                                                            <option value="">Select Marital Status</option>
                                                            <option value="Single">Single</option>
                                                            <option value="Married">Married</option>
                                                            <option value="Divorced">Divorced</option>
                                                            <option value="Widowed">Widowed</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row g-3 align-items-center">
                                                        <label className='form-label'>Remarks</label>
                                                        <textarea className="form-control"></textarea>
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
