"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./map.module.css";
import L from "leaflet";

// Fix missing marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function Map({ position, center, children }) {
  const safeCenter = center || [35.6892, 51.3890];
  const safePosition = position || [35.6892, 51.3890];

  return (
    <>
      <MapContainer
        className={styles.map}
        center={safeCenter}
        zoom={14}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={safePosition}>
          <Popup>Set Coffee</Popup>
        </Marker>
      </MapContainer>
      <div className={styles.details}>{children}</div>
    </>
  );
}
