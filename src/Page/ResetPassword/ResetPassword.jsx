import { Eye, EyeOff, Lock } from 'lucide-react';
import React, { useState } from 'react'
import { toast } from 'sonner';

const ResetPassword = () => {
    const [showPassword, setShowPassword] = useState();
    const [resetPassword, setResetPassword] = useState();
    const [resetConfirmPassword, setResetConfirmPassword] = useState();

    const handleResetPassword = () => {
        toast.success('Reset Password button clicked.')
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-400 rounded-full mb-4">
                        <Lock className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">Reset Password</h1>
                    <p className="text-gray-600 mt-2">Enter your new password</p>
                </div>


                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type={showPassword ? "text" : "password"}
                                value={resetPassword}
                                onChange={(e) => setResetPassword(e.target.value)}
                                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type={showPassword ? "text" : "password"}
                                value={resetConfirmPassword}
                                onChange={(e) => setResetConfirmPassword(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleResetPassword()}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleResetPassword}
                        className="w-full bg-cyan-400 text-white py-3 rounded-lg font-semibold hover:bg-cyan-500 transition-colors"
                    >
                        Reset Password
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword