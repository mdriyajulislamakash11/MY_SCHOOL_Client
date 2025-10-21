import React from "react";
import SectionTitle from "../../Components/SectionTitle";
import learnTechLogo from "../../assets/PartnerLogo/leartech-Logo.jpg";
import globalClassroomsLogo from "../../assets/PartnerLogo/Global-Classroom-Logo.jpg";
import skillBoostLogo from "../../assets/PartnerLogo/Skill-Boost-Logo.jpg";
import programmingHeroLogo from "../../assets/PartnerLogo/phLogo.jpg";

const partners = [
  {
    id: 1,
    name: "LearnTech",
    logo: learnTechLogo,
    description: "Innovative technology solutions for modern education.",
  },
  {
    id: 2,
    name: "GlobalClassrooms",
    logo: globalClassroomsLogo,
    description: "Connecting students and educators across the globe.",
  },
  {
    id: 3,
    name: "SkillBoost",
    logo: skillBoostLogo,
    description: "Empowering learners with essential skills for the future.",
  },
  {
    id: 4,
    name: "Programming Hero",
    logo: programmingHeroLogo,
    description: "Shaping the future of learning with sustainable solutions.",
  },
];

const PartnerCompany = () => {
  return (
    <div className="py-12">
      <SectionTitle
        title="Our Partners & Collaborators"
        subtitle="We collaborate with the best in the industry"
        description="Study-Buddy is proud to partner with organizations committed to making education accessible, innovative, and impactful for everyone."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:px-16  gap-8 mt-12 md:pb-16 ">
        {partners.map((partner) => (
          <div
            key={partner.id}
            className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="flex justify-center mb-4">
              <img
                src={partner.logo}
                alt={partner.name}
                className="w-24 h-24 object-contain"
              />
            </div>
            <h2 className="text-lg font-semibold text-gray-800">
              {partner.name}
            </h2>
            <p className="text-gray-600 text-sm mt-2">
              {partner.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnerCompany;
