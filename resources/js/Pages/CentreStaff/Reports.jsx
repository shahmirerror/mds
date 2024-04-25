import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {useState, useEffect} from 'react';
import Select from 'react-select';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Chart from "react-apexcharts";

import { IconDownload } from '@tabler/icons-react';

export default function Reports({auth}) {
    const [centres, setCentres] = useState([]);
    const [modules, setModules] = useState([]);
    const [countries, setCountries] = useState([]);
    const [resultData, setResultData] = useState([]);
    const [resultDataFiltered, setResultDataFiltered] = useState([]);
    const [resultKeys, setResultKeys] = useState([]);
    const [case_status, setCaseStatus] = useState([]);
    const [query, setQuery] = useState([]);

    const [feedback_chart, setFeedbackChart] = useState(null);

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
    const [portion, setPortion] = useState('A-B');
    const [inclusion, setInclusion] = useState('Yes');
    const [code_type, setCodeType] = useState('serial');

    const todayDate = new Date();
    let lastDate = todayDate.getMonth()+1 >= 10 && todayDate.getDate() >= 10 ? (todayDate.getFullYear()-1)+"-"+(todayDate.getMonth()+1)+"-"+todayDate.getDate() : todayDate.getMonth()+1 >= 10 && todayDate.getDate() < 10 ? (todayDate.getFullYear()-1)+"-"+(todayDate.getMonth()+1)+"-0"+todayDate.getDate() : todayDate.getMonth()+1 < 10 && todayDate.getDate() >= 10 ? (todayDate.getFullYear()-1)+"-0"+(todayDate.getMonth()+1)+"-"+todayDate.getDate() : (todayDate.getFullYear()-1)+"-0"+(todayDate.getMonth()+1)+"-0"+todayDate.getDate();
    const lMDate = new Date(lastDate);

    const [dailydate, setDailyDate] = useState(todayDate.getMonth()+1 >= 10 && todayDate.getDate() >= 10 ? todayDate.getFullYear()+"-"+(todayDate.getMonth()+1)+"-"+todayDate.getDate() : todayDate.getMonth()+1 >= 10 && todayDate.getDate() < 10 ? todayDate.getFullYear()+"-"+(todayDate.getMonth()+1)+"-0"+todayDate.getDate() : todayDate.getMonth()+1 < 10 && todayDate.getDate() >= 10 ? todayDate.getFullYear()+"-0"+(todayDate.getMonth()+1)+"-"+todayDate.getDate() : todayDate.getFullYear()+"-0"+(todayDate.getMonth()+1)+"-0"+todayDate.getDate());
    const [yearlydate, setYearlyDate] = useState(todayDate.getFullYear());
    const [monthlydate, setMonthlyDate] = useState({value:(todayDate.getMonth()+1), label: todayDate.toLocaleString('default', { month: 'long' })});

    const [toRange, setToRange] = useState(todayDate.getMonth()+1 >= 10 && todayDate.getDate() >= 10 ? todayDate.getFullYear()+"-"+(todayDate.getMonth()+1)+"-"+todayDate.getDate() : todayDate.getMonth()+1 >= 10 && todayDate.getDate() < 10 ? todayDate.getFullYear()+"-"+(todayDate.getMonth()+1)+"-0"+todayDate.getDate() : todayDate.getMonth()+1 < 10 && todayDate.getDate() >= 10 ? todayDate.getFullYear()+"-0"+(todayDate.getMonth()+1)+"-"+todayDate.getDate() : todayDate.getFullYear()+"-0"+(todayDate.getMonth()+1)+"-0"+todayDate.getDate());
    const [fromRange, setFromRange] = useState(lMDate.getMonth()+1 >= 10 && lMDate.getDate() >= 10 ? lMDate.getFullYear()+"-"+(lMDate.getMonth()+1)+"-"+lMDate.getDate() : lMDate.getMonth()+1 >= 10 && lMDate.getDate() < 10 ? lMDate.getFullYear()+"-"+(lMDate.getMonth()+1)+"-0"+lMDate.getDate() : lMDate.getMonth()+1 < 10 && lMDate.getDate() >= 10 ? lMDate.getFullYear()+"-0"+(lMDate.getMonth()+1)+"-"+lMDate.getDate() : lMDate.getFullYear()+"-0"+(lMDate.getMonth()+1)+"-0"+lMDate.getDate());

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

        setDailyDate(todayDate.getMonth()+1 >= 10 && todayDate.getDate() >= 10 ? todayDate.getFullYear()+"-"+(todayDate.getMonth()+1)+"-"+todayDate.getDate() : todayDate.getMonth()+1 >= 10 && todayDate.getDate() < 10 ? todayDate.getFullYear()+"-"+(todayDate.getMonth()+1)+"-0"+todayDate.getDate() : todayDate.getMonth()+1 < 10 && todayDate.getDate() >= 10 ? todayDate.getFullYear()+"-0"+(todayDate.getMonth()+1)+"-"+todayDate.getDate() : todayDate.getFullYear()+"-0"+(todayDate.getMonth()+1)+"-0"+todayDate.getDate());
        setYearlyDate(todayDate.getFullYear());
        setMonthlyDate({value:(todayDate.getMonth()+1), label: todayDate.toLocaleString('default', { month: 'long' })});

        setToRange(todayDate.getMonth()+1 >= 10 && todayDate.getDate() >= 10 ? todayDate.getFullYear()+"-"+(todayDate.getMonth()+1)+"-"+todayDate.getDate() : todayDate.getMonth()+1 >= 10 && todayDate.getDate() < 10 ? todayDate.getFullYear()+"-"+(todayDate.getMonth()+1)+"-0"+todayDate.getDate() : todayDate.getMonth()+1 < 10 && todayDate.getDate() >= 10 ? todayDate.getFullYear()+"-0"+(todayDate.getMonth()+1)+"-"+todayDate.getDate() : todayDate.getFullYear()+"-0"+(todayDate.getMonth()+1)+"-0"+todayDate.getDate());
        setFromRange(lMDate.getMonth()+1 >= 10 && lMDate.getDate() >= 10 ? lMDate.getFullYear()+"-"+(lMDate.getMonth()+1)+"-"+lMDate.getDate() : lMDate.getMonth()+1 >= 10 && lMDate.getDate() < 10 ? lMDate.getFullYear()+"-"+(lMDate.getMonth()+1)+"-0"+lMDate.getDate() : lMDate.getMonth()+1 < 10 && lMDate.getDate() >= 10 ? lMDate.getFullYear()+"-0"+(lMDate.getMonth()+1)+"-"+lMDate.getDate() : lMDate.getFullYear()+"-0"+(lMDate.getMonth()+1)+"-0"+lMDate.getDate());

        setReportType(0);
        setCountry([]);

        setResultData([]);
        setResultDataFiltered([]);
        setResultKeys([]);
    }

    const handleGenerate = async (e) => {
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
            report_type: report_type,
            inclusion: inclusion,
            portion: portion,
            code_type: code_type,
            case_status: case_status
        };

        const requestJson = JSON.stringify(requestData);

        try {
            const response = await toast.promise(fetch(route("admin.reports.generate_report"), {
                method: "POST",
                body: requestJson,
            }),
            {
                pending: 'Fetching Report'
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        // $('#preloader').hide();
                        setResultData(result.data);
                        setResultDataFiltered(result.data);
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

                            if(report_type?.value == 'feed_back_report')
                            {
                                setFeedbackChart({
                                    options: {
                                      chart: {
                                        id: "basic-bar"
                                      },
                                      xaxis: {
                                        categories: ["Excellent", "Satisfied", "Not Satisfied"]
                                      },
                                      colors: ['#54bc26', '#fffe0b', '#f70303']
                                    },
                                    series: [
                                      {
                                        name: "Excellent",
                                        data: [result.data.filter(row => row.feedback === "Excellent").length]
                                      },
                                      {
                                        name: "Satisfied",
                                        data: [0,
                                                result.data.filter(row => row.feedback === "Satisfied").length,
                                                0]
                                      },
                                      {
                                        name: "Not Satisfied",
                                        data: [0,
                                                0,
                                                result.data.filter(row => row.feedback === "Not Satisfied").length]
                                      }
                                    ]
                                  });
                            }
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

    const handleExport = async (e) => {
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
            data: resultData,
            portion: portion
        };

        const requestJson = JSON.stringify(requestData);

        try {
            const response = await toast.promise(fetch(route("admin.reports.export_report",e.target.value), {
                method: "POST",
                body: requestJson,
            }),
            {
                pending: 'Generating File'
            })
                .then(res => res.json())
                .then(
                    (result) => {
                            if(result.success)
                            {
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
                                const downloadName = result.filename.split('/');
                                // Create a hidden anchor element to trigger the download
                                const downloadLink = document.createElement('a');
                                downloadLink.href = downloadUrl;
                                downloadLink.download = downloadName[8];

                                // Append the anchor to the body and simulate a click
                                document.body.appendChild(downloadLink);
                                downloadLink.click();
                            }
                            else
                            {
                                toast.warning('Report file was not created properly! Please try again :(', {
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

    const handleInputChange = (event) => {
        const newQuery = event.target.value;
        setQuery(newQuery);
        const filteredResults = resultData.filter(item =>
          Object.values(item).some(val =>
            typeof val === 'string' && val.toLowerCase().includes(newQuery.toLowerCase())
          )
        );
        setResultDataFiltered(filteredResults);
    };

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
                    {report_type?.value == 'status_report' ?
                    <div className="col-sm-6 col-lg-3">
                        <div style={{width: '100%'}}>
                            <div className="form-label">Status</div>
                            <Select
                                options={[{value: 'In Process', label: 'In Process'}, {value: 'FIT', label: 'FIT'},{value: 'UNFIT', label: 'UNFIT'}, {value: 'Pending', label: 'Pending'}]}
                                value={case_status}
                                name="case_status"
                                isMulti
                                onChange={setCaseStatus}
                            />
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
                    {country?.length > 0 ?
                    <div className="col-sm-6 col-lg-3">
                        <div>
                            <div className="form-label">Include or Exclude Countries?</div>
                            <div>
                                <label className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="inclusion" value="Yes" checked={inclusion == 'Yes' ? true : false} onChange={(e) => setInclusion(e.target.value)}/>
                                    <span className="form-check-label">Include</span>
                                </label>
                                <label className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="inclusion" value="No" checked={inclusion == 'No' ? true : false} onChange={(e) => setInclusion(e.target.value)}/>
                                    <span className="form-check-label">Exclude</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    :
                    <></>
                    }
                    <div className="col-sm-6 col-lg-3">
                        <div>
                            <div className="form-label">Report Portion</div>
                            <div>
                                <label className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="portion" value="A-B" checked={portion == 'A-B' ? true : false} onChange={(e) => setPortion(e.target.value)}/>
                                    <span className="form-check-label">A-B</span>
                                </label>
                                <label className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="portion" value="A" checked={portion == 'A' ? true : false} onChange={(e) => setPortion(e.target.value)}/>
                                    <span className="form-check-label">A</span>
                                </label>
                                <label className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="portion" value="B" checked={portion == 'B' ? true : false} onChange={(e) => setPortion(e.target.value)}/>
                                    <span className="form-check-label">B</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    {report_type != null ? report_type.value == 'lab_report' ?
                    <div className="col-sm-6 col-lg-3">
                        <div>
                            <div className="form-label">Serial or Code?</div>
                            <div>
                                <label className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="code_type" value="serial" checked={code_type == 'serial' ? true : false} onChange={(e) => setCodeType(e.target.value)}/>
                                    <span className="form-check-label">Serial No</span>
                                </label>
                                <label className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="code_type" value="code" checked={code_type == 'code' ? true : false} onChange={(e) => setCodeType(e.target.value)}/>
                                    <span className="form-check-label">Code</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    :
                    <></>
                    :
                    <></>
                    }
                </div>

                <div className="mt-3 row row-deck row-cards mb-3" style={{justifyContent: 'flex-end'}}>
                    <div className="col-sm-6 col-lg-3" style={{justifyContent: 'space-between'}}>

                        <div className="col-12" style={{display: 'inline-flex', justifyContent: 'space-between'}}>
                            <button type="submit" className="btn btn-primary" onClick={handleGenerate} disabled={generated === null ? false : true}>Generate Report</button>
                            <button type="submit" className="btn btn-secondary" disabled={centreID == 0 && report_type == 0 && datafreq == null ? true : false} onClick={resetSelection}>Reset Selection</button>
                        </div>
                    </div>

                </div>

                {resultDataFiltered?.length > 0 ?
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
                                        <input type="text" class="form-control form-control-sm" aria-label="Search" value={query} onChange={handleInputChange}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                {report_type?.value == 'feed_back_report' && (
                                <div className="mixed-chart" style={{justifyContent: 'center', display: 'flex'}}>
                                    <Chart options={feedback_chart?.options} series={feedback_chart?.series} type="bar" width="350" />
                                </div>
                                )}
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
                                        {resultDataFiltered.map((data, index) => (
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
