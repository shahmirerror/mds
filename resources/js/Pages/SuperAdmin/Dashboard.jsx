import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Chart from 'react-apexcharts';
import {useState, useEffect} from 'react';
import Select from 'react-select'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
export default function Dashboard(props) {

    const [fit, setFit] = useState('Fetching...');
    const [unfit, setUnfit] = useState('Fetching...');
    const [fit_unfit_freq, setFitUnfitFreq] = useState(7);

    const [centre, setCentre] = useState(props.centres[0]);

    const [country_cases, setCountryCases] = useState(null);

    const [cancelled_cases, setCancelledCases] = useState('Fetching...');
    const [reports_issued, setReportsIssued] = useState('Fetching...');
    const [reports_in_hand, setReportsInHand] = useState('Fetching...');
    const [ll_update, setLLUpdate] = useState('Fetching...');

    const [country_cases_freq, setCountryCasesFreq] = useState(7);
    const [cancelled_cases_freq, setCancelledCasesFreq] = useState(7);
    const [reports_issued_freq, setReportsIssuedFreq] = useState(7);
    const [reports_in_hand_freq, setReportsInHandFreq] = useState(7);

    const handleCentre = (e) => {
        setCentre(e);
        handleGenerate(e.value);
    }

    const handleGenerate = (centreID) => {
        // e.preventDefault();

        setCountryCases(null);
        setCancelledCases('Fetching...');
        setReportsIssued('Fetching...');
        setReportsInHand('Fetching...');
        setLLUpdate('Fetching...');

        setCountryCasesFreq(7);
        setCancelledCasesFreq(7);
        setReportsIssuedFreq(7);
        setReportsInHandFreq(7);
        setFitUnfitFreq(7);

        try {
            const response = fetch(route("super.centre.stats", centreID), {
                method: "GET"
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        // $('#preloader').hide();
                        setCountryCases(result.country_cases);
                        setCancelledCases(result.cancelled_cases);
                        setReportsIssued(result.reports_issued);
                        setReportsInHand(result.reports_in_hand);
                        setLLUpdate(result.last_lab_update);
                        setFit(result.fit);
                        setUnfit(result.unfit);

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

    useEffect(() => {
        handleGenerate(centre.value);
    }, [])

    const handleGenerateSep = (e,type) => {
        // e.preventDefault();

        if(type == 'cancelled_cases')
        {
            setCancelledCasesFreq(e.target.value)
            setCancelledCases('Fetching...');
        }
        else if(type == 'country_cases')
        {
            setCountryCasesFreq(e.target.value)
            setCountryCases(null);
        }
        else if(type == 'reports_in_hand')
        {
            setReportsInHandFreq(e.target.value)
            setReportsInHand('Fetching...');
        }
        else if(type == 'reports_issued')
        {
            setReportsIssuedFreq(e.target.value)
            setReportsIssued('Fetching...');
        }
        else if(type == 'fit_unfit')
        {
            setFit('Fetching...');
            setUnfit('Fetching...');
            setFitUnfitFreq(e.target.value);
        }

        const requestData = {
            type: type,
            rate: e.target.value
        };

        const requestJson = JSON.stringify(requestData);

        try {
            const response = fetch(route("super.centre.stats_sep", centre.value), {
                method: "POST",
                body: requestJson
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        // $('#preloader').hide();
                        if(type == 'cancelled_cases')
                        {
                            setCancelledCases(result.result);
                        }
                        else if(type == 'country_cases')
                        {
                            setCountryCases(result.result);
                        }
                        else if(type == 'reports_in_hand')
                        {
                            setReportsInHand(result.result);
                        }
                        else if(type == 'reports_issued')
                        {
                            setReportsIssued(result.result);
                        }
                        else if(type == 'fit_unfit')
                        {
                            setFit(result.result1);
                            setUnfit(result.result2);
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


    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />
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
                            <div className="col">

                                <div className="page-pretitle">
                                Overview
                                </div>
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <h2 className="page-title">
                                    Dashboard
                                    </h2>
                                    <Select
                                        options={props.centres}
                                        value={centre}
                                        name="centre"
                                        className="w-25"
                                        onChange={handleCentre}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <div className="page-body">
            <div className="container-xl">
                <div className="row row-deck row-cards">
                <div className="col-12">
                    <div className="row row-cards">
                    <div className="col-sm-6 col-lg-3">
                        <div className="card card-sm">
                        <div className="card-body">
                            <div className="row align-items-center">
                            <div className="col">
                                <div className="font-weight-medium" style={{display: 'flex',justifyContent: 'space-between'}}>
                                    <span>Cancelled Cases</span>
                                    <div class="dropdown" style={{fontSize: '13px'}}>
                                        <select class="dropdown-toggle text-secondary" aria-haspopup="true" aria-expanded="false" value={cancelled_cases_freq} onChange={(e) => handleGenerateSep(e, 'cancelled_cases')}>
                                            <option class="dropdown-item" value={7}>Last 7 days</option>
                                            <option class="dropdown-item" value={30}>Last 30 days</option>
                                            <option class="dropdown-item" value={90}>Last 3 months</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="text-secondary">
                                {cancelled_cases}
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-lg-3">
                        <div className="card card-sm">
                        <div className="card-body">
                            <div className="row align-items-center">
                            <div className="col">
                                <div className="font-weight-medium" style={{display: 'flex',justifyContent: 'space-between'}}>
                                    <span>Reports Issued</span>
                                    <div class="dropdown" style={{fontSize: '13px'}}>
                                        <select class="dropdown-toggle text-secondary" aria-haspopup="true" aria-expanded="false" value={reports_issued_freq} onChange={(e) => handleGenerateSep(e, 'reports_issued')}>
                                            <option class="dropdown-item" value={7}>Last 7 days</option>
                                            <option class="dropdown-item" value={30}>Last 30 days</option>
                                            <option class="dropdown-item" value={90}>Last 3 months</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="text-secondary">
                                {reports_issued}
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-lg-3">
                        <div className="card card-sm">
                        <div className="card-body">
                            <div className="row align-items-center">
                            <div className="col">
                                <div className="font-weight-medium" style={{display: 'flex',justifyContent: 'space-between'}}>
                                    <span>Reports In-Hand</span>
                                    <div class="dropdown" style={{fontSize: '13px'}}>
                                        <select class="dropdown-toggle text-secondary" aria-haspopup="true" aria-expanded="false" value={reports_in_hand_freq} onChange={(e) => handleGenerateSep(e, 'reports_in_hand')}>
                                            <option class="dropdown-item" value={7}>Last 7 days</option>
                                            <option class="dropdown-item" value={30}>Last 30 days</option>
                                            <option class="dropdown-item" value={90}>Last 3 months</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="text-secondary">
                                {reports_in_hand}
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-lg-3">
                        <div className="card card-sm">
                        <div className="card-body">
                            <div className="row align-items-center">
                            <div className="col">
                                <div className="font-weight-medium">
                                Last Lab Result Updated At
                                </div>
                                <div className="text-secondary">
                                {ll_update}
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>

                <div className="col-lg-6">
                    <div className="row row-cards">
                    <div className="col-12">
                        <div className="card">
                        <div className="card-body">
                            <div style={{display: 'flex'}}>
                                <p className="mb-3" style={{marginRight: '5px'}}>Out of <strong>{fit == 'Fetching...'? 'Fetching...' : fit+unfit}</strong> cases </p>
                                <div class="dropdown" style={{fontSize: '13px'}}>
                                    <select class="dropdown-toggle text-secondary" aria-haspopup="true" aria-expanded="false" value={fit_unfit_freq} onChange={(e) => handleGenerateSep(e, 'fit_unfit')}>
                                        <option class="dropdown-item" value={7}>Last 7 days</option>
                                        <option class="dropdown-item" value={30}>Last 30 days</option>
                                        <option class="dropdown-item" value={90}>Last 3 months</option>
                                    </select>
                                </div>
                            </div>
                            <div className="progress progress-separated mb-3">
                                <div className="progress-bar bg-primary" role="progressbar" style={{width: `${fit/(fit+unfit)}%`}} aria-label="FIT"></div>
                                <div className="progress-bar bg-info" role="progressbar" style={{width: `${unfit/(fit+unfit)}%`}} aria-label="UNFIT"></div>
                            </div>
                            <div className="row">
                                <div className="col-auto d-flex align-items-center pe-2">
                                    <span className="legend me-2 bg-primary"></span>
                                    <span>FIT</span>
                                    <span className="d-none d-md-inline d-lg-none d-xxl-inline ms-2 text-secondary">{fit} cases</span>
                                </div>
                                <div className="col-auto d-flex align-items-center px-2">
                                    <span className="legend me-2 bg-info"></span>
                                    <span>UNFIT</span>
                                    <span className="d-none d-md-inline d-lg-none d-xxl-inline ms-2 text-secondary">{unfit} cases</span>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>


                <div className="col-md-6 col-lg-4">
                    <div className="card">
                    <div className="card-header" style={{justifyContent: 'space-between'}}>
                        <h3 className="card-title">Current Registered Cases</h3>
                        <div class="dropdown" style={{fontSize: '13px'}}>
                            <select class="dropdown-toggle text-secondary" aria-haspopup="true" aria-expanded="false" value={country_cases_freq} onChange={(e) => handleGenerateSep(e, 'country_cases')}>
                                <option class="dropdown-item" value={7}>Last 7 days</option>
                                <option class="dropdown-item" value={30}>Last 30 days</option>
                                <option class="dropdown-item" value={90}>Last 3 months</option>
                            </select>
                        </div>
                    </div>
                    <table className="table card-table table-vcenter">
                        {country_cases?.length != undefined ?
                        <thead>
                        <tr>
                            <th>Country</th>
                            <th colSpan="2">Cases</th>
                        </tr>
                        </thead>
                        :
                            <thead>
                            <tr>
                                <th colSpan="3">Fetching...</th>
                            </tr>
                            </thead>
                        }
                        <tbody>
                        {country_cases?.length > 0 ?
                            country_cases.map((cases, index) => (
                            <tr>
                                <td>{cases?.particulars}</td>
                                <td>{cases?.cases}</td>
                            </tr>
                            ))
                        :
                            <></>
                        }
                        </tbody>
                    </table>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </AuthenticatedLayout>
    );
}
