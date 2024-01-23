import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {useState, useEffect} from 'react';

import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function Reports({ auth }) {
    const [centres, setCentres] = useState([]);
    const [modules, setModules] = useState([]);

    const months = [
                    {value: 1,label: 'January'},
                    {value:2,label:'February'},
                    {value:3,label:'March'},
                    {value:4, label:'April'},
                    {value:5, label: 'May'},
                    {value:6, label:'June'},
                    {value:7, label:'July'},
                    {value:8, label:'August'},
                    {value:9, label:'September'},
                    {value:10, label:'October'},
                    {value:11, label:'November'},
                    {value:12, label:'December'}
                ];

    const [generated, setGenerated] = useState(null);
    const [reset, setReset] = useState(true);

    const [datafreq, setDataFreq] = useState(null);

    const todayDate = new Date();
    let lastDate;
    if(todayDate.getMonth()+1 >= 10)
    {
        lastDate = (todayDate.getFullYear()-1)+"-"+(todayDate.getMonth()+1)+"-"+todayDate.getDate();
    }
    else
    {
        lastDate = (todayDate.getFullYear()-1)+"-0"+(todayDate.getMonth()+1)+"-"+todayDate.getDate();
    }
    const lMDate = new Date(lastDate);

    const [dailydate, setDailyDate] = useState(todayDate.getFullYear()+"-"+todayDate.getMonth()+1+"-"+todayDate.getDate());
    const [yearlydate, setYearlyDate] = useState(todayDate.getFullYear());
    const [monthlydate, setMonthlyDate] = useState(todayDate.getMonth()+1);

    const [toRange, setToRange] = useState(todayDate.getFullYear()+"-"+todayDate.getMonth()+1+"-"+todayDate.getDate());
    const [fromRange, setFromRange] = useState(lMDate.getFullYear()+"-"+lMDate.getMonth()+1+"-"+lMDate.getDate());

    const [report_type, setReportType] = useState(null);
    const [centreID, setCentre] = useState(0);

    const fetchCentres = () => {

        try {
            const response = fetch(route("super.reports.fetch_centres"), {
                method: "GET"
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        // $('#preloader').hide();
                        setCentres(result.centres);
                        // console.log(result);
                    },
                    (error) => {
                        console.log(error)
                    }
                );
        } catch (ex) {
            console.error(ex);
        }
    }

    const fetchModules = () => {

        try {
            const response = fetch(route("super.reports.fetch_reports"), {
                method: "GET"
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        // $('#preloader').hide();
                        setModules(result.modules);
                        // console.log(result);
                    },
                    (error) => {
                        console.log(error)
                    }
                );
        } catch (ex) {
            console.error(ex);
        }
    }

    const resetSelection = (e) => {
        e.preventDefault();

        setReset(true);
        setGenerated(null);
        setDataFreq(null);

        setDailyDate(todayDate.getFullYear()+"-"+todayDate.getMonth()+1+"-"+todayDate.getDate());
        setYearlyDate(todayDate.getFullYear());
        setMonthlyDate(todayDate.getMonth()+1);

        setToRange(todayDate.getFullYear()+"-"+todayDate.getMonth()+1+"-"+todayDate.getDate());
        setFromRange(lMDate.getFullYear()+"-"+lMDate.getMonth()+1+"-"+lMDate.getDate());

        setCentre(0);
        setReportType(0);
    }

    const handleGenerate = (e) => {
        e.preventDefault();

        setGenerated(['generate']);
        setReset(false);
    }

    const handleDataFreq = (e) => {
        setDataFreq(e.target.value);
    }

    useEffect(() => {
      fetchModules();
      fetchCentres();


    }, [])


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Reports</h2>}
        >
            <Head title="Reports" />
            <div className="page-header d-print-none">
                    <div className="container-xl">
                        <div className="row g-2 align-items-center">
                            <div className="col">
                                <h2 className="page-title">
                                Reports
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            <div className="page-body">
            <div className="container-xl">
                <div className="row row-deck row-cards">

                    <div className="col-sm-6 col-lg-3">
                        <div style={{width: '100%'}}>
                            <div className="form-label">Select Centre</div>
                            <select className="form-select" value={centreID} onChange={(e) => setCentre(e.target.value)}>
                                <option value="0">All Centres</option>
                                {centres.map((centre, index) => (
                                    <option value={centre?.id}>{centre?.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="col-sm-6 col-lg-3">
                        <div>
                            <div className="form-label">Data Frequency</div>
                            <div>
                                <label className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="data_freq" value="Daily" checked={datafreq == 'Daily' ? true : false} onChange={handleDataFreq}/>
                                    <span className="form-check-label">Daily</span>
                                </label>
                                <label className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="data_freq" value="Yearly" checked={datafreq == 'Yearly' ? true : false} onChange={handleDataFreq}/>
                                    <span className="form-check-label">Yearly</span>
                                </label>
                                <label className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="data_freq" value="Monthly" checked={datafreq == 'Monthly' ? true : false} onChange={handleDataFreq}/>
                                    <span className="form-check-label">Monthly</span>
                                </label>
                                <label className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="data_freq" value="Custom Date Range" checked={datafreq == 'Custom Date Range' ? true : false}  onChange={handleDataFreq}/>
                                    <span className="form-check-label">Custom Date Range</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    {datafreq == 'Daily' ?
                    <div className="col-sm-6 col-lg-3">
                        <div>
                            <div className="form-label">Choose Date</div>
                            <input className="form-control" type="date" name="daily_date" value={dailydate} onChange={(e) => setDailyDate(e.target.value)}/>
                        </div>
                    </div>
                    : datafreq == 'Monthly' ?
                    <div className="col-sm-6 col-lg-3">
                        <div>
                            <div className="form-label">Choose Month(s)</div>
                            <select className="form-select form-control" id="monthly_date" value={monthlydate} onChange={(e) => setMonthlyDate(e.target.value)}>
                                <option value="0">--</option>
                                {months.map((month, index) => (
                                    <option value={month?.value}>{month?.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    : datafreq == 'Yearly' ?
                    <div className="col-sm-6 col-lg-3">
                        <div>
                            <div className="form-label">Choose Year</div>
                            <input className="form-control" type="text" name="yearly_date" placeholder="Enter Year e.g. 2024" value={yearlydate} onChange={(e) => setYearlyDate(e.target.value)}/>
                        </div>
                    </div>
                    : datafreq == 'Custom Date Range' ?
                    <div className="col-sm-6 col-lg-3" style={{justifyContent: 'space-between'}}>
                        <div>
                            <div className="form-label">From</div>
                            <input className="form-control form-date-picker" type="date" name="from_date_range" value={fromRange} onChange={(e) => setFromRange(e.target.value)}/>
                        </div>
                        <div>
                            <div className="form-label">To</div>
                            <input className="form-control" type="date" name="to_date_range" value={toRange} onChange={(e) => setToRange(e.target.value)}/>
                        </div>
                    </div>
                    :
                    <></>
                    }
                </div>
                <div className="row row-deck row-cards">


                    <div className="col-sm-6 col-lg-3">
                        <div style={{width: '100%'}}>
                            <div className="form-label">Report Type</div>
                            <select className="form-select" value={report_type} onChange={(e) => setReportType(e.target.value)}>
                                <option value="0">Select Report</option>
                                {modules.map((mod, index) => (
                                    <option value={mod?.id}>{mod?.title}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="col-sm-6 col-lg-3">
                        <div style={{width: '100%'}}>
                            <div className="form-label">Countries</div>
                            <select className="form-select form-control">
                                <option value="0">Select Countries</option>
                                {modules.map((mod, index) => (
                                    <option value={mod?.id}>{mod?.title}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="mt-3 row row-deck row-cards" style={{justifyContent: 'flex-end'}}>
                    <div className="col-sm-6 col-lg-3" style={{justifyContent: 'space-between'}}>

                        <div className="col-12" style={{display: 'inline-flex', justifyContent: 'space-between'}}>
                            <button type="submit" className="btn btn-primary" onClick={handleGenerate} disabled={generated === null ? false : true}>Generate Report</button>
                            <button type="submit" className="btn btn-secondary" disabled={reset} onClick={resetSelection}>Reset Selection</button>
                        </div>
                    </div>

                </div>
            </div>
            </div>
        </AuthenticatedLayout>
    );
}
