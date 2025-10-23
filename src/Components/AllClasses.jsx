import React from "react";
import useAxiosPublic from "../hook/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Card from "./Card";
import SectionTitle from "./SectionTitle";

const AllClasses = () => {
  const axiosPublic = useAxiosPublic();

  const { data: classes } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const response = await axiosPublic.get("/sessions");
      return response.data;
    },
  });

  console.log(classes);

  return (
    <div>
      <SectionTitle
        title="All Available Classes"
        subtitle="Explore our wide range of classes  "
        description="Find the perfect class for you and start learning today! "
      />

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 mt-11">
        {classes.map((session) => (
          <Card key={session.id} session={session} />
        ))}
      </div>
    </div>
  );
};

export default AllClasses;
