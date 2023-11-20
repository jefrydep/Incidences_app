"use client";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L, { IconOptions, LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MdGpsFixed } from "react-icons/md";
import { Locate } from "lucide-react";
import { useRef } from "react";
import icon from "leaflet/dist/images/marker-icon-2x.png";
import markerSvg from "@/public/markergps.svg";
import Leaflet from "leaflet";
import { Item } from "@/interface/AvailableIncidences";
interface MapInterface {
  position: Item[];
}
const marker_icon = Leaflet.divIcon({
  html: markerSvg,
});

const Map = ({ position }: MapInterface) => {
  const markerIcon = new L.Icon({
    iconUrl: markerSvg,

    iconSize: [35, 45],
    // iconAnchor: [17, 46],
    // popupAnchor: [3, -46],
  });

  return (
    <MapContainer
      className="z-10"
      //   center={position}
      center={[-15.512906567247873, -70.1288912112806]}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {position.map((inc, idx) => (
        <Marker
          key={idx}
          // icon={markerIcon}
          position={[+inc.lat_eve, +inc.lon_eve]}
          //   position={`${inc.lon_eve},${inc.lat_eve}`}
        >
          <Popup>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis
              excepturi illum explicabo, quae obcaecati consequatur inventore
              corrupti repellendus neque sint autem praesentium amet doloribus
              officia cumque eligendi qui quas eos. Aut recusandae a dolore
              dolores ullam nobis iusto optio nemo ipsum eaque. Impedit
              dignissimos est rerum quod assumenda harum! Neque commodi quam
              nisi praesentium architecto dolorem explicabo autem doloribus
              amet? Repudiandae ad sunt iste! Sint error officiis dolorem!
              Corporis accusamus quos veniam qui placeat sunt voluptas modi
              tempora quod, molestiae earum officiis rem inventore harum? Illo
              cupiditate quasi assumenda molestias? Molestias nemo incidunt
              perspiciatis corrupti placeat vitae tempora nulla fugit
              reprehenderit rem, voluptatum dolores fugiat vero nostrum quasi
              reiciendis unde sunt odio laudantium dolor! Dignissimos, aliquid
              incidunt! Dicta, nemo eveniet. Sequi sint ea itaque commodi
              voluptate, eum iure consequatur voluptatem, vero repudiandae natus
              reiciendis, mollitia aliquam recusandae explicabo consequuntur aut
              cumque iste harum minus pariatur blanditiis facere? Quos,
              distinctio ea.
            </div>
            Siam soft
            <br /> Software.
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
