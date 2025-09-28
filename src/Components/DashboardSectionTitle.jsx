import React from "react";

const DashboardSectionTitle = ({ title, secondTitle, description }) => {
  return (
    <div className="w-2/4 mx-auto ">
      <div className="flex items-center justify-center gap-4 mb-2  ">
        <div className="w-2 h-8 bg-primary"></div>
        <h2 className="text-3xl font-bold ">{title}</h2>
        <h2 className="text-2xl font-bold">{secondTitle}</h2>
      </div>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  );
};

export default DashboardSectionTitle;
