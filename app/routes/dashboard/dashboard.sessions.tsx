export function meta() {
    return [
        { title: "Historia Sesji - OdpalGadkę" },
        { name: "description", content: "View your training session history" }
    ];
}

export default function Sessions() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Historia Sesji</h1>
                <p className="text-gray-600 mt-1">Zobacz historię swoich treningów i postępy</p>
            </div>
        </div>
    );
}