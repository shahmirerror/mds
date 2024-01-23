import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { IconPencil } from '@tabler/icons-react';
import { IconTrash } from '@tabler/icons-react';
import { IconPower } from '@tabler/icons-react';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function Index(props) {

    const { delete: deleteResource, put } = useForm();
    const [ id, setId ] = useState();

    const handleDelete = (id) => {
        // toast.loading("Please wait...");
        deleteResource(route(`centres.destroy`, id));
    };

    const handleSuspend = (id) => {
        // toast.loading("Please wait...");
        put(route(`centres.suspend`, id));
    };

    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Centres Management</h2>}
        >
            <Head title="Centres Management" />

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
                  Centres Management
                </h2>
                {/* <div className="text-secondary mt-1">1-18 of 413 people</div> */}
              </div>
              <div className="col-auto ms-auto d-print-none">
                <div className="d-flex">
                  <a href={route('centres.create')} className="btn btn-primary" >
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
                    New centre
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
            <div className="page-body">
                <div className="container-xl">
                    <div className="row row-cards">
                        {props.data.map((centre, index) => (
                            <div className="col-md-6 col-lg-3">
                                <div className="card">
                                    <div className="card-body p-4 text-center">
                                        {centre?.image != null ?
                                            <img class="mb-3 rounded" style={{width: "10rem", height: "3.5rem"}} src={"./../storage/app/public/centres/logos/"+centre?.image+""}/>
                                        :
                                            <></>
                                        }
                                        <h3 className="m-0 mb-1"><a href="#">{centre?.name}</a></h3>
                                        <div className="text-secondary">
                                            {centre?.city != null ? centre?.city+', ' : ''}{centre?.country != null ? centre?.country : 'No Location Specified'}</div>
                                        <div className="mt-3">
                                            <span className="badge bg-purple-lt">{centre?.status}</span>
                                        </div>
                                    </div>
                                    <div className="d-flex">
                                        <a href={route('centres.edit', centre.id)} className="card-btn">
                                            <IconPencil />
                                        </a>
                                        {centre?.status == 'Active' ?
                                            <a href="#" className="card-btn text-danger" type="button" onClick={() => handleSuspend(centre.id)}>
                                                <IconPower />
                                            </a>
                                        :
                                            <a href="#" className="card-btn text-success" type="button" onClick={() => handleSuspend(centre.id)}>
                                                <IconPower />
                                            </a>
                                        }
                                        <a href="#" className="card-btn" data-bs-toggle="modal" data-bs-target="#delete-centre" onClick = {() => setId(centre.id)}>
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

            {/* Delete Centre Modal */}
            <div className="modal modal-blur fade" id="delete-centre" tabindex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Delete Centre</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                    <div className="modal-body">
                        <span>Are you sure you want to delete this Centre?</span>
                    </div>
                    <div className="modal-footer">
                        <a href="#" className="btn btn-link link-secondary" data-bs-dismiss="modal">
                            Cancel
                        </a>
                        <button className="btn btn-primary ms-auto" data-bs-dismiss="modal" type="button" onClick={() => handleDelete(id)}>
                            Delete Centre
                        </button>
                    </div>
                    </div>
                </div>
            </div>
            {/* Delete Centre Modal */}


        </AuthenticatedLayout>
    );
}
