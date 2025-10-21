import React from 'react';

const RegisterForm = ({ form, onChange, onSubmit, onSwitchToLogin }) => {
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            onSubmit(event);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Register</h2>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                    <input
                        type="text"
                        value={form.username}
                        onChange={(event) => onChange('username', event.target.value)}
                        onKeyDown={handleKeyDown}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
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
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                >
                    Register
                </button>
            </div>
            <p className="text-center mt-4 text-sm text-gray-600">
                Already have an account?{' '}
                <button
                    onClick={onSwitchToLogin}
                    className="text-blue-600 hover:underline"
                >
                    Login
                </button>
            </p>
        </div>
    );
};

export default RegisterForm;
