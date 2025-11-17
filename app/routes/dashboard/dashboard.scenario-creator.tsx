export function meta() {
    return [
        { title: "Kreator Scenariusza - OdpalGadkę" },
        { name: "description", content: "Create custom conversation scenarios" }
    ];
}

export default function ScenarioCreator() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Kreator Scenariusza</h1>
                <p className="text-gray-600 mt-1">Twórz własne, spersonalizowane scenariusze treningowe</p>
            </div>
        </div>
    );
}