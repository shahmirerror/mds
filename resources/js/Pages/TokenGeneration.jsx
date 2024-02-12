import { useEffect, useState } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { IconCrosshair, IconClipboardText  } from '@tabler/icons-react';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function TokenGeneration({ centres }) {

    const [centre, setCentre] = useState(null);

    const [newToken, setToken] = useState(null);

    const fetchToken = (e, token_type) => {

        const requestData = {
            centre_id: centre.id,
            token_type: token_type
        };

        const requestJson = JSON.stringify(requestData);

        try {
            const response = fetch(route("token.new"), {
                method: "POST",
                body: requestJson,
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        // $('#preloader').hide();
                        setToken('M'+result.token_no)

                            toast.success('New Token has been generated!', {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                                });
                    },
                    (error) => {

                        toast.error('Something went wrong! Please try again :(', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            });
                    }
                );
        } catch (ex) {

            toast.error('Something went wrong! Please try again :(', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
    }

    useEffect(() => {
    }, []);

    return (
        <GuestLayout>
            <Head title="Token Generation" />
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                />
            <div className="page page-center" style={{backgroundImage: 'url(./assets/static/photos/mdsbackground.png)', height: '100vh', blur: "10%"}}>
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
                                <button className="btn btn-lg" onClick={(e) => fetchToken(e, 'Medical')}>
                                    <span className="mr-1"><IconCrosshair style={{width: "70px", height: "70px"}}/></span>
                                    <span style={{fontSize: "xx-large"}}>{'Medical Registration'}</span>
                                </button>
                            </div>
                            <div className="col-md-6 text-center">
                                <button className="btn btn-lg" onClick={(e) => fetchToken(e, 'Reporting')}>
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
