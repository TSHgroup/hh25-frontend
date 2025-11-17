export function meta() {
    return [
        { title: "Moje scenariusze - OdpalGadke"},
        { name: "description", content: "Browse and manage your conversation scenarios" }
    ]
}

export default function Scenarios(){
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Moje Scenariusze</h1>
                <p className="text-gray-600 mt-1">Przeglądaj i zarządzaj swoimi scenariuszami treningowymi</p>
            </div>
        </div>
    ); 
}