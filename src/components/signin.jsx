import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSignIn = (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }
        if (password.length < 6) {
            setError('Password should be at least 6 characters long.');
            return;
        }

        if (email === 'user@example.com' && password === 'password123') {
            setSuccessMessage('Sign-in successful!');
        } else {
            setError('Invalid email or password.');
        }
    };

    return (

        <div className="min-h-screen  bg-gray-100">
            <div className="text-lg text-right px-8 py-2 text-gray-400">
                <NavLink to="/" className="text-blue-600  hover:underline">
                    Back
                </NavLink>
            </div>

            <div className='flex flex-col justify-center items-center'>
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                    <div className="text-center mb-6">
                        <h2 className="text-3xl font-bold mb-2">Welcome</h2>
                        <p className="text-gray-600">Sign in to your account</p>
                    </div>

                    <div className="space-y-4">
                        <button className="w-full flex items-center justify-center border border-gray-300 rounded-lg py-2 text-gray-600 hover:bg-gray-100">
                            <img
                                src="https://img.icons8.com/color/48/000000/google-logo.png"
                                alt="Google"
                                className="w-5 h-5 mr-2"
                            />
                            Sign in with Google
                        </button>
                    </div>

                    <div className="flex items-center justify-center mt-6 mb-6">
                        <hr className="w-full border-gray-300" />
                        <span className="mx-3 text-gray-500">OR</span>
                        <hr className="w-full border-gray-300" />
                    </div>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
                            {error}
                        </div>
                    )}

                    {successMessage && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4">
                            {successMessage}
                        </div>
                    )}

                    <form onSubmit={handleSignIn} className="space-y-4">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-600"
                            placeholder="Email"
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-600"
                            placeholder="Password"
                        />
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700"
                        >
                            Sign In
                        </button>
                    </form>

                    <div className="text-center mt-4 text-sm text-gray-500">
                        <p>
                            Don’t have an account?{' '}
                            <a href="#" className="text-blue-600 hover:underline">
                                Create account
                            </a>
                        </p>
                        <p>
                            Forgot Password?{' '}
                            <a href="#" className="text-blue-600 hover:underline">
                                Reset Password
                            </a>
                        </p>
                    </div>

                    <div className="text-xs text-gray-400 text-center mt-4">
                        Click "Sign In" to agree to NewsTeller’s{' '}
                        <a href="#" className="text-blue-600 hover:underline">
                            Terms of Service
                        </a>{' '}
                        and acknowledge that NewsTeller’s{' '}
                        <a href="#" className="text-blue-600 hover:underline">
                            Privacy Policy
                        </a>{' '}
                        applies to you.
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SignIn;
