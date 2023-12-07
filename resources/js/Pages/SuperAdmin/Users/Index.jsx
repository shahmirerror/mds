import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { IconPencil } from '@tabler/icons-react';
import { IconTrash } from '@tabler/icons-react';

export default function Index(props) {
    const [editId, setId] = useState(0);
    const [editName, setName] = useState('');
    const [editEmail, setEmail] = useState('');
    const [editPhone, setPhone] = useState('');
    const [editUsername, setUsername] = useState('');

    const { data, setData, post, put, processing, errors, reset } = useForm({
        id: 0,
        name: '',
        email: '',
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleChange2 = (e) => {
        setEdit(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('users.store'));
    }

    const handleUpdate = (e) => {
        e.preventDefault();

        put(route('users.update', data.id));
    }

    const handleEdit = (user) => {

        setId(user.id);
        setName(user.name);
        setUsername(user.username);
        setEmail(user.email);

        console.log(data)

        const modal = document.getElementById('edit-user');
        modal.classList.toggle('show');
        modal.style.display = 'block';
    }

    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Super Administration</h2>}
        >
            <Head title="Super Administration" />

            <div className="page-header d-print-none">
            <div className="container-xl">
            <div className="row g-2 align-items-center">
              <div className="col">
                <h2 className="page-title">
                  Users
                </h2>
                {/* <div className="text-secondary mt-1">1-18 of 413 people</div> */}
              </div>
              <div className="col-auto ms-auto d-print-none">
                <div className="d-flex">
                  <a href="#" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#new-user">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
                    New user
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
            <div className="page-body">
                <div className="container-xl">
                    <div className="row row-cards">
                        {props.data.map((user, index) => (
                            <div className="col-md-6 col-lg-3">
                                <div className="card">
                                    <div className="card-body p-4 text-center">
                                        <span className="avatar avatar-xl mb-3 rounded" style={{backgroundImage: "url("+user?.profile_photo_url+")"}}></span>
                                        <h3 className="m-0 mb-1"><a href="#">{user?.name}</a></h3>
                                        <div className="text-secondary">Super Admin</div>
                                        {/* <div className="mt-3">
                                            <span className="badge bg-purple-lt">Owner</span>
                                        </div> */}
                                    </div>
                                    <div className="d-flex">
                                        <a href="#" className="card-btn" onClick={() => handleEdit(user)}>
                                            <IconPencil />
                                        </a>
                                        <a href="#" className="card-btn" data-bs-toggle="modal" data-bs-target="#delete-user">
                                            <IconTrash />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="d-flex mt-4 d-none">
                        <ul className="pagination ms-auto">
                            <li className="page-item disabled">
                                <a className="page-link" href="#" tabindex="-1" aria-disabled="true">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M15 6l-6 6l6 6" /></svg>
                                    prev
                                </a>
                            </li>
                            <li className="page-item"><a className="page-link" href="#">1</a></li>
                            <li className="page-item active"><a className="page-link" href="#">2</a></li>
                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                            <li className="page-item"><a className="page-link" href="#">4</a></li>
                            <li className="page-item"><a className="page-link" href="#">5</a></li>
                            <li className="page-item">
                                <a className="page-link" href="#">
                                    next
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 6l6 6l-6 6" /></svg>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Create User Modal */}
            <div className="modal modal-blur fade" id="new-user" tabindex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Create Super Admin</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control" placeholder="Super Admin's name" name="name" onChange={handleChange}/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="text" className="form-control" placeholder="Email Address" name="email" onChange={handleChange}/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input type="text" className="form-control" placeholder="Username" name="username" onChange={handleChange}/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" placeholder="Password" name="password" onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <a href="#" className="btn btn-link link-secondary" data-bs-dismiss="modal">
                            Cancel
                        </a>
                        <button className="btn btn-primary ms-auto" data-bs-dismiss="modal" type="button" onClick={handleSubmit}>

                            <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
                            Create Super Admin
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
                            <h5 className="modal-title">Edit Super Admin</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control" placeholder="Super Admin's name" name="name" value={editName} onChange={handleChange}/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="text" className="form-control" placeholder="Email Address" name="email" value={editEmail} onChange={handleChange}/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input type="text" className="form-control" placeholder="Username" name="username" value={editUsername} onChange={handleChange}/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Change Password (if forgotten)</label>
                            <input type="password" className="form-control" placeholder="Password" name="password" onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <a href="#" className="btn btn-link link-secondary" data-bs-dismiss="modal">
                            Cancel
                        </a>
                        <button className="btn btn-primary ms-auto" data-bs-dismiss="modal" type="button" onClick={handleUpdate}>

                            <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
                            Update Super Admin
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
                            <h5 className="modal-title">Delete Super Admin</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                    <div className="modal-body">
                        <span>Are you sure you want to delete this Super Admin?</span>
                    </div>
                    <div className="modal-footer">
                        <a href="#" className="btn btn-link link-secondary" data-bs-dismiss="modal">
                            Cancel
                        </a>
                        <button className="btn btn-primary ms-auto" data-bs-dismiss="modal" type="button" onClick={handleUpdate}>

                            <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
                            Delete Super Admin
                        </button>
                    </div>
                    </div>
                </div>
            </div>
            {/* Delete User Modal */}


        </AuthenticatedLayout>
    );
}
