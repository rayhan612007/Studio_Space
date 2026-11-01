'use client'
import React, { useEffect, useState } from 'react';
import { authClient } from '../lib/auth-client';
import ListingCard from '@/components/listing component/ListingCard';
import Link from 'next/link';

const Listingpage = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user?.email;
    const [listing, setlisting] = useState([]);

    useEffect(() => {
        const fetchfunction = async () => {
            if (!user) return;

            try {
                const res = await fetch("http://localhost:7000/my-listings", {
                    headers: {
                        email: user,
                    }
                });
                const data = await res.json();
                console.log(data);
                setlisting(data);
            } catch (error) {
                console.error("Error fetching listings:", error);
            }
        };
        fetchfunction();
    }, [user]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

            {/* --- Page Header Structure --- */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-5 border-b border-gray-200 gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">My Listings</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Manage your spaces, update details, or remove listings from here.
                    </p>
                </div>

                <Link
                    href="/add-studio"
                    className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-all"
                >
                    + Add New Listing
                </Link>
            </div>
            {
                listing.length === 0 ? (
                    <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                        <p className="text-gray-500 text-lg font-medium">No listings found or loading...</p>
                        <p className="text-sm text-gray-400 mt-1">You haven&apos;t added any spaces yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {
                            listing.map((item, ind) => (
                                <ListingCard key={ind} item={item} />
                            ))
                        }
                    </div>
                )
            }
        </div>
    );
};

export default Listingpage; 