import React from 'react';
import Banner from './Banner';
import SessionCard from '../../Components/SessionCard';
import TutorSection from './TutorSection';
import PartnerCompany from './PartnerCompany';
import OurAchievements from './OurAchievments';
import JoinAsTeacher from './JoinAsTeacher';

const Home = () => {
    return (
        <div>
            <Banner />
            <PartnerCompany />
            <SessionCard />
            <TutorSection />
            <OurAchievements />
            <JoinAsTeacher />
        </div>
    );
};

export default Home;