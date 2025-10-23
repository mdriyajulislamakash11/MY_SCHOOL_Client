import React from 'react';
import Banner from './Banner';
import SessionCard from '../../Components/SessionCard';
import TutorSection from './TutorSection';
import PartnerCompany from './PartnerCompany';
import OurAchievements from './OurAchievments';
import JoinAsTeacher from './JoinAsTeacher';
import LearnersInfo from './LearnersInfo';
import JoinCommunity from './JoinCommunity';
import LearningPaths from './LearningPaths';

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
            <LearningPaths />
            <JoinCommunity />
        </div>
    );
};

export default Home;