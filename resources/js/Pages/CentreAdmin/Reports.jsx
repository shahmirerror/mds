import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {useState, useEffect} from 'react';
import Select from 'react-select';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import { IconDownload } from '@tabler/icons-react';

export default function Reports({auth}) {
    const [centres, setCentres] = useState([]);
    const [modules, setModules] = useState([]);
    const [countries, setCountries] = useState([]);
    const [resultData, setResultData] = useState([]);
    const [resultKeys, setResultKeys] = useState([]);

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
    const [centreID, setCentre] = useState(auth.centre.id);
    const [country, setCountry] = useState([]);

    const fetchModules = () => {

        try {
            const response = fetch(route("admin.reports.fetch_reports"), {
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

    const fetchCountries = () => {

        try {
            const response = fetch(route("admin.reports.fetch_countries"), {
                method: "GET"
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        // $('#preloader').hide();
                        setCountries(result.countries);
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

        setReportType(0);
        setCountry([]);

        setResultData([]);
        setResultKeys([]);
    }

    const handleGenerate = (e) => {
        e.preventDefault();

        if(datafreq == null)
        {
            reqError("Data Frequency");
        }
        else if(centreID == 0)
        {
            reqError("Centre");
        }
        else if(report_type == 0)
        {
            reqError("Report Type");
        }
        else
        {

            setGenerated(['generate']);
            // setReset(false);
        const requestData = {
            datafreq: datafreq,
            dailydate: dailydate,
            monthlydate: monthlydate,
            yearlydate: yearlydate,
            fromRange: fromRange,
            toRange: toRange,
            centreID: centreID,
            countries: country,
            report_type: report_type
        };

        const requestJson = JSON.stringify(requestData);

        try {
            const response = fetch(route("admin.reports.generate_report"), {
                method: "POST",
                body: requestJson,
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        // $('#preloader').hide();
                        setResultData(result.data);
                        setResultKeys(result.keys);
                        setGenerated(null);
                        if(result.data?.length > 0)
                        {
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
                        }
                        else
                        {
                            toast.error('No data could be find based on your query!', {
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
                        setGenerated(null);
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
            setGenerated(null);
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
    }

    const handleDataFreq = (e) => {
        setDataFreq(e.target.value);
    }

    const handleChange = (event) => {
        setCentre(event.target.value);
    };

    const reqError = (name) =>
    {
        toast.warning('Please select a '+name+' first!', {
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

    const handleExport = (e) => {
        e.preventDefault();

        const requestData = {
            datafreq: datafreq,
            dailydate: dailydate,
            monthlydate: monthlydate,
            yearlydate: yearlydate,
            fromRange: fromRange,
            toRange: toRange,
            centreID: centreID,
            countries: country,
            report_type: report_type,
            keys: resultKeys,
            data: resultData
        };

        const requestJson = JSON.stringify(requestData);

        try {
            const response = fetch(route("admin.reports.export_report",e.target.value), {
                method: "POST",
                body: requestJson,
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        // Remove the anchor from the body
                        document.body.removeChild(downloadLink);
                            toast.success('Report has been exported!', {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                                });

                                const downloadUrl = result.filename;

                                // Create a hidden anchor element to trigger the download
                                const downloadLink = document.createElement('a');
                                downloadLink.href = downloadUrl;
                                downloadLink.download = data.filename;

                                // Append the anchor to the body and simulate a click
                                document.body.appendChild(downloadLink);
                                downloadLink.click();
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
      fetchModules();
      fetchCountries();
    }, [])


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Reports</h2>}
        >
            <Head title="Reports" />
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
                            <div className="form-label">Report Type</div>
                            <Select
                                options={modules}
                                value={report_type}
                                name="report_type"
                                onChange={setReportType}
                            />
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
                            <Select
                                options={months}
                                value={monthlydate}
                                name="monthly_date"
                                onChange={setMonthlyDate}
                            />
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
                            <div className="form-label">Countries</div>
                            <Select
                                options={countries}
                                value={country}
                                name="country"
                                isMulti
                                onChange={setCountry}
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-3 row row-deck row-cards mb-3" style={{justifyContent: 'flex-end'}}>
                    <div className="col-sm-6 col-lg-3" style={{justifyContent: 'space-between'}}>

                        <div className="col-12" style={{display: 'inline-flex', justifyContent: 'space-between'}}>
                            <button type="submit" className="btn btn-primary" onClick={handleGenerate} disabled={generated === null ? false : true}>Generate Report</button>
                            <button type="submit" className="btn btn-secondary" disabled={centreID == 0 && report_type == 0 && datafreq == null ? true : false} onClick={resetSelection}>Reset Selection</button>
                        </div>
                    </div>

                </div>

                {resultData?.length > 0 ?
                    <div className="row row-deck row-cards">
                        <div class="card">
                            <div className="card-header" style={{display: 'inline-flex', justifyContent: "space-between"}}>
                                <h2 class="page-title">
                                    Query Result
                                </h2>
                                <div>
                                    <button className="btn btn-sm btn-success text-white mr-2" value="csv" onClick={handleExport}>Export CSV<IconDownload /></button>
                                    <button className="btn btn-sm btn-danger text-white ml-2" value="pdf" onClick={handleExport}>Export PDF<IconDownload /></button>
                                </div>
                            </div>
                            <div class="card-body border-bottom py-3">
                                <div class="d-flex">
                                    <div class="ms-auto text-secondary">
                                        Search:
                                        <div class="ms-2 d-inline-block">
                                        <input type="text" class="form-control form-control-sm" aria-label="Search" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div id="table-default" class="table-responsive">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            {resultKeys.map((keys, index) => (
                                                <th><button class="table-sort" data-sort="sort-name">{keys.name.replaceAll('_'," ")}</button></th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody class="table-tbody">
                                        {resultData.map((data, index) => (
                                        <tr>
                                            {resultKeys.map((keys, index) => (
                                                <td class="sort-name">{data[keys.name]}</td>
                                            ))}
                                        </tr>
                                        ))}
                                    </tbody>
                                </table>
                                </div>
                            </div>
                        </div>
                    </div>
                :
                    <></>
                }

            </div>
            </div>
        </AuthenticatedLayout>
    );
}
