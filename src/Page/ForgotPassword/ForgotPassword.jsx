import { Mail } from 'lucide-react';
import React, { useState } from 'react'
import { toast } from 'sonner';

const ForgotPassword = () => {
    const [forgotEmail, setForgotEmail] = useState('');

    const handleForgotPassword = () => {
        toast.success("Click on button");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-400 rounded-full mb-4">
                        <Mail className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">Forgot Password?</h1>
                    <p className="text-gray-600 mt-2">Enter your email to receive a reset link</p>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="email"
                                value={forgotEmail}
                                onChange={(e) => setForgotEmail(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleForgotPassword()}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none"
                                placeholder="admin@example.com"
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleForgotPassword}
                        className="w-full bg-cyan-400 text-white py-3 rounded-lg font-semibold hover:bg-cyan-500 transition-colors"
                    >
                        Send Reset Link
                    </button>

                    <button
                        type="button"
                        className="w-full text-gray-600 hover:text-gray-900 text-sm font-medium"
                    >
                        Back to Login
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword