import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />
            <div className="page page-center">
                <div className="container container-normal py-4">
                    <div className="row align-items-center g-4">
                    <div className="col-lg">
                        <div className="container-tight">
                        <div className="text-center mb-4">
                            <a href="." className="navbar-brand navbar-brand-autodark">
                                <img src="./assets/static/logomls.svg" height="100" alt="" /></a>
                        </div>
                        <div className="card card-md">
                            <div className="card-body">
                                <h2 className="h2 text-center mb-4">Login to your account</h2>
                                <form onSubmit={submit} autoComplete="off">
                                    <div>
                                        <InputLabel htmlFor="username" value="Username" />

                                        <input
                                            id="username"
                                            type="text"
                                            name="username"
                                            value={data.email}
                                            className="form-control"
                                            autoComplete="username"
                                            onChange={(e) => setData('username', e.target.value)}
                                        />

                                        <InputError message={errors.email} className="mt-2" />
                                    </div>

                                    <div className="mt-4">
                                        <label className="form-label">Password</label>

                                        <input
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            className="form-control"
                                            autoComplete="current-password"
                                            onChange={(e) => setData('password', e.target.value)}
                                        />

                                        <InputError message={errors.password} className="mt-2" />
                                    </div>

                                    <div className="form-footer">

                                        <button type="submit" className="btn btn-primary w-100" disabled={processing}>
                                            Log in
                                        </button>
                                    </div>
                                </form>
                                </div>
                        </div>
                        </div>
                    </div>
                    <div className="col-lg d-none d-lg-block">
                        <img src="./assets/static/illustrations/undraw_secure_login_pdn4.svg" height="300" className="d-block mx-auto" alt="" />
                    </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
