import { useState, useEffect } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import Header1 from '@/Components/Header1';
import Header2 from '@/Components/Header2'
import NavBar from '@/Components/NavBar';
import VerticalNav from '@/Components/VerticalNav'
import backGroundImg from "@/../../assets/static/photos/panel-background.png";


export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    const [modules, setModules] = useState([]);
    const [labs, setLabs] = useState([]);

    const [logoImgMain, setLogoMain] = useState();
    const [logoImgSecondary, setLogoSecondary] = useState();

    function mods_list() {
        if(user?.role_id == 1)
        {
            fetch(route("super.mods"))
                .then(res => res.json())

                .then(
                    (result) => {
                    setModules(result.modules)

                    },
                    (error) => {
                        console.log(error)
                    }
                )
        }
        else if(user?.role_id == 2)
        {
            fetch(route("admin.mods", user?.centre?.id))
                .then(res => res.json())

                .then(
                    (result) => {
                    setModules(result.modules);
                    setLabs(result.lab);

                    },
                    (error) => {
                        console.log(error)
                    }
                )
        }
        else if(user?.role_id == 3)
        {
            fetch(route("staff.mods", {'centre_id' : user?.centre?.centre_id, 'user_id':user?.id}))
                .then(res => res.json())

                .then(
                    (result) => {
                    setModules(result.modules);
                    setLabs(result.lab);

                    },
                    (error) => {
                        console.log(error)
                    }
                )
        }
    }

    const getImage = async (imageName) => {
        if(imageName !== null)
        {
            let splits = imageName.split('.');
            let newImageName = '';
            let ext = splits[splits?.length - 1];
            for(let i = 0; i < splits?.length - 1; i++)
            {
                newImageName += splits[i];
            }
            const importedImage = await import(`./../../../storage/app/public/centres/logos/${newImageName}.${ext}`);
            setLogoSecondary(importedImage.default);
        }
            const importedImage = await import(`@/../../assets/static/logo-mds.svg`);
            setLogoMain(importedImage.default);
    };

    useEffect(() => {
        mods_list();
        getImage(user?.centre ? user?.centre?.details?.image !== null ? user?.centre?.details?.image : null : null);
    }, [])


    return (
        <>
        <div className="page">

            {/* <Header1 user={user} logo={logoImg} />
            <div className="sticky-top">
            <Header2 modules={modules} labs={labs}/>
            </div> */}
            <VerticalNav role_id={user.role_id} logo={logoImgMain} modules={modules} labs={labs}/>
            <NavBar user={user} logo={logoImgSecondary} />
            <div className="page-wrapper">

                <main>{children}</main>
                <footer className="footer footer-transparent d-print-none">
                    <div className="container-xl">
                        <div className="row text-center align-items-center flex-row-reverse">

                            <div className="col-12 col-lg-auto mt-3 mt-lg-0">
                                <ul className="list-inline list-inline-dots mb-0">
                                    <li className="list-inline-item">
                                        Copyright &copy; 2023
                                        <a href="." className="link-secondary"> Medical Diagnostic System</a>.
                                        All rights reserved.
                                    </li>
                                    <li className="list-inline-item">
                                        <a href="#" className="link-secondary" rel="noopener">
                                        v2.0.0
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
        </>
    );
}
