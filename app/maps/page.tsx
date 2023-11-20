"use client";
import {
  MapContainer,
  TileLayer,
  Marker,
  CircleMarker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
// -15.512909115689398, -70.12888792146015;
function Map() {
  return (
    <main className="d w-[100%] h-[10vh] z-1">
      {/*leaflet and react-leaflet*/}
      <div>
        <MapContainer center={[-15.512, -70.128]} zoom={5}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker
            // className="n w-[150px] h-[150px]"
            // center={[-15.512, -70.128]}
            // radius={10}
            position={[-15.512, -70.128]}
            // color="transparent"
            // fillColor="green"
            // fillOpacity={0.5}
          >
            <Popup className="w-[460px] h-[150px]">
              <p className="text-[25px]">My Location </p>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </main>
  );
}

export default Map;
