export function meta() {
    return [
        { title: "Analityka - OdpalGadkę" },
        { name: "description", content: "Detailed analytics of your performance" }
    ];
}

export default function Analytics() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Analityka</h1>
                <p className="text-gray-600 mt-1">Szczegółowa analiza twoich postępów</p>
            </div>
        </div>
    );
}