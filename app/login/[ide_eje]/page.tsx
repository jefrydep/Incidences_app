"use client";
import LoginForm from "@/components/login/LoginForm";
import NavBar from "@/components/navbar/NavBar";
import { useIdeEjeStore } from "@/zustanstore/ideEje/ideEje.store";
import { useEffect, useState } from "react";

const LoginPage = ({ params }: { params: { ide_eje: number } }) => {
  const ide_eje = params.ide_eje;
  const [rotColor, setrotColor] = useState({});
  const setIdeEje = useIdeEjeStore((state) => state.setIdeEje);
  useEffect(() => {
    setIdeEje(ide_eje);
  }, [ide_eje]);

  //   useEffect(() => {
  //     dispatch(setIdeEje(ide_eje));
  //   }, [ide_eje]);

  // useEffect(() => {
  // const getGlobalColors = async () => {
  //   const colorsUrl = `https://api.pagosvirtualesperu.com/poli/funciones/fn_obt_detalles_poli_web?ide_eje=${login}`;
  //   const resp = await axios.get(colorsUrl);
  //   setrotColor(resp.data);
  // };
  // getGlobalColors();
  // colors: {
  //     bgNavbar: "#088A85",
  //   },
  // }, []);
  // useEffect(() => {
  //   Object.entries(rotColor).forEach(([variable, valor]) => {
  //     document.documentElement.style.setProperty(
  //       `--${variable}`,
  //       valor as string
  //     );
  //   });
  //   localStorage.setItem("customColors", JSON.stringify(rotColor));
  // }, [rotColor]);

  return (
    <div className="   pt-6  pb-20 ">
      <NavBar />
      <div className=" flex mt-20  justify-center  z-50    ">
        <LoginForm ide_eje={ide_eje} />
      </div>

      <svg
        className="fixed bottom-0 z-0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          className="waveBg z-0"
          fillOpacity={1}
          d="M0,96L17.1,106.7C34.3,117,69,139,103,165.3C137.1,192,171,224,206,224C240,224,274,192,309,202.7C342.9,213,377,267,411,250.7C445.7,235,480,149,514,144C548.6,139,583,213,617,218.7C651.4,224,686,160,720,128C754.3,96,789,96,823,96C857.1,96,891,96,926,112C960,128,994,160,1029,165.3C1062.9,171,1097,149,1131,149.3C1165.7,149,1200,171,1234,176C1268.6,181,1303,171,1337,138.7C1371.4,107,1406,53,1423,26.7L1440,0L1440,320L1422.9,320C1405.7,320,1371,320,1337,320C1302.9,320,1269,320,1234,320C1200,320,1166,320,1131,320C1097.1,320,1063,320,1029,320C994.3,320,960,320,926,320C891.4,320,857,320,823,320C788.6,320,754,320,720,320C685.7,320,651,320,617,320C582.9,320,549,320,514,320C480,320,446,320,411,320C377.1,320,343,320,309,320C274.3,320,240,320,206,320C171.4,320,137,320,103,320C68.6,320,34,320,17,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
};

export default LoginPage;
