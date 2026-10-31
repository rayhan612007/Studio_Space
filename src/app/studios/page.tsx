import React from 'react';

const studios = async () => {
    const res = await fetch('http://localhost:7000/')
    const data = await res.json();
    console.log(data);
    return (
        <div>
            stodio
        </div>
    );
};

export default studios;