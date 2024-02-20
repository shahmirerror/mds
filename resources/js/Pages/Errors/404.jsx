import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Chart from 'react-apexcharts';
import {useState, useEffect} from 'react';
import Select from 'react-select'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
export default function Error404(props) {

    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Error 404</h2>}
        >
            <Head title="Error 404" />
            <div className="page page-center">
                <div className="container-tight py-4">
                    <div className="empty">
                        <div className="empty-header">404</div>
                        <p className="empty-title">Oops… You just found an error page</p>
                        <p className="empty-subtitle text-secondary">
                            We are sorry but the page you are looking for was not found
                        </p>
                        <div className="empty-action">
                            <a href="." className="btn btn-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M5 12l6 6" /><path d="M5 12l6 -6" /></svg>
                                Take me home
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
