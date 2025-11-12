export function meta() {
    return [
        { title: "Sign Up - SpeakMaster" },
        { name: "description", content: "Create your account" }
    ];
}

export default function Signup() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
            <h1 className="text-4xl font-bold text-black">Simple Signup Page</h1>
        </div>
    );
}