import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { IconPencil } from '@tabler/icons-react';
import { IconTrash } from '@tabler/icons-react';
import { IconPower } from '@tabler/icons-react';

export default function Index(props) {

    const { delete: deleteResource, put } = useForm();
    const [ id, setId ] = useState();

    useEffect(() => {
      console.log(props.candidates, 'hello');
    }, [])


    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Candidates</h2>}
        >
            <Head title="Centres Management" />

            <div className="page-header d-print-none">
                <div className="container-xl">
                    <div className="row g-2 align-items-center">
                        <div className="col" style={{display: 'inline-flex', justifyContent: 'space-between'}}>
                            <h2 className="page-title">
                            Candidates
                            </h2>
                            <div>
                                <select className="form-select">
                                    <option value="list">List</option>
                                    <option value="token_process">Token Process</option>
                                    <option value="medical_status">Medical Status</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="page-body">
            <div class="container-xl">
                <div class="card">

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
                          <th>Candidate Name</th>
                          <th>Passport Number</th>
                          <th>CNIC Number</th>
                          <th>Gender</th>
                          <th>Date of Birth</th>
                          <th>Created At</th>
                        </tr>
                      </thead>
                      <tbody>
                        {props.candidates.map((cand, index) => (
                        <tr>
                            <td>
                                <Link href={route('candidates.show', cand?.candidate_id)}>{cand?.candidate_name}</Link>
                            </td>
                            <td>
                                <span class="text-secondary">
                                    <Link href={route('candidates.show', cand?.candidate_id)}>{cand?.passport_no}</Link>
                                </span>
                            </td>
                            <td>
                                <span class="text-secondary">
                                    <Link href={route('candidates.show', cand?.candidate_id)}>{cand?.cnic}</Link>
                                </span>
                            </td>
                            <td>
                                <span class="text-secondary">{cand?.gender}</span>
                            </td>
                            <td>
                                <span class="text-secondary">{cand?.dob}</span>
                            </td>
                            <td>
                                <span class="text-secondary">{cand?.created_at}</span>
                            </td>
                        </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div class="card-footer d-flex align-items-center">
                  </div>
                </div>
              </div>
            </div>


        </AuthenticatedLayout>
    );
}
