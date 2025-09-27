import React from 'react';

const SectionTitle = ({ title, subtitle, description }) => {
    return (
        <div className="text-center my-8">
            <p className=" text-yellow-400">{subtitle}</p>
            <h2 className="text-3xl font-bold">{title}</h2>
            <p className="text-gray-500">{description}</p>
        </div>
    );
};

export default SectionTitle;