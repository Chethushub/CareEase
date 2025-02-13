import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import emailjs from 'emailjs-com';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

import axios from 'axios';

const BACKEND_URL = "http://localhost:5000"

const SignUp = () => {
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [role, setRole] = useState('patient'); 
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const [patientData, setPatientData] = useState({
    name: '', age: '', phone: '', email: '', password: '', gender: '', address: '', problem: '', habits: {}
    });

    const [formData, setFormData] = useState({
        name: '', email: '', password: ''
    });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const sendSignUpEmail = (email, password, role) => {
        const extractName = (email) => {
            const extractedname = email.split("@")[0]; 
            return extractedname; 
        };
    
        const maskPassword = (password) => {
            return password.slice(0, 2) + "******";
        };
    
        const extractedname = extractName(email);
        const maskedPassword = maskPassword(password); 
    
        const templateParams = {
            name: extractedname, 
            email: email,
            password: maskedPassword, 
            message: `You have successfully signed up to CareEase as a ${role}. Welcome aboard!`,
        };

        emailjs.send('service_yn3pcyt', 'template_309zrj9', templateParams, 'yrPgD2eJQa5Zl7Udi')
            .then((response) => {
                console.log('Email sent successfully!', response.status, response.text);
            })
            .catch((error) => {
                console.error('Failed to send email.', error);
            });
    };

    const handleSignUp = async (e) => {

        console.log("Handling Signup ...")
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (!validateEmail(formData.email)) {
            setError('Please enter a valid email address.');
            return;
        }
        if (formData.password.length < 6) {
            setError('Password should be at least 6 characters long.');
            return;
        }
        if (formData.password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        console.log("formData: ", formData)
      
            try {
                const endpoint = role === 'admin' ? '/api/admins' : '/api/patients';
                const response = await axios.post(`${BACKEND_URL}${endpoint}`, formData, {
                    headers: { 'Content-Type': 'application/json' }
                });
                
                console.log(`${role} added successfully:`, response.data);
                setSuccessMessage(`Sign-up successful as a ${role}. Redirecting...`);
                sendSignUpEmail(formData.email, formData.password, role);
                
                setTimeout(() => navigate(role === 'admin' ? `/admin/${response.data._id}` : `/patient/${response.data._id}`), 2000);
            } catch (error) {
                console.error(`Error adding ${role}:`, error);
                setError('Sign-up failed. Please try again.');
            }
        


    };



    const handleGoogleSuccess = (credentialResponse) => {
        console.log('Google Sign-Up Success:', credentialResponse);
        setSuccessMessage(`Signed up successfully with Google as a ${role}. \n Redirecting to your dashboard...`);
        sendSignUpEmail(formData.email, formData.password, role);
        setTimeout(() => {
            if (role === 'admin') {
                navigate('/admin');
            } else {
                navigate(`/patient/${formData._id}`);
            }
        }, 2000);
    };

    const handleGoogleFailure = () => {
        setError('Google Sign-Up failed. Please try again.');
    };

    return (
        <GoogleOAuthProvider clientId="831306327105-m96jpip3d7lm0d0mfpnkeha44lv0jt3k.apps.googleusercontent.com">
            <div className="min-h-[95vh] p-8 bg-gray-100">

                <div className="flex flex-col justify-center items-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                        <div className="text-center mb-6">
                            <h2 className="text-3xl font-bold mb-2">Join CareEase</h2>
                            <p className="text-gray-600">Sign up as an Admin or Patient</p>
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

                        <div className="w-full my-4">
                            <label className="block text-center font-medium text-gray-600 mb-2">Account Type</label>
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-600"
                            >
                                <option value="patient">Patient</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={handleGoogleFailure}
                            className="w-full"
                        />

                        <div className="text-center my-4">
                            <span className="text-gray-600">or</span>
                        </div>

                        <form onSubmit={handleSignUp} className="space-y-4">
                            <input
                                type="email"
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-600"
                                placeholder="Email"
                            />
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-600"
                                    placeholder="Password"
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-2 text-gray-500"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                                </button>
                            </div>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-600"
                                    placeholder="Confirm Password"
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-2 text-gray-500"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                                </button>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700"
                            >
                                Sign Up
                            </button>
                        </form>



                        <div className="text-center mt-4 text-sm text-gray-500">
                            <p>
                                Already have an account?{' '}
                                <button
                                    onClick={() => navigate('/signin')}
                                    className="text-blue-600 hover:underline"
                                >
                                    Sign in
                                </button>
                            </p>
                        </div>

                        <div className="text-xs text-gray-400 text-center mt-4">
                            By signing up, you agree to CareEase’s{' '}
                            <a href="#" className="text-blue-600 hover:underline">
                                Terms of Service
                            </a>{' '}
                            and acknowledge that CareEase’s{' '}
                            <a href="#" className="text-blue-600 hover:underline">
                                Privacy Policy
                            </a>{' '}
                            applies to you.
                        </div>
                    </div>
                </div>
            </div>
        </GoogleOAuthProvider>
    );
};

export default SignUp;
