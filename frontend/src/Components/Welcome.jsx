import { useState, useEffect } from 'react';
import { User, Car, LogOut } from 'lucide-react';

const Welcome = () => {
    const [user, setUser] = useState(null);


    const handleLogout = () => {
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('user');
        
        window.location.href = '/signin';
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-violet-50 to-gray-100">
            <div className="bg-white shadow-sm border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-violet-600 rounded-full flex items-center justify-center">
                                <Car className="w-6 h-6 text-white" />
                            </div>
                            <h1 className="text-xl font-bold text-gray-800">AutoNova</h1>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200"
                        >
                            <LogOut className="w-4 h-4" />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <div className="w-24 h-24 bg-gradient-to-r from-violet-500 to-violet-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <User className="w-12 h-12 text-white" />
                    </div>
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">
                        Welcome {user?.username ? `back, ${user.username}!` : 'to AutoNova!'}
                    </h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Ready to find your dream car? Let's get started on your journey.
                    </p>
                </div>
                {user && (
                    <div className="max-w-md mx-auto mb-12">
                        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Account</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <User className="w-5 h-5 text-violet-500" />
                                    <span className="text-gray-700">{user.username}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Mail className="w-5 h-5 text-violet-500" />
                                    <span className="text-gray-700">{user.email}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                            <Car className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Browse Cars</h3>
                        <p className="text-gray-600 mb-4">Explore our extensive collection of premium vehicles</p>
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200">
                            Start Browsing
                        </button>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                            <User className="w-6 h-6 text-green-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">My Profile</h3>
                        <p className="text-gray-600 mb-4">Manage your account settings and preferences</p>
                        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors duration-200">
                            View Profile
                        </button>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                            <Car className="w-6 h-6 text-purple-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Favorites</h3>
                        <p className="text-gray-600 mb-4">View your saved cars and watchlist</p>
                        <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors duration-200">
                            My Favorites
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Welcome;