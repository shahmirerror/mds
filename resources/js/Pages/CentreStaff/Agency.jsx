import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { IconPencil } from '@tabler/icons-react';
import { IconTrash } from '@tabler/icons-react';

export default function Agency(props) {
    const [editId, setId] = useState(0);
    const [editName, setName] = useState('');

    const { data, setData, post, delete: deleteResource, put, processing, errors, reset } = useForm({
        id: 0,
        name: '',
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleChange2 = (e) => {
        setEdit(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('agencysetup.store'));
    }

    const handleUpdate = (e) => {
        e.preventDefault();

        put(route('agencysetup.update', data.id));
    }

    const handleEdit = (user) => {

        setData('id',user?.id);
        setData('name', user?.name);
        setData('username',user?.username);
        setData('email', user?.email);

        console.log(user)

        // const modal = document.getElementById('edit-user');
        // modal.classList.toggle('show');
        // modal.style.display = 'block';
    }

    const handleDelete = (id) => {
        // toast.loading("Please wait...");
        deleteResource(route(`agencysetup.destroy`, id));
    };

    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Agency Setup</h2>}
        >
            <Head title="Agency Setup" />

            <div className="page-header d-print-none">
            <div className="container-xl">
            <div className="row g-2 align-items-center">
              <div className="col">
                <h2 className="page-title">
                  Agency Setup
                </h2>
                {/* <div className="text-secondary mt-1">1-18 of 413 people</div> */}
              </div>
              <div className="col-auto ms-auto d-print-none">
                <div className="d-flex">
                  <a href="#" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#new-user">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
                    Add Agency
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
            <div className="page-body">
                <div className="container-xl">
                    <div className="row row-cards" style={{justifyContent: 'center'}}>

                            <div className="col-md-12 col-lg-6">
                                <div class="card">
                            <div class="card-body">
                                <div id="table-default" class="table-responsive">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th><button class="table-sort" data-sort="sort-name">Name</button></th>
                                            <th><button class="table-sort" data-sort="sort-name">Action(s)</button></th>
                                        </tr>
                                    </thead>
                                    <tbody class="table-tbody">
                                        {props.agency.map((data, index) => (
                                        <tr>
                                            <td class="sort-name">{data.name}</td>
                                            <td>
                                                <a href="#" className="btn btn-sm" data-bs-toggle="modal" data-bs-target="#edit-user" onClick={() => handleEdit(data)}>
                                                    <IconPencil />
                                                </a>
                                                <a href="#" className="btn btn-sm" data-bs-toggle="modal" data-bs-target="#delete-user" onClick={() => handleEdit(data)}>
                                                    <IconTrash />
                                                </a>
                                            </td>
                                        </tr>
                                        ))}
                                    </tbody>
                                </table>
                                </div>
                            </div>
                        </div>
                            </div>
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
                            <h5 className="modal-title">Create Agency</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control" placeholder="Agency name" name="name" onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <a href="#" className="btn btn-link link-secondary" data-bs-dismiss="modal">
                            Cancel
                        </a>
                        <button className="btn btn-primary ms-auto" data-bs-dismiss="modal" type="button" onClick={handleSubmit}>

                            <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
                            Create Agency
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
                            <h5 className="modal-title">Edit Agency</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control" placeholder="Agency name" name="name" value={data.name} onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <a href="#" className="btn btn-link link-secondary" data-bs-dismiss="modal">
                            Cancel
                        </a>
                        <button className="btn btn-primary ms-auto" data-bs-dismiss="modal" type="button" onClick={handleUpdate}>

                            {/* <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg> */}
                            Update Place Of Issue
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
                            <h5 className="modal-title">Delete Agency</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                    <div className="modal-body">
                        <span>Are you sure you want to delete agency?</span>
                    </div>
                    <div className="modal-footer">
                        <a href="#" className="btn btn-link link-secondary" data-bs-dismiss="modal">
                            Cancel
                        </a>
                        <button className="btn btn-primary ms-auto" data-bs-dismiss="modal" type="button" onClick={() => handleDelete(data.id)}>

                            {/* <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg> */}
                            Delete Agency
                        </button>
                    </div>
                    </div>
                </div>
            </div>
            {/* Delete User Modal */}


        </AuthenticatedLayout>
    );
}
