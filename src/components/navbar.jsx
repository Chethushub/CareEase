import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaHome, FaInfoCircle, FaSignInAlt, FaRocket, FaBars, FaTimes, FaUser } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleFeaturesClick = (e) => {
        e.preventDefault();
        navigate('/');
        setTimeout(() => {
            const section = document.querySelector('#features');
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
        toggleMenu();

        useEffect(() => {
            const handleScroll = () => {
                const scrollTop = window.scrollY;
                setIsScrolled(scrollTop > 50);
            };
            window.addEventListener('scroll', handleScroll);
            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }, []);

    }

    return (
        <>
            <nav className={`sticky top-0 z-10 transition-all duration-300 ${isScrolled ? 'bg-blue-900 bg-opacity-90 shadow-md' : 'bg-gradient-to-r from-blue-700 to-green-600'}`}>
                <div className="container mx-auto flex justify-between items-center p-2">
                    <NavLink to="/">
                        <div className=" flex items-center text-center cursor-pointer">
                            <img className="h-14" src="./icons/logo.svg" alt="Logo" />
                            <span
                                className="font-bold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500">
                                CareEase
                            </span>

                        </div>
                    </NavLink>

                    <div className="lg:hidden">
                        <button onClick={toggleMenu} className="text-white focus:outline-none">
                            {isOpen ? <FaTimes size={25} /> : <FaBars size={25} />}
                        </button>
                    </div>

                    <ul className="hidden lg:flex gap-8 items-center text-white">
                        <NavLink
                            to="/"
                            onClick={() => {
                                navigate('/');
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                toggleMenu();
                            }}
                            className="hover:text-green-300 transition">
                            <FaHome className="inline mr-2" /> Home
                        </NavLink>
                        <NavLink href="/#" onClick={handleFeaturesClick} className="hover:text-green-300 transition">
                            <FaRocket className="inline mr-2" /> Features
                        </NavLink>
                        <NavLink to="/signin" className="hover:text-green-300 transition">
                            <FaSignInAlt className="inline mr-2" /> Signin
                        </NavLink>
                        <NavLink to="/signup">
                            <button className="px-6 py-2 rounded-3xl bg-green-500 hover:bg-[#24ae57] text-blue-50 hover:text-white">
                                Get Started
                            </button>
                        </NavLink>
                    </ul>
                </div>

                <motion.div
                    className={`lg:hidden fixed inset-0 bg-black bg-opacity-80 z-50 p-8 ${isOpen ? 'block' : 'hidden'}`}
                    initial={{ x: '-100%' }}
                    animate={{ x: isOpen ? 0 : '-100%' }}
                    transition={{ duration: 0.5 }}
                >
                    <button className="absolute top-5 right-5 text-white" onClick={toggleMenu}>
                        <FaTimes size={30} />
                    </button>

                    <ul className="flex flex-col gap-6 mt-10 text-white">
                        <NavLink to="/" onClick={toggleMenu} className="hover:text-green-400 transition">
                            <FaHome className="inline mr-2" /> Home
                        </NavLink>
                        <NavLink href="/#" onClick={handleFeaturesClick} className="hover:text-green-400 transition">
                            <FaRocket className="inline mr-2" /> Features
                        </NavLink>
                        <NavLink to="/signin" onClick={toggleMenu} className="hover:text-green-400 transition">
                            <FaSignInAlt className="inline mr-2" /> Signin
                        </NavLink>
                        <NavLink to="/signup" onClick={toggleMenu}>
                            <button className="px-6 py-2 rounded-3xl bg-green-500 border-2 border-green-500 text-white font-medium hover:bg-[#24ae57] hover:border-blue-600 transition-colors duration-300">
                                Get Started
                            </button>
                        </NavLink>
                    </ul>
                </motion.div>
            </nav>
        </>
    );
};

export default Navbar;
