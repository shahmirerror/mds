import { useEffect, useState } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { IconCrosshair, IconClipboardText  } from '@tabler/icons-react';

export default function TokenGeneration({ centres }) {

    const [centre, setCentre] = useState(null);
    useEffect(() => {
    }, []);

    return (
        <GuestLayout>
            <Head title="Token Generation" />
            <div className="page page-center" style={{backgroundColor: "#0054a6", height: "100vh"}}>
                <div className="p-6">

                    {centre == null ?
                    <>
                        <div className="row g-4" id={'project_logo'}>
                            <div className="col-lg">
                                <div style={{maxWidth: "15rem"}}>
                                    <div className="text-center mb-4">
                                    <div className="card card-sm">
                                        <div className="card-body">
                                        <a href="." className="navbar-brand navbar-brand-autodark">
                                            <img src="./assets/static/logomls.svg" height="50" alt="" /></a>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row align-items-center g-4 mt-7" id={'choose_centres'}>
                            {centres.map((centre, index) => (
                                <div className="col-md-3" onClick={() => setCentre(centre)}>
                                    <div className="card card-sm">
                                        <div className="card-body" style={{justifyContent: 'center', display: 'flex'}}>
                                            {centre?.image !== null ?
                                                <img src={`./storage/app/public/centres/logos/${centre?.image}`}  height="100"/>
                                            :
                                                <h1 className="text-center">{centre?.name}</h1>
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                    :
                        <></>
                    }

                    {centre !== null ?
                    <>
                        <div className="row g-4" id={'centre_logo'}>
                            <div className="col-lg">
                                <div style={{maxWidth: "15rem"}}>
                                    <div className="text-center mb-4">
                                    <div className="card card-sm">
                                        <div className="card-body">
                                        <a href="#" className="navbar-brand navbar-brand-autodark">
                                            <img src={`./storage/app/public/centres/logos/${centre?.image}`} height="50" alt="" /></a>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row align-items-center g-4 mt-7" id={'choose_token'}>
                            <div className="col-md-6 text-center">
                                <button className="btn btn-lg">
                                    <span className="mr-1"><IconCrosshair style={{width: "70px", height: "70px"}}/></span>
                                    <span style={{fontSize: "xx-large"}}>{'Medical Registration'}</span>
                                </button>
                            </div>
                            <div className="col-md-6 text-center">
                                <button className="btn btn-lg">
                                    <span><IconClipboardText style={{width: "70px", height: "70px"}}/></span>
                                    <span style={{fontSize: "xx-large"}}>{'Report Collection'}</span>
                                </button>
                            </div>
                        </div>
                    </>
                    :
                        <></>
                    }
                </div>
            </div>
        </GuestLayout>
    );
}
