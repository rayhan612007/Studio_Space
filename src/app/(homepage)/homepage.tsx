import FeaturedStudios from '@/components/home/Featuredstudiosection';
import HeroSlider from '@/components/home/Heroslider';
import React from 'react';
import Howitwork from './Howstudiowork';
import About from './Aboutus';

const Homepage = () => {
    return (
        <div>
            <HeroSlider />
            <FeaturedStudios />
            <Howitwork />
            <About />
        </div>
    );
};

export default Homepage;