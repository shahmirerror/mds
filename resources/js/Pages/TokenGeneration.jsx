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

export default function TokenGeneration(props) {

    const [centre, setCentre] = useState(props?.auth?.user?.centre?.details || null);
    const wrapper_ref = useRef();
    const [newToken, setToken] = useState(null);

    const fetchToken = (e, token_type) => {

        const requestData = {
            centre_id: centre.id,
            token_type: token_type,
            printerIP: props.printerIP
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
                        // setToken(result.new_token)

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
                        // handlePrint(result.url);

                        const a = document.createElement('a');
                        a.href = result.url;
                        a.download = 'token'; // You can set the desired filename here
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                    },
                    (error) => {

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

    const handlePrint = async (url) => {
        // Fetch the text file content
        fetch(url)
            .then(response => response.text())
            .then(text => {
                // Create a new window with the text content
                const newWin = window.open('', '_blank');

                // Write the text content to the new window
                newWin.document.write(`
                    <html>
                        <head>
                            <style>
                                @media print {
                                    /* Adjust print-specific styles here */
                                    body {
                                        font-family: Arial, sans-serif;
                                        font-size: 10px;
                                    }
                                    #bottomText {
                                        position: absolute;
                                        bottom: 0;
                                    }
                                }
                            </style>
                        </head>
                        <body onload="window.print()">
                            <div id="bottomText">${text}</div>
                        </body>
                    </html>
                `);

                newWin.document.close();
            })
            .catch(error => console.error('Error fetching text file:', error));
    };


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
            <div className="page page-center" style={{backgroundImage: 'url("assets/backgrounds/small-icons.png")',
                                                        backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundColor: 'royalblue',
    minHeight: '100vh'}}>
                <div className="p-6">

                    {centre == null ?
                    <>
                        <div className="row g-4" id={'project_logo'} style={{justifyContent:'center'}}>
                            <div className="col-md-3">
                                <div >
                                    <div className="text-center mb-4">
                                    <div className="card card-sm">
                                        <div className="card-body">
                                        <a href="." className="navbar-brand navbar-brand-autodark">
                                            <img src="./assets/static/logomls.svg" height="100" alt="" /></a>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row align-items-center g-4 mt-7" id={'choose_centres'}>
                            {props.centres.map((centre, index) => (
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
                        <div className="row g-4" id={'centre_logo'} style={{justifyContent: 'center'}}>
                            <div className="col-md-3">
                                <div>
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
                        <div className="row align-items-center g-4" id={'choose_token_type'} style={{marginTop: '5rem', justifyContent: 'center'}}>
                            <div className="col-md-12 text-center">
                                <button className="btn btn-lg btn-primary" onClick={(e) => fetchToken(e, 'Medical')}>
                                    <span className="mr-1"><IconCrosshair style={{width: "100px", height: "100px"}}/></span>
                                    <span style={{fontSize: "100px"}}>{'Medical Registration'}</span>
                                </button>
                            </div>
                        </div>
                        <div className="row align-items-center g-4" id={'choose_token_type'} style={{marginTop: '5rem', justifyContent: 'center'}}>
                            <div className="col-md-12 text-center">
                                <button className="btn btn-lg btn-primary" onClick={(e) => fetchToken(e, 'Reporting')}>
                                    <span><IconClipboardText style={{width: "100px", height: "100px"}}/></span>
                                    <span style={{fontSize: "100px"}}>{'Report Collection'}</span>
                                </button>
                            </div>
                        </div>
                        {newToken && (
                        <div className="row align-items-center g-4 mt-7" id={'choose_token'} style={{justifyContent: 'center'}}>
                            <div className="col-md-4 text-center" ref={wrapper_ref} style={{background: 'white'}}>
                                <span style={{fontSize:'40px', fontWeight: 900}}>Last Token Printed</span>
                                <br></br>
                                <span style={{fontSize:'30px'}}>{newToken}</span>
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
