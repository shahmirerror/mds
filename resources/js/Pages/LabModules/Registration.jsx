import { useEffect, useState } from 'react';
import Checkbox from '@/Components/Checkbox';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { IconCrosshair, IconClipboardText  } from '@tabler/icons-react';

export default function Registration({auth}) {

    const [centre, setCentre] = useState(null);
    useEffect(() => {
    }, []);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Registration Desk" />

            <div className="page-header d-print-none">
                <div className="container-xl">
                    <div className="row g-2 align-items-center">
                    <div className="col">
                        <h2 className="page-title">
                        Registration Desk
                        </h2>
                    </div>
                    </div>
                </div>
            </div>

            <div className="page-body">
                <div className="container-xl">
                    <div className="row row-cards">
                    <div className="col-md-6">
                        <div className="row row-cards">
                        <div className="col-12">
                            <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Top users</h3>
                            </div>
                            <div className="card-body">
                                <div className="row g-3">
                                <div className="col-6">
                                    <div className="row g-3 align-items-center">
                                    <a href="#" className="col-auto">
                                        <span className="avatar" style={{backgroundImage: "url(./static/avatars/000m.jpg)"}}>
                                        <span className="badge bg-red"></span></span>
                                    </a>
                                    <div className="col text-truncate">
                                        <a href="#" className="text-reset d-block text-truncate">Paweł Kuna</a>
                                        <div className="text-secondary text-truncate mt-n1">2 days ago</div>
                                    </div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="row g-3 align-items-center">
                                    <a href="#" className="col-auto">
                                        <span className="avatar">
                                        <span className="badge bg-x"></span>JL</span>
                                    </a>
                                    <div className="col text-truncate">
                                        <a href="#" className="text-reset d-block text-truncate">Jeffie Lewzey</a>
                                        <div className="text-secondary text-truncate mt-n1">3 days ago</div>
                                    </div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="row g-3 align-items-center">
                                    <a href="#" className="col-auto">
                                        <span className="avatar" style={{backgroundImage: "url(./static/avatars/002m.jpg)"}}></span>
                                    </a>
                                    <div className="col text-truncate">
                                        <a href="#" className="text-reset d-block text-truncate">Mallory Hulme</a>
                                        <div className="text-secondary text-truncate mt-n1">today</div>
                                    </div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="row g-3 align-items-center">
                                    <a href="#" className="col-auto">
                                        <span className="avatar" style={{backgroundImage: "url(./static/avatars/003m.jpg)"}}>
                                        <span className="badge bg-green"></span></span>
                                    </a>
                                    <div className="col text-truncate">
                                        <a href="#" className="text-reset d-block text-truncate">Dunn Slane</a>
                                        <div className="text-secondary text-truncate mt-n1">6 days ago</div>
                                    </div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="row g-3 align-items-center">
                                    <a href="#" className="col-auto">
                                        <span className="avatar" style={{backgroundImage: "url(./static/avatars/000f.jpg)"}}>
                                        <span className="badge bg-red"></span></span>
                                    </a>
                                    <div className="col text-truncate">
                                        <a href="#" className="text-reset d-block text-truncate">Emmy Levet</a>
                                        <div className="text-secondary text-truncate mt-n1">3 days ago</div>
                                    </div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="row g-3 align-items-center">
                                    <a href="#" className="col-auto">
                                        <span className="avatar" style={{backgroundImage: "url(./static/avatars/001f.jpg)"}}>
                                        <span className="badge bg-yellow"></span></span>
                                    </a>
                                    <div className="col text-truncate">
                                        <a href="#" className="text-reset d-block text-truncate">Maryjo Lebarree</a>
                                        <div className="text-secondary text-truncate mt-n1">2 days ago</div>
                                    </div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="row g-3 align-items-center">
                                    <a href="#" className="col-auto">
                                        <span className="avatar">
                                        <span className="badge bg-x"></span>EP</span>
                                    </a>
                                    <div className="col text-truncate">
                                        <a href="#" className="text-reset d-block text-truncate">Egan Poetz</a>
                                        <div className="text-secondary text-truncate mt-n1">4 days ago</div>
                                    </div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="row g-3 align-items-center">
                                    <a href="#" className="col-auto">
                                        <span className="avatar" style={{backgroundImage: "url(./static/avatars/002f.jpg)"}}>
                                        <span className="badge bg-yellow"></span></span>
                                    </a>
                                    <div className="col text-truncate">
                                        <a href="#" className="text-reset d-block text-truncate">Kellie Skingley</a>
                                        <div className="text-secondary text-truncate mt-n1">6 days ago</div>
                                    </div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="row g-3 align-items-center">
                                    <a href="#" className="col-auto">
                                        <span className="avatar" style={{backgroundImage: "url(./static/avatars/003f.jpg)"}}>
                                        <span className="badge bg-x"></span></span>
                                    </a>
                                    <div className="col text-truncate">
                                        <a href="#" className="text-reset d-block text-truncate">Christabel Charlwood</a>
                                        <div className="text-secondary text-truncate mt-n1">today</div>
                                    </div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="row g-3 align-items-center">
                                    <a href="#" className="col-auto">
                                        <span className="avatar">
                                        <span className="badge bg-x"></span>HS</span>
                                    </a>
                                    <div className="col text-truncate">
                                        <a href="#" className="text-reset d-block text-truncate">Haskel Shelper</a>
                                        <div className="text-secondary text-truncate mt-n1">yesterday</div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Contacts</h3>
                            </div>
                            <div className="list-group list-group-flush">
                                <div className="list-group-item">
                                <div className="row align-items-center">
                                    <div className="col-auto"><input type="checkbox" className="form-check-input" /></div>
                                    <div className="col-auto">
                                    <a href="#">
                                        <span className="avatar" style={{backgroundImage: "url(./static/avatars/003f.jpg)"}}></span>
                                    </a>
                                    </div>
                                    <div className="col text-truncate">
                                    <a href="#" className="text-reset d-block">Christabel Charlwood</a>
                                    <div className="d-block text-secondary text-truncate mt-n1">Compressed Sass output support (#29702)</div>
                                    </div>
                                </div>
                                </div>
                                <div className="list-group-item active">
                                <div className="row align-items-center">
                                    <div className="col-auto"><input type="checkbox" className="form-check-input" checked="" /></div>
                                    <div className="col-auto">
                                    <a href="#">
                                        <span className="avatar">HS</span>
                                    </a>
                                    </div>
                                    <div className="col text-truncate">
                                    <a href="#" className="text-reset d-block">Haskel Shelper</a>
                                    <div className="d-block text-secondary text-truncate mt-n1">Set vertical-align on .form-check-input (#29521)</div>
                                    </div>
                                </div>
                                </div>
                                <div className="list-group-item">
                                <div className="row align-items-center">
                                    <div className="col-auto"><input type="checkbox" className="form-check-input" /></div>
                                    <div className="col-auto">
                                    <a href="#">
                                        <span className="avatar" style={{backgroundImage: "url(./static/avatars/006m.jpg)"}}></span>
                                    </a>
                                    </div>
                                    <div className="col text-truncate">
                                    <a href="#" className="text-reset d-block">Lorry Mion</a>
                                    <div className="d-block text-secondary text-truncate mt-n1">Keep themed appearance for print (#29714)</div>
                                    </div>
                                </div>
                                </div>
                                <div className="list-group-item">
                                <div className="row align-items-center">
                                    <div className="col-auto"><input type="checkbox" className="form-check-input" /></div>
                                    <div className="col-auto">
                                    <a href="#">
                                        <span className="avatar" style={{backgroundImage: "url(./static/avatars/004f.jpg)"}}></span>
                                    </a>
                                    </div>
                                    <div className="col text-truncate">
                                    <a href="#" className="text-reset d-block">Leesa Beaty</a>
                                    <div className="d-block text-secondary text-truncate mt-n1">Use double quotes in `.stylelintrc` (#29709)</div>
                                    </div>
                                </div>
                                </div>
                                <div className="list-group-item active">
                                <div className="row align-items-center">
                                    <div className="col-auto"><input type="checkbox" className="form-check-input" checked="" /></div>
                                    <div className="col-auto">
                                    <a href="#">
                                        <span className="avatar" style={{backgroundImage: "url(./static/avatars/007m.jpg)"}}></span>
                                    </a>
                                    </div>
                                    <div className="col text-truncate">
                                    <a href="#" className="text-reset d-block">Perren Keemar</a>
                                    <div className="d-block text-secondary text-truncate mt-n1">Regenerate package-lock.json (#29695)</div>
                                    </div>
                                </div>
                                </div>
                                <div className="list-group-item">
                                <div className="row align-items-center">
                                    <div className="col-auto"><input type="checkbox" className="form-check-input" /></div>
                                    <div className="col-auto">
                                    <a href="#">
                                        <span className="avatar">SA</span>
                                    </a>
                                    </div>
                                    <div className="col text-truncate">
                                    <a href="#" className="text-reset d-block">Sunny Airey</a>
                                    <div className="d-block text-secondary text-truncate mt-n1">Switch to the Coveralls Action (#29478)</div>
                                    </div>
                                </div>
                                </div>
                                <div className="list-group-item">
                                <div className="row align-items-center">
                                    <div className="col-auto"><input type="checkbox" className="form-check-input" /></div>
                                    <div className="col-auto">
                                    <a href="#">
                                        <span className="avatar" style={{backgroundImage: "url(./static/avatars/009m.jpg)"}}></span>
                                    </a>
                                    </div>
                                    <div className="col text-truncate">
                                    <a href="#" className="text-reset d-block">Geoffry Flaunders</a>
                                    <div className="d-block text-secondary text-truncate mt-n1">Fix npm audit vulnerability (#29677)</div>
                                    </div>
                                </div>
                                </div>
                                <div className="list-group-item active">
                                <div className="row align-items-center">
                                    <div className="col-auto"><input type="checkbox" className="form-check-input" checked="" /></div>
                                    <div className="col-auto">
                                    <a href="#">
                                        <span className="avatar" style={{backgroundImage: "url(./static/avatars/010m.jpg)"}}></span>
                                    </a>
                                    </div>
                                    <div className="col text-truncate">
                                    <a href="#" className="text-reset d-block">Thatcher Keel</a>
                                    <div className="d-block text-secondary text-truncate mt-n1">config.yml: update popper.js to v1.16.0 (#29624)</div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Links and buttons</h3>
                            </div>
                            <div className="list-group list-group-flush">
                                <a href="#" className="list-group-item list-group-item-action active" aria-current="true">
                                The current link item
                                </a>
                                <a href="#" className="list-group-item list-group-item-action">A second link item</a>
                                <a href="#" className="list-group-item list-group-item-action">A third link item</a>
                                <a href="#" className="list-group-item list-group-item-action">A fourth link item</a>
                                <a className="list-group-item list-group-item-action disabled">A disabled link item</a>
                            </div>
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
