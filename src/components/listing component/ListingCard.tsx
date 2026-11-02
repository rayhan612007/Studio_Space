import React from 'react';
import { Idata } from '../type/Idata';
import Image from 'next/image';
import { DeleteList } from '../delete/Deletelist';
import { UpdateList } from '../delete/Updatelist';

export default function ListingCard({
    item,
}: {
    item: Idata;
}) {
    const { _id, title, category, hourlyRate, location, imageUrl } = item;



    return (
        <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-300 flex flex-col justify-between overflow-hidden">

            {/* --- Image Section (Optional if you have imageUrl) --- */}
            {imageUrl && (
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                    <Image
                        src={imageUrl}
                        alt={title}
                        height={50}
                        width={50}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                        <span className="text-xs font-semibold px-3 py-1 bg-white/90 backdrop-blur-md text-indigo-600 rounded-full shadow-sm uppercase tracking-wider">
                            {category}
                        </span>
                    </div>
                </div>
            )}

            <div className="p-5 flex flex-col flex-grow">
                {/* Fallback Category if image is not present */}
                {!imageUrl && (
                    <div className="flex justify-between items-start mb-3">
                        <span className="text-xs font-semibold px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full uppercase tracking-wider">
                            {category}
                        </span>
                    </div>
                )}

                {/* Title / Name */}
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-1">
                    {title}
                </h3>

                {/* Location (Optional check) */}
                {location && (
                    <p className="text-xs text-gray-500 flex items-center gap-1 mb-4">
                        <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {location}
                    </p>
                )}

                {/* Hourly Rate */}
                <div className="mt-auto pt-3 flex items-baseline justify-between border-t border-gray-50">
                    <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Price</span>
                    <div className="text-right">
                        <span className="text-xl font-extrabold text-gray-900">${hourlyRate}</span>
                        <span className="text-xs font-medium text-gray-500 ml-1">/ hour</span>
                    </div>
                </div>
            </div>

            {/* --- Action Buttons --- */}
            <div className="px-5 pb-5 pt-2 flex items-center gap-3 bg-gray-50/50 border-t border-gray-100">

                <UpdateList id={_id} initialdata={item} />

                <DeleteList id={_id} />

            </div>
        </div>
    );
}