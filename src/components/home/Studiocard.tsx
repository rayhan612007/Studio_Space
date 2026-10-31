import { Button } from '@base-ui/react';
import { MapPin, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Idata } from '../type/Idata';

const Studiocard = ({ studio }: { studio: Idata }) => {
    return (
        <div
            key={studio._id}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group"
        >
            {/* Studio Image & Category Badge */}
            <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                <Image
                    src={studio.imageUrl}
                    alt={studio.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-gray-800 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                    {studio.category}
                </span>
                <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {studio?.rating || 3.5}
                </span>
            </div>

            {/* Content Body */}
            <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                <div className="space-y-2">
                    <div className="flex items-center text-xs text-gray-500 gap-1">
                        <MapPin className="w-3.5 h-3.5 text-amber-500" />
                        <span>{studio.location}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-amber-600 transition-colors line-clamp-1">
                        {studio.title}
                    </h3>
                </div>

                {/* Footer of Card: Price & Button */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div>
                        <span className="text-xs text-gray-400 block">Hourly Rate</span>
                        <span className="text-lg font-bold text-gray-900">
                            ${studio.hourlyRate}{" "}
                            <span className="text-xs font-normal text-gray-500">/ hr</span>
                        </span>
                    </div>

                    <Button
                        className="rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-medium shadow-md shadow-amber-500/20"


                    >
                        <Link href={`/studios/${studio._id}`}>View Details</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Studiocard;