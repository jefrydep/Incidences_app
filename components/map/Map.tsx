"use client";

import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L, { IconOptions, LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MdCenterFocusStrong, MdGpsFixed } from "react-icons/md";
import { Locate } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
const MapRef = ({ position }: any) => {
  const map = useMap();
  useEffect(() => {
    if (map) map.flyTo({ lat: -15, lng: -70 });
  }, [map]);

  useEffect(() => {
    console.log(map);
    console.log(position[0]);

    if (map) map.flyTo({ lat: position[0].lat_eve, lng: position[0].lon_eve });
  }, [position]);

  return <></>;
};

const Map = ({ position, detailsIncidences }: MapInterface) => {
  const { data: session } = useSession();
  const [centerPosition, setCenterPosition] = useState<any>([
    -15.512906567247873, -70.1288912112806,
  ]);

  useEffect(() => {
    if (position) {
      setCenterPosition([+position[0].lat_eve, +position[0].lon_eve]);
    }
  }, [position]);
  console.log(centerPosition);

  const showImageBigger = (ide_ede: number, ide_per: number) => {
    const imgUrl = ` ${process.env.NEXT_PUBLIC_API_URL}/smart/evento_det/file/${ide_ede}/${ide_ede}.jpg?ide_per=${ide_per}&token=${session?.user.access_token}`;
    // Swal.fire({
    //   // html: `<iframe src="${imgUrl}"  title="${pacient.des_mot_exa}"   width="100%" height="90vh" style="width: 100%; height: 85vh;"></iframe>`,
    //   html: `<iframe src="${imgUrl}"     width="100%" height="90vh" style="width: 100%; height: 85vh;"></iframe>`,
    //   width: "100%",
    //   confirmButtonColor: "#01DFD7",
    //   confirmButtonText: "Cerrar",
    // });
    Swal.fire({
      // title: des_img,
      // text: nom_arc,
      imageUrl: imgUrl,
      imageWidth: "100%",
      imageHeight: "100%",
      // imageAlt: des_img,
      confirmButtonColor: "#01DFD7",
      confirmButtonText: "Cerrar",
    });
  };
  return (
    <MapContainer
      className="z-10"
      // center={[positi]}

      center={centerPosition}
      zoom={13}
      scrollWheelZoom={true}
      // boxZoom={true}
      // doubleClickZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* <TileLayer
        url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.MAPBOX_API_key}`}
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
      /> */}
      <MapRef position={position} />
      {position.map((inc, idx) => (
        <Marker
          key={idx}
          draggable={true}
          // icon={markerIcon}

          position={[+inc.lat_eve, +inc.lon_eve]}
        >
          <Popup className=" ">
            <div className="flex flex-row gap-2">
              {detailsIncidences.map((detInc, idx) => (
                <div key={idx} className="border ">
                  <img
                    // className="h-[23rem] w-[23rem]"
                    src={`https://api.pagosvirtualesperu.com/smart/evento_det/file/${detInc.ide_ede}/${detInc.ide_ede}.jpg?ide_per=${inc.ide_per}&token=${session?.user.access_token}`}
                    alt=""
                    onClick={() => showImageBigger(detInc.ide_ede, inc.ide_per)}
                  />
                </div>
              ))}
            </div>
            <section className="border p-2 w-[30rem] ">
              {/* <Button>Ver mas</Button> */}
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
