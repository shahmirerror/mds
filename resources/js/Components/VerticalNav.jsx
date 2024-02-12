
import {useForm} from "@inertiajs/react";
export default function VerticalNav({modules, logo, labs}) {
    const {post} = useForm();
    const handleDelete = (e) =>
    {
        e.preventDefault();

        post(route('logout'));
    }
    return (
        <>
            <aside className="navbar navbar-vertical navbar-expand-lg " data-bs-theme="light">
                <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#sidebar-menu" aria-controls="sidebar-menu" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <h1 className="navbar-brand navbar-brand">
                    <a href=".">
                        <img src={logo} width="110" height="32" alt="Tabler" className="navbar-brand-image" />
                    </a>
                </h1>
                <div className="collapse navbar-collapse" id="sidebar-menu">
                    <ul className="navbar-nav pt-lg-3">
                    {modules.map((mod, index) => (
                        <li className="nav-item">
                            <a className="nav-link" href={mod.route != null ? route(`${mod.route}`) : '#'} >
                                <span className="nav-link-title">
                                {mod.title}
                                </span>
                            </a>
                        </li>
                    ))}
                    {labs?.length > 0 &&
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#navbar-base" data-bs-toggle="dropdown" data-bs-auto-close="false" role="button" aria-expanded="false" >
                                <span className="nav-link-title">
                                {'Centre Modules'}
                                </span>
                            </a>
                            <div className="dropdown-menu">
                                {labs.map((lab, index) => (
                                <div className="dropdown-menu-columns">
                                    <div className="dropdown-menu-column">
                                        <a className="dropdown-item" href={lab.route != null ? route(`${lab.route}`) : '#'}>
                                        {lab?.title}
                                        </a>
                                    </div>
                                </div>
                                ))}
                            </div>
                        </li>
                    }
                    </ul>
                </div>
                </div>
            </aside>
        </>
    );
}
