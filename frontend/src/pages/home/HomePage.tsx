import React from "react";
import BannerComponent from "./BannerComponent";
import SearchBusForm from "./SearchBusForm";

const HomePage = () => {
  return <div className="home-content">
    <BannerComponent />
    <SearchBusForm />
  </div>;
};

export default HomePage;
