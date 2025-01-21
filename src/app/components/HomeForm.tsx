import React, { useState, useEffect } from "react";
import Map from "./Map";

type Location = {
    latitude: number;
    longitude: number;
};

type FormData = {
    date: string;
    time: string;
    description: string;
    images: FileList | null;
    location: Location | null;
};

const HomeForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        date: "",
        time: "",
        description: "",
        images: null,
        location: null,
    });

    useEffect(() => {
        // Ustawiamy domyślną datę i godzinę
        const now = new Date();
        setFormData((prevState) => ({
            ...prevState,
            date: now.toISOString().split("T")[0], // YYYY-MM-DD
            time: now.toTimeString().slice(0, 5), // HH:MM
        }));
    }, []);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState) => ({ ...prevState, images: e.target.files }));
    };

    const handleLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setFormData((prevState) => ({
                        ...prevState,
                        location: { latitude, longitude },
                    }));
                },
                () => {
                    alert("Nie udało się pobrać lokalizacji.");
                }
            );
        } else {
            alert("Geolokalizacja nie jest wspierana w tej przeglądarce.");
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Dane formularza:", formData);
        alert("Obserwacja wysłana!");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium mb-1">
                    Data:
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                        className="border rounded p-2 w-full"
                    />
                </label>
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">
                    Godzina:
                    <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        className="border rounded p-2 w-full"
                    />
                </label>
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">
                    Zdjęcia:
                    <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                </label>
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">
                    Opis:
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Dodaj opis obserwacji"
                        className="border rounded p-2 w-full"
                    />
                </label>
            </div>
            <div>
                <button
                    type="button"
                    onClick={handleLocation}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Pobierz Lokalizację
                </button>
            </div>
            {formData.location && (
                <div className="mt-4">
                    <h2 className="text-lg font-semibold">Twoja lokalizacja:</h2>
                    <p>
                        Szerokość: {formData.location.latitude}, Długość: {formData.location.longitude}
                    </p>
                    <Map location={formData.location} />
                </div>
            )}
            <div>
                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    Wyślij
                </button>
            </div>
        </form>
    );
};

export default HomeForm;
