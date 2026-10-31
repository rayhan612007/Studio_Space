import FeaturedStudios from '@/components/home/Featuredstudiosection';
import HeroSlider from '@/components/home/Heroslider';
import React from 'react';
import Howitwork from './Howstudiowork';
import About from './Aboutus';

const Homepage = async () => {
    const res = await fetch("http://localhost:7000/featured");
    const data = await res.json();
    return (
        <div>
            <HeroSlider />
            <FeaturedStudios data={data} />
            <Howitwork />
            <About />
        </div>
    );
};

export default Homepage;