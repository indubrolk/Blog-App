import React from 'react';

const LoginForm = ({ form, onChange, onSubmit, onSwitchToRegister }) => {
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            onSubmit(event);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h2>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                        type="email"
                        value={form.email}
                        onChange={(event) => onChange('email', event.target.value)}
                        onKeyDown={handleKeyDown}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <input
                        type="password"
                        value={form.password}
                        onChange={(event) => onChange('password', event.target.value)}
                        onKeyDown={handleKeyDown}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    onClick={onSubmit}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                    Login
                </button>
            </div>
            <p className="text-center mt-4 text-sm text-gray-600">
                Don't have an account?{' '}
                <button
                    onClick={onSwitchToRegister}
                    className="text-blue-600 hover:underline"
                >
                    Sign up
                </button>
            </p>
        </div>
    );
};

export default LoginForm;
