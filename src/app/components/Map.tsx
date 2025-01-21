"use client";

import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Ikona markera Leaflet (konieczne, bo domyślna ikona nie działa z React)
const markerIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

type MapProps = {
    location: { latitude: number; longitude: number } | null;
};

const Map: React.FC<MapProps> = ({ location }) => {
    // Domyślna lokalizacja, gdy nie ma danych
    const defaultPosition: [number, number] = [51.505, -0.09]; // Londyn

    return (
        <MapContainer
            center={location ? [location.latitude, location.longitude] : defaultPosition}
            zoom={13}
            scrollWheelZoom={false}
            className="leaflet-container"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {location && (
                <Marker
                    position={[location.latitude, location.longitude]}
                    icon={markerIcon}
                >
                    <Popup>
                        Twoja lokalizacja: <br />
                        {location.latitude}, {location.longitude}
                    </Popup>
                </Marker>
            )}
        </MapContainer>
    );
};

export default Map;
