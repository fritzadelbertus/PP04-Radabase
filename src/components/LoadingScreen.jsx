import React, { useEffect } from "react";
import mobileload from "../assets/loading_img_mobile.png";
import desktopload from '../assets/loading_img_desktop.png';

const LoadingScreen = () => {
  return (
    <loading-screen>
      <picture>
        <source media="(min-width:650px)" srcSet={desktopload} />
        <source media="(min-width:400px)" srcSet={mobileload} />
        <img src={mobileload} alt="loading image"/>
      </picture>
      <p>Loading Database...</p>
    </loading-screen>
  )
}

export default LoadingScreen;
