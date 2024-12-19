import React from "react";
import Image from "next/image";

const ImageLoader = ({ className }) => {
  return (
    <Image
      src="/assets/crazy.gif"
      className={` h-full w-full ${className}`}
      height={1000}
      width={1000}
      alt="loader"
    />
  );
};

export default ImageLoader;
