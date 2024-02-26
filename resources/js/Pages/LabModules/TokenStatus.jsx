import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { IconPencil } from '@tabler/icons-react';
import { IconTrash } from '@tabler/icons-react';
import { IconPower } from '@tabler/icons-react';
import { IconRefresh } from '@tabler/icons-react';

export default function TokenStatus(props) {

    const { delete: deleteResource, put } = useForm();
    const [ id, setId ] = useState();
    const [pending, setPending] = useState(props.pending);
    const [in_process, setProcess] = useState(props.in_process);
    const [completed, setCompleted] = useState(props.completed);
    const [queryPending, setQueryPending] = useState(null);
    const [queryProcess, setQueryProcess] = useState(null);
    const [queryCompleted, setQueryCompleted] = useState(null);

    const handlePending = (event) => {
        const newQuery = event.target.value;
        setQueryPending(newQuery);
        const filteredResults = props.pending.filter(item =>
          Object.values(item).some(val =>
            typeof val === 'string' && val.toLowerCase().includes(newQuery.toLowerCase()) || typeof val === 'number' && val == newQuery
          )
        );
        setPending(filteredResults);
    };

    const handleCompleted = (event) => {
        const newQuery = event.target.value;
        setQueryCompleted(newQuery);
        const filteredResults = props.completed.filter(item =>
          Object.values(item).some(val =>
            typeof val === 'string' && val.toLowerCase().includes(newQuery.toLowerCase()) || typeof val === 'number' && val == newQuery
          )
        );
        setCompleted(filteredResults);
    };

    const handleProcess = (event) => {
        const newQuery = event.target.value;
        setQueryProcess(newQuery);
        const filteredResults = props.in_process.filter(item =>
          Object.values(item).some(val =>
            typeof val === 'string' && val.toLowerCase().includes(newQuery.toLowerCase()) || typeof val === 'number' && val == newQuery
          )
        );
        setProcess(filteredResults);
    };


    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Token Status</h2>}
        >
            <Head title="Token Status" />

            <div className="page-header d-print-none">
                <div className="container-xl">
                    <div className="row g-2 align-items-center">
                        <div className="col" style={{display: 'inline-flex', justifyContent: 'space-between'}}>
                            <h2 className="page-title">
                                Token Status
                            </h2>
                        </div>
                        <div className="col-md-1 align-items-center" style={{float: 'right'}}>
                            <h2 className="page-title">
                                <button className="btn btn-secondary btn-sm mr-5 btn-pill" onClick={() => location.reload()}>
                                    <IconRefresh />
                                </button>
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
                                        <input type="text" class="form-control form-control-sm" aria-label="Search candidate" value={queryCompleted} onChange={handleCompleted} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="table-responsive">
                                <table class="table card-table table-vcenter text-nowrap datatable">
                                <thead>
                                    <tr>
                                    <th>Token No</th>
                                    <th>Process Name</th>
                                    <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {completed.map((cand, index) => (
                                    <tr>
                                        <th>{cand?.token_no}</th>
                                        <th>{cand?.process_desc}</th>
                                        <th>{cand?.status}</th>
                                    </tr>
                                    ))}
                                </tbody>
                                </table>
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
                                        <input type="text" class="form-control form-control-sm" aria-label="Search candidate" value={queryPending} onChange={handlePending}  />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="table-responsive">
                                <table class="table card-table table-vcenter text-nowrap datatable">
                                <thead>
                                    <tr>
                                        <th>Token No</th>
                                        <th>Process Name</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pending.map((cand, index) => (
                                    <tr>
                                        <th>{cand?.token_no}</th>
                                        <th>{cand?.process_desc}</th>
                                        <th>{cand?.status}</th>
                                    </tr>
                                    ))}
                                </tbody>
                                </table>
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
                                        <input type="text" class="form-control form-control-sm" aria-label="Search candidate" value={queryProcess} onChange={handleProcess} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="table-responsive">
                                <table class="table card-table table-vcenter text-nowrap datatable">
                                <thead>
                                    <tr>
                                    <th>Token No</th>
                                    <th>Process Name</th>
                                    <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {in_process.map((cand, index) => (
                                    <tr>
                                        <th>{cand?.token_no}</th>
                                        <th>{cand?.process_desc}</th>
                                        <th>{cand?.status}</th>
                                    </tr>
                                    ))}
                                </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>


        </AuthenticatedLayout>
    );
}
