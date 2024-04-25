
import {useForm} from "@inertiajs/react";
export default function NavBar({user, logo}) {
    const {post} = useForm();
    const handleDelete = (e) =>
    {
        e.preventDefault();

        post(route('logout'));
    }
    return (
        <>
            <header className="navbar navbar-expand-md d-none d-lg-flex d-print-none">
                <div className="container-xl">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-menu" aria-controls="navbar-menu" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-nav flex-row order-md-last">
                    <div className="d-none d-md-flex">
                    <div className="nav-item dropdown d-none d-md-flex me-3">
                        <a href="#" className="nav-link px-0" data-bs-toggle="dropdown" tabindex="-1" aria-label="Show notifications">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" /><path d="M9 17v1a3 3 0 0 0 6 0v-1" /></svg>
                        {/* <span className="badge bg-red"></span> */}
                        </a>
                        <div className="dropdown-menu dropdown-menu-arrow dropdown-menu-end dropdown-menu-card">
                        <div className="card">
                            <div className="card-header">
                            <h3 className="card-title">Last updates</h3>
                            </div>
                            <div className="list-group list-group-flush list-group-hoverable">
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="nav-item dropdown">
                    <a href="#" className="nav-link d-flex lh-1 text-reset p-0" data-bs-toggle="dropdown" aria-label="Open user menu">
                        <span className="avatar avatar-sm" style={{backgroundImage: 'url('+user?.profile_photo_url+')'}}></span>
                        <div className="d-none d-xl-block ps-2">
                        <div>{user?.name}</div>
                        <div className="mt-1 small text-secondary">{user?.role?.name}</div>
                        </div>
                    </a>
                    <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                        {/* <a href={route('users.edit', user?.id)} className="dropdown-item">Profile</a>
                        <div className="dropdown-divider"></div> */}
                        {user?.role_id == 1 ?
                            <a href={route('organization-settings.index')} className="dropdown-item">Settings</a>
                        :user?.role_id == 2 ?
                            <a href={route('centre-settings.index')} className="dropdown-item">Settings</a>
                        :
                            <></>
                        }
                        <a href="#" type="button" className="dropdown-item" onClick={handleDelete}>Logout</a>
                    </div>
                    </div>
                </div>
                <div className="collapse navbar-collapse" id="navbar-menu">
                    <div>
                        {logo != null ?
                        <img src={logo} width="110" height="32" alt="Tabler" className="navbar-brand-image" />
                        :
                        <></>
                        }
                    </div>
                </div>
                </div>
            </header>
        </>
    );
}
