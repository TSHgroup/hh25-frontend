export function meta() {
    return [
        { title: "Login - SpeakMaster" },
        { name: "description", content: "Login to your account" }
    ];
}

export default function Login() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-white">
            <h1 className="text-4xl font-bold text-black">Simple Login Page</h1>
        </div>
    );
}