import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { IconPencil } from '@tabler/icons-react';
import { IconTrash } from '@tabler/icons-react';
import { IconPower } from '@tabler/icons-react';

export default function TokenStatus(props) {

    const { delete: deleteResource, put } = useForm();
    const [ id, setId ] = useState();


    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Token Status</h2>}
        >
            <Head title="Centres Management" />

            <div className="page-header d-print-none">
                <div className="container-xl">
                    <div className="row g-2 align-items-center">
                        <div className="col" style={{display: 'inline-flex', justifyContent: 'space-between'}}>
                            <h2 className="page-title">
                                Token Status
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="page-body">
                <div class="container-xl">
                    <div className='row'>
                    <div className="col-4">
                        <div class="card">
                            <div className="card-header">
                                <h4>Completed</h4>
                            </div>
                            <div class="card-body border-bottom py-3">
                                <div class="d-flex">
                                    <div class="ms-auto text-secondary">
                                        Search:
                                        <div class="ms-2 d-inline-block">
                                        <input type="text" class="form-control form-control-sm" aria-label="Search candidate" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="table-responsive">
                                <table class="table card-table table-vcenter text-nowrap datatable">
                                <thead>
                                    <tr>
                                    <th>#</th>
                                    <th>Candidate Name</th>
                                    <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                                </table>
                            </div>
                            <div class="card-footer d-flex align-items-center">
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div class="card">
                            <div className="card-header">
                                <h4>Pending</h4>
                            </div>
                            <div class="card-body border-bottom py-3">
                                <div class="d-flex">
                                    <div class="ms-auto text-secondary">
                                        Search:
                                        <div class="ms-2 d-inline-block">
                                        <input type="text" class="form-control form-control-sm" aria-label="Search candidate" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="table-responsive">
                                <table class="table card-table table-vcenter text-nowrap datatable">
                                <thead>
                                    <tr>
                                    <th>#</th>
                                    <th>Candidate Name</th>
                                    <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                                </table>
                            </div>
                            <div class="card-footer d-flex align-items-center">
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div class="card">
                            <div className="card-header">
                                <h4>In Process</h4>
                            </div>
                            <div class="card-body border-bottom py-3">
                                <div class="d-flex">
                                    <div class="ms-auto text-secondary">
                                        Search:
                                        <div class="ms-2 d-inline-block">
                                        <input type="text" class="form-control form-control-sm" aria-label="Search candidate" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="table-responsive">
                                <table class="table card-table table-vcenter text-nowrap datatable">
                                <thead>
                                    <tr>
                                    <th>#</th>
                                    <th>Candidate Name</th>
                                    <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                                </table>
                            </div>
                            <div class="card-footer d-flex align-items-center">
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>


        </AuthenticatedLayout>
    );
}
