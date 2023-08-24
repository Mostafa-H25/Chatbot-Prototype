"use client";
import { useEffect, useState } from "react";
import { Circles } from "react-loader-spinner";
export default function Spinner() {
  const [domLoaded, setDomLoaded] = useState(false);
  useEffect(() => {
    setDomLoaded(true);
  }, []);
  return (
    domLoaded && (
      <div className="flex flex-col justify-center items-center w-full h-full bg-black">
        <Circles color="#00BFFF" height={50} width={200} visible={true} />
        {/* <p className="text-lg text-center px-2 ">{message}</p> */}
      </div>
    )
  );
}
