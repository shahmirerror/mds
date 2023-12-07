import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {useState, useEffect} from 'react';

export default function Reports({ auth }) {
    const [centres, setCentres] = useState([]);
    const [modules, setModules] = useState([]);

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
                            <select className="form-select form-control">
                                <option value="0">All Centres</option>
                                {centres.map((centre, index) => (
                                    <option value={centre?.id}>{centre?.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="col-sm-6 col-lg-3">
                        <div style={{width: '100%'}}>
                            <div className="form-label">Report Type</div>
                            <select className="form-select form-control">
                                <option value="0">Select Report</option>
                                {modules.map((mod, index) => (
                                    <option value={mod?.id}>{mod?.title}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="col-sm-6 col-lg-3">
                        <div>
                            <div className="form-label">Data Frequency</div>
                            <div>
                                <label className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="data_freq"/>
                                    <span className="form-check-label">Daily</span>
                                </label>
                                <label className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="data_freq"/>
                                    <span className="form-check-label">Yearly</span>
                                </label>
                                <label className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="data_freq"/>
                                    <span className="form-check-label">Monthly</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-lg-3" style={{justifyContent: 'center'}}>
                        <div className="btn-list" style={{display: 'grid'}}>
                            <button type="submit" className="btn btn-primary" >Generate Report</button>
                            <button type="submit" className="btn btn-secondary" >Reset Selection</button>
                        </div>
                    </div>

                </div>
            </div>
            </div>
        </AuthenticatedLayout>
    );
}
