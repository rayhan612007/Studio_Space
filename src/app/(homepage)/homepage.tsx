import FeaturedStudios from '@/components/home/Featuredstudiosection';
import HeroSlider from '@/components/home/Heroslider';
import React from 'react';
import Howitwork from './Howstudiowork';
import About from './Aboutus';
import Studiocategory from './Studiocategory';
import { STUDIO_API_URL } from "@/lib/studio-api";
import type { Idata } from "@/components/type/Idata";

const Homepage = async () => {
    let data: Idata[] = [];

    try {
        const res = await fetch(`${STUDIO_API_URL}/featured`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error(`Featured studios request failed with status ${res.status}.`);
        }

        const result: unknown = await res.json();
        if (!Array.isArray(result)) {
            throw new Error("Featured studios response was not a list.");
        }
        data = result as Idata[];
    } catch (error) {
        console.error("Featured studios fetching error:", error);
    }

    return (
        <div>
            <HeroSlider />
            <FeaturedStudios data={data} />
            <Studiocategory />
            <Howitwork />
            <About />
        </div>
    );
};

export default Homepage;