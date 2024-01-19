

export default function Header2({modules, labs}) {
    return (
        <>
            <header className="navbar navbar-expand-md ">
                <div className="navbar-collapse" id="navbar-menu">
                    <div className="navbar">
                        <div className="container-xl">
                        <ul className="navbar-nav">
                            {modules.map((mod, index) => (

                                        <li className="nav-item">
                                            <a className="nav-link" href={mod.route != null ? route(`${mod.route}`) : '#'} >
                                                <span className="nav-link-icon d-md-none d-lg-inline-block">
                                                    {/* <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l-2 0l9 -9l9 9l-2 0" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" /><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg> */}
                                                </span>
                                                <span className="nav-link-title">
                                                    {mod.title}
                                                </span>
                                            </a>
                                        </li>
                            ))}
                            <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#navbar-base" data-bs-toggle="dropdown" data-bs-auto-close="outside" role="button" aria-expanded="false" >
                                                <span className="nav-link-icon d-md-none d-lg-inline-block">
                                                    {/* <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l-2 0l9 -9l9 9l-2 0" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" /><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg> */}
                                                </span>
                                                <span className="nav-link-title">
                                                {'Centre Modules'}
                                                </span>
                                            </a>
                                            <div class="dropdown-menu">
                                        {labs.map((lab, index) => (
                                                <>
                                                <div class="dropdown-menu-columns">
                                                    <div class="dropdown-menu-column">
                                                        <a class="dropdown-item" href={lab.route != null ? route(`${lab.route}`) : '#'}>
                                                        {lab?.title}
                                                        </a>
                                                    </div>
                                                </div>
                                                </>
                                        ))}
                                        </div>
                                        </li>
                        </ul>
                        {/* <div className="my-2 my-md-0 flex-grow-1 flex-md-grow-0 order-first order-md-last">
                            <form action="./" method="get" autocomplete="off" novalidate>
                            <div className="input-icon">
                                <span className="input-icon-addon">

                                <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
                                </span>
                                <input type="text" value="" className="form-control" placeholder="Search…" aria-label="Search in website" />
                            </div>
                            </form>
                        </div> */}
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}
