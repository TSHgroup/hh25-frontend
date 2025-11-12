export function meta() {
    return [
        { title: "Dashboard - SpeakMaster" },
        { name: "description", content: "Your dashboard" }
    ];
}

export default function Dashboard() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
            <h1 className="text-4xl font-bold text-black">Dashboard Page</h1>
        </div>
    );
}