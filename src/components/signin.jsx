import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState('patient'); 
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const [userSignInData, setuserSignInData] = useState();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    useEffect(() => {
        const fetchUserSinginData = async () => {
          try {
            const response = await axios.get(`${BACKEND_URL}/api/${role}s/getPasswordEmail`);
              setuserSignInData(response.data);
              
              response.data.forEach((user, index) => {
                console.log(`User ${index + 1}:`, user);
              });
              
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        };
    
        fetchUserSinginData();
      }, [role]);


    const verifySignup = (email, password) => {
        if (!userSignInData) {
            console.log("No patient data available");
            return;
        }
    
        const matchedUser = userSignInData.find((patient) => 
            patient.email === email && patient.password === password
        );

        const matchedEmail = userSignInData.find((patient) => patient.email === email);


        console.log("Input email: " + email + " & password: " + password)

        console.log("Matched user: ", matchedUser ," for role: ", role);

        if (matchedUser) {
            console.log("Email found in database");
            console.log("Sign-in approved");
            setSuccessMessage(`Sign-in successful as a ${role}. Redirecting...`);
            
            setTimeout(() => {
                const userId = matchedUser._id;

                console.log(userId)

                navigate(role === 'admin' ? `/admin/${userId}` : `/patient/${userId}`);
            }, 2000);

        } else {

            if(matchedEmail) {
                console.log("email matched " + email)
                setError("Invalid  password.");
            } else {
                setError("Invalid email or password.");
            }

            console.log("Signup Rejected");

        }
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

        verifySignup(email, password);
    };

    const handleGoogleSuccess = (credentialResponse) => {
        console.log('Google Sign-In Success:', credentialResponse);
        setSuccessMessage(`Signed in successfully with Google as ${role}. \n Redirecting...`);
        setTimeout(() => {
            if (role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/patient');
            }
        }, 2000);
    };

    const handleGoogleFailure = () => {
        setError('Google Sign-In failed. Please try again.');
    };

    return (
        <GoogleOAuthProvider clientId="831306327105-m96jpip3d7lm0d0mfpnkeha44lv0jt3k.apps.googleusercontent.com">
            <div className="min-h-[95vh] p-10 bg-gray-100">

                <div className="flex flex-col justify-center items-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                        <div className="text-center mb-6">
                            <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
                            <p className="text-gray-600">Access your account</p>
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

                        <div className='my-4'>
                            <label className="block text-center text-gray-600 font-medium mb-2">
                                Signin as
                            </label>
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
                            clientId="831306327105-m96jpip3d7lm0d0mfpnkeha44lv0jt3k.apps.googleusercontent.com"
                            buttonText="Sign In with Google"
                            onSuccess={handleGoogleSuccess}
                            onFailure={handleGoogleFailure}
                            cookiePolicy={'single_host_origin'}
                            className="w-full"
                        />

                        <div className="text-center my-4">
                            <span className="text-gray-600">or</span>
                        </div>

                        <form onSubmit={handleSignIn} className="space-y-4">

                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-600"
                                placeholder="Email"
                            />
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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

                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700"
                            >
                                Sign In
                            </button>
                        </form>



                        <div className="text-center mt-4 text-sm text-gray-500">
                            <p>
                                Don't have an account?{' '}
                                <button
                                    onClick={() => navigate('/signup')}
                                    className="text-blue-600 hover:underline"
                                >
                                    Sign Up
                                </button>
                            </p>
                        </div>

                        <div className="text-xs text-gray-400 text-center mt-4">
                            By signing in, you agree to CareEase’s{' '}
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

export default SignIn;
