import veggie_logo from '../../imgs/veggie-rescue-logo.png';
import admin_profile_image from '../../imgs/admin_profile.png'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../../ProtectedRoute';
import AdminDataScreen from '../AdminDataScreen/AdminDataScreen';
import ViewLogsPage from '../ViewLogsPage/ViewLogsPage';
import Link from 'react-router-dom';
import App from '../../App';
import { useNavigate } from 'react-router-dom';

const  AdminHeader = () => {
    const navigate = useNavigate();

    return (
        <div>
            <link rel="preconnect" href="https://fonts.googleapis.com"></link>
            <link href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"></link>
	        <nav className="shadow-lg  isolate hover:isolation-auto h-16 bg-green-900 flex items-center justify-between">
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
                            onClick={() => navigate('/ViewLogsPage')}
                            className="py-4 px-9 text-white text-lg font-jost font-semibold hover:text-orange-500 transition duration-300"
                            >View Logs
                        </button>

                        <button
                            onClick={() => navigate('/AdminData')}
                            className="py-4 px-9 text-white text-lg font-jost font-semibold hover:text-orange-500 transition duration-300"
                            >Manage Data
                        </button>
                     </div>
                </div>
                <div className='px-10 flex items-center'> 
                    <button><img src={admin_profile_image} alt="profile_image" onClick={() => console.log("Profile Picture Clicked")} className='w-10 h-10' /></button>
                </div>
	        </nav>
        </div>    
    )
}
export default AdminHeader;