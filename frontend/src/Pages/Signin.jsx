import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

const Signin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.email || !formData.password) {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await fetch("http://localhost:5000/user/api/signin", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            const data = await response.json();
            
            if (response.ok) {
                console.log("Signed in successfully:", data);
                
                // Store the token and user data
                if (data.token) {
                    sessionStorage.setItem('authToken', data.token);
                    sessionStorage.setItem('user', JSON.stringify(data.user));
                }
                
                // Navigate to welcome page
                window.location.href = '/welcome';
                
            } else {
                setError(data.message || 'Login failed');
                console.log("Login failed:", data.message || 'Unknown error');
            }
        } catch (err) {
            setError("Network error. Please try again.");
            console.log("Login error:", err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-violet-50 to-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-violet-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Lock className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h2>
                        <p className="text-gray-600">Sign in to your Autonova account</p>
                    </div>

                    <div className="space-y-6">
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full bg-red-500 flex-shrink-0"></div>
                                <span className="text-sm">{error}</span>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    onKeyPress={handleKeyPress}
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                    required
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors duration-200"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    onKeyPress={handleKeyPress}
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors duration-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="button"
                                className="text-sm text-violet-600 hover:text-violet-700 font-medium transition-colors duration-200"
                            >
                                Forgot your password?
                            </button>
                        </div>

                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-violet-600 to-violet-700 text-white py-3 px-4 rounded-lg font-medium hover:from-violet-700 hover:to-violet-800 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Signing In...</span>
                                </div>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </div>
                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <button 
                                onClick={() => window.location.href = '/signup'}
                                className="text-violet-600 hover:text-violet-700 font-medium transition-colors duration-200"
                            >
                                Sign up here
                            </button>
                        </p>
                    </div>
                </div>
                <div className="mt-6 text-center">
                    <p className="text-xs text-gray-500">
                        Protected by industry-standard encryption
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signin;