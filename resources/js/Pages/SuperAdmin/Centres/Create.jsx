import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { IconTrash } from '@tabler/icons-react';
import { IconUserPlus } from '@tabler/icons-react';

export default function Create(props) {
    const [rows, setRows] = useState([{id: 1, username: '', password: '', role: 'Staff'}]);
    const mods = useState([props.modules]);


    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        phone: '',
        city: '',
        country: '',
        address: '',
        email: '',
        fax: '',
        code: '',
        logo: '',
        users: rows,
        modules: mods[0][0]
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
    }

    const handleAddRow = () => {
        const newRow = { id: rows.length + 1, username: '', password: '', role: 'Staff' };
        setRows([...rows, newRow]);
    };

    const handleInputChange = (event, field, id) => {
        const updatedRows = rows.map((row) => {
          if (row.id === id) {
            return {
              ...row,
              [field]: event.target.value,
            };
          }
          return row;
        });
        setRows(updatedRows);
        setData('users', updatedRows);
      };

    const handleDeleteRow = (id) => {
        const filteredRows = rows.filter((row) => row.id !== id);
        setRows(filteredRows);
    };

    const handleModStatus = (e, id, index) => {


        let status = e.target.checked ? 'On' : 'Off';
        let status2 = e.target.checked;
        // e.target.checked = status === 'Off' ? false : true;

        mods[0][0][index].status = status2;

        setData('modules',mods[0][0]);

        document.getElementById(`switchlabel${index}`).innerHTML = status;

        // console.log(document.getElementById(`switch${index}`).checked);
        // // e.target.checked = status === 'Off' ? false : true;

        // console.log(data.modules);
    }

    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Centres Management</h2>}
        >
            <Head title="Centres Management" />

            <div className="page-header d-print-none">
                <div className="container-xl">
                    <div className="row g-2 align-items-center">
                    <div className="col">
                        <h2 className="page-title">
                        Create a new Centre
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
                    <h3 className="card-title">Logo</h3>
                    <div className="row align-items-center">
                      <div className="col-auto">
                        <input className="form-control" type="file" name="logo" onChange={handleFile}/>
                      </div>
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
                        <a href="#" type="button" className="btn btn-sm btn-success" style={{float: 'right', width: '5%'}} onClick={handleAddRow}><IconUserPlus /></a>
                        <div style={{clear: 'both'}}></div>
                    </div>
                    {rows.map((row, index) => (
                        <div className="row mb-3" key={index}>
                        <div className="col-sm" style={{display: 'flex', alignItems: 'end'}}>
                            <button type="button" className="btn btn-md btn-danger" onClick={() => handleDeleteRow(row.id)}><IconTrash /></button>
                        </div>
                        <div className="col-md">
                            <div className="form-label">Username</div>
                            <input type="text" className="form-control" name="username" value={row.username} onChange={(event) => handleInputChange(event, 'username', row.id)} />
                        </div>
                        <div className="col-md">
                            <div className="form-label">Password</div>
                            <input type="password" className="form-control" name="password" value={row.password} onChange={(event) => handleInputChange(event, 'password', row.id)} />
                        </div>
                        <div className="col-md">
                            <div className="form-label">Role</div>
                            <select class="form-select" name="role" onChange={(event) => handleInputChange(event, 'role', row.id)}>
                                <option value="Admin">Admin</option>
                                <option value="Staff" selected>Staff</option>
                                <option value="Token">Token</option>
                                <option value="Feedback">Feedback</option>
                            </select>
                        </div>
                        </div>
                    ))}
                  </div>

                  <div className="card-body" id="modules" style={{display: 'none'}}>
                    <h3 className="card-title">Centre Lab Modules</h3>
                    <hr></hr>
                    {data.modules.map((mod, index) => (
                    <>
                        {/* <div style={{content: "", height: "100%", width: "1px", backgroundColor: 'black',position: "absolute", top: 0, right: 0}}> */}
                            <div className="col-md-5 m-3" style={{display: 'inline-flex',justifyContent: 'space-between'}}>
                                <div>
                                    <div className="form-label">{mod?.title}</div>
                                    <div className="form-desc">{mod?.description}</div>
                                </div>
                                <div>
                                    <label className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox" id={`switch${index}`} name={`switch${index}`} checked={mod.status} onChange={(e) => handleModStatus(e, mod.id, index)}/>
                                        <span class="form-check-label" id={`switchlabel${index}`}>{mod?.status ? 'On' : 'Off'}</span>
                                    </label>
                                </div>
                            </div>
                        {(index+1) % 2 == 0 ?
                            <hr></hr>
                            :
                            ''
                        }
                    </>
                    ))}
                  </div>

                  <div className="card-footer bg-transparent mt-auto">
                    <div className="btn-list justify-content-end">
                        <a href={route('centres.index')} className="btn">
                            Cancel
                        </a>
                        <a href="#" className="btn btn-primary" type="button" onClick={handleSubmit} disabled={processing}>
                            Submit
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
