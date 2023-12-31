import React, { Suspense, useEffect, useState } from "react";
import PropTypes from "prop-types";
import dynamic from "next/dynamic";
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
});
const SplineObj = (props) => {
  const [isDesktop, setDesktop] = useState(false);

  useEffect(() => {
    if (window.innerWidth > 550) {
      setDesktop(true);
    } else {
      setDesktop(false);
    }

    const updateMedia = () => {
      if (window.innerWidth > 550) {
        setDesktop(true);
      } else {
        setDesktop(false);
      }
    };
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, []);
  return <></>;
};

Spline.propTypes = {};

export default SplineObj;
