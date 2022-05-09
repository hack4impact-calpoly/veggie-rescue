import React, { useState, useEffect } from 'react';

import veggie_logo from '../../imgs/veggie-rescue-logo.png';
import admin_profile_image from '../../imgs/admin_profile.png'
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

import {
    clearAuth
  } from '../../features/adminAuth/adminAuthSlice'
import { toast } from 'react-toastify';

export default function AdminHeader() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { admin } = useAppSelector((state)=> state.adminAuth)
    function handleDataBtn(){
     navigate('/Admin')
    }
    function handleLogsBtn(){
      navigate('/Logs')
    }
    const handleLogout = async () =>{
        await dispatch(clearAuth());
        navigate('/AdminLogin')
    }
    return (
        <div>
            <link rel="preconnect" href="https://fonts.googleapis.com"></link>
            <link href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"></link>
	        <nav className="shadow-lg  isolate h-16 bg-green-900 flex items-center justify-between">
                <div className="flex items-center justify-around">
                    <div className='px-10'>
                        <div className='h-24 bg-green-100 rounded shadow-lg w-60'>
                            <a href="https://www.veggierescue.org/" className="flex items-center py-6 px-7">
                                <img src={veggie_logo} alt="Logo" className="px-1" />
                            </a>
                        </div>
                    </div>
                    <div className="hidden md:flex space-x-1">
                        <button
                            onClick={handleLogsBtn}
                            className="py-4 px-9 text-white text-lg font-jost font-semibold hover:text-orange-500 transition duration-300"
                            >View Logs
                        </button>
                        <button
                            onClick={handleDataBtn}
                            className="py-4 px-9 text-white text-lg font-jost font-semibold hover:text-orange-500 transition duration-300"
                            >Manage Data
                        </button>

                    </div>
                </div>
                <div className='flex px-10  items-center'> 
               
                    <button onClick={handleLogout}  className='flex flex-row items-center '><div className='flex flex-col pr-6 text-white items-end'><span>Welcome <span className='text-orange-500'>{admin.name}!</span></span><span>Sign Out</span></div><img src={admin_profile_image} alt="profile_image" className='w-10 h-10' /></button>
                </div>
	        </nav>
        </div>    
    )
}