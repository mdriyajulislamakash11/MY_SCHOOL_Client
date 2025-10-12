import React from "react";
import DashboardSectionTitle from "../../../Components/DashboardSectionTitle";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hook/useAxiosPublic";
import Card from "../../../Components/Card";

const ViewAllStudySession = () => {
  const axiosPublic = useAxiosPublic();

  const { data: sessions = [], refetch } = useQuery({
    queryKey: ["sessions"],
    queryFn: async () => {
      const res = await axiosPublic.get("/sessions");
      return res.data;
    },
  });

  console.log(sessions);

  return (
    <div>
      <DashboardSectionTitle
        title="View Your"
        secondTitle="Study Sessions"
        description="Energistically pursue cutting-edge imperatives without clicks-and-mortar catalysts for change. Completely build high-quality customer service before long-term high-impact action items. Phosfluorescently predominate team driven systems via."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 mt-11">
        {sessions.map((session) => (
          <Card key={session.id} session={session} />
        ))}
      </div>
    </div>
  );
};

export default ViewAllStudySession;
