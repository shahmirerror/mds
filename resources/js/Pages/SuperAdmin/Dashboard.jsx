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
    const [centre, setCentre] = useState(props.centres[0]);

    const [country_cases, setCountryCases] = useState(null);

    const [cancelled_cases, setCancelledCases] = useState('Fetching...');
    const [reports_issued, setReportsIssued] = useState('Fetching...');
    const [reports_in_hand, setReportsInHand] = useState('Fetching...');
    const [ll_update, setLLUpdate] = useState('Fetching...');

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
                            <div className="col-auto">
                                <span className="bg-danger text-white avatar">
                                </span>
                            </div>
                            <div className="col">
                                <div className="font-weight-medium">
                                Cancelled Cases <span className="badge bg-info text-white" style={{fontSize: '10px'}}>Today</span>
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
                            <div className="col-auto">
                                <span className="bg-twitter text-white avatar">
                                </span>
                            </div>
                            <div className="col">
                                <div className="font-weight-medium">
                                Reports Issued <span className="badge bg-info text-white" style={{fontSize: '10px'}}>Current Month</span>
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
                            <div className="col-auto">
                                <span className="bg-success text-white avatar">
                                </span>
                            </div>
                            <div className="col">
                                <div className="font-weight-medium">
                                Reports In-Hand <span className="badge bg-info text-white" style={{fontSize: '10px'}}>Current Month</span>
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
                            <div className="col-auto">
                                <span className="bg-black text-white avatar">

                                </span>
                            </div>
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
                            <p className="mb-3">Out of <strong>{fit == 'Fetching...'? 'Fetching...' : fit+unfit}</strong> cases this month</p>
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
                    <div className="card-header">
                        <h3 className="card-title">Current Registered Cases</h3>
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
                                <td>{cases?.country}</td>
                                <td>{cases?.cases}</td>
                                <td className="w-50">
                                <div className="progress progress-xs">
                                    <div className="progress-bar bg-primary" style={{width: "71.0%"}}></div>
                                </div>
                                </td>
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
