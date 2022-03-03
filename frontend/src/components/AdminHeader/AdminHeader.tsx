import veggie_logo from '../../imgs/veggie-rescue-logo.png';
import admin_profile_image from '../../imgs/admin_profile.png'

export default function AdminHeader() {
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
                            onClick={() => console.log('View Logs Clicked')}
                            className="py-4 px-9 text-white text-lg font-jost font-semibold hover:text-orange-500 transition duration-300"
                            >View Logs
                        </button>
                        <button
                            onClick={() => console.log('Manage Data Clicked')}
                            className="py-4 px-9 text-white text-lg font-jost font-semibold hover:text-orange-500 transition duration-300"
                            >Manage Data
                        </button>
                        <button
                            onClick={() => console.log('Upload Logs Clicked')}
                            className="py-4 px-9 text-white text-lg font-jost font-semibold hover:text-orange-500 transition duration-300"
                            >Upload Logs
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