import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "./map.scss";
import "leaflet/dist/leaflet.css";
import Pin from "../pin/Pin";
import { useEffect } from "react";
import L from "leaflet";

// Helper function to check and correct coordinates
const correctCoordinates = (latitude, longitude) => {
  if (latitude > 90 || latitude < -90) {
    console.warn("Latitude out of range. Are lat and long swapped?");
    return [longitude, latitude]; // Swap them
  }
  return [latitude, longitude];
};

// Helper component to adjust bounds based on items
function SetMapBounds({ items }) {
  const map = useMap();

  useEffect(() => {
    if (items.length === 1) {
      const [lat, lng] = correctCoordinates(
        items[0].latitude,
        items[0].longitude
      );
      map.setView([lat, lng], 12); // Zoom level 12 for a single item
    } else if (items.length > 1) {
      // Calculate bounds for all items
      const bounds = new L.LatLngBounds(
        items.map((item) => correctCoordinates(item.latitude, item.longitude))
      );
      map.fitBounds(bounds, { padding: [50, 50] }); // Fit the map to the bounds
    }
  }, [items, map]);

  return null;
}

function Map({ items }) {
  return (
    <MapContainer
      center={[20.5937, 78.9629]} // Default center for India
      zoom={5} // Default zoom level for the whole country
      scrollWheelZoom={true}
      className="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {items.map((item) => {
        const [lat, lng] = correctCoordinates(item.latitude, item.longitude);
        return (
          <Pin
            item={{ ...item, latitude: lat, longitude: lng }}
            key={item.id}
          />
        );
      })}
      <SetMapBounds items={items} />
    </MapContainer>
  );
}

export default Map;
