import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { IconTrash, IconUserPlus, IconDownload } from '@tabler/icons-react';
import { IconPencil } from '@tabler/icons-react';
import { IconPower } from '@tabler/icons-react';

import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function Settings(props) {

    const [devices, setDevices] = useState([]);
    const [logs, setLogs] = useState([]);

    const [id, setId] = useState(0);
    const [centre, setCentre] = useState(0);
    const [brand, setBrand] = useState('');
    const [type, setType] = useState('');
    const [name, setName] = useState('');

    const { data, setData, post, processing, errors, reset } = useForm({
        frequency: 0,
        type: 'Daily',
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
        console.log(e.target.name, e.target.value)
    };

    const refreshDevices = () => {

        try {
            const response = fetch(route("super.settings.fetch_devices"), {
                method: "GET"
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        // $('#preloader').hide();
                        setDevices(result.devices);
                    },
                    (error) => {
                        console.log(error)
                    }
                );
        } catch (ex) {
            toast.error('Something went wrong! Can not fetch devices', {
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

    const handleSubmit = (e) => {
        e.preventDefault();

        const requestJson = JSON.stringify(data);

        try {
            const response = fetch(route("super.settings.update_settings", 1), {
                method: "POST",
                body: requestJson,
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        toast.success("Backup Settings have been updated!", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            });
                    },
                    (error) => {
                        toast.error("Something went wrong! Please try again :(", {
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
            toast.error("Something went wrong! Please try again :(", {
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

    const handleForm = (e, id) => {

        document.getElementById('basic-information').style.display = 'none';
        document.getElementById('users').style.display = 'none';
        document.getElementById('modules').style.display = 'none';

        document.getElementById(id).style.display = 'block';

        if(id == 'basic-information')
        {
            document.getElementById('form_footer').style.display = 'block';
        }
        else
        {
            document.getElementById('form_footer').style.display = 'none';
        }
    }

    const handleStore = (e) => {

        e.preventDefault();

        const requestData = {
            centre_id: centre,
            name: name,
            brand: brand,
            type: type
        };

        const requestJson = JSON.stringify(requestData);

        try {
            const response = fetch(route("super.settings.store_devices"), {
                method: "POST",
                body: requestJson
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        refreshDevices();
                        toast.success("New Device details have been saved!", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            });
                    },
                    (error) => {
                        toast.error("Something went wrong! Please try again :(", {
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
            toast.error("Something went wrong! Please try again :(", {
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

    const handleEdit = (device) => {

        setId(device.id);
        setName(device.name);
        setBrand(device.brand);
        setType(device.type);
        setCentre(device.centre_id);
    }

    const handleDelete = (e, id) => {
        e.preventDefault();

        try {
            const response = fetch(route("super.settings.delete_devices", id), {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        refreshDevices();
                        toast.success("Device details have been removed!", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            });
                    },
                    (error) => {
                        toast.error("Something went wrong! Please try again :(", {
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
            toast.error("Something went wrong! Please try again :(", {
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

    const handleUpdate = (e, id) => {
        e.preventDefault();

        const requestData = {
            centre_id: centre,
            name: name,
            brand: brand,
            type: type
        };

        const requestJson = JSON.stringify(requestData);

        try {
            const response = fetch(route("super.settings.update_devices", id), {
                method: "PUT",
                body: requestJson
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        refreshDevices();
                        toast.success("Device details have been updated!", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            });
                    },
                    (error) => {
                        toast.error("Something went wrong! Please try again :(", {
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
            toast.error("Something went wrong! Please try again :(", {
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
        refreshDevices()
    }, [])


    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Organization Settings</h2>}
        >
            <Head title="Organization Settings" />
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
                        Organization Settings
                        </h2>
                    </div>
                    </div>
                </div>
            </div>

        <div className="page-body">
          <div className="container-xl">
            <div className="card">
              <div className="row g-0">
                <div className="col-12 col-md-2 border-end">
                  <div className="card-body">
                    <div className="list-group list-group-transparent">
                      <a href="#" className="list-group-item list-group-item-action d-flex align-items-center" onClick={(e) => handleForm(e, 'basic-information')}>Backup Settings</a>
                      <a href="#" className="list-group-item list-group-item-action d-flex align-items-center" onClick={(e) => handleForm(e, 'users')}>Centre Devices</a>
                      <a href="#" className="list-group-item list-group-item-action d-flex align-items-center" onClick={(e) => handleForm(e, 'modules')}>Backup Logs</a>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-10 d-flex flex-column">
                    {/* Basic Information */}
                  <div className="card-body" id="basic-information">
                    <h3 className="card-title">Backup Settings</h3>
                    <div className="row mt-3">
                      <div className="col-md">
                        <div className="form-label">Type</div>
                        <div>
                            <label className="form-check form-check-inline">
                                {data.type == 'Hourly' ?
                                    <input className="form-check-input" type="radio" name="type" id="hourly_type" value="Hourly" checked onChange={handleChange}/>
                                :
                                    <input className="form-check-input" type="radio" name="type" id="hourly_type" value="Hourly" onChange={handleChange}/>
                                }
                                <span className="form-check-label">Hourly</span>
                            </label>
                            <label className="form-check form-check-inline">
                                {data.type == 'Daily' ?
                                    <input className="form-check-input" type="radio" name="type" id="daily_type" value="Daily" checked onChange={handleChange}/>
                                :
                                    <input className="form-check-input" type="radio" name="type" id="daily_type" value="Daily" onChange={handleChange}/>
                                }
                                <span className="form-check-label">Daily</span>
                            </label>
                            <label className="form-check form-check-inline">
                                {data.type == 'Monthly' ?
                                    <input className="form-check-input" type="radio" name="type" id="monthly_type" value="Monthly" checked onChange={handleChange}/>
                                :
                                    <input className="form-check-input" type="radio" name="type" id="monthly_type" value="Monthly" onChange={handleChange}/>
                                }

                                <span className="form-check-label">Monthly</span>
                            </label>
                        </div>
                      </div>
                            <div className="col-md">
                                <div className="col-md-3">
                                    <div className="form-label">Frequency</div>
                                    <input type="number" className="form-control sm" name="frequency" value={data.frequency} onChange={handleChange} />
                                </div>
                            </div>
                    </div>
                  </div>

                  <div className="card-body" id="users" style={{display: 'none'}}>
                    <div className="row mb-3">
                        <h3 className="card-title" style={{float: 'left', width: '90%'}}>Centre Devices</h3>
                        <a href="#" type="button" className="btn btn-sm btn-success" data-bs-toggle="modal" data-bs-target="#new-device" style={{float: 'right', width: '10%'}} ><IconUserPlus /></a>
                        <div style={{clear: 'both'}}></div>
                    </div>
                    <div className='row m-3'>
                        <div className="table-responsive">
                            <table className="table card-table table-vcenter text-nowrap datatable">
                            <thead>
                                <tr>
                                    <th className="text-center">Centre</th>
                                    <th className="text-center">Name</th>
                                    <th className="text-center">Brand</th>
                                    <th className="text-center">Type</th>
                                    <th className="text-center">Action(s)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {devices?.length > 0 ? devices.map((device, index) => (
                                <tr>
                                    <td className="text-center">
                                        <a href="#" className="text-reset" tabindex="-1">{device.centre_name}</a>
                                    </td>
                                    <td className="text-center">
                                        {device?.name}
                                    </td>
                                    <td className="text-center">
                                        {device?.brand}
                                    </td>
                                    <td className="text-center">
                                        {device?.type}
                                    </td>
                                    <td className="text-center">
                                        <div className="d-flex">
                                            <a className="card-btn" href="#" type="button" data-bs-toggle="modal" data-bs-target="#edit-device" onClick={() => handleEdit(device)}>
                                                <IconPencil />
                                            </a>
                                            <a className="card-btn text-danger" href="#" type="button" data-bs-toggle="modal" data-bs-target="#delete-device" onClick={() => handleEdit(device)}>
                                                <IconPower />
                                            </a>

                                        </div>
                                    </td>
                                </tr>
                                ))
                                :
                                (<></>)
                                }
                            </tbody>
                            </table>
                        </div>
                    </div>
                  </div>

                  <div className="card-body" id="modules" style={{display: 'none'}}>
                    <h3 className="card-title">Backup Logs</h3>
                    <div className='row m-3'>
                        <div className="table-responsive">
                            <table className="table card-table table-vcenter text-nowrap datatable">
                            <thead>
                                <tr>
                                    <th className="text-center">Name</th>
                                    <th className="text-center">Created Time</th>
                                    <th className="text-center">Action(s)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {logs?.length > 0 ? logs.map((log, index) => (
                                <tr>
                                    <td className="text-center">
                                        <a href="#" className="text-reset" tabindex="-1">{log.name}</a>
                                    </td>
                                    <td className="text-center">
                                        {log?.created_at}
                                    </td>
                                    <td className="text-center">
                                        <div className="d-flex">
                                            <a className="card-btn" href="#" type="button" data-bs-toggle="modal" data-bs-target="#edit-user" onClick={''}>
                                                <IconDownload />
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                                ))
                                :
                                (<></>)
                                }
                            </tbody>
                            </table>
                        </div>
                    </div>
                  </div>

                  <div className="card-footer bg-transparent mt-auto" id="form_footer">
                    <div className="btn-list justify-content-end">
                        <a href="#" className="btn btn-primary" type="button" onClick={handleSubmit}>
                            Update Settings
                        </a>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Create Device Modal */}
        <div className="modal modal-blur fade" id="new-device" tabindex="-1" role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Create Centre Device</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                <div className="modal-body">
                    <div className="mb-3">
                        <label className="form-label">Centre</label>
                        <select className="form-select" value={centre} name="centre" onChange={(e) => setCentre(e.target.value)}>
                            <option value={0}>Select Centre</option>
                            {props.centres.map((centre, index) => (
                                <option value={centre?.id}>{centre.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" placeholder="Device Name" name="name" value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Brand</label>
                        <input type="text" className="form-control" placeholder="Brand" name="brand" value={brand} onChange={(e) => setBrand(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Type</label>
                        <select className="form-select" value={type} name="type" onChange={(e) => setType(e.target.value)}>
                            <option value={null}>--</option>
                            <option value={"Thumb Print Scanner"}>Thumb Print Scanner</option>
                            <option value={"Barcode Scanner"}>Barcode Scanner</option>
                            <option value={"Printer"}>Printer</option>
                            <option value={"Passport Scanner"}>Passport Scanner</option>
                        </select>
                    </div>
                </div>
                <div className="modal-footer">
                    <a href="#" className="btn btn-link link-secondary" data-bs-dismiss="modal">
                        Cancel
                    </a>
                    <button className="btn btn-primary ms-auto" data-bs-dismiss="modal" type="button" onClick={handleStore}>
                        Create Centre Device
                    </button>
                </div>
                </div>
            </div>
        </div>
        {/* Create Device Modal */}

        {/* Edit Device Modal */}
        <div className="modal modal-blur fade" id="edit-device" tabindex="-1" role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Centre Device</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                <div className="modal-body">
                <div className="mb-3">
                        <label className="form-label">Centre</label>
                        <select className="form-select" value={centre} name="centre" onChange={(e) => setCentre(e.target.value)}>
                            <option value={0}>Select Centre</option>
                            {props.centres.map((centre, index) => (
                                <option value={centre?.id}>{centre.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" placeholder="Device Name" name="name" value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Brand</label>
                        <input type="text" className="form-control" placeholder="Brand Name" name="brand" value={brand} onChange={(e) => setBrand(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Type</label>
                        <select className="form-select" value={type} name="type" onChange={(e) => setType(e.target.value)}>
                            <option value={null}>--</option>
                            <option value={"Thumb Print Scanner"}>Thumb Print Scanner</option>
                            <option value={"Barcode Scanner"}>Barcode Scanner</option>
                            <option value={"Printer"}>Printer</option>
                            <option value={"Passport Scanner"}>Passport Scanner</option>
                        </select>
                    </div>
                </div>
                <div className="modal-footer">
                    <a href="#" className="btn btn-link link-secondary" data-bs-dismiss="modal">
                        Cancel
                    </a>
                    <button className="btn btn-primary ms-auto" data-bs-dismiss="modal" type="button" onClick={(e) => handleUpdate(e, id)}>
                        Update Centre Device
                    </button>
                </div>
                </div>
            </div>
        </div>
        {/* Edit Device Modal */}

        {/* Delete Device Modal */}
        <div className="modal modal-blur fade" id="delete-device" tabindex="-1" role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Delete Centre Device</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                <div className="modal-body">
                    <span>Are you sure you want to delete this device?</span>
                </div>
                <div className="modal-footer">
                    <a href="#" className="btn btn-link link-secondary" data-bs-dismiss="modal">
                        Cancel
                    </a>
                    <button className="btn btn-primary ms-auto" data-bs-dismiss="modal" type="button" onClick={(e) => handleDelete(e, id)}>
                        Delete Centre Device
                    </button>
                </div>
                </div>
            </div>
        </div>
        {/* Delete User Modal */}


        </AuthenticatedLayout>
    );
}
