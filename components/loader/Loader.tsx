"use client";
import { PuffLoader, RotateLoader } from "react-spinners";

const Loader = () => {
  return (
    <>
      <div className="fixed top-0 right-0 left-0 bottom-0 bg-[#000] opacity-70  z-[300] flex justify-center content-center items-center">
        <PuffLoader
          color="#36d7b7"
          className="text-center custom-loader-stroke font-bold"
          size={80}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </>
  );
};

export default Loader;
