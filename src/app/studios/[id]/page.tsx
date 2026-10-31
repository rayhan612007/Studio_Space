import React from 'react';

const Studiodetails = async (params: Promise<{ id: string }>) => {
    const { id } = await params;
    console.log(id);

    return (
        <div>


        </div>
    );
};

export default Studiodetails
    ;