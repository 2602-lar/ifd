import React from 'react'
import { Link } from 'react-router-dom'

export const Home = () => {
    return (
        <div className=' h-screen w-screen'>
            <div className='flex sticky top-0 left-0 right-0 h-20 bg-[#5a62f7]/50 backdrop-blur text-white '>
                <div className=' pl-6 text-xl font-extrabold pt-8'>
                    Image Forgery Detection System
                </div>
                <div className='flex pr-4 h-full mt-8 ml-auto  text-xl'>
                    <Link className='pl-4 font-bold hover:underline'>Home</Link>
                    <Link className='pl-4 font-bold hover:underline'>About</Link>
                    <Link to={'/Login'} className='pl-4 font-bold hover:underline'>Login</Link>
                </div>
            </div>

            <div className='w-[90%] m-auto'>
                <span className='text-[#5a62f7] text-3xl font-extrabold'>Image Forgery</span>
                <p className='text-[#5a62f7] text-md font-bold'>
                    Image forgery means manipulation of the digital image to conceal some meaningful or useful information of the image.
                    There are cases when it is difficult to identify the edited region from the original image.
                    The detection of a forged image is driven by the need of authenticity and to maintain integrity of the image.
                </p>
            </div>

            <div className='w-[90%] m-auto pt-10'>
                <span className='text-[#5a62f7] text-xl font-extrabold'>Types of Image Forgery</span>
            </div>

        </div>
    )
}
