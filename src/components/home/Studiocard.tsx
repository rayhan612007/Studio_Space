import { Button } from '@base-ui/react';
import { MapPin, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Idata } from '../type/Idata';

const Studiocard = ({ studio }: { studio: Idata }) => {
    return (
        <div
            key={studio._id}
            className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
        >
            {/* Studio Image & Category Badge */}
            <div className="relative h-56 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                <Image
                    src={studio.imageUrl}
                    alt={studio.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-800 shadow-sm backdrop-blur-md dark:bg-gray-900/90 dark:text-gray-100">
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
                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                        <MapPin className="w-3.5 h-3.5 text-amber-500" />
                        <span>{studio.location}</span>
                    </div>
                    <h3 className="line-clamp-1 text-lg font-bold text-gray-900 transition-colors group-hover:text-amber-600 dark:text-white dark:group-hover:text-amber-400">
                        {studio.title}
                    </h3>
                </div>

                {/* Footer of Card: Price & Button */}
                <div className="flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
                    <div>
                        <span className="block text-xs text-gray-400 dark:text-gray-500">Hourly Rate</span>
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                            ${studio.hourlyRate}{" "}
                            <span className="text-xs font-normal text-gray-500 dark:text-gray-400">/ hr</span>
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