import React from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";

const MapDisplay = ({ lat, long }) => {
	const mapIcon = new L.Icon({
		iconUrl:
			"data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='24' viewBox='0 0 11 24'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Ccircle cx='5.5' cy='5.5' r='5.5' fill='%23ff9892'/%3E%3Cpath stroke='%23ff9892' stroke-linecap='square' d='M5.5,11 L5.5,23.7368164'/%3E%3C/g%3E%3C/svg%3E",
		iconRetinaUrl:
			"data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='24' viewBox='0 0 11 24'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Ccircle cx='5.5' cy='5.5' r='5.5' fill='%23ff9892'/%3E%3Cpath stroke='%23ff9892' stroke-linecap='square' d='M5.5,11 L5.5,23.7368164'/%3E%3C/g%3E%3C/svg%3E",
		iconAnchor: null,
		popupAnchor: null,
		shadowUrl: null,
		shadowSize: null,
		shadowAnchor: null,
		iconSize: new L.Point(45, 45),
		className: "leaflet-map-marker",
	});

	const coords = [lat, long];

	return (
		<div className="map">
			<MapContainer
				center={coords}
				zoom={12}
				scrollWheelZoom={true}
				style={{ height: "100%" }}
			>
				        
				<TileLayer
					url="https://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
					crossOrigin
				/>
				        
				<Marker position={coords} icon={mapIcon} />
				      
			</MapContainer>
		</div>
	);
};

export default MapDisplay;

// const Map = ({ lat, long }) => {
// 	return (
// 		<MapContainer
// 			center={[lat, long]}
// 			zoom={12}
// 			maxZoom={15}
// 			attributionControl={true}
// 			zoomControl={true}
// 			doubleClickZoom={true}
// 			scrollWheelZoom={false}
// 			dragging={true}
// 			animate={true}
// 			easeLinearity={0.35}
// 		>
// 			<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
// 			<Marker position={[lat, long]} />
// 		</MapContainer>
// 	);
// };

// export default Map;
