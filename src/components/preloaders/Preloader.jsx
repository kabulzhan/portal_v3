import React from 'react';
import { MutatingDots } from "react-loader-spinner";
import "./Preloader.css";

const Preloader =()=> {
  let loader = {
    Component: MutatingDots,
    props: {
      color: "#825adf",
      secondaryColor: "#9200e7",
      height: 130,
      width: 130,
    },
    name: "MutatingDots",
  };
  // посмотреть как вывести на корневой уровень приложения
  return (
    <div className="preloader">
      <div className="preloader-body">
        <loader.Component {...loader.props} />
      </div>
    </div>
  );
}

export default Preloader;
