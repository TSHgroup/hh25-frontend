import { useState, useMemo } from 'react';

interface Persona {
    _id: string;
    name: string;
    role: string;
    personality: string;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onPersonaSelect: (persona: Persona) => void;
    personas: Persona[];
    isLoading: boolean;
}

export default function PersonaSelectionModal({ isOpen, onClose, onPersonaSelect, personas, isLoading }: Props) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredPersonas = useMemo(() => {
        if (!searchTerm) {
            return personas;
        }
        return personas.filter(p =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.role.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, personas]);

    if (!isOpen) {
        return null;
    }

    const handleSelect = (persona: Persona) => {
        onPersonaSelect(persona);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-opacity-30 backdrop-blur z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-gray-800">Wybierz Personę</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-800">&times;</button>
                    </div>
                    <input
                        type="text"
                        placeholder="Szukaj po nazwie lub roli..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="overflow-y-auto p-6">
                    {isLoading ? (
                        <p className="text-center text-gray-500">Ładowanie person...</p>
                    ) : filteredPersonas.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {filteredPersonas.map(persona => (
                                <div
                                    key={persona._id}
                                    onClick={() => handleSelect(persona)}
                                    className="p-4 border border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-400 cursor-pointer transition"
                                >
                                    <h3 className="font-bold text-lg text-gray-900">{persona.name}</h3>
                                    <p className="text-sm text-gray-600">{persona.role}</p>
                                    <p className="text-xs text-gray-500 mt-2 line-clamp-2">{persona.personality}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">Nie znaleziono pasujących person.</p>
                    )}
                </div>
            </div>
        </div>
    );
}