import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { IconTrash } from '@tabler/icons-react';
import { IconUserPlus } from '@tabler/icons-react';
import { IconPower } from '@tabler/icons-react';
import { IconPencil } from '@tabler/icons-react';

export default function Edit(props) {
    const [users , setUsers] = useState(props.users);
    const [modules , setModules] = useState(props.modules);

    const [id, setId] = useState(0);
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Staff');
    const [status, setStatus] = useState('');

    const { data, setData, post, processing, errors, reset } = useForm({
        name: props.centre.name,
        phone: props.centre.phone,
        city: props.centre.city,
        country: props.centre.country,
        address: props.centre.address,
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

        post(route('centres.store'));
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
            const response = fetch(route("super.centre.fetch_staff", props.centre.id), {
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
            const response = fetch(route("super.centre.add_staff", props.centre.id), {
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
                    },
                    (error) => {
                        console.log(error)
                    }
                );
        } catch (ex) {
            console.error(ex);
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
            const response = fetch(route("super.centre.edit_staff", props.centre.id), {
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
                    },
                    (error) => {
                        console.log(error)
                    }
                );
        } catch (ex) {
            console.error(ex);
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
            const response = fetch(route("super.centre.staff_status", props.centre.id), {
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
                    },
                    (error) => {
                        console.log(error)
                    }
                );
        } catch (ex) {
            console.error(ex);
        }
    }

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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Centres Management</h2>}
        >
            <Head title="Edit Centre" />

            <div className="page-header d-print-none">
                <div className="container-xl">
                    <div className="row g-2 align-items-center">
                    <div className="col">
                        <h2 className="page-title">
                            Edit Centre
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
                      <a href="#" className="list-group-item list-group-item-action d-flex align-items-center" onClick={(e) => handleForm(e, 'modules')}>Centre Lab Modules</a>
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
                                    <span className="avatar avatar-xl rounded" style={{backgroundImage: "url(./../../../storage/app/public/centres/logos/"+props.centre?.image+")"}}></span>
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
                        <div className="form-label">City</div>
                        <input type="text" className="form-control" value={data.city}  name="city" onChange={handleChange} />
                      </div>
                      <div className="col-md">
                        <div className="form-label">Country</div>
                        <input type="text" className="form-control" value={data.country} name="country" onChange={handleChange} />
                      </div>
                    </div>
                    <div className="row g-3">
                      <div className="col-md">
                        <div className="form-label">Phone</div>
                        <input type="text" className="form-control" value={data.phone} name="phone" onChange={handleChange}/>
                      </div>
                      <div className="col-md">
                        <div className="form-label">Address</div>
                        <input type="text" className="form-control" value={data.address} name="address" onChange={handleChange} />
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
                                                <a className="card-btn" href="#">
                                                    Edit Permissions
                                                </a>
                                            :
                                                <></>
                                            }
                                            {user?.status == 'Active' ?
                                                <a className="card-btn text-danger" href="#" type="button" data-bs-toggle="modal" data-bs-target="#delete-user" onClick={() => handleStatus(user?.id, 'Inactive')}>
                                                    <IconPower />
                                                </a>
                                            :
                                                <a className="dropdown-item text-success" href="#" type="button" data-bs-toggle="modal" data-bs-target="#delete-user" onClick={() => handleStatus(user?.id, 'Active')}>
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
                      <a href={route('centres.index')} className="btn">
                        Cancel
                      </a>
                      <a href="#" className="btn btn-primary" type="button" onClick={handleSubmit}>
                        Submit
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
                                </>
                            :
                                <>
                                <option value="Admin">Admin</option>
                                <option value="Staff" selected>Staff</option>
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
