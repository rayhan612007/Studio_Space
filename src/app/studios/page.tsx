import StudiosHero from '@/components/Explore hero/Studiohero';
import Studionav from '@/components/Explore hero/Studionav';
import React from 'react';

const studios = async () => {
    const res = await fetch('http://localhost:7000/')
    const data = await res.json();
    console.log(data);
    return (
        <div>
            <StudiosHero />
            <Studionav />
        </div>
    );
};

export default studios;