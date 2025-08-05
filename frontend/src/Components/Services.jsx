import { Target, Lightbulb, Search } from 'lucide-react';
import { FaCarSide, FaShippingFast, FaTags, FaIndustry } from 'react-icons/fa';
import Categories from './Categories';
export default function VennDiagram() {
    return (
        <div>
            <div className=" flex bg-gray-200 mb-6 justify-center">
                <div className="max-w-6xl w-full">
                    <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
                        <div>
                            <div className="relative w-[28rem] h-[28rem] flex-shrink-0 ">
                                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-56 h-56 bg-yellow-400 rounded-full opacity-90 z-10 flex items-center justify-center shadow-lg">
                                    <div className="text-center text-gray-800 font-semibold text-sm space-y-2">
                                        <div className="flex items-center gap-2">
                                            <FaShippingFast /> <span>Fast Delivery</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FaTags /> <span>Sell Your Car</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FaCarSide /> <span>New Arrivals</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FaIndustry /> <span>Manufacturing</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute bottom-4 left-4 w-56 h-56 bg-yellow-400 rounded-full opacity-90 z-20 flex items-center justify-center shadow-lg">
                                    <div className="text-center text-gray-800 font-semibold text-sm space-y-2 px-2">
                                        <div className="flex items-center gap-2">
                                            <FaShippingFast /> <span>Nationwide Shipping</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FaTags /> <span>Smart Deals</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FaCarSide /> <span>Updated Brands</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FaIndustry /> <span>OEM Services</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute bottom-4 right-4 w-56 h-56 bg-violet-700 rounded-full opacity-90 z-30 flex items-center justify-center shadow-lg">
                                    <div className="text-center text-gray-100 font-semibold text-sm space-y-2 px-2">
                                        <div className="flex items-center gap-2">
                                            <FaShippingFast /> <span>Quick Logistics</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FaTags /> <span>Hot Offers</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FaCarSide /> <span>Premium Cars</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FaIndustry /> <span>Auto Production</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl z-50">
                                    <div className="text-gray-800 font-bold text-sm text-center">Services</div>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Target className="w-6 h-6 text-gray-800" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">Goal</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
                                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Lightbulb className="w-6 h-6 text-gray-800" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">Idea</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
                                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Search className="w-6 h-6 text-gray-800" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">Research</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
                                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Categories />
        </div>
    );
}