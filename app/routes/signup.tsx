import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router";

export function meta() {
    return [
        { title: "Sign Up - SpeakMaster" },
        { name: "description", content: "Create your account" },
    ];
}

interface FormValues {
    givenName: string;
    familyName: string;
    email: string;
    password: string;
}

const validate = (values: FormValues) => {
    const errors = {password: ''}

    if (values.password.length < 8) {
        errors.password = "Password must be at least 8 characters long";
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(values.password)) {
        errors.password = "Password must contain a special character";
    }
    if (!/[0-9]/.test(values.password)) {
        errors.password = "Password must contain a number";
    }
    if (!/[A-Z]/.test(values.password)) {
        errors.password = "Password must contain an uppercase letter";
    }
    return errors;
}

export default function Signup() {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            givenName: '',
            familyName: '',
            email: '',
            password: ''
        },
        validate,
        onSubmit: async values => {
            const email = values.email;
            const givenName = values.givenName;
            const familyName = values.familyName;
            const password = values.password;
            if (!email) return setMessage("Podaj adres e-mail");
            if (!givenName) return setMessage("Podaj imię");
            if (!familyName) return setMessage("Podaj nazwisko");
            if (!password) return setMessage("Podaj hasło");

            try {
                const res = await fetch("/api/v1/auth/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password, name: { givenName, familyName } }),
                });

                const data = await res.json();

                if (res.ok && data.accessToken) {
                    localStorage.setItem('accessToken', data.accessToken);
                    localStorage.setItem('refreshToken', data.refreshToken);
                    return navigate("/dashboard");
                }

                setMessage(res.ok ? data.message : data.error);
            } catch {
                setMessage(
                    "Nie znaleziono serwera. Sprawdź połączenie z internetem"
                );
            }
        }
    })

    const [message, setMessage] = useState("");

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            <div className="max-w-lg w-full space-y-8 relative z-10">
                <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10 backdrop-blur-sm border border-gray-100">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Zarejestruj się</h1>
                        <p className="text-gray-600">Stwórz konto i zacznij trening</p>
                    </div>

                    <form className="space-y-6" onSubmit={formik.handleSubmit}>
                        <div className="flex gap-4">
                            <div>
                                <label htmlFor="givenName" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Imię*
                                </label>
                                <input
                                    type="text"
                                    id="givenName"
                                    {...formik.getFieldProps('givenName')}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none text-gray-600"
                                    placeholder="Wpisz swoje imię"
                                />
                            </div>

                            <div>
                                <label htmlFor="familyName" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Nazwisko*
                                </label>
                                <input
                                    type="text"
                                    id="familyName"
                                    {...formik.getFieldProps('familyName')}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none text-gray-600"
                                    placeholder="Wpisz swoje nazwisko"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                Adres e-mail*
                            </label>
                            <input
                                type="email"
                                id="email"
                                {...formik.getFieldProps('email')}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none text-gray-600"
                                placeholder="twoj@email.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                                Hasło*
                            </label>
                            <input
                                type="password"
                                id="password"
                                {...formik.getFieldProps('password')}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none text-gray-600"
                                placeholder="Wpisz bezpieczne hasło"
                            />
                            {formik.touched.password && formik.errors.password ? <div className="text-red-700 mt-1">{formik.errors.password}</div> : null}
                        </div>

                        {message && (
                            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                                <p className="text-sm text-gray-700">
                                    {message}
                                </p>
                            </div>
                        )}

                        <button 
                            type="submit"
                            className="w-full px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
                        >
                            Zarejestruj
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Masz już konto?{" "}
                            <a href="/login" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                                Zaloguj się
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
