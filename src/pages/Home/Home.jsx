import React from 'react';
import Banner from './Banner';
import SessionCard from '../../Components/SessionCard';
import TutorSection from './TutorSection';
import PartnerCompany from './PartnerCompany';
import OurAchievements from './OurAchievments';
import JoinAsTeacher from './JoinAsTeacher';
import LearnersInfo from './LearnersInfo';

const Home = () => {
    return (
        <div>
            <Banner />
            <PartnerCompany />
            <SessionCard />
            <TutorSection />
            <OurAchievements />
            <LearnersInfo />
            <JoinAsTeacher />
        </div>
    );
};

export default Home;