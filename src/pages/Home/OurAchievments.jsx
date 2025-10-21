import React from "react";
import { FaUsers, FaChalkboardTeacher, FaBookOpen } from "react-icons/fa";
import Lottie from "lottie-react";
import achievementsAnimation from "/public/acchievments.json"; 
import useAxiosPublic from "../../hook/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const OurAchievements = () => {
  const axiosPublic = useAxiosPublic();




  const {data: users} = useQuery({
    queryKey: ['usersCount'],
    queryFn: async () => {
      const res = await axiosPublic.get('/users');
      return res.data;
    }
  });

  const {data: sessions} = useQuery({
    queryKey: ['sessionsCount'],
    queryFn: async () => {
      const res = await axiosPublic.get('/sessions');
      return res.data;
    }
  });

  const {data: bookings} = useQuery({
    queryKey: ['bookingsCount'],
    queryFn: async () => {
      const res = await axiosPublic.get('/payments');
      return res.data;
    }
  });

  
  

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left Side: Stats */}
        <div className="flex flex-col gap-6 w-full md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            🎯 Our Achievements
          </h2>
          <p className="text-gray-600 mb-6">
            We are proud of our growing community of learners and dedicated tutors. Here’s a quick look at our achievements!
          </p>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition-all">
              <FaUsers className="text-blue-600 text-4xl" />
              <div>
                <p className=" text-xl font-semibold">Total Users</p>
                <h3 className="">{users?.length}</h3>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition-all">
              <FaChalkboardTeacher className="text-green-600 text-4xl" />
              <div>
                <p className=" text-xl font-semibold">All Classes</p>
                <h3 className="">{sessions?.length}</h3>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition-all">
              <FaBookOpen className="text-yellow-500 text-4xl" />
              <div>
                <p className=" text-xl font-semibold">All Enrollments</p>
                <h3 className="">{bookings?.length}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Lottie Animation */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Lottie
            animationData={achievementsAnimation}
            loop={true}
            className="w-full md:w-3/4"
          />
        </div>
      </div>
    </section>
  );
};

export default OurAchievements;
