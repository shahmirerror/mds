import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { IconTrash } from '@tabler/icons-react';
import { IconUserPlus } from '@tabler/icons-react';
import { IconPower } from '@tabler/icons-react';
import { IconPencil } from '@tabler/icons-react';
import { IconCategory } from '@tabler/icons-react';

import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function Centre(props) {
    const [users , setUsers] = useState(props.users);
    const [modules , setModules] = useState(props.modules);

    const [module_rights , setModuleRights] = useState(null);
    const [module_user_rights , setUserModuleRights] = useState(null);

    const [id, setId] = useState(0);
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Staff');
    const [status, setStatus] = useState('');

    const { data, setData, put, processing, errors, reset } = useForm({
        name: props.centre.name,
        phone: props.centre.phone,
        city: props.centre.city,
        country: props.centre.country,
        address: props.centre.address,
        email: props.centre.email,
        fax: props.centre.fax,
        code: props.centre.code,
        logo: '',
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleFile = (e) => {
        console.log(e.target.files[0]);
        setData(e.target.name, e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        put(route('centre-settings.update', props.centre.id));
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
    };

    const refreshUsers = () => {

        try {
            const response = fetch(route("admin.centre.fetch_staff", {'id' : props.centre.id, 'userid' : props.auth.user.id}), {
                method: "GET"
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        // $('#preloader').hide();
                        setUsers(result.users);
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
    const handleNewUserSubmit = (e) => {
        e.preventDefault();

        const requestData = {
            name: name,
            username: username,
            role: role,
            password: password
        };

        const requestJson = JSON.stringify(requestData);

        try {
            const response = fetch(route("admin.centre.add_staff", props.centre.id), {
                method: "POST",
                body: requestJson,
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        // $('#preloader').hide();
                        setName('');
                        setPassword('');
                        setRole('Staff');
                        setUsername('');
                        refreshUsers();
                        toast.success('New Staff Profile has been created!', {
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
            console.error(ex);
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

    const handleEdit = (user) => {

        setId(user.id);
        setName(user.name);
        setUsername(user.username);
        setRole(user.role_id == 2 ? 'Admin' : 'Staff');

        console.log(user, 'edit');
    }

    const handleEditUserSubmit = (e) => {
        e.preventDefault();

        const requestData = {
            id: id,
            name: name,
            username: username,
            role: role,
            password: password
        };

        const requestJson = JSON.stringify(requestData);

        try {
            const response = fetch(route("admin.centre.edit_staff", props.centre.id), {
                method: "PUT",
                body: requestJson,
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        // $('#preloader').hide();
                        setId(0);
                        setName('');
                        setPassword('');
                        setRole('Staff');
                        setUsername('');
                        refreshUsers();
                        toast.success('Staff Profile has been updated!', {
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
            console.error(ex);
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

    const handleStatus = (id, status) => {

        setId(id);
        setStatus(status);

        console.log(id, status)
    }

    const handleDelete = (e) => {
        e.preventDefault();

        const requestData = {
            id: id,
            status: status,
        };

        const requestJson = JSON.stringify(requestData);

        try {
            const response = fetch(route("admin.centre.staff_status", props.centre.id), {
                method: "PUT",
                body: requestJson,
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        // $('#preloader').hide();
                        setId(0);
                        setStatus('');
                        refreshUsers();
                        toast.success('Staff Profile has been made inactive!', {
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
            console.error(ex);
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

    const handleModStatus = (e, id, index) => {

        e.preventDefault();

        let status = e.target.checked ? 'On' : 'Off';

        try {
            const response = fetch(route("admin.centre.lab_modules", {'module_id': id, 'centre_id': props.centre.id}), {
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

    const fetchModPermissions = (e, id, index) => {
        setModuleRights(null)
        setUserModuleRights(id)
        try {
            const response = fetch(route("admin.centre.lab_module_permissions", {'user_id': id, 'centre_id': props.centre.id}), {
                method: "GET"
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        setModuleRights(result.module_rights);
                        toast.info("Module Permissions have been loaded!", {
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

    const handlePerStatus = (e, user_id, permission_id, index) => {
        // console.log(user_id, permission_id);
        let status = e.target.type == 'checkbox' ? e.target.checked ? 'On' : 'Off' : e.target.value;
        try {
            const response = fetch(route("admin.centre.toggle_lab_module_permissions", {'user_id': user_id, 'permission_id': permission_id}), {
                method: "POST",
                body: JSON.stringify({permission_value: e.target.type == 'checkbox' ? e.target.checked ? 'on' : 'off' : e.target.value})
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        if(e.target.type == 'checkbox')
                        {
                            e.target.checked = status === 'Off' ? false : true;
                        }
                        else
                        {
                            e.target.value = status;
                        }
                        let message = "Permissions have been updated!";
                        toast.success(message, {
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
                            console.log(error)
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
                console.log(ex)
        }
    }


    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Centre Management</h2>}
        >
            <Head title="Centre Management" />
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
                            Centre Management
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
                    <h4 className="subheader">Centre settings</h4>
                    <div className="list-group list-group-transparent">
                      <a href="#" className="list-group-item list-group-item-action d-flex align-items-center" onClick={(e) => handleForm(e, 'basic-information')}>Basic Information</a>
                      <a href="#" className="list-group-item list-group-item-action d-flex align-items-center" onClick={(e) => handleForm(e, 'users')}>Centre Staff</a>
                      <a href="#" className="list-group-item list-group-item-action d-flex align-items-center d-none" onClick={(e) => handleForm(e, 'modules')}>Centre Lab Modules</a>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-10 d-flex flex-column">
                    {/* Basic Information */}
                  <div className="card-body" id="basic-information">
                    <div class="row">
                        <div className="col-md">
                            <h3 className="card-title">Logo</h3>
                            <div className="row align-items-center">
                                <div className="col-auto">
                                    <input className="form-control" type="file" name="logo" onChange={handleFile}/>
                                </div>
                            </div>
                        </div>
                        {props.centre?.image !== null ?
                        <div className="col-md">
                            <h3 className="card-title">Current Logo</h3>
                            <div className="row align-items-center">
                                <div className="col-auto">
                                    <img class="mb-3 rounded" style={{width: "5.5rem"}} src={"./../storage/app/public/centres/logos/"+props.centre?.image+""}/>
                                </div>
                            </div>
                        </div>
                        :
                        <></>
                        }
                    </div>
                    <h3 className="card-title mt-4">Information</h3>
                    <div className="row mb-3">
                      <div className="col-md">
                        <div className="form-label">Name</div>
                        <input type="text" className="form-control" value={data.name}  name="name" onChange={handleChange} />
                      </div>
                      <div className="col-md">
                        <div className="form-label">Centre Code</div>
                        <input type="text" className="form-control" value={data.code}  name="code" onChange={handleChange} />
                      </div>
                      <div className="col-md">
                        <div className="form-label">Fax No.</div>
                        <input type="text" className="form-control" value={data.fax}  name="fax" onChange={handleChange} />
                      </div>
                      <div className="col-md">
                        <div className="form-label">Phone</div>
                        <input type="text" className="form-control" value={data.phone} name="phone" onChange={handleChange}/>
                      </div>
                    </div>
                    <div className="row g-3">
                        <div className="col-md">
                            <div className="form-label">Email Address</div>
                            <input type="email" className="form-control" value={data.email} name="email" onChange={handleChange}/>
                        </div>
                        <div className="col-md">
                            <div className="form-label">City</div>
                            <input type="text" className="form-control" value={data.city}  name="city" onChange={handleChange} />
                        </div>
                        <div className="col-md">
                            <div className="form-label">Country</div>
                            <input type="text" className="form-control" value={data.country} name="country" onChange={handleChange} />
                        </div>
                        <div className="col-md">
                            <div className="form-label">Address</div>
                            <textarea className={'form-control'} onChange={handleChange} name="address">{data.address}</textarea>
                        </div>
                    </div>
                  </div>

                  <div className="card-body" id="users" style={{display: 'none'}}>
                    <div className="row mb-3">
                        <h3 className="card-title" style={{float: 'left', width: '90%'}}>Centre Staff</h3>
                        <a href="#" type="button" className="btn btn-sm btn-success" data-bs-toggle="modal" data-bs-target="#new-user" style={{float: 'right', width: '10%'}}><IconUserPlus /></a>
                        <div style={{clear: 'both'}}></div>
                    </div>

                    <div className='row m-3'>
                        <div className="table-responsive">
                            <table className="table card-table table-vcenter text-nowrap datatable">
                            <thead>
                                <tr>
                                    <th className="text-center">Name</th>
                                    <th className="text-center">Username</th>
                                    <th className="text-center">Role</th>
                                    <th className="text-center">Status</th>
                                    <th className="text-center">Action(s)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                <tr>
                                    <td className="text-center">
                                        <a href="#" className="text-reset" tabindex="-1">{user.name}</a>
                                    </td>
                                    <td className="text-center">
                                        {user?.username}
                                    </td>
                                    <td className="text-center">
                                        {user?.role_id == 2 ? 'Admin' : 'Staff'}
                                    </td>
                                    <td className="text-center">
                                        {user?.status == 'Active' ?
                                            <span className="badge bg-success me-1 text-white"> Active</span>
                                        : user?.status == 'Inactive' ?
                                            <span className="badge bg-danger me-1 text-white"> Inactive</span>
                                        :
                                            <></>
                                        }
                                    </td>
                                    <td className="text-center">
                                        <div className="d-flex">
                                            <a className="card-btn" href="#" type="button" data-bs-toggle="modal" data-bs-target="#edit-user" onClick={() => handleEdit(user)}>
                                                <IconPencil />
                                            </a>
                                            {user?.role_id == 3 ?
                                                <a className="card-btn" href="#" type="button" data-bs-toggle="modal" data-bs-target="#edit-permissions" onClick={(e) => fetchModPermissions(e, user?.id, index)}>
                                                    <IconCategory />
                                                </a>
                                            :
                                                <></>
                                            }
                                            {user?.status == 'Active' ?
                                                <a className="card-btn text-danger" href="#" type="button" data-bs-toggle="modal" data-bs-target="#delete-user" onClick={() => handleStatus(user?.id, 'Inactive')}>
                                                    <IconPower />
                                                </a>
                                            :
                                                <a className="card-btn text-success" href="#" type="button" data-bs-toggle="modal" data-bs-target="#delete-user" onClick={() => handleStatus(user?.id, 'Active')}>
                                                    <IconPower />
                                                </a>
                                            }

                                        </div>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                            </table>
                        </div>
                    </div>

                  </div>

                  <div className="card-body" id="modules" style={{display: 'none'}}>
                    <h3 className="card-title">Centre Lab Modules</h3>
                    <hr></hr>
                    {props.modules.map((mod, index) => (
                    <>
                    <div className="row m-3">
                      <div className="col-md" style={{display: 'inline-flex',justifyContent: 'space-evenly'}}>
                        <div className="form-label">{mod?.title}</div>
                        <div className="form-desc">{mod?.description}</div>
                        <div>
                            <label className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" id={`switch${index}`} name={`switch${index}`} checked={mod?.status} onChange={(e) => handleModStatus(e, mod.id, index)}/>
                                <span class="form-check-label" id={`switchlabel${index}`}>{mod?.status ? 'On' : 'Off'}</span>
                            </label>
                        </div>
                      </div>
                    </div>
                    <hr></hr>
                    </>
                    ))}
                  </div>

                  <div id="form_footer" className="card-footer bg-transparent mt-auto">
                    <div className="btn-list justify-content-end">
                      <a href="#" className="btn btn-primary" type="button" onClick={handleSubmit}>
                        Update Centre
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Create User Modal */}
        <div className="modal modal-blur fade" id="new-user" tabindex="-1" role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add New Staff Member</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                <div className="modal-body">
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" placeholder="Staff Member's name" name="name" value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input type="text" className="form-control" placeholder="Username" name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Role</label>
                        <select class="form-select" name="role" onChange={(event) => setRole(event.target.value)}>
                            <option value="Admin">Admin</option>
                            <option value="Staff" selected>Staff</option>
                            <option value="Token" selected>Token</option>
                            <option value="Feedback" selected>Feedback</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" placeholder="Password" name="password" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                </div>
                <div className="modal-footer">
                    <a href="#" className="btn btn-link link-secondary" data-bs-dismiss="modal">
                        Cancel
                    </a>
                    <button className="btn btn-primary ms-auto" data-bs-dismiss="modal" type="button" onClick={handleNewUserSubmit}>

                        <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
                        Create Staff
                    </button>
                </div>
                </div>
            </div>
        </div>
        {/* Create User Modal */}

        {/* Edit User Modal */}
        <div className="modal modal-blur fade" id="edit-user" tabindex="-1" role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Staff Member</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                <div className="modal-body">
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" placeholder="Staff Member's name" name="name" value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input type="text" className="form-control" placeholder="Username" name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Role</label>
                        <select class="form-select" name="role" onChange={(event) => setRole(event.target.value)}>
                            {role == 'Admin' ?
                                <>
                                <option value="Admin" selected>Admin</option>
                                <option value="Staff">Staff</option>
                                <option value="Token">Token</option>
                                <option value="Feedback">Feedback</option>
                                </>
                            :role == 'Staff' ?
                                <>
                                <option value="Admin">Admin</option>
                                <option value="Staff" selected>Staff</option>
                                <option value="Token">Token</option>
                                <option value="Feedback">Feedback</option>
                                </>
                            :role == 'Token' ?
                                <>
                                <option value="Admin">Admin</option>
                                <option value="Staff">Staff</option>
                                <option value="Token" selected>Token</option>
                                <option value="Feedback">Feedback</option>
                                </>
                            :role == 'Feedback' ?
                                <>
                                <option value="Admin">Admin</option>
                                <option value="Staff">Staff</option>
                                <option value="Token">Token</option>
                                <option value="Feedback" selected>Feedback</option>
                                </>
                            :
                                <>
                                <option value="Admin">Admin</option>
                                <option value="Staff">Staff</option>
                                <option value="Token">Token</option>
                                <option value="Feedback">Feedback</option>
                                </>
                            }
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" placeholder="Password" name="password" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                </div>
                <div className="modal-footer">
                    <a href="#" className="btn btn-link link-secondary" data-bs-dismiss="modal">
                        Cancel
                    </a>
                    <button className="btn btn-primary ms-auto" data-bs-dismiss="modal" type="button" onClick={handleEditUserSubmit}>

                        <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
                        Update Staff Information
                    </button>
                </div>
                </div>
            </div>
        </div>
        {/* Edit User Modal */}

        {/* Edit Permissions Modal */}
        <div className="modal modal-blur fade" id="edit-permissions" tabindex="-1" role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Permissions</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                <div className="modal-body">
                <div className="row m-3">
                    {module_rights?.length > 0 ? module_rights.map((mod, index) => (
                    <>
                        {mod?.status == true ?
                        <>
                            <div className="col-md-12 mb-2" >
                                <div style={{display: 'inline-flex',justifyContent: 'space-between'}} className="col-7">
                                <div className="form-label h4">{mod?.title}</div>
                                {mod?.rights?.length > 0 ? mod?.rights.map((right, index) => (
                                <>
                                    {right?.permission_type == 'Primary' ?
                                    <div>
                                    <label className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox" id={`perswitch${right?.permission_id}`} name={`perswitch${right?.permission_id}`} checked={right?.status} onChange={(e) => handlePerStatus(e, module_user_rights, right?.permission_id, index)}/>
                                        <span class="form-check-label text-small" id={`perswitchlabel${right?.permission_id}`}>{'Allow Access?'}</span>
                                    </label>
                                    </div>
                                    :
                                    <></>
                                    }
                                </>
                                ))
                                :
                                <></>
                                }
                                </div>
                                <div className="mt-2 col-md-12 mb-3" style={{display: 'inline-flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>
                                {mod?.rights?.length > 0 ? mod?.rights.map((right, index) => (
                                    <>
                                        {right?.permission_type == 'CRUD' || right?.permission_type == 'Alternate' ?
                                        <div>
                                        <label className="form-check">
                                            <input className="form-check-input" type="checkbox" id={`perswitch${right?.permission_id}`} name={`perswitch${right?.permission_id}`} checked={right?.status} onChange={(e) => handlePerStatus(e, module_user_rights, right?.permission_id, index)}/>
                                            <span class="form-check-label text-small" id={`perswitchlabel${right?.permission_id}`}>{right?.permission_name.replaceAll('_',' ').toUpperCase()}</span>
                                        </label>
                                        </div>
                                        :right?.permission_type == 'Counter' || right?.permission_type == 'Printing' ?
                                        <div>
                                            <label className="form-label" id={`perswitchlabel${index}`}>{right?.permission_name.replaceAll('_',' ').toUpperCase()}</label>
                                            <input className="form-control" type="text" id={`perswitch${right?.permission_id}`} name={`perswitch${right?.permission_id}`} placeholder="Enter Value" value={right?.permission_value} onChange={(e) => handlePerStatus(e, module_user_rights, right?.permission_id, index)}/>
                                        </div>
                                        :
                                        <></>
                                        }
                                    </>
                                ))
                                :
                                    <div>
                                        <span class="form-check-label" id={``}>{'No Rights are available for this Module'}</span>
                                    </div>
                            }
                                </div>
                            </div>

                            <hr></hr>
                        </>
                        :
                        <></>
                        }
                    </>
                    ))
                :
                <></>
                }
                        </div>
                </div>
                <div className="modal-footer">
                    <a href="#" className="btn btn-link link-secondary" data-bs-dismiss="modal">
                        Close
                    </a>
                </div>
                </div>
            </div>
        </div>
        {/* Edit Permissions Modal */}

        {/* Delete User Modal */}
        <div className="modal modal-blur fade" id="delete-user" tabindex="-1" role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{status == 'Active' ? 'Activate' : 'Deactivate'} Staff Profile</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                <div className="modal-body">
                    <span>Are you sure you want to make this Staff Profile {status == 'Active' ? 'active' : 'inactive'}?</span>
                </div>
                <div className="modal-footer">
                    <a href="#" className="btn btn-link link-secondary" data-bs-dismiss="modal">
                        Cancel
                    </a>
                    <button className="btn btn-primary ms-auto" data-bs-dismiss="modal" type="button" onClick={handleDelete}>

                        <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
                        {status == 'Inactive' ? 'Deactivate' : 'Activate'} Staff Profile
                    </button>
                </div>
                </div>
            </div>
        </div>
        {/* Delete User Modal */}


        </AuthenticatedLayout>
    );
}
