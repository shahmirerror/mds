import { useEffect, useState, useRef } from 'react';
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
import html2canvas from "html2canvas";

export default function NowServing(props) {

    const [centre, setCentre] = useState(props?.auth?.user?.centre?.details || null);
    const [counterID, setCounter] = useState(props.auth.user.role_id == 2 ?  1 : props?.auth?.modules?.[0]?.rights?.[3]?.permission_value);
    const wrapper_ref = useRef();
    const [newToken, setToken] = useState(null);

    const fetchToken = () => {

        const requestData = {
            centre_id: props.auth.user.centre.centre_id,
            process_id: 1,
            counter_no: counterID
        };

        const requestJson = JSON.stringify(requestData);

        try {
            const response = fetch(route("token.now_serving"), {
                method: "POST",
                body: requestJson,
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        // $('#preloader').hide();
                        setToken(result.now_serving)
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
        const intervalId = setInterval(() => {
            fetchToken();
          }, 2000);

          // Clear the interval when the component unmounts
          return () => clearInterval(intervalId);
    }, []);


    return (
        <GuestLayout>
            <Head title="Now Serving" />
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
            <div className="page page-center" style={{backgroundImage: 'url("assets/backgrounds/small-icons.png")',
                                                        backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundColor: 'royalblue',
    minHeight: '100vh'}}>
                <div className="p-6">

                    {centre !== null ?
                    <>
                        <div className="row g-4" id={'centre_logo'} style={{justifyContent:'center'}}>
                            <div className="col-md-3">
                                <div >
                                    <div className="text-center mb-4">
                                    <div className="card card-sm">
                                        <div className="card-body">
                                        <a href="#" className="navbar-brand navbar-brand-autodark">
                                            <img src={`./storage/app/public/centres/logos/${centre?.image}`} height="100" alt="" /></a>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {newToken && (
                        <div className="row align-items-center g-4" id={'choose_token'} style={{justifyContent: 'center', marginTop: '5rem'}}>
                            <div className="col-md-12 text-center" ref={wrapper_ref} style={{background: 'white'}}>
                                <span style={{fontSize:'200px', fontWeight: 900}}>Now Serving</span>
                                <br></br><br></br>
                                <span style={{fontSize:'250px', fontWeight: 900}}>{newToken}</span>
                            </div>
                        </div>
                        )}
                    </>
                    :
                        <></>
                    }
                </div>
            </div>
        </GuestLayout>
    );
}
