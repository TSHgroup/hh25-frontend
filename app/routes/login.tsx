import { useState } from "react";
import { useFormik } from "formik";

export function meta() {
    return [
        { title: "Login - SpeakMaster" },
        { name: "description", content: "Login to your account" }
    ];
}

export default function Login() {
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
                            Zaloguj
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