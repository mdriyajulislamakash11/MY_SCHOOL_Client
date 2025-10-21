import React from 'react';
import Banner from './Banner';
import SessionCard from '../../Components/SessionCard';
import TutorSection from './TutorSection';

const Home = () => {
    return (
        <div>
            <Banner />
            <SessionCard />
            <TutorSection />
        </div>
    );
};

export default Home;