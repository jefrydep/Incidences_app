"use client";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L, { IconOptions, LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MdCenterFocusStrong, MdGpsFixed } from "react-icons/md";
import { Locate } from "lucide-react";
import { useRef } from "react";
import icon from "leaflet/dist/images/marker-icon-2x.png";
import markerSvg from "@/public/markergps.svg";
import marker from "@/public/marker.png";
import Leaflet from "leaflet";
import { DetailsIncidences, Item } from "@/interface/AvailableIncidences";

import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { Button } from "../ui/button";
import Swal from "sweetalert2";
import tramiteApi from "@/interceptors/tramiteApi";
import { useSession } from "next-auth/react";

// import "leaflet/dist/leaflet.css";
// import "leaflet-defaulticon-compatibility";
// import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

interface MapInterface {
  position: Item[];
  detailsIncidences: DetailsIncidences[];
  // idePer: number;
}
const marker_icon = Leaflet.divIcon({
  html: markerSvg,
});

const getImage = () => {
  Swal.fire({
    icon: "info",
    title: "Accidente Enmtre dos vehiculos",
  });
};

const Map = ({ position, detailsIncidences }: MapInterface) => {
  const { data: session } = useSession();

  // const markerIcon = L.divIcon({
  //   html: `<img src="${marker}" style="width: 35px; height: 45px;" />`,
  //   iconSize: [35, 45],
  // });
  return (
    <MapContainer
      className="z-10"
      // center={[positi]}

      center={[-15.512906567247873, -70.1288912112806]}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* <TileLayer
        url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.MAPBOX_API_key}`}
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
      /> */}
      {position.map((inc, idx) => (
        <Marker
          key={idx}
          draggable={true}
          // icon={markerIcon}
          position={[+inc.lat_eve, +inc.lon_eve]}
        >
          <Popup>
            {detailsIncidences.map((detInc, idx) => (
              <div key={idx} className="border">
                <img
                  src={`https://api.pagosvirtualesperu.com/smart/evento_det/file/${detInc.ide_ede}/${detInc.ide_ede}.jpg?ide_per=${inc.ide_per}&token=${session?.user.access_token}`}
                  alt=""
                />
              </div>
            ))}
            <section className="border p-2">
              <h4 className="font-bold">Detalles de incidencia</h4>
              <div className="  ">
                <h3 className="font-bold">{inc.des_ted}</h3>
                <hr />
                <h5>Mensaje</h5>
                <p>{inc.gls_eve}</p>
              </div>
            </section>
          </Popup>
        </Marker>
      ))}

      {/* <Marker
        icon={markerIcon}
        position={[-15.512906567247873, -70.1288912112806]}
        //   position={`${inc.lon_eve},${inc.lat_eve}`}
      >
        <Popup>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis
            excepturi illum explicabo, quae obcaecati consequatur inventore
            corrupti repellendus neque sint autem praesentium amet doloribus
            officia cumque eligendi qui quas eos. Aut recusandae a dolore
            dolores ullam nobis iusto optio nemo ipsum eaque. Impedit
            dignissimos est rerum quod assumenda harum! Neque commodi quam nisi
            praesentium architecto dolorem explicabo autem doloribus amet?
            Repudiandae ad sunt iste! Sint error officiis dolorem! Corporis
            accusamus quos veniam qui placeat sunt voluptas modi tempora quod,
            molestiae earum officiis rem inventore harum? Illo cupiditate quasi
            assumenda molestias? Molestias nemo incidunt perspiciatis corrupti
            placeat vitae tempora nulla fugit reprehenderit rem, voluptatum
            dolores fugiat vero nostrum quasi reiciendis unde sunt odio
            laudantium dolor! Dignissimos, aliquid incidunt! Dicta, nemo
            eveniet. Sequi sint ea itaque commodi voluptate, eum iure
            consequatur voluptatem, vero repudiandae natus reiciendis, mollitia
            aliquam recusandae explicabo consequuntur aut cumque iste harum
            minus pariatur blanditiis facere? Quos, distinctio ea.
          </div>
          Siam soft
          <br /> Software.
        </Popup>
      </Marker> */}
    </MapContainer>
  );
};

export default Map;
