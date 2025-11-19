import { useState } from 'react';
import { authenticatedFetch } from '../../utils/api';
import { useNavigate } from 'react-router';

export function meta() {
    return [
        { title: "Kreator Scenariusza - OdpalGadkę" },
        { name: "description", content: "Create custom conversation scenarios" }
    ];
}

interface ScenarioCreator {
    isOpen?: boolean;
    onClose?: () => void;
    onSuccess?: () => void;
}

export default function ScenarioCreator({ isOpen, onClose, onSuccess}: ScenarioCreator) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        description: '',
        category: '',
        tags: '',
        languages: 'pl',
        objectives: '',
        persona: '',
        openingPrompt: '',
        closingPrompt: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const accessToken = localStorage.getItem('accessToken');
            
            if (!accessToken) {
                throw new Error('Brak tokenu dostępu. Zaloguj się ponownie.');
            }

            const payload = {
                title: formData.title,
                subtitle: formData.subtitle || undefined,
                description: formData.description,
                category: formData.category,
                tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(Boolean) : [],
                languages: [formData.languages],
                status: 'editing',
                objectives: formData.objectives ? formData.objectives.split(',').map(obj => obj.trim()).filter(Boolean) : [],
                persona: 'd5aA2CdBa6d56039aA4790B0',
                openingPrompt: formData.openingPrompt || undefined,
                closingPrompt: formData.closingPrompt || undefined,
                provider: 'gemini',
                model: 'gemini-2.5-flash-native-audio-preview-09-2025',
            };

            console.log('Sending payload:', JSON.stringify(payload, null, 2));

            const response = await authenticatedFetch('/api/v1/scenario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            console.log('Response status:', response.status);
            console.log('Response headers:', Object.fromEntries(response.headers.entries()));
            
            if (!response.ok) {
                let errorMessage = `HTTP ${response.status}`;
                
                try {
                    const errorText = await response.text();
                    console.error('Raw error response:', errorText);
                    
                    try {
                        const errorData = JSON.parse(errorText);
                        console.error('Parsed error data:', errorData);
                        errorMessage = errorData.error || errorData.message || errorMessage;
                    } catch (parseError) {
                        errorMessage = errorText || errorMessage;
                    }
                } catch (textError) {
                    console.error('Could not read error response:', textError);
                    errorMessage = `HTTP ${response.status}: Could not read error details`;
                }
                
                throw new Error(errorMessage);
            }

            const result = await response.json();
            console.log('Success! Created scenario:', result);

            alert('Scenariusz został pomyślnie utworzony!');

            if (onSuccess) onSuccess();
            if (onClose) onClose();
            else navigate('/dashboard/scenarios');

            setFormData({
                title: '',
                subtitle: '',
                description: '',
                category: '',
                tags: '',
                languages: 'pl',
                objectives: '',
                persona: '',
                openingPrompt: '',
                closingPrompt: '',
            });
        } catch(err) {
            console.error('Submit error:', err);
            setError(err instanceof Error ? err.message : 'Wystąpił błąd');
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderForm = () => (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                    <p className="font-semibold">Błąd tworzenia scenariusza:</p>
                    <p className="text-sm mt-1 whitespace-pre-wrap">{error}</p>
                </div>
            )}

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tytuł *
                </label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                    placeholder="np. Rozmowa biznesowa z klientem"/>
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Podtytuł
                </label>
                <input
                    type="text"
                    name="subtitle"
                    value={formData.subtitle}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                    placeholder="Krótki opis scenariusza"/>
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Opis *
                </label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                    placeholder="Szczegółowy opis scenariusza..."/>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Kategoria *
                    </label>
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                        placeholder="np. business, education"/>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Język
                    </label>
                    <select
                        name="languages"
                        value={formData.languages}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black">
                        <option value="pl">Polski</option>
                        <option value="en">English</option>
                        <option value="de">Deutsch</option>
                        <option value="fr">Français</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tagi (oddzielone przecinkami)
                </label>
                <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                    placeholder="np. negocjacje, sprzedaż, prezentacja"/>
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Cele (oddzielone przecinkami)
                </label>
                <input
                    type="text"
                    name="objectives"
                    value={formData.objectives}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                    placeholder="np. Opanowanie podstaw negocjacji, Nauka małych rozmów"/>
            </div>

            {/* <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Persona
                </label>
                <textarea
                    name="persona"
                    value={formData.persona}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                    placeholder="Opisz charakterystykę rozmówcy AI..."/>
            </div> */}

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Prompt początkowy
                </label>
                <textarea
                    name="openingPrompt"
                    value={formData.openingPrompt}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                    placeholder="Jak AI ma rozpocząć rozmowę..."/>
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Prompt końcowy
                </label>
                <textarea
                    name="closingPrompt"
                    value={formData.closingPrompt}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                    placeholder="Jak AI ma zakończyć rozmowę..."/>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-purple-600 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                    </svg>
                    <div>
                        <span className="text-sm font-semibold text-gray-900">
                            Ten scenariusz będzie prywatny
                        </span>
                        <p className="text-xs text-gray-600 mt-1">
                            Tylko Ty będziesz mógł zobaczyć i używać tego scenariusza. Nie będzie dostępny dla innych użytkowników.
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex gap-3 pt-4">
                <button
                    type="button"
                    onClick={isOpen ? onClose : () => navigate('/dashboard/scenarios')}
                    className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition">
                    Anuluj
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed">
                    {isSubmitting ? 'Tworzenie...' : 'Utwórz prywatny scenariusz'}
                </button>
            </div>
        </form>
    );

    if (isOpen) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
                        <h2 className="text-2xl font-bold text-gray-900">Utwórz nowy prywatny scenariusz</h2>
                        <button 
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 transition">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="p-6">
                        {renderForm()}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Utwórz nowy prywatny scenariusz</h1>
                    <p className="text-gray-600 mt-1">Stwórz własny scenariusz treningowy widoczny tylko dla Ciebie</p>
                </div>
                <button 
                    onClick={() => navigate('/dashboard/scenarios')}
                    className="text-gray-500 hover:text-gray-700 transition">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            {renderForm()}
        </div>
    );
}