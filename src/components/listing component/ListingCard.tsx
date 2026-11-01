import React from 'react';
import { Idata } from '../type/Idata';

export default function ListingCard({
    item,
    onUpdate,
    onDelete
}: {
    item: Idata;
    onUpdate?: (item: Idata) => void;
    onDelete?: (id: string) => void;
}) {
    const { _id, title, category, hourlyRate, location, imageUrl } = item;

    return (
        <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-300 flex flex-col justify-between overflow-hidden">

            {/* --- Image Section (Optional if you have imageUrl) --- */}
            {imageUrl && (
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                    <img
                        src={imageUrl}
                        alt={title}
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
                <button
                    onClick={() => onUpdate && onUpdate(item)}
                    className="flex-1 bg-white hover:bg-indigo-50 text-indigo-600 border border-indigo-200 hover:border-indigo-300 text-sm font-semibold py-2.5 px-4 rounded-xl transition-all duration-200 text-center shadow-2xs flex items-center justify-center gap-2"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Update
                </button>
                <button
                    onClick={() => onDelete && onDelete(_id)}
                    className="flex-1 bg-white hover:bg-red-50 text-red-600 border border-red-200 hover:border-red-300 text-sm font-semibold py-2.5 px-4 rounded-xl transition-all duration-200 text-center shadow-2xs flex items-center justify-center gap-2"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                </button>
            </div>
        </div>
    );
}