import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { IconTrash, IconUserPlus, IconDownload } from '@tabler/icons-react';

export default function Settings(props) {

    const [devices, setDevices] = useState([]);
    const [logs, setLogs] = useState([]);

    const { data, setData, post, processing, errors, reset } = useForm({
        frequency: 0,
        type: 'Daily',
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
        console.log(e.target.name, e.target.value)
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const requestJson = JSON.stringify(data);

        try {
            const response = fetch(route("super.settings.update_settings", 1), {
                method: "PUT",
                body: requestJson,
            })
                .then(res => res.json())
                .then(
                    (result) => {

                    },
                    (error) => {
                        console.log(error)
                    }
                );
        } catch (ex) {
            console.error(ex);
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

    const handleAddRow = () => {
        const newRow = { id: rows.length + 1, username: '', password: '', role: 'Staff' };
        setRows([...rows, newRow]);
    };

    const handleDeleteRow = (id) => {
        const filteredRows = rows.filter((row) => row.id !== id);
        setRows(filteredRows);
    };

    const handleModStatus = (e, id, index) => {

        e.preventDefault();

        let status = e.target.checked ? 'On' : 'Off';

        try {
            const response = fetch(route("super.centre.lab_modules", {'module_id': id, 'centre_id': props.centre.id}), {
                method: "PUT"
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        document.getElementById(`switchlabel${index}`).innerHTML = status;
                        document.getElementById(`switch${index}`).checked = e.target.checked;
                    },
                    (error) => {
                        console.log(error)
                    }
                );
        } catch (ex) {
            console.error(ex);
        }
    }

    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Organization Settings</h2>}
        >
            <Head title="Organization Settings" />

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
                        {data.type == 'Daily' ?
                            <div className="col-md">
                                <div className="form-label">Frequency</div>
                                <input type="number" className="form-control" name="frequency" value={data.frequency} onChange={handleChange} />
                            </div>
                        :
                            <></>
                        }
                    </div>
                  </div>

                  <div className="card-body" id="users" style={{display: 'none'}}>
                    <div className="row mb-3">
                        <h3 className="card-title" style={{float: 'left', width: '90%'}}>Centre Devices</h3>
                        <a href="#" type="button" className="btn btn-sm btn-success" style={{float: 'right', width: '10%'}} onClick={handleAddRow}><IconUserPlus /></a>
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
                                        <a href="#" className="text-reset" tabindex="-1">{device.centre}</a>
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
                                            <a className="card-btn" href="#" type="button" data-bs-toggle="modal" data-bs-target="#edit-user" onClick={() => handleEdit(device)}>
                                                <IconPencil />
                                            </a>
                                            <a className="card-btn text-danger" href="#" type="button" data-bs-toggle="modal" data-bs-target="#delete-user" onClick={() => handleStatus(device?.id, 'Inactive')}>
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
                                            <a className="card-btn" href="#" type="button" data-bs-toggle="modal" data-bs-target="#edit-user" onClick={() => handleEdit(device)}>
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


        </AuthenticatedLayout>
    );
}
