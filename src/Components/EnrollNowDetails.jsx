import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';

const EnrollNowDetails = () => {
    const data = useLoaderData();
    const navigate = useNavigate();

    if (!data) return <p className="text-center py-16">Loading...</p>;

    const handlePayment = () => {
        navigate(`/payment/${data._id}`);
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Image */}
                <div className="md:w-1/2 h-64 md:h-auto rounded-xl overflow-hidden shadow-lg">
                    <img
                        src={data.image || "https://via.placeholder.com/600x400?text=No+Image"}
                        alt={data.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Content */}
                <div className="md:w-1/2 flex flex-col justify-between bg-white shadow-md rounded-xl p-6">
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-indigo-700">{data.title}</h2>
                        <p className="text-gray-700 mb-4">{data.description}</p>

                        <div className="grid grid-cols-2 gap-4 text-gray-600 mb-4">
                            <p>👨‍🏫 Tutor: {data.tutorName}</p>
                            <p>📧 Email: {data.tutorEmail}</p>
                            <p>⏳ Duration: {data.duration}</p>
                            <p>💰 Fee: {data.amount || 0} Tk</p>
                            <p>📅 Registration: {data.regStartDate} → {data.regEndDate}</p>
                            <p>🎓 Class: {data.classStartDate} → {data.classEndDate}</p>
                        </div>
                    </div>

                    {/* Payment Button */}
                    <div className="text-center mt-6">
                        <button
                            onClick={handlePayment}
                            className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors"
                        >
                            Proceed to Payment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EnrollNowDetails;
