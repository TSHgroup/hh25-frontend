export function meta() {
    return [
        { title: "Ustawienia - OdpalGadkę" },
        { name: "description", content: "Manage your account settings" }
    ];
}

export default function Settings() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Ustawienia</h1>
                <p className="text-gray-600 mt-1">Zarządzaj ustawieniami swojego konta</p>
            </div>
        </div>
    );
}