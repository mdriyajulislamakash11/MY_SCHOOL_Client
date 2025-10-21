import React from 'react';
import Banner from './Banner';
import SessionCard from '../../Components/SessionCard';
import TutorSection from './TutorSection';
import PartnerCompany from './PartnerCompany';

const Home = () => {
    return (
        <div>
            <Banner />
            <PartnerCompany />
            <SessionCard />
            <TutorSection />
        </div>
    );
};

export default Home;