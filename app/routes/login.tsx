import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router";

export function meta() {
    return [
        { title: "Login - SpeakMaster" },
        { name: "description", content: "Login to your account" }
    ];
}

export default function Login() {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: async values => {
            const email = values.email;
            const password = values.password;
            if (!email) return setMessage("Podaj adres e-mail");
            if (!password) return setMessage("Podaj hasło");

            try {
                const res = await fetch("/api/v1/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
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
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Zaloguj się</h1>
                        <p className="text-gray-600">Zaloguj się i trenuj!</p>
                    </div>

                    <form className="space-y-6" onSubmit={formik.handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                Adres e-mail*
                            </label>
                            <input
                                type="email"
                                id="email"
                                {...formik.getFieldProps('email')}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none text-gray-600"
                                placeholder="twoj@email.com"/>
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
                                placeholder="Wpisz bezpieczne hasło"/>
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
                            className="w-full px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
                            Zaloguj
                        </button>
                        <div className="relative my-4">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">lub</span>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => window.location.href = '/api/v1/auth/google'}
                            className="w-full px-8 py-4 bg-white border border-gray-300 text-gray-700 text-lg font-semibold rounded-xl shadow-sm hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-3">
                            <svg className="w-6 h-6" viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"/>
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"/>
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"/>
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"/>
                            </svg>
                            Kontynuuj z Google
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Nie masz jeszcze konta?{" "}
                            <a href="/signup" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                                Zarejestruj się
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}